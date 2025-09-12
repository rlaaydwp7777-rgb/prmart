import { collection, getDocs, getDoc, doc, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Prompt, Category } from "@/lib/types";

// A temporary cache to avoid fetching the same data multiple times in a single request.
const requestCache = new Map<string, any>();

async function fetchFromCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (requestCache.has(key)) {
    return requestCache.get(key);
  }
  const data = await fetcher();
  requestCache.set(key, data);
  // Clear cache after a short period to allow for new data in subsequent server-side renders.
  setTimeout(() => requestCache.delete(key), 500);
  return data;
}

export async function getProducts(): Promise<Prompt[]> {
    return fetchFromCache('products', async () => {
        const snapshot = await getDocs(collection(db, "products"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prompt));
    });
}

export async function getProduct(id: string): Promise<Prompt | null> {
    const cacheKey = `product_${id}`;
    return fetchFromCache(cacheKey, async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Prompt;
        }
        return null;
    });
}

export async function getProductsByCategorySlug(slug: string, count?: number, excludeId?: string): Promise<Prompt[]> {
    const cacheKey = `products_by_category_${slug}_${count}_${excludeId}`;
    return fetchFromCache(cacheKey, async () => {
        let q = query(collection(db, "products"), where("categorySlug", "==", slug));
        if (count) {
            q = query(q, limit(count + (excludeId ? 1 : 0)));
        }
        const snapshot = await getDocs(q);
        let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prompt));
        if (excludeId) {
            products = products.filter(p => p.id !== excludeId);
        }
        if (count) {
            return products.slice(0, count);
        }
        return products;
    });
}

export async function getCategories(): Promise<Category[]> {
    return fetchFromCache('categories', async () => {
        const snapshot = await getDocs(collection(db, "categories"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    });
}

import { collection, getDocs, getDoc, doc, query, where, limit, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Prompt, Category } from "@/lib/types";
import { slugify } from "../utils";

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

const EXAMPLE_CATEGORIES: Category[] = [
    { id: "1", name: "AI & 프로덕션", slug: "ai-and-production", icon: "Rocket", subCategories: [] },
    { id: "2", name: "개발 & IT 자동화", slug: "development-it-automation", icon: "Code", subCategories: [] },
    { id: "3", name: "재테크 & 투자", slug: "investment-fintech", icon: "LineChart", subCategories: [] },
    { id: "4", name: "여행 & 라이프", slug: "travel-life", icon: "Plane", subCategories: [] },
    { id: "5", name: "생활 & 육아 꿀팁", slug: "living-parenting-tips", icon: "Users", subCategories: [] },
];

const EXAMPLE_PROMPTS: Prompt[] = [
    { id: "ex-1", title: "시네마틱 Midjourney 프롬프트", author: "AI Artist", category: "AI & 프로덕션", categorySlug: "ai-and-production", price: 0, image: "https://picsum.photos/400/300?random=101", aiHint: "cinematic photo", rank: 1, isExample: true, createdAt: new Date().toISOString() },
    { id: "ex-2", title: "Next.js 보일러플레이트", author: "DevMaster", category: "개발 & IT 자동화", categorySlug: "development-it-automation", price: 0, image: "https://picsum.photos/400/300?random=108", aiHint: "react code", rank: 2, isExample: true, createdAt: new Date().toISOString() },
    { id: "ex-3", title: "부동산 수익률 계산기", author: "RealEstatePro", category: "재테크 & 투자", categorySlug: "investment-fintech", price: 0, image: "https://picsum.photos/400/300?random=112", aiHint: "calculator money", rank: 3, isExample: true, createdAt: new Date().toISOString() },
    { id: "ex-4", title: "제주도 3박 4일 동쪽 코스", author: "Traveler", category: "여행 & 라이프", categorySlug: "travel-life", price: 0, image: "https://picsum.photos/400/300?random=116", aiHint: "jeju island", rank: 4, isExample: true, createdAt: new Date().toISOString() },
    { id: "ex-5", title: "신생아 100일 수면교육법", author: "SuperMom", category: "생활 & 육아 꿀팁", categorySlug: "living-parenting-tips", price: 0, image: "https://picsum.photos/400/300?random=121", aiHint: "sleeping baby", rank: 5, isExample: true, createdAt: new Date().toISOString() },
];


function serializeDoc(doc: any): any {
    const data = doc.data();
    if (!data) return { id: doc.id };

    const serializedData: { [key: string]: any } = { id: doc.id };

    for (const key in data) {
        const value = data[key];
        if (value instanceof Timestamp) {
            serializedData[key] = value.toDate().toISOString();
        } else {
            serializedData[key] = value;
        }
    }
    return serializedData;
}


export async function getProducts(): Promise<Prompt[]> {
    return fetchFromCache('products', async () => {
        const snapshot = await getDocs(collection(db, "products"));
        if (snapshot.empty) {
            return EXAMPLE_PROMPTS;
        }
        return snapshot.docs.map(doc => serializeDoc(doc) as Prompt);
    });
}

export async function getProduct(id: string): Promise<Prompt | null> {
    const cacheKey = `product_${id}`;
    return fetchFromCache(cacheKey, async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return serializeDoc(docSnap) as Prompt;
        }
        return EXAMPLE_PROMPTS.find(p => p.id === id) || null;
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

        let products: Prompt[];
        if (snapshot.empty) {
            products = EXAMPLE_PROMPTS.filter(p => p.categorySlug === slug);
        } else {
            products = snapshot.docs.map(doc => serializeDoc(doc) as Prompt);
        }

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
        if (snapshot.empty) {
            return EXAMPLE_CATEGORIES;
        }
        return snapshot.docs.map(doc => serializeDoc(doc) as Category);
    });
}

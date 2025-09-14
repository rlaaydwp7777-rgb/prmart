
import { collection, getDocs, getDoc, doc, query, where, limit, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Prompt, Category, SubCategory, IdeaRequest } from "@/lib/types";
import { slugify } from "../utils";

// A temporary cache to avoid fetching the same data multiple times in a single request.
const requestCache = new Map<string, any>();

async function fetchFromCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (process.env.NODE_ENV !== 'development' || !requestCache.has(key)) {
    const data = await fetcher();
    if (process.env.NODE_ENV === 'development') {
        requestCache.set(key, data);
        setTimeout(() => requestCache.delete(key), 2000); // 2-second cache in dev
    }
    return data;
  }
  return requestCache.get(key);
}

export const EXAMPLE_CATEGORIES: Category[] = [
    { 
        id: "cat-1", name: "AI & 생산성", slug: "ai-and-production", icon: "Rocket", 
        subCategories: [
            { id: "sub-1-1", name: "이미지 프롬프트", slug: "image-prompt" },
            { id: "sub-1-2", name: "영상 프롬프트", slug: "video-prompt" },
        ]
    },
    { 
        id: "cat-2", name: "개발 & IT 자동화", slug: "development-it-automation", icon: "Code",
        subCategories: [
            { id: "sub-2-1", name: "웹/앱 개발", slug: "web-dev" },
            { id: "sub-2-2", name: "업무 자동화", slug: "automation-script" }
        ]
    },
    { 
        id: "cat-3", name: "재테크 & 투자", slug: "investment-fintech", icon: "LineChart",
        subCategories: [
            { id: "sub-3-1", name: "주식/ETF 리포트", slug: "stock-report" },
            { id: "sub-3-2", name: "부동산 전략", slug: "real-estate" }
        ]
    },
    { 
        id: "cat-4", name: "여행 & 라이프", slug: "travel-life", icon: "Plane",
        subCategories: [
            { id: "sub-4-1", name: "국내여행", slug: "korea-travel" },
            { id: "sub-4-2", name: "해외여행", slug: "overseas-travel" }
        ]
    },
    { 
        id: "cat-5", name: "생활 & 육아 꿀팁", slug: "living-parenting-tips", icon: "Users",
        subCategories: [
            { id: "sub-5-1", name: "육아 노하우", slug: "parenting" },
            { id: "sub-5-2", name: "생활 절약법", slug: "life-hacks" }
        ]
    },
    { 
        id: "cat-6", name: "비즈니스 & 마케팅", slug: "business-marketing", icon: "Briefcase",
        subCategories: [
            { id: "sub-6-1", name: "SNS 마케팅", slug: "sns-marketing" },
            { id: "sub-6-2", name: "브랜딩", slug: "branding" }
        ]
    },
    { 
        id: "cat-7", name: "창작 & 디자인", slug: "creation-design", icon: "Brush",
        subCategories: [
            { id: "sub-7-1", name: "일러스트", slug: "illustration" },
            { id: "sub-7-2", name: "UX/UI", slug: "ux-ui" }
        ]
    },
    { 
        id: "cat-8", name: "학습 & 자기계발", slug: "learning-self-development", icon: "BookOpen",
        subCategories: [
            { id: "sub-8-1", name: "외국어 학습", slug: "language-learning" },
            { id: "sub-8-2", name: "자격증 대비", slug: "certification" }
        ]
    },
    { 
        id: "cat-9", name: "모빌리티 & 자동차", slug: "mobility-automobile", icon: "Car",
        subCategories: [
            { id: "sub-9-1", name: "차량 구매 가이드", slug: "car-buying-guide" },
            { id: "sub-9-2", name: "전기차 트렌드", slug: "ev-trends" }
        ]
    },
    { 
        id: "cat-10", name: "라이프 인프라", slug: "life-infra", icon: "Home",
        subCategories: [
            { id: "sub-10-1", name: "아파트 시세 리포트", slug: "apartment-report" },
            { id: "sub-10-2", name: "인테리어", slug: "interior" }
        ]
    },
];

const generateExamplePrompts = (): Prompt[] => {
    let prompts: Prompt[] = [];
    let rankCounter = 1;
    EXAMPLE_CATEGORIES.forEach(category => {
        for (let i = 1; i <= 5; i++) {
            const promptId = `ex-${category.slug}-${i}`;
            prompts.push({
                id: promptId,
                title: `${category.name} 예제 상품 #${i}`,
                description: `이 상품은 '${category.name}'에 대한 심도 있는 노하우와 실용적인 템플릿을 제공합니다.`,
                author: "prmart 전문가",
                category: category.name,
                categorySlug: category.slug,
                price: Math.floor(Math.random() * 30000) + 10000,
                image: `https://picsum.photos/seed/${promptId}/400/300`,
                aiHint: `${category.slug.split('-')[0]} content`,
                tags: [category.name, "예제"],
                rank: rankCounter <= 10 ? rankCounter++ : undefined,
                isExample: true,
                createdAt: new Date().toISOString(),
                stats: {
                    views: Math.floor(Math.random() * 2000) + 100,
                    likes: Math.floor(Math.random() * 300) + 10,
                    sales: Math.floor(Math.random() * 100) + 5,
                },
                rating: parseFloat((Math.random() * (5.0 - 4.5) + 4.5).toFixed(1)),
                reviews: Math.floor(Math.random() * 50) + 5,
            });
        }
    });
    return prompts;
};

const EXAMPLE_PROMPTS: Prompt[] = generateExamplePrompts();

const EXAMPLE_IDEA_REQUESTS: IdeaRequest[] = EXAMPLE_CATEGORIES.map((category, index) => {
    const examples = [
        { title: "유튜브 채널아트 & 썸네일 자동 생성기", author: "크리에이터준", budget: 50000, description: "채널 컨셉과 영상 제목만 입력하면 알아서 세련된 채널아트와 썸네일을 여러 개 만들어주는 AI 프롬프트를 원해요." },
        { title: "부동산 월세 수익률 계산기 (엑셀 템플릿)", author: "재테크왕", budget: 20000, description: "매매가, 보증금, 월세 등 기본 정보만 입력하면 연간/월간 수익률을 자동으로 계산해주는 엑셀 대시보드가 필요합니다." },
    ];
    const example = examples[index % examples.length];
    return {
        id: `req-${index + 1}`,
        title: example.title,
        author: example.author,
        category: category.name,
        categorySlug: category.slug,
        budget: example.budget,
        proposals: Math.floor(Math.random() * 15),
        description: example.description,
        isExample: true,
    }
});


function serializeDoc(doc: any): any {
    if (!doc.exists()) {
        return null;
    }
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
        try {
            const snapshot = await getDocs(collection(db, "products"));
            if (snapshot.empty) {
                console.warn("Firestore 'products' collection is empty, returning example data.");
                return EXAMPLE_PROMPTS;
            }
            return snapshot.docs.map(doc => serializeDoc(doc) as Prompt).filter(Boolean);
        } catch (error) {
            console.error("Error fetching products, returning example data:", error);
            return EXAMPLE_PROMPTS;
        }
    });
}

export async function getProduct(id: string): Promise<Prompt | null> {
    const cacheKey = `product_${id}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return serializeDoc(docSnap) as Prompt;
            }
        } catch (error) {
             console.error(`Error fetching product ${id}, falling back to example data:`, error);
        }
        
        const exampleProduct = EXAMPLE_PROMPTS.find(p => p.id === id);
        return exampleProduct || null;
    });
}

export async function getProductsByCategorySlug(slug: string, count?: number, excludeId?: string): Promise<Prompt[]> {
    const cacheKey = `products_by_category_${slug}_${count}_${excludeId}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const q = query(collection(db, "products"), where("categorySlug", "==", slug));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.warn(`Firestore 'products' collection has no items for slug '${slug}', returning example data.`);
                const exampleProducts = EXAMPLE_PROMPTS.filter(p => p.categorySlug === slug);
                 let filteredExamples = excludeId ? exampleProducts.filter(p => p.id !== excludeId) : exampleProducts;
                 return count ? filteredExamples.slice(0, count) : filteredExamples;
            } 
            
            const products = snapshot.docs.map(doc => serializeDoc(doc) as Prompt).filter(Boolean);
            let filteredProducts = excludeId ? products.filter(p => p.id !== excludeId) : products;
            return count ? filteredProducts.slice(0, count) : filteredProducts;

        } catch (error) {
            console.error(`Error fetching products for category ${slug}, returning example data:`, error);
            const exampleProducts = EXAMPLE_PROMPTS.filter(p => p.categorySlug === slug);
            let filteredExamples = excludeId ? exampleProducts.filter(p => p.id !== excludeId) : exampleProducts;
            return count ? filteredExamples.slice(0, count) : [];
        }
    });
}

export async function getCategories(): Promise<Category[]> {
    return fetchFromCache('categories', async () => {
        try {
            const snapshot = await getDocs(collection(db, "categories"));
            if (snapshot.empty) {
                console.warn("Firestore 'categories' collection is empty, returning example data.");
                return EXAMPLE_CATEGORIES;
            }
            const categories = snapshot.docs.map(doc => {
                const data = serializeDoc(doc) as Category;
                data.subCategories = data.subCategories || [];
                return data;
            }).filter(Boolean);

            return categories.length > 0 ? categories : EXAMPLE_CATEGORIES;
        } catch (error) {
            console.error("Error fetching categories, returning example data:", error);
            return EXAMPLE_CATEGORIES;
        }
    });
}

export async function getIdeaRequests(): Promise<IdeaRequest[]> {
    return fetchFromCache('ideaRequests', async () => {
        try {
            const snapshot = await getDocs(collection(db, "ideaRequests"));
            if (snapshot.empty) {
                console.warn("Firestore 'ideaRequests' collection is empty, returning example data.");
                return EXAMPLE_IDEA_REQUESTS;
            }
            return snapshot.docs.map(doc => serializeDoc(doc) as IdeaRequest).filter(Boolean);
        } catch (error) {
            console.error("Error fetching idea requests, returning example data:", error);
            return EXAMPLE_IDEA_REQUESTS;
        }
    });
}

export async function getIdeaRequest(id: string): Promise<IdeaRequest | null> {
    const cacheKey = `ideaRequest_${id}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const docRef = doc(db, "ideaRequests", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return serializeDoc(docSnap) as IdeaRequest;
            }
        } catch (error) {
            console.error(`Error fetching idea request ${id}, falling back to example data:`, error);
        }

        const exampleRequest = EXAMPLE_IDEA_REQUESTS.find(r => r.id === id);
        return exampleRequest || null;
    });
}

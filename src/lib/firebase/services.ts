
import { collection, getDocs, getDoc, doc, query, where, limit, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Prompt, Category, SubCategory } from "@/lib/types";
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

const generateSubCategories = (names: string[]): SubCategory[] => {
    return names.map(name => ({ name, slug: slugify(name) }));
};

const EXAMPLE_CATEGORIES: Category[] = [
    { 
        id: "1", name: "AI & 프로덕션", slug: "ai-and-production", icon: "Rocket", 
        subCategories: generateSubCategories(["이미지 프롬프트", "영상 프롬프트", "텍스트·문서 작성", "AI 업무 자동화", "AI 툴 리뷰 & 비교"])
    },
    { 
        id: "2", name: "개발 & IT 자동화", slug: "development-it-automation", icon: "Code",
        subCategories: generateSubCategories(["웹/앱 개발", "데이터 분석 & 시각화", "업무 자동화 스크립트", "클라우드/인프라", "보안/해킹 지식"])
    },
    { 
        id: "3", name: "재테크 & 투자", slug: "investment-fintech", icon: "LineChart",
        subCategories: generateSubCategories(["주식/ETF 리포트", "부동산 임장/투자 전략", "코인/블록체인 분석", "절세·짠테크", "금융 트렌드 리포트"])
    },
    { 
        id: "4", name: "여행 & 라이프", slug: "travel-life", icon: "Plane",
        subCategories: generateSubCategories(["국내여행 코스", "해외여행 플랜", "항공·숙박 꿀팁", "여행 사진/영상 노하우", "맛집 리스트"])
    },
    { 
        id: "5", name: "생활 & 육아 꿀팁", slug: "living-parenting-tips", icon: "Users",
        subCategories: generateSubCategories(["육아 노하우", "생활 절약법", "건강/헬스 정보", "집안일 자동화", "반려동물 꿀팁"])
    },
    { 
        id: "6", name: "비즈니스 & 마케팅", slug: "business-marketing", icon: "Briefcase",
        subCategories: generateSubCategories(["SNS 마케팅", "브랜딩 & 디자인", "세일즈/영업 전략", "템플릿·문서 양식", "스타트업/창업 노하우"])
    },
    { 
        id: "7", name: "창작 & 디자인", slug: "creation-design", icon: "Brush",
        subCategories: generateSubCategories(["일러스트·리소스", "UX/UI 디자인 팁", "사진 보정/촬영 기법", "영상 편집 프리셋", "폰트·컬러 팔레트"])
    },
    { 
        id: "8", name: "학습 & 자기계발", slug: "learning-self-development", icon: "BookOpen",
        subCategories: generateSubCategories(["외국어 학습법", "자격증 대비", "글쓰기/스피치", "뇌과학·학습법", "온라인 강의 추천"])
    },
    { 
        id: "9", name: "모빌리티 & 자동차", slug: "mobility-automobile", icon: "Car",
        subCategories: generateSubCategories(["차량 구매 가이드", "중고차 체크리스트", "전기차/신기술 트렌드", "자동차 관리/정비", "튜닝·액세서리"])
    },
    { 
        id: "10", name: "라이프 인프라", slug: "life-infra", icon: "Home",
        subCategories: generateSubCategories(["아파트 시세/임장 리포트", "전월세 계약 꿀팁", "인테리어 노하우", "지역별 생활 정보", "부동산 정책 해설"])
    }
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
        // Fallback to example data if doc not in DB
        const exampleProduct = EXAMPLE_PROMPTS.find(p => p.id === id);
        if(exampleProduct) return exampleProduct;
        
        // Also check products from other categories in example data
        const allExampleProducts = EXAMPLE_CATEGORIES.flatMap(cat => 
            EXAMPLE_PROMPTS.filter(p => p.categorySlug === cat.slug)
        );
        return allExampleProducts.find(p => p.id === id) || null;
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

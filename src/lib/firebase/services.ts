
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

const generateSubCategories = (parentSlug: string, names: string[]): SubCategory[] => {
    return names.map(name => ({ name, slug: slugify(name) }));
};

const EXAMPLE_CATEGORIES: Category[] = [
    { 
        id: "cat-1", name: "AI & 프로덕션", slug: "ai-and-production", icon: "Rocket", 
        subCategories: generateSubCategories("ai-and-production", ["이미지 프롬프트", "영상 프롬프트", "텍스트·문서 작성", "AI 업무 자동화", "AI 툴 리뷰 & 비교"])
    },
    { 
        id: "cat-2", name: "개발 & IT 자동화", slug: "development-it-automation", icon: "Code",
        subCategories: generateSubCategories("development-it-automation", ["웹/앱 개발", "데이터 분석 & 시각화", "업무 자동화", "클라우드/인프라", "보안/해킹 지식"])
    },
    { 
        id: "cat-3", name: "재테크 & 투자", slug: "investment-fintech", icon: "LineChart",
        subCategories: generateSubCategories("investment-fintech", ["주식/ETF 리포트", "부동산 임장/투자 전략", "코인/블록체인 분석", "절세·짠테크", "금융 트렌드 리포트"])
    },
    { 
        id: "cat-4", name: "여행 & 라이프", slug: "travel-life", icon: "Plane",
        subCategories: generateSubCategories("travel-life", ["국내여행 코스", "해외여행 플랜", "항공·숙박 꿀팁", "여행 사진/영상 노하우", "소규모 여행 커뮤니티"])
    },
    { 
        id: "cat-5", name: "생활 & 육아 꿀팁", slug: "living-parenting-tips", icon: "Users",
        subCategories: generateSubCategories("living-parenting-tips", ["육아 노하우", "생활 절약법", "건강/헬스 정보", "집안일 자동화 꿀팁", "음식/레시피 공유"])
    },
    { 
        id: "cat-6", name: "비즈니스 & 마케팅", slug: "business-marketing", icon: "Briefcase",
        subCategories: generateSubCategories("business-marketing", ["SNS 마케팅", "브랜딩 & 디자인", "세일즈/영업 전략", "템플릿·문서 양식", "스타트업/창업 노하우"])
    },
    { 
        id: "cat-7", name: "창작 & 디자인", slug: "creation-design", icon: "Brush",
        subCategories: generateSubCategories("creation-design", ["일러스트·캐릭터 리소스", "UX/UI 디자인 팁", "사진 보정/촬영 기법", "영상 편집 프리셋", "폰트·컬러 팔레트 공유"])
    },
    { 
        id: "cat-8", name: "학습 & 자기계발", slug: "learning-self-development", icon: "BookOpen",
        subCategories: generateSubCategories("learning-self-development", ["외국어 학습법", "자격증 대비", "글쓰기/스피치", "뇌과학·학습법", "온라인 강의 추천"])
    },
    { 
        id: "cat-9", name: "모빌리티 & 자동차", slug: "mobility-automobile", icon: "Car",
        subCategories: generateSubCategories("mobility-automobile", ["차량 구매 가이드", "중고차 체크리스트", "전기차/신기술 트렌드", "자동차 관리/정비", "튜닝·액세서리"])
    },
    { 
        id: "cat-10", name: "라이프 인프라", slug: "life-infra", icon: "Home",
        subCategories: generateSubCategories("life-infra", ["아파트 시세/임장 리포트", "전월세 계약 꿀팁", "인테리어 노하우", "지역별 생활 정보", "부동산 정책 해설"])
    }
];

const generateExamplePrompts = (): Prompt[] => {
    let prompts: Prompt[] = [];
    let rankCounter = 1;
    EXAMPLE_CATEGORIES.forEach(category => {
        category.subCategories.forEach((subCategory) => {
            for (let i = 1; i <= 10; i++) {
                const promptId = `ex-${category.slug}-${subCategory.slug}-${i}`;
                prompts.push({
                    id: promptId,
                    title: `${subCategory.name} 예제 상품 #${i}`,
                    description: `이 상품은 '${subCategory.name}'에 대한 심도 있는 노하우와 실용적인 템플릿을 제공합니다. ${category.name} 분야의 전문가가 제작한 이 콘텐츠는 사용자가 관련 작업을 즉시 시작하거나 개선하는 데 도움을 줄 수 있습니다. 상세 페이지에서는 구체적인 활용 사례와 포함된 파일 목록, 그리고 자주 묻는 질문에 대한 답변을 확인할 수 있습니다. 구매 후에는 바로 다운로드하여 사용 가능하며, 지속적인 업데이트가 제공될 수 있습니다.`,
                    author: "prmart 전문가",
                    category: category.name,
                    categorySlug: category.slug,
                    price: 0,
                    image: `https://picsum.photos/seed/${promptId}/400/300`,
                    aiHint: `${category.slug.split('-')[0]} ${subCategory.slug.split('-')[0]}`,
                    tags: [category.name, subCategory.name, "예제"],
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
    });
    return prompts;
};


const EXAMPLE_PROMPTS: Prompt[] = generateExamplePrompts();


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
            return snapshot.docs.map(doc => serializeDoc(doc) as Prompt).filter(p => p);
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
        
        // Fallback to example data if doc not in DB or error occurs
        const exampleProduct = EXAMPLE_PROMPTS.find(p => p.id === id);
        return exampleProduct || null;
    });
}

export async function getProductsByCategorySlug(slug: string, count?: number, excludeId?: string): Promise<Prompt[]> {
    const cacheKey = `products_by_category_${slug}_${count}_${excludeId}`;
    return fetchFromCache(cacheKey, async () => {
        let products: Prompt[];
        try {
            let q = query(collection(db, "products"), where("categorySlug", "==", slug));
            if (count) {
                q = query(q, limit(count + (excludeId ? 1 : 0)));
            }
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                products = EXAMPLE_PROMPTS.filter(p => p.categorySlug === slug);
            } else {
                products = snapshot.docs.map(doc => serializeDoc(doc) as Prompt).filter(p => p);
            }
        } catch (error) {
            console.error(`Error fetching products for category ${slug}, returning example data:`, error);
            products = EXAMPLE_PROMPTS.filter(p => p.categorySlug === slug);
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
        try {
            const snapshot = await getDocs(collection(db, "categories"));
            if (snapshot.empty) {
                console.warn("Firestore 'categories' collection is empty, returning example data.");
                return EXAMPLE_CATEGORIES;
            }
            // Ensure subCategories is always an array
            const categories = snapshot.docs.map(doc => {
                const data = serializeDoc(doc) as Category;
                if (!data.subCategories) {
                    data.subCategories = [];
                }
                return data;
            }).filter(c => c);

            return categories;
        } catch (error) {
            console.error("Error fetching categories, returning example data:", error);
            return EXAMPLE_CATEGORIES;
        }
    });
}

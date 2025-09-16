

import { collection, getDocs, getDoc, doc, query, where, limit, Timestamp, orderBy, addDoc, setDoc, Transaction, runTransaction, FieldValue } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Prompt, Category, SubCategory, IdeaRequest, Order, SellerStats, SellerProfile, Review, Wishlist, Proposal } from "@/lib/types";

// A temporary cache to avoid fetching the same data multiple times in a single request.
const requestCache = new Map<string, { ts: number, data: any }>();

async function fetchFromCache<T>(key: string, fetcher: () => Promise<T>, ttl = 60000): Promise<T> {
  const item = requestCache.get(key);
  if (item && Date.now() - item.ts < ttl) {
    return item.data;
  }
  const data = await fetcher();
  requestCache.set(key, { ts: Date.now(), data });
  return data;
}

export const EXAMPLE_CATEGORIES: Category[] = [
    { 
        id: "cat-1",
        name: "AI & 생산성", 
        slug: "ai-and-production",
        icon: "Rocket",
        subCategories: [
          { id: "sub-1-1", name: "ChatGPT 활용 프롬프트", slug: "chatgpt"},
          { id: "sub-1-2", name: "이미지 생성 (미드저니, DALL-E)", slug: "dall-e" },
          { id: "sub-1-3", name: "영상/음악 생성 (Sora, Pika)", slug: "sora-pika" },
          { id: "sub-1-4", name: "업무 자동화 (RPA, Zapier)", slug: "rpa-zapier" },
          { id: "sub-1-5", name: "기타 AI 및 생산성", slug: "ai" },
        ]
      },
      { 
        id: "cat-2",
        name: "개발 & IT", 
        slug: "development-it-automation",
        icon: "Code",
        subCategories: [
          { id: "sub-2-1", name: "웹/앱 개발 템플릿", slug: "web-app-template" },
          { id: "sub-2-2", name: "데이터 분석/시각화", slug: "data-analysis" },
          { id: "sub-2-3", name: "업무 자동화 스크립트", slug: "automation-script" },
          { id: "sub-2-4", name: "클라우드/인프라(IaC)", slug: "iac" },
          { id: "sub-2-5", name: "기타 개발 및 IT", slug: "it" },
        ]
      },
      { 
        id: "cat-3",
        name: "재테크 & 투자", 
        slug: "investment-fintech",
        icon: "LineChart",
        subCategories: [
            { id: "sub-3-1", name: "주식/ETF 트레이딩 전략", slug: "etf-trading" },
            { id: "sub-3-2", name: "부동산 투자 리포트", slug: "real-estate-report" },
            { id: "sub-3-3", name: "N잡/부업 노하우", slug: "side-hustle" },
            { id: "sub-3-4", name: "세금 및 절세 전략", slug: "tax-saving" },
            { id: "sub-3-5", name: "기타 재테크 및 투자", slug: "investment" },
        ]
      },
      { 
        id: "cat-4",
        name: "비즈니스 & 마케팅", 
        slug: "business-marketing",
        icon: "Briefcase",
        subCategories: [
            { id: "sub-4-1", name: "콘텐츠/SNS 마케팅", slug: "sns-marketing" },
            { id: "sub-4-2", name: "광고 운영 (GA, 메타)", slug: "ad-operation" },
            { id: "sub-4-3", name: "사업 계획서/제안서", slug: "business-plan" },
            { id: "sub-4-4", name: "브랜딩/퍼스널 브랜딩", slug: "branding" },
            { id: "sub-4-5", name: "기타 비즈니스 및 마케팅", slug: "business" },
        ]
      },
      { 
        id: "cat-5",
        name: "창작 & 디자인", 
        slug: "creation-design",
        icon: "Brush",
        subCategories: [
            { id: "sub-5-1", name: "UX/UI 디자인 리소스", slug: "ux-ui-resource" },
            { id: "sub-5-2", name: "PPT/Keynote 템플릿", slug: "presentation-template" },
            { id: "sub-5-3", name: "영상 편집 템플릿", slug: "video-editing-template" },
            { id: "sub-5-4", name: "그래픽 디자인 소스", slug: "graphic-design-source" },
            { id: "sub-5-5", name: "기타 창작 및 디자인", slug: "design" },
        ]
      },
      { 
        id: "cat-6",
        name: "학습 & 자기계발", 
        slug: "learning-self-development",
        icon: "BookOpen",
        subCategories: [
          { id: "sub-6-1", name: "직무 스킬업", slug: "job-skill-up" },
          { id: "sub-6-2", name: "외국어 학습 자료", slug: "language-learning" },
          { id: "sub-6-3", name: "자격증/시험 대비", slug: "certification-test" },
          { id: "sub-6-4", name: "학습 노하우/방법론", slug: "learning-knowhow" },
          { id: "sub-6-5", name: "기타 학습 및 자기계발", slug: "self-development" },
        ]
      },
      { 
        id: "cat-7",
        name: "여행 & 라이프", 
        slug: "travel-life",
        icon: "Plane",
        subCategories: [
          { id: "sub-7-1", name: "효율적인 여행 계획", slug: "travel-planning" },
          { id: "sub-7-2", name: "알뜰 여행 꿀팁", slug: "budget-travel-tip" },
          { id: "sub-7-3", name: "테마별 여행 코스", slug: "themed-travel-course" },
          { id: "sub-7-4", name: "드론 및 VR 영상", slug: "drone-vr-video" },
          { id: "sub-7-5", name: "기타 여행 및 라이프", slug: "travel" },
        ]
      },
      { 
        id: "cat-8",
        name: "생활 & 노하우", 
        slug: "living-parenting-tips",
        icon: "Users",
        subCategories: [
          { id: "sub-8-1", name: "육아 노하우/템플릿", slug: "parenting-knowhow" },
          { id: "sub-8-2", name: "건강 및 식단 관리", slug: "health-diet-management" },
          { id: "sub-8-3", name: "현명한 절약 비법", slug: "saving-tip" },
          { id: "sub-8-4", name: "반려동물 케어", slug: "pet-care" },
          { id: "sub-8-5", name: "기타 생활 및 노하우", slug: "living" },
        ]
      },
      { 
        id: "cat-9",
        name: "모빌리티 & 자동차", 
        slug: "mobility-automobile",
        icon: "Car",
        subCategories: [
          { id: "sub-9-1", name: "신차/중고차 구매가이드", slug: "car-purchase-guide" },
          { id: "sub-9-2", name: "차량 관리 및 정비", slug: "car-maintenance" },
          { id: "sub-9-3", name: "전기차 트렌드 및 보조금", slug: "electric-car-trend" },
          { id: "sub-9-4", name: "미래 모빌리티 리포트", slug: "future-mobility-report" },
          { id: "sub-9-5", name: "기타 모빌리티 및 자동차", slug: "mobility" },
        ]
      },
      { id: "cat-10", name: "문서 & 서식", slug: "documents-templates", icon: "Home", subCategories: [
          { id: "sub-10-1", name: "부동산 계약서", slug: "real-estate-contract" },
          { id: "sub-10-2", name: "법률/행정 서식", slug: "legal-form" },
          { id: "sub-10-3", name: "각종 보고서 템플릿", slug: "report-template" },
          { id: "sub-10-4", name: "개인/가계 양식", slug: "personal-form" },
          { id: "sub-10-5", name: "기타 문서 및 서식", slug: "document" },
        ]
      },
];

const generateExamplePrompts = (): Prompt[] => {
    let prompts: Prompt[] = [];
    const authors = ["김프로", "이노베이터", "박주임", "최고수", "디지털노마드", "데이터분석가"];
    
    const productIdeas: { [key: string]: { title: string; desc: string }[] } = {
        "chatgpt": [
            { title: "블로그 포스팅 자동화 프롬프트", desc: "주제만 입력하면 SEO에 최적화된 블로그 글을 자동으로 생성해주는 프롬프트 세트입니다." },
            { title: "유튜브 스크립트 작성 프롬프트", desc: "5분짜리 정보성 유튜브 영상의 도입부, 본문, 클로징 멘트를 한번에 작성해줍니다." },
        ],
        "dall-e": [
            { title: "미드저니 V6 캐릭터 디자인 프롬프트", desc: "일관성 있는 웹소설, 게임 캐릭터를 만들기 위한 상세 파라미터가 포함된 프롬프트입니다." },
            { title: "DALL-E 3 PPT 배경 이미지 프롬프트", desc: "깔끔하고 전문적인 느낌의 프레젠테이션용 배경 이미지를 생성하는 프롬프트입니다." },
        ],
        "sora-pika": [
            { title: "Pika Labs 숏폼 영상 제작 가이드", desc: "이미지 한장으로 역동적인 릴스, 숏츠 영상을 만드는 노하우를 담았습니다." },
            { title: "Suno AI 음악 생성 프롬프트", desc: "브이로그, 홍보영상에 어울리는 배경음악(BGM)을 장르별로 생성하는 프롬프트입니다." },
        ],
        "rpa-zapier": [
            { title: "Zapier로 뉴스레터 발송 자동화하기", desc: "구글 시트에 명단을 추가하면 자동으로 메일침프, 스티비로 뉴스레터를 발송하는 워크플로우입니다." },
            { title: "RPA 부동산 데이터 수집 스크립트", desc: "특정 지역의 부동산 매물 정보를 매일 아침 자동으로 스크래핑하여 엑셀로 정리하는 스크립트입니다." },
        ],
        "web-app-template": [
            { title: "Next.js + Firebase 인증 보일러플레이트", desc: "최신 Next.js 앱 라우터와 Firebase를 연동한 소셜로그인, 이메일 인증 기능이 구현된 템플릿입니다." },
            { title: "SaaS를 위한 랜딩페이지 템플릿", desc: "React와 Tailwind로 제작된 고품질 랜딩페이지 템플릿. 바로 배포하여 사용할 수 있습니다." },
        ],
        "data-analysis": [
            { title: "Looker Studio 매출 대시보드 템플릿", desc: "GA4 데이터를 연동하여 실시간 매출, 사용자 유입 경로를 한 눈에 파악할 수 있는 대시보드입니다." },
            { title: "Python 주식 데이터 분석 스크립트", desc: "특정 종목의 과거 주가 데이터를 분석하고 이동평균선 등 기술적 지표를 시각화하는 코드입니다." },
        ],
         "automation-script": [
             { title: "Python 이메일 자동 분류 및 응답", desc: "Gmail API를 사용하여 특정 키워드가 포함된 이메일을 자동으로 분류하고 템플릿에 따라 회신합니다." },
             { title: "구글 시트 데이터 자동 취합 스크립트", desc: "여러 구글 시트 파일에 나뉘어 있는 데이터를 하나의 마스터 시트로 매일 새벽 자동으로 취합하고 정리합니다." },
        ],
        "iac": [
            { title: "Terraform AWS VPC 구성 코드", desc: "보안 그룹, 서브넷, 라우팅 테이블이 포함된 기본적인 AWS VPC 환경을 코드로 배포합니다." },
            { title: "Docker 기반 Nginx/Node.js 환경", desc: "웹서버와 API서버를 Docker-compose로 한번에 실행할 수 있는 설정 파일입니다." },
        ],
        "etf-trading": [
            { title: "미국 배당주 포트폴리오 (엑셀)", desc: "장기적인 우상향이 기대되는 고배당 ETF 및 개별주 리스트와 비중 관리 시트입니다." },
            { title: "퀀트 투자 백테스팅 Python 코드", desc: "특정 투자 전략(e.g. 저PBR)의 과거 수익률을 검증해볼 수 있는 파이썬 백테스팅 스크립트입니다." },
        ],
        "real-estate-report": [
            { title: "수도권 GTX-A 노선 인근 아파트 분석", desc: "GTX-A 노선 개통에 따른 수혜가 예상되는 지역의 아파트 단지별 시세, 학군, 교통 정보를 담은 리포트입니다." },
            { title: "소형 오피스텔 투자 가이드북", desc: "대학가, 역세권 등 월세 수익률이 높은 소형 오피스텔 투자 시 체크리스트와 주의사항을 정리했습니다." },
        ],
         "side-hustle": [
            { title: "월 100만원 블로그 부수입 만들기", desc: "블로그 주제 선정부터 키워드 분석, 제휴 마케팅을 통해 수익을 창출하는 전체 과정을 담았습니다." },
            { title: "숨고, 크몽 전문가로 살아남기", desc: "재능 마켓 플랫폼에서 월 순수익 300만원을 달성한 프로필 작성, 고객 응대, 포트폴리오 관리 노하우입니다." },
        ],
        "sns-marketing": [
            { title: "인스타그램 릴스 떡상 공식", desc: "조회수 100만 이상을 기록한 릴스의 공통점을 분석한 리포트와 바로 적용 가능한 템플릿 5종을 제공합니다." },
            { title: "구매전환율 3배 높이는 블로그 글쓰기", desc: "정보성 콘텐츠를 통해 잠재 고객을 설득하고 실제 구매로 연결시키는 글쓰기 비법을 담았습니다." }
        ],
        "business-plan": [
            { title: "정부지원사업 합격 사업계획서 템플릿", desc: "예비창업패키지, 청년창업사관학교 등 주요 정부지원사업에 합격한 사업계획서 원본과 작성 가이드입니다." },
            { title: "투자 유치용 IR 피치덱 템플릿(PPT)", desc: "VC 투자자들이 주목하는 핵심 내용을 담은 IR 발표자료 템플릿과 섹션별 작성 팁을 포함합니다." }
        ],
        "ux-ui-resource": [
            { title: "Figma 디자인 시스템 키트", desc: "컬러, 타이포그래피, 컴포넌트가 정의된 디자인 시스템으로, 앱/웹 디자인 시간을 50% 단축시켜줍니다." },
            { title: "모바일 앱 UX 라이팅 가이드", desc: "사용자의 행동을 유도하고 이탈을 막는 버튼, 오류 메시지, 툴팁 등 UX 라이팅 사례집입니다." }
        ],
    };

    let promptIdCounter = 1;

    EXAMPLE_CATEGORIES.forEach(category => {
        category.subCategories.forEach(subCategory => {
            const ideas = productIdeas[subCategory.slug] || [
                { title: `${subCategory.name} 실전 노하우`, desc: `${subCategory.name} 분야의 전문가가 알려주는 핵심 비법과 템플릿을 제공합니다.` },
                { title: `${subCategory.name} 시작하기`, desc: `초보자를 위한 ${subCategory.name} 입문 가이드. 이것 하나로 충분합니다.` }
            ];

            ideas.forEach((idea, index) => {
                const promptId = `ex-${category.slug}-${subCategory.slug}-${index + 1}`;
                const sellerId = `seller-${promptIdCounter % authors.length}`;
                prompts.push({
                    id: promptId,
                    title: idea.title,
                    description: idea.desc,
                    author: authors[promptIdCounter % authors.length],
                    sellerId: sellerId,
                    sellerPhotoUrl: `https://picsum.photos/seed/${sellerId}/100/100`,
                    category: category.name,
                    categorySlug: category.slug,
                    subCategorySlug: subCategory.slug,
                    price: 0, // 모든 예제 상품은 무료
                    image: `https://picsum.photos/seed/${promptId}/400/300`,
                    aiHint: `${subCategory.name.split(' ')[0]}`,
                    tags: [category.name, subCategory.name, "예제"],
                    isExample: true, // 모든 예제 상품에 플래그 설정
                    visibility: 'public',
                    sellOnce: false,
                    contentUrl: "https://prmart.ai/example-content",
                    createdAt: new Date(Date.now() - (promptIdCounter * 1000 * 3600 * 24)).toISOString(),
                    updatedAt: new Date(Date.now() - (promptIdCounter * 1000 * 3600 * 24)).toISOString(),
                    stats: {
                        views: Math.floor(Math.random() * 2000) + 100,
                        likes: Math.floor(Math.random() * 300) + 10,
                        sales: Math.floor(Math.random() * 100) + 5,
                    },
                    rating: parseFloat((Math.random() * (5.0 - 4.2) + 4.2).toFixed(1)),
                    reviews: Math.floor(Math.random() * 50) + 5,
                });
                promptIdCounter++;
            });
        });
    });
    // Add rankings to top 10 prompts based on stats
    prompts.sort((a,b) => (b.stats!.sales + b.stats!.likes) - (a.stats!.sales + a.stats!.likes));
    prompts.forEach((p, i) => {
        if(i < 10) p.rank = i + 1;
    });

    return prompts.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
};

const EXAMPLE_PROMPTS: Prompt[] = generateExamplePrompts();

const EXAMPLE_IDEA_REQUESTS: IdeaRequest[] = EXAMPLE_CATEGORIES.map((category, index) => {
    const examples = [
        { title: "유튜브 채널아트 & 썸네일 자동 생성기", author: "크리에이터준", authorId: "user-example-1", budget: 0, description: "채널 컨셉과 영상 제목만 입력하면 알아서 세련된 채널아트와 썸네일을 여러 개 만들어주는 AI 프롬프트를 원해요." },
        { title: "부동산 월세 수익률 계산기 (엑셀 템플릿)", author: "재테크왕", authorId: "user-example-2", budget: 0, description: "매매가, 보증금, 월세 등 기본 정보만 입력하면 연간/월간 수익률을 자동으로 계산해주는 엑셀 대시보드가 필요합니다." },
    ];
    const example = examples[index % examples.length];
    return {
        id: `req-${index + 1}`,
        title: example.title,
        author: example.author,
        authorId: example.authorId,
        category: category.name,
        categorySlug: category.slug,
        budget: example.budget,
        proposals: Math.floor(Math.random() * 15),
        description: example.description,
        isExample: true, // 모든 예제 요청에 플래그 설정
        createdAt: new Date(Date.now() - (index * 1000 * 3600 * 24)).toISOString(),
    }
});


function serializeDoc(doc: any): any {
    if (!doc.exists()) {
        return null;
    }
    const data = doc.data();
    if (!data) return null;

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

// Helper to chunk arrays for Firestore 'in' queries
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}


export async function getProducts(): Promise<Prompt[]> {
    return fetchFromCache('products', async () => {
        try {
            const snapshot = await getDocs(query(collection(db, "products"), orderBy("createdAt", "desc")));
            const dbProducts = snapshot.docs.map(doc => serializeDoc(doc) as Prompt).filter(Boolean);
            if (dbProducts.length === 0) {
                 console.warn("Firestore 'products' collection is empty, returning example data.");
                 return EXAMPLE_PROMPTS;
            }
            return [...dbProducts, ...EXAMPLE_PROMPTS];
        } catch (error) {
            console.error("Error fetching products, returning example data:", error);
            return EXAMPLE_PROMPTS;
        }
    });
}

export async function getProductsBySeller(sellerId: string): Promise<Prompt[]> {
    return fetchFromCache(`products_by_seller_${sellerId}`, async () => {
         try {
            const q = query(collection(db, "products"), where("sellerId", "==", sellerId));
            const snapshot = await getDocs(q);
            const products = snapshot.docs.map(doc => serializeDoc(doc) as Prompt).filter(Boolean);
            // Sort by createdAt client-side to avoid composite index
            return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } catch (error) {
            console.error(`Error fetching products for seller ${sellerId}:`, error);
            // Fallback to example data for example sellers
            const exampleProducts = EXAMPLE_PROMPTS.filter(p => p.sellerId === sellerId);
            return exampleProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    });
}


export async function getProduct(id: string): Promise<Prompt | null> {
    const cacheKey = `product_${id}`;
    return fetchFromCache(cacheKey, async () => {
        if (id.startsWith('ex-')) {
            const exampleProduct = EXAMPLE_PROMPTS.find(p => p.id === id);
            return exampleProduct || null;
        }
        try {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return serializeDoc(docSnap) as Prompt;
            }
        } catch (error) {
             console.error(`Error fetching product ${id}, falling back to example data:`, error);
        }
        
        return null;
    });
}

export async function getProductsByCategorySlug(slug: string, count?: number, excludeId?: string): Promise<Prompt[]> {
    const cacheKey = `products_by_category_${slug}_${count}_${excludeId}`;
    return fetchFromCache(cacheKey, async () => {
        const allProducts = await getProducts();
        const productsInCategory = allProducts.filter(p => p.categorySlug === slug);
        let filteredProducts = excludeId ? productsInCategory.filter(p => p.id !== excludeId) : productsInCategory;
        return count ? filteredProducts.slice(0, count) : filteredProducts;
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

export async function getIdeaRequests(ids?: string[]): Promise<IdeaRequest[]> {
    const cacheKey = ids ? `ideaRequests_${ids.join('_')}` : 'ideaRequests_all';
    
    return fetchFromCache(cacheKey, async () => {
        try {
            let dbRequests: IdeaRequest[] = [];
            if (ids && ids.length > 0) {
                 // Firestore 'in' query supports up to 30 elements.
                const idChunks = chunkArray(ids, 30);
                const queryPromises = idChunks.map(chunk => 
                    getDocs(query(collection(db, "ideaRequests"), where("__name__", "in", chunk)))
                );
                const snapshotChunks = await Promise.all(queryPromises);
                snapshotChunks.forEach(snapshot => {
                    const chunkRequests = snapshot.docs.map(doc => serializeDoc(doc) as IdeaRequest).filter(Boolean);
                    dbRequests.push(...chunkRequests);
                });
            } else {
                 const snapshot = await getDocs(query(collection(db, "ideaRequests"), orderBy("createdAt", "desc")));
                 dbRequests = snapshot.docs.map(doc => serializeDoc(doc) as IdeaRequest).filter(Boolean);
            }

            const combinedRequests = [...dbRequests, ...EXAMPLE_IDEA_REQUESTS];
            // If specific IDs were requested, filter the combined list.
            if(ids && ids.length > 0){
                const idSet = new Set(ids);
                return combinedRequests.filter(req => idSet.has(req.id));
            }

            if (dbRequests.length === 0 && !ids) {
                console.warn("Firestore 'ideaRequests' collection is empty, returning example data.");
                return EXAMPLE_IDEA_REQUESTS.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }

            return combinedRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } catch (error) {
            console.error("Error fetching idea requests, returning example data:", error);
            return EXAMPLE_IDEA_REQUESTS;
        }
    });
}

export async function getIdeaRequest(id: string): Promise<IdeaRequest | null> {
    const cacheKey = `ideaRequest_${id}`;
    return fetchFromCache(cacheKey, async () => {
        if (id.startsWith('req-')) {
            const exampleRequest = EXAMPLE_IDEA_REQUESTS.find(r => r.id === id);
            return exampleRequest || null;
        }
        try {
            const docRef = doc(db, "ideaRequests", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return serializeDoc(docSnap) as IdeaRequest;
            }
        } catch (error) {
            console.error(`Error fetching idea request ${id}:`, error);
        }

        return null;
    });
}

export async function saveProduct(productData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'stats' | 'rating' | 'reviews'>) {
    try {
        const now = Timestamp.now();
        const docRef = await addDoc(collection(db, "products"), {
            ...productData,
            createdAt: now,
            updatedAt: now,
            stats: { views: 0, likes: 0, sales: 0 },
            rating: 0,
            reviews: 0,
            sellOnce: productData.sellOnce || false,
        });
        return docRef.id;
    } catch (error) {
        console.error("Error saving product: ", error);
        throw new Error("상품을 데이터베이스에 저장하는 데 실패했습니다.");
    }
}

export async function saveIdeaRequest(requestData: Omit<IdeaRequest, 'id' | 'createdAt' | 'isExample' | 'authorId'>) {
    try {
        const now = Timestamp.now();
        const docRef = await addDoc(collection(db, "ideaRequests"), {
            ...requestData,
            isExample: false,
            createdAt: now,
        });
        return docRef.id;
    } catch (error) {
        console.error("Error saving idea request: ", error);
        throw new Error("아이디어 요청을 데이터베이스에 저장하는 데 실패했습니다.");
    }
}


export async function getSellerDashboardData(sellerId: string) {
    const cacheKey = `seller_dashboard_${sellerId}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            // 1. Fetch orders by sellerId directly for better performance
            const ordersQuery = query(collection(db, "orders"), where("sellerId", "==", sellerId));
            const ordersSnapshot = await getDocs(ordersQuery);
            const orders: Order[] = ordersSnapshot.docs.map(doc => serializeDoc(doc) as Order).filter(Boolean);
            orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

            // 2. Fetch products by seller
            const sellerProducts = await getProductsBySeller(sellerId);

            // 3. Calculate stats safely
            const ratedProducts = sellerProducts.filter(p => p.rating && p.rating > 0);
            const averageRating = ratedProducts.length > 0 
                ? ratedProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / ratedProducts.length
                : 0;

            const stats: SellerStats = {
                totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
                totalSales: orders.length,
                productCount: sellerProducts.length,
                averageRating: averageRating,
                reviewCount: sellerProducts.reduce((sum, p) => sum + (p.reviews || 0), 0),
            };

            // 4. Get recent sales (last 5)
            const recentSales = orders.slice(0, 5);

            // 5. Get best sellers
            const salesByProduct: { [key: string]: { sales: number, revenue: number } } = {};
            orders.forEach(order => {
                if (!salesByProduct[order.productId]) {
                    salesByProduct[order.productId] = { sales: 0, revenue: 0 };
                }
                salesByProduct[order.productId].sales++;
                salesByProduct[order.productId].revenue += order.amount;
            });
            const bestSellers = Object.keys(salesByProduct)
                .map(productId => {
                    const product = sellerProducts.find(p => p.id === productId);
                    return { ...product, ...salesByProduct[productId] };
                })
                .filter(p => p.id) // Filter out cases where product was not found
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 3) as (Prompt & { sales: number; revenue: number; })[];
            
            // 6. Aggregate sales by month for the graph
            const salesByMonth: { name: string, total: number }[] = Array.from({ length: 12 }, (_, i) => {
                const month = new Date(0, i).toLocaleString('ko-KR', { month: 'short' });
                return { name: month, total: 0 };
            });

            orders.forEach(order => {
                const monthIndex = new Date(order.orderDate).getMonth();
                salesByMonth[monthIndex].total += order.amount;
            });


            return { stats, recentSales, bestSellers, salesByMonth };

        } catch (error) {
            console.error("Error fetching seller dashboard data: ", error);
            // Return empty/default data on error
            return {
                stats: { totalRevenue: 0, totalSales: 0, productCount: 0, averageRating: 0, reviewCount: 0 },
                recentSales: [],
                bestSellers: [],
                salesByMonth: Array.from({ length: 12 }, (_, i) => ({ name: `${i+1}월`, total: 0 }))
            };
        }
    });
}

export async function getSellerProfile(userId: string): Promise<SellerProfile | null> {
    const cacheKey = `seller_profile_${userId}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const docRef = doc(db, 'sellers', userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return serializeDoc(docSnap) as SellerProfile;
            }
             // If no profile in DB, check auth user data
            const exampleUser = EXAMPLE_PROMPTS.find(p => p.sellerId === userId);
            if (exampleUser) {
                return {
                    sellerName: exampleUser.author,
                    sellerBio: `${exampleUser.author}의 프로필입니다.`,
                    photoUrl: exampleUser.sellerPhotoUrl
                }
            }
        } catch (error) {
            console.error(`Error fetching seller profile for ${userId}:`, error);
        }
        return null;
    });
}

export async function saveSellerProfile(userId: string, profile: Partial<SellerProfile>) {
    const docRef = doc(db, 'sellers', userId);
    await setDoc(docRef, profile, { merge: true });
}

export async function getOrdersByBuyer(buyerId: string): Promise<Order[]> {
    const cacheKey = `orders_by_buyer_${buyerId}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const q = query(collection(db, "orders"), where("buyerId", "==", buyerId));
            const snapshot = await getDocs(q);
            const orders = snapshot.docs.map(doc => serializeDoc(doc) as Order).filter(Boolean);
            return orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        } catch (error) {
            console.error(`Error fetching orders for buyer ${buyerId}:`, error);
            return [];
        }
    }, 10000);
}

export async function getReviewsByAuthor(authorId: string): Promise<Review[]> {
    const cacheKey = `reviews_by_author_${authorId}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const q = query(collection(db, "reviews"), where("authorId", "==", authorId));
            const snapshot = await getDocs(q);
            const reviews = snapshot.docs.map(doc => serializeDoc(doc) as Review).filter(Boolean);
            return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } catch (error) {
            console.error(`Error fetching reviews for author ${authorId}:`, error);
            return [];
        }
    }, 10000);
}


export async function getWishlistByUserId(userId: string): Promise<Wishlist | null> {
    const cacheKey = `wishlist_by_user_${userId}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const docRef = doc(db, "wishlists", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return serializeDoc(docSnap) as Wishlist;
            }
            return { userId, productIds: [] };
        } catch (error) {
            console.error(`Error fetching wishlist for user ${userId}:`, error);
            return null;
        }
    }, 10000);
}


export async function saveProposal(proposalData: Omit<Proposal, 'id' | 'createdAt' | 'status'>): Promise<string> {
    try {
        const docRef = await runTransaction(db, async (transaction: Transaction) => {
            const now = Timestamp.now();
            const newProposalRef = doc(collection(db, "proposals"));
            
            transaction.set(newProposalRef, {
                ...proposalData,
                createdAt: now,
                status: 'pending',
            });

            const requestRef = doc(db, "ideaRequests", proposalData.requestId);
            transaction.update(requestRef, { proposals: (await transaction.get(requestRef)).data()?.proposals + 1 || 1 });
            
            return newProposalRef;
        });
        
        return docRef.id;
    } catch (error) {
        console.error("Error saving proposal: ", error);
        throw new Error("제안을 데이터베이스에 저장하는 데 실패했습니다.");
    }
}


export async function getProposalsByAuthor(authorId: string): Promise<Proposal[]> {
    const cacheKey = `proposals_by_author_${authorId}`;
    return fetchFromCache(cacheKey, async () => {
        try {
            const q = query(collection(db, "proposals"), where("authorId", "==", authorId));
            const snapshot = await getDocs(q);
            const proposals = snapshot.docs.map(doc => serializeDoc(doc) as Proposal).filter(Boolean);
            return proposals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } catch (error) {
            console.error(`Error fetching proposals for author ${authorId}:`, error);
            // You might want to return mock proposals for example users
            if(authorId.includes("seller-")){
                 const mockProposals = [
                    {
                        id: "prop-1",
                        requestId: "req-1",
                        authorId: authorId,
                        authorName: "DevMaster",
                        authorAvatar: "https://picsum.photos/100/100?random=1",
                        content: "제가 만든 Next.js 보일러플레이트가 딱 맞을 것 같네요!",
                        productId: EXAMPLE_PROMPTS[0]?.id,
                        createdAt: new Date().toISOString(),
                        status: 'pending' as 'pending' | 'accepted'
                    },
                    {
                        id: "prop-2",
                        requestId: "req-2",
                        authorId: authorId,
                        authorName: "DevMaster",
                        authorAvatar: "https://picsum.photos/100/100?random=1",
                        content: "제 실전 코딩 테스트 문제 풀이집도 도움이 될 겁니다.",
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                        status: 'accepted' as 'pending' | 'accepted'
                    }
                ];
                return mockProposals;
            }
            return [];
        }
    }, 10000);
}


// Admin services
export async function getAdminDashboardData() {
  // In a real app, you'd fetch real data.
  // For now, we'll return some mock data.
  const kpi = {
    totalRevenue: { value: 5231890, change: 0.201 },
    totalSales: { value: 2350, change: 1.801 },
    totalProducts: { value: 12234, change: 0.19 },
    avgRating: { value: 4.8, totalReviews: 231 },
  };

  const pendingProducts = EXAMPLE_PROMPTS.slice(0, 5).map(p => ({
      ...p,
      status: 'pending'
  }));

  const recentUsers = [
      { name: 'Olivia Martin', email: 'olivia.martin@email.com', avatar: 'https://i.pravatar.cc/150?img=1', amount: '+₩1,999.00' },
      { name: 'Jackson Lee', email: 'jackson.lee@email.com', avatar: 'https://i.pravatar.cc/150?img=2', amount: '+₩39.00' },
      { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', avatar: 'https://i.pravatar.cc/150?img=3', amount: '+₩299.00' },
  ]

  return { kpi, pendingProducts, recentUsers };
}


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
        id: "cat-1",
        name: "AI & 생산성", 
        slug: "ai-and-production",
        icon: "Rocket",
        subCategories: [
          { id: "sub-1-1", name: "ChatGPT 활용 프롬프트", slug: slugify("ChatGPT 활용 프롬프트") },
          { id: "sub-1-2", name: "이미지 생성 (미드저니, DALL-E)", slug: slugify("이미지 생성 (미드저니, DALL-E)") },
          { id: "sub-1-3", name: "영상/음악 생성 (Sora, Pika)", slug: slugify("영상/음악 생성 (Sora, Pika)") },
          { id: "sub-1-4", name: "업무 자동화 (RPA, Zapier)", slug: slugify("업무 자동화 (RPA, Zapier)") },
          { id: "sub-1-5", name: "기타 AI 및 생산성", slug: slugify("기타 AI 생산성") },
        ]
      },
      { 
        id: "cat-2",
        name: "개발 & IT", 
        slug: "development-it-automation",
        icon: "Code",
        subCategories: [
          { id: "sub-2-1", name: "웹/앱 개발 템플릿", slug: slugify("웹/앱 개발 템플릿") },
          { id: "sub-2-2", name: "데이터 분석/시각화", slug: slugify("데이터 분석/시각화") },
          { id: "sub-2-3", name: "업무 자동화 스크립트", slug: slugify("업무 자동화 스크립트") },
          { id: "sub-2-4", name: "클라우드/인프라(IaC)", slug: slugify("클라우드/인프라(IaC)") },
          { id: "sub-2-5", name: "기타 개발 및 IT", slug: slugify("기타 개발 IT") },
        ]
      },
      { 
        id: "cat-3",
        name: "재테크 & 투자", 
        slug: "investment-fintech",
        icon: "LineChart",
        subCategories: [
            { id: "sub-3-1", name: "주식/ETF 트레이딩 전략", slug: slugify("주식/ETF 트레이딩 전략") },
            { id: "sub-3-2", name: "부동산 투자 리포트", slug: slugify("부동산 투자 리포트") },
            { id: "sub-3-3", name: "N잡/부업 노하우", slug: slugify("N잡/부업 노하우") },
            { id: "sub-3-4", name: "세금 및 절세 전략", slug: slugify("세금 및 절세 전략") },
            { id: "sub-3-5", name: "기타 재테크 및 투자", slug: slugify("기타 재테크 투자") },
        ]
      },
      { 
        id: "cat-4",
        name: "비즈니스 & 마케팅", 
        slug: "business-marketing",
        icon: "Briefcase",
        subCategories: [
            { id: "sub-4-1", name: "콘텐츠/SNS 마케팅", slug: slugify("콘텐츠/SNS 마케팅") },
            { id: "sub-4-2", name: "광고 운영 (GA, 메타)", slug: slugify("광고 운영 (GA, 메타)") },
            { id: "sub-4-3", name: "사업 계획서/제안서", slug: slugify("사업 계획서/제안서") },
            { id: "sub-4-4", name: "브랜딩/퍼스널 브랜딩", slug: slugify("브랜딩/퍼스널 브랜딩") },
            { id: "sub-4-5", name: "기타 비즈니스 및 마케팅", slug: slugify("기타 비즈니스 마케팅") },
        ]
      },
      { 
        id: "cat-5",
        name: "창작 & 디자인", 
        slug: "creation-design",
        icon: "Brush",
        subCategories: [
            { id: "sub-5-1", name: "UX/UI 디자인 리소스", slug: slugify("UX/UI 디자인 리소스") },
            { id: "sub-5-2", name: "PPT/Keynote 템플릿", slug: slugify("PPT/Keynote 템플릿") },
            { id: "sub-5-3", name: "영상 편집 템플릿", slug: slugify("영상 편집 템플릿") },
            { id: "sub-5-4", name: "그래픽 디자인 소스", slug: slugify("그래픽 디자인 소스") },
            { id: "sub-5-5", name: "기타 창작 및 디자인", slug: slugify("기타 창작 디자인") },
        ]
      },
      { 
        id: "cat-6",
        name: "학습 & 자기계발", 
        slug: "learning-self-development",
        icon: "BookOpen",
        subCategories: [
          { id: "sub-6-1", name: "직무 스킬업", slug: slugify("직무 스킬업") },
          { id: "sub-6-2", name: "외국어 학습 자료", slug: slugify("외국어 학습 자료") },
          { id: "sub-6-3", name: "자격증/시험 대비", slug: slugify("자격증/시험 대비") },
          { id: "sub-6-4", name: "학습 노하우/방법론", slug: slugify("학습 노하우/방법론") },
          { id: "sub-6-5", name: "기타 학습 및 자기계발", slug: slugify("기타 학습 자기계발") },
        ]
      },
      { 
        id: "cat-7",
        name: "여행 & 라이프", 
        slug: "travel-life",
        icon: "Plane",
        subCategories: [
          { id: "sub-7-1", name: "효율적인 여행 계획", slug: slugify("효율적인 여행 계획") },
          { id: "sub-7-2", name: "알뜰 여행 꿀팁", slug: slugify("알뜰 여행 꿀팁") },
          { id: "sub-7-3", name: "테마별 여행 코스", slug: slugify("테마별 여행 코스") },
          { id: "sub-7-4", name: "여행 사진/영상 보정", slug: slugify("여행 사진/영상 보정") },
          { id: "sub-7-5", name: "기타 여행 및 라이프", slug: slugify("기타 여행 라이프") },
        ]
      },
      { 
        id: "cat-8",
        name: "생활 & 노하우", 
        slug: "living-parenting-tips",
        icon: "Users",
        subCategories: [
          { id: "sub-8-1", name: "육아 노하우/템플릿", slug: slugify("육아 노하우/템플릿") },
          { id: "sub-8-2", name: "건강 및 식단 관리", slug: slugify("건강 및 식단 관리") },
          { id: "sub-8-3", name: "현명한 절약 비법", slug: slugify("현명한 절약 비법") },
          { id: "sub-8-4", name: "반려동물 케어", slug: slugify("반려동물 케어") },
          { id: "sub-8-5", name: "기타 생활 및 노하우", slug: slugify("기타 생활 노하우") },
        ]
      },
      { 
        id: "cat-9",
        name: "모빌리티 & 자동차", 
        slug: "mobility-automobile",
        icon: "Car",
        subCategories: [
          { id: "sub-9-1", name: "신차/중고차 구매가이드", slug: slugify("신차/중고차 구매가이드") },
          { id: "sub-9-2", name: "차량 관리 및 정비", slug: slugify("차량 관리 및 정비") },
          { id: "sub-9-3", name: "전기차 트렌드 및 보조금", slug: slugify("전기차 트렌드 및 보조금") },
          { id: "sub-9-4", name: "미래 모빌리티 리포트", slug: slugify("미래 모빌리티 리포트") },
          { id: "sub-9-5", name: "기타 모빌리티 및 자동차", slug: slugify("기타 모빌리티 자동차") },
        ]
      },
      { 
        id: "cat-10",
        name: "문서 & 서식", 
        slug: "documents-templates",
        icon: "Home",
        subCategories: [
          { id: "sub-10-1", name: "부동산 계약서", slug: slugify("부동산 계약서") },
          { id: "sub-10-2", name: "법률/행정 서식", slug: slugify("법률/행정 서식") },
          { id: "sub-10-3", name: "각종 보고서 템플릿", slug: slugify("각종 보고서 템플릿") },
          { id: "sub-10-4", name: "개인/가계 양식", slug: slugify("개인/가계 양식") },
          { id: "sub-10-5", name: "기타 문서 및 서식", slug: slugify("기타 문서/서식") },
        ]
      },
];

const generateExamplePrompts = (): Prompt[] => {
    let prompts: Prompt[] = [];
    const authors = ["김프로", "이노베이터", "박주임", "최고수", "디지털노마드", "데이터분석가"];
    
    const productIdeas = {
        "chatgpt-활용-프롬프트": [
            { title: "블로그 포스팅 자동화 프롬프트", desc: "주제만 입력하면 SEO에 최적화된 블로그 글을 자동으로 생성해주는 프롬프트 세트입니다." },
            { title: "유튜브 스크립트 작성 프롬프트", desc: "5분짜리 정보성 유튜브 영상의 도입부, 본문, 클로징 멘트를 한번에 작성해줍니다." },
        ],
        "이미지-생성-미드저니-dall-e": [
            { title: "미드저니 V6 캐릭터 디자인 프롬프트", desc: "일관성 있는 웹소설, 게임 캐릭터를 만들기 위한 상세 파라미터가 포함된 프롬프트입니다." },
            { title: "DALL-E 3 PPT 배경 이미지 프롬프트", desc: "깔끔하고 전문적인 느낌의 프레젠테이션용 배경 이미지를 생성하는 프롬프트입니다." },
        ],
        "영상-음악-생성-sora-pika": [
            { title: "Pika Labs 숏폼 영상 제작 가이드", desc: "이미지 한장으로 역동적인 릴스, 숏츠 영상을 만드는 노하우를 담았습니다." },
            { title: "Suno AI 음악 생성 프롬프트", desc: "브이로그, 홍보영상에 어울리는 배경음악(BGM)을 장르별로 생성하는 프롬프트입니다." },
        ],
        "업무-자동화-rpa-zapier": [
            { title: "Zapier로 뉴스레터 발송 자동화하기", desc: "구글 시트에 명단을 추가하면 자동으로 메일침프, 스티비로 뉴스레터를 발송하는 워크플로우입니다." },
            { title: "RPA 부동산 데이터 수집 스크립트", desc: "특정 지역의 부동산 매물 정보를 매일 아침 자동으로 스크래핑하여 엑셀로 정리하는 스크립트입니다." },
        ],
        "웹-앱-개발-템플릿": [
            { title: "Next.js + Firebase 인증 보일러플레이트", desc: "최신 Next.js 앱 라우터와 Firebase를 연동한 소셜로그인, 이메일 인증 기능이 구현된 템플릿입니다." },
            { title: "SaaS를 위한 랜딩페이지 템플릿", desc: "React와 Tailwind로 제작된 고품질 랜딩페이지 템플릿. 바로 배포하여 사용할 수 있습니다." },
        ],
        "데이터-분석-시각화": [
            { title: "Looker Studio 매출 대시보드 템플릿", desc: "GA4 데이터를 연동하여 실시간 매출, 사용자 유입 경로를 한 눈에 파악할 수 있는 대시보드입니다." },
            { title: "Python 주식 데이터 분석 스크립트", desc: "특정 종목의 과거 주가 데이터를 분석하고 이동평균선 등 기술적 지표를 시각화하는 코드입니다." },
        ],
        "업무-자동화-스크립트": [
             { title: "Python 이메일 자동 분류 및 응답", desc: "Gmail API를 사용하여 특정 키워드가 포함된 이메일을 자동으로 분류하고 템플릿에 따라 회신합니다." },
             { title: "구글 시트 데이터 자동 취합 스크립트", desc: "여러 구글 시트 파일에 나뉘어 있는 데이터를 하나의 마스터 시트로 매일 새벽 자동으로 취합하고 정리합니다." },
        ],
        "클라우드-인프라-iac": [
            { title: "Terraform AWS VPC 구성 코드", desc: "보안 그룹, 서브넷, 라우팅 테이블이 포함된 기본적인 AWS VPC 환경을 코드로 배포합니다." },
            { title: "Docker 기반 Nginx/Node.js 환경", desc: "웹서버와 API서버를 Docker-compose로 한번에 실행할 수 있는 설정 파일입니다." },
        ],
        "주식-etf-트레이딩-전략": [
            { title: "미국 배당주 포트폴리오 (엑셀)", desc: "장기적인 우상향이 기대되는 고배당 ETF 및 개별주 리스트와 비중 관리 시트입니다." },
            { title: "퀀트 투자 백테스팅 Python 코드", desc: "특정 투자 전략(e.g. 저PBR)의 과거 수익률을 검증해볼 수 있는 파이썬 백테스팅 스크립트입니다." },
        ],
        "부동산-투자-리포트": [
            { title: "수도권 GTX-A 노선 인근 아파트 분석", desc: "GTX-A 노선 개통에 따른 수혜가 예상되는 지역의 아파트 단지별 시세, 학군, 교통 정보를 담은 리포트입니다." },
            { title: "소형 오피스텔 투자 가이드북", desc: "대학가, 역세권 등 월세 수익률이 높은 소형 오피스텔 투자 시 체크리스트와 주의사항을 정리했습니다." },
        ],
         "n잡-부업-노하우": [
            { title: "월 100만원 블로그 부수입 만들기", desc: "블로그 주제 선정부터 키워드 분석, 제휴 마케팅을 통해 수익을 창출하는 전체 과정을 담았습니다." },
            { title: "숨고, 크몽 전문가로 살아남기", desc: "재능 마켓 플랫폼에서 월 순수익 300만원을 달성한 프로필 작성, 고객 응대, 포트폴리오 관리 노하우입니다." },
        ],
        "콘텐츠-sns-마케팅": [
            { title: "인스타그램 릴스 떡상 공식", desc: "조회수 100만 이상을 기록한 릴스의 공통점을 분석한 리포트와 바로 적용 가능한 템플릿 5종을 제공합니다." },
            { title: "구매전환율 3배 높이는 블로그 글쓰기", desc: "정보성 콘텐츠를 통해 잠재 고객을 설득하고 실제 구매로 연결시키는 글쓰기 비법을 담았습니다." }
        ],
        "사업-계획서-제안서": [
            { title: "정부지원사업 합격 사업계획서 템플릿", desc: "예비창업패키지, 청년창업사관학교 등 주요 정부지원사업에 합격한 사업계획서 원본과 작성 가이드입니다." },
            { title: "투자 유치용 IR 피치덱 템플릿(PPT)", desc: "VC 투자자들이 주목하는 핵심 내용을 담은 IR 발표자료 템플릿과 섹션별 작성 팁을 포함합니다." }
        ],
        "ux-ui-디자인-리소스": [
            { title: "Figma 디자인 시스템 키트", desc: "컬러, 타이포그래피, 컴포넌트가 정의된 디자인 시스템으로, 앱/웹 디자인 시간을 50% 단축시켜줍니다." },
            { title: "모바일 앱 UX 라이팅 가이드", desc: "사용자의 행동을 유도하고 이탈을 막는 버튼, 오류 메시지, 툴팁 등 UX 라이팅 사례집입니다." }
        ],
    };

    let promptIdCounter = 1;

    EXAMPLE_CATEGORIES.forEach(category => {
        category.subCategories.forEach(subCategory => {
            const ideas = productIdeas[subCategory.slug as keyof typeof productIdeas] || [
                { title: `${subCategory.name} 실전 노하우`, desc: `${subCategory.name} 분야의 전문가가 알려주는 핵심 비법과 템플릿을 제공합니다.` },
                { title: `${subCategory.name} 시작하기`, desc: `초보자를 위한 ${subCategory.name} 입문 가이드. 이것 하나로 충분합니다.` }
            ];

            ideas.forEach((idea, index) => {
                const promptId = `ex-${category.slug}-${subCategory.slug}-${index + 1}`;
                prompts.push({
                    id: promptId,
                    title: idea.title,
                    description: idea.desc,
                    author: authors[promptIdCounter % authors.length],
                    category: category.name,
                    categorySlug: category.slug,
                    subCategorySlug: subCategory.slug,
                    price: 0,
                    image: `https://picsum.photos/seed/${promptId}/400/300`,
                    aiHint: `${subCategory.name.split(' ')[0]}`,
                    tags: [category.name, subCategory.name, "예제"],
                    isExample: true,
                    createdAt: new Date(Date.now() - (promptIdCounter * 1000 * 3600 * 24)).toISOString(),
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

    
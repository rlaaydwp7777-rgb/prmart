

import { Rocket, Code, LineChart, Plane, Users, Briefcase, Brush, BookOpen, Car, Home, Wallet } from "lucide-react";

export const META = {
    TITLE: "prmart - 당신의 아이디어가 자산이 되는 곳",
    DESCRIPTION: "흩어진 지식을 연결하여 새로운 가치를 조립하세요. prmart는 AI 프롬프트, 개발 소스코드, 디자인 템플릿, 업무 자동화, 투자 전략 등 모든 종류의 디지털 자산을 거래하는 마이크로콘텐츠 마켓플레이스입니다.",
    ICON_URL: "✨"
}

export const BUTTONS = {
    START_EXPLORING: "아이디어 둘러보기",
    START_SELLING: "아이디어 판매하기",
    LOGIN: "로그인",
    SIGNUP: "회원가입",
    CONTINUE_WITH_GOOGLE: "Google 계정으로 계속하기",
    GENERATE_WITH_AI: "AI로 생성하기",
    REGISTER_PRODUCT: "상품 등록하기",
}

export const PROMPT_CARD_STRINGS = {
    BY: "By",
    REVIEWS: "리뷰",
}

export const CATEGORY_NAMES = {
    AI_PRODUCTION: "AI & 프로덕션",
    DEVELOPMENT_AUTOMATION: "개발 & IT 자동화",
    INVESTMENT_FINTECH: "재테크 & 투자",
    TRAVEL_LIFE: "여행 & 라이프",
    LIVING_PARENTING_TIPS: "생활 & 육아 꿀팁",
    BUSINESS_MARKETING: "비즈니스 & 마케팅",
    CREATION_DESIGN: "창작 & 디자인",
    LEARNING_SELF_DEVELOPMENT: "학습 & 자기계발",
    MOBILITY_AUTOMOBILE: "모빌리티 & 자동차",
    LIFE_INFRA: "라이프 인프라 (부동산·주거)",
}

export const ICONS: { [key: string]: React.FC<any> } = {
    Rocket, Code, LineChart, Plane, Users, Briefcase, Brush, BookOpen, Car, Home, Wallet
};

export const FOOTER_STRINGS = {
    SLOGAN: "흩어진 지식을 연결하여 새로운 가치를 조립하다.",
    QUICK_LINKS: "바로가기",
    SUPPORT: "고객지원",
    LEGAL: "Legal",
    PRODUCTS: "상품",
    BROWSE: "둘러보기",
    REQUEST_IDEA: "아이디어 요청",
    BECOME_SELLER: "판매자 되기",
    SUPPORT_CENTER: "고객센터",
    TERMS: "이용약관",
    PRIVACY_POLICY: "개인정보처리방침",
    COMPANY_NAME: "상호",
    COMPANY_NAME_KO: "(주)프롬프트마트",
    COMPANY_NAME_EN: "Promptmart Inc.",
    CEO: "대표",
    CEO_NAME: "홍길동",
    BUSINESS_NUMBER: "사업자등록번호",
    BUSINESS_NUMBER_VALUE: "123-45-67890",
    ECOMMERCE_NUMBER: "통신판매업신고번호",
    ECOMMERCE_NUMBER_VALUE: "2024-부산해운대-1234",
    ADDRESS: "주소",
    ADDRESS_VALUE: "부산광역시 해운대구 센텀중앙로 97, 에이스하이테크21 A동 1234호",
    EMAIL: "이메일",
    EMAIL_VALUE: "contact@prmart.ai",
    COPYRIGHT: `© ${new Date().getFullYear()} prmart. All Rights Reserved.`,
}

export const SELLER_DASHBOARD_STRINGS = {
    HEADLINE: "판매자 대시보드",
    SUBHEADLINE: "상품을 관리하고 판매 실적을 확인하세요.",
    AI_ASSISTANT_TITLE: "AI 상품 등록 도우미",
    AI_ASSISTANT_DESCRIPTION: "새 상품을 등록하세요. AI가 단계별로 도와드립니다.",
    PRODUCT_TITLE_LABEL: "상품 제목",
    PRODUCT_TITLE_PLACEHOLDER: "예: 최고의 생산성 플래너 템플릿",
    PRODUCT_DESCRIPTION_LABEL: "상품 설명",
    PRODUCT_DESCRIPTION_PLACEHOLDER: "상품, 기능, 그리고 대상 고객에 대해 설명해주세요.",
    CATEGORY_LABEL: "카테고리",
    CATEGORY_PLACEHOLDER: "카테고리 선택",
    PRICE_LABEL: "가격 (₩)",
    PRICE_PLACEHOLDER: "예: 10000",
    TAGS_LABEL: "태그",
    TAGS_PLACEHOLDER: "예: 생산성, 노션, 템플릿",
    TAGS_HINT: "태그는 쉼표로 구분해주세요.",
    QUALITY_REVIEW_RESULT: "AI 품질 검수 결과",
    SCORE: "점수",
    STATUS: "상태",
    REASON: "사유",
    APPROVED: "승인됨",
    PENDING_REVIEW: "수동 검토 대기",
    FORM_ERROR_TITLE: "폼 오류",
    GENERATION_COMPLETE: "설명 생성 완료!",
    GENERATION_COMPLETE_DESC: "AI가 상품 설명을 생성했습니다.",
    GENERATION_ERROR: "오류",
    GENERATION_ERROR_DESC_NO_TITLE: "설명을 생성하려면 5자 이상의 유효한 제목을 입력해주세요.",
}

export const AUTH_STRINGS = {
    WELCOME_BACK: "다시 오신 것을 환영합니다",
    LOGIN_DESCRIPTION: "대시보드와 구매 내역에 접근하려면 로그인하세요.",
    SIGNUP_TITLE: "prmart에 오신 것을 환영합니다",
    SIGNUP_DESCRIPTION: "단 몇 초 만에 가입하고 당신의 아이디어를 판매해보세요.",
    EMAIL_LABEL: "이메일",
    EMAIL_PLACEHOLDER: "project@prmart.ai",
    PASSWORD_LABEL: "비밀번호",
    PASSWORD_PLACEHOLDER: "••••••••",
    CONFIRM_PASSWORD_LABEL: "비밀번호 확인",
    REFERRAL_CODE_LABEL: "추천인 코드 (선택 사항)",
    REFERRAL_CODE_PLACEHOLDER: "추천 코드가 있다면 입력하세요",
    ALREADY_HAVE_ACCOUNT: "이미 계정이 있으신가요?",
    USER_MENU_GREETING: "prmart user",
    USER_MENU_EMAIL: "prmart@example.com",
    DASHBOARD_LINK: "대시보드",
    SETTINGS_LINK: "설정",
    LOGOUT_LINK: "로그아웃",
}

export const HEADER_LINKS = {
    VIEW_ALL: "전체보기",
    REQUEST_IDEA: "아이디어 요청",
    START_SELLING: "판매 시작하기",
    CATEGORIES: "카테고리",
}

export const SIDEBAR_STRINGS = {
    DASHBOARD: "대시보드",
    PRODUCTS: "상품",
    ANALYTICS: "분석",
    SETTINGS: "설정",
    HELP: "도움말",
    ACCOUNT: "계정",
}

export const ACCOUNT_STRINGS = {
    HEADLINE: "계정 관리",
    SUBHEADLINE: "구매내역, 다운로드, 프로필 설정을 관리하세요.",
    NAV_ORDERS: "구매 내역",
    NAV_DOWNLOADS: "다운로드",
    NAV_REVIEWS: "리뷰 관리",
    NAV_WISHLIST: "위시리스트",
    NAV_PROFILE: "프로필 설정",
    RECENT_ORDERS: "최근 구매 내역",
    RECENT_ORDERS_DESC: "최근 5건의 구매 내역입니다.",
    RECOMMENDED_FOR_YOU: "회원님을 위한 추천",
    ORDER_ID: "주문번호",
    ORDER_DATE: "주문일자",
    ORDER_ITEM: "상품명",
    ORDER_TOTAL: "총액",
    ORDER_STATUS: "상태",
    ORDER_ACTION: "작업",
    ORDER_VIEW_DETAILS: "상세보기",
    ORDERS_TITLE: "전체 구매 내역",
    ORDERS_DESC: "지금까지 구매한 모든 상품 내역입니다.",
    DOWNLOADS_TITLE: "다운로드 센터",
    DOWNLOADS_DESC: "구매한 상품을 여기서 다운로드할 수 있습니다.",
    DOWNLOADS_PRODUCT_NAME: "상품명",
    DOWNLOADS_PURCHASE_DATE: "구매일",
    DOWNLOADS_VERSION: "버전",
    DOWNLOADS_ACTION: "다운로드",
    DOWNLOADS_BUTTON: "받기",
    REVIEWS_TITLE: "내가 작성한 리뷰",
    REVIEWS_DESC: "구매한 상품에 대해 작성한 리뷰를 관리합니다.",
    REVIEWS_NO_REVIEWS: "아직 작성한 리뷰가 없습니다.",
    WISHLIST_TITLE: "위시리스트",
    WISHLIST_DESC: "관심 있는 상품을 저장하고 관리하세요.",
    WISHLIST_EMPTY: "위시리스트에 담은 상품이 없습니다.",
    SETTINGS_PROFILE_TITLE: "프로필",
    SETTINGS_PROFILE_DESC: "공개 프로필 정보를 수정합니다.",
    SETTINGS_NAME_LABEL: "이름",
    SETTINGS_EMAIL_LABEL: "이메일 주소",
    SETTINGS_SAVE_BUTTON: "변경사항 저장",
    SETTINGS_NOTIFICATIONS_TITLE: "알림 설정",
    SETTINGS_NOTIFICATIONS_DESC: "이메일 및 인앱 알림 수신 여부를 설정합니다.",
    SETTINGS_NOTI_PRODUCT_UPDATES: "상품 업데이트 소식",
    SETTINGS_NOTI_PRODUCT_UPDATES_DESC: "구매한 상품의 새로운 버전이 출시되면 알림을 받습니다.",
    SETTINGS_NOTI_PROMOTIONS: "이벤트 및 프로모션",
    SETTINGS_NOTI_PROMOTIONS_DESC: "prmart의 할인 및 이벤트 소식을 받습니다.",
    SETTINGS_NOTI_SECURITY: "보안 알림",
    SETTINGS_NOTI_SECURITY_DESC: "계정 관련 중요 변경사항에 대한 알림입니다.",
}

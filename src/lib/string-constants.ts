

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
    COMPANY_NAME_KO: "프마트(prmart)",
    COMPANY_NAME_EN: "prmart",
    CEO: "대표",
    CEO_NAME: "김명제",
    BUSINESS_NUMBER: "사업자등록번호",
    BUSINESS_NUMBER_VALUE: "102-34-63631",
    ECOMMERCE_NUMBER: "통신판매업신고번호",
    ECOMMERCE_NUMBER_VALUE: "2024-부산해운대-1234",
    ADDRESS: "주소",
    ADDRESS_VALUE: "부산광역시 기장군 일광읍 삼성2길 6, 5층 2호",
    EMAIL: "이메일",
    EMAIL_VALUE: "prmart7777@gmail.com",
    COPYRIGHT: `© ${new Date().getFullYear()} prmart. All Rights Reserved.`,
}

export const AUTH_STRINGS = {
    LOGIN: "로그인",
    SIGNUP: "회원가입",
    WELCOME_BACK: "다시 오신 것을 환영합니다",
    LOGIN_DESCRIPTION: "계정에 로그인하여 계속 진행하세요.",
    SIGNUP_TITLE: "당신의 아이디어가 자산이 되는 곳",
    SIGNUP_DESCRIPTION: "단 몇 초 만에 가입하고 당신의 아이디어를 판매해보세요.",
    EMAIL_LABEL: "이메일",
    EMAIL_PLACEHOLDER: "project@prmart.ai",
    PASSWORD_LABEL: "비밀번호",
    FORGOT_PASSWORD: "비밀번호를 잊으셨나요?",
    PASSWORD_PLACEHOLDER: "••••••••",
    CONFIRM_PASSWORD_LABEL: "비밀번호 확인",
    ALREADY_HAVE_ACCOUNT: "이미 계정이 있으신가요?",
    USER_MENU_GREETING: "prmart user",
    DASHBOARD_LINK: "판매자 대시보드",
    SETTINGS_LINK: "계정 설정",
    LOGOUT_LINK: "로그아웃",
    HERO_TITLE: "당신의 지식을 자산으로 만드세요",
}

export const HEADER_LINKS = {
    VIEW_ALL: "전체보기",
    REQUEST_IDEA: "아이디어 요청",
    START_SELLING: "판매 시작하기",
    CATEGORIES: "카테고리",
}

export const ACCOUNT_STRINGS = {
    HEADLINE: "계정 관리",
    SUBHEADLINE: "구매내역, 다운로드, 프로필 설정을 관리하세요.",
    NAV_ORDERS: "구매 내역",
    NAV_DOWNLOADS: "다운로드",
    NAV_REVIEWS: "내가 작성한 리뷰",
    NAV_WISHLIST: "위시리스트",
    NAV_PROFILE: "프로필 설정",
    
    DASHBOARD_RECENT_ORDERS: "최근 구매 내역",
    DASHBOARD_RECENT_ORDERS_DESC: "최근 2건의 구매 내역입니다.",
    DASHBOARD_RECOMMENDED: "회원님을 위한 추천",

    ORDER_ID: "주문번호",
    ORDER_DATE: "주문일자",
    ORDER_ITEM: "상품명",
    ORDER_TOTAL: "총액",
    ORDER_STATUS: "상태",
    ORDER_ACTION: "작업",
    ORDER_VIEW_DETAILS: "상세보기",
    ORDERS_TITLE: "전체 구매 내역",
    ORDERS_DESC: "지금까지 구매한 모든 상품 내역입니다.",
    ORDERS_EMPTY: "아직 구매한 상품이 없습니다.",
    ORDER_STATUS_PAID: "결제완료",
    ORDER_STATUS_REFUNDED: "환불됨",
    
    DOWNLOADS_TITLE: "다운로드 센터",
    DOWNLOADS_DESC: "구매한 상품을 여기서 다운로드할 수 있습니다.",
    DOWNLOADS_EMPTY: "다운로드할 수 있는 상품이 없습니다.",
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

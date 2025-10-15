
import { getAuth } from "firebase-admin/auth";
import { adminAppInstance } from "@/lib/firebaseAdmin";

async function setFirstAdmin(email: string) {
  if (!adminAppInstance) {
    console.error("❌ Firebase Admin SDK가 초기화되지 않았습니다. .env 파일의 FIREBASE_ADMIN_SDK_JSON 환경변수가 올바르게 설정되었는지 확인하세요.");
    return;
  }
  
  if (!email || email === "your-email@example.com") {
    console.error("❌ 이메일 주소를 입력해야 합니다. 스크립트 파일 내의 'your-email@example.com' 부분을 실제 관리자 이메일로 수정해주세요.");
    return;
  }

  try {
    const auth = getAuth(adminAppInstance);
    const user = await auth.getUserByEmail(email);
    
    await auth.setCustomUserClaims(user.uid, { role: "admin" });
    
    console.log(`✅ 성공: ${email} 사용자를 관리자로 지정했습니다.`);
    console.log(`\n이제 prmart 앱을 시작하거나 재시작하여 관리자 권한을 확인하세요.`);

  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
        console.error(`❌ 오류: '${email}' 이메일을 가진 사용자를 찾을 수 없습니다. prmart에 먼저 회원가입했는지 확인해주세요.`);
    } else {
        console.error("❌ 관리자 지정 중 오류가 발생했습니다:", error.message);
    }
  }
}

// ❗ 중요: 아래 이메일 주소를 실제 관리자로 지정할 사용자의 이메일로 변경한 후,
// 터미널에서 `npx tsx src/scripts/set-first-admin.ts` 명령을 실행하세요.
setFirstAdmin("your-email@example.com");

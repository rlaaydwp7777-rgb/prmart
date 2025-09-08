
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SellerSettingsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold tracking-tight font-headline">판매자 설정</h1>
            <p className="text-muted-foreground">판매자 프로필과 정산 정보를 관리하세요.</p>
        </div>
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">프로필</TabsTrigger>
        <TabsTrigger value="payouts">정산 계좌</TabsTrigger>
        <TabsTrigger value="notifications">알림</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>판매자 프로필</CardTitle>
            <CardDescription>
              이 정보는 상품 상세 페이지에 표시됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seller-name">판매자명</Label>
              <Input id="seller-name" defaultValue="prmart 판매자" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seller-bio">한 줄 소개</Label>
              <Textarea
                id="seller-bio"
                placeholder="당신을 잘 나타내는 한 줄 소개를 작성해주세요."
                defaultValue="AI와 자동화로 여러분의 작업을 돕습니다."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>프로필 저장</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="payouts">
        <Card>
          <CardHeader>
            <CardTitle>정산 계좌</CardTitle>
            <CardDescription>
              수익금을 정산받을 계좌 정보를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank-name">은행</Label>
              <Input id="bank-name" placeholder="예: 토스뱅크" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">계좌번호</Label>
              <Input id="account-number" placeholder="'-' 없이 숫자만 입력" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="account-holder">예금주명</Label>
              <Input id="account-holder" placeholder="본인 명의의 계좌만 가능합니다." />
            </div>
          </CardContent>
          <CardFooter>
            <Button>계좌 정보 저장</Button>
          </CardFooter>
        </Card>
      </TabsContent>
       <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>알림 설정</CardTitle>
            <CardDescription>
              어떤 알림을 받을지 선택하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>이 기능은 현재 개발 중입니다.</p>
          </CardContent>
          <CardFooter>
            <Button disabled>설정 저장</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

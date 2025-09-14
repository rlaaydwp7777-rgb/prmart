
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
import { SELLER_STRINGS } from "@/lib/string-constants"

export default function SellerSettingsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold tracking-tight font-headline">{SELLER_STRINGS.SETTINGS_TITLE}</h1>
            <p className="text-muted-foreground">{SELLER_STRINGS.SETTINGS_DESC}</p>
        </div>
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">{SELLER_STRINGS.SETTINGS_TAB_PROFILE}</TabsTrigger>
        <TabsTrigger value="payouts">{SELLER_STRINGS.SETTINGS_TAB_PAYOUTS}</TabsTrigger>
        <TabsTrigger value="notifications">{SELLER_STRINGS.SETTINGS_TAB_NOTIFICATIONS}</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.PROFILE_TITLE}</CardTitle>
            <CardDescription>
              {SELLER_STRINGS.PROFILE_DESC}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seller-name">{SELLER_STRINGS.SELLER_NAME_LABEL}</Label>
              <Input id="seller-name" defaultValue="prmart 판매자" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seller-bio">{SELLER_STRINGS.SELLER_BIO_LABEL}</Label>
              <Textarea
                id="seller-bio"
                placeholder={SELLER_STRINGS.SELLER_BIO_PLACEHOLDER}
                defaultValue="AI와 자동화로 여러분의 작업을 돕습니다."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{SELLER_STRINGS.SAVE_PROFILE}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="payouts">
        <Card>
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.PAYOUTS_TITLE}</CardTitle>
            <CardDescription>
              {SELLER_STRINGS.PAYOUTS_DESC}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank-name">{SELLER_STRINGS.BANK_NAME_LABEL}</Label>
              <Input id="bank-name" placeholder={SELLER_STRINGS.BANK_NAME_PLACEHOLDER} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">{SELLER_STRINGS.ACCOUNT_NUMBER_LABEL}</Label>
              <Input id="account-number" placeholder={SELLER_STRINGS.ACCOUNT_NUMBER_PLACEHOLDER} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="account-holder">{SELLER_STRINGS.ACCOUNT_HOLDER_LABEL}</Label>
              <Input id="account-holder" placeholder={SELLER_STRINGS.ACCOUNT_HOLDER_PLACEHOLDER} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{SELLER_STRINGS.SAVE_ACCOUNT_INFO}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
       <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.NOTIFICATIONS_TITLE}</CardTitle>
            <CardDescription>
              {SELLER_STRINGS.NOTIFICATIONS_DESC}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{SELLER_STRINGS.NOTIFICATIONS_WIP}</p>
          </CardContent>
          <CardFooter>
            <Button disabled>{SELLER_STRINGS.SAVE_SETTINGS}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

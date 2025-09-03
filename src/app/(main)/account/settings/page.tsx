
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
       <Card>
            <CardHeader>
                <CardTitle>{ACCOUNT_STRINGS.SETTINGS_PROFILE_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.SETTINGS_PROFILE_DESC}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">{ACCOUNT_STRINGS.SETTINGS_NAME_LABEL}</Label>
                    <Input id="name" defaultValue="prmart user" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">{ACCOUNT_STRINGS.SETTINGS_EMAIL_LABEL}</Label>
                    <Input id="email" type="email" defaultValue="prmart@example.com" disabled />
                </div>
                <Button>{ACCOUNT_STRINGS.SETTINGS_SAVE_BUTTON}</Button>
            </CardContent>
       </Card>

       <Card>
            <CardHeader>
                <CardTitle>{ACCOUNT_STRINGS.SETTINGS_NOTIFICATIONS_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.SETTINGS_NOTIFICATIONS_DESC}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="product-updates">{ACCOUNT_STRINGS.SETTINGS_NOTI_PRODUCT_UPDATES}</Label>
                        <p className="text-sm text-muted-foreground">{ACCOUNT_STRINGS.SETTINGS_NOTI_PRODUCT_UPDATES_DESC}</p>
                    </div>
                    <Switch id="product-updates" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="promotions">{ACCOUNT_STRINGS.SETTINGS_NOTI_PROMOTIONS}</Label>
                        <p className="text-sm text-muted-foreground">{ACCOUNT_STRINGS.SETTINGS_NOTI_PROMOTIONS_DESC}</p>
                    </div>
                    <Switch id="promotions" />
                </div>
                 <Separator />
                <div className="flex items-center justify-between">
                     <div>
                        <Label htmlFor="security">{ACCOUNT_STRINGS.SETTINGS_NOTI_SECURITY}</Label>
                         <p className="text-sm text-muted-foreground">{ACCOUNT_STRINGS.SETTINGS_NOTI_SECURITY_DESC}</p>
                    </div>
                    <Switch id="security" defaultChecked disabled />
                </div>
            </CardContent>
       </Card>
    </div>
  )
}

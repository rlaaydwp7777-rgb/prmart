
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SELLER_STRINGS, ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { getSellerProfile, saveSellerProfile } from "@/lib/firebase/services";
import { useEffect, useState } from "react";
import type { SellerProfile } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<Partial<SellerProfile>>({
        sellerName: '',
        sellerBio: '',
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            getSellerProfile(user.uid).then(data => {
                if (data) {
                    setProfile(data);
                }
            }).finally(() => setIsLoading(false));
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSaving(true);
        try {
            await saveSellerProfile(user.uid, profile);
            toast({ title: "성공", description: "프로필 정보가 저장되었습니다." });
        } catch (error) {
            toast({ title: "오류", description: "저장에 실패했습니다.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{ACCOUNT_STRINGS.SETTINGS_PROFILE_TITLE}</CardTitle>
                    <CardDescription>{ACCOUNT_STRINGS.SETTINGS_PROFILE_DESC}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{ACCOUNT_STRINGS.SETTINGS_NAME_LABEL}</Label>
                        <Input id="name" defaultValue={user?.displayName || "prmart user"} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">{ACCOUNT_STRINGS.SETTINGS_EMAIL_LABEL}</Label>
                        <Input id="email" type="email" defaultValue={user?.email || "prmart@example.com"} disabled />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{SELLER_STRINGS.PROFILE_TITLE}</CardTitle>
                    <CardDescription>{SELLER_STRINGS.PROFILE_DESC}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="sellerName">{SELLER_STRINGS.SELLER_NAME_LABEL}</Label>
                        <Input id="sellerName" name="sellerName" value={profile.sellerName || user?.displayName || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sellerBio">{SELLER_STRINGS.SELLER_BIO_LABEL}</Label>
                        <Textarea id="sellerBio" name="sellerBio" placeholder={SELLER_STRINGS.SELLER_BIO_PLACEHOLDER} value={profile.sellerBio || ''} onChange={handleInputChange} />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>{SELLER_STRINGS.PAYOUTS_TITLE}</CardTitle>
                    <CardDescription>{SELLER_STRINGS.PAYOUTS_DESC}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bankName">{SELLER_STRINGS.BANK_NAME_LABEL}</Label>
                        <Input id="bankName" name="bankName" placeholder={SELLER_STRINGS.BANK_NAME_PLACEHOLDER} value={profile.bankName || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">{SELLER_STRINGS.ACCOUNT_NUMBER_LABEL}</Label>
                        <Input id="accountNumber" name="accountNumber" placeholder={SELLER_STRINGS.ACCOUNT_NUMBER_PLACEHOLDER} value={profile.accountNumber || ''} onChange={handleInputChange} />
                    </div>
                        <div className="space-y-2">
                        <Label htmlFor="accountHolder">{SELLER_STRINGS.ACCOUNT_HOLDER_LABEL}</Label>
                        <Input id="accountHolder" name="accountHolder" placeholder={SELLER_STRINGS.ACCOUNT_HOLDER_PLACEHOLDER} value={profile.accountHolder || ''} onChange={handleInputChange} />
                    </div>
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
            
            <div className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {ACCOUNT_STRINGS.SETTINGS_SAVE_BUTTON}
                </Button>
            </div>
        </form>
    );
}

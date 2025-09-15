

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SELLER_STRINGS, ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { getSellerProfile } from "@/lib/firebase/services";
import { useEffect, useState, useRef } from "react";
import type { SellerProfile } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useActionState } from "react";
import { updateSellerProfileAction } from "@/app/actions";


const initialState = {
  message: "",
  success: false,
};

export default function SettingsPage() {
    const { user, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<Partial<SellerProfile>>({
        sellerName: '',
        sellerBio: '',
        photoUrl: '',
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [state, formAction] = useActionState(updateSellerProfileAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    

    useEffect(() => {
        if (user) {
            getSellerProfile(user.uid).then(data => {
                if (data) {
                    setProfile(data);
                } else {
                    // Pre-fill with auth data if no seller profile exists
                    setProfile(prev => ({
                        ...prev,
                        sellerName: user.displayName || '',
                        photoUrl: user.photoURL || '',
                    }))
                }
            }).finally(() => setIsLoading(false));
        } else if (!authLoading) {
            setIsLoading(false);
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? "성공" : "오류",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
        }
    }, [state, toast]);
    

    if (isLoading || authLoading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    
    if (!user) {
        return <div>로그인이 필요합니다.</div>
    }

    return (
        <form ref={formRef} action={formAction} className="space-y-6">
            <input type="hidden" name="userId" value={user.uid} />

            <Card>
                <CardHeader>
                    <CardTitle>{ACCOUNT_STRINGS.SETTINGS_PROFILE_TITLE}</CardTitle>
                    <CardDescription>{ACCOUNT_STRINGS.SETTINGS_PROFILE_DESC}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="sellerName">{ACCOUNT_STRINGS.SETTINGS_NAME_LABEL}</Label>
                        <Input id="sellerName" name="sellerName" defaultValue={profile.sellerName || user.displayName || ""} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">{ACCOUNT_STRINGS.SETTINGS_EMAIL_LABEL}</Label>
                        <Input id="email" type="email" defaultValue={user.email || ""} disabled />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="photoUrl">{SELLER_STRINGS.SELLER_PHOTO_URL_LABEL}</Label>
                        <Input id="photoUrl" name="photoUrl" placeholder={SELLER_STRINGS.SELLER_PHOTO_URL_PLACEHOLDER} defaultValue={profile.photoUrl || ''} />
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
                        <Label htmlFor="sellerBio">{SELLER_STRINGS.SELLER_BIO_LABEL}</Label>
                        <Textarea id="sellerBio" name="sellerBio" placeholder={SELLER_STRINGS.SELLER_BIO_PLACEHOLDER} defaultValue={profile.sellerBio || ''} />
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
                        <Input id="bankName" name="bankName" placeholder={SELLER_STRINGS.BANK_NAME_PLACEHOLDER} defaultValue={profile.bankName || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">{SELLER_STRINGS.ACCOUNT_NUMBER_LABEL}</Label>
                        <Input id="accountNumber" name="accountNumber" placeholder={SELLER_STRINGS.ACCOUNT_NUMBER_PLACEHOLDER} defaultValue={profile.accountNumber || ''} />
                    </div>
                        <div className="space-y-2">
                        <Label htmlFor="accountHolder">{SELLER_STRINGS.ACCOUNT_HOLDER_LABEL}</Label>
                        <Input id="accountHolder" name="accountHolder" placeholder={SELLER_STRINGS.ACCOUNT_HOLDER_PLACEHOLDER} defaultValue={profile.accountHolder || ''} />
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
                 <CardFooter>
                    <Button type="submit">
                        {ACCOUNT_STRINGS.SETTINGS_SAVE_BUTTON}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

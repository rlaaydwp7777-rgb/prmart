
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SELLER_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { getSellerProfile, saveSellerProfile } from "@/lib/firebase/services";
import { useEffect, useState } from "react";
import type { SellerProfile } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function SellerSettingsPage() {
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

    const handleProfileSave = async (e: React.FormEvent) => {
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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{SELLER_STRINGS.SETTINGS_TITLE}</h1>
                <p className="text-muted-foreground">{SELLER_STRINGS.SETTINGS_DESC}</p>
            </div>
            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">{SELLER_STRINGS.SETTINGS_TAB_PROFILE}</TabsTrigger>
                    <TabsTrigger value="payouts">{SELLER_STRINGS.SETTINGS_TAB_PAYOUTS}</TabsTrigger>
                    <TabsTrigger value="notifications">{SELLER_STRINGS.SETTINGS_TAB_NOTIFICATIONS}</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" asChild>
                    <Card as="form" onSubmit={handleProfileSave}>
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
                        <CardFooter>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {SELLER_STRINGS.SAVE_PROFILE}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="payouts" asChild>
                     <Card as="form" onSubmit={handleProfileSave}>
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
                        <CardFooter>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {SELLER_STRINGS.SAVE_ACCOUNT_INFO}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications" asChild>
                    <Card>
                        <CardHeader>
                            <CardTitle>{SELLER_STRINGS.NOTIFICATIONS_TITLE}</CardTitle>
                            <CardDescription>{SELLER_STRINGS.NOTIFICATIONS_DESC}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="border-2 border-dashed rounded-lg p-12 text-center mt-8">
                                <p className="text-muted-foreground">🔔 {SELLER_STRINGS.NOTIFICATIONS_WIP}</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

// ShadCN CardFooter doesn't accept form attribute, so we create a simple wrapper
const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
);

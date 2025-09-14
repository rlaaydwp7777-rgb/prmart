
"use client";

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
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect, useState, useCallback } from "react";
import { getSellerProfile, saveSellerProfile } from "@/lib/firebase/services";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { SellerProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function SellerSettingsPage() {
    const { user, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<Partial<SellerProfile>>({
        sellerName: '',
        sellerBio: '',
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const fetchProfile = useCallback(async () => {
        if (user) {
            setLoading(true);
            const sellerProfile = await getSellerProfile(user.uid);
            if (sellerProfile) {
                setProfile(sellerProfile);
            } else {
                // Initialize with display name if profile doesn't exist
                setProfile(prev => ({...prev, sellerName: user.displayName || user.email || ''}));
            }
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if(user) {
            fetchProfile();
        }
    }, [user, fetchProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProfile(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setIsSaving(true);
        try {
            await saveSellerProfile(user.uid, profile);
            toast({
                title: "성공",
                description: "프로필 정보가 성공적으로 저장되었습니다.",
            });
        } catch (error) {
            toast({
                title: "오류",
                description: "프로필 저장 중 오류가 발생했습니다.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };
    
    if(authLoading || loading) {
        return (
             <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-headline">{SELLER_STRINGS.SETTINGS_TITLE}</h1>
                    <p className="text-muted-foreground">{SELLER_STRINGS.SETTINGS_DESC}</p>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        )
    }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold tracking-tight font-headline">{SELLER_STRINGS.SETTINGS_TITLE}</h1>
            <p className="text-muted-foreground">{SELLER_STRINGS.SETTINGS_DESC}</p>
        </div>
        <form onSubmit={handleSave}>
            <Tabs defaultValue="profile" className="w-full">
            <TabsList>
                <TabsTrigger value="profile">{SELLER_STRINGS.SETTINGS_TAB_PROFILE}</TabsTrigger>
                <TabsTrigger value="payouts">{SELLER_STRINGS.SETTINGS_TAB_PAYOUTS}</TabsTrigger>
                {/* <TabsTrigger value="notifications">{SELLER_STRINGS.SETTINGS_TAB_NOTIFICATIONS}</TabsTrigger> */}
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
                    <Label htmlFor="sellerName">{SELLER_STRINGS.SELLER_NAME_LABEL}</Label>
                    <Input id="sellerName" value={profile.sellerName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="sellerBio">{SELLER_STRINGS.SELLER_BIO_LABEL}</Label>
                    <Textarea
                        id="sellerBio"
                        placeholder={SELLER_STRINGS.SELLER_BIO_PLACEHOLDER}
                        value={profile.sellerBio}
                        onChange={handleInputChange}
                    />
                    </div>
                </CardContent>
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
                    <Label htmlFor="bankName">{SELLER_STRINGS.BANK_NAME_LABEL}</Label>
                    <Input id="bankName" placeholder={SELLER_STRINGS.BANK_NAME_PLACEHOLDER} value={profile.bankName} onChange={handleInputChange}/>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="accountNumber">{SELLER_STRINGS.ACCOUNT_NUMBER_LABEL}</Label>
                    <Input id="accountNumber" placeholder={SELLER_STRINGS.ACCOUNT_NUMBER_PLACEHOLDER} value={profile.accountNumber} onChange={handleInputChange}/>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="accountHolder">{SELLER_STRINGS.ACCOUNT_HOLDER_LABEL}</Label>
                    <Input id="accountHolder" placeholder={SELLER_STRINGS.ACCOUNT_HOLDER_PLACEHOLDER} value={profile.accountHolder} onChange={handleInputChange}/>
                    </div>
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
             <div className="mt-6">
                <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {SELLER_STRINGS.SAVE_SETTINGS}
                </Button>
            </div>
        </form>
    </div>
  )
}

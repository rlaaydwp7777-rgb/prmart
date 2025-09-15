
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { getWishlistByUserId, getProducts } from "@/lib/firebase/services";
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect, useState } from "react";
import type { Prompt } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WishlistPage() {
    const { user, loading: authLoading } = useAuth();
    const [wishlistItems, setWishlistItems] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            Promise.all([getWishlistByUserId(user.uid), getProducts()])
                .then(([wishlist, allProducts]) => {
                    const items = allProducts.filter(product => wishlist?.productIds.includes(product.id));
                    setWishlistItems(items);
                })
                .finally(() => setLoading(false));
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    if (loading || authLoading) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{ACCOUNT_STRINGS.WISHLIST_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.WISHLIST_DESC}</CardDescription>
            </CardHeader>
            <CardContent>
                 {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {wishlistItems.map((prompt) => (
                            <PromptCard key={prompt.id} prompt={prompt} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-10">
                        <p className="text-muted-foreground">{ACCOUNT_STRINGS.WISHLIST_EMPTY}</p>
                         <Button asChild variant="link" className="mt-2">
                            <Link href="/browse">상품 둘러보기</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

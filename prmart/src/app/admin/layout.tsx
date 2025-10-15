// src/app/account/wishlist/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/AuthProvider";
import { getProducts, getWishlistByUserId } from "@/lib/firebase/services";
import { Skeleton } from "@/components/ui/skeleton";
import type { Prompt, Wishlist } from "@/lib/types";
import { PromptCard } from "@/components/prompts/prompt-card";

export default function WishlistPage() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = React.useState<Wishlist | null>(null);
    const [products, setProducts] = React.useState<Prompt[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            if (!user) return;
            try {
                const [userWishlist, allProducts] = await Promise.all([
                    getWishlistByUserId(user.uid),
                    getProducts()
                ]);
                setWishlist(userWishlist);
                if (userWishlist) {
                    const wishlistProducts = allProducts.filter(p => userWishlist.productIds.includes(p.id));
                    setProducts(wishlistProducts);
                }
            } catch (error) {
                console.error("Failed to fetch wishlist data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{ACCOUNT_STRINGS.WISHLIST_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.WISHLIST_DESC}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Skeleton className="h-80 w-full" />
                        <Skeleton className="h-80 w-full" />
                        <Skeleton className="h-80 w-full" />
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(prompt => (
                            <PromptCard key={prompt.id} prompt={prompt} />
                        ))}
                    </div>
                ) : (
                     <p className="text-sm text-center text-muted-foreground py-8">{ACCOUNT_STRINGS.WISHLIST_EMPTY}</p>
                )}
            </CardContent>
        </Card>
    );
}
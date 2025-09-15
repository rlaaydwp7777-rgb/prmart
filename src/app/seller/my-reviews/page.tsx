
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { getReviewsByAuthor } from "@/lib/firebase/services";
import { useEffect, useState } from "react";
import type { Review } from "@/lib/types";

export default function MyReviewsPage() {
    const { user, loading: authLoading } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getReviewsByAuthor(user.uid)
                .then(setReviews)
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
                <CardTitle>{ACCOUNT_STRINGS.REVIEWS_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.REVIEWS_DESC}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <Link href={`/p/${review.productId}`} className="font-bold hover:underline">{review.productTitle}</Link>
                                <div className="flex items-center gap-1 text-sm">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                            <p className="text-foreground/90">{review.content}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">{ACCOUNT_STRINGS.REVIEWS_NO_REVIEWS}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

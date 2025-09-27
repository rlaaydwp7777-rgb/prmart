// src/app/account/reviews/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/AuthProvider";
import { getReviewsByAuthor } from "@/lib/firebase/services";
import { Skeleton } from "@/components/ui/skeleton";
import type { Review } from "@/lib/types";
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReviewsPage() {
    const { user } = useAuth();
    const [reviews, setReviews] = React.useState<Review[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchReviews() {
            if (!user) return;
            try {
                const userReviews = await getReviewsByAuthor(user.uid);
                setReviews(userReviews);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, [user]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{ACCOUNT_STRINGS.REVIEWS_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.REVIEWS_DESC}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                     <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                             <div key={review.id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Link href={`/p/${review.productId}`} className="hover:underline">
                                            <p className="font-semibold">{review.productTitle}</p>
                                        </Link>
                                        <div className="flex items-center gap-1 mt-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className="text-sm text-foreground/80 mt-3">{review.content}</p>
                                <div className="flex gap-2 mt-4">
                                    <Button variant="outline" size="sm">수정</Button>
                                    <Button variant="destructive" size="sm">삭제</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-center text-muted-foreground py-8">{ACCOUNT_STRINGS.REVIEWS_NO_REVIEWS}</p>
                )}
            </CardContent>
        </Card>
    );
}

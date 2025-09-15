
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";

const reviews = [
    { id: "1", product: "Next.js 14 Boilerplate", rating: 5, date: "2024-05-21", content: "최고의 보일러플레이트입니다. 개발 시간이 정말 단축됐어요!" },
    { id: "2", product: "Minimalist UI Kit", rating: 4, date: "2024-05-19", content: "디자인이 깔끔하고 사용하기 편합니다. 몇 가지 컴포넌트가 더 추가되면 좋겠어요." },
]

export default function ReviewsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{ACCOUNT_STRINGS.REVIEWS_TITLE}</CardTitle>
            <CardDescription>{ACCOUNT_STRINGS.REVIEWS_DESC}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                         <Link href={`/p/${review.id}`} className="font-bold hover:underline">{review.product}</Link>
                        <div className="flex items-center gap-1 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                            ))}
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{review.date}</p>
                    <p className="text-foreground/90">{review.content}</p>
                </div>
            ))}
            {reviews.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">{ACCOUNT_STRINGS.REVIEWS_NO_REVIEWS}</p>
                </div>
            )}
        </CardContent>
    </Card>
  )
}

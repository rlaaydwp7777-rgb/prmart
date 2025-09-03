
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { FEATURED_PROMPTS } from "@/lib/constants";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";

export default function WishlistPage() {
    const wishlistItems = FEATURED_PROMPTS.slice(2, 4);

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
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

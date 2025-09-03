import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy } from "lucide-react";
import type { Prompt } from "@/lib/types";
import { PROMPT_CARD_STRINGS } from "@/lib/string-constants";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  prompt: Prompt;
}

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank > 10) return null;

  const rankColors: { [key: number]: string } = {
    1: "bg-amber-400 text-amber-900 border-amber-500",
    2: "bg-slate-300 text-slate-800 border-slate-400",
    3: "bg-orange-400 text-orange-900 border-orange-500",
  };

  return (
    <div className={cn(
      "absolute top-3 left-3 flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold",
      rankColors[rank] || "bg-muted text-muted-foreground border-border"
    )}>
      <Trophy className="h-3 w-3" />
      <span>{rank}</span>
    </div>
  );
};


export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
      <Link href={`/prompts/${prompt.id}`} className="block">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={prompt.image}
              alt={prompt.title}
              width={400}
              height={300}
              className="object-cover w-full aspect-video"
              data-ai-hint={prompt.aiHint}
            />
            {prompt.rank && <RankBadge rank={prompt.rank} />}
            <Badge variant="secondary" className="absolute top-3 right-3">{prompt.category}</Badge>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-lg truncate font-headline">{prompt.title}</h3>
            <p className="text-muted-foreground text-sm">{PROMPT_CARD_STRINGS.BY} {prompt.author}</p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-medium">{prompt.rating.toFixed(1)}</span>
                <span className="text-muted-foreground text-sm">({prompt.reviews} {PROMPT_CARD_STRINGS.REVIEWS})</span>
              </div>
              <span className="font-bold text-xl text-primary">₩{prompt.price.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Prompt } from "@/lib/types";

interface PromptCardProps {
  prompt: Prompt;
}

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
            <Badge variant="secondary" className="absolute top-3 right-3 text-base">{prompt.category}</Badge>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-2xl truncate font-headline">{prompt.title}</h3>
            <p className="text-lg text-muted-foreground">By {prompt.author}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-lg font-medium">{prompt.rating.toFixed(1)}</span>
                <span className="text-lg text-muted-foreground">({prompt.reviews} reviews)</span>
              </div>
              <span className="font-semibold text-2xl text-primary">₩{prompt.price.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

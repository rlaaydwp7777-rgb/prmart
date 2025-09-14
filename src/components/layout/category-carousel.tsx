
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PromptCard } from "@/components/prompts/prompt-card";
import type { Prompt, Category } from "@/lib/types";

export function CategoryCarousel({ category, prompts }: { category: Category, prompts: Prompt[] }) {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const categoryPrompts = prompts.filter(p => p.category === category.name);
  
  const items = categoryPrompts.length > 5 ? categoryPrompts : [...categoryPrompts, ...categoryPrompts, ...categoryPrompts];

  if(items.length === 0) return null;

  return (
     <Carousel 
        opts={{ align: "start", loop: true }} 
        plugins={[plugin.current]} 
        onMouseEnter={() => plugin.current.stop()} 
        onMouseLeave={() => plugin.current.reset()} 
        className="w-full"
    >
      <CarouselContent>
        {items.map((prompt, index) => (
          <CarouselItem key={`${prompt.id}-${index}`} className="basis-3/4 sm:basis-1/2 md:basis-1/4">
            <div className="p-1">
              <PromptCard prompt={prompt} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

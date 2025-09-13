
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
import type { Prompt } from "@/lib/types";

export function FeaturedCarousel({ featuredSlides }: { featuredSlides: { title: string, prompts: Prompt[] }[] }) {
    const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    return (
        <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[plugin.current]}
            className="w-full"
        >
            <CarouselContent>
                {featuredSlides.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-center">{slide.title}</h3>
                            <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {slide.prompts.slice(0, 4).map((prompt) => (
                                    <PromptCard key={prompt.id} prompt={prompt} />
                                ))}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 hidden xl:flex" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 hidden xl:flex" />
        </Carousel>
    );
}

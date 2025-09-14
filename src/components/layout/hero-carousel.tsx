
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

const heroSlideConfig = [
  { slug: "ai-and-production", headline: "누구나 만든 프롬프트가 작품이 되어 거래됩니다.", bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600", image: "https://picsum.photos/1600/900?random=31", aiHint: "AI production" },
  { slug: "development-it-automation", headline: "작은 코드 한 줄도 아이디어 상품이 됩니다.", bgColor: "bg-gradient-to-br from-slate-800 to-slate-600", image: "https://picsum.photos/1600/900?random=32", aiHint: "development automation" },
  { slug: "investment-fintech", headline: "투자 인사이트, 누구나 사고팔 수 있습니다.", bgColor: "bg-gradient-to-br from-emerald-500 to-green-600", image: "https://picsum.photos/1600/900?random=33", aiHint: "stock graph" },
  { slug: "travel-life", headline: "당신만의 특별한 여행, 여기에서 시작하세요.", bgColor: "bg-gradient-to-br from-sky-500 to-blue-600", image: "https://picsum.photos/1600/900?random=34", aiHint: "beautiful landscape" },
  { slug: "living-parenting-tips", headline: "더 나은 일상을 만드는 삶의 지혜를 공유하세요.", bgColor: "bg-gradient-to-br from-rose-400 to-red-500", image: "https://picsum.photos/1600/900?random=35", aiHint: "happy family" },
  { slug: "business-marketing", headline: "성공적인 비즈니스를 위한 전략과 노하우.", bgColor: "bg-gradient-to-br from-amber-500 to-orange-600", image: "https://picsum.photos/1600/900?random=36", aiHint: "business meeting" },
  { slug: "creation-design", headline: "당신의 창의력에 가치를 더하세요.", bgColor: "bg-gradient-to-br from-pink-500 to-fuchsia-600", image: "https://picsum.photos/1600/900?random=37", aiHint: "creative design" },
  { slug: "learning-self-development", headline: "성장의 기회를 발견하고 지식을 넓히세요.", bgColor: "bg-gradient-to-br from-cyan-500 to-teal-600", image: "https://picsum.photos/1600/900?random=38", aiHint: "person learning" },
  { slug: "mobility-automobile", headline: "더 스마트한 이동, 자동차의 모든 것을 만나보세요.", bgColor: "bg-gradient-to-br from-neutral-600 to-gray-800", image: "https://picsum.photos/1600/900?random=39", aiHint: "modern car" },
  { slug: "life-infra", headline: "현명한 주거 선택, 부동산 정보를 한눈에.", bgColor: "bg-gradient-to-br from-lime-500 to-emerald-600", image: "https://picsum.photos/1600/900?random=40", aiHint: "apartment building" },
];


export function HeroCarousel({ categories }: { categories: Category[] }) {
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
    
    const slides = categories.map(category => {
        const config = heroSlideConfig.find(c => c.slug === category.slug) || heroSlideConfig[0];
        return {
            ...config,
            title: category.name
        }
    });

    return (
         <Carousel 
            plugins={[plugin.current]} 
            opts={{ loop: true }}
            onMouseEnter={() => plugin.current.stop()} 
            onMouseLeave={() => plugin.current.reset()} 
            className="w-full"
        >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <Link href={`/c/${slide.slug}`}>
                    <div className="relative h-[30vh] md:h-[35vh] lg:h-[40vh] w-full">
                      <div className={cn("absolute inset-0 w-full h-full", slide.bgColor)}>
                        <Image src={slide.image} alt={slide.title} fill priority={index === 0} className="object-cover opacity-30" data-ai-hint={slide.aiHint} />
                      </div>
                      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center bg-black/40 md:bg-black/50 px-4 text-white">
                        <div className="container flex flex-col items-center justify-center h-full">
                          <div className="text-center space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-shadow-lg">{slide.title}</h1>
                            <p className="mt-4 text-lg md:text-xl text-shadow-md">{slide.headline}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white hidden sm:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white hidden sm:flex" />
          </Carousel>
    )
}

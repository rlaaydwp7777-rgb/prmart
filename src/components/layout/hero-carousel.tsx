
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


const heroSlides = [
  { title: "AI & 프로덕션", headline: "누구나 만든 프롬프트가 작품이 되어 거래됩니다.", bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600", image: "https://picsum.photos/1600/900?random=31", aiHint: "AI production", slug: "ai-and-production" },
  { title: "개발 & IT 자동화", headline: "작은 코드 한 줄도 아이디어 상품이 됩니다.", bgColor: "bg-gradient-to-br from-slate-800 to-slate-600", image: "https://picsum.photos/1600/900?random=32", aiHint: "development automation", slug: "development-it-automation" },
  { title: "재테크 & 투자", headline: "투자 인사이트, 누구나 사고팔 수 있습니다.", bgColor: "bg-gradient-to-br from-emerald-500 to-green-600", image: "https://picsum.photos/1600/900?random=33", aiHint: "stock graph", slug: "investment-fintech" },
];


export function HeroCarousel() {
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
         <Carousel plugins={[plugin.current]} onMouseEnter={() => plugin.current.stop()} onMouseLeave={() => plugin.current.reset()} className="w-full">
            <CarouselContent>
              {heroSlides.map((slide, index) => (
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
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
          </Carousel>
    )
}

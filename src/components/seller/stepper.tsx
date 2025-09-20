"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { SELLER_STRINGS } from "@/lib/string-constants";

const steps = [
  { id: "01", name: SELLER_STRINGS.STEP_1, status: "current" },
  { id: "02", name: SELLER_STRINGS.STEP_2, status: "upcoming" },
  { id: "03", name: SELLER_STRINGS.STEP_3, status: "upcoming" },
];

export function Stepper() {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20 flex-1" : "")}>
            {step.status === "complete" ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <a href="#" className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:bg-primary/90">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : step.status === "current" ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a href="#" className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background" aria-current="step">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
                 <div className="absolute top-10 w-max -translate-x-1/2 left-1/2">
                    <p className="text-sm font-medium text-primary">{step.name}</p>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a href="#" className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background hover:border-gray-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
                 <div className="absolute top-10 w-max -translate-x-1/2 left-1/2">
                    <p className="text-sm font-medium text-muted-foreground">{step.name}</p>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

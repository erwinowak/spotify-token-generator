"use client";

import { Check } from "lucide-react";
import { Step } from "@/hooks/use-wizard";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { number: 1, label: "Instructions" },
  { number: 2, label: "App Data" },
  { number: 3, label: "Authorization" },
  { number: 4, label: "Token" },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-16 px-4">
      <div className="relative flex items-center justify-between">
        {/* Connecting Lines Container - positioned absolutely to span full width */}
        <div className="absolute top-6 left-0 right-0 h-0.5 -z-10 hidden sm:block">
          {steps.map((step, index) => {
            if (index === steps.length - 1) return null;
            
            const isCompleted = currentStep > step.number;
            const stepWidth = 100 / steps.length;
            const lineStart = (index * stepWidth) + (stepWidth / 2);
            const lineEnd = ((index + 1) * stepWidth) - (stepWidth / 2);
            const lineWidth = lineEnd - lineStart;
            
            return (
              <div
                key={`line-${index}`}
                className="absolute h-full"
                style={{
                  left: `${lineStart}%`,
                  width: `${lineWidth}%`,
                }}
              >
                {/* Background line */}
                <div className="absolute inset-0 bg-muted/30 dark:bg-muted/20" />
                {/* Progress line */}
                <div
                  className={cn(
                    "absolute inset-0 bg-primary origin-left transition-all duration-700 ease-out",
                    isCompleted ? "scale-x-100" : "scale-x-0"
                  )}
                  suppressHydrationWarning
                />
              </div>
            );
          })}
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isUpcoming = currentStep < step.number;

          return (
            <div key={step.number} className="relative flex-1 flex flex-col items-center z-10">
              {/* Step Circle */}
                    <div
                      className={cn(
                  "relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-500 shrink-0",
                    isCompleted
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/40"
                      : isCurrent
                      ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/60 ring-4 ring-primary/30 scale-110"
                      : "bg-background/80 backdrop-blur-sm border-muted-foreground/30 text-muted-foreground"
                  )}
                suppressHydrationWarning
                >
                  {isCompleted ? (
                  <Check className="w-7 h-7 sm:w-8 sm:h-8" suppressHydrationWarning />
                  ) : (
                  <span className="text-lg sm:text-xl font-bold" suppressHydrationWarning>
                    {step.number}
                  </span>
                  )}
                
                {/* Glow effect for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                )}
              </div>
                
              {/* Step Label */}
                <p
                  className={cn(
                  "mt-4 text-xs sm:text-sm font-semibold text-center whitespace-nowrap transition-all duration-300",
                    isCurrent 
                    ? "text-primary opacity-100 scale-105"
                      : isCompleted
                        ? "text-foreground opacity-90"
                        : "text-muted-foreground opacity-60"
                  )}
                >
                  {step.label}
                </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

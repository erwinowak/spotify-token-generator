"use client";

import { CheckCircle } from "lucide-react";
import { Step } from "@/hooks/use-wizard";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { number: 1, label: "Config" },
  { number: 2, label: "Scopes" },
  { number: 3, label: "Result" },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const progressWidth =
    currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%";

  return (
    <div className="mb-12 max-w-lg mx-auto">
      {/* Circles row – line is vertically centered on this row only */}
      <div className="flex justify-between items-center relative h-8">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: progressWidth }}
        />
        {steps.map((s) => (
          <div
            key={s.number}
            className={cn(
              "relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 shrink-0 bg-[#09090b]",
              currentStep >= s.number
                ? "bg-zinc-900 border-emerald-500 text-emerald-500"
                : "bg-zinc-900 border-zinc-700 text-zinc-600"
            )}
          >
            {currentStep > s.number ? (
              <CheckCircle size={14} />
            ) : (
              s.number
            )}
          </div>
        ))}
      </div>
      {/* Labels row – same spacing as circles */}
      <div className="flex justify-between mt-2 px-0">
        {steps.map((s) => (
          <span
            key={s.number}
            className={cn(
              "w-8 text-center text-[10px] font-bold uppercase tracking-wider",
              currentStep >= s.number ? "text-zinc-300" : "text-zinc-700"
            )}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

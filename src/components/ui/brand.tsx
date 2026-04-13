import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface BrandMarkProps {
  className?: string;
  detail?: ReactNode;
}

export function BrandMark({ className, detail }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,214,80,0.28),rgba(255,255,255,0.08))] text-sm font-semibold tracking-[0.3em] text-amber-100 shadow-[0_18px_50px_rgba(245,158,11,0.22)]">
        CH
      </div>
      <div className="space-y-0.5">
        <div className="text-lg font-semibold tracking-[0.18em] text-white">
          CHELLA
        </div>
        <div className="text-xs uppercase tracking-[0.32em] text-slate-400">
          {detail ?? "Rewards platform"}
        </div>
      </div>
    </div>
  );
}

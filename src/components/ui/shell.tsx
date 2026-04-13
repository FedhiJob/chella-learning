import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "full";
}

const sizeClasses = {
  default: "mx-auto max-w-6xl",
  wide: "mx-auto max-w-7xl",
  full: "w-full",
};

export function PageContainer({
  children,
  className,
  size = "wide",
}: PageContainerProps) {
  return (
    <div className={cn(sizeClasses[size], "w-full px-4 pb-10 pt-6 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      ) : null}
    </div>
  );
}

interface SurfaceProps {
  children: ReactNode;
  className?: string;
}

export function Surface({ children, className }: SurfaceProps) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(9,12,20,0.96))] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionTitle({
  title,
  description,
  action,
}: SectionTitleProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="text-sm text-slate-400">{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  description?: string;
  accent?: "gold" | "green" | "blue" | "rose" | "violet";
}

const accentStyles = {
  gold: "from-amber-300/30 via-amber-400/18 to-amber-500/5 text-amber-100 ring-amber-400/30",
  green: "from-emerald-300/30 via-emerald-400/18 to-emerald-500/5 text-emerald-100 ring-emerald-400/30",
  blue: "from-sky-300/30 via-sky-400/18 to-sky-500/5 text-sky-100 ring-sky-400/30",
  rose: "from-rose-300/30 via-rose-400/18 to-rose-500/5 text-rose-100 ring-rose-400/30",
  violet:
    "from-violet-300/30 via-violet-400/18 to-violet-500/5 text-violet-100 ring-violet-400/30",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  description,
  accent = "gold",
}: StatCardProps) {
  return (
    <Surface className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
            {label}
          </p>
          <div className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {value}
          </div>
          {description ? (
            <p className="text-sm text-slate-400">{description}</p>
          ) : null}
        </div>
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] ring-1",
            accentStyles[accent],
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </Surface>
  );
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-10 text-center">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-white/[0.06] text-amber-200">
        <Icon className="size-6" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

interface ToggleProps {
  checked: boolean;
  onClick: () => void;
  label: string;
  description?: string;
}

export function ToggleRow({
  checked,
  onClick,
  label,
  description,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4">
      <div className="space-y-1">
        <p className="font-medium text-white">{label}</p>
        {description ? (
          <p className="text-sm text-slate-400">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        aria-pressed={checked}
        onClick={onClick}
        className={cn(
          "relative h-7 w-12 rounded-full transition-colors",
          checked ? "bg-amber-400" : "bg-slate-700",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}

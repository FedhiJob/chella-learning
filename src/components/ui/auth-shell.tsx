import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { BrandMark } from "./brand";
import { cn } from "../../utils/cn";

interface AuthShellProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
}

const highlights = [
  {
    icon: Wallet,
    title: "Fast rewards",
    copy: "Track earnings, referrals, and balance changes from one dashboard.",
  },
  {
    icon: Sparkles,
    title: "Cleaner workflow",
    copy: "Daily tasks, check-ins, and referrals stay visible without feeling noisy.",
  },
  {
    icon: ShieldCheck,
    title: "Account security",
    copy: "A streamlined sign-in flow with clearer feedback and stronger form states.",
  },
];

export function AuthShell({
  title,
  description,
  children,
  footerText,
  footerLinkLabel,
  footerLinkTo,
}: AuthShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_28%),linear-gradient(180deg,#05070d_0%,#0b1020_58%,#05070d_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="flex flex-col justify-between rounded-[32px] border border-white/8 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur sm:p-8 lg:p-10">
          <div className="space-y-10">
            <Link to="/" className="inline-flex">
              <BrandMark detail="Reward operations" />
            </Link>

            <div className="max-w-xl space-y-5">
              <p className="eyebrow">Production-ready experience</p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Earn, track, and grow from one polished workspace.
              </h1>
              <p className="text-base leading-7 text-slate-300">
                The Chella experience now feels more focused: clearer balance
                tracking, cleaner task flow, and a dashboard built for day-to-day
                use.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title: cardTitle, copy }) => (
                <div
                  key={cardTitle}
                  className="rounded-[24px] border border-white/8 bg-slate-950/50 p-5"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-200">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="text-base font-semibold text-white">
                    {cardTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-100">
            <span className="inline-flex size-2 rounded-full bg-emerald-300" />
            Responsive UI refresh in progress across dashboard, rewards, and
            account flows.
          </div>
        </section>

        <section className="flex items-center py-4 lg:py-8">
          <div className="w-full rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(9,12,20,0.98))] p-6 shadow-[0_28px_120px_rgba(2,6,23,0.6)] backdrop-blur sm:p-8">
            <div className="mb-8 space-y-3">
              <p className="eyebrow">Account access</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {title}
              </h2>
              <p className="max-w-md text-sm leading-6 text-slate-300">
                {description}
              </p>
            </div>

            {children}

            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span>{footerText}</span>
              <Link
                to={footerLinkTo}
                className={cn(
                  "inline-flex items-center gap-1 font-medium text-amber-200 transition-colors hover:text-amber-100",
                )}
              >
                {footerLinkLabel}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

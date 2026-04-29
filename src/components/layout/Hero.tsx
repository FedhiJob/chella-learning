import {
  ArrowRight,
  Gift,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatBirr } from "../../utils/format";

const heroHighlights = [
  {
    icon: Gift,
    title: "100 ETB welcome bonus",
    copy: "Start with momentum the moment a new member registers.",
  },
  {
    icon: Users,
    title: "20 ETB per referral",
    copy: "A cleaner loop for sharing, inviting, and earning from your network.",
  },
  {
    icon: ShieldCheck,
    title: "Focused member flow",
    copy: "Tasks, transfers, and daily streaks stay visible without the clutter.",
  },
];

const activityFeed = [
  { label: "Daily task completed", value: "+25 ETB", icon: Sparkles },
  { label: "Referral reward unlocked", value: "+20 ETB", icon: Users },
  { label: "Balance updated", value: formatBirr(1840), icon: Wallet },
];

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-4 pb-18 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24 lg:pt-20">
      <div className="fade-in flex flex-col justify-center">
        <p className="eyebrow">Reward-led product experience</p>
        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
          Turn everyday action into
          <span className="block bg-gradient-to-r from-amber-200 via-amber-300 to-cyan-200 bg-clip-text text-transparent">
            Chella earnings that feel clear.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Chella brings tasks, check-ins, referrals, and transfers into one
          polished reward workspace so members can focus on what earns, not on
          navigating a messy interface.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/register" className="btn-gold">
            Launch your workspace
            <ArrowRight className="size-4" />
          </Link>
          <Link to="/login" className="btn-dark">
            Sign in to dashboard
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {heroHighlights.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="card-hover rounded-[26px] border border-white/8 bg-white/[0.03] p-5 backdrop-blur"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-amber-400/12 text-amber-200">
                <Icon className="size-5" />
              </div>
              <h2 className="text-base font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="slide-in-right relative">
        <div className="absolute inset-x-8 top-4 h-40 rounded-full bg-amber-400/18 blur-3xl" />
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(7,10,18,0.98))] p-6 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Live member snapshot</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                {formatBirr(1840)}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Available balance with streak, task, and referral signals in one
                glance.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-100">
              +12.5%
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[26px] border border-white/8 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                  <TrendingUp className="size-5" />
                </div>
                <span className="text-sm text-slate-400">Today</span>
              </div>
              <p className="mt-5 text-2xl font-semibold text-white">4 tasks</p>
              <p className="mt-2 text-sm text-slate-400">
                High-value actions queued with clear status.
              </p>
            </div>

            <div className="rounded-[26px] border border-white/8 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-400/12 text-amber-200">
                  <Users className="size-5" />
                </div>
                <span className="text-sm text-slate-400">This week</span>
              </div>
              <p className="mt-5 text-2xl font-semibold text-white">8 invites</p>
              <p className="mt-2 text-sm text-slate-400">
                Referral activity stays visible without overwhelming the page.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/8 bg-slate-950/55 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Recent activity</h3>
              <span className="text-sm text-slate-500">Synced live</span>
            </div>

            <div className="mt-4 space-y-3">
              {activityFeed.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-white/[0.05] text-amber-200">
                      <Icon className="size-4.5" />
                    </div>
                    <span className="text-sm font-medium text-white">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

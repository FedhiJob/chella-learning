import { Coins, ShieldCheck, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Coins,
    title: "Reward system with real hierarchy",
    copy: "Balance, earnings, and bonuses are surfaced clearly so members understand what moved and why.",
  },
  {
    icon: Users,
    title: "Referrals that feel shareable",
    copy: "Codes, invite tracking, and rewards live in one section instead of being scattered across the app.",
  },
  {
    icon: Sparkles,
    title: "Daily loops that stay lightweight",
    copy: "Tasks and check-ins are easy to scan, quick to act on, and styled to keep momentum visible.",
  },
  {
    icon: ShieldCheck,
    title: "Sharper trust signals",
    copy: "A calmer visual system makes account flows, transfers, and milestones feel more dependable.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl">
        <p className="eyebrow">Designed around clarity</p>
        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          A reward product should feel energizing, not chaotic.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          The refreshed Chella interface tightens spacing, hierarchy, and page
          flow so members can understand rewards faster and act with less
          friction.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {features.map(({ icon: Icon, title, copy }) => (
          <div
            key={title}
            className="card-hover rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,11,20,0.98))] p-6 shadow-[0_22px_70px_rgba(2,6,23,0.35)]"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-amber-400/10 text-amber-200 ring-1 ring-amber-400/20">
                <Icon className="size-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  {copy}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

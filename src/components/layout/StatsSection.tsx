import { formatCompactNumber } from "../../utils/format";

const stats = [
  { value: `${formatCompactNumber(50000)}+`, label: "Active members" },
  { value: `${formatCompactNumber(500000)}+ ETB`, label: "Rewards distributed" },
  { value: "7-day streak", label: "Habit loop built in" },
  { value: "99%", label: "Member satisfaction target" },
];

export default function StatsSection() {
  return (
    <section
      id="rewards"
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="rounded-[34px] border border-white/8 bg-[linear-gradient(135deg,rgba(245,191,82,0.08),rgba(15,23,42,0.92),rgba(34,211,238,0.06))] p-6 shadow-[0_28px_90px_rgba(2,6,23,0.45)] sm:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border border-white/8 bg-slate-950/55 px-5 py-6"
            >
              <p className="text-3xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

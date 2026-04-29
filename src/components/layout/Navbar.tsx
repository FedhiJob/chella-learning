import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Rewards", href: "#rewards" },
  { label: "Why Chella", href: "#why-chella" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-slate-950/72 px-4 py-3 shadow-[0_24px_90px_rgba(2,6,23,0.45)] backdrop-blur sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,214,80,0.24),rgba(255,255,255,0.08))] text-sm font-semibold tracking-[0.3em] text-amber-100 shadow-[0_18px_50px_rgba(245,158,11,0.22)]">
            CH
          </div>
          <div className="space-y-0.5">
            <div className="text-sm font-semibold tracking-[0.24em] text-white sm:text-base">
              CHELLA
            </div>
            <div className="hidden text-[11px] uppercase tracking-[0.28em] text-slate-400 sm:block">
              Reward workspace
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="btn-dark hidden sm:inline-flex">
            Sign In
          </Link>
          <Link to="/register" className="btn-gold">
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section
      id="why-chella"
      className="mx-auto max-w-7xl px-4 pb-20 pt-18 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(140deg,rgba(245,191,82,0.18),rgba(15,23,42,0.94),rgba(34,211,238,0.12))] px-6 py-10 shadow-[0_34px_120px_rgba(2,6,23,0.48)] sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Ready for the cleaner version</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Start earning from a UI that finally feels intentional.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              Create your account, claim the welcome bonus, and move into a
              reward dashboard that treats hierarchy, spacing, and momentum like
              product features.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link to="/register" className="btn-gold">
              Create your account
              <ArrowRight className="size-4" />
            </Link>
            <Link to="/login" className="btn-dark">
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

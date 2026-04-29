import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Chella Copyright {new Date().getFullYear()} | Designed for calmer
          rewards, referrals, and member momentum.
        </p>

        <div className="flex items-center gap-5">
          <Link to="/login" className="transition-colors hover:text-white">
            Sign in
          </Link>
          <Link to="/register" className="transition-colors hover:text-white">
            Create account
          </Link>
        </div>
      </div>
    </footer>
  );
}

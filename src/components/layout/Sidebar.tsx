import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/slice/authSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { cn } from "../../utils/cn";
import { BrandMark } from "../ui/brand";
import { dashboardNav } from "./dashboardNav";

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActiveRoute = (href: string) =>
    href === "/dashboard"
      ? location.pathname === href
      : location.pathname.startsWith(href);

  return (
    <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 flex-col border-r border-white/8 bg-slate-950/70 px-5 pb-6 pt-5 backdrop-blur lg:flex">
      <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 shadow-[0_24px_90px_rgba(2,6,23,0.32)]">
        <BrandMark detail="Reward operations" />
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Keep daily tasks, transfers, referrals, and progress signals inside
          one calmer workspace.
        </p>
      </div>

      <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1">
        {dashboardNav.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group flex items-start gap-3 rounded-[22px] border px-4 py-3 transition-all",
                isActive
                  ? "border-amber-300/30 bg-[linear-gradient(135deg,rgba(245,191,82,0.22),rgba(255,255,255,0.02))] text-white shadow-[0_18px_50px_rgba(245,158,11,0.16)]"
                  : "border-transparent bg-transparent text-slate-400 hover:border-white/8 hover:bg-white/[0.03] hover:text-white",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl transition-colors",
                  isActive
                    ? "bg-slate-950/45 text-amber-100"
                    : "bg-white/[0.04] text-slate-400 group-hover:text-amber-100",
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium">{item.label}</p>
                <p className="mt-1 text-sm leading-5 text-slate-500 group-hover:text-slate-300">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-400">
        Stay on top of balance changes and daily streaks without bouncing
        between disconnected pages.
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-red-400/18 bg-red-500/10 px-4 py-3 font-medium text-red-200 transition-colors hover:bg-red-500/18"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}


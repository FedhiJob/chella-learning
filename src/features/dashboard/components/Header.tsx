import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { dashboardNav } from "../../../components/layout/dashboardNav";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import type { RootState } from "../../../store/store";
import { cn } from "../../../utils/cn";
import { formatBirr, getInitials } from "../../../utils/format";
import { getMyProfile } from "../../Profile/slice/profileSlice";
import NotificationDropdown from "../../notifications/components/NotificationDropdown";

function findCurrentPage(pathname: string) {
  return (
    dashboardNav.find((item) =>
      item.href === "/dashboard"
        ? pathname === item.href
        : pathname.startsWith(item.href),
    ) ?? dashboardNav[0]
  );
}

export default function Header() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { loading, profile } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const currentPage = findCurrentPage(location.pathname);
  const fullName = profile?.fullname ?? "Chella member";

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#05070d]/78 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="eyebrow">Workspace</p>
          <h1 className="mt-2 truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {currentPage.label}
          </h1>
          <p className="mt-1 hidden max-w-2xl text-sm text-slate-400 sm:block">
            {currentPage.description}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 md:flex">
            <span className="mr-2 text-slate-500">Balance</span>
            <span className="font-semibold text-white">
              {loading || !profile ? "Loading..." : formatBirr(profile.amount ?? 0)}
            </span>
          </div>

          <div className="rounded-full border border-white/8 bg-white/[0.03] p-1">
            <NotificationDropdown />
          </div>

          <label className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 lg:flex">
            <span className="text-slate-500">Currency</span>
            <select className="bg-transparent text-white">
              <option value="ETB">ETB</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </label>

          <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.03] px-2 py-2 sm:pl-2 sm:pr-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-[linear-gradient(145deg,rgba(255,214,80,0.28),rgba(255,255,255,0.08))] text-sm font-semibold text-slate-950">
              {getInitials(fullName)}
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-semibold text-white">{fullName}</p>
              <p className="truncate text-xs text-slate-400">
                @{profile?.username ?? "member"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border-t border-white/6 lg:hidden">
        <nav className="flex gap-2 px-4 py-3 sm:px-6">
          {dashboardNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "border-amber-300/28 bg-amber-300/12 text-white"
                    : "border-white/8 bg-white/[0.03] text-slate-400",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}


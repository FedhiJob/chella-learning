import type { LucideIcon } from "lucide-react";
import {
  Award,
  Calendar,
  CheckCircle2,
  HelpCircle,
  LayoutDashboard,
  ReceiptText,
  Send,
  Settings,
  Trophy,
  User,
  Users,
} from "lucide-react";

export interface DashboardNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  description: string;
}

export const dashboardNav: DashboardNavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/dashboard",
    description: "Balance, progress, and recent activity",
  },
  {
    icon: CheckCircle2,
    label: "Tasks",
    href: "/dashboard/tasks",
    description: "Complete reward-earning actions",
  },
  {
    icon: Calendar,
    label: "Check-in",
    href: "/dashboard/daily-checkin",
    description: "Keep your streak alive",
  },
  {
    icon: Users,
    label: "Referrals",
    href: "/dashboard/referrals",
    description: "Share your code and grow earnings",
  },
  {
    icon: Trophy,
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
    description: "See top performers",
  },
  {
    icon: ReceiptText,
    label: "Transactions",
    href: "/dashboard/transactions",
    description: "Review transfers and account history",
  },
  {
    icon: Send,
    label: "Transfer",
    href: "/dashboard/transfer",
    description: "Send funds to another account",
  },
  {
    icon: User,
    label: "Profile",
    href: "/dashboard/profile",
    description: "Identity, referral details, and rewards",
  },
  {
    icon: Award,
    label: "Achievements",
    href: "/dashboard/achievements",
    description: "Unlock milestones and bonuses",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
    description: "Personalize your workspace",
  },
  {
    icon: HelpCircle,
    label: "Help",
    href: "/dashboard/help",
    description: "FAQs and support resources",
  },
];

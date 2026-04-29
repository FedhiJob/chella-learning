import { useEffect } from "react";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  DollarSign,
  Gift,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  EmptyState,
  PageContainer,
  PageHeader,
  SectionTitle,
  StatCard,
  Surface,
} from "../../../components/ui/shell";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  formatBirr,
  formatCompactNumber,
  formatDateTime,
} from "../../../utils/format";
import { getMyProfile } from "../../Profile/slice/profileSlice";
import { getAchievements } from "../../achievements/slice/achievementsSlice";
import { getMyReferrals } from "../../referrals/slice/referralSlice";
import { getTodaysTask } from "../../tasks/slice/taskSlice";
import { getMyTransactions } from "../../transactions/slice/transactionSlice";

const quickActions = [
  {
    icon: CheckCircle,
    label: "Finish daily tasks",
    href: "/dashboard/tasks",
    tone: "from-emerald-300/22 to-emerald-500/10 text-emerald-100 ring-emerald-400/20",
  },
  {
    icon: Calendar,
    label: "Keep your streak",
    href: "/dashboard/daily-checkin",
    tone: "from-orange-300/22 to-orange-500/10 text-orange-100 ring-orange-400/20",
  },
  {
    icon: Users,
    label: "Share referrals",
    href: "/dashboard/referrals",
    tone: "from-sky-300/22 to-sky-500/10 text-sky-100 ring-sky-400/20",
  },
  {
    icon: Trophy,
    label: "Check the leaderboard",
    href: "/dashboard/leaderboard",
    tone: "from-violet-300/22 to-violet-500/10 text-violet-100 ring-violet-400/20",
  },
  {
    icon: DollarSign,
    label: "Send a transfer",
    href: "/dashboard/transfer",
    tone: "from-amber-300/22 to-amber-500/10 text-amber-100 ring-amber-400/20",
  },
  {
    icon: Award,
    label: "Open achievements",
    href: "/dashboard/achievements",
    tone: "from-cyan-300/22 to-cyan-500/10 text-cyan-100 ring-cyan-400/20",
  },
];

export default function DashboardHome() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.profile);
  const { transactions } = useAppSelector((state) => state.transaction);
  const { tasks } = useAppSelector((state) => state.task);
  const { referrals } = useAppSelector((state) => state.referral);
  const { achievements } = useAppSelector((state) => state.achievements || {
    achievements: [],
  });

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getMyTransactions());
    dispatch(getTodaysTask());
    dispatch(getMyReferrals());
    dispatch(getAchievements());
  }, [dispatch]);

  const fullName = profile?.fullname ?? "there";
  const firstName = fullName.split(" ")[0] ?? "there";
  const earnedAchievements = achievements.filter((achievement) => achievement.isEarned);
  const recentTransactions = transactions.slice(0, 4);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Rewards command center"
        title={`Welcome back, ${firstName}`}
        description="Track balance, referrals, streaks, and the next best action without bouncing across disconnected screens."
        actions={
          <button
            type="button"
            onClick={() => navigate("/dashboard/tasks")}
            className="btn-gold"
          >
            Go to today's tasks
            <ArrowRight className="size-4" />
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          icon={Wallet}
          label="Available balance"
          value={formatBirr(profile?.amount ?? 0)}
          description="Ready to transfer or compound through daily rewards."
          accent="gold"
        />
        <StatCard
          icon={DollarSign}
          label="Total earned"
          value={formatBirr(profile?.totalEarned ?? 0)}
          description="All-time rewards across tasks, referrals, and bonuses."
          accent="green"
        />
        <StatCard
          icon={Users}
          label="Referrals"
          value={formatCompactNumber(profile?.totalReferred ?? referrals.length)}
          description="People you've brought into the Chella network."
          accent="blue"
        />
        <StatCard
          icon={CheckCircle}
          label="Today's tasks"
          value={tasks.length}
          description="Actions waiting for completion right now."
          accent="violet"
        />
        <StatCard
          icon={Award}
          label="Achievements"
          value={earnedAchievements.length}
          description="Milestones unlocked through consistent activity."
          accent="rose"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Surface>
          <SectionTitle
            title="Quick actions"
            description="Move directly into the next high-value part of your day."
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.href}
                  type="button"
                  onClick={() => navigate(action.href)}
                  className="group rounded-[24px] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 text-left transition-transform hover:-translate-y-1"
                >
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] ring-1 ${action.tone}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-white">
                    {action.label}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-slate-400 transition-colors group-hover:text-white">
                    Open now
                    <ArrowRight className="ml-2 size-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </Surface>

        <Surface>
          <SectionTitle
            title="Momentum snapshot"
            description="A calmer read on where to focus next."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <p className="eyebrow">Next up</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {tasks.length > 0 ? `${tasks.length} tasks ready` : "No pending tasks"}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {tasks.length > 0
                  ? "Knock these out first to keep your reward flow moving."
                  : "You've cleared today's task queue. Check referrals or streaks next."}
              </p>
              <button
                type="button"
                onClick={() => navigate("/dashboard/tasks")}
                className="mt-5 text-sm font-medium text-amber-200 transition-colors hover:text-amber-100"
              >
                Open task list
              </button>
            </div>

            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <p className="eyebrow">Referral loop</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {profile?.referralCode ?? "Share your code"}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Every new member keeps the earning loop warm. Make the code easy
                to copy, share, and remember.
              </p>
              <button
                type="button"
                onClick={() => navigate("/dashboard/referrals")}
                className="mt-5 text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100"
              >
                View referral tools
              </button>
            </div>

            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 sm:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">Earned signals</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {earnedAchievements.length} achievements unlocked
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Pair milestones with referrals and streak activity to keep
                    the dashboard feeling alive.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/achievements")}
                  className="btn-dark"
                >
                  Review achievements
                </button>
              </div>
            </div>
          </div>
        </Surface>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Surface>
          <SectionTitle
            title="Recent transactions"
            description="The latest money movement across your account."
            action={
              <button
                type="button"
                onClick={() => navigate("/dashboard/transactions")}
                className="text-sm font-medium text-amber-200 transition-colors hover:text-amber-100"
              >
                View all
              </button>
            }
          />

          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((tx) => {
                const isOutgoing = tx.senderUsername === profile?.username;

                return (
                  <div
                    key={tx.id}
                    className="flex flex-col gap-4 rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-11 items-center justify-center rounded-2xl ${
                          isOutgoing
                            ? "bg-rose-400/12 text-rose-200"
                            : "bg-emerald-400/12 text-emerald-200"
                        }`}
                      >
                        <ArrowRight
                          className={`size-4 ${isOutgoing ? "" : "rotate-180"}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {isOutgoing
                            ? `Sent to ${tx.receiverUsername}`
                            : `Received from ${tx.senderUsername}`}
                        </p>
                        <p className="text-sm text-slate-400">
                          {tx.description || "Reward transfer"}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p
                        className={`font-semibold ${
                          isOutgoing ? "text-rose-200" : "text-emerald-200"
                        }`}
                      >
                        {isOutgoing ? "-" : "+"}
                        {formatBirr(tx.amount)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {formatDateTime(tx.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Wallet}
              title="No recent transactions yet"
              description="As soon as rewards or transfers hit your account, they will appear here with cleaner status cues."
              action={
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/transfer")}
                  className="btn-dark"
                >
                  Make your first transfer
                </button>
              }
            />
          )}
        </Surface>

        <Surface>
          <SectionTitle
            title="Invite and earn"
            description="The referral loop should be visible, simple, and rewarding."
          />

          <div className="rounded-[28px] border border-amber-300/18 bg-[linear-gradient(145deg,rgba(245,191,82,0.16),rgba(255,255,255,0.02))] p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950/35 text-amber-100">
              <Gift className="size-5" />
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Invite friends and earn more
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Share your referral code, track who joined, and see the reward loop
              without digging through the dashboard.
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-slate-950/45 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Referral code
                </p>
                <p className="mt-2 font-mono text-lg text-white">
                  {profile?.referralCode ?? "No code yet"}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-slate-950/45 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Potential next reward
                </p>
                <p className="mt-2 text-white">
                  Each successful invite adds
                  <span className="ml-2 font-semibold text-amber-100">
                    {formatBirr(20)}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard/referrals")}
              className="btn-gold mt-5 w-full"
            >
              Open referral workspace
            </button>
          </div>
        </Surface>
      </div>
    </PageContainer>
  );
}

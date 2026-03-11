import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { getMyProfile } from "../../Profile/slice/profileSlice";
import { getMyTransactions } from "../../transactions/slice/transactionSlice";
import { getTodaysTask } from "../../tasks/slice/taskSlice";
import { getMyReferrals } from "../../referrals/slice/referralSlice";
import {
  Wallet,
  Users,
  CheckCircle,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Clock,
  Gift,
  Calendar,
  Trophy,
} from "lucide-react";

export default function DashboardHome() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.profile);
  const { transactions } = useAppSelector((state) => state.transaction);
  const { tasks } = useAppSelector((state) => state.task);
  const { referrals } = useAppSelector((state) => state.referral);

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getMyTransactions());
    dispatch(getTodaysTask());
    dispatch(getMyReferrals());
  }, [dispatch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const quickActions = [
    {
      icon: CheckCircle,
      label: "Complete Tasks",
      href: "/dashboard/tasks",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: Calendar,
      label: "Daily Check-in",
      href: "/dashboard/daily-checkin",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      icon: Users,
      label: "View Referrals",
      href: "/dashboard/referrals",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      icon: Trophy,
      label: "Leaderboard",
      href: "/dashboard/leaderboard",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
    {
      icon: DollarSign,
      label: "Transfer Money",
      href: "/dashboard/transfer",
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
    },
    {
      icon: Wallet,
      label: "View Profile",
      href: "/dashboard/profile",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {profile?.fullname || "User"}! 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Balance Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Available Balance</p>
              <p className="text-2xl font-bold text-white mt-1">
                {formatCurrency(profile?.amount || 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Wallet className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <TrendingUp size={16} className="mr-1" />
            <span>Ready to use</span>
          </div>
        </div>

        {/* Total Earned Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Earned</p>
              <p className="text-2xl font-bold text-white mt-1">
                {formatCurrency(profile?.totalEarned || 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <DollarSign className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-gray-400 text-sm">
            <Clock size={16} className="mr-1" />
            <span>All time earnings</span>
          </div>
        </div>

        {/* Referrals Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Referrals</p>
              <p className="text-2xl font-bold text-white mt-1">
                {profile?.totalReferred || referrals.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-gray-400 text-sm">
            <Gift size={16} className="mr-1" />
            <span>People invited</span>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Today's Tasks</p>
              <p className="text-2xl font-bold text-white mt-1">
                {tasks.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-gray-400 text-sm">
            <span
              className="cursor-pointer text-yellow-500 hover:text-yellow-400"
              onClick={() => navigate("/dashboard/tasks")}
            >
              View tasks →
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.href}
                onClick={() => navigate(action.href)}
                className={`${action.color} ${action.hoverColor} p-4 rounded-xl flex flex-col items-center justify-center transition-all transform hover:scale-105 group`}
              >
                <Icon size={28} className="text-white mb-2" />
                <span className="text-white font-medium text-sm">
                  {action.label}
                </span>
                <ArrowRight
                  size={16}
                  className="text-white/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Recent Transactions
          </h2>
          <button
            onClick={() => navigate("/dashboard/transactions")}
            className="text-yellow-500 hover:text-yellow-400 text-sm flex items-center"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.senderUsername === profile?.username
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {tx.senderUsername === profile?.username ? (
                      <ArrowRight size={20} />
                    ) : (
                      <ArrowRight size={20} className="rotate-180" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {tx.senderUsername === profile?.username
                        ? `Sent to ${tx.receiverUsername}`
                        : `Received from ${tx.senderUsername}`}
                    </p>
                    <p className="text-gray-400 text-sm">{tx.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      tx.senderUsername === profile?.username
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {tx.senderUsername === profile?.username ? "-" : "+"}
                    {formatCurrency(tx.amount)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {formatDate(tx.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No recent transactions</p>
            <button
              onClick={() => navigate("/dashboard/transfer")}
              className="mt-2 text-yellow-500 hover:text-yellow-400"
            >
              Make your first transfer →
            </button>
          </div>
        )}
      </div>

      {/* Referral Code Banner */}
      <div className="bg-linear-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl p-6 border border-yellow-500/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Invite Friends & Earn Rewards! 🎁
            </h3>
            <p className="text-gray-300 mt-1">
              Share your referral code and earn when your friends join
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/referrals")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Users size={20} className="mr-2" />
            View Referral Code
          </button>
        </div>
      </div>
    </div>
  );
}


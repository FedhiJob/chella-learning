import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { getTopEarners, getTopReferrers } from "../slice/leaderboardSlice";
import { Trophy, Medal, Users, DollarSign, Crown } from "lucide-react";

export default function LeaderboardPage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"earners" | "referrers">("earners");
  const { topEarners, topReferrers, loading } = useAppSelector(
    (state) => state.leaderboard
  );
  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getTopEarners());
    dispatch(getTopReferrers());
  }, [dispatch]);

  const currentList = activeTab === "earners" ? topEarners : topReferrers;

  // Mock data for demo
  const mockEarners = [
    { rank: 1, userId: "1", username: "alex_dev", fullName: "Alex Johnson", totalEarned: 15420, totalReferred: 45 },
    { rank: 2, userId: "2", username: "sarah_m", fullName: "Sarah Miller", totalEarned: 12350, totalReferred: 38 },
    { rank: 3, userId: "3", username: "john_doe", fullName: "John Doe", totalEarned: 9870, totalReferred: 32 },
    { rank: 4, userId: "4", username: "emma_w", fullName: "Emma Wilson", totalEarned: 7650, totalReferred: 28 },
    { rank: 5, userId: "5", username: "mike_b", fullName: "Mike Brown", totalEarned: 5430, totalReferred: 22 },
  ];

  const mockReferrers = [
    { rank: 1, userId: "1", username: "chella_king", fullName: "Chella King", totalEarned: 5000, totalReferred: 120 },
    { rank: 2, userId: "2", username: "referral_pro", fullName: "Referral Pro", totalEarned: 4200, totalReferred: 95 },
    { rank: 3, userId: "3", username: "network_ninja", fullName: "Network Ninja", totalEarned: 3800, totalReferred: 82 },
    { rank: 4, userId: "4", username: "team_builder", fullName: "Team Builder", totalEarned: 3100, totalReferred: 68 },
    { rank: 5, userId: "5", username: "invite_master", fullName: "Invite Master", totalEarned: 2500, totalReferred: 55 },
  ];

  const displayList = currentList.length > 0 ? currentList : (activeTab === "earners" ? mockEarners : mockReferrers);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-300" size={24} />;
      case 3:
        return <Medal className="text-amber-600" size={24} />;
      default:
        return <span className="text-gray-400 font-bold">{rank}</span>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Trophy className="text-yellow-500" size={36} />
          Leaderboard
        </h1>
        <p className="text-gray-400 mt-2">
          See who's leading the pack!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("earners")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === "earners"
              ? "bg-yellow-500 text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <DollarSign className="inline mr-2" size={18} />
          Top Earners
        </button>
        <button
          onClick={() => setActiveTab("referrers")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === "referrers"
              ? "bg-yellow-500 text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <Users className="inline mr-2" size={18} />
          Top Referrers
        </button>
      </div>

      {/* Top 3 Podium */}
      {displayList.length >= 3 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Top 3
          </h2>
          <div className="flex justify-center items-end gap-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white mb-2">
                {displayList[1]?.username?.charAt(0).toUpperCase() || "2"}
              </div>
              <p className="text-white font-semibold">{displayList[1]?.fullName || "User"}</p>
              <p className="text-gray-400 text-sm">{formatCurrency(displayList[1]?.[activeTab === "earners" ? "totalEarned" : "totalReferred"] || 0)}</p>
              <div className="mt-2 bg-gray-600 h-24 rounded-t-lg flex items-center justify-center">
                <Medal className="text-gray-300" size={32} />
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center -mt-4">
              <Crown className="text-yellow-400 mx-auto mb-2" size={32} />
              <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-black mb-2">
                {displayList[0]?.username?.charAt(0).toUpperCase() || "1"}
              </div>
              <p className="text-white font-semibold">{displayList[0]?.fullName || "User"}</p>
              <p className="text-yellow-500 font-bold">{formatCurrency(displayList[0]?.[activeTab === "earners" ? "totalEarned" : "totalReferred"] || 0)}</p>
              <div className="mt-2 bg-yellow-500/30 h-32 rounded-t-lg flex items-center justify-center">
                <Trophy className="text-yellow-400" size={40} />
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-14 h-14 bg-gray-700 rounded-full mx-auto flex items-center justify-center text-xl font-bold text-white mb-2">
                {displayList[2]?.username?.charAt(0).toUpperCase() || "3"}
              </div>
              <p className="text-white font-semibold">{displayList[2]?.fullName || "User"}</p>
              <p className="text-gray-400 text-sm">{formatCurrency(displayList[2]?.[activeTab === "earners" ? "totalEarned" : "totalReferred"] || 0)}</p>
              <div className="mt-2 bg-amber-700/30 h-20 rounded-t-lg flex items-center justify-center">
                <Medal className="text-amber-600" size={28} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          {activeTab === "earners" ? "Top Earners" : "Top Referrers"}
        </h2>
        <div className="space-y-3">
          {displayList.map((entry: { rank: number; userId: string; username: string; fullName: string; totalEarned: number; totalReferred: number }) => (
            <div
              key={entry.userId}
              className={`flex items-center justify-between p-4 rounded-lg ${
                entry.rank <= 3 ? "bg-gray-700/50" : "bg-gray-700/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                  {entry.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold">{entry.fullName}</p>
                  <p className="text-gray-400 text-sm">@{entry.username}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">
                  {activeTab === "earners"
                    ? formatCurrency(entry.totalEarned)
                    : `${entry.totalReferred} Referrals`}
                </p>
                <p className="text-gray-400 text-xs">
                  {activeTab === "earners" ? "Total Earned" : "Total Referrals"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      )}
    </div>
  );
}


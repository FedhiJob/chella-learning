import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { getCheckinStatus, claimDailyReward } from "../slice/dailyCheckinSlice";
import { Gift, Check, Lock, Calendar, Flame } from "lucide-react";

export default function DailyCheckinPage() {
  const dispatch = useAppDispatch();
  const { checkinStatus, loading, checkinLoading } = useAppSelector(
    (state) => state.dailyCheckin
  );

  useEffect(() => {
    dispatch(getCheckinStatus());
  }, [dispatch]);

  const handleClaim = (day: number) => {
    if (checkinStatus?.canCheckIn) {
      dispatch(claimDailyReward(day));
    }
  };

  const rewards = checkinStatus?.checkins || [
    { id: "1", day: 1, reward: 10, claimed: false },
    { id: "2", day: 2, reward: 20, claimed: false },
    { id: "3", day: 3, reward: 30, claimed: false },
    { id: "4", day: 4, reward: 40, claimed: false },
    { id: "5", day: 5, reward: 50, claimed: false },
    { id: "6", day: 6, reward: 75, claimed: false },
    { id: "7", day: 7, reward: 100, claimed: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Daily Check-in Rewards</h1>
        <p className="text-gray-400 mt-2">
          Check in daily to earn rewards and build your streak!
        </p>
      </div>

      {/* Streak Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
        <div className="flex items-center justify-center gap-3">
          <Flame className="text-orange-500" size={32} />
          <div>
            <p className="text-2xl font-bold text-white">
              {checkinStatus?.streak || 0} Day Streak
            </p>
            <p className="text-gray-400 text-sm">
              {checkinStatus?.canCheckIn
                ? "Check in today to continue your streak!"
                : "Come back tomorrow to continue your streak!"}
            </p>
          </div>
        </div>
      </div>

      {/* Check-in Grid */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">
          7-Day Reward Calendar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {rewards.map((dayItem: { id: string; day: number; reward: number; claimed: boolean }, index: number) => {
            const isClaimed = dayItem.claimed;
            const isToday = checkinStatus?.canCheckIn && index === (checkinStatus?.streak || 0);
            const isLocked = index > (checkinStatus?.streak || 0) + (checkinStatus?.canCheckIn ? 1 : 0);

            return (
              <div
                key={dayItem.id || dayItem.day}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  isClaimed
                    ? "border-green-500 bg-green-500/10"
                    : isToday
                    ? "border-yellow-500 bg-yellow-500/10 cursor-pointer hover:scale-105"
                    : isLocked
                    ? "border-gray-700 bg-gray-700/30 opacity-50"
                    : "border-gray-600 bg-gray-700/50"
                }`}
                onClick={() => {
                  if (isToday && !isClaimed) {
                    handleClaim(dayItem.day);
                  }
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                    {isClaimed ? (
                      <Check className="text-green-500" size={20} />
                    ) : isLocked ? (
                      <Lock className="text-gray-500" size={20} />
                    ) : (
                      <Calendar className="text-yellow-500" size={20} />
                    )}
                  </div>
                  <p className="text-white font-semibold">Day {dayItem.day}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Gift className="text-yellow-500" size={14} />
                    <span className="text-yellow-500 font-bold">{dayItem.reward}</span>
                  </div>
                  {isClaimed && (
                    <span className="text-green-500 text-xs mt-2">Claimed!</span>
                  )}
                  {isToday && !isClaimed && (
                    <span className="text-yellow-500 text-xs mt-2 animate-pulse">
                      Claim Now!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      )}

      {/* Check-in Button */}
      {checkinStatus?.canCheckIn && (
        <div className="text-center">
          <button
            onClick={() => handleClaim((checkinStatus?.streak || 0) + 1)}
            disabled={checkinLoading}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black px-8 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            {checkinLoading ? "Claiming..." : "Check In Now"}
          </button>
        </div>
      )}
    </div>
  );
}


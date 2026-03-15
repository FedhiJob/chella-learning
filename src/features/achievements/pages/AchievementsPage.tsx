import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getAchievements } from '../slice/achievementsSlice';
import { Trophy, Award, Star } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rewardAmount: number;
  isEarned: boolean;
  earnedAt?: string;
}

export default function AchievementsPage() {
  const dispatch = useAppDispatch();
  const { achievements, loading, error } = useAppSelector((state) => state.achievements || { achievements: [], loading: false, error: null });

  useEffect(() => {
    dispatch(getAchievements());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'trophy': return <Trophy className="w-12 h-12 text-yellow-500" />;
      case 'award': return <Award className="w-12 h-12 text-blue-500" />;
      case 'star': return <Star className="w-12 h-12 text-purple-500" />;
      default: return <Trophy className="w-12 h-12 text-gray-500" />;
    }
  };

  if (loading) return <div className="p-6 text-center">Loading achievements...</div>;
  if (error) return <div className="p-6 text-center text-red-400">Error: {error}</div>;

  const earned = achievements.filter(a => a.isEarned);
  const available = achievements.filter(a => !a.isEarned);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-white">Achievements</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Earned Achievements */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-400" />
            Earned Achievements ({earned.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {earned.map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getIconComponent(achievement.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{achievement.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400 font-medium">+${achievement.rewardAmount}</span>
                    {achievement.earnedAt && (
                      <span className="text-gray-500">{formatDate(achievement.earnedAt)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {earned.length === 0 && (
              <p className="text-gray-400 text-center py-8">No achievements earned yet. Keep completing tasks!</p>
            )}
          </div>
        </div>

        {/* Available Achievements */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Available to Unlock ({available.length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {available.map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg border-2 border-gray-600">
                <div className="flex-shrink-0 mt-1 opacity-50">
                  {getIconComponent(achievement.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{achievement.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                  <div className="text-sm text-gray-500">
                    Reward: +${achievement.rewardAmount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


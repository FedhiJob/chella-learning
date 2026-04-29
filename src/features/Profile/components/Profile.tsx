import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getMyProfile } from '../slice/profileSlice';
import { getAchievements } from '../../achievements/slice/achievementsSlice';
import type { Achievement } from '../../achievements/slice/achievementsSlice';
import { Award } from 'lucide-react';

export default function Profile() {
  const dispatch = useAppDispatch();  
  const {loading, error, profile} = useAppSelector((state) => state.profile);
  const { achievements, loading: achievementsLoading } = useAppSelector((state) => state.achievements || { achievements: [], loading: false });

  React.useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getAchievements());
  }, [dispatch]); 

  if(loading || achievementsLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const earnedAchievements = achievements.filter(a => a.isEarned);

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-6 max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">My Profile</h2>
      {error && <div className="text-red-500 mb-4 p-3 bg-red-500/10 rounded-lg">{error}</div>}
      
      {profile && (   
        <div className="space-y-6">
          <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="mb-3"><span className="font-semibold">Username:</span> {profile.username}</p>
              <p className="mb-3"><span className="font-semibold">Full Name:</span> {profile.fullname}</p>
              <p className="mb-3"><span className="font-semibold">Referral Code:</span> <span className="bg-yellow-500/20 px-3 py-1 rounded-full font-mono">{profile.referralCode}</span></p>    
              <p className="mb-3"><span className="font-semibold">Referred By:</span> {profile.refferedBy || 'N/A'}</p>
            </div>
            <div>
              <p className="mb-3 text-2xl font-bold text-green-400"><span className="font-normal text-white">Balance:</span> ${profile.amount.toFixed(2)}</p>
              <p className="text-lg"><span className="font-semibold">Total Earned:</span> ${profile.totalEarned.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
              <Award className="w-6 h-6" />
              Achievements ({earnedAchievements.length})
            </h3>
            {earnedAchievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto p-4 bg-gray-900/50 rounded-xl">
                {earnedAchievements.map((achievement: Achievement) => (
                  <div key={achievement.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{achievement.name}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-green-400 font-medium">+${achievement.rewardAmount}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-900/50 rounded-xl">
                <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No achievements earned yet!</p>
                <p className="text-gray-500 text-sm mt-1">Complete tasks and invite friends to unlock badges</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

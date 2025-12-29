import React,{useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getMyReferrals } from '../slice/referralSlice';
import type { RootState } from '../../../store/store';
import { Users } from 'lucide-react';
export default function Referrals() {
    const dispatch=useAppDispatch();
const {loading,error,referrals}=useAppSelector((state: RootState) => state.referral);

    useEffect(()=>{
 
   dispatch(getMyReferrals())
    },[])
    if(loading){
        return <div></div>
    }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Total Referred</p>
          <p className="text-4xl font-bold text-[#FFD700]">{referrals.length}</p>
          <p className="text-xs text-gray-500 mt-2">Friends joined</p>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Earnings from Referrals</p>
          <p className="text-4xl font-bold text-green-400">{referrals.length*20} ETB</p>
          <p className="text-xs text-gray-500 mt-2">Total rewards earned</p>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Potential Earnings</p>
          <p className="text-4xl font-bold text-purple-400">400 ETB</p>
          <p className="text-xs text-gray-500 mt-2">If 20 friends join</p>
        </div>
      </div>
           <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <Users className="text-[#FFD700]" size={24} />
          <h2 className="text-2xl font-bold font-montserrat">Your Referrals</h2>
        </div>

        {referrals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Username</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">FullName</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-semibold text-sm">Reward Earned</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                    <td className="py-4 px-4 font-semibold">@{referral.referredUserUsername}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{referral.referredUserFullName}</td>
                    <td className="py-4 px-4 text-right font-bold text-[#FFD700]">+20 ETB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="text-gray-700 mx-auto mb-4" size={48} />
            <p className="text-gray-400 mb-4">No referrals yet. Share your code to earn!</p>
            <button className="btn-gold">Start Sharing</button>
          </div>
        )}
      </div>
    </>
  );
}

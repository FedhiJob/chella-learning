import React from 'react'
import { useAppSelector } from '../../../hooks/hooks';
import { useAppDispatch } from '../../../hooks/hooks';
import { getMyProfile } from '../slice/profileSlice';
export default function Profile() {


const dispatch = useAppDispatch();  
const {loading, error, profile} = useAppSelector((state) => state.profile);
React.useEffect(() => {
  dispatch(getMyProfile());

}, []); if(loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-black border border-gray-700 rounded-lg p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">My Profile</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
        {profile && (   
        <div className="text-white">
            <p className="mb-2"><span className="font-semibold">Username:</span> {profile.username}</p>
            <p className="mb-2"><span className="font-semibold">Referral Code:</span> {profile.referralCode}</p>    
            <p className="mb-2"><span className="font-semibold">Referred By:</span> {profile.refferedBy || 'N/A'}</p>
            <p className="mb-2"><span className="font-semibold">Amount:</span> ${profile.amount.toFixed(2)}</p>
            <p className="mb-2"><span className="font-semibold">Total Earned:</span> ${profile.totalEarned.toFixed(2)}</p>
        </div>
        )}
    </div>
  )
}   
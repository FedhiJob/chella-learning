import React from 'react';
import Referrals from '../components/Referrals';
import ReferralCodeContainer from '../components/ReferralCodeContainer';
export default function ReferralsPage() {
  return (
    <div className="space-y-8 p-6">
       <div>
        <h1 className="text-4xl font-bold font-montserrat mb-2">Refer Friends</h1>
        <p className="text-gray-400">Earn 20 ETB for every friend who joins Chella</p>
      </div>
      <ReferralCodeContainer/>
      
    <Referrals />
    </div>
  );
}

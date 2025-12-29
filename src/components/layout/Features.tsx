import { Coins, Users, Zap } from 'lucide-react';
import React from 'react';

export default function Features() {
  return (
    <section className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold font-montserrat text-center mb-16">Why Choose Chella?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8 hover:border-[#FFD700] transition-colors duration-300">
            <div className="bg-[#2A2A2A] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Coins className="text-[#FFD700]" size={28} />
            </div>
            <h3 className="text-2xl font-bold font-montserrat mb-3">100 ETB Signup Bonus</h3>
            <p className="text-gray-400">Get credited instantly when you register and start earning immediately.</p>
          </div>

        
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8 hover:border-[#FFD700] transition-colors duration-300">
            <div className="bg-[#2A2A2A] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Users className="text-[#FFD700]" size={28} />
            </div>
            <h3 className="text-2xl font-bold font-montserrat mb-3">20 ETB per Referral</h3>
            <p className="text-gray-400">Share your code and earn rewards for every friend who joins Chella.</p>
          </div>

         
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8 hover:border-[#FFD700] transition-colors duration-300">
            <div className="bg-[#2A2A2A] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Zap className="text-[#FFD700]" size={28} />
            </div>
            <h3 className="text-2xl font-bold font-montserrat mb-3">Daily Reward Tasks</h3>
            <p className="text-gray-400">Complete simple tasks daily and watch your balance grow effortlessly.</p>
          </div>
        </div>
      </section>
  );
}

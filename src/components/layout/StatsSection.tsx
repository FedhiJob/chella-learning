import React from 'react';

export default function StatsSection() {
  return (
     <section className="px-8 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-[#1A1A1A] rounded-xl p-8 text-center border border-gray-800">
            <div className="text-4xl font-bold text-[#FFD700] mb-2">50K+</div>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-xl p-8 text-center border border-gray-800">
            <div className="text-4xl font-bold text-[#FFD700] mb-2">500K+</div>
            <p className="text-gray-400">ETB Distributed</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-xl p-8 text-center border border-gray-800">
            <div className="text-4xl font-bold text-[#FFD700] mb-2">3</div>
            <p className="text-gray-400">Currencies Supported</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-xl p-8 text-center border border-gray-800">
            <div className="text-4xl font-bold text-[#FFD700] mb-2">99%</div>
            <p className="text-gray-400">User Satisfaction</p>
          </div>
        </div>
      </section>
  );
}

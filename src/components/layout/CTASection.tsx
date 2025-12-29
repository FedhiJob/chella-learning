import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="px-8 py-20 text-center bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent rounded-2xl mx-8 mb-20">
        <h2 className="text-4xl font-bold font-montserrat mb-6">Ready to Start Earning?</h2>
        <p className="text-xl text-gray-400 mb-8">Join thousands of users already rewarded by Chella.</p>
        <Link to="/register">
          <button className="btn-gold">Create Your Account Now</button>
        </Link>
      </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <div className="text-2xl font-bold font-montserrat tracking-wider">
          <span className="text-[#FFD700]">Chella</span>
          <span className="text-gray-400 text-sm ml-2">Reward App</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <button className="btn-dark">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-gold">Get Started</button>
          </Link>
        </div>
      </nav>
  );
}

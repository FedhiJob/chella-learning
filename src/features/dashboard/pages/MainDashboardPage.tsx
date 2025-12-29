import React from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
export default function MainDashboardPage() {
  return (
    <div className='bg-black w-full min-h-screen flex text-white'>
      <Sidebar />

       <main className="flex-1 ">
        <Header />
       <Outlet />
      </main>
    </div>
  );
}

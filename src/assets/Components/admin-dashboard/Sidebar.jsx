import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const Sidebar = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="bg-blue-600 w-1/5 shadow-xl text-white p-4 flex flex-col items-center">
        <button className="bg-blue-800 w-full h-10 rounded-xl border border-blue-400 text-xl font-semibold hover:border-blue-950 mb-4">
          Journals
        </button>
        {/* You can add more sidebar links here */}
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-slate-200 overflow-y-auto">
        {/* Show your dashboard or outlet content here */}
        <AdminDashboard />
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;

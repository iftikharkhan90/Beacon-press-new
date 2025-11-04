import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Editorialboard from './EditorialBoard';

const EditorialSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed  left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        transition-transform duration-300 ease-in-out
        bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 
       w-2/3 md:w-1/5
        h-full
        shadow-2xl text-white p-6 flex flex-col items-center 
        before:absolute before:inset-0 before:bg-black before:opacity-5
        z-40
      `}>
        <div className="relative z-10 w-full">
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              {/* Animated circular glow */}
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              
              {/* Logo circle */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-300 to-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-200">
                <svg className="w-10 h-10 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
            </div>
            
            {/* Brand text */}
            <h1 className="text-2xl font-bold mb-1 tracking-wide">Editorial Board</h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          </div>
          
          <button className="relative group bg-gradient-to-r from-blue-500 to-blue-600 w-full h-12 rounded-2xl border-2 border-blue-400 text-xl font-bold hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
            
            {/* Button text */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Journals
            </span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
          </button>
        </div>
        
        {/* Decorative bottom accent */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50"></div>
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70"></div>
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full opacity-90"></div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 overflow-y-auto shadow-inner relative z-10">
        {/* Overlay for mobile */}
       {isSidebarOpen && (
  <div
    onClick={toggleSidebar}
    className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 transition-all duration-300"
  ></div>
)}

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800"> <Editorialboard />
        </h2>
          <p className="mt-4 text-gray-600"> <Outlet /></p>
        </div>
      </div>
    </div>
  );
};

export default EditorialSidebar;
// src/components/AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  // Detect active section based on current route
  useEffect(() => {
    const path = location.pathname;
    console.log('Current path:', path); // Debug log
    
    if (path.includes('editorial')) {
      setActiveSection('editorial');
    } else if (path.includes('assign-papers') || path.includes('papers')) {
      setActiveSection('papers');
    } else if (path.includes('dashboard') && !path.includes('manage-editorial') && !path.includes('assign-papers')) {
      setActiveSection('dashboard');
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getSidebarContent = () => {
    const journalId = localStorage.getItem('journalId');
    
    switch (activeSection) {
      case 'dashboard':
        return {
          title: 'Admin Dashboard',
          menuItems: [
            { 
              name: 'All Journals', 
              icon: '📚', 
            },
           
          ],
          primaryButton: {
            text: 'Journals',
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            ),
          }
        };

      case 'editorial':
        return {
          title: 'Editorial Board',
          menuItems: [
            
            { 
              name: 'All Members', 
              icon: '👥', 
            },
          
          ],
          primaryButton: {
            text: 'Members',
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ),
          }
        };

      case 'papers':
        return {
          title: 'Papers Management',
          menuItems: [
          
            { 
              name: 'All Papers', 
              icon: '📄', 
              action: () => window.location.reload()
            },
           
           
          ],
          primaryButton: {
            text: 'Papers',
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
          }
        };

      default:
        return {
          title: 'Admin Dashboard',
          menuItems: [],
          primaryButton: { text: 'Menu', icon: null, action: () => {} }
        };
    }
  };

  const sidebarContent = getSidebarContent();
  const journalId = localStorage.getItem('journalId');
  const journalName = localStorage.getItem('selectedJournalTitle') || `Journal #${journalId}`;

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed left-4 top-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
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
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-300 to-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-200">
                <svg className="w-10 h-10 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-1 tracking-wide text-center">{sidebarContent.title}</h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          </div>

         

          {/* Dynamic Navigation Menu */}
          <div className="flex-1 overflow-y-auto w-full mb-4">
            <nav className="space-y-2">
              {sidebarContent.menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full text-left p-3 rounded-lg hover:bg-blue-700/50 transition-all duration-200 flex items-center gap-3 group"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={sidebarContent.primaryButton.action}
            className="relative group bg-gradient-to-r from-blue-500 to-blue-600 w-full h-12 rounded-2xl border-2 border-blue-400 text-xl font-bold hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 overflow-hidden mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
            
            <span className="relative z-10 flex items-center justify-center gap-2">
              {sidebarContent.primaryButton.icon}
              {sidebarContent.primaryButton.text}
            </span>
            
            <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
          </button>

          {/* Section Indicator */}
          <div className="mt-auto">
            
            
            {/* Decorative bottom accent */}
            <div className="flex justify-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${activeSection === 'dashboard' ? 'bg-blue-300' : 'bg-blue-300 opacity-30'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeSection === 'editorial' ? 'bg-blue-300' : 'bg-blue-300 opacity-30'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeSection === 'papers' ? 'bg-blue-300' : 'bg-blue-300 opacity-30'}`}></div>
            </div>
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
          {/* IMPORTANT: Outlet renders the nested route content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
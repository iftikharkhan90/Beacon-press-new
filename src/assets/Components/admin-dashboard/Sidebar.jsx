// src/assets/Components/admin-dashboard/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  // Detect active section based on route
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("editorial")) setActiveSection("editorial");
    else if (path.includes("assign-papers") || path.includes("papers"))
      setActiveSection("papers");
    else setActiveSection("dashboard");
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    {
      section: "dashboard",
      title: "Admin Dashboard",
      items: [
        { name: "All Journals", icon: "📚", action: () => navigate("/admin/dashboard") },
      ],
    },
    {
      section: "editorial",
      title: "Editorial Board",
      items: [
    { name: "All Members", icon: "🧑‍🤝‍🧑", action: () => {} },
      ],
    },
    {
      section: "papers",
      title: "Papers Management",
      items: [
        { name: "All Papers", icon: "📄", action: () => {} },
      ],
    },
  ];

  const currentMenu = menuItems.find((m) => m.section === activeSection);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed left-4 top-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? "✖️" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white p-6 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-2/3 md:w-64`}
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-300 to-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-200 mb-2">
            📘
          </div>
          <h1 className="text-xl font-bold text-center">{currentMenu?.title}</h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2">
          {currentMenu?.items.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full text-left p-3 rounded-lg hover:bg-blue-700/50 flex items-center gap-2"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // your existing sidebar

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

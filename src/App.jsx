//src/App.jsx
import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/Components/Navbar";
import SignupPage from "./assets/Components/Login/Signup";
import LoginPage from "./assets/Components/Login/Login";
import Home from "./assets/Components/home/home";
import JournalsPublicationsPage from "./assets/Journals/Journals";
import {
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Contactus from "./assets/Components/contact";
import { AuthProvider } from "./assets/Components/context/authContext";
import EditUser from "./assets/Components/Login/Update";
import Resetpassword from "./assets/Components/Login/Resetpassword";
import About from "./assets/Components/About";
import SubmissionDashboard from "./assets/Components/Submission/Submit";
import BeaconPressResources from "./assets/Components/Login/Resourses";
import AcademicJournalNav from "./assets/Journals/JournalNavbar";
import AdminLoginPage from "./assets/Components/Login/Admin-Login";
import Sidebar from "./assets/Components/admin-dashboard/Sidebar"
import EditorialSidebar from "./assets/Components/admin-dashboard/EditorialSidebar";



const App = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Admin/login" element={<AdminLoginPage />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/reset-password" element={<Resetpassword />} />
            <Route path="/journals" element={<AcademicJournalNav />} />
            <Route path="/journal" element={<JournalsPublicationsPage />} />
            <Route path="/submit" element={<SubmissionDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<BeaconPressResources />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/admin/dashboard" element={<Sidebar />}/>
            <Route path="/admin/dashboard/manage-editorial/:id" element={<EditorialSidebar />}>
            {/* <Route index element={<AdminDashboard />} /> */}
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;

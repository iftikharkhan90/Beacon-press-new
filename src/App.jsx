// src/App.jsx
import React from "react";
import { Navigate } from "react-router-dom"; 
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Protected";
import Navbar from "./assets/Components/Navbar";
import SignupPage from "./assets/Components/Login/Signup";
import LoginPage from "./assets/Components/Login/Login";
import Home from "./assets/Components/home/home";
import Contactus from "./assets/Components/contact";
import { AuthProvider } from "./assets/Components/context/authContext";
import EditUser from "./assets/Components/Login/Update";
import Resetpassword from "./assets/Components/Login/Resetpassword";
import About from "./assets/Components/About";
import SubmissionDashboard from "./assets/Components/Submission/Submit";
import BeaconPressResources from "./assets/Components/Login/Resourses";
import AcademicJournalNav from "./assets/Journals/JournalNavbar";
import AdminLoginPage from "./assets/Components/Login/Admin-Login";
import AimScope from "./assets/Journals/Aim&Scope";
import Author from "./assets/Journals/Author-Guide";
import Publications from "./assets/Journals/Publication-Ehics";
import Article from "./assets/Journals/Article-Charges";
import Copywrite from "./assets/Components/admin-dashboard/Copywrite";
import ReviewerGuide from "./assets/Journals/Reviewer-Guide";
import Journalhome from "./assets/Journals/Homej";
import SingleJournalPage from "./assets/Components/home/Singlejournal";
import Editorialmembers from "./assets/Journals/Editorial-Members";
import Sidebar from "./assets/Components/admin-dashboard/Sidebar";
import AdminDashBoard from "./assets/Components/admin-dashboard/AdminDashboard";
import Editorialboard from "./assets/Components/admin-dashboard/EditorialBoard";
import PaperDashboard from "./assets/Components/admin-dashboard/PaperDashboard";

const App = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <AuthProvider>
          <Navbar />
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Admin/login" element={<AdminLoginPage />} />
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/reset-password" element={<Resetpassword />} />
            <Route 
              path="/submit" 
              element={
                <ProtectedRoute>
                  <SubmissionDashboard/>
                </ProtectedRoute>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<BeaconPressResources />} />
            <Route path="/contact" element={<Contactus />} />

            {/* Admin Routes with Sidebar Layout */}
            <Route path="/admin" element={<Sidebar />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route path="dashboard/manage-editorial/:id" element={<Editorialboard />} />
              <Route path="dashboard/assign-papers/:id" element={<PaperDashboard/>} />
            </Route>

            {/* Journals Routes */}
            <Route path="/journals" element={<AcademicJournalNav />} />
            
            {/* Single Journal with Nested Routes */}
            <Route path="/journals/:id" element={<SingleJournalPage />}>
              <Route index element={<Navigate to="journalhome" replace />} />
              <Route path="journalhome" element={<Journalhome />} />
              <Route path="aims-scope" element={<AimScope />} />
              <Route path="editorialmembers" element={<Editorialmembers/>} />
              <Route path="author" element={<Author />} />
              <Route path="publication" element={<Publications />} />
              <Route path="article" element={<Article />} />
              <Route path="copywrite" element={<Copywrite />} />
              <Route path="reviewer" element={<ReviewerGuide />} />
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
//src/App.jsx
import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/Components/Navbar";
import SignupPage from "./assets/Components/Login/Signup";
import LoginPage from "./assets/Components/Login/Login";
import EditUser from "./assets/Components/Login/Update";
import Home from "./assets/Components/home/home";
import JournalsPublicationsPage from "./assets/Journals/Journals";
import Contactus from "./assets/Components/Contactus";
import About from "./assets/Components/About";
import BeaconPressResources from "./assets/Components/Login/Resourses";
import SubmissionDashboard from "./assets/Components/Submission/Submit";
import { AuthProvider } from "./assets/Components/context/authContext";
import Resetpassword from "./assets/Components/Login/Resetpassword";

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
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/reset-password" element={<Resetpassword />} />
            <Route path="/journals" element={<JournalsPublicationsPage />} />
            <Route path="/submit" element={<SubmissionDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<BeaconPressResources />} />
            <Route path="/contact" element={<Contactus />} />
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;

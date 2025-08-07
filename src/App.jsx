// src/App.jsx
import React from 'react';
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from './assets/Components/Navbar';
import SignupPage from './assets/Components/Login/Signup';
import LoginPage from './assets/Components/Login/Login';
import Home from './assets/Components/home/home';
import JournalsPublicationsPage from './assets/Journals/Journals';
import { Download, Search, Filter, Calendar, User, Eye, BookOpen, ChevronRight } from "lucide-react";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/journals" element={<JournalsPublicationsPage />} />
        {/*<Route path="/submit" element={<SubmitManuscript />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />*/}
      </Routes>
      </>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "./context/authContext";

// Route constants to avoid typos
const ROUTES = {
  HOME: "/",
  JOURNALS: "/journals",
  SUBMIT: "/submit",
  ABOUT: "/about",
  RESOURCES: "/resources",
  CONTACT: "/contact",
  LOGIN: "/login",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { id: "home", label: "Home", path: ROUTES.HOME },
    { id: "journals", label: "Journals", path: ROUTES.JOURNALS },
    { id: "submit", label: "Submit Manuscript", path: ROUTES.SUBMIT },
    { id: "about", label: "About Us", path: ROUTES.ABOUT },
    { id: "resources", label: "Resources", path: ROUTES.RESOURCES },
    { id: "contact", label: "Contact Us", path: ROUTES.CONTACT },
  ];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate(ROUTES.LOGIN);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="bg-slate-800 text-white py-3 sm:py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="logo flex-shrink-0 cursor-pointer">
            <h1
              onClick={() => navigate(ROUTES.HOME)}
              className="text-xl sm:text-2xl lg:text-3xl font-bold"
            >
              <span className="text-blue-500">Beacons</span> Press
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-grow ml-6 xl:ml-10">
            <ul className="flex gap-4 xl:gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `font-medium text-xs xl:text-sm uppercase transition-colors duration-300 whitespace-nowrap ${
                        isActive
                          ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                          : "text-white hover:text-blue-400"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex gap-2 xl:gap-3 items-center relative">
            {user ? (
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-full hover:bg-slate-600 transition text-sm xl:text-base"
                >
                  <FaUserCircle className="text-lg xl:text-2xl" />
                  <span className="font-semibold max-w-32 truncate">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                    <Link
                      to={`/edituser/${user._id}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaCog /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="bg-transparent text-blue-400 border-2 border-blue-400 px-4 py-2 rounded font-bold text-sm hover:bg-blue-400 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-white block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-medium text-sm sm:text-base uppercase transition-colors duration-300 py-2 px-2 rounded ${
                      isActive
                        ? "text-blue-400 bg-slate-700 border-l-4 border-blue-400"
                        : "text-white hover:text-blue-400 hover:bg-slate-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile User Menu */}
            {user && (
              <div className="flex flex-col gap-2 mt-4 px-2">
                <Link
                  to={`/edituser/${user._id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-slate-700 rounded hover:bg-slate-600 text-sm"
                >
                  <FaCog /> Settings
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 border border-red-400 rounded hover:bg-red-500 hover:text-white text-sm"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

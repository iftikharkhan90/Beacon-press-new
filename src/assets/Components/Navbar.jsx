import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "./context/authContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [decoded, setDecoded] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "journals", label: "Journals" },
    { id: "submit", label: "Submit Manuscript" },
    { id: "about", label: "About Us" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="bg-slate-800 text-white py-3 sm:py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Responsive sizing */}
          <div className="logo flex-shrink-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold cursor-pointer">
              <span className="text-blue-500 text-2xl sm:text-3xl lg:text-4xl"> Beacons </span> 
              <span className="xs:inline">Press</span>
            </h1>
          </div>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <nav className="hidden lg:flex flex-grow ml-6 xl:ml-10">
            <ul className="flex gap-4 xl:gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={`/${item.id}`}
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

          {/* Desktop Right Side - Hidden on mobile and tablet */}
          <div className="hidden lg:flex gap-2 xl:gap-3 items-center relative">
            {user ? (
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 xl:gap-2 bg-slate-700 px-2 xl:px-4 py-1.5 xl:py-2 rounded-full hover:bg-slate-600 transition text-sm xl:text-base"
                >
                  <FaUserCircle className="text-lg xl:text-2xl" />
                  <span className="font-semibold max-w-32 truncate">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg  z-10">
                    <Link
                      to={`/patch/${user?.id}`}
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
              <>
                <Link
                  to="/submit"
                  className="bg-blue-500 ml-1 xl:ml-2 text-white px-3 xl:px-5 py-1.5 xl:py-2 rounded font-bold text-xs xl:text-sm hover:bg-blue-600 transition-all duration-300 whitespace-nowrap"
                >
                  Submit
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent text-blue-400 border-2 border-blue-400 px-3 xl:px-5 py-1.5 xl:py-2 rounded font-bold text-xs xl:text-sm hover:bg-blue-400 hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Tablet Right Side - Visible only on medium screens */}
          <div className="hidden md:flex lg:hidden gap-2 items-center relative">
            {user ? (
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 bg-slate-700 px-2 py-1.5 rounded-full hover:bg-slate-600 transition text-sm"
                >
                  <FaUserCircle className="text-xl" />
                  <span className="font-semibold max-w-24 truncate text-xs">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-10">
                    <Link
                      to={`/edituser/${user?.id}`}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaCog className="text-sm" /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                    >
                      <FaSignOutAlt className="text-sm" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/submit"
                  className="bg-blue-500 text-white px-3 py-1.5 rounded font-bold text-xs hover:bg-blue-600 transition-all duration-300"
                >
                  Submit
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent text-blue-400 border-2 border-blue-400 px-3 py-1.5 rounded font-bold text-xs hover:bg-blue-400 hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Visible on mobile and tablet */}
          <button
            className="lg:hidden p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-1"
                    : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-1"
                    : "translate-y-0.5"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu - Responsive for both mobile and tablet */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-1 sm:gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-medium text-sm sm:text-base uppercase transition-colors duration-300 py-2 sm:py-3 px-2 rounded ${
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
            
            {/* Mobile Menu User Actions */}
            <div className="flex flex-col gap-2 sm:gap-3 mt-4 px-2">
              {user ? (
                <>
                  <Link
                    to={`/edituser/${user?.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 sm:py-3 text-white bg-slate-700 rounded hover:bg-slate-600 transition-colors text-sm sm:text-base"
                  >
                    <FaCog /> Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 sm:py-3 text-red-400 border border-red-400 rounded hover:bg-red-500 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/submit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-blue-500 text-white px-4 py-2.5 sm:py-3 rounded font-bold text-sm sm:text-base hover:bg-blue-600 transition-all duration-300 text-center"
                  >
                    Submit Manuscript
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-transparent text-blue-400 border-2 border-blue-400 px-4 py-2.5 sm:py-3 rounded font-bold text-sm sm:text-base hover:bg-blue-400 hover:text-white transition-all duration-300 text-center"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'journals', label: 'Journals' },
    { id: 'submit', label: 'Submit Manuscript' },
    { id: 'about', label: 'About Us' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-slate-800 text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="logo">
            <h1 className="text-3xl font-bold cursor-pointer">
              <spam className="text-blue-500 text-4xl">  Beacons </spam> Press
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-grow ml-10">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/${item.id}`}
                    className="text-white font-medium text-sm uppercase hover:text-blue-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            <Link
              to="/submit"
              className="bg-blue-500 text-white px-5 py-2 rounded font-bold text-sm hover:bg-blue-600 transition-all duration-300"
            >
              Submit Manuscript
            </Link>
            <Link
              to="/login"
              className="bg-transparent text-blue-400 border-2 border-blue-400 px-5 py-2 rounded font-bold text-sm hover:bg-blue-400 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white font-medium text-sm uppercase hover:text-blue-400 transition-colors duration-300 text-left py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-4">
              <Link
                to="/submit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-500 text-white px-5 py-2 rounded font-bold text-sm hover:bg-blue-600 transition-all duration-300"
              >
                Submit Manuscript
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-transparent text-blue-400 border-2 border-blue-400 px-5 py-2 rounded font-bold text-sm hover:bg-blue-400 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  Menu,
  X,
  Search,
  Target,
  Users,
  Send,
  FileText,
  Scale,
  CreditCard,
  Copyright,
  ClipboardCheck,
  UserPlus,
  LogIn,
  Calendar,
  Archive,
  TrendingUp,
  Newspaper,
  Edit,
  Microscope,
  PartyPopper,
} from "lucide-react";
import { href, Link } from "react-router-dom";

const AcademicJournalNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubContent, setOpenSubContent] = useState(null);

  const navItems = [
    { name: "Home", href: "" },
    {
      name: "About",
      href: "#about",
      dropdown: [
        { name: "Aims & Scope", href: "/journals/aims-scope", icon: Target },
        { name: "Editorial Board", href: "#editorial-team", icon: Users },
      ],
    },
    {
      name: "For Authors",
      href: "#authors",
      dropdown: [
        { name: "Submit Manuscript", href: "/journals/submit", icon: Send },
        { name: "Author Guidelines", href: "/journals/Author", icon: FileText },
        {
          name: "Publication Ethics",
          href: "/journals/publication",
          icon: Scale,
        },
        {
          name: "Article Processing Charges",
          href: "/journals/article",
          icon: CreditCard,
        },
        {
          name: "Copyright & Licensing",
          href: "/journals/copywrite",
          icon: Copyright,
        },
      ],
    },
    {
      name: "For Reviewers",
      href: "#reviewers",
      dropdown: [
        {
          name: "Reviewer Guidelines",
          href: "/journals/reviewer",
          icon: ClipboardCheck,
        },
        { name: "Become a Reviewer", href: "/edituser/:id", icon: UserPlus },
        { name: "Reviewer Login", href: "/login", icon: LogIn },
      ],
    },
    {
      name: "Browse",
      href: "#browse",
      dropdown: [
        { name: "Current Issue", href: "#current-issue", icon: Calendar },
        { name: "All Issues", href: "#all-issues", icon: Archive },
        { name: "Most Read", href: "#most-read", icon: TrendingUp },
        { name: "Most Cited", href: "#most-cited", icon: PartyPopper },
      ],
    },
    {
      name: "Special Issues",
      href: "#news",
      dropdown: [
        { name: "Special Issues", href: "#announcements", icon: Newspaper },
        { name: "Research Topics", href: "#call-papers", icon: Microscope },
        { name: "Propose a Research Topic", href: "#conference", icon: Edit },
      ],
    },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleSubContent = (name) => {
    setOpenSubContent(openSubContent === name ? null : name);
  };

  return (
    <div className="w-full">
      {/* Top Publisher Bar */}
      {/* <div className="bg-violet-800 text-white px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex gap-5 mt-2 sm:mt-0">
            <Link to="/journal" className="hover:opacity-80 transition-opacity">Our Journals</Link>
            <a href="#blog" className="hover:opacity-80 transition-opacity">Books</a>
            <a href="#books" className="hover:opacity-80 transition-opacity">Laboratory Manuals</a>
            <a href="#contact-us" className="hover:opacity-80 transition-opacity">Conference Proceedings</a>
            <a href="#blog" className="hover:opacity-80 transition-opacity">Monographs</a>
            <a href="#blog" className="hover:opacity-80 transition-opacity">Blog</a>
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            {/* <a href="#home" className="flex items-center py-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mr-3">
                <div className="text-white text-2xl font-bold">A</div>
              </div>
              <div className="text-xl font-bold text-slate-800">
                Journal of Advanced Research
              </div>
            </a> */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <a
                    href={item.href}
                    className="px-4 py-6 text-gray-700 font-medium hover:text-slate-800 hover:bg-gray-50 transition-colors inline-block"
                  >
                    {item.name}
                  </a>

                  {item.dropdown && (
                    <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t-4 border-slate-800">
                      {item.dropdown.map((dropItem, dropIndex) => {
                        const Icon = dropItem.icon;
                        return (
                          <Link
                            key={dropIndex}
                            to={dropItem.href}
                            className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-slate-800 hover:pl-6 transition-all border-b border-gray-100 last:border-b-0"
                          >
                            <dropItem.icon className="w-4 h-4 mr-3" />
                            {dropItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search and Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent w-64"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              {navItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 flex-1"
                    >
                      {item.name}
                    </a>
                    {item.dropdown && (
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="px-4 py-3 text-gray-700"
                      >
                        <span className="text-xl">
                          {openDropdown === index ? "−" : "+"}
                        </span>
                      </button>
                    )}
                  </div>

                  {item.dropdown && openDropdown === index && (
                    <div className="bg-gray-50">
                      {item.dropdown.map((dropItem, dropIndex) => {
                        const Icon = dropItem.icon;
                        return (
                          <a
                            key={dropIndex}
                            href={dropItem.href}
                            className="flex items-center px-8 py-3 text-gray-600 hover:text-slate-800 hover:bg-gray-100"
                          >
                            <Icon className="w-4 h-4 mr-3" />
                            {dropItem.name}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Search and Auth */}
              <div className="px-4 py-4 space-y-3 border-t border-gray-200 mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Demo Content */}
      {/* <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          Journal of Advanced Research
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This is a demonstration of a professional navigation bar for an
          academic journal website. The navigation is designed to be intuitive
          for researchers, authors, and reviewers, with clear pathways to
          important sections.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Hover over the menu items to see the dropdown options. The design is
          fully responsive and will adapt to different screen sizes. All links
          are functional and will navigate to their respective sections.
        </p>
      </div> */}

      <Outlet />
    </div>
  );
};

export default AcademicJournalNav;

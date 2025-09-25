import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaHome,
  FaBook,
  FaUpload,
  FaInfoCircle,
  FaTools,
  FaAddressBook,
  FaEnvelopeOpenText
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/home" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <FaHome className="text-blue-400" /> Home
                </Link>
              </li>
              <li>
                <Link to="/journals" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <FaBook className="text-purple-400" /> Journals
                </Link>
              </li>
              <li>
                <Link to="/submit" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <FaUpload className="text-green-400" /> Submit Manuscript
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <FaInfoCircle className="text-yellow-400" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/resources" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <FaTools className="text-pink-400" /> Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <FaAddressBook className="text-red-400" /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-red-400" /> info@beaconspress.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-green-400" /> +1-234-567-890
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-400" /> 123 Research Lane, Knowledge City, Science Nation
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-6">Follow Us</h3>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <FaLinkedin className="text-blue-600" /> LinkedIn
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <FaTwitter className="text-sky-400" /> Twitter
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <FaFacebook className="text-blue-700" /> Facebook
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Subscribe to Our Newsletter</h3>
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-amber-50 p-2 rounded border-none text-black"
                required
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 cursor-pointer text-white p-2 rounded hover:bg-blue-600 transition-colors"
              >
                <FaEnvelopeOpenText className="text-white" /> Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
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
              <li><Link to="/home" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/journals" className="hover:text-blue-400 transition-colors">Journals</Link></li>
              <li><Link to="/submit" className="hover:text-blue-400 transition-colors">Submit Manuscript</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <div className="space-y-2">
              <p>Email: info@beaconspress.com</p>
              <p>Phone: +1-234-567-890</p>
              <p>Address: 123 Research Lane, Knowledge City, Science Nation</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-6">Follow Us</h3>
            <div className="space-y-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-400">LinkedIn</a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-400">Twitter</a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-400">Facebook</a>
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
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

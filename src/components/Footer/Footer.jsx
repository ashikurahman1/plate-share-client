import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from 'react-icons/fa';
import logo from '../../assets/PlateShare-Logo.png';
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="px-4 grid container mx-auto grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <img src={logo} alt="PlateShare Logo" className="w-15" />
            <h1 className="text-2xl font-bold text-white">
              Plate<span className="text-primary">Share</span>
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Community Food Sharing Platform to reduce food waste and help
            others.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start">
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/foods" className="hover:text-white transition-colors">
                Available Foods
              </a>
            </li>
            <li>
              <a
                href="/add-food"
                className="hover:text-white transition-colors"
              >
                Add Food
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-white transition-colors">
                My Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Help & Support */}
        <div className="flex flex-col items-start">
          <h2 className="font-semibold mb-2">Help & Support</h2>
          <ul className="space-y-1 text-gray-400">
            <li>
              <a href="/faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div className="flex flex-col items-start">
          <h2 className="font-semibold mb-2">Stay Connected</h2>
          <p className="text-gray-400 mb-2 text-sm">
            Subscribe for updates & tips.
          </p>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-md border focus:outline-none"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/80 transition-colors cursor-pointer">
              <FaEnvelope />
            </button>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} PlateShare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/PlateShare-Logo.png';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 pt-20 pb-10 border-t border-base-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <img
                  src={logo}
                  alt="PlateShare Logo"
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                Plate<span className="text-primary">Share</span>
              </h1>
            </Link>
            <p className="text-base-content/70 leading-relaxed max-w-xs text-sm md:text-base">
              Bridging the gap between food waste and hunger. Join our community to share surplus food and make a difference.
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors border border-base-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors border border-base-300">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors border border-base-300">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors border border-base-300">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-base-content/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/available-foods" className="hover:text-primary transition-colors">Available Foods</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-base-content/70">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/donation" className="hover:text-primary transition-colors">Donation</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-base-content/70 mb-4 text-sm">Stay updated with our latest news and events.</p>
            <div className="join w-full">
              <input type="email" placeholder="email@example.com" className="input input-bordered join-item w-full focus:outline-none focus:border-primary border-base-300" />
              <button className="btn btn-primary join-item text-white">Join</button>
            </div>
          </div>
        </div>

        <div className="divider opacity-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-base-content/60 text-sm">
            © {new Date().getFullYear()} PlateShare. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-base-content/60">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

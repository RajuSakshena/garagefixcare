import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Facebook, Instagram, Youtube, MessageCircle, Mail } from 'lucide-react';
import garageIcon from '../images/logo44.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/book', label: 'Book Service', isButton: true },
    { path: '/pricing', label: 'Pricing' },
    { path: '/services', label: 'Our Services' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-sky-100 shadow-lg fixed top-0 left-0 w-full z-50">

      <div className="relative">

        {/* Top Header Bar (Social Icons) */}
        <div className="bg-slate-800 text-white py-1 px-4">
          <div className="max-w-7xl mx-auto flex justify-end items-center text-sm h-7">
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:text-orange-300"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="hover:text-orange-300"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-orange-300"><MessageCircle className="h-4 w-4" /></a>
              <a href="#" className="hover:text-orange-300"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-sky-100">
          <div className="flex justify-between items-center h-10 relative">

            {/* ✅ Logo + Contact Info Combined */}
            <div className="flex items-center space-x-3 sm:space-x-6">
              {/* Logo */}
              <Link to="/" className="z-20 -mt-8 flex-shrink-0">
                <div className="w-28 sm:w-32 h-16 sm:h-20 bg-sky-100 rounded-b-2xl shadow-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={garageIcon} 
                    alt="GARAGEFIX CARE Logo" 
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              </Link>

              {/* Contact Info - now inline beside logo */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm md:text-base leading-tight">
                <a href="tel:9318478483" className="flex items-center space-x-1 text-gray-800 font-semibold hover:text-red-600">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <span>93184-78483</span>
                </a>
                <a href="mailto:garagefixcare@gmail.com" className="flex items-center space-x-1 text-gray-800 font-semibold hover:text-red-600">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <span>garagefixcare@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8 ml-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    font-semibold text-sm transition-colors duration-200 px-2
                    ${link.isButton ? 
                        'bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 shadow-md' : 
                        'text-gray-900 hover:text-blue-800'}
                    ${isActive(link.path) && !link.isButton ? 'text-red-600 border-b-2 border-red-600' : ''}
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden justify-end items-center h-full"> 
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-800 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      block w-full text-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                      ${link.isButton ? 
                          'bg-orange-600 text-white hover:bg-orange-700' : 
                          'text-gray-700 hover:text-blue-800'}
                      ${isActive(link.path) && !link.isButton ? 'text-red-600' : ''}
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

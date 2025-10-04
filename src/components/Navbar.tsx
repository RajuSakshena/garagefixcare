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
    <nav className="bg-sky-100 shadow-lg sticky top-0 z-50">
      {/* Top Header Bar */}
      <div className="bg-slate-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
          {/* Left Side: Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <a
              href="tel:9318478483"
              className="flex items-center space-x-1 text-base hover:text-yellow-400"
            >
              <Phone className="h-4 w-4" />
              <span>93184-78483</span>
            </a>
            <a
              href="mailto:garagefixcare@gmail.com"
              className="flex items-center space-x-1 text-base hover:text-yellow-400"
            >
              <Mail className="h-4 w-4" />
              <span>garagefixcare@gmail.com</span>
            </a>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex items-center gap-4">
            <span className="font-semibold hidden sm:inline">Follow Us:</span>
            <a href="#" className="hover:text-orange-300">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-orange-300">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-orange-300">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-orange-300">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Logo and Menu */}
      <div className="relative bg-sky-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 h-auto md:h-20">
          {/* Logo */}
          <div className="flex justify-center md:justify-start w-full md:w-auto -mt-6 md:-mt-8">
            <Link to="/" className="inline-block">
              <div className="w-32 sm:w-40 h-20 sm:h-24 bg-sky-100 rounded-b-2xl shadow-md flex items-center justify-center overflow-hidden border border-gray-200">
                <img
                  src={garageIcon}
                  alt="GarageFix Care Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 mt-2 md:mt-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  font-semibold transition-colors duration-200
                  ${link.isButton
                    ? 'bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700'
                    : 'text-gray-900 hover:text-blue-800'}
                  ${isActive(link.path) && !link.isButton ? 'text-red-600' : ''}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-center w-full mt-3 mb-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-blue-800 p-2 border border-gray-300 rounded-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="px-2 pt-3 pb-4 space-y-2 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block w-full px-3 py-2 rounded-md font-medium transition-colors duration-200
                    ${link.isButton
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'text-gray-700 hover:text-blue-800'}
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
    </nav>
  );
};

export default Navbar;

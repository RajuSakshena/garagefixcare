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
      <div className="relative">

        {/* Top Header Bar */}
        <div className="bg-slate-800 text-white py-2 px-4"> {/* Increased py-1 to py-2 for vertical spacing */}
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 mb-2 sm:mb-0 sm:justify-start"> {/* Replaced space-x-4 mb-2 sm:mb-0 pl-56 with more flexible spacing classes */}
              <a href="tel:9318478483" className="flex items-center space-x-1 text-base hover:text-yellow-400"> {/* Adjusted text-lg to text-base for better fit */}
                <Phone className="h-4 w-4" /> {/* Adjusted icon size */}
                <span>93184-78483</span>
              </a>
              <a href="mailto:garagefixcare@gmail.com" className="flex items-center text-base space-x-1 hover:text-yellow-400"> {/* Adjusted text-lg to text-base for better fit */}
                <Mail className="h-4 w-4" /> {/* Adjusted icon size */}
                <span>garagefixcare@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold hidden sm:inline">Follow Us:</span>
              <a href="#" className="hover:text-orange-300"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-300"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-300"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-300"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        {/* Logo */}
        {/* Changed positioning to relative/non-absolute to allow other content to flow around it properly on desktop */}
        <div className="flex items-center max-w-7xl mx-auto pl-4 md:pl-0">
          <Link to="/" className="z-50 -mt-8 mb-2"> {/* Used -mt-8 to pull it up into the header bar space */}
            <div className="w-40 h-24 bg-sky-100 rounded-b-2xl shadow-lg flex items-center justify-center overflow-hidden"> {/* Added shadow-lg for prominence */}
              <img 
                src={garageIcon} 
                alt="GARAGEFIX CARE Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
          </Link>

          {/* Main Navbar - Moved content inside to better align with the logo on desktop */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 bg-sky-100">
            <div className="flex justify-end items-center h-16">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-10 lg:space-x-16"> {/* Reduced desktop space-x on md for better fit */}
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      font-semibold transition-colors duration-200 px-2
                      ${link.isButton ? 
                         'bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700' : 
                         'text-gray-900 hover:text-blue-800'
                      }
                      ${isActive(link.path) && !link.isButton ? 'text-red-600' : ''}
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-grey-700 hover:text-blue-800 p-2"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Moved outside the flex container to span full width */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 w-full"> {/* Added w-full */}
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
                       'text-gray-700 hover:text-blue-800'
                    }
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

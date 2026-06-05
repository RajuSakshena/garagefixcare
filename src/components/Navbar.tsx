import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import garageIcon from '../images/logo2.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const bikeLinks = [
    { path: '/best-bike-service-noida',     label: 'Best Bike Service in Noida' },
    { path: '/best-bike-service-delhi',     label: 'Best Bike Service in Delhi' },
    { path: '/best-bike-service-gurgaon',   label: 'Best Bike Service in Gurgaon' },
    { path: '/best-bike-service-ghaziabad', label: 'Best Bike Service in Ghaziabad' },
  ];

  const carLinks = [
    { path: '/best-car-service-noida',     label: 'Best Car Service in Noida' },
    { path: '/best-car-service-delhi',     label: 'Best Car Service in Delhi' },
    { path: '/best-car-service-gurgaon',   label: 'Best Car Service in Gurgaon' },
    { path: '/best-car-service-ghaziabad', label: 'Best Car Service in Ghaziabad' },
  ];

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 120);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">

      {/* ── Premium Top Strip ── */}
      {/* Mobile: ultra-thin decorative bar only. Desktop: full info strip */}
      <div
        style={{ backgroundColor: '#0b132b', height: '32px' }}
        className="w-full hidden lg:flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <p
            className="text-gray-300"
            style={{ fontSize: '11.5px', letterSpacing: '0.02em' }}
          >
            🚗 Bike &amp; Car Service in&nbsp;
            <span className="text-white font-semibold">Noida</span>
            <span className="text-gray-500 mx-1.5">•</span>
            <span className="text-white font-semibold">Delhi</span>
            <span className="text-gray-500 mx-1.5">•</span>
            <span className="text-white font-semibold">Gurgaon</span>
            <span className="text-gray-500 mx-1.5">•</span>
            <span className="text-white font-semibold">Ghaziabad</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-300" style={{ fontSize: '11.5px' }}>
              <span className="text-yellow-400 text-xs">⭐</span>
              <span>100,000+ Happy Customers</span>
            </span>
            <span className="text-gray-600 select-none">|</span>
            <span className="flex items-center gap-1 text-gray-300" style={{ fontSize: '11.5px' }}>
              <span className="text-yellow-400 text-xs">⭐</span>
              <span>Same-Day Service Available</span>
            </span>
          </div>
        </div>
      </div>
      {/* Mobile: 3px accent line only — no text, no height wasted */}
      <div className="lg:hidden w-full" style={{ backgroundColor: '#0b132b', height: '3px' }} />

      {/* ── Existing Navbar (UNCHANGED) ── */}
      <nav className="bg-sky-100 shadow-md w-full">

        {/* ── Single main navbar row ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-2">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 mr-2">
              <div className="w-20 h-12 bg-sky-100 rounded-b-xl shadow-sm flex items-center justify-center overflow-hidden">
                <img
                  src={garageIcon}
                  alt="GarageFixCare – Bike & Car Service"
                  className="w-20 h-12 object-cover rounded-b-xl"
                />
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5 w-full">

              {/* Nav links — left side */}
              <Link to="/"
                className={`px-2.5 py-1.5 text-sm font-semibold rounded whitespace-nowrap transition-colors duration-150
                  ${isActive('/') ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800 hover:text-blue-800'}`}>
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button
                  aria-haspopup="true"
                  aria-expanded={isServicesOpen}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-sm font-semibold rounded whitespace-nowrap transition-colors duration-150
                    ${[...bikeLinks, ...carLinks].some(l => isActive(l.path)) || isActive('/services')
                      ? 'text-red-600 border-b-2 border-red-600'
                      : 'text-gray-800 hover:text-blue-800'}`}
                >
                  Services
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-4 px-5 w-[420px] z-50 grid grid-cols-2 gap-x-6"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-2">🏍 Bike Services</p>
                      {bikeLinks.map(link => (
                        <Link key={link.path} to={link.path}
                          className={`block py-1.5 text-sm transition-colors duration-150
                            ${isActive(link.path) ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-blue-800'}`}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-2">🚗 Car Services</p>
                      {carLinks.map(link => (
                        <Link key={link.path} to={link.path}
                          className={`block py-1.5 text-sm transition-colors duration-150
                            ${isActive(link.path) ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-blue-800'}`}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                    <div className="col-span-2 mt-3 pt-3 border-t border-gray-100">
                      <Link to="/services" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                        View All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/pricing"
                className={`px-2.5 py-1.5 text-sm font-semibold rounded whitespace-nowrap transition-colors duration-150
                  ${isActive('/pricing') ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800 hover:text-blue-800'}`}>
                Pricing
              </Link>

              <Link to="/blog"
                className={`px-2.5 py-1.5 text-sm font-semibold rounded whitespace-nowrap transition-colors duration-150
                  ${isActive('/blog') ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800 hover:text-blue-800'}`}>
                Blog
              </Link>

              <Link to="/contact"
                className={`px-2.5 py-1.5 text-sm font-semibold rounded whitespace-nowrap transition-colors duration-150
                  ${isActive('/contact') ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800 hover:text-blue-800'}`}>
                Contact
              </Link>

              {/* Spacer pushes contact + CTA to right */}
              <div className="flex-1" />

              {/* Contact info inline */}
              <a href="tel:9540553759"
                className="flex items-center gap-1.5 px-2 text-sm font-bold text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap">
                <Phone className="h-4 w-4 text-orange-600 flex-shrink-0" />
                +91 954055-3759
              </a>

              <div className="w-px h-4 bg-gray-300 mx-1" />

              <a href="mailto:garagefixcare@gmail.com"
                className="flex items-center gap-1.5 px-2 text-sm font-bold text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap">
                <Mail className="h-4 w-4 text-orange-600 flex-shrink-0" />
                garagefixcare@gmail.com
              </a>

              {/* CTA */}
              <Link to="/book"
                className="ml-3 bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-700 shadow-md transition-colors duration-150 whitespace-nowrap flex-shrink-0">
                Book Service
              </Link>
            </div>

            {/* ── Mobile: contact pill + hamburger ── */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <a href="tel:9540553759"
                className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-red-600 transition-colors">
                <Phone className="h-3.5 w-3.5 text-orange-600" />
                <span>+91 954055-3759</span>
              </a>
              <span className="text-gray-300 select-none">|</span>
              <a href="mailto:garagefixcare@gmail.com"
                className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-red-600 transition-colors">
                <Mail className="h-3.5 w-3.5 text-orange-600" />
                <span>garagefixcare@gmail.com</span>
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-800 p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="px-4 py-3 space-y-1">

              <Link to="/" onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-red-600' : 'text-gray-700 hover:text-blue-800'}`}>
                Home
              </Link>

              {/* Mobile Services accordion */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileServicesOpen && (
                  <div className="mt-1 ml-3 border-l-2 border-orange-200 pl-3 space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 pt-1 pb-0.5">Bike Services</p>
                    {bikeLinks.map(link => (
                      <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}
                        className={`block py-1.5 text-sm transition-colors ${isActive(link.path) ? 'text-red-600 font-semibold' : 'text-gray-600 hover:text-blue-800'}`}>
                        {link.label}
                      </Link>
                    ))}
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 pt-2 pb-0.5">Car Services</p>
                    {carLinks.map(link => (
                      <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}
                        className={`block py-1.5 text-sm transition-colors ${isActive(link.path) ? 'text-red-600 font-semibold' : 'text-gray-600 hover:text-blue-800'}`}>
                        {link.label}
                      </Link>
                    ))}
                    <Link to="/services" onClick={() => setIsMenuOpen(false)}
                      className="block py-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700">
                      View All Services →
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/pricing" onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-red-600' : 'text-gray-700 hover:text-blue-800'}`}>
                Pricing
              </Link>

              <Link to="/blog" onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/blog') ? 'text-red-600' : 'text-gray-700 hover:text-blue-800'}`}>
                Blog
              </Link>

              <Link to="/contact" onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contact') ? 'text-red-600' : 'text-gray-700 hover:text-blue-800'}`}>
                Contact
              </Link>

              {/* Contact info in mobile menu */}
              <div className="border-t border-gray-100 pt-2 mt-1 space-y-1">
                <a href="tel:9540553759"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                  <Phone className="h-4 w-4 text-orange-600" />
                  +91 954055-3759
                </a>
                <a href="mailto:garagefixcare@gmail.com"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                  <Mail className="h-4 w-4 text-orange-600" />
                  garagefixcare@gmail.com
                </a>
              </div>

              <Link to="/book" onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center mt-2 bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-700 shadow-md transition-colors">
                Book Service
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

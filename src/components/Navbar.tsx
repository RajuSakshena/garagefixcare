import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import garageIcon from '../images/logo2.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">

      {/* ─────────────────────────────────────────────────────
          TOP STRIP
          Desktop: full info bar
          Mobile: visible dark strip with centered city text
      ───────────────────────────────────────────────────── */}

      {/* Desktop top strip — UNCHANGED */}
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

      {/* Mobile top strip — visible with centered city text */}
      <div
        className="lg:hidden w-full flex items-center justify-center"
        style={{ backgroundColor: '#0b132b', height: '30px' }}
      >
        <p
          className="text-gray-300 text-center tracking-wide"
          style={{ fontSize: '11px', letterSpacing: '0.03em' }}
        >
          🚗 Bike &amp; Car Service in&nbsp;
          <span className="text-white font-semibold">Noida</span>
          <span className="text-gray-500 mx-1">•</span>
          <span className="text-white font-semibold">Delhi</span>
          <span className="text-gray-500 mx-1">•</span>
          <span className="text-white font-semibold">Gurgaon</span>
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          MAIN NAVBAR
      ───────────────────────────────────────────────────── */}
      <nav className="bg-sky-100 shadow-md w-full">

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

            {/* ── Desktop Nav — EXACTLY UNCHANGED ── */}
            <div className="hidden lg:flex items-center gap-0.5 w-full">

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

              <div className="flex-1" />

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

              <Link to="/book"
                className="ml-3 bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-700 shadow-md transition-colors duration-150 whitespace-nowrap flex-shrink-0">
                Book Service
              </Link>
            </div>

            {/* ── Mobile: Logo left, Hamburger right only ── */}
            <div className="flex lg:hidden items-center ml-auto">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-800 p-2 rounded-lg transition-colors duration-150 active:bg-sky-200"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen
                  ? <X className="h-6 w-6" />
                  : <Menu className="h-6 w-6" />
                }
              </button>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────
            MOBILE DRAWER
            Smooth slide-down with CSS transition via max-height.
            All phone/email moved inside here.
        ───────────────────────────────────────────────────── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ overflowY: isMenuOpen ? 'auto' : 'hidden' }}
          aria-hidden={!isMenuOpen}
        >
          <div
            className="bg-white border-t border-gray-100 shadow-xl"
            style={{ borderTop: '3px solid #ea580c' }}
          >

            {/* Nav links */}
            <div className="px-5 pt-4 pb-2 space-y-0.5">

              <Link
                to="/"
                onClick={closeMenu}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
                  isActive('/')
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-800 hover:bg-sky-50 hover:text-blue-800 active:bg-sky-100'
                }`}
              >
                Home
                {isActive('/') && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
              </Link>

              {/* Services accordion */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
                    isMobileServicesOpen || [...bikeLinks, ...carLinks].some(l => isActive(l.path))
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-800 hover:bg-sky-50 hover:text-blue-800 active:bg-sky-100'
                  }`}
                  aria-expanded={isMobileServicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Services sub-panel */}
                <div
                  className={`overflow-hidden transition-all duration-250 ease-in-out ${
                    isMobileServicesOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mx-2 mb-1 mt-0.5 rounded-xl bg-gray-50 border border-gray-100 px-4 pt-3 pb-4">

                    {/* Bike Services */}
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 mb-2 flex items-center gap-1.5">
                      <span>🏍</span> Bike Services
                    </p>
                    <div className="space-y-0.5 mb-3">
                      {bikeLinks.map(link => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={closeMenu}
                          className={`block px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                            isActive(link.path)
                              ? 'bg-red-50 text-red-600 font-semibold'
                              : 'text-gray-700 hover:bg-white hover:text-blue-800 active:bg-sky-50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {/* Car Services */}
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 mb-2 flex items-center gap-1.5">
                      <span>🚗</span> Car Services
                    </p>
                    <div className="space-y-0.5 mb-3">
                      {carLinks.map(link => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={closeMenu}
                          className={`block px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                            isActive(link.path)
                              ? 'bg-red-50 text-red-600 font-semibold'
                              : 'text-gray-700 hover:bg-white hover:text-blue-800 active:bg-sky-50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to="/services"
                      onClick={closeMenu}
                      className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to="/pricing"
                onClick={closeMenu}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
                  isActive('/pricing')
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-800 hover:bg-sky-50 hover:text-blue-800 active:bg-sky-100'
                }`}
              >
                Pricing
                {isActive('/pricing') && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
              </Link>

              <Link
                to="/blog"
                onClick={closeMenu}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
                  isActive('/blog')
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-800 hover:bg-sky-50 hover:text-blue-800 active:bg-sky-100'
                }`}
              >
                Blog
                {isActive('/blog') && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
                  isActive('/contact')
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-800 hover:bg-sky-50 hover:text-blue-800 active:bg-sky-100'
                }`}
              >
                Contact
                {isActive('/contact') && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
              </Link>
            </div>

            {/* ── Contact Card ── */}
            <div className="px-5 pb-3">
              <div
                className="rounded-2xl px-5 py-4 flex flex-col gap-3"
                style={{
                  background: 'linear-gradient(135deg, #0b132b 0%, #1a2744 100%)',
                  boxShadow: '0 4px 16px rgba(11,19,43,0.18)',
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#f97316', letterSpacing: '0.1em' }}
                >
                  Reach Us
                </p>
                <a
                  href="tel:9540553759"
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="flex items-center justify-center rounded-lg h-9 w-9 flex-shrink-0 transition-colors duration-150 group-hover:bg-orange-500"
                    style={{ backgroundColor: 'rgba(249,115,22,0.18)' }}
                  >
                    <Phone className="h-4 w-4 text-orange-400" />
                  </span>
                  <span>
                    <span className="block text-[11px] text-gray-400 font-medium">Call us</span>
                    <span className="block text-white font-bold text-[15px] tracking-wide">+91 9540553759</span>
                  </span>
                </a>
                <div className="h-px bg-white/10" />
                <a
                  href="mailto:garagefixcare@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="flex items-center justify-center rounded-lg h-9 w-9 flex-shrink-0 transition-colors duration-150 group-hover:bg-orange-500"
                    style={{ backgroundColor: 'rgba(249,115,22,0.18)' }}
                  >
                    <Mail className="h-4 w-4 text-orange-400" />
                  </span>
                  <span>
                    <span className="block text-[11px] text-gray-400 font-medium">Email us</span>
                    <span className="block text-white font-bold text-[13px]">garagefixcare@gmail.com</span>
                  </span>
                </a>
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="px-5 pb-6">
              <Link
                to="/book"
                onClick={closeMenu}
                className="block w-full text-center bg-orange-600 text-white font-bold text-[15px] py-4 rounded-2xl shadow-lg hover:bg-orange-700 active:bg-orange-800 transition-colors duration-150 tracking-wide"
                style={{ letterSpacing: '0.02em' }}
              >
                🔧 Book Service Now
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Car as CarIcon, 
  Bike,
  Settings, 
  Wrench, 
  Droplet, 
  Thermometer, 
  ShieldCheck, 
  Battery, 
  ShowerHead, 
  Hammer, 
  CheckCircle, 
  Star, 
  Calendar, 
  Users, 
  Home as HomeIcon, 
  CreditCard, 
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import SEOHelmet from '../components/SEOHelmet';

// Hero slider images (exact imports from Home.tsx)
import heroImage from "../images/mechanic.jpg";
import fortunerImage from "../images/fortuner.png";
import bigGarageCar from "../images/big_garage_car.png";
import bigGarageBike from "../images/big_garage_bike.png";

// NEW MEDIA GALLERY IMAGES
import img1 from '../images/New1 (1).jpg';
import img2 from '../images/New1 (2).jpg';
import img3 from '../images/New1 (3).jpg';
import img4 from '../images/New1 (4).jpg';
import img5 from '../images/New1 (5).jpg';
import img6 from '../images/New1 (6).jpg';
import img7 from '../images/New1 (8).jpg';

const Car = () => {
  // Navigation hook for SPA routing
  const navigate = useNavigate();

  // ==============================================
  // EXACT HERO STATES, EFFECTS & SETTINGS FROM Home.tsx
  // ==============================================
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [showInput, setShowInput] = useState(false);
  const [modalPhoneNumber, setModalPhoneNumber] = useState('');
  const heroSliderRef = useRef<any>(null);

  // Counter animations (exact copy from Home.tsx)
  useEffect(() => {
    const targetCount = 100000;
    const duration = 2000;
    const increment = Math.ceil(targetCount / (duration / 10));

    if (happyCustomersCount < targetCount) {
      const timer = setInterval(() => {
        setHappyCustomersCount(prevCount => {
          const newCount = prevCount + increment;
          if (newCount >= targetCount) {
            clearInterval(timer);
            return targetCount;
          }
          return newCount;
        });
      }, 10);
      return () => clearInterval(timer);
    }
  }, [happyCustomersCount]);

  useEffect(() => {
    const targetScore = 4.7;
    const duration = 1000;
    const interval = 10;
    const increments = (targetScore - reviewScore) / (duration / interval);

    let currentScore = reviewScore;

    const timer = setInterval(() => {
      currentScore += increments;
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(timer);
      }
      setReviewScore(parseFloat(currentScore.toFixed(1)));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Hero slider settings (exact copy)
  const heroSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    fade: true,
    arrows: false
  };

  // NEW: MEDIA GALLERY (react-image-gallery format - ready for future video support)
  const galleryImages = [
    { original: img1, thumbnail: img1 },
    { original: img2, thumbnail: img2 },
    { original: img3, thumbnail: img3 },
    { original: img4, thumbnail: img4 },
    { original: img5, thumbnail: img5 },
    { original: img6, thumbnail: img6 },
    { original: img7, thumbnail: img7 },
  ];

  // Exact same service cities marquee data as Home.tsx
  const serviceCities = [
    { name: "Delhi", color: "text-slate-700" },
    { name: "Noida", color: "text-red-700" },
    { name: "Greater Noida", color: "text-teal-700" },
    { name: "Gurugram", color: "text-indigo-700" },
    { name: "Ghaziabad", color: "text-gray-900" },
    { name: "Faridabad", color: "text-orange-700" },
    { name: "Greater Noida", color: "text-slate-800" },
  ];

  return (
    <>
      <SEOHelmet
        title="GarageFixCare - Professional Car Service At Your Doorstep"
        description="Expert car repair, servicing &amp; maintenance at your doorstep. Certified mechanics, genuine parts, AC service, brakes, engine repair &amp; more in Delhi NCR."
      />

      <div className="min-h-screen">
        {/* ==============================================
            FULL HERO SECTION - EXACT COPY FROM Home.tsx
            (Vehicle selection updated for Car page)
            ============================================== */}
        <main className="bg-slate-800 pt-[76px] sm:pt-[112px] lg:pt-[120px]">

          <section className="text-white py-8 sm:py-10 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                {/* Left Side: Main Text and Input */}
                <div>
                  <h1 className="text-brandRed text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                    Professional Bikes &amp; Cars Service
                    <span className="text-orange-500"> At Your Doorstep</span>
                  </h1>

                  <p className="font-poppins text-sm sm:text-base leading-relaxed text-white/90 mb-6 sm:mb-8">
                    Enjoy professional bike care right at your doorstep.
                    Our expert mechanics come to you with the right tools and parts, saving you time while keeping your bike in top condition—no workshop visit needed.
                  </p>

                  {/* Book + Call Buttons Row - FULLY STACKED ON MOBILE */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                    {!showInput ? (
                      <>
                        <button
                          onClick={() => setShowInput(true)}
                          className="w-full sm:w-auto bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-orange-700 transition-all duration-300 active:scale-95"
                        >
                          Book Service Now
                        </button>

                        {/* Call Button - FULL WIDTH ON MOBILE */}
                        <a
                          href="tel:9540553759"
                          className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Call Now
                        </a>
                      </>
                    ) : (
                      <div
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-all duration-500 ease-in-out w-full ${showInput ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                      >
                        <input
                          type="tel"
                          maxLength={10}
                          value={modalPhoneNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 10) setModalPhoneNumber(val);
                          }}
                          placeholder="Enter 10-digit mobile number"
                          className="w-full sm:w-auto px-5 py-4 rounded-2xl text-black text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                          onClick={async () => {
                            if (!modalPhoneNumber || modalPhoneNumber.length !== 10) {
                              alert('Please enter a valid 10-digit phone number.');
                              return;
                            }
                            try {
                              await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
                                phoneNumber: modalPhoneNumber,
                                serviceType: "Doorstep Bike Service",
                              });
                              alert('✅ Booking received! Our team will contact you shortly.');
                              setModalPhoneNumber('');
                              setShowInput(false);
                            } catch (err) {
                              console.error('Booking failed:', err);
                              alert('❌ Booking failed. Please try again.');
                            }
                          }}
                          className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-green-700 transition-colors duration-200"
                        >
                          Confirm Booking
                        </button>
                        <button
                          onClick={() => setShowInput(false)}
                          className="text-gray-300 text-sm hover:text-white transition-colors duration-200 px-4 py-2"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* === Select Your Vehicle Tile Section (UPDATED FOR CAR PAGE) === */}
                  <div className="mt-8 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 text-center tracking-tight">Select Your Vehicle</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Bike & Scooty - INACTIVE + Navigate to Home */}
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 hover:border-slate-400 text-white py-4 sm:py-5 rounded-2xl font-semibold text-base transition-all duration-300 active:scale-95 touch-manipulation"
                      >
                        <Bike className="h-6 w-6" />
                        <span>Bike &amp; Scooty</span>
                      </button>

                      {/* Cars - ACTIVE (orange) by default on Car page */}
                      <button
                        className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-4 sm:py-5 rounded-2xl font-semibold text-base transition-all duration-300 shadow-inner active:scale-95 touch-manipulation"
                      >
                        <CarIcon className="h-6 w-6" />
                        <span>Cars</span>
                      </button>
                    </div>
                  </div>
                  {/* === END VEHICLE SECTION === */}

                </div>

                {/* Right Side: Image + Reviews - MOBILE OPTIMIZED */}
                <div className="relative flex flex-col items-center lg:items-end gap-6 mt-8 lg:mt-0">
                  <div className="relative w-full">
                    <Slider ref={heroSliderRef} {...heroSliderSettings} className="w-full">
                      <div>
                        <img 
                          src={heroImage} 
                          alt="Mechanic working" 
                          className="rounded-2xl shadow-2xl w-full aspect-video object-cover max-h-[260px] sm:max-h-[340px] lg:max-h-none" 
                        />
                      </div>
                      <div>
                        <img 
                          src={fortunerImage} 
                          alt="Fortuner repair" 
                          className="rounded-2xl shadow-2xl w-full aspect-video object-cover max-h-[260px] sm:max-h-[340px] lg:max-h-none" 
                        />
                      </div>
                      <div>
                        <img 
                          src={bigGarageCar} 
                          alt="Car garage" 
                          className="rounded-2xl shadow-2xl w-full aspect-video object-cover max-h-[260px] sm:max-h-[340px] lg:max-h-none" 
                        />
                      </div>
                      <div>
                        <img 
                          src={bigGarageBike} 
                          alt="Bike garage" 
                          className="rounded-2xl shadow-2xl w-full aspect-video object-cover max-h-[260px] sm:max-h-[340px] lg:max-h-none" 
                        />
                      </div>
                    </Slider>

                    {/* Custom Left Arrow Button - SMALLER ON MOBILE */}
                    <button
                      onClick={() => heroSliderRef.current?.slickPrev()}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 sm:p-3 rounded-2xl shadow-lg transition-all duration-200 z-20 flex items-center justify-center"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>

                    {/* Custom Right Arrow Button - SMALLER ON MOBILE */}
                    <button
                      onClick={() => heroSliderRef.current?.slickNext()}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 sm:p-3 rounded-2xl shadow-lg transition-all duration-200 z-20 flex items-center justify-center"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>

                  {/* Review cards - STACKED ON MOBILE */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <div className="bg-sky-100 text-black p-4 rounded-2xl shadow-lg flex-1 w-full sm:w-auto">
                      <div className="flex items-center justify-center gap-2 text-lg font-bold">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {reviewScore.toFixed(1)}/5
                      </div>
                      <div className="text-xs font-semibold text-center">Google Review</div>
                    </div>
                    <div className="bg-sky-100 text-black p-4 rounded-2xl shadow-lg flex-1 w-full sm:w-auto">
                      <div className="text-lg font-bold text-center">
                        {happyCustomersCount.toLocaleString()}+
                      </div>
                      <div className="text-xs font-semibold text-center">Happy Customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* === SERVICE AVAILABLE MARQUEE (Exact copy + MOBILE OPTIMIZED) === */}
        <div className="bg-sky-100 border-y border-gray-200 py-3 overflow-hidden">
          <div className="flex items-center text-sm sm:text-sm font-semibold max-w-7xl mx-auto px-4">
            <div className="flex-shrink-0 pr-4">
              <span className="text-red-600 mr-1 font-bold">Service Available </span>
              <span className="text-brandRed font-bold">(10% off)</span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center animate-marquee">
                {[...Array(3)].map((_, repetitionIndex) => (
                  serviceCities.map((city, index) => (
                    <span 
                      key={`${repetitionIndex}-${index}`}
                      className={`ml-3 sm:ml-6 md:ml-8 tracking-wider flex-shrink-0 font-bold text-xs sm:text-sm ${city.color}`}
                    >
                      {city.name}
                    </span>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 1. SERVICES SECTION - bg-slate-900 - MOBILE FIRST GRID */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Expert <span className="text-red-600">Car Services</span>
              </h2>
              <p className="text-white/70 mt-3 text-base sm:text-lg">Premium care. Delivered to your doorstep.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Settings className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">General Service</h3>
                <p className="text-black text-sm leading-relaxed">Full routine maintenance including oil, filters, and 30-point inspection.</p>
              </div>

              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Wrench className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Engine Repair</h3>
                <p className="text-black text-sm leading-relaxed">Expert diagnosis and repair of engine problems, from minor to major.</p>
              </div>

              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Droplet className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Oil Change</h3>
                <p className="text-black text-sm leading-relaxed">Premium synthetic oil + filter replacement for smooth performance.</p>
              </div>

              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Thermometer className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AC Service</h3>
                <p className="text-black text-sm leading-relaxed">Gas refill, deep cleaning, and full AC performance restoration.</p>
              </div>

              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Brake Service</h3>
                <p className="text-black text-sm leading-relaxed">Brake pads, discs, fluid, and complete safety inspection.</p>
              </div>

              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Battery className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Battery Replacement</h3>
                <p className="text-black text-sm leading-relaxed">Instant testing and replacement with warranty-backed batteries.</p>
              </div>

              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <ShowerHead className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Car Wash</h3>
                <p className="text-black text-sm leading-relaxed">Premium exterior + interior detailing and deep cleaning.</p>
              </div>

              <div className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Hammer className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Denting &amp; Painting</h3>
                <p className="text-black text-sm leading-relaxed">Professional body repair and factory-finish painting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SERVICE CHECKLIST SECTION - bg-slate-800 + react-image-gallery */}
        <section className="py-12 sm:py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  What’s Included in Every Service
                </h2>
                <p className="text-slate-100 text-base sm:text-lg">Our certified technicians follow a strict 40-point checklist so your car performs at its best.</p>

                <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-white">Engine oil &amp; filter inspection</p>
                      <p className="text-sm text-slate-300">Level check + top-up/replacement using premium oil</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-white">Brake system inspection</p>
                      <p className="text-sm text-slate-300">Pads, discs, fluid level &amp; emergency brake test</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-white">Battery health &amp; charging test</p>
                      <p className="text-sm text-slate-300">Voltage, terminals &amp; alternator performance</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-white">AC cooling performance</p>
                      <p className="text-sm text-slate-300">Gas level, compressor &amp; cabin filter check</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-white">Tyre condition &amp; pressure</p>
                      <p className="text-sm text-slate-300">Tread depth, alignment &amp; spare tyre</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-white">All fluid levels &amp; top-up</p>
                      <p className="text-sm text-slate-300">Coolant, brake, power steering &amp; transmission</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC MEDIA GALLERY - react-image-gallery */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <ImageGallery
                    items={galleryImages}
                    showPlayButton={true}
                    showFullscreenButton={true}
                    showNav={true}
                    autoPlay={true}
                    slideInterval={2500}
                    showThumbnails={true}
                    thumbnailPosition="bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRICING PREVIEW SECTION - bg-slate-900 */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Simple &amp; Transparent <span className="text-red-600">Pricing</span>
              </h2>
              <p className="text-white/70 mt-3">No hidden charges. Ever.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <div className="bg-sky-100 text-black border border-transparent rounded-3xl p-6 sm:p-8 hover:border-sky-200 transition-all">
                <div className="uppercase text-xs tracking-widest font-semibold mb-4 text-orange-400">Basic</div>
                <div className="text-5xl font-bold mb-1">₹1,499</div>
                <p className="text-slate-600 text-sm">Ideal for quick maintenance</p>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />30-point inspection</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Oil top-up</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Tyre pressure check</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Brake visual check</li>
                </ul>
                <button className="mt-10 w-full py-4 border border-slate-300 hover:bg-slate-100 rounded-2xl text-black font-semibold transition-colors">
                  Choose Basic
                </button>
              </div>

              <div className="bg-sky-100 text-black rounded-3xl p-6 sm:p-8 shadow-2xl relative -mt-2 md:-mt-0 scale-105 ring-2 ring-orange-400">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-8 py-1.5 rounded-3xl">MOST POPULAR</div>
                <div className="uppercase text-xs tracking-widest font-semibold mb-4 text-orange-600">Standard</div>
                <div className="text-5xl font-bold text-black mb-1">₹2,999</div>
                <p className="text-slate-600 text-sm">Complete routine service</p>
                <ul className="mt-8 space-y-4 text-black text-sm">
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Everything in Basic</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Full engine tune-up</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />AC gas refill</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Battery health test</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />40-point checklist</li>
                </ul>
                <button className="mt-10 w-full py-4 bg-orange-600 text-white rounded-2xl font-semibold hover:bg-orange-700 transition-colors">
                  Choose Standard
                </button>
              </div>

              <div className="bg-sky-100 text-black border border-transparent rounded-3xl p-6 sm:p-8 hover:border-sky-200 transition-all">
                <div className="uppercase text-xs tracking-widest font-semibold mb-4 text-orange-400">Premium</div>
                <div className="text-5xl font-bold mb-1">₹4,999</div>
                <p className="text-slate-600 text-sm">Full car rejuvenation</p>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Everything in Standard</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Deep engine service</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Interior detailing</li>
                  <li className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />Denting touch-up</li>
                </ul>
                <button className="mt-10 w-full py-4 border border-slate-300 hover:bg-slate-100 rounded-2xl text-black font-semibold transition-colors">
                  Choose Premium
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROCESS SECTION - bg-slate-800 */}
        <section className="py-12 sm:py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">How GarageFixCare Works</h2>
              <p className="text-slate-100 mt-3">4 simple steps to doorstep car care</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Calendar className="h-9 w-9" />
                </div>
                <div className="font-mono text-3xl font-bold text-orange-500 mb-3">01</div>
                <h4 className="font-semibold text-xl mb-2 text-white">Book Service</h4>
                <p className="text-slate-100 text-sm sm:text-base">Choose your service and preferred time slot in seconds.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Users className="h-9 w-9" />
                </div>
                <div className="font-mono text-3xl font-bold text-orange-500 mb-3">02</div>
                <h4 className="font-semibold text-xl mb-2 text-white">Technician Assigned</h4>
                <p className="text-slate-100 text-sm sm:text-base">We match the best expert for your car model instantly.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <HomeIcon className="h-9 w-9" />
                </div>
                <div className="font-mono text-3xl font-bold text-orange-500 mb-3">03</div>
                <h4 className="font-semibold text-xl mb-2 text-white">Doorstep Service</h4>
                <p className="text-slate-100 text-sm sm:text-base">Mechanic arrives at your location with all tools &amp; parts.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <CreditCard className="h-9 w-9" />
                </div>
                <div className="font-mono text-3xl font-bold text-orange-500 mb-3">04</div>
                <h4 className="font-semibold text-xl mb-2 text-white">Pay &amp; Rate</h4>
                <p className="text-slate-100 text-sm sm:text-base">Pay only after satisfaction. Leave feedback for us.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIAL SECTION - bg-slate-900 */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Real Owners. Real Stories.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-sky-100 text-black rounded-3xl p-6 sm:p-8">
                <div className="flex text-orange-400 mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-black italic mb-8 leading-relaxed text-sm sm:text-base">
                  “My Fortuner’s engine issue was fixed at my society gate in just 90 minutes. Transparent, professional, and genuine parts used!”
                </p>
                <div className="flex items-center gap-x-4">
                  <div className="h-10 w-10 bg-slate-200 rounded-2xl"></div>
                  <div>
                    <p className="font-semibold text-black">Vikram Singh</p>
                    <p className="text-xs text-slate-600">Toyota Fortuner • Greater Noida</p>
                  </div>
                </div>
              </div>

              <div className="bg-sky-100 text-black rounded-3xl p-6 sm:p-8">
                <div className="flex text-orange-400 mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-black italic mb-8 leading-relaxed text-sm sm:text-base">
                  “AC service was done perfectly at my home. The mechanic even showed me before/after videos. Best decision ever!”
                </p>
                <div className="flex items-center gap-x-4">
                  <div className="h-10 w-10 bg-slate-200 rounded-2xl"></div>
                  <div>
                    <p className="font-semibold text-black">Neha Kapoor</p>
                    <p className="text-xs text-slate-600">Honda City • Gurugram</p>
                  </div>
                </div>
              </div>

              <div className="bg-sky-100 text-black rounded-3xl p-6 sm:p-8">
                <div className="flex text-orange-400 mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-black italic mb-8 leading-relaxed text-sm sm:text-base">
                  “Brake service + oil change done in 45 mins. Saved me a full day at the workshop. Highly recommended!”
                </p>
                <div className="flex items-center gap-x-4">
                  <div className="h-10 w-10 bg-slate-200 rounded-2xl"></div>
                  <div>
                    <p className="font-semibold text-black">Arjun Mehra</p>
                    <p className="text-xs text-slate-600">Mahindra Scorpio • Delhi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION - MOBILE OPTIMIZED */}
        <section className="py-12 sm:py-16 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-[-0.5px]">
              Book Your Car Service Today
            </h2>
            <p className="max-w-md mx-auto text-lg sm:text-xl mb-10 opacity-90">
              Professional care at your doorstep. Certified experts. 100% satisfaction guaranteed.
            </p>
            <a
              href="tel:9540553759"
              className="w-full sm:w-auto mx-auto inline-flex items-center justify-center px-8 sm:px-12 py-5 sm:py-6 bg-white text-orange-600 hover:bg-amber-100 rounded-3xl font-semibold text-xl sm:text-2xl transition-all shadow-2xl"
            >
              Get Started in 30 Seconds
            </a>
          </div>
        </section>
      </div>

      {/* Floating Buttons - SMALLER ON MOBILE */}
      <div className="fixed top-1/2 right-4 sm:right-6 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
        <a
          href="tel:9540553759"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
          aria-label="Call Us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </a>
        <a
          href="https://wa.me/9540553759"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={24} className="sm:text-3xl" />
        </a>
      </div>
    </>
  );
};

export default Car;

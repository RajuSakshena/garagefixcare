// Home.tsx (FULL UPDATED CODE - navigation added for Cars button using useNavigate)
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X ,Plus, Phone as PhoneIcon, ChevronLeft, ChevronRight, Bike, Car } from 'lucide-react'; // Added PhoneIcon
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios'; // <-- NEW: Import for API calls

// react-slick removed — using custom carousel instead
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";


//last section 
// Import your local images
import bikeServiceOfferImage from '../images/offer11.jpg';
import doorstepImage from '../images/offer22.jpg';
import engineImage from '../images/offer33.jpg';
import roadsideImage from '../images/offer44.jpg';
import googleReviewsImage from '../images/google1.png';
import facebookReviewsImage from '../images/facebook1.png';
import justdialReviewsImage from '../images/justdial1.png';
import mechanicImage from '../images/image.jpg';
import routineService from "../images/Routine Service.png";
import bikeInsurance from "../images/Bike Insurance.png";
import doorstepService from "../images/Doorstep Service.png";
import wheelCare from "../images/Wheel Care.png";
import bikeBatteries from "../images/Bike Battery.png";
import engineRepair from "../images/Engine Repair.png";
import warrantyImg from "../images/warranty.webp";
import pickupImg from "../images/free pickup.webp";
import transparentImg from "../images/transparent.webp";
import trainedImg from "../images/trainie.webp";
import handshakeImg from "../images/handshake.jpg";
import wurthImg from "../images/WURTH.png";
import motulImg from "../images/Motul.jpeg";
import turtlemintImg from "../images/Turtlemint.png";
import buniyadImg from "../images/Buniyad.png";
import dunzoImg from "../images/Dunzo.png";
import howWorksImage from "../images/How-works.jpg";
import delhiImg from "../images/Delhi.jpeg";
import noidaImg from "../images/Noida.jpg";
import greaterNoidaImg from "../images/Greater-Noida.jpg";
import gurugramImg from "../images/Gurugram.jpeg";
import faridabadImg from "../images/Faridabad.jpeg";
import ghaziabadImg from "../images/Ghaziabad.jpeg";
import googleIcon from "../images/Testimonial1.png";
import testimonial1 from "../images/Testimonial1.jpeg";
import testimonial2 from "../images/Testimonial2.jpeg";
import testimonial3 from "../images/Testimonial3.jpeg";
import testimonial4 from "../images/Testimonial4.jpeg";
import maintainGearboxImg from "../images/Maintain-Gearbox1.webp";
import fourValveEngineImg from "../images/Four-valves.webp";
import driveBeltScootyImg from "../images/Drive-belt.webp";
import heroImage from "../images/mechanic.jpg";
import fortunerImage from "../images/fortuner.png";
import bigGarageCar from "../images/big_garage_car.png";
import bigGarageBike from "../images/big_garage_bike.png";

// Interface for clean type-checking (required for the new logic)
interface Service {
  title: string;
  subtitle: string;
  checklist: string[];
}

const Home = () => {
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // NEW Modal State for API booking
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState(''); // State for phone input in modal

  const [selectedVehicle, setSelectedVehicle] = useState('Bike');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Custom hero carousel — no react-slick
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [heroImage, fortunerImage, bigGarageCar, bigGarageBike];
  const heroAlts = [
    "Bike mechanic at customer doorstep in Noida",
    "Car repair service at home",
    "Professional car service garage",
    "Doorstep bike service in Noida"
  ];
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 2500);
    return () => clearInterval(t);
  }, []);

  // Marquee deals images (continuous scroll, no index needed)
  const carouselImages = [
    { src: bikeServiceOfferImage, alt: "Bike service offer in Noida" },
    { src: doorstepImage,         alt: "Doorstep bike service Noida" },
    { src: engineImage,           alt: "Bike engine repair at home Noida" },
    { src: roadsideImage,         alt: "Roadside bike assistance near Noida" },
  ];

  // NEW: useNavigate hook for SPA navigation to Car page
  const navigate = useNavigate();

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


  const servicePrices = [
    {
      title: "At-Home Regular Service",
      subtitle: "100 CC, 110 CC, 125 CC.",
      originalPrice: "Rs. 599",
      discountedPrice: "Rs. 299",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Classic Service",
      subtitle: "135 CC, 160 CC, 200 CC.",
      originalPrice: "Rs. 799",
      discountedPrice: "Rs. 399",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Premium Service",
      subtitle: "220 CC, 250 CC, 300 CC.",
      originalPrice: "Rs. 1,199",
      discountedPrice: "Rs. 499",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Royal Service",
      subtitle: "350 CC, 400 CC, 450 CC.",
      originalPrice: "Rs. 1,599",
      discountedPrice: "Rs. 599",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Sports Service",
      subtitle: "Above 500, 600 CC, 650 CC.",
      originalPrice: "Rs. 2,199",
      discountedPrice: "Rs. 999",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    }
  ];

  const checklistItems = [
    "Coolant check-up",
    "Basic Hand Cleaning",
    "Oiling and greasing",
    "Battery General check-up",
    "Basic Engine Inspection",
    "Basic Fork Inspection",
    "Carburettor Basic check-up",
    "Minor Electrical check-up",
    "Brakes – Front & Rear Adjust",
    "Driven Chain Basic Cleaning",
    "Tightening of Screws Bolts & Nuts",
    "Average and Performance check-up",
    "Engine Oil Change (Price Extra)",
    "Oil Filter Clean (If Replace Charges)",
    "Air Filter Clean (If Replace Charges)",
    "Spark Plug Clean (If Replace Charges)",
    "Tyre Air Fill (only tubeless)",
    "Free Pick and Drop (if needed)"
  ];

  const bikeBrands = [
    "Hero",
    "Honda",
    "TVS",
    "Bajaj",
    "Suzuki",
    "Yamaha",
    "Kawasaki",
    "Royal Enfield",
    "KTM",
    "BMW",
    "Harley Davidson",
    "Ducati",
    "Triumph",
    "Indian",
    "Vespa",
    "Benelli",
    "Aprilia",
    "Yezdi",
    "Husqvarna",
    "Other"
  ];

  const scootyBrands = [
    "Honda",
    "TVS",
    "Hero",
    "Suzuki",
    "Yamaha",
    "Ather",
    "Ola Electric",
    "Bajaj",
    "Vespa",
    "Aprilia",
    "Other"
  ];

  // --- UPDATED HANDLERS ---
  
  // 1. Function to open the modal (Now uses selectedService state)
  const handleSeeChecklist = (title: string, subtitle: string) => {
    // OLD: setModalServiceTitle(title); setModalServiceSubtitle(subtitle);
    
    // NEW: Combine service details with the full checklist and save it
    setSelectedService({ title, subtitle, checklist: checklistItems }); 
    setModalPhoneNumber(''); // Clear phone number whenever a new modal opens
    setIsModalOpen(true); // OLD: setIsModalOpen(true);
  };

  // 2. Function to close the modal (remains mostly the same, clears new state too)
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setModalPhoneNumber('');
  };

  // 3. NEW: Function to handle the final submission (Called by the modal's "Book Now" button)
  const handleModalBookNow = async () => {
    if (!modalPhoneNumber || modalPhoneNumber.length !== 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    if (!selectedService) return; // Safety check

    try {
        const serviceType = `${selectedService.title} (${selectedService.subtitle})`;
        
        // API call to the new dedicated quick-book endpoint
        await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, { 
            phoneNumber: modalPhoneNumber,
            serviceType: serviceType
        });
        
        // Success Pop-up (as requested)
        alert('Thanks for booking! We have received your request and will contact you in 5 minutes.');
        
        // Close modal and reset state
        closeModal();
        
    } catch (error) {
        alert('Booking failed. Please try again.');
        console.error('Error booking service:', error);
    }
  };
  
  // --- END OF UPDATED HANDLERS ---


  const [showInput, setShowInput] = useState(false);


const serviceCities = [
    { name: "Noida", color: "text-red-700" },
    { name: "Greater Noida", color: "text-teal-700" },
    { name: "Ghaziabad", color: "text-gray-900" },
    { name: "Delhi", color: "text-slate-700" },
    { name: "Gurugram", color: "text-indigo-700" },
    { name: "Faridabad", color: "text-orange-700" },
];
  return (
    <>
     <SEOHelmet
  title="Bike & Car Service in Noida ₹299 | Doorstep Repair Near Me"
  description="Bike & car service in Noida starting at just ₹299. Doorstep repair, oil change, battery replacement, puncture repair & trusted mechanics near you. Same-day service by Garage Fix Care."
  canonical="https://www.garagefixcare.in/"
  robots="index, follow"
  og={{
    url: "https://www.garagefixcare.in/",
    image: "https://www.garagefixcare.in/og-banner.png",
    imageAlt: "Bike & car service at doorstep in Noida by Garage Fix Care",
    type: "website",
  }}
  twitter={{
    image: "https://www.garagefixcare.in/og-banner.png",
    imageAlt: "Doorstep bike and car service in Noida",
  }}
  structuredData={[
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Garage Fix Care",
      "description": "Doorstep bike and car service in Noida starting at ₹299. Same-day repair, oil change, battery & engine service by certified mechanics.",
      "url": "https://www.garagefixcare.com",
      "telephone": "+919540553759",
      "priceRange": "₹₹",
      "image": "https://www.garagefixcare.in/og-banner.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.5355",
        "longitude": "77.3910"
      },
      "areaServed": [
        { "@type": "City", "name": "Noida" },
        { "@type": "City", "name": "Greater Noida" },
        { "@type": "City", "name": "Ghaziabad" }
      ],
      "serviceType": ["Bike Repair", "Car Repair", "Doorstep Bike Service", "Doorstep Car Service"],
      "openingHours": "Mo-Su 08:00-20:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "100000"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Doorstep Bike & Car Service in Noida",
      "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
      "areaServed": "Noida",
      "description": "At-home bike and car servicing starting at ₹299. Oil change, engine repair, battery replacement, puncture fix — same-day doorstep service.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "299",
        "availability": "https://schema.org/InStock"
      }
    }
  ]}
/>


      <div className="min-h-screen">
        {/* Hero Section */}
        <main className=" bg-slate-800 pt-[76px] sm:pt-[112px] lg:pt-[120px]">

<section className="text-white py-2 sm:py-2 lg:py-2">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">

      {/* Left Side: Main Text and Input */}
      <div>
      <h1 className="text-brandRed text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
  Bike &amp; Car Service in Noida, Delhi and Gurgaon
  <span className="text-orange-500"> at Your Doorstep</span>
</h1>

       {/* Subheading */}
       <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
  Starting at just ₹299 &bull; Same-Day Bike &amp; Car Repair &bull; Trusted Mechanics Near You
</p>

       <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
  Skip the garage queue. Our certified mechanics come to your home or office in Noida — handling everything from routine bike servicing and car oil changes to engine repairs and scooty fixes. Fast, transparent, and affordable.
</p>

{/* Trust points strip */}
<div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
  {["✔ Starting ₹299", "✔ Same-Day Service", "✔ Doorstep Mechanics", "✔ Trusted Technicians", "✔ No Hidden Charges"].map((point, i) => (
    <span key={i} className="font-medium">{point}</span>
  ))}
</div>

        {/* Book + Call Buttons Row */}
        <div className="flex flex-wrap items-center gap-3">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-orange-700 transition-all duration-300"
            >
              Book Service Now
            </button>
          ) : (
            <div
              className={`flex flex-col sm:flex-row items-center gap-3 transition-all duration-500 ease-in-out ${
                showInput ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
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
                className="w-full sm:w-auto px-4 py-3 rounded-lg text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-green-700 transition-colors duration-200"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Call Button */}
          <a
            href="tel:9540553759"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>

        {/* === UPDATED: Modern "Select Your Vehicle" Tile Section (Compact + Responsive) === */}
        <div className="mt-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-4 shadow-2xl">
          <h3 className="text-white text-lg font-semibold mb-4 text-center tracking-tight">Select Your Vehicle</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Bike & Scooty - Default Active (compact height matching Book/Call buttons) */}
            <button
              className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-semibold text-base transition-all duration-300 shadow-inner active:scale-95"
            >
              <Bike className="h-6 w-6" />
              <span>Bike &amp; Scooty</span>
            </button>

            {/* Cars - Navigates to /car using useNavigate (SPA - no reload) */}
            <button
              onClick={() => navigate('/car')}
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 hover:border-slate-400 text-white py-3 rounded-2xl font-semibold text-base transition-all duration-300 active:scale-95"
            >
              <Car className="h-6 w-6" />
              <span>Cars</span>
            </button>
          </div>
        </div>
        {/* === END UPDATED SECTION === */}

      </div>

      {/* Right Side: Image + Reviews */}
      <div className="relative flex flex-col items-center lg:items-end gap-1 mt-1 lg:mt-0">
        {/* Custom Hero Carousel — no react-slick */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
          <img
            src={heroImages[heroIndex]}
            alt={heroAlts[heroIndex]}
            className="w-full rounded-lg transition-opacity duration-700"
            style={{ minHeight: '200px', objectFit: 'cover' }}
          />
          {/* Left Arrow */}
          <button
            onClick={() => setHeroIndex(i => (i - 1 + heroImages.length) % heroImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-20 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          {/* Right Arrow */}
          <button
            onClick={() => setHeroIndex(i => (i + 1) % heroImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-20 flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => setHeroIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === heroIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 w-full sm:w-auto">
            <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-bold">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              {reviewScore.toFixed(1)}/5
            </div>
            <div className="text-xs font-semibold text-center">Google Review</div>
          </div>
          <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 w-full sm:w-auto">
            <div className="text-lg sm:text-xl font-bold text-center">
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
{/* --- Insert this new section after the Hero section --- */}

{/* Background color based on your Navbar: likely a light gray or white. 
    Assuming the Navbar is bg-white or bg-gray-50 based on the screenshot. */}
<div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
  <div className="flex items-center text-sm sm:text-sm font-semibold max-w-7xl mx-auto">
    <div className="flex-shrink-0 px-2 sm:px-2 pr-2">
      <span className="text-red-600 mr-1 sm:mr-2 font-bold">Service Available </span>
      <span className="text-brandRed font-bold sm:inline"> (10% off)</span>
      
    </div>
    <div className="flex-1 min-w-0 overflow-hidden">
      <div className="flex items-center animate-marquee">
        {[...Array(3)].map((_, repetitionIndex) => (
          serviceCities.map((city, index) => (
          <span 
  key={`${repetitionIndex}-${index}`}
  className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm sm:text-sm ${city.color}`}
>
  {city.name}
</span>

          ))
        ))}
      </div>
    </div>
  </div>
</div>
{/* --- Your "Hot Deals This Week" section follows here --- */}
          {/* Autoplay Card Carousel Section */}
          <section className="py-8 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center mb-8">
                  <div className="flex items-center justify-center">
                    {/* UPDATED: Reduced text size on mobile (text-2xl) and scaled up (md:text-4xl) */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mr-4">
                        <span className="text-white">Hot Deals</span>{' '}
                        <span className="text-red-600">This Week</span>
                    </h2>

                    <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                  </div>
                  {/* UPDATED: Reduced text size on mobile (text-base) and scaled up (text-xl) */}
                  <p className="text-base sm:text-lg text-white max-w-7xl mx-auto mt-2 text-center">
                  Limited-time offer for Noida customers!
  Get up to 10% off on bike repairs and servicing at your doorstep.
  Hurry—these deals won’t last long!
                  </p>
                </div>
            </div>
            {/* Marquee-style infinite scrolling image strip */}
            <div className="overflow-hidden w-full px-2 sm:px-4">
              <div
                style={{
                  display: 'flex',
                  animation: 'marqueeScroll 22s linear infinite',
                  width: 'max-content',
                  gap: '14px',
                }}
                onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
                onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
              >
                {[...carouselImages, ...carouselImages].map((img, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10"
                    style={{ width: 'min(76vw, 400px)' }}
                  >
                    <div className="relative">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full object-cover"
                        style={{ height: '220px' }}
                      />
                      {/* City badge overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex flex-wrap gap-1">
                        {['Noida', 'Delhi', 'Greater Noida', 'Ghaziabad', 'Gurugram', 'Faridabad'].slice(0, i % 2 === 0 ? 3 : 3).map((city, ci) => (
                          <span key={ci} className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">
                            {['Noida', 'Delhi', 'Greater Noida', 'Ghaziabad', 'Gurugram', 'Faridabad'][(i * 2 + ci) % 6]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <style>{`
              @keyframes marqueeScroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </section>

          {/* What Our Clients Say? Section */}
          <section className="bg-slate-800 text-black py-4 sm:py-6">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          <span className="text-white">What Our</span>{' '}
          <span className="text-red-600">Clients Say?</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {/* Google Reviews */}
        <div className="bg-sky-50 rounded-lg p-3 shadow-sm">
          <img
            src={googleReviewsImage}
            alt="Google Reviews"
            className="mx-auto h-8 sm:h-10 mb-2"
          />
          <div className="flex justify-center mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
          <p className="text-black font-semibold mb-1 text-sm">4.7/5 Rating</p>
          <a
            href="https://goo.gl/maps/dqmKivbhftEaVxK79"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold hover:underline text-xs"
          >
            view us on Google
          </a>
        </div>

        {/* Facebook Reviews */}
        <div className="bg-sky-50 rounded-lg p-3 shadow-sm">
          <img
            src={facebookReviewsImage}
            alt="Facebook Reviews"
            className="mx-auto h-8 sm:h-10 mb-2"
          />
          <div className="flex justify-center mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
          <p className="text-black font-semibold mb-1 text-sm">4.7/5 Rating</p>
          <a
            href="https://www.instagram.com/p/DQVj8SmktgG/?igsh=cTRzNXd5dHZtOGxi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold hover:underline text-xs"
          >
            view us on FaceBook
          </a>
        </div>

        {/* JustDial Reviews */}
        <div className="bg-sky-50 rounded-lg p-3 shadow-sm">
          <img
            src={justdialReviewsImage}
            alt="JustDial Reviews"
            className="mx-auto h-8 sm:h-10 mb-2"
          />
          <div className="flex justify-center mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
          <p className="text-black font-semibold mb-1 text-sm">4.7/5 Rating</p>
          <a
            href="https://www.justdial.com/jd-business?source=77&wap=77&docid=011PXX11.XX11.251024223108.U1U5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold hover:underline text-xs"
          >
            view us on JustDial
          </a>
        </div>
      </div>
    </div>
  </section>
          
          {/* At Home Service Price List Section (YOUR REQUIRED SECTION) */}
        
  <section className="py-12 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        <span className="text-white">At-Home Service</span>{' '}
        <span className="text-red-600">Price List</span>
      </h2>
      <p className="text-base sm:text-xl text-white mb-6 max-w-3xl mx-auto">
        Transparent pricing for doorstep bike and car service in Noida. Check the labour charges below based on your vehicle's engine size — no hidden fees, no surprises.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6 justify-items-center">
        {servicePrices.map((service, index) => (
          <div
            key={index}
            className="bg-brandRed p-1 rounded-lg w-full max-w-full shadow-md border border-gray-700"
          >
            <div className="bg-sky-100 rounded-lg shadow-sm p-2 w-full">
              <div className="flex flex-col items-start text-left mb-1">
                <h3 className="text-base sm:text-lg font-bold text-black mb-1">{service.title}</h3>
                <p className="text-black text-xs sm:text-sm font-semibold">{service.subtitle}</p>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  <span className="line-through text-red-500 mr-1">{service.originalPrice}</span>
                  <span className="text-green-600">{service.discountedPrice}/-</span>
                </div>
              </div>
              <ul className="list-none space-y-0.5 text-left text-gray-700 text-xs">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-1">
                <button
                  onClick={() => handleSeeChecklist(service.title, service.subtitle)}
                  className="bg-red-600 text-white px-2 py-1 text-xs rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  See checklist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

        
  <section className="relative pt-12 pb-16 sm:py-20">
    <img
      src={mechanicImage}
      alt="Mechanic background"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 h-full flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        <div className="bg-sky-100 rounded-lg shadow-lg p-2 sm:p-4 order-2 lg:order-1">
          <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 text-center">
            Choose Your Vehicle
          </h3>
          <div className="flex justify-center gap-1 mb-2">
            <button
              onClick={() => setSelectedVehicle("Bike")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md font-semibold text-xs sm:text-sm transition-colors ${
                selectedVehicle === "Bike"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Bike
            </button>
            <button
              onClick={() => setSelectedVehicle("Scooty")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md font-semibold text-xs sm:text-sm transition-colors ${
                selectedVehicle === "Scooty"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Scooty
            </button>
          </div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
          >
            <option value="">Select Brand</option>
            {(selectedVehicle === "Bike" ? bikeBrands : scootyBrands).map(
              (brand, idx) => (
                <option key={idx} value={brand}>
                  {brand}
                </option>
              )
            )}
          </select>
        </div>
        <div className="text-center lg:text-left text-white flex flex-col justify-center p-0 lg:p-0 order-1 lg:order-2">
          <h4 className="text-white text-sm font-semibold mb-1 underline decoration-red-600">
            Book Service
          </h4>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            <span className="text-orange-500">Doorstep Bike &amp; Car Service</span> in Noida &amp; Nearby Areas
          </h2>
          <p className="text-base sm:text-lg font-bold text-blue-400 mb-4">
            Certified Genuine Parts
          </p>
          <a
            href="tel:9540553759"
            className="w-full lg:w-2/3 inline-block bg-red-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-1 shadow-md mx-auto lg:mx-0"
          >
            <Phone className="h-4 w-4" />
            <span>Book on Call</span>
          </a>
        </div>
      </div>
    </div>
  </section>
  {/* Bike Services at Home Section */}
  <section className="py-12 bg-slate-800">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
        Complete Bike &amp; Car Care, <span className="text-red-600"> Right at Your Door in Noida</span>
      </h2>
      <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
        From routine oil changes to engine repair, scooty service to car AC checks — our mechanics in Noida handle it all at your location. No waiting, no hassle.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-4">
        {[
          { name: "Routine Service", img: routineService },
          { name: "Bike Insurance", img: bikeInsurance },
          { name: "Doorstep Service", img: doorstepService },
          { name: "Wheel Care", img: wheelCare },
          { name: "Bike Batteries", img: bikeBatteries },
          { name: "Engine Repair", img: engineRepair },
        ].map((service, index) => (
          <div
            key={index}
            className="bg-sky-100 rounded-lg shadow-md p-2 sm:p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={service.img}
              alt={`${service.name} in Noida`}
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain mb-1 sm:mb-2"
            />
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 text-center">{service.name}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* GarageFixCare Benefits Section */}
  <section className="py-6 sm:py-8 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
      <div>
        <p className="text-xs text-white mb-1">Get Rs.10 Off On First Service in Noida</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          GarageFixCare <span className="text-red-600">Service Warranty</span>
        </h2>
        <p className="text-sm sm:text-base text-sky-100 mb-4">
          Noida's trusted doorstep service for bikes and cars. We service all motorcycle and scooter brands — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — plus cars of all makes, right at your home or office.
        </p>
        <div className="flex gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-8 sm:h-10"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-8 sm:h-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <div className="bg-sky-100 text-black rounded-lg p-2 sm:p-4 shadow-md flex items-center space-x-2 sm:space-x-3">
          <img src={warrantyImg} alt="Warranty" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Enjoy a 10-Day Free Service Guarantee</h3>
            <p className="text-xs sm:text-sm text-gray-900">10-Day Hassle-Free Warranty</p>
          </div>
        </div>
        <div className="bg-sky-100 text-black rounded-lg p-2 sm:p-4 shadow-md flex items-center space-x-2 sm:space-x-3">
          <img src={pickupImg} alt="Pickup Service" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Enjoy Free Pickup and Drop at Your Convenience</h3>
            <p className="text-xs sm:text-sm text-gray-900">Free Pick & Drop Available</p>
          </div>
        </div>
        <div className="bg-sky-100 text-black rounded-lg p-2 sm:p-4 shadow-md flex items-center space-x-2 sm:space-x-3">
          <img src={transparentImg} alt="Transparent Pricing" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Transparent Pricing, Competitive Rate</h3>
            <p className="text-xs sm:text-sm text-gray-900">Save up to 30% on your bike service</p>
          </div>
        </div>
        <div className="bg-sky-100 text-black rounded-lg p-2 sm:p-4 shadow-md flex items-center space-x-2 sm:space-x-3">
          <img src={trainedImg} alt="Trained Mechanics" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Skilled and Certified Mechanics</h3>
            <p className="text-xs sm:text-sm text-gray-900">Exclusively Certified Two-Wheeler Mechanics</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Why Choose GarageFixCare Section */}
  <section className="py-8 sm:py-12 bg-slate-800 text-white">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
      <div className="flex justify-center order-2 lg:order-1">
        <img
          src={handshakeImg}
          alt="Handshake"
          className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm"
        />
      </div>
      <div className="order-1 lg:order-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Why Choose <span className="text-red-600">GarageFixCare?</span>
        </h2>
        <p className="text-sm sm:text-base text-white mb-4">
          We know how much you rely on your two-wheeler every day. That's why GarageFixCare brings certified mechanics directly to Noida residents — with honest pricing, genuine parts, and zero hassle. Here's what makes us different:
        </p>
        <ul className="space-y-2 text-left">
          {[
            "Hassle-Free Doorstep Service",
            "Certified and Skilled Technicians",
            "Honest Pricing",
            "Certified Genuine Parts and Quality Lubricants",
            "Your Satisfaction Guaranteed",
            "Fast and Professional Service",
          ].map((item, index) => (
            <li key={index} className="flex items-center text-gray-200 text-sm sm:text-base">
              <span className="text-red-500 text-base mr-1">◆</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* Trusted by Top Brands Section */}
  <section className="py-12 sm:py-16 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* UPDATED: Reduced text size on mobile (text-xl) and scaled up (md:text-3xl) */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 sm:mb-10">
        Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Customers</span>
      </h2>


      {/* Brand Logos */}
      {/* UPDATED: Uses 3 columns on mobile (sm:grid-cols-3) and 5 on desktop (md:grid-cols-5) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
        {[
          { name: "WURTH", img: wurthImg },
          { name: "MOTUL", img: motulImg },
          { name: "Turtlemint", img: turtlemintImg },
          { name: "Buniyad", img: buniyadImg },
          { name: "Dunzo", img: dunzoImg },
        ].map((brand, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex items-center justify-center w-full max-w-[150px] h-16 sm:w-40 sm:h-20 hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="max-h-10 sm:max-h-12 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
  {/* How GarageFixCare Works Section */}
  <section className="bg-slate-800 text-white py-6 sm:py-8">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
          How <span className="text-red-600">GarageFixCare</span> Works?
        </h2>
        <p className="text-sm sm:text-base text-white mb-4">
          Getting your bike serviced in Noida has never been simpler. Book online or call us, and a skilled mechanic arrives at your doorstep with everything needed to get your bike running at its best — all done on the spot.
        </p>
        <ul className="space-y-2 text-left">
          {[
            "Schedule Your Service",
            "Technician Sent to You",
            "Service Done on the Spot",
            "Clear and Transparent Communication",
            "Guaranteed Quality Service",
            "Easy Payment & Feedback",
          ].map((item, index) => (
            <li key={index} className="flex items-center text-white text-sm sm:text-base">
              <span className="text-red-500 text-base mr-1">◆</span> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <img
          src={howWorksImage}
          alt="How GarageFixCare Works"
          className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm"
        />
      </div>
    </div>
  </section>
  {/* We Provide Best Bike Service Section */}
  <section className="bg-slate-900 text-white py-8 sm:py-12">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
        Doorstep <span className="text-red-600">Bike Service</span> by <span className="text-red-600">Certified Experts</span> Near You
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 justify-items-center">
        {[
          { name: "Bike Service in Noida", img: noidaImg },
          { name: "Bike Service in Greater Noida", img: greaterNoidaImg },
          { name: "Bike Service in Ghaziabad", img: ghaziabadImg },
          { name: "Bike Service in Delhi", img: delhiImg },
          { name: "Bike Service in Gurugram", img: gurugramImg },
          { name: "Bike Service in Faridabad", img: faridabadImg },
        ].map((city, index) => (
          <div
            key={index}
            className="bg-sky-100 rounded-lg shadow-md p-2 sm:p-4 w-full max-w-xs text-center hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={city.img}
              alt={city.name}
              className="h-16 w-16 sm:h-20 sm:w-20 mx-auto rounded-full mb-2 object-cover"
            />
            <h3 className="text-sm sm:text-base font-semibold text-black">
              {city.name.split("in ")[0]} <span className="text-red-600">{city.name.split("in ")[1]}</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  </section>
  {/* Customers Speaks Section */}
  <section className="bg-slate-800 text-white py-8 sm:py-12">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
        What <span className="text-red-600">Customers Say</span>
      </h2>
      <p className="text-sm sm:text-base text-white mb-2 sm:mb-4">
        Customer Testimonials on Google
      </p>
      <div className="flex justify-center items-center gap-1 mb-2 sm:mb-4">
        <span className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current"
            />
          ))}
        </span>
        <span className="text-white font-semibold text-sm">4.7 Rating on Google</span>
      </div>
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-600 px-4 py-1 sm:px-5 sm:py-2 rounded-md font-semibold text-xs sm:text-sm text-white hover:bg-red-700 transition-colors duration-200 inline-block"
      >
        Review us on Google
      </a>
    </div>
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 bg-slate-800">
      {[
        {
          name: "Surendra Pratap Singh",
          img: testimonial1,
          text: "I had an excellent experience with GarageFixCare. The team was knowledgeable and professional, delivering high-quality service along with valuable maintenance guidance.",
          time: "a month ago",
        },
        {
          name: "Dharmendra Gupta",
          img: testimonial2,
          text: "I discovered GarageFixCare through Google and was initially unsure, but they provided video evidence of the service. Their work is professional, transparent, and highly reliable.",
          time: "a month ago",
        },
        {
          name: "Rohit Prasad",
          img: testimonial3,
          text: "GarageFixCare provides excellent services, whether you’re stranded or prefer to stay at home. They offer a comprehensive range of reliable and convenient solutions.",
          time: "a month ago",
        },
        {
          name: "Prabhjeet Sharma",
          img: testimonial4,
          text: "When my bike broke down, GarageFixCare responded immediately. The mechanic arrived the next morning, providing prompt and highly professional service",
          time: "a month ago",
        },
      ].map((t, i) => (
        <div
          key={i}
          className="bg-sky-100 text-black rounded-lg p-2 sm:p-4 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200 h-full"
        >
          <img src={googleIcon} alt="Google" className="h-5 sm:h-6 mb-2" />
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-base">★</span>
            ))}
          </div>
          <p className="text-black mb-2 text-xs sm:text-sm line-clamp-3">{t.text}</p>
          <img src={t.img} alt={t.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mb-1" />
          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">{t.name}</h3>
          <span className="text-xs text-black">{t.time}</span>
        </div>
      ))}
    </div>
  </section>
  {/* Bike Brands We Service Section */}
  <section className="bg-slate-900 text-white py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* UPDATED: Reduced text size on mobile (text-2xl) and scaled up (md:text-4xl) */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
        All Major Bike <span className="text-red-600">Brands</span> Serviced <span className="text-red-600">at Your Doorstep</span>
      </h2>


      <div className="bg-slate-800 rounded-lg shadow-lg inline-block px-4 py-3 sm:px-6 sm:py-4">
        {/* UPDATED: Reduced text size on mobile (text-sm) and scaled up (text-lg) */}
        <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
          TVS / Bajaj / Royal Enfield / Yamaha / Honda / Hero / Suzuki / KTM / Jawa / Harley Davidson / Ducati / Kawasaki / Benelli / Triumph / Indian / BMW / Aprilia / Yezdi / Husqvarna
        </p>
      </div>
    </div>
  </section>
  {/* Latest Post Section */}
  <section className="bg-slate-800 text-white py-8 sm:py-12">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
        Latest <span className="text-red-600">Post</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {[
          {
            title: "How to Maintain the Gearbox on Your R15 V3?",
            img: maintainGearboxImg,
            desc: "Proper maintenance of your R15 V3 gearbox is essential for smooth operation, extended transmission life, and optimal overall performance.",
            link: "/blog",
          },
          {
            title: "What are the advantages of a four-valve engine in bikes?",
            img: fourValveEngineImg,
            desc: "A four-valve engine offers numerous advantages over traditional two-valve engines in motorcycles.",
            link: "/blog",
          },
          {
            title: "How do I maintain the drive belt on my scooty?",
            img: driveBeltScootyImg,
            desc: "Maintaining the drive belt on your scooty is essential for ensuring smooth and reliable performance.",
            link: "/blog",
          },
        ].map((post, i) => (
          <div
            key={i}
            className="bg-sky-100 text-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-32 sm:h-40 object-cover"
            />
            <div className="p-2 sm:p-4 text-left">
              <h3 className="text-sm sm:text-base font-bold mb-1">{post.title}</h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-2">{post.desc}</p>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  {/* Frequently Asked Questions Section */}
  <section className="bg-slate-900 text-white py-8 sm:py-12">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Bike Service in Noida — <span className="text-red-600">Common Questions</span>
        </h2>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {[
          {
            q: "Do you provide both bike and car service in Noida?",
            a: "Yes, we offer doorstep service for both bikes and cars in Noida. Whether it's a routine bike service, scooty repair, or car oil change and maintenance — our certified mechanics come directly to your location."
          },
          {
            q: "Which areas in Noida do you cover for doorstep service?",
            a: "We cover all major sectors of Noida including Sector 18, 62, 63, 75, 76, 77, 78, as well as Greater Noida. We also serve parts of Ghaziabad on request."
          },
          {
            q: "What bike and car repair services do you offer at home?",
            a: "Our Noida mechanics handle regular servicing, oil changes, engine repair, brake adjustment, tyre inflation, battery replacement, air filter cleaning, spark plug replacement, and full vehicle inspection — all at your doorstep."
          },
          {
            q: "How much does a doorstep bike or car service in Noida cost?",
            a: "Our at-home bike service starts from just ₹299 for 100–125cc bikes. Car service pricing varies by model and service type. All rates are transparent — no hidden charges."
          },
          {
            q: "Do you offer Royal Enfield service in Noida?",
            a: "Yes, we specialise in Royal Enfield servicing at your doorstep in Noida. Our mechanics are trained to handle Classic 350, Bullet, Meteor, Himalayan, and other RE models."
          },
          {
            q: "How quickly can a mechanic reach my location in Noida?",
            a: "In most cases, our mechanic will reach you within 2–4 hours of booking. For urgent same-day service, call us directly and we'll do our best to prioritise your request."
          },
          {
            q: "Is your service pricing transparent with no hidden fees?",
            a: "Absolutely. We share a detailed estimate before starting any work. What we quote is what you pay — no surprise charges at the end."
          },
          {
            q: "Do you provide a service warranty?",
            a: "Yes, every service comes with a 10-day hassle-free service guarantee. If you face any issue related to the work done, we'll fix it at no extra cost."
          },
          {
            q: "How do I book a mechanic near me in Noida?",
            a: "You can book by calling us, messaging on WhatsApp, or using the booking form on this page. Share your location in Noida and preferred time, and we'll confirm your slot."
          },
          {
            q: "What payment methods do you accept?",
            a: "We accept cash, UPI (Google Pay, PhonePe, Paytm), and other mobile wallets for your convenience."
          },
          {
            q: "Do I need to arrange any tools or equipment for the mechanic?",
            a: "Not at all. Our mechanics arrive fully equipped with all tools, oils, and parts needed. You just need to be present at your Noida address."
          },
          {
            q: "Do you also service scooties like Activa, Jupiter, or Dio?",
            a: "Yes, we provide complete scooty repair and service in Noida for all popular models including Honda Activa, TVS Jupiter, Hero Destini, Suzuki Access, and Yamaha Fascino."
          },
          {
            q: "What safety standards do your mechanics follow during home visits?",
            a: "Our technicians are trained, verified, and follow safety protocols including protective equipment usage and clean workspaces to ensure a professional experience at your home."
          },
          {
            q: "Can I schedule service for multiple bikes at once?",
            a: "Yes, you can book a single appointment for multiple two-wheelers. Just mention it while booking and we'll arrange accordingly."
          },
          {
            q: "What makes GarageFixCare better than a regular bike workshop?",
            a: "Unlike a traditional garage, we come to you — saving you travel time and waiting. We offer transparent pricing, trained mechanics, genuine parts, and a 10-day service warranty, making us the preferred choice for bike service in Noida."
          },
        ].map((faq, index) => (
          <div key={index} className="border border-gray-700 rounded-md overflow-hidden">
            <button
              className="flex justify-between items-start w-full p-2 sm:p-3 text-left font-semibold text-white hover:bg-slate-700 focus:outline-none text-sm sm:text-base"
              onClick={() => {
                if (activeIndex === index) {
                  setActiveIndex(null);
                } else {
                  setActiveIndex(index);
                }
              }}
            >
              <span className="text-red-600 mr-1">Ques {index + 1}.</span>
              <span className="flex-1 ml-2 text-left">{faq.q}</span>
              <span className="transition-transform duration-300">
                {activeIndex === index ? <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" /> : <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />}
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-2 sm:p-3 bg-slate-700 text-gray-300 text-xs sm:text-sm">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

          {/* CTA Section */}
          <section className="py-6 sm:py-8 bg-slate-800">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
        Book Bike or Car Service in Noida Today
      </h2>
      <p className="text-sm sm:text-base text-white mb-3 sm:mb-5 max-w-xl mx-auto">
        Same-day doorstep service starting at ₹299. Our mechanic comes to you — no travel, no waiting, no hidden charges.
      </p>
      <Link
        to="/book"
        className="bg-orange-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-orange-700 transition-colors duration-200 inline-block"
      >
        Book Your Service
      </Link>
    </div>
  </section>
        </div>
          {/* Floating Buttons */}
  <style>{`
    @keyframes shake {
      0%, 100% { transform: rotate(0deg); }
      15%       { transform: rotate(-18deg); }
      30%       { transform: rotate(18deg); }
      45%       { transform: rotate(-14deg); }
      60%       { transform: rotate(14deg); }
      75%       { transform: rotate(-8deg); }
      90%       { transform: rotate(8deg); }
    }
    .btn-shake {
      animation: shake 1.8s ease-in-out infinite;
    }
    .btn-shake:hover {
      animation: none;
      transform: scale(1.12);
    }
  `}</style>
  <div className="fixed top-1/2 right-4 sm:right-6 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
    {/* Call Button — blue color */}
    <a
      href="tel:9540553759"
      className="btn-shake w-13 h-13 sm:w-15 sm:h-15 rounded-full text-white flex items-center justify-center shadow-2xl"
      style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)', width: '52px', height: '52px' }}
      aria-label="Call Us"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        style={{ width: '24px', height: '24px' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    </a>
    {/* WhatsApp Button — green */}
    <a
      href="https://wa.me/9540553759"
      target="_blank"
      rel="noopener noreferrer"
      className="btn-shake text-white flex items-center justify-center shadow-2xl rounded-full"
      style={{ background: 'linear-gradient(135deg, #25d366, #128c4e)', width: '52px', height: '52px' }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={26} />
    </a>
  </div>

        {/* Checklist Modal (UPDATED WITH PHONE INPUT AND API CALL) */}
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-sm sm:max-w-md flex flex-col">
              
              {/* Modal Header */}
              <div className="p-4 border-b flex justify-between items-start">
                  <div>
                      <h3 className="text-lg sm:text-xl font-bold text-black">{selectedService.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{selectedService.subtitle}</p>
                  </div>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-900">
                      <X className="h-6 w-6" />
                  </button>
              </div>
              
              {/* Modal Body: Scrolling Checklist */}
              <div className="p-4 overflow-y-auto flex-1">
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Full Checklist:</h4>
                  <ul className="list-none space-y-2 text-left text-gray-700 text-xs sm:text-sm">
                      {selectedService.checklist.map((item, i) => (
                          <li key={i} className="flex items-start">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                              {item}
                          </li>
                      ))}
                  </ul>
              </div>
              
              {/* Modal Footer: Phone Input and Book Now Button (THE NEW SECTION) */}
              <div className="p-4 border-t bg-gray-50 rounded-b-xl">
                  
                  {/* NEW: Phone Number Input Field */}
                  <div className="w-full mb-3 relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                          type="tel"
                          placeholder="Enter 10-digit Phone Number*"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={modalPhoneNumber}
                          onChange={(e) => setModalPhoneNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                          className="pl-10 pr-3 py-2 w-full rounded-lg text-black border border-gray-300 focus:outline-none focus:border-red-600 shadow-sm text-sm"
                      />
                  </div>
                  
                  {/* Terms and Conditions Checkbox (Updated with Tailwind classes) */}
                  <div className="flex items-center mb-4">
                      <input type="checkbox" id="terms" required className="mr-2 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                      <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 select-none">
                          Yes, I agree to the <span className='underline'>Terms of Service</span>
                      </label>
                  </div>
                  
                  {/* Book Now Button (Updated to call handleModalBookNow) */}
                  <button
                      onClick={handleModalBookNow}
                      className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                      Book Now
                  </button>
              </div>
              
            </div>
          </div>
        )}
      </>
    );
  };
  export default Home;

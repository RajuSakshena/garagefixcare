import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, Flame, X ,Plus, Phone as PhoneIcon} from 'lucide-react'; // Added PhoneIcon
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios'; // <-- NEW: Import for API calls

// Import react-slick and its styles
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  
  // OLD Modal State (Kept but modified)
  const [modalServiceTitle, setModalServiceTitle] = useState('');
  const [modalServiceSubtitle, setModalServiceSubtitle] = useState('');
  
  // NEW Modal State for API booking
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState(''); // State for phone input in modal

  const [selectedVehicle, setSelectedVehicle] = useState('Bike');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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


  const carouselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

 const serviceCities = [
    // Using darker/more professional colors for clean visibility
    { name: "Delhi", color: "text-slate-700" },
    { name: "Noida", color: "text-red-700" }, // Using a dark brand color for emphasis
    { name: "Greater Noida", color: "text-teal-700" },
    { name: "Gurugram", color: "text-indigo-700" },
    { name: "Ghaziabad", color: "text-gray-900" },
    { name: "Faridabad", color: "text-orange-700" },
    { name: "Greater Noida", color: "text-slate-800" },
];
  return (
    <>
      <SEOHelmet
        title="GarageFixCare - Professional Auto Repair At Your Doorstep"
        description="Experience the ultimate convenience of professional bike care at your doorstep. Our expert mechanics come directly to your location—whether at home, work, or on the go— equipped with essential tools and quality parts. Save valuable time while ensuring your bike receives tailored maintenance for peak performance and safety. With our trusted and reliable service, you can enjoy hassle-free repairs and keep your bike in top condition without ever needing to visit a workshop."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <main className="bg-slate-800 pt-[76px] sm:pt-[112px] lg:pt-[120px]">
<section className=" text-white py-2 sm:py-6 lg:py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      {/* Left Side: Main Text and Buttons */}
      <div>
        <h1 className="text-brandRed text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
          Professional Auto Repair
          <span className="text-orange-500"> At Your Doorstep</span>
        </h1>
        <p className="font-poppins text-sm leading-relaxed text-white mb-4 sm:mb-6"> 
         Enjoy professional bike care right at your doorstep.
Our expert mechanics come to you with the right tools and parts, saving you time while keeping your bike in top condition—no workshop visit needed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/book"
            className="bg-orange-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-700 transition-colors duration-200 text-center"
          >
            Book Service Now
          </Link>
          <a
            href="tel:9318478483"
            className="border-2 border-white text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      </div>

      {/* Right Side: Combined Image and Reviews */}
      <div className="relative flex flex-col items-center lg:items-end gap-4 mt-6 lg:mt-0">
        <img
          src={heroImage}
          alt="Professional mechanic working on bike"
          className="rounded-lg shadow-2xl w-full"
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
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
  <div className="flex items-center text-sm sm:text-base font-semibold max-w-7xl mx-auto">
    <div className="flex-shrink-0 px-2 sm:px-4 pr-2">
      <span className="text-red-600 mr-1 sm:mr-2 font-bold">Service Available in</span>
      <span className="text-orange-600 font-bold">Delhi NCR</span>
      <span className="text-brandRed font-bold hidden sm:inline"> (10% off)</span>
      <span className="text-gray-400 ml-1 sm:ml-2">|</span>
    </div>
    <div className="flex-1 min-w-0 overflow-hidden">
      <div className="flex items-center animate-marquee">
        {[...Array(3)].map((_, repetitionIndex) => (
          serviceCities.map((city, index) => (
            <span 
              key={`${repetitionIndex}-${index}`}
              className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold ${city.color}`}
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
                 Limited-time offer!
Get up to 10% off on bike repairs and servicing.
Hurry—these deals won’t last long!
                </p>
              </div>
          </div>
          <div className="px-2 sm:px-2 lg:px-8">
            <Slider {...carouselSettings}>
              <div className="p-2">
                <img
                  src={bikeServiceOfferImage}
                  alt="Bike Service Offer"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div className="p-2">
                <img
                  src={doorstepImage}
                  alt="Doorstep Service"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div className="p-2">
                <img
                  src={engineImage}
                  alt="Engine Repair"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div className="p-2">
                <img
                  src={roadsideImage}
                  alt="Roadside Assistance"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div className="p-2">
                <img
                  src={bikeServiceOfferImage}
                  alt="Bike Service Offer"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </Slider>
          </div>
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
          href="https://www.google.com/search?q=your+business+on+google"
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
          href="https://www.facebook.com/yourbusiness"
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
          href="https://www.justdial.com/your-business"
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
      Wondering about bike service costs?
Prices vary by service type—check the estimated labour charges below to plan your maintenance easily.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 justify-items-center">
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
          <span className="text-orange-500">Convenient Bike Service</span> and Repair at Your Home
        </h2>
        <p className="text-base sm:text-lg font-bold text-blue-400 mb-4">
          Certified Genuine Parts
        </p>
        <a
          href="tel:9318478483"
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
      Expert Bike Care,  <span className="text-red-600"> Right at Your Doorstep</span>
    </h2>
    <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
    
Get professional bike servicing at your doorstep, including engine, battery, and tyre care.
Enjoy convenient, affordable service—plus bike insurance and more.
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
            alt={service.name}
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
      <p className="text-xs text-white mb-1">Get Rs.10 Off On First Service</p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
        GarageFixCare <span className="text-red-600">Service Warranty</span>
      </h2>
      <p className="text-sm sm:text-base text-sky-100 mb-4">
        GarageFixCare offers expert at-home bike repair services for motorcycles of all models and brands, including Harley-Davidson, Ducati, Benelli, Triumph, Indian, BMW, Aprilia, Yezdi, Husqvarna, and more.
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
        At GarageFixCare, we understand how important your two-wheeler is, and we are committed 
        to delivering a service experience that exceeds expectations. Here are a few reasons why 
        GarageFixCare is the preferred choice for convenient, doorstep bike and scooter services:
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
      Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Customers</span> Across <span className="text-red-600">India</span>
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
        Welcome to GarageFixCare, where we transform the two-wheeler service experience by 
        bringing professional care directly to your doorstep. Our streamlined process ensures 
        a hassle-free, efficient service that saves you both time and effort. Here’s how 
        GarageFixCare works:
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
      Professional <span className="text-red-600">Bike Service</span> at Your <span className="text-red-600">Home</span> by <span className="text-red-600">Certified Experts</span>
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 justify-items-center">
      {[
        { name: "Bike Service in Delhi", img: delhiImg },
        { name: "Bike Service in Noida", img: noidaImg },
        { name: "Bike Service in Greater Noida", img: greaterNoidaImg },
        { name: "Bike Service in Gurugram", img: gurugramImg },
        { name: "Bike Service in Faridabad", img: faridabadImg },
        { name: "Bike Service in Ghaziabad", img: ghaziabadImg },
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
      Bike <span className="text-red-600">Brands</span> Serviced at <span className="text-red-600">Your Home</span> by <span className="text-red-600">Certified Experts</span>
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
            <a
              href={post.link}
              className="text-red-600 font-semibold hover:underline text-xs sm:text-sm"
            >
              read more...
            </a>
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
        Frequently Asked <span className="text-red-600">Questions</span>
      </h2>
    </div>
    <div className="space-y-2 sm:space-y-3">
      {[
        {
          q: "Which types of two-wheelers do you provide service for?",
          a: "Garage Fix Care services all types of two-wheelers, including bikes, scooters, mopeds, and more"
        },
        {
          q: "Which areas do you cover for doorstep service?",
          a: "Garage Fix Care provides doorstep service across Noida, Greater Noida, Ghaziabad, Delhi, Faridabad, and Gurugram, ensuring customers can access services at their preferred location.."
        },
        {
          q: "What services do you provide at the customer’s doorstep?",
          a: "Garage Fix Care offers a full range of doorstep services, including regular maintenance, repairs, oil changes, tire replacement, battery checks, engine repairs, and more"
        },
        {
          q: "Do you provide emergency roadside assistance?",
          a: "Garage Fix Care offers emergency assistance for breakdowns or issues, providing prompt support wherever you are."
        },
        {
          q: "What is the typical duration for a service or repair?",
          a: "The estimated duration of a service or repair helps customers plan their schedules accordingly"
        },
        {
          q: "What safety protocols do your technicians follow during home visits?",
          a: "Garage Fix Care technicians follow strict safety protocols during home visits, including wearing protective gear and maintaining hygiene standards to ensure a safe service experience."
        },
        {
          q: "What are your service charges, and are there any hidden fees?",
          a: "Garage Fix Care offers transparent pricing with no hidden fees, so customers know exactly what to expect."
        },
        {
          q: "Do you offer a warranty or guarantee for the services provided?",
          a: "Garage Fix Care guarantees the quality of our work and provides warranties on the services offered."
        },
        {
          q: "How can I schedule a service appointment at my preferred location?",
          a: "Customers can schedule a service appointment easily via our website, WhatsApp, or by calling our customer service hotline."
        },
        {
          q: "Which payment methods do you accept?",
          a: "Garage Fix Care accepts various payment methods for customer convenience, including cash and mobile wallets."
        },
        {
          q: "Do I need to provide any tools or equipment for the service?",
          a: "Garage Fix Care technicians arrive fully equipped with all the tools and equipment needed to perform the service at your doorstep"
        },
        {
          q: "Can I track the status of my service appointment?",
          a: "Customers can track their service appointment in real-time via the Garage On Call app or website."
        },
        {
          q: "What should I do if I’m not satisfied with the service provided?",
          a: "Garage Fix Care prioritizes customer satisfaction and promptly addresses any concerns to ensure a positive service experience."
        },
        {
          q: "Do you provide discounts or promotional offers for returning customers?",
          a: "Garage On Call offers special discounts and promotions for loyal customers. Please inquire about current offers."
        },
        {
          q: "Are your technicians certified and experienced?",
          a: "Garage Fix Care technicians are certified and highly experienced professionals skilled in servicing all types of two-wheelers."
        },
        {
          q: "What makes your doorstep service different from traditional garage visits?",
          a: "Garage Fix Care’s doorstep service provides unmatched convenience, saving customers time by delivering expert service directly to their location."
        },
        {
          q: "Do you offer eco-friendly or green service options?",
          a: "Garage Fix Care is committed to sustainability and offers eco-friendly options, including green cleaning products and recycling of used parts."
        },
        {
          q: "Can I schedule service for multiple two-wheelers at the same time?",
          a: "Customers can schedule service for multiple two-wheelers in a single appointment for added convenience."
        },
        {
          q: "How can I cancel or reschedule my service appointment?",
          a: "Customers can easily cancel or reschedule appointments by contacting Garage Fix Care’s customer service."
        },
        {
          q: "How can I provide feedback about my service experience?",
          a: "Garage On Call welcomes feedback from customers and provides various channels for sharing your experiences, including online reviews and feedback forms."
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
      Ready to Get Started?
    </h2>
    <p className="text-sm sm:text-base text-white mb-3 sm:mb-5 max-w-xl mx-auto">
      Book your service today and experience the convenience of professional
      automotive care at your location.
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
<div className="fixed top-1/2 right-6 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
  <a
    href="tel:9318478483"
    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
    aria-label="Call Us"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 sm:w-7 sm:h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  </a>
  <a
    href="https://wa.me/9318478483"
    target="_blank"
    rel="noopener noreferrer"
    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
    aria-label="Chat on WhatsApp"
  >
    <FaWhatsapp size={28} className="sm:size-32" />
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

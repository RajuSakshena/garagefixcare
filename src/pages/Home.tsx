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
import warrantyImg from "../images/Warranty.webp";
import pickupImg from "../images/Free Pickup.webp";
import transparentImg from "../images/Transparent.webp";
import trainedImg from "../images/Trainie.webp";
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
        title="GarageFixCare - Professional Mobile Auto Repair Services"
        description="Professional automotive services at your doorstep. Expert mechanics, quality parts, and convenient mobile repair services for all vehicle types."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-slate-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Main Text and Buttons */}
              <div>
                <h1 className="text-red-600 md:text-6xl font-bold mb-6 leading-tight">
                  Professional Auto Repair
                  <span className="text-orange-500"> At Your Doorstep</span>
                </h1>
                <p className="font-poppins text-lg leading-relaxed text-white mb-8">
  Experience the ultimate convenience of professional bike care at your doorstep. 
  Our expert mechanics come directly to your location—whether at home, work, or on the go—
  equipped with essential tools and quality parts. Save valuable time while ensuring your bike 
  receives tailored maintenance for peak performance and safety. With our trusted and reliable 
  service, you can enjoy hassle-free repairs and keep your bike in top condition without ever 
  needing to visit a workshop.
</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/book"
                    className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors duration-200 text-center"
                  >
                    Book Service Now
                  </Link>
                  <a
                    href="tel:9318478483"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center flex items-center justify-center gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </div>
              </div>

              {/* Combined Image and Reviews on the right */}
             <div className="relative flex flex-col items-center lg:items-end gap-6">
  <img
    src={heroImage}
    alt="Professional mechanic working on bike"
    className="rounded-lg shadow-2xl w-full"
  />

                {/* Dynamic Google Review & Happy Customers Section */}
                <div className="flex flex-row md:flex-row items-center justify-center gap-4 w-full">
                  <div className="bg-sky-100 text-black p-4 rounded-lg shadow-lg flex-1">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      {reviewScore.toFixed(1)}/5
                    </div>
                    <div className="text-sm font-semibold text-center">Google Review</div>
                  </div>
                  <div className="bg-sky-100 text-black p-4 rounded-lg shadow-lg flex-1">
                    <div className="text-2xl font-bold text-center">
                      {happyCustomersCount.toLocaleString()}+
                    </div>
                    <div className="text-sm font-semibold text-center">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
{/* --- Insert this new section after the Hero section --- */}

{/* Background color based on your Navbar: likely a light gray or white. 
    Assuming the Navbar is bg-white or bg-gray-50 based on the screenshot. */}
<div className="bg-sky-100 border-y border-gray-200 py-3 overflow-hidden">
    
    {/* 1. ADJUSTMENT 1: Reduce horizontal padding (px-4 to px-0) 
       on the inner container to let content start further left/right. 
       We only keep max-w-7xl mx-auto for content width. */}
    <div className="flex items-center text-lg font-semibold max-w-7xl mx-auto">
        
        {/* 2. ADJUSTMENT 2: Reduce right padding (pr-8 to pr-4 or pr-2) 
           on the static title to bring the scrolling cities closer. */}
        <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pr-4"> 
            <span className="text-red-600 mr-2 font-bold">Service Available in</span>
            <span className="text-orange-600 font-bold">Delhi NCR</span>
            <span className="text-brandRed font-bold"> (10% off)</span>
            <span className="text-gray-400 ml-4">|</span>
        </div>

        {/* 3. SCROLLING RIGHT SECTION (No change needed here) */}
        <div className="flex-1 min-w-0 overflow-hidden">
    <div className="flex items-center animate-marquee">

        {/* Dynamic / Scrolling Cities (Repeat this block for a seamless loop) */}
        {[...Array(5)].map((_, repetitionIndex) => (
            serviceCities.map((city, index) => (
                <span 
                    key={`${repetitionIndex}-${index}`}
                    // Added: font-bold for better visibility and a professional look
                    className={`ml-10 md:ml-16 tracking-wider flex-shrink-0 font-bold ${city.color}`}
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
                  <h2 className="text-3xl md:text-4xl font-bold mr-4">
  <span className="text-white">Hot Deals</span>{' '}
  <span className="text-red-600">This Week</span>
</h2>

                  <Flame className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-xl text-white max-w-7xl mx-auto mt-2 text-center">
                  Special prices available only for a limited time,
                  Get exciting discounts on bike repairs and servicing.<br />
                  Save big with up to 10% off this week,
                  Hurry, these exclusive offers won’t last long!
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
        <section className="bg-slate-800 text-Black py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
  <span className="text-white">What Our</span>{' '}
  <span className="text-red-600">Clients Say?</span>
</h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Google Reviews */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-md">
                <img
                  src={googleReviewsImage}
                  alt="Google Reviews"
                  className="mx-auto h-16 mb-4"
                />
                <div className="flex justify-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-black font-semibold mb-4">4.7/5 Rating</p>
                <a
                  href="https://www.google.com/search?q=your+business+on+google"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold hover:underline"
                >
                  view us on Google
                </a>
              </div>

              {/* Facebook Reviews */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-md">
                <img
                  src={facebookReviewsImage}
                  alt="Facebook Reviews"
                  className="mx-auto h-16 mb-4"
                />
                <div className="flex justify-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-black font-semibold mb-4">4.7/5 Rating</p>
                <a
                  href="https://www.facebook.com/yourbusiness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold hover:underline"
                >
                  view us on FaceBook
                </a>
              </div>

              {/* JustDial Reviews */}
              <div className="bg-sky-50 rounded-lg p-6 shadow-md">
                <img
                  src={justdialReviewsImage}
                  alt="JustDial Reviews"
                  className="mx-auto h-16 mb-4"
                />
                <div className="flex justify-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-black font-semibold mb-4">4.7/5 Rating</p>
                <a
                  href="https://www.justdial.com/your-business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold hover:underline"
                >
                  view us on JustDial
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* At Home Service Price List Section (YOUR REQUIRED SECTION) */}
       <section className="py-2 bg-slate-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      <span className="text-white">At-Home Service</span>{' '}
      <span className="text-red-600">Price List</span>
    </h2>

    <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
  Curious about the cost of bike servicing? The price of bike or motorcycle service 
  depends on the type of service you select. Below, you can find an estimate of the 
  labour charges to help you plan your bike’s maintenance with ease.
</p>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
  {servicePrices.map((service, index) => (
    <div
      key={index}
      className="bg-orange-600 p-2 rounded-xl w-full max-w-md shadow-lg border border-gray-700"
    >
      <div className="bg-sky-100 rounded-lg shadow-md p-4 w-full">
        <div className="flex flex-col items-start text-left mb-2">
          <h3 className="text-xl font-bold text-black mb-1">{service.title}</h3>
          <p className="text-black font-semibold">{service.subtitle}</p>
          <div className="text-2xl font-bold mt-2">
            <span className="line-through text-red-500 mr-2">{service.originalPrice}</span>
            <span className="text-green-600">{service.discountedPrice}/-</span>
          </div>
        </div>
        <ul className="list-none space-y-1 text-left text-gray-700">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <CheckCircle className="h-2 w-2 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-2">
          <button
            onClick={() => handleSeeChecklist(service.title, service.subtitle)}
            className="bg-red-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
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
        
<section className="relative h-[500px] lg:h-[600px]">
  {/* Background Image */}
  <img
    src={mechanicImage}
    alt="Mechanic background"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50" />

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
      
      {/* Left Side */}
      <div className="bg-sky-100 rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Choose Your Vehicle
        </h3>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setSelectedVehicle("Bike")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              selectedVehicle === "Bike"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Bike
          </button>
          <button
            onClick={() => setSelectedVehicle("Scooty")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              selectedVehicle === "Scooty"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-black "
            }`}
          >
            Scooty
          </button>
        </div>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
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

      {/* Right Side */}
     <div className="text-center lg:text-left text-white flex flex-col justify-center">
  <h4 className="text-white text-3xl font-semibold mb-2 underline decoration-red-600">
  Book Service
</h4>
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    <span className="text-orange-600">Convenient Bike Service</span> and Repair at Your Home
  </h2>
  <p className="text-4xl font-bold text-blue-400 mb-6">
    Certified Genuine Parts
  </p>
  <a
    href="tel:9318478483"
    className="w-full inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
  >
    <Phone className="h-5 w-5" />
    <span>Book on Call</span>
  </a>
</div>
    </div>
  </div>
</section>
{/* Bike Services at Home Section */}
<section className="py-8 bg-slate-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Expert Bike Care,  <span className="text-red-600"> Right at Your Doorstep</span>
    </h2>
    <p className="text-lg text-white mb-12 max-w-3xl mx-auto">
  Enjoy professional periodic bike servicing at your doorstep. Our services include engine repair, battery replacement, wheel and tyre maintenance, and much more—all conveniently handled at home. You can also avail bike insurance and other essential services, all at competitive prices.
</p>


    {/* Service Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
          className="bg-sky-100 rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-200"
        >
          <img
            src={service.img}
            alt={service.name}
            className="h-28 w-28 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
        </div>
      ))}
    </div>
  </div>
</section>

{/* GarageFixCare Benefits Section */}
<section className="py-8 bg-slate-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    {/* Left Content */}
    <div>
      <p className="text-sm text-white mb-2">Get Rs.30 Off On First Service</p>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        GarageFixCare <span className="text-red-600">Service Warranty</span>
      </h2>
      <p className="text-lg text-sky-100 mb-6">
  GarageFixCare offers expert at-home bike repair services for motorcycles of all models and brands, including Harley-Davidson, Ducati, Benelli, Triumph, Indian, BMW, Aprilia, Yezdi, Husqvarna, and more.
</p>

      <div className="flex gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Google Play"
          className="h-12"
        />
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="App Store"
          className="h-12"
        />
      </div>
    </div>

    {/* Right Content (Benefit Cards) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-sky-100 text-black rounded-lg p-6 shadow-md flex items-center space-x-4">
        <img src={warrantyImg} alt="Warranty" className="h-12 w-12 object-contain" />
        <div>
          <h3 className="font-bold text-lg">Enjoy a 10-Day Free Service Guarantee</h3>
          <p className="text-sm text-gray-900 ">10-Day Hassle-Free Warranty</p>
        </div>
      </div>
      <div className="bg-sky-100 text-black rounded-lg p-6 shadow-md flex items-center space-x-4">
        <img src={pickupImg} alt="Pickup Service" className="h-12 w-12 object-contain" />
        <div>
          <h3 className="font-bold text-lg">Enjoy Free Pickup and Drop at Your Convenience</h3>
          <p className="text-sm text-gray-900">Free Pick & Drop Available</p>
        </div>
      </div>
      <div className="bg-sky-100 text-black rounded-lg p-6 shadow-md flex items-center space-x-4">
        <img src={transparentImg} alt="Transparent Pricing" className="h-12 w-12 object-contain" />
        <div>
          <h3 className="font-bold text-lg">Transparent Pricing, Competitive Rate</h3>
          <p className="text-sm text-gray-900">Save up to 30% on your bike service</p>
        </div>
      </div>
      <div className="bg-sky-100 text-black rounded-lg p-6 shadow-md flex items-center space-x-4">
        <img src={trainedImg} alt="Trained Mechanics" className="h-12 w-12 object-contain" />
        <div>
          <h3 className="font-bold text-lg">Skilled and Certified Mechanics</h3>
          <p className="text-sm text-gray-900">Exclusively Certified Two-Wheeler Mechanics</p>
        </div>
      </div>
    </div>
  </div>
</section>
 {/* Why Choose GarageFixCare Section */}
<section className="py-16 bg-slate-800 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    {/* Left Image */}
    <div className="flex justify-center">
      <img
        src={handshakeImg}
        alt="Handshake"
        className="rounded-xl shadow-2xl w-full max-w-md"
      />
    </div>

    {/* Right Content */}
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Why Choose <span className="text-red-600">GarageFixCare?</span>
      </h2>
      <p className="text-lg text-white mb-6">
  At GarageFixCare, we understand how important your two-wheeler is, and we are committed 
  to delivering a service experience that exceeds expectations. Here are a few reasons why 
  GarageFixCare is the preferred choice for convenient, doorstep bike and scooter services:
</p>


      <ul className="space-y-3 text-left">
        {[
          "Hassle-Free Doorstep Service",
          "Certified and Skilled Technicians",
          "Honest Pricing",
          "Certified Genuine Parts and Quality Lubricants",
          "Your Satisfaction Guaranteed",
          "Fast and Professional Service",
        ].map((item, index) => (
          <li key={index} className="flex items-center text-gray-200">
            <span className="text-red-500 text-lg mr-2">◆</span> {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>

{/* Trusted by Top Brands Section */}
<section className="py-16 bg-slate-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
  Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Customers</span> Across <span className="text-red-600">India</span>
</h2>


    {/* Brand Logos */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
      {[
        { name: "WURTH", img: wurthImg },
        { name: "MOTUL", img: motulImg },
        { name: "Turtlemint", img: turtlemintImg },
        { name: "Buniyad", img: buniyadImg },
        { name: "Dunzo", img: dunzoImg },
      ].map((brand, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center w-40 h-20 hover:shadow-xl transition-shadow duration-200"
        >
          <img
            src={brand.img}
            alt={brand.name}
            className="max-h-12 object-contain"
          />
        </div>
      ))}
    </div>
  </div>
</section>
{/* How GarageFixCare Works Section */}
<section className="bg-slate-800 text-white py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    {/* Left Content */}
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        How <span className="text-red-600">GarageFixCare</span> Works?
      </h2>
      <p className="text-lg text-white mb-6">
  Welcome to GarageFixCare, where we transform the two-wheeler service experience by 
  bringing professional care directly to your doorstep. Our streamlined process ensures 
  a hassle-free, efficient service that saves you both time and effort. Here’s how 
  GarageFixCare works:
</p>

      <ul className="space-y-3 text-left">
        {[
          "Schedule Your Service",
          "Technician Sent to You",
          "Service Done on the Spot",
          "Clear and Transparent Communication",
          "Guaranteed Quality Service",
          "Easy Payment & Feedback",
        ].map((item, index) => (
          <li key={index} className="flex items-center text-white">
            <span className="text-red-500 text-lg mr-2">◆</span> {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Right Image */}
    <div className="flex justify-center">
      <img
        src={howWorksImage}
        alt="How GarageFixCare Works"
        className="rounded-xl shadow-2xl w-full max-w-md"
      />
    </div>
  </div>
</section>
{/* We Provide Best Bike Service Section */}
<section className="bg-slate-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 className="text-3xl md:text-4xl font-bold mb-12">
  Professional <span className="text-red-600">Bike Service</span> at Your <span className="text-red-600">Home</span> by <span className="text-red-600">Certified Experts</span>
</h2>


    {/* City Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
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
          className="bg-sky-100 rounded-lg shadow-lg p-6 w-full max-w-xs text-center hover:shadow-xl transition-shadow duration-200"
        >
          <img
            src={city.img}
            alt={city.name}
            className="h-24 w-24 mx-auto rounded-full mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-black">
            {city.name.split("in ")[0]} <span className="text-red-600">{city.name.split("in ")[1]}</span>
          </h3>
        </div>
      ))}
    </div>
  </div>
</section>
{/* Customers Speaks Section */}
<section className="bg-slate-800 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
  What <span className="text-red-600">Customers Say</span>
</h2>

    <p className="text-lg text-white mb-6">
  Customer Testimonials on Google
</p>

   <div className="flex justify-center items-center gap-2 mb-6">
  <span className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className="h-6 w-6 text-yellow-400 fill-current"
      />
    ))}
  </span>
  <span className="text-white font-semibold">4.7 Rating on Google</span>
</div>

    <a
      href="https://www.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-red-600 px-6 py-3 rounded-lg font-semibold text-white hover:bg-red-700 transition-colors duration-200"
    >
      Review us on Google
    </a>
  </div>

  {/* Testimonials Grid */}
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-slate-800">
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
        className="bg-sky-100 text-black rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-200"
      >
        <img src={googleIcon} alt="Google" className="h-8 mb-4" />
        <div className="flex justify-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">★</span>
          ))}
        </div>
        <p className="text-black mb-4 text-sm">"{t.text}"</p>
        <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full mb-2" />
        <h3 className="font-semibold text-gray-900">{t.name}</h3>
        <span className="text-sm text-black">{t.time}</span>
      </div>
    ))}
  </div>
</section>

{/* Bike Brands We Service Section */}
<section className="bg-slate-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-8">
  Bike <span className="text-red-600">Brands</span> Serviced at <span className="text-red-600">Your Home</span> by <span className="text-red-600">Certified Experts</span>
</h2>


    <div className="bg-slate-800 rounded-lg shadow-lg inline-block px-6 py-4">
      <p className="text-lg text-gray-300 leading-relaxed">
        TVS / Bajaj / Royal Enfield / Yamaha / Honda / Hero / Suzuki / KTM / Jawa / Harley Davidson / Ducati / Kawasaki / Benelli / Triumph / Indian / BMW / Aprilia / Yezdi / Husqvarna
      </p>
    </div>
  </div>
</section>
{/* Latest Post Section */}
<section className="bg-slate-800 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-12">
      Latest <span className="text-red-600">Post</span>
    </h2>

    {/* Post Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "How to Maintain the Gearbox on Your R15 V3?",
          img: maintainGearboxImg,
          desc: "Proper maintenance of your R15 V3 gearbox is essential for smooth operation, extended transmission life, and optimal overall performance. Regular care helps prevent wear, ensures reliable gear shifts, and enhances the longevity of your motorcycle.",
          link: "/blog", // placeholder for now
        },
        {
          title: "What are the advantages of a four-valve engine in bikes?",
          img: fourValveEngineImg,
          desc: "A four-valve engine, which features two intake valves and two exhaust valves per cylinder, offers numerous advantages over traditional two-valve engines in motorcycles.",
          link: "/blog", // placeholder
        },
        {
          title: "How do I maintain the drive belt on my scooty?",
          img: driveBeltScootyImg,
          desc: "Maintaining the drive belt on your scooty is essential for ensuring smooth and reliable performance. The drive belt transfers power efficiently from engine to wheel.",
          link: "/blog", // placeholder
        },
      ].map((post, i) => (
        <div
          key={i}
          className="bg-sky-100 text-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
        >
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-left">
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700 text-sm mb-4">{post.desc}</p>
            <a
              href={post.link}
              className="text-red-600 font-semibold hover:underline"
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
<section className="py-1 bg-slate-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked <span className="text-red-600">Questions</span>
      </h2>
    </div>

    <div className="space-y-6">
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
        <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-4 text-left font-semibold text-white hover:bg-slate-800 focus:outline-none"
            onClick={() => {
              if (activeIndex === index) {
                setActiveIndex(null);
              } else {
                setActiveIndex(index);
              }
            }}
          >
            <span className="text-red-600 mr-2">Ques {index + 1}.</span> {faq.q}
            <span className="transition-transform duration-300">
              {activeIndex === index ? <X className="h-6 w-6 text-red-600" /> : <Plus className="h-6 w-6 text-red-600" />}
            </span>
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              activeIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-4 bg-slate-800 text-gray-300">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* CTA Section */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Book your service today and experience the convenience of professional
              automotive care at your location.
            </p>
            <Link
              to="/book"
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors duration-200 inline-block"
            >
              Book Your Service
            </Link>
          </div>
        </section>
      </div>
        {/* Floating Buttons */}
<div className="fixed top-1/2 right-6 -translate-y-1/2 flex flex-col space-y-6 z-50">
  {/* Phone Button */}
  <a
    href="tel:9318478483"
    className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
    aria-label="Call Us"
  >
    <Phone size={28} />
  </a>

  {/* WhatsApp Button */}
  <a
    href="https://wa.me/9318478483"
    target="_blank"
    rel="noopener noreferrer"
    className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
    aria-label="Chat on WhatsApp"
  >
    <FaWhatsapp size={32} />
  </a>
</div>

      {/* Checklist Modal (UPDATED WITH PHONE INPUT AND API CALL) */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-md flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-black">{selectedService.title}</h3>
                    <p className="text-sm text-gray-600">{selectedService.subtitle}</p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-900">
                    <X className="h-6 w-6" />
                </button>
            </div>
            
            {/* Modal Body: Scrolling Checklist */}
            <div className="p-4 overflow-y-auto flex-1">
                <h4 className="font-semibold text-gray-700 mb-3">Full Checklist:</h4>
                <ul className="list-none space-y-2 text-left text-gray-700">
                    {selectedService.checklist.map((item, i) => (
                        <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
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
                        className="pl-10 pr-3 py-2 w-full rounded-lg text-black border border-gray-300 focus:outline-none focus:border-red-600 shadow-sm"
                    />
                </div>
                
                {/* Terms and Conditions Checkbox (Updated with Tailwind classes) */}
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="terms" required className="mr-2 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                    <label htmlFor="terms" className="text-sm text-gray-700 select-none">
                        Yes, I agree to the <span className='underline'>Terms of Service</span>
                    </label>
                </div>
                
                {/* Book Now Button (Updated to call handleModalBookNow) */}
                <button
                    onClick={handleModalBookNow}
                    className="bg-red-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
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

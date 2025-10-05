import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

import SEOHelmet from '../components/SEOHelmet';
import mechanicImg from '../images/Mechanic22.jpg'; // ✅ Background image
import Bajaj from "../images/Bajaj.png";
import Hero from "../images/Hero.png";
import Honda from "../images/Honda.png";
import Jawa from "../images/Jawa.png";
import Ktm from "../images/Ktm.png";
import Mahindra from "../images/Mahindra.png";
import RoyalEnfield from "../images/Royal Enfield.png";
import Suzuki from "../images/Suzuki.png";
import Triumph from "../images/Triumph.png";
import Tvs from "../images/Tvs.png";
import Vespa from "../images/Vespa.png";
import Yamaha from "../images/Yamaha.png";


const BookService = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<'bike' | 'scooty'>('bike');
  const [selectedBrand, setSelectedBrand] = useState('');

  // ✅ Full Bike Brands
  const bikeBrands: string[] = [
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

  // ✅ Full Scooty Brands
  const scootyBrands: string[] = [
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

  // 🔹 Decide which list to use
  const brands = selectedVehicle === 'bike' ? bikeBrands : scootyBrands;

  return (
    <>
      <SEOHelmet 
        title="Book Service - Schedule Mobile Auto Repair | GarageFixCare"
        description="Book professional mobile auto repair service online. Choose your preferred time and location for oil changes, brake service, diagnostics, and more."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
       <main className="bg-slate-900 pt-[70px] sm:pt-[100px] lg:pt-[120px]">
  {/* Hero / Heading Section */}
  <section className="text-white py-8 sm:py-10">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        <span className="text-sky-600">Book Your</span>{' '}
        <span className="text-orange-500">Service</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed">
        Schedule professional automotive service at your convenient location.
        Our certified mechanics will come to you.
      </p>
    </div>
  </section>
</main>

{/* Booking Section */}
<section
  className="relative py-12 sm:py-20 bg-cover bg-center"
  style={{ backgroundImage: `url(${mechanicImg})` }}
>
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
    
    {/* Left: Vehicle Selector */}
    <div className="bg-sky-100 rounded-xl shadow-lg p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        Choose Your Vehicle
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
        <button
          type="button"
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition ${
            selectedVehicle === 'bike'
              ? 'bg-brandRed text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => {
            setSelectedVehicle('bike');
            setSelectedBrand('');
          }}
        >
          Bike
        </button>
        <button
          type="button"
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition ${
            selectedVehicle === 'scooty'
              ? 'bg-brandRed text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => {
            setSelectedVehicle('scooty');
            setSelectedBrand('');
          }}
        >
          Scooty
        </button>
      </div>

      {/* Brand Dropdown */}
      <select
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandRed focus:border-transparent text-sm sm:text-base"
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
      >
        <option value="">Select Brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>

    {/* Right: Info + Buttons */}
    <div className="text-white text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 border-b-4 border-brandRed inline-block pb-1">
        Book Service
      </h2>

      <p className="text-lg sm:text-2xl mb-3 sm:mb-4">
        <span className="text-brandRed font-bold">Bike</span>{' '}
        <span className="text-sky-100">Service & Repair at Home</span>
      </p>

      <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-4 sm:mb-6">
        100% Genuine Parts
      </h3>

      <a
        href="tel:9318478483"
        className="inline-block mb-4 sm:mb-6 px-5 sm:px-6 py-2 sm:py-3 bg-brandRed hover:bg-red-700 rounded-full font-bold text-sm sm:text-base shadow-md transition"
      >
        📞 Book on Call
      </a>

      {/* App Store Buttons */}
      <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center sm:space-x-4 gap-3 sm:gap-0">
        <a href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-10 sm:h-12"
          />
        </a>
        <a href="#">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-10 sm:h-12"
          />
        </a>
      </div>
    </div>
  </div>
</section>

{/* Top Brands + Services Section */}
<section className="bg-slate-900 text-white py-8 sm:py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-stretch">

    {/* Left: Top Brands */}
    <div className="bg-sky-100 text-center rounded-lg shadow-lg p-6 sm:p-8 flex flex-col justify-between">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-6 sm:mb-8">
        Top Brands We <span className="text-brandRed">Service</span>
      </h2>
      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {[Bajaj, Hero, Honda, Jawa, Ktm, Mahindra, RoyalEnfield, Suzuki, Triumph, Tvs, Vespa, Yamaha].map((img, i) => (
          <img key={i} src={img} alt={`brand-${i}`} className="mx-auto h-10 sm:h-14 object-contain" />
        ))}
      </div>
    </div>

    {/* Right: Services List */}
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
        <span className="text-brandRed">Services </span> We Provide
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
        We offer comprehensive bike and scooter servicing at your home, including:
      </p>

      <ul className="mt-3 space-y-2 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
        {[
          "Regular Bike Maintenance – Full Bike Inspection & Tuning",
          "Premium Engine Oil Service – Superior engine oil for lasting performance",
          "Clutch & Brake Maintenance – Parts Health Check & Change",
          "Chain Inspection & Lubrication – Improves Efficiency & Durability",
          "Battery Maintenance & Replacement – Dead battery? We’ll replace it instantly",
          "Scooter Maintenance at Your Doorstep – Certified Technician Gearless Scooter Care",
          "Urgent Repair Service – Flat Tire or Bike Issues? Help is Just a Call Away",
          "Rain-Ready Bike Inspection – Rust Protection & Electrical Inspection",
          "Home Pickup & Delivery – Hassle-Free Pickup for Major Bike Repairs",
        ].map((item, i) => (
          <li key={i} className="flex items-start">
            <span className="text-brandRed mr-2">♦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>

{/* Contact Info Section */}
<section className="bg-slate-800 py-8 sm:py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-slate-900 rounded-lg shadow-lg p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-white">
      <div className="flex items-start space-x-3 sm:space-x-4">
        <FaMapMarkerAlt className="text-brandRed text-2xl sm:text-3xl" />
        <div>
          <h3 className="font-bold text-sm sm:text-base">Location :</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            3rd Floor, Ocean Complex, 313, <br />
            Sector 18, Noida, Uttar Pradesh 201301
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 sm:space-x-4">
        <FaPhoneAlt className="text-brandRed text-2xl sm:text-3xl" />
        <div>
          <h3 className="font-bold text-sm sm:text-base">Call :</h3>
          <a href="tel:9318478483" className="text-gray-300 hover:text-red-500 text-sm sm:text-base">
            9318478483
          </a>
        </div>
      </div>
      <div className="flex items-start space-x-3 sm:space-x-4">
        <FaEnvelope className="text-brandRed text-2xl sm:text-3xl" />
        <div>
          <h3 className="font-bold text-sm sm:text-base">Email :</h3>
          <a href="mailto:GarageFixCare@gmail.com" className="text-gray-300 hover:text-red-500 text-sm sm:text-base">
            GarageFixCare@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-start space-x-3 sm:space-x-4">
        <FaWhatsapp className="text-brandRed text-2xl sm:text-3xl" />
        <div>
          <h3 className="font-bold text-sm sm:text-base">WhatsApp :</h3>
          <a
            href="https://wa.me/919318478483"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-red-500 text-sm sm:text-base"
          >
            +91 9318478483
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


      </div>
    </>
  );
};

export default BookService;

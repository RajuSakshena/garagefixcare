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
        <main className=" bg-slate-800 pt-[76px] sm:pt-[112px] lg:pt-[120px]">
       <section className="bg-slate-900 text-white py-10 md:py-10">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-3xl md:text-4xl font-bold mb-4">
      <span className="text-sky-600">Book Your</span>{' '}
      <span className="text-orange-500">Service</span>
    </h1>

    <p className="text-white md:text-xl max-w-2xl mx-auto leading-relaxed">
      Schedule professional automotive service at your convenient location. 
      Our certified mechanics will come to you.
    </p>
  </div>
</section>

</main>
        {/* Booking Section */}
        <section
          className="relative py-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${mechanicImg})` }}
        >
          <div className="absolute inset-0 bg-black/70"></div> {/* Dark overlay */}
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Vehicle Selector */}
            <div className="bg-sky-100 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Choose Your Vehicle
              </h2>

              {/* Toggle Buttons */}
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  type="button"
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
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
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandRed focus:border-transparent"
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
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4 border-b-4 border-brandRed inline-block pb-1">
                Book Service
              </h2>

              {/* ✅ Red "Bike" + White "Service & Repair at Home" */}
              <p className="text-2xl mb-4">
                <span className="text-brandRed font-bold">Bike</span>{' '}
                <span className="text-sky-100">Service & Repair at Home</span>
              </p>

              <h3 className="text-3xl font-extrabold text-white mb-6">
                100% Genuine Parts
              </h3>

              {/* ✅ Fixed Button Style */}
              <a
                href="tel:9318478483"
                className="inline-block mb-6 px-6 py-3 bg-brandRed hover:bg-red-700 rounded-full font-bold text-base shadow-md transition"
              >
                📞 Book on Call
              </a>

              {/* App Store Buttons */}
              <div className="flex space-x-4">
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-12"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    className="h-12"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
       
{/* ✅ Top Brands + Services Section */}
<section className="bg-slate-900 text-white py-8">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

    {/* Left: Top Brands */}
    <div className="bg-sky-100 text-center rounded-lg shadow-lg p-8 flex flex-col justify-between">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 whitespace-nowrap">
        Top Brands We <span className="text-brandRed">Service</span>
      </h2>
      <div className="grid grid-cols-3 gap-6">
        <img src={Bajaj} alt="Bajaj" className="mx-auto h-14 object-contain" />
        <img src={Hero} alt="Hero" className="mx-auto h-14 object-contain" />
        <img src={Honda} alt="Honda" className="mx-auto h-14 object-contain" />
        <img src={Jawa} alt="Jawa" className="mx-auto h-14 object-contain" />
        <img src={Ktm} alt="KTM" className="mx-auto h-14 object-contain" />
        <img src={Mahindra} alt="Mahindra" className="mx-auto h-14 object-contain" />
        <img src={RoyalEnfield} alt="Royal Enfield" className="mx-auto h-14 object-contain" />
        <img src={Suzuki} alt="Suzuki" className="mx-auto h-14 object-contain" />
        <img src={Triumph} alt="Triumph" className="mx-auto h-14 object-contain" />
        <img src={Tvs} alt="TVS" className="mx-auto h-14 object-contain" />
        <img src={Vespa} alt="Vespa" className="mx-auto h-14 object-contain" />
        <img src={Yamaha} alt="Yamaha" className="mx-auto h-14 object-contain" />
      </div>
    </div>
{/* Right: Services List */}
<div className="flex flex-col justify-start">
  <h2 className="text-2xl md:text-3xl font-bold mb-3">
    <span className="text-brandRed">Services </span> We Provide<span className="text-brandRed"></span>
  </h2>

  {/* Intro paragraph with merged list */}
  <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
    We offer comprehensive bike and scooter servicing at your home, including:
  </p>

  <ul className="mt-3 space-y-2 text-base md:text-lg lg:text-xl leading-relaxed text-gray-200">
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Regular Bike Maintenance</span> – Full Bike Inspection & Tuning</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Premium Engine Oil Service</span> – Superior engine oil for lasting performance</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Clutch & Brake Maintenance</span> – Parts Health Check & Change</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Chain Inspection & Lubrication</span> –Improves Efficiency & Durability</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Battery Maintenance & Replacement</span> – Dead battery? We’ll replace it instantly</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Scooter Maintenance at Your Doorstep</span> – Certified Technician Gearless Scooter Care</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Urgent Repair Service</span> – Flat Tire or Bike Issues? Help is Just a Call Away</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Rain-Ready Bike Inspection</span> – Rust Protection & Electrical Inspection</span>
    </li>
    <li className="flex items-start lg:whitespace-nowrap">
      <span className="text-brandRed mr-2">♦</span>
      <span><span className="font-semibold text-brandRed">Home Pickup & Delivery</span> – Hassle-Free Pickup for Major Bike Repairs</span>
    </li>
  </ul>
</div>


  </div>
</section>




{/* ✅ Contact Info Section */}
<section className="bg-slate-800 py-12">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    
    {/* Inner Box */}
    <div className="bg-slate-900 rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-white">

      {/* Location */}
      <div className="flex items-start space-x-4">
        <FaMapMarkerAlt className="text-brandRed text-3xl" />
        <div>
          <h3 className="font-bold">Location :</h3>
          <p className="text-gray-300">
            3rd Floor, Ocean Complex, 313, <br />
            Sector 18, Noida, Uttar Pradesh 201301
          </p>
        </div>
      </div>

      {/* Call */}
      <div className="flex items-start space-x-4">
        <FaPhoneAlt className="text-brandRed text-3xl" />
        <div>
          <h3 className="font-bold">Call :</h3>
          <a href="tel:9318478483" className="text-gray-300 hover:text-red-500">
            9318478483
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start space-x-4">
        <FaEnvelope className="text-brandRed text-3xl" />
        <div>
          <h3 className="font-bold">Email :</h3>
          <a
            href="mailto:support@garagefixcare.com"
            className="text-gray-300 hover:text-red-500"
          >
            support@garagefixcare.com
          </a>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="flex items-start space-x-4">
        <FaWhatsapp className="text-brandRed text-3xl" />
        <div>
          <h3 className="font-bold">WhatsApp :</h3>
          <a
            href="https://wa.me/919318478483"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-red-500"
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


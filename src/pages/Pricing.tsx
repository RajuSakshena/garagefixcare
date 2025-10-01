import React, { useState } from "react";
import SEOHelmet from "../components/SEOHelmet";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

interface Service {
  title: string;
  cc: string;
  oldPrice: string;
  newPrice: string;
  features: string[];
  checklist: string[];
}

const services: Service[] = [
  {
    title: "At-Home Regular Service",
    cc: "100 CC, 110 CC, 125 CC.",
    oldPrice: "Rs. 599",
    newPrice: "Rs. 299/-",
    features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"],
    checklist: [
      "Basic Fork Inspection",
      "Basic Hand Cleaning",
      "Basic Engine Inspection",
      "Minor Electrical Check-up",
      "Battery General Check-up",
      "Driven Chain Basic Cleaning",
      "Carburettor Basic Check-up",
      "Brakes – Front & Rear Adjust",
      "Tightening of Screws, Bolts & Nuts",
      "Average and Performance Check-up",
      "Tyre Air Fill (only tubeless)",
      "Engine Oil Change (Price Extra)",
      "Oil Filter Clean (if Replace Charges)",
      "Air Filter Clean (if Replace Charges)",
      "Spark Plug Clean (if Replace Charges)",
      "Free Pick and Drop (if needed)",
    ],
  },
  {
    title: "At-Home Classic Service",
    cc: "135 CC, 160 CC, 200 CC.",
    oldPrice: "Rs. 799",
    newPrice: "Rs. 399/-",
    features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"],
    checklist: [
      "Basic Fork Inspection",
      "Basic Hand Cleaning",
      "Basic Engine Inspection",
      "Minor Electrical Check-up",
      "Battery General Check-up",
      "Driven Chain Basic Cleaning",
      "Carburettor Basic Check-up",
      "Brakes – Front & Rear Adjust",
      "Tightening of Screws, Bolts & Nuts",
      "Average and Performance Check-up",
      "Tyre Air Fill (only tubeless)",
      "Engine Oil Change (Price Extra)",
      "Oil Filter Clean (if Replace Charges)",
      "Air Filter Clean (if Replace Charges)",
      "Spark Plug Clean (if Replace Charges)",
      "Free Pick and Drop (if needed)",
    ],
  },
  {
    title: "At-Home Premium Service",
    cc: "220 CC, 250 CC, 300 CC.",
    oldPrice: "Rs. 1,199",
    newPrice: "Rs. 499/-",
    features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"],
    checklist: [
      "Basic Fork Inspection",
      "Basic Hand Cleaning",
      "Basic Engine Inspection",
      "Minor Electrical Check-up",
      "Battery General Check-up",
      "Driven Chain Basic Cleaning",
      "Carburettor Basic Check-up",
      "Brakes – Front & Rear Adjust",
      "Tightening of Screws, Bolts & Nuts",
      "Average and Performance Check-up",
      "Tyre Air Fill (only tubeless)",
      "Engine Oil Change (Price Extra)",
      "Oil Filter Clean (if Replace Charges)",
      "Air Filter Clean (if Replace Charges)",
      "Spark Plug Clean (if Replace Charges)",
      "Free Pick and Drop (if needed)",
    ],
  },
  {
    title: "At-Home Royal Service",
    cc: "350 CC, 400 CC, 450 CC.",
    oldPrice: "Rs. 1,599",
    newPrice: "Rs. 599/-",
    features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"],
    checklist: [
      "Basic Fork Inspection",
      "Basic Hand Cleaning",
      "Basic Engine Inspection",
      "Minor Electrical Check-up",
      "Battery General Check-up",
      "Driven Chain Basic Cleaning",
      "Carburettor Basic Check-up",
      "Brakes – Front & Rear Adjust",
      "Tightening of Screws, Bolts & Nuts",
      "Average and Performance Check-up",
      "Tyre Air Fill (only tubeless)",
      "Engine Oil Change (Price Extra)",
      "Oil Filter Clean (if Replace Charges)",
      "Air Filter Clean (if Replace Charges)",
      "Spark Plug Clean (if Replace Charges)",
      "Free Pick and Drop (if needed)",
    ],
  },
  {
    title: "At-Home Sports Service",
    cc: "Above 500, 600 CC, 650 CC.",
    oldPrice: "Rs. 2,199",
    newPrice: "Rs. 999/-",
    features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"],
    checklist: [
      "Basic Fork Inspection",
      "Basic Hand Cleaning",
      "Basic Engine Inspection",
      "Minor Electrical Check-up",
      "Battery General Check-up",
      "Driven Chain Basic Cleaning",
      "Carburettor Basic Check-up",
      "Brakes – Front & Rear Adjust",
      "Tightening of Screws, Bolts & Nuts",
      "Average and Performance Check-up",
      "Tyre Air Fill (only tubeless)",
      "Engine Oil Change (Price Extra)",
      "Oil Filter Clean (if Replace Charges)",
      "Air Filter Clean (if Replace Charges)",
      "Spark Plug Clean (if Replace Charges)",
      "Free Pick and Drop (if needed)",
    ],
  },
];

const Pricing: React.FC = () => {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [agree, setAgree] = useState(false);

  return (
    <>
      <SEOHelmet 
        title="Pricing - Transparent Mobile Auto Service Rates | GarageFixCare"
        description="View our transparent pricing for mobile auto services. No hidden fees, upfront pricing for oil changes, brake service, diagnostics, and more. Get a quote today."
      />

      <div className="min-h-screen bg-slate-900">
        {/* ✅ Hero Section (kept) */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-orange-500">Transparent</span>{" "}
              <span className="text-green-600">Pricing</span>
            </h1>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto">
              No Hidden Fees, No Surprises. Just Honest, Upfront Pricing for Quality Automotive Service at Your Location.
            </p>
          </div>
        </section>

        {/* ✅ Price List Section with Left Column */}
<section className="bg-slate-800 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
      At-Home Service{" "}
      <span className="font-bold" style={{ color: "#e50914" }}>
        Price List
      </span>
    </h2>
    <p className="text-center text-lg text-sky-100 max-w-3xl mx-auto mb-12">
      Wondering how much does it cost to service a bike? Bike Repair or
      Motorcycle service cost may depend upon the type of service you opt
      for. Refer below to get the estimated labour of Bike Service.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
      {/* Left Column */}
      <div className="flex flex-col justify-start space-y-6">
        <h3 className="text-4xl font-extrabold leading-snug">
          Save your <span style={{ color: "#e50914" }}>Time</span> and{" "}
          <span style={{ color: "#e50914" }}>Money</span>
        </h3>

        <button
          className="text-white px-6 py-3 rounded-lg font-semibold w-max transition-colors"
          style={{ backgroundColor: "#e50914" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#b20710")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#e50914")
          }
        >
          Service Charges →
        </button>

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

      {/* Right Column - Cards */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-sky-100 text-black rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-1" style={{ color: "#e50914" }}>
              {service.title}
            </h3>
            <p className="text-lg font-bold text-black mb-3">{service.cc}</p>
            <div className="flex items-center space-x-3 mb-3">
              <span className="line-through" style={{ color: "#e50914" }}>
                {service.oldPrice}
              </span>
              <span className="text-green-600 font-bold text-xl">
                {service.newPrice}
              </span>
            </div>
            <ul className="space-y-2 mb-4 text-lg">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setActiveService(service);
                setAgree(false);
              }}
              className="text-white px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#e50914" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#b20710")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#e50914")
              }
            >
              See checklist
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
      </div>

{/* ✅ Floating Buttons */}
<div className="fixed top-1/2 right-6 -translate-y-1/2 flex flex-col space-y-6 z-50">
  {/* Phone Button */}
  <a
    href="tel:9318478483"
    className="w-16 h-16 rounded-full bg-brandRed hover:bg-brandRedDark text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110"
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

      {/* Modal */}
      {activeService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-3 right-3 text-black text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2 text-black">{activeService.title}</h3>
            <p className="text-sm text-red-600 mb-4">{activeService.cc}</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4 text-sm">
              {activeService.checklist.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Yes, I agree to the{" "}
                <a href="#" className="text-red-600 underline">
                  Terms of Service
                </a>
              </span>
            </div>
            <button
              disabled={!agree}
              className={`w-full px-4 py-2 rounded-lg font-semibold ${
                agree
                  ? "bg-red-600 text-white hover:bg-red-600"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pricing;

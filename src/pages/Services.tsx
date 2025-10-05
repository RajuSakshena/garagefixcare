import React, { useState } from "react";
import SEOHelmet from "../components/SEOHelmet";

const Services = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (!phoneNumber) {
      alert("Please enter your phone number to book a service.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/join-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setPhoneNumber('');
      } else {
        alert(`Booking failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <SEOHelmet
        title="Our Services - Mobile Auto Repair & Maintenance | GarageFixCare"
        description="Complete mobile automotive services including oil changes, brake repair, diagnostics, and more. Professional mechanics come to your location with quality parts and tools."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <main className="bg-slate-900 pt-[60px] sm:pt-[90px] lg:pt-[120px]">
          <section className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  <span className="text-blue-600">Our</span>{" "}
                  <span className="text-orange-600">Services</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto">
                  Professional automotive maintenance and repair services delivered
                  directly to your location with convenience and quality you can trust.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Booking Section */}
        <div className="bg-slate-800 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-4 sm:mb-6">
                Bike <span className="text-brandRed">Service</span> &{" "}
                <span className="text-brandRed">Repair</span> at Your Doorstep
              </h1>
              <p className="text-base sm:text-lg text-sky-100 mb-6 sm:mb-8">
                Book Expert Mechanic to Fix your Bike at Your Home
              </p>
              <a
                href="tel:9318478483"
                className="inline-flex items-center justify-center bg-brandRed hover:bg-red-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg mb-6 sm:mb-8 transition"
              >
                Call For Offers & Booking
              </a>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
                <div>
                  <p className="text-2xl sm:text-3xl text-brandRed font-bold">4.7/5</p>
                  <p className="text-base sm:text-xl text-white">
                    Based on 1,00,000+ <br /> Reviews
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl text-brandRed font-bold">100,000+</p>
                  <p className="text-base sm:text-xl text-white">
                    Happy <br /> Customers
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white text-black rounded-lg shadow-xl p-5 sm:p-6 md:p-8">
              <form onSubmit={handleBooking}>
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-brandRed">
                  Bike Service At Home
                </h2>
                <input
                  type="text"
                  placeholder="Phone Number*"
                  className="w-full border rounded-md px-4 py-2 mb-4 sm:mb-6 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button 
                  type="submit"
                  className="w-full bg-brandRed hover:bg-red-400 text-white py-2.5 sm:py-3 rounded-md font-semibold text-base sm:text-lg transition mb-6"
                >
                  Book Now
                </button>
              </form>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center text-xs sm:text-sm mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-brandRed text-xl sm:text-2xl mb-1 sm:mb-2">🛡️</span>
                  <p>10 Days Service Warranty</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-brandRed text-xl sm:text-2xl mb-1 sm:mb-2">🔧</span>
                  <p>Expert Mechanics</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-brandRed text-xl sm:text-2xl mb-1 sm:mb-2">💬</span>
                  <p>Best Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Details Section */}
        <section className="bg-slate-800 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
              Our Services - <span className="text-brandRed">Garage FixCare</span>
            </h2>
            <p className="text-center text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto mb-10 sm:mb-12">
              Welcome to Garage FixCare, where we bring exceptional two-wheeler (bike
              and scooter) service and repair right to your doorstep. Our commitment is
              to provide you with a hassle-free and convenient experience, ensuring your
              two-wheeler stays in optimal condition. Explore the range of services we
              offer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  title: "Regular Servicing:",
                  desc: "Ensure the longevity and performance of your bike or scooter with our regular servicing. Our skilled technicians perform comprehensive checks, oil changes, and tune-ups, keeping your two-wheeler running smoothly.",
                },
                {
                  title: "Breakdown Assistance:",
                  desc: "Stuck on the roadside with a breakdown? Fret not! Garage FixCare offers prompt breakdown assistance. Our technicians will reach your location swiftly, diagnosing and resolving issues on the spot.",
                },
                {
                  title: "Engine Diagnostics:",
                  desc: "For those mysterious engine troubles, our advanced diagnostic tools and experienced technicians will identify the root cause. Trust Garage FixCare to get your engine purring perfectly again.",
                },
                {
                  title: "Battery Replacement:",
                  desc: "Is your bike or scooter struggling to start? Our technicians will assess your battery’s health and, if necessary, provide a swift replacement with high-quality batteries to keep you on the move.",
                },
                {
                  title: "Tire and Tube Replacement:",
                  desc: "Worn-out tires or damaged tubes can compromise your safety. Garage FixCare offers efficient tire and tube replacement services to ensure your two-wheeler maintains excellent traction and stability.",
                },
                {
                  title: "Oil Change:",
                  desc: "Regular oil changes are crucial for engine health. Garage FixCare ensures your bike or scooter receives the right type and amount of oil, promoting smooth functioning and longevity.",
                },
                {
                  title: "And More:",
                  desc: "Our services go beyond routine maintenance. Whether it’s brake repairs, electrical issues, or any other mechanical problem, Garage FixCare has the expertise and equipment to handle it all.",
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="bg-sky-100 rounded-xl shadow-lg p-5 sm:p-6 md:p-8 hover:shadow-xl transition"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-brandRed mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-base sm:text-lg text-black leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;

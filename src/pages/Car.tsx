import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import SEOHelmet from '../components/SEOHelmet';

// Hero carousel images
import heroImage from "../images/mechanic.jpg";
import fortunerImage from "../images/fortuner.png";
import bigGarageCar from "../images/big_garage_car.png";
import bigGarageBike from "../images/big_garage_bike.png";

// Gallery images
import img1 from '../images/New1 (1).jpg';
import img2 from '../images/New1 (2).jpg';
import img3 from '../images/New1 (3).jpg';
import img4 from '../images/New1 (4).jpg';
import img5 from '../images/New1 (5).jpg';
import img6 from '../images/New1 (6).jpg';
import img7 from '../images/New1 (8).jpg';

const Car = () => {
  const navigate = useNavigate();

  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [showInput, setShowInput] = useState(false);
  const [modalPhoneNumber, setModalPhoneNumber] = useState('');

  // Custom hero carousel — no react-slick
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [heroImage, fortunerImage, bigGarageCar, bigGarageBike];
  const heroAlts = ["Mechanic working", "Fortuner repair", "Car garage", "Bike garage"];

  // Custom gallery — no react-image-gallery
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryImages = [img1, img2, img3, img4, img5, img6, img7];

  useEffect(() => {
    const targetCount = 100000;
    const duration = 2000;
    const increment = Math.ceil(targetCount / (duration / 10));
    if (happyCustomersCount < targetCount) {
      const timer = setInterval(() => {
        setHappyCustomersCount(prevCount => {
          const newCount = prevCount + increment;
          if (newCount >= targetCount) { clearInterval(timer); return targetCount; }
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
      if (currentScore >= targetScore) { currentScore = targetScore; clearInterval(timer); }
      setReviewScore(parseFloat(currentScore.toFixed(1)));
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 2500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setGalleryIndex(i => (i + 1) % galleryImages.length), 3000);
    return () => clearInterval(t);
  }, []);

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
        title="Doorstep Car Service in Delhi NCR | Garage Fix Care"
        description="Professional car repair and servicing at your doorstep in Noida, Delhi, Gurgaon and Ghaziabad. Certified mechanics, genuine parts, AC and brake service."
        keywords="car service near me, doorstep car service, car repair delhi ncr, car ac service, car battery replacement, car engine repair, garage fix care car"
        canonical="https://www.garagefixcare.in/car"
        robots="index, follow"
        og={{
          title: "Doorstep Car Service in Delhi NCR | Garage Fix Care",
          description: "Expert car repair, servicing and maintenance at your doorstep across Delhi NCR — AC service, brakes, engine repair and more.",
          url: "https://www.garagefixcare.in/car",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep car service and repair in Delhi NCR by Garage Fix Care",
          type: "website",
        }}
        twitter={{
          title: "Doorstep Car Service in Delhi NCR | Garage Fix Care",
          description: "Certified mechanics, genuine parts, and doorstep car service across Delhi NCR.",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep car repair and servicing in Delhi NCR",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": "Garage Fix Care",
            "description": "Doorstep car repair and servicing across Delhi NCR — AC service, battery replacement, brake repair and engine diagnostics.",
            "url": "https://www.garagefixcare.in/car",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "areaServed": [
              { "@type": "City", "name": "Noida" },
              { "@type": "City", "name": "Delhi" },
              { "@type": "City", "name": "Gurugram" },
              { "@type": "City", "name": "Ghaziabad" },
              { "@type": "City", "name": "Greater Noida" },
              { "@type": "City", "name": "Faridabad" }
            ],
            "serviceType": ["Car Repair", "Doorstep Car Service", "AC Service", "Battery Replacement", "Brake Repair", "Engine Diagnostics"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Car Service", "item": "https://www.garagefixcare.in/car" }
            ]
          }
        ]}
      />

      <div className="min-h-screen">
        <main className="bg-slate-800 pt-[76px] sm:pt-[112px] lg:pt-[120px]">
          <section className="text-white py-8 sm:py-10 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                {/* Left Side */}
                <div>
                  <h1 className="text-brandRed text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                    Professional Bikes &amp; Cars Service
                    <span className="text-orange-500"> At Your Doorstep</span>
                  </h1>
                  <p className="font-poppins text-sm sm:text-base leading-relaxed text-white/90 mb-6 sm:mb-8">
                    Enjoy professional bike care right at your doorstep. Our expert mechanics come to you with the right tools and parts, saving you time while keeping your bike in top condition—no workshop visit needed.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                    {!showInput ? (
                      <>
                        <button
                          onClick={() => setShowInput(true)}
                          className="w-full sm:w-auto bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-orange-700 transition-all duration-300 active:scale-95"
                        >
                          Book Service Now
                        </button>
                        <a
                          href="tel:9540553759"
                          className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Call Now
                        </a>
                      </>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full opacity-100">
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
                                serviceType: "Doorstep Car Service",
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

                  <div className="mt-8 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 text-center tracking-tight">Select Your Vehicle</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 hover:border-slate-400 text-white py-4 sm:py-5 rounded-2xl font-semibold text-base transition-all duration-300 active:scale-95 touch-manipulation"
                      >
                        <Bike className="h-6 w-6" />
                        <span>Bike &amp; Scooty</span>
                      </button>
                      <button className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-4 sm:py-5 rounded-2xl font-semibold text-base transition-all duration-300 shadow-inner active:scale-95 touch-manipulation">
                        <CarIcon className="h-6 w-6" />
                        <span>Cars</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Custom Hero Carousel */}
                <div className="relative flex flex-col items-center lg:items-end gap-6 mt-8 lg:mt-0">
                  <div className="relative w-full">
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={heroImages[heroIndex]}
                        alt={heroAlts[heroIndex]}
                        className="w-full aspect-video object-cover max-h-[260px] sm:max-h-[340px] lg:max-h-none transition-opacity duration-700"
                      />
                    </div>
                    <button
                      onClick={() => setHeroIndex(i => (i - 1 + heroImages.length) % heroImages.length)}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 sm:p-3 rounded-2xl shadow-lg transition-all duration-200 z-20 flex items-center justify-center"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={() => setHeroIndex(i => (i + 1) % heroImages.length)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 sm:p-3 rounded-2xl shadow-lg transition-all duration-200 z-20 flex items-center justify-center"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <div className="bg-sky-100 text-black p-4 rounded-2xl shadow-lg flex-1 w-full sm:w-auto">
                      <div className="flex items-center justify-center gap-2 text-lg font-bold">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {reviewScore.toFixed(1)}/5
                      </div>
                      <div className="text-xs font-semibold text-center">Google Review</div>
                    </div>
                    <div className="bg-sky-100 text-black p-4 rounded-2xl shadow-lg flex-1 w-full sm:w-auto">
                      <div className="text-lg font-bold text-center">{happyCustomersCount.toLocaleString()}+</div>
                      <div className="text-xs font-semibold text-center">Happy Customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Marquee */}
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
                    <span key={`${repetitionIndex}-${index}`} className={`ml-3 sm:ml-6 md:ml-8 tracking-wider flex-shrink-0 font-bold text-xs sm:text-sm ${city.color}`}>
                      {city.name}
                    </span>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 1. SERVICES SECTION */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Expert <span className="text-red-600">Car Services</span></h2>
              <p className="text-white/70 mt-3 text-base sm:text-lg">Premium care. Delivered to your doorstep.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: <Settings className="h-7 w-7" />, title: "General Service", desc: "Full routine maintenance including oil, filters, and 30-point inspection." },
                { icon: <Wrench className="h-7 w-7" />, title: "Engine Repair", desc: "Expert diagnosis and repair of engine problems, from minor to major." },
                { icon: <Droplet className="h-7 w-7" />, title: "Oil Change", desc: "Premium synthetic oil + filter replacement for smooth performance." },
                { icon: <Thermometer className="h-7 w-7" />, title: "AC Service", desc: "Gas refill, deep cleaning, and full AC performance restoration." },
                { icon: <ShieldCheck className="h-7 w-7" />, title: "Brake Service", desc: "Brake pads, discs, fluid, and complete safety inspection." },
                { icon: <Battery className="h-7 w-7" />, title: "Battery Replacement", desc: "Instant testing and replacement with warranty-backed batteries." },
                { icon: <ShowerHead className="h-7 w-7" />, title: "Car Wash", desc: "Premium exterior + interior detailing and deep cleaning." },
                { icon: <Hammer className="h-7 w-7" />, title: "Denting & Painting", desc: "Professional body repair and factory-finish painting." },
              ].map((s, i) => (
                <div key={i} className="group bg-sky-100 text-black rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-black text-sm leading-relaxed flex-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. CHECKLIST + CUSTOM GALLERY */}
        <section className="py-12 sm:py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">What's Included in Every Service</h2>
                <p className="text-slate-100 text-base sm:text-lg">Our certified technicians follow a strict 40-point checklist so your car performs at its best.</p>
                <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
                  {[
                    { title: "Engine oil & filter inspection", desc: "Level check + top-up/replacement using premium oil" },
                    { title: "Brake system inspection", desc: "Pads, discs, fluid level & emergency brake test" },
                    { title: "Battery health & charging test", desc: "Voltage, terminals & alternator performance" },
                    { title: "AC cooling performance", desc: "Gas level, compressor & cabin filter check" },
                    { title: "Tyre condition & pressure", desc: "Tread depth, alignment & spare tyre" },
                    { title: "All fluid levels & top-up", desc: "Coolant, brake, power steering & transmission" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-slate-300">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Gallery — no react-image-gallery */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <div className="relative w-full bg-black">
                    <img
                      src={galleryImages[galleryIndex]}
                      alt={`Car service photo ${galleryIndex + 1}`}
                      className="w-full object-cover max-h-[320px] sm:max-h-[400px] transition-opacity duration-500"
                    />
                    <button
                      onClick={() => setGalleryIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-xl z-10"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setGalleryIndex(i => (i + 1) % galleryImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-xl z-10"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  {/* Thumbnails */}
                  <div className="flex gap-2 p-3 bg-slate-900 overflow-x-auto">
                    {galleryImages.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        onClick={() => setGalleryIndex(i)}
                        className={`h-14 w-20 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all duration-200 ${galleryIndex === i ? 'ring-2 ring-orange-500 opacity-100' : 'opacity-50 hover:opacity-80'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRICING */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Simple &amp; Transparent <span className="text-red-600">Pricing</span></h2>
              <p className="text-white/70 mt-3">No hidden charges. Ever.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <div className="bg-sky-100 text-black border border-transparent rounded-3xl p-6 sm:p-8 hover:border-sky-200 transition-all h-full flex flex-col">
                <div className="uppercase text-xs tracking-widest font-semibold mb-4 text-orange-400">Basic</div>
                <div className="text-5xl font-bold mb-1">₹1,499</div>
                <p className="text-slate-600 text-sm">Ideal for quick maintenance</p>
                <ul className="mt-8 space-y-4 text-sm flex-1">
                  {["30-point inspection", "Oil top-up", "Tyre pressure check", "Brake visual check"].map((f, i) => (
                    <li key={i} className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />{f}</li>
                  ))}
                </ul>
                <button className="mt-auto w-full py-4 border border-slate-300 hover:bg-slate-100 rounded-2xl text-black font-semibold transition-colors">Choose Basic</button>
              </div>
              <div className="bg-sky-100 text-black rounded-3xl p-6 sm:p-8 shadow-2xl relative scale-105 ring-2 ring-orange-400 h-full flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-8 py-1.5 rounded-3xl">MOST POPULAR</div>
                <div className="uppercase text-xs tracking-widest font-semibold mb-4 text-orange-600">Standard</div>
                <div className="text-5xl font-bold text-black mb-1">₹2,999</div>
                <p className="text-slate-600 text-sm">Complete routine service</p>
                <ul className="mt-8 space-y-4 text-black text-sm flex-1">
                  {["Everything in Basic", "Full engine tune-up", "AC gas refill", "Battery health test", "40-point checklist"].map((f, i) => (
                    <li key={i} className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />{f}</li>
                  ))}
                </ul>
                <button className="mt-auto w-full py-4 bg-orange-600 text-white rounded-2xl font-semibold hover:bg-orange-700 transition-colors">Choose Standard</button>
              </div>
              <div className="bg-sky-100 text-black border border-transparent rounded-3xl p-6 sm:p-8 hover:border-sky-200 transition-all h-full flex flex-col">
                <div className="uppercase text-xs tracking-widest font-semibold mb-4 text-orange-400">Premium</div>
                <div className="text-5xl font-bold mb-1">₹4,999</div>
                <p className="text-slate-600 text-sm">Full car rejuvenation</p>
                <ul className="mt-8 space-y-4 text-sm flex-1">
                  {["Everything in Standard", "Deep engine service", "Interior detailing", "Denting touch-up"].map((f, i) => (
                    <li key={i} className="flex items-center gap-x-3"><CheckCircle className="h-4 w-4 text-emerald-400" />{f}</li>
                  ))}
                </ul>
                <button className="mt-auto w-full py-4 border border-slate-300 hover:bg-slate-100 rounded-2xl text-black font-semibold transition-colors">Choose Premium</button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROCESS */}
        <section className="py-12 sm:py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">How GarageFixCare Works</h2>
              <p className="text-slate-100 mt-3">4 simple steps to doorstep car care</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: <Calendar className="h-9 w-9" />, num: "01", title: "Book Service", desc: "Choose your service and preferred time slot in seconds." },
                { icon: <Users className="h-9 w-9" />, num: "02", title: "Technician Assigned", desc: "We match the best expert for your car model instantly." },
                { icon: <HomeIcon className="h-9 w-9" />, num: "03", title: "Doorstep Service", desc: "Mechanic arrives at your location with all tools & parts." },
                { icon: <CreditCard className="h-9 w-9" />, num: "04", title: "Pay & Rate", desc: "Pay only after satisfaction. Leave feedback for us." },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">{s.icon}</div>
                  <div className="font-mono text-3xl font-bold text-orange-500 mb-3">{s.num}</div>
                  <h4 className="font-semibold text-xl mb-2 text-white">{s.title}</h4>
                  <p className="text-slate-100 text-sm sm:text-base">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Real Owners. Real Stories.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { review: "My Fortuner's engine issue was fixed at my society gate in just 90 minutes. Transparent, professional, and genuine parts used!", name: "Vikram Singh", vehicle: "Toyota Fortuner • Greater Noida" },
                { review: "AC service was done perfectly at my home. The mechanic even showed me before/after videos. Best decision ever!", name: "Neha Kapoor", vehicle: "Honda City • Gurugram" },
                { review: "Brake service + oil change done in 45 mins. Saved me a full day at the workshop. Highly recommended!", name: "Arjun Mehra", vehicle: "Mahindra Scorpio • Delhi" },
              ].map((t, i) => (
                <div key={i} className="bg-sky-100 text-black rounded-3xl p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex text-orange-400 mb-6">{Array(5).fill(0).map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}</div>
                  <p className="text-black italic mb-8 leading-relaxed text-sm sm:text-base flex-1">"{t.review}"</p>
                  <div className="flex items-center gap-x-4 mt-auto">
                    <div className="h-10 w-10 bg-slate-200 rounded-2xl"></div>
                    <div>
                      <p className="font-semibold text-black">{t.name}</p>
                      <p className="text-xs text-slate-600">{t.vehicle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-[-0.5px]">Book Your Car Service Today</h2>
            <p className="max-w-md mx-auto text-lg sm:text-xl mb-10 opacity-90">Professional care at your doorstep. Certified experts. 100% satisfaction guaranteed.</p>
            <a href="tel:9540553759" className="w-full sm:w-auto mx-auto inline-flex items-center justify-center px-8 sm:px-12 py-5 sm:py-6 bg-white text-orange-600 hover:bg-amber-100 rounded-3xl font-semibold text-xl sm:text-2xl transition-all shadow-2xl">
              Get Started in 30 Seconds
            </a>
          </div>
        </section>
      </div>

      {/* Floating Buttons */}
      <div className="fixed top-1/2 right-4 sm:right-6 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
        <a href="tel:9540553759" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110" aria-label="Call Us">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </a>
        <a href="https://wa.me/9540553759" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110" aria-label="Chat on WhatsApp">
          <FaWhatsapp size={24} className="sm:text-3xl" />
        </a>
      </div>
    </>
  );
};

export default Car;
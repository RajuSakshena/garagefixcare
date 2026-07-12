import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X, Plus, Phone as PhoneIcon, ChevronLeft, ChevronRight, Bike, Car } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

// Only used images
import bikeServiceOfferImage from '../images/offer11.jpg';
import doorstepImage from '../images/offer22.jpg';
import engineImage from '../images/offer33.jpg';
import roadsideImage from '../images/offer44.jpg';
import googleReviewsImage from '../images/google1.png';
import facebookReviewsImage from '../images/facebook1.png';
import justdialReviewsImage from '../images/justdial1.png';
import mechanicImage from '../images/image.jpg';
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
import googleIcon from "../images/Testimonial1.png";
import testimonial1 from "../images/Testimonial1.jpeg";
import testimonial2 from "../images/Testimonial2.jpeg";
import testimonial3 from "../images/Testimonial3.jpeg";
import testimonial4 from "../images/Testimonial4.jpeg";
import heroImage from "../images/mechanic.jpg";
import bigGarageCar from "../images/big_garage_car.png";
import bigGarageBike from "../images/big_garage_bike.png";

interface RepairPlan {
  title: string;
  subtitle: string;
  checklist: string[];
}

const BestBikeServiceNewDelhi = () => {
  const [totalRidersHelped, setTotalRidersHelped] = useState(0);
  const [liveRating, setLiveRating] = useState(4.5);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [chosenPlan, setChosenPlan] = useState<RepairPlan | null>(null);
  const [mobileInput, setMobileInput] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const routeTo = useNavigate();

  // Hero rotating banner
  const [slideNo, setSlideNo] = useState(0);
  const slideImages = [heroImage, bigGarageBike, mechanicImage, bigGarageCar];
  const slideText = [
    "Doorstep bike mechanic near India Gate",
    "On-site two-wheeler repair near Mandi House",
    "Trained bike technician serving New Delhi",
    "Verified mechanic visiting near Central Secretariat"
  ];
  useEffect(() => {
    const slideTimer = setInterval(() => setSlideNo(s => (s + 1) % slideImages.length), 2500);
    return () => clearInterval(slideTimer);
  }, []);

  const dealBanners = [
    { src: bikeServiceOfferImage, alt: "Bike service deal near New Delhi" },
    { src: doorstepImage, alt: "Doorstep bike repair near ITO" },
    { src: engineImage, alt: "Bike engine repair near Pragati Maidan" },
    { src: roadsideImage, alt: "Roadside bike assistance near Tilak Marg" },
  ];

  // Animated counters
  useEffect(() => {
    const finalTotal = 100000;
    const span = 2000;
    const stepSize = Math.ceil(finalTotal / (span / 10));
    if (totalRidersHelped < finalTotal) {
      const counterClock = setInterval(() => {
        setTotalRidersHelped(prev => {
          const next = prev + stepSize;
          if (next >= finalTotal) {
            clearInterval(counterClock);
            return finalTotal;
          }
          return next;
        });
      }, 10);
      return () => clearInterval(counterClock);
    }
  }, [totalRidersHelped]);

  useEffect(() => {
    const finalRating = 4.7;
    const span = 1000;
    const tick = 10;
    const increment = (finalRating - liveRating) / (span / tick);
    let runningTotal = liveRating;
    const ratingClock = setInterval(() => {
      runningTotal += increment;
      if (runningTotal >= finalRating) {
        runningTotal = finalRating;
        clearInterval(ratingClock);
      }
      setLiveRating(parseFloat(runningTotal.toFixed(1)));
    }, tick);
    return () => clearInterval(ratingClock);
  }, []);

  const repairPlans = [
    { title: "Capital Basic Plan", subtitle: "100 CC - 125 CC", originalPrice: "Rs. 569", discountedPrice: "Rs. 285", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Capital Standard Plan", subtitle: "135 CC - 200 CC", originalPrice: "Rs. 769", discountedPrice: "Rs. 375", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Capital Comfort Plan", subtitle: "220 CC - 300 CC", originalPrice: "Rs. 1,129", discountedPrice: "Rs. 465", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Capital Cruiser Plan", subtitle: "350 CC - 450 CC", originalPrice: "Rs. 1,529", discountedPrice: "Rs. 569", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Capital Superbike Plan", subtitle: "Above 500 CC", originalPrice: "Rs. 2,079", discountedPrice: "Rs. 939", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] }
  ];

  const detailedChecklist = [
    "Coolant Level Inspection", "Quick Body Wipe-Down", "Chain & Pivot Greasing", "Battery Health Check",
    "Engine Idle & Sound Check", "Front Fork Inspection", "Carburettor Quick Tune", "Lights & Wiring Check",
    "Front & Rear Brake Setting", "Drive Chain Cleaning", "Bolt & Nut Tightening",
    "Mileage & Power Check", "Engine Oil Replacement (Billed Separately)", "Oil Filter Swap (If Needed)",
    "Air Filter Swap (If Needed)", "Spark Plug Swap (If Needed)", "Tubeless Tyre Air Refill",
    "Free Pickup & Drop (On Request)"
  ];

  const openPlanModal = (title: string, subtitle: string) => {
    setChosenPlan({ title, subtitle, checklist: detailedChecklist });
    setMobileInput('');
    setPlanModalOpen(true);
  };

  const closePlanModal = () => {
    setPlanModalOpen(false);
    setChosenPlan(null);
    setMobileInput('');
  };

  const confirmRepairBooking = async () => {
    if (!mobileInput || mobileInput.length !== 10) {
      alert('Please enter a valid 10-digit mobile number to continue.');
      return;
    }
    if (!chosenPlan) return;
    try {
      const serviceType = `${chosenPlan.title} (${chosenPlan.subtitle})`;
      await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
        phoneNumber: mobileInput,
        serviceType: serviceType
      });
      alert('Booking confirmed! Our New Delhi team will call you shortly to finalise your slot.');
      closePlanModal();
    } catch (error) {
      alert('We could not complete your booking. Please try again.');
      console.error('Error booking service:', error);
    }
  };

  const ncrZoneStrip = [
    { name: "New Delhi", color: "text-indigo-700" },
    { name: "Connaught Place", color: "text-red-700" },
    { name: "Gurgaon", color: "text-teal-700" },
    { name: "Noida", color: "text-gray-900" },
    { name: "Faridabad", color: "text-orange-700" },
    { name: "Ghaziabad", color: "text-slate-700" },
  ];

  const landmarkCoverage = [
    "India Gate", "Pragati Maidan", "Mandi House", "ITO",
    "Connaught Place", "Parliament House", "Central Secretariat",
    "Tilak Marg", "Supreme Court", "National Stadium"
  ];

  const linkedCityPages = [
    { name: "Gurgaon", path: "/best-bike-service-gurgaon" },
    { name: "Connaught Place", path: "/best-bike-service-connaught-place" },
    { name: "Uttam Nagar", path: "/best-bike-service-uttam-nagar" },
    { name: "Noida", path: "/best-bike-service-noida" },
    { name: "Faridabad", path: "/best-bike-service-faridabad" },
  ];

  return (
    <>
      <SEOHelmet
        title="Bike Service Near India Gate & New Delhi | Doorstep Repair ₹285 | Garage Fix Care"
        description="Doorstep bike service across New Delhi's government and heritage belt — India Gate, Pragati Maidan, ITO, Mandi House — starting at ₹285 with verified mechanics."
        canonical="https://www.garagefixcare.in/best-bike-service-new-delhi"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-new-delhi",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep bike mechanic serving the New Delhi central zone near India Gate",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Garage Fix Care doorstep bike service near India Gate, New Delhi",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Doorstep bike repair and servicing across New Delhi's central zone, covering India Gate, Pragati Maidan, ITO, Mandi House and nearby landmarks, starting at ₹285.",
            "url": "https://www.garagefixcare.in/best-bike-service-new-delhi",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "New Delhi",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.6129", "longitude": "77.2295" },
            "areaServed": [
                { "@type": "Place", "name": "India Gate" },
                { "@type": "Place", "name": "Pragati Maidan" },
                { "@type": "Place", "name": "Mandi House" },
                { "@type": "Place", "name": "ITO" },
                { "@type": "Place", "name": "Connaught Place" },
                { "@type": "Place", "name": "Parliament House" },
                { "@type": "Place", "name": "Central Secretariat" },
                { "@type": "Place", "name": "Tilak Marg" },
                { "@type": "Place", "name": "Supreme Court" },
                { "@type": "Place", "name": "National Stadium" }
              ],
            "serviceType": ["Doorstep Bike Repair", "Bike Servicing", "Engine Repair", "Battery Replacement", "Brake Repair", "Puncture Repair"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Doorstep Bike Service in New Delhi",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "New Delhi",
            "description": "On-demand bike servicing at your location starting at ₹285, including oil change, brake adjustment, battery check, and puncture repair across central New Delhi.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "285", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does doorstep bike service cost near India Gate?", "acceptedAnswer": { "@type": "Answer", "text": "Doorstep bike service near India Gate starts at ₹285 under the Capital Basic Plan for 100-125cc bikes, going up to ₹939 for the Capital Superbike Plan, all inclusive of labour." } },
              { "@type": "Question", "name": "Do you cover bike repair near Pragati Maidan and ITO?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, mechanics regularly attend bookings near Pragati Maidan and ITO, arriving fully equipped to complete most repairs on the spot." } },
              { "@type": "Question", "name": "Which New Delhi landmarks fall within your service zone?", "acceptedAnswer": { "@type": "Answer", "text": "We serve the stretch around India Gate, Pragati Maidan, Mandi House, ITO, Connaught Place, Parliament House, Central Secretariat, Tilak Marg, Supreme Court, and National Stadium." } },
              { "@type": "Question", "name": "Can a mechanic reach me near Central Secretariat on short notice?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, bookings near Central Secretariat are typically attended within 2-4 hours. A phone call helps us prioritise urgent breakdown requests." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Bike Service Near India Gate, New Delhi", "item": "https://www.garagefixcare.in/best-bike-service-new-delhi" }
            ]
          }
        ]}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <main className="bg-slate-800 pt-[76px] sm:pt-[112px] lg:pt-[120px]">
          <section className="text-white py-2 sm:py-2 lg:py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
                {/* Left Side */}
                <div>
                  <h1 className="text-brandRed text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                    Bike Service Near India Gate & New Delhi
                    <span className="text-orange-500"> — Doorstep Repair from ₹285</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Starting at ₹285 • Mechanics Near Every Landmark • Same-Day Slots
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    Parking is scarce and traffic restrictions are tight around India Gate, Pragati Maidan, and the Parliament House belt — which makes a workshop visit a genuine chore. Garage Fix Care sends a trained mechanic to wherever you have parked across this stretch of New Delhi, handling everything from a routine oil change to a full engine job without you moving an inch.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ From ₹285", "✔ Same-Day Repair", "✔ Mechanic Reaches You", "✔ Verified Technicians", "✔ Honest, Itemised Billing"].map((point, i) => (
                      <span key={i} className="font-medium">{point}</span>
                    ))}
                  </div>

                  {/* Book + Call Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-orange-700 transition-all duration-300 inline-block">
                      Request a Mechanic
                    </a>
                    <a href="tel:9540553759" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> Call Now</a>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="mt-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-4 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 text-center">Tell Us Your Vehicle Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-semibold text-base transition-all duration-300"><Bike className="h-6 w-6" /><span>Bike &amp; Scooty</span></button>
                      <button onClick={() => routeTo('/car')} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 text-white py-3 rounded-2xl font-semibold text-base"><Car className="h-6 w-6" /><span>Cars</span></button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Carousel + Reviews */}
                <div className="relative flex flex-col items-center lg:items-end gap-1">
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                    <img src={slideImages[slideNo]} alt={slideText[slideNo]} className="w-full rounded-lg transition-opacity duration-700" style={{ minHeight: '200px', objectFit: 'cover' }} />
                    <button onClick={() => setSlideNo(s => (s - 1 + slideImages.length) % slideImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronLeft className="h-6 w-6" /></button>
                    <button onClick={() => setSlideNo(s => (s + 1) % slideImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronRight className="h-6 w-6" /></button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {slideImages.map((_, i) => <button key={i} onClick={() => setSlideNo(i)} className={`w-2 h-2 rounded-full transition-all ${i === slideNo ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="flex items-center justify-center gap-2 text-lg font-bold"><Star className="h-4 w-4 text-yellow-400 fill-current" />{liveRating.toFixed(1)}/5</div><div className="text-xs font-semibold">Google Rating</div></div>
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="text-lg font-bold">{totalRidersHelped.toLocaleString()}+</div><div className="text-xs font-semibold">Riders Helped</div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Marquee cities */}
        <div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
          <div className="flex items-center text-sm font-semibold max-w-7xl mx-auto">
            <div className="flex-shrink-0 px-2"><span className="text-red-600 mr-1 font-bold">Mechanics On Standby</span><span className="text-brandRed font-bold"> (10% Off Today)</span></div>
            <div className="flex-1 overflow-hidden"><div className="flex items-center animate-marquee">{[...Array(3)].map((_, repIdx) => ncrZoneStrip.map((zone, idx) => <span key={`${repIdx}-${idx}`} className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm ${zone.color}`}>{zone.name}</span>))}</div></div>
          </div>
        </div>

        {/* Hot Deals Carousel */}
        <section className="py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center mb-8"><div className="flex items-center"><h2 className="text-2xl sm:text-4xl font-bold mr-4"><span className="text-white">Live Offers</span> <span className="text-red-600">in New Delhi</span></h2><Flame className="h-8 w-8 text-orange-500" /></div><p className="text-lg text-white text-center">Limited-time savings for riders near India Gate, Pragati Maidan, and the surrounding government zone. Book before the slots run out!</p></div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }} onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...dealBanners, ...dealBanners].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1"><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">New Delhi</span><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Central Zone</span></div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </section>

        {/* What Clients Say */}
        <section className="bg-slate-800 text-black py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 text-center mb-4"><h2 className="text-xl sm:text-3xl font-bold"><span className="text-white">Straight From</span> <span className="text-red-600">Our Riders</span></h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto px-2">
            {[{ img: googleReviewsImage, name: "Google", rating: "4.7/5", link: "https://goo.gl/maps/dqmKivbhftEaVxK79" }, { img: facebookReviewsImage, name: "Facebook", rating: "4.7/5", link: "https://www.instagram.com/p/DQVj8SmktgG/" }, { img: justdialReviewsImage, name: "JustDial", rating: "4.7/5", link: "https://www.justdial.com/jd-business?docid=011PXX11.XX11.251024223108.U1U5" }].map((rev, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-3 shadow-sm text-center"><img src={rev.img} alt={rev.name} className="mx-auto h-10 mb-2" /><div className="flex justify-center mb-1">{[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 text-yellow-400 fill-current" />)}</div><p className="font-semibold text-sm">{rev.rating} Rating</p><a href={rev.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">view us on {rev.name}</a></div>
            ))}
          </div>
        </section>

        {/* At-Home Service Price List */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4"><span className="text-white">New Delhi Service</span> <span className="text-red-600">Rate Card</span></h2>
            <p className="text-xl text-white mb-6">Straightforward, upfront pricing for doorstep bike service across central New Delhi. The only variable is your engine size — nothing else changes the bill.</p>
            <div className="grid grid-cols-2 gap-3 justify-items-center">
              {repairPlans.map((service, idx) => (
                <div key={idx} className="bg-brandRed p-1 rounded-lg w-full"><div className="bg-sky-100 rounded-lg p-2"><div className="text-left"><h3 className="text-base font-bold">{service.title}</h3><p className="text-xs font-semibold">{service.subtitle}</p><div><span className="line-through text-red-500 mr-1">{service.originalPrice}</span><span className="text-green-600 font-bold">{service.discountedPrice}/-</span></div></div><ul className="list-none text-left text-xs mt-1">{service.features.map((f, fi) => <li key={fi} className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />{f}</li>)}</ul><div className="flex justify-end mt-1"><button onClick={() => openPlanModal(service.title, service.subtitle)} className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">See full checklist</button></div></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Covered Section */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Covering the Heart of <span className="text-red-600">New Delhi</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {landmarkCoverage.map(area => <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>)}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">Whether your bike is parked near India Gate, Pragati Maidan, Mandi House, ITO, Connaught Place, the Parliament House complex, Central Secretariat, Tilak Marg, the Supreme Court, or National Stadium, our mechanics reach you within 2-4 hours. Same-day visits are available throughout this central zone.</p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Full Bike Care, <span className="text-red-600">Delivered Right Where You're Parked</span></h2>
            <p className="text-white mb-6">From a quick servicing run to a deeper engine fix — our New Delhi mechanics are equipped for both.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {["General Servicing", "Engine Repair", "Battery Replacement", "Brake Repair", "Tyre & Puncture", "Insurance Assistance"].map(service => (
                <div key={service} className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm">{service}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Bike Service Content */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Doorstep Bike Service in <span className="text-red-600">New Delhi's Central Zone</span></h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>The stretch around India Gate, Pragati Maidan, and the Parliament House belt is among the most tightly regulated parts of the capital, with security checkpoints, restricted parking, and constant VIP movement making a regular workshop trip genuinely difficult. Garage Fix Care solves this by sending a trained mechanic directly to wherever you have legally parked, whether that's a lane near Mandi House, a side road off ITO, or a spot close to the Supreme Court. Doorstep service in this zone starts at ₹285, covering an engine oil change, filter cleaning, spark plug check, and brake adjustment, with the work finished without you needing to navigate a single checkpoint. We work on every major two-wheeler brand seen around Connaught Place and Central Secretariat — Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, and Royal Enfield — along with scooties like the Activa that staff and commuters rely on daily near National Stadium. Every job comes with a written estimate shared before work begins, so the quote you agree to is the amount you pay once the mechanic finishes.</p>
              <p>The constant idling traffic near Tilak Marg and the loop around India Gate puts extra strain on brake pads, batteries, and engine oil, and our mechanics are trained to spot this kind of wear early rather than after it causes a breakdown. If your bike does give up suddenly anywhere between Pragati Maidan and the Central Secretariat, one call sends a technician straight to your location for an on-the-spot fix — no towing required. We routinely manage battery replacements, brake pad swaps, clutch adjustments, and tubeless puncture repairs right at the roadside. Garage Fix Care has now completed over 1,00,000 services across Delhi NCR, holding a steady 4.7-star rating on Google for reliability and clear communication. Reach out through our website, a WhatsApp message, or a direct call, and get professional bike care delivered without leaving New Delhi's central zone.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><p className="text-xs">Flat ₹10 Off Your First New Delhi Booking</p><h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Service Pledge</span></h2><p className="mb-4">New Delhi's reliable doorstep bike mechanic. We work on every common motorcycle and scooter brand — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right where you've parked near any central landmark.</p><div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ img: warrantyImg, title: "10-Day Service Guarantee", desc: "Worry-free coverage" }, { img: pickupImg, title: "Free Pickup & Drop", desc: "No travel required" }, { img: transparentImg, title: "Clear, Itemised Pricing", desc: "Save up to 30%" }, { img: trainedImg, title: "Verified, Trained Mechanics", desc: "Skilled every visit" }].map((item, idx) => (
                <div key={idx} className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3"><img src={item.img} alt={item.title} className="h-10 w-10 object-contain" /><div><h3 className="font-bold text-sm">{item.title}</h3><p className="text-xs">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div className="order-2 lg:order-1"><img src={handshakeImg} alt="Handshake" className="rounded-lg shadow-lg w-full max-w-sm" /></div>
            <div className="order-1"><h2 className="text-3xl font-bold mb-2">Why Riders Near India Gate Choose <span className="text-red-600">GarageFixCare</span></h2><p>We bring the workshop to you across New Delhi's central belt — fair pricing, genuine parts, no detours to a garage.</p><ul className="space-y-2 mt-4">{["Mechanic Comes to Your Spot", "Verified, Trained Technicians", "Transparent, No-Surprise Pricing", "Genuine Spare Parts Only", "Backed by a Service Guarantee", "Quick, Professional Turnaround"].map(item => <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>)}</ul></div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-12 bg-slate-900 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Backed by <span className="text-red-600">Trusted Brands</span> and <span className="text-red-600">1,00,000+ Riders</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 justify-items-center">
            {[{ name: "WURTH", img: wurthImg }, { name: "MOTUL", img: motulImg }, { name: "Turtlemint", img: turtlemintImg }, { name: "Buniyad", img: buniyadImg }, { name: "Dunzo", img: dunzoImg }].map(brand => <div key={brand.name} className="bg-white rounded-lg p-3 w-32 h-20 flex items-center justify-center"><img src={brand.img} alt={brand.name} className="max-h-12 object-contain" /></div>)}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><h2 className="text-3xl font-bold text-white mb-2">Booking a Mechanic Near <span className="text-red-600">India Gate</span> is Simple</h2><p className="text-white mb-4">Share your bike's issue and your nearest landmark, and a mechanic is on the way.</p><ul className="space-y-2">{["Share Location & Bike Issue", "We Assign the Nearest Mechanic", "Repair Done at Your Parking Spot", "Clear Cost Breakdown Shared", "Quality Checked Before Handover", "Easy Payment, Quick Feedback"].map(s => <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> {s}</li>)}</ul></div>
            <div className="flex justify-center"><img src={howWorksImage} alt="How it works" className="rounded-lg shadow-lg max-w-sm" /></div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">We're Also Active in <span className="text-red-600">Other NCR Locations</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {linkedCityPages.map(city => <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>)}
          </div>
        </section>

        {/* Testimonials & Customer Speaks */}
        <section className="bg-slate-800 py-10">
          <div className="text-center"><h2 className="text-3xl font-bold text-white">What Our <span className="text-red-600">Riders Say</span></h2><p className="text-white">Genuine Feedback Shared on Google</p><div className="flex justify-center gap-1 my-2">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}<span className="text-white ml-2 font-semibold">4.7 Rating on Google</span></div><a href="https://www.google.com" target="_blank" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Leave Us a Review</a></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[{ name: "Aryaman Sethi", img: testimonial1, text: "Mechanic reached my parking spot near India Gate quickly. Honest pricing throughout.", time: "two weeks ago" }, { name: "Nidhi Bhalla", img: testimonial2, text: "Booked near Mandi House, work was done in under an hour without any hassle.", time: "three weeks ago" }, { name: "Karanvir Oberoi", img: testimonial3, text: "Quoted the price before starting work near ITO. Very transparent process.", time: "a month ago" }, { name: "Priyamvada Joshi", img: testimonial4, text: "Quick response near Central Secretariat, skilled and polite mechanic.", time: "a month ago" }].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center"><img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" /><div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div><p className="text-xs mt-1">{t.text}</p><img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" /><h3 className="font-semibold text-sm">{t.name}</h3><span className="text-xs">{t.time}</span></div>
            ))}
          </div>
        </section>

        {/* FAQs - New Delhi specific */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">New Delhi Bike Service — <span className="text-red-600">Quick Answers</span></h2>
            <div className="space-y-3">
              {[
                { q: "What is the starting cost for bike service near India Gate?", a: "Doorstep bike service near India Gate begins at ₹285 under the Capital Basic Plan for 100-125cc bikes. Capital Standard is ₹375, Comfort ₹465, Cruiser ₹569, and Superbike ₹939, all with labour included." },
                { q: "Do you send mechanics to Pragati Maidan during events?", a: "Yes, we cover Pragati Maidan year-round, including during exhibition season. We recommend booking a little earlier on event days due to higher traffic in the area." },
                { q: "Which landmarks are covered in your New Delhi service zone?", a: "Our coverage spans India Gate, Pragati Maidan, Mandi House, ITO, Connaught Place, Parliament House, Central Secretariat, Tilak Marg, Supreme Court, and National Stadium." },
                { q: "Can I get a mechanic near ITO during peak office hours?", a: "Yes, ITO is one of our most frequently served zones. Bookings during peak hours are accepted, though early slots are recommended given the traffic." },
                { q: "Is parking near restricted areas like Parliament House a problem for booking?", a: "No, as long as your bike is legally parked, our mechanic will locate you. We simply ask for the nearest accessible landmark when you book." },
                { q: "Do you offer a warranty on repairs done near Central Secretariat?", a: "Every repair includes a 10-day service guarantee. If the same issue returns within that period, we fix it again at no extra cost." },
                { q: "How fast can a mechanic reach me near Tilak Marg?", a: "Mechanics typically reach locations near Tilak Marg within 2-4 hours of booking. Calling ahead helps us prioritise urgent breakdown cases." },
                { q: "What if my bike breaks down near the Supreme Court or National Stadium?", a: "Call us immediately with your nearest landmark, and we will dispatch the closest available mechanic to get your bike running again on the spot." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-700 rounded-md">
                  <button className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}><span className="text-red-600">Q{idx+1}.</span><span className="ml-2">{faq.q}</span>{openFaq === idx ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
                  {openFaq === idx && <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Get Your Bike Serviced Near India Gate Today</h2>
          <p className="text-white mb-4">Doorstep service across central New Delhi starts at ₹285 — no checkpoints to navigate, no hidden charges.</p>
          <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 inline-block">Book Your Service</a>
        </section>

        {/* Floating Buttons */}
        <div className="fixed top-1/2 right-4 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
          <a href="tel:9540553759" className="btn-shake w-13 h-13 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)', width: '52px', height: '52px' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg></a>
          <a href="https://wa.me/9540553759" target="_blank" rel="noopener noreferrer" className="btn-shake text-white flex items-center justify-center shadow-2xl rounded-full" style={{ background: 'linear-gradient(135deg, #25d366, #128c4e)', width: '52px', height: '52px' }}><FaWhatsapp size={26} /></a>
        </div>
        <style>{`.btn-shake { animation: shake 1.8s ease-in-out infinite; } .btn-shake:hover { animation: none; transform: scale(1.12); } @keyframes shake { 0%,100%{transform:rotate(0deg)} 15%{transform:rotate(-18deg)} 30%{transform:rotate(18deg)} 45%{transform:rotate(-14deg)} 60%{transform:rotate(14deg)} 75%{transform:rotate(-8deg)} 90%{transform:rotate(8deg)} }`}</style>

        {/* Modal */}
        {planModalOpen && chosenPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-md flex flex-col">
              <div className="p-4 border-b flex justify-between"><div><h3 className="text-xl font-bold text-black">{chosenPlan.title}</h3><p className="text-sm text-gray-600">{chosenPlan.subtitle}</p></div><button onClick={closePlanModal}><X className="h-6 w-6" /></button></div>
              <div className="p-4 overflow-y-auto"><h4 className="font-semibold mb-2">Inspection Checklist:</h4><ul className="space-y-2">{chosenPlan.checklist.map((item, i) => <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>)}</ul></div>
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Mobile Number*" maxLength={10} value={mobileInput} onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={confirmRepairBooking} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Confirm Mechanic Visit</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServiceNewDelhi;
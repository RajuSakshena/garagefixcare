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

interface CarePackage {
  title: string;
  subtitle: string;
  checklist: string[];
}

const BestBikeServicePaharganj = () => {
  const [bikersSupported, setBikersSupported] = useState(0);
  const [ratingValue, setRatingValue] = useState(4.5);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CarePackage | null>(null);
  const [enteredNumber, setEnteredNumber] = useState('');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(null);
  const moveTo = useNavigate();

  // Hero rotating banner
  const [bannerNo, setBannerNo] = useState(0);
  const bannerSet = [heroImage, bigGarageBike, mechanicImage, bigGarageCar];
  const bannerCaption = [
    "Doorstep bike mechanic near New Delhi Railway Station",
    "On-site two-wheeler repair near Ajmeri Gate",
    "Trained bike technician serving Paharganj",
    "Verified mechanic visiting near Sadar Bazaar"
  ];
  useEffect(() => {
    const bannerTimer = setInterval(() => setBannerNo(b => (b + 1) % bannerSet.length), 2500);
    return () => clearInterval(bannerTimer);
  }, []);

  const dealStrip = [
    { src: bikeServiceOfferImage, alt: "Bike service offer near Paharganj" },
    { src: doorstepImage, alt: "Doorstep bike mechanic near Chuna Mandi" },
    { src: engineImage, alt: "Bike engine repair near Arakashan Road" },
    { src: roadsideImage, alt: "Roadside bike help near Karol Bagh" },
  ];

  // Animated counters
  useEffect(() => {
    const goalCount = 100000;
    const span = 2000;
    const incrementSize = Math.ceil(goalCount / (span / 10));
    if (bikersSupported < goalCount) {
      const counterRef = setInterval(() => {
        setBikersSupported(prev => {
          const next = prev + incrementSize;
          if (next >= goalCount) {
            clearInterval(counterRef);
            return goalCount;
          }
          return next;
        });
      }, 10);
      return () => clearInterval(counterRef);
    }
  }, [bikersSupported]);

  useEffect(() => {
    const goalRating = 4.7;
    const span = 1000;
    const tick = 10;
    const incrementSize = (goalRating - ratingValue) / (span / tick);
    let progressVal = ratingValue;
    const ratingRef = setInterval(() => {
      progressVal += incrementSize;
      if (progressVal >= goalRating) {
        progressVal = goalRating;
        clearInterval(ratingRef);
      }
      setRatingValue(parseFloat(progressVal.toFixed(1)));
    }, tick);
    return () => clearInterval(ratingRef);
  }, []);

  const carePackages = [
    { title: "Station Quick Plan", subtitle: "100 CC - 125 CC", originalPrice: "Rs. 549", discountedPrice: "Rs. 275", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Station Standard Plan", subtitle: "135 CC - 200 CC", originalPrice: "Rs. 749", discountedPrice: "Rs. 365", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Station Comfort Plan", subtitle: "220 CC - 300 CC", originalPrice: "Rs. 1,099", discountedPrice: "Rs. 455", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Station Cruiser Plan", subtitle: "350 CC - 450 CC", originalPrice: "Rs. 1,489", discountedPrice: "Rs. 555", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Station Superbike Plan", subtitle: "Above 500 CC", originalPrice: "Rs. 2,029", discountedPrice: "Rs. 919", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] }
  ];

  const inspectionItems = [
    "Coolant Level Check", "Quick Body Wipe-Down", "Chain & Pivot Greasing", "Battery Terminal Check",
    "Engine Idle & Sound Inspection", "Front Fork Inspection", "Carburettor Quick Tune", "Lights & Wiring Check",
    "Front & Rear Brake Setting", "Drive Chain Cleaning", "Bolt & Nut Tightening",
    "Mileage & Power Check", "Engine Oil Replacement (Billed Separately)", "Oil Filter Swap (If Needed)",
    "Air Filter Swap (If Needed)", "Spark Plug Swap (If Needed)", "Tubeless Tyre Air Refill",
    "Free Pickup & Drop (On Request)"
  ];

  const launchPackageModal = (title: string, subtitle: string) => {
    setSelectedPackage({ title, subtitle, checklist: inspectionItems });
    setEnteredNumber('');
    setPackageModalOpen(true);
  };

  const dismissPackageModal = () => {
    setPackageModalOpen(false);
    setSelectedPackage(null);
    setEnteredNumber('');
  };

  const submitBookingRequest = async () => {
    if (!enteredNumber || enteredNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number to proceed.');
      return;
    }
    if (!selectedPackage) return;
    try {
      const serviceType = `${selectedPackage.title} (${selectedPackage.subtitle})`;
      await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
        phoneNumber: enteredNumber,
        serviceType: serviceType
      });
      alert('Booking confirmed! Our Paharganj team will call you shortly to finalise the slot.');
      dismissPackageModal();
    } catch (error) {
      alert('We could not complete your booking. Please try again.');
      console.error('Error booking service:', error);
    }
  };

  const marqueeZones = [
    { name: "Paharganj", color: "text-indigo-700" },
    { name: "Karol Bagh", color: "text-red-700" },
    { name: "Connaught Place", color: "text-teal-700" },
    { name: "New Delhi", color: "text-gray-900" },
    { name: "Sadar Bazaar", color: "text-orange-700" },
    { name: "Rani Jhansi Road", color: "text-slate-700" },
  ];

  const localityCoverage = [
    "New Delhi Railway Station", "Ajmeri Gate", "Ramakrishna Ashram", "Chuna Mandi",
    "Arakashan Road", "DB Gupta Road", "Sadar Bazaar", "Connaught Place",
    "Karol Bagh", "Rani Jhansi Road"
  ];

  const linkedAreaPages = [
    { name: "Connaught Place", path: "/best-bike-service-connaught-place" },
    { name: "New Delhi", path: "/best-bike-service-new-delhi" },
    { name: "Chanakyapuri", path: "/best-bike-service-chanakyapuri" },
    { name: "Uttam Nagar", path: "/best-bike-service-uttam-nagar" },
    { name: "Gurgaon", path: "/best-bike-service-gurgaon" },
  ];

  return (
    <>
      <SEOHelmet
        title="Bike Mechanic Near Paharganj | Doorstep Service ₹275 | Garage Fix Care"
        description="Doorstep bike repair near Paharganj, New Delhi Railway Station, Ajmeri Gate and Sadar Bazaar — trained mechanics at your door from ₹275, same-day service."
        canonical="https://www.garagefixcare.in/best-bike-service-paharganj"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-paharganj",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep bike mechanic serving Paharganj near New Delhi Railway Station",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Garage Fix Care doorstep bike service in Paharganj",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Doorstep bike repair and servicing across Paharganj, covering New Delhi Railway Station, Ajmeri Gate, Chuna Mandi, Sadar Bazaar and nearby areas, starting at ₹275.",
            "url": "https://www.garagefixcare.in/best-bike-service-paharganj",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Paharganj",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.6448", "longitude": "77.2167" },
            "areaServed": [
                { "@type": "Place", "name": "New Delhi Railway Station" },
                { "@type": "Place", "name": "Ajmeri Gate" },
                { "@type": "Place", "name": "Ramakrishna Ashram" },
                { "@type": "Place", "name": "Chuna Mandi" },
                { "@type": "Place", "name": "Arakashan Road" },
                { "@type": "Place", "name": "DB Gupta Road" },
                { "@type": "Place", "name": "Sadar Bazaar" },
                { "@type": "Place", "name": "Connaught Place" },
                { "@type": "Place", "name": "Karol Bagh" },
                { "@type": "Place", "name": "Rani Jhansi Road" }
              ],
            "serviceType": ["Doorstep Bike Repair", "Bike Servicing", "Engine Repair", "Battery Replacement", "Brake Repair", "Puncture Repair"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Doorstep Bike Service in Paharganj",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "Paharganj",
            "description": "On-demand bike servicing at your location starting at ₹275, including oil change, brake adjustment, battery check, and puncture repair across Paharganj and nearby Sadar Bazaar.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "275", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does doorstep bike service cost near Paharganj?", "acceptedAnswer": { "@type": "Answer", "text": "Doorstep bike service near Paharganj starts at ₹275 under the Station Quick Plan for 100-125cc bikes, going up to ₹919 for the Station Superbike Plan, all inclusive of labour." } },
              { "@type": "Question", "name": "Do you cover bike repair near New Delhi Railway Station?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, mechanics regularly attend bookings near New Delhi Railway Station, arriving fully equipped to complete most repairs without needing a workshop visit." } },
              { "@type": "Question", "name": "Which Paharganj area localities are covered?", "acceptedAnswer": { "@type": "Answer", "text": "We serve New Delhi Railway Station, Ajmeri Gate, Ramakrishna Ashram, Chuna Mandi, Arakashan Road, DB Gupta Road, Sadar Bazaar, Connaught Place, Karol Bagh, and Rani Jhansi Road." } },
              { "@type": "Question", "name": "Can a mechanic reach me near Sadar Bazaar on short notice?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, bookings near Sadar Bazaar are typically attended within 2-4 hours. A phone call helps us prioritise urgent breakdown requests." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Bike Service Near Paharganj", "item": "https://www.garagefixcare.in/best-bike-service-paharganj" }
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
                    Bike Mechanic Near Paharganj
                    <span className="text-orange-500"> — Doorstep Service from ₹275</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Starting at ₹275 • Mechanics Near the Station Belt • Same-Day Slots
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    Paharganj's narrow lanes, packed markets, and the constant rush around New Delhi Railway Station make finding parking outside a workshop a real struggle. Garage Fix Care sends a trained mechanic straight to your gali, hotel, or shopfront anywhere between Ajmeri Gate and Sadar Bazaar, handling everything from a quick service to a full engine repair without you stepping out.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ From ₹275", "✔ Same-Day Repair", "✔ Mechanic At Your Gali", "✔ Verified Technicians", "✔ Honest Billing"].map((point, i) => (
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
                      <button onClick={() => moveTo('/car')} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 text-white py-3 rounded-2xl font-semibold text-base"><Car className="h-6 w-6" /><span>Cars</span></button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Carousel + Reviews */}
                <div className="relative flex flex-col items-center lg:items-end gap-1">
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                    <img src={bannerSet[bannerNo]} alt={bannerCaption[bannerNo]} className="w-full rounded-lg transition-opacity duration-700" style={{ minHeight: '200px', objectFit: 'cover' }} />
                    <button onClick={() => setBannerNo(b => (b - 1 + bannerSet.length) % bannerSet.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronLeft className="h-6 w-6" /></button>
                    <button onClick={() => setBannerNo(b => (b + 1) % bannerSet.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronRight className="h-6 w-6" /></button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {bannerSet.map((_, i) => <button key={i} onClick={() => setBannerNo(i)} className={`w-2 h-2 rounded-full transition-all ${i === bannerNo ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="flex items-center justify-center gap-2 text-lg font-bold"><Star className="h-4 w-4 text-yellow-400 fill-current" />{ratingValue.toFixed(1)}/5</div><div className="text-xs font-semibold">Google Rating</div></div>
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="text-lg font-bold">{bikersSupported.toLocaleString()}+</div><div className="text-xs font-semibold">Bikers Supported</div></div>
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
            <div className="flex-1 overflow-hidden"><div className="flex items-center animate-marquee">{[...Array(3)].map((_, repIdx) => marqueeZones.map((zone, idx) => <span key={`${repIdx}-${idx}`} className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm ${zone.color}`}>{zone.name}</span>))}</div></div>
          </div>
        </div>

        {/* Hot Deals Carousel */}
        <section className="py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center mb-8"><div className="flex items-center"><h2 className="text-2xl sm:text-4xl font-bold mr-4"><span className="text-white">This Week's Offers</span> <span className="text-red-600">in Paharganj</span></h2><Flame className="h-8 w-8 text-orange-500" /></div><p className="text-lg text-white text-center">Limited-period savings for riders around the railway station belt and nearby market lanes. Lock in your slot before it's gone!</p></div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }} onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...dealStrip, ...dealStrip].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1"><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Paharganj</span><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Delhi</span></div>
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
            <h2 className="text-2xl sm:text-4xl font-bold mb-4"><span className="text-white">Paharganj Service</span> <span className="text-red-600">Rate Card</span></h2>
            <p className="text-xl text-white mb-6">Plain, upfront pricing for doorstep bike service across Paharganj and the railway station belt. The only variable is your engine size — nothing else changes the bill.</p>
            <div className="grid grid-cols-2 gap-3 justify-items-center">
              {carePackages.map((service, idx) => (
                <div key={idx} className="bg-brandRed p-1 rounded-lg w-full"><div className="bg-sky-100 rounded-lg p-2"><div className="text-left"><h3 className="text-base font-bold">{service.title}</h3><p className="text-xs font-semibold">{service.subtitle}</p><div><span className="line-through text-red-500 mr-1">{service.originalPrice}</span><span className="text-green-600 font-bold">{service.discountedPrice}/-</span></div></div><ul className="list-none text-left text-xs mt-1">{service.features.map((f, fi) => <li key={fi} className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />{f}</li>)}</ul><div className="flex justify-end mt-1"><button onClick={() => launchPackageModal(service.title, service.subtitle)} className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">See full checklist</button></div></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Covered Section */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Covering Every Gali of <span className="text-red-600">Paharganj</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {localityCoverage.map(area => <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>)}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">Whether your bike is parked near New Delhi Railway Station, Ajmeri Gate, Ramakrishna Ashram, Chuna Mandi, Arakashan Road, DB Gupta Road, Sadar Bazaar, Connaught Place, Karol Bagh, or Rani Jhansi Road, our mechanics reach you within 2-4 hours. Same-day visits are routine across this busy stretch of Central Delhi.</p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Complete Bike Care, <span className="text-red-600">Sorted Right Outside Your Gali</span></h2>
            <p className="text-white mb-6">From a quick servicing run to a deeper engine fix — our Paharganj mechanics are equipped for both.</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Doorstep Bike Service in <span className="text-red-600">Paharganj</span></h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>Paharganj sits right next to one of Delhi's busiest transit hubs, and the constant flow of traffic around New Delhi Railway Station and Ajmeri Gate makes parking outside a workshop almost impossible during peak hours. Garage Fix Care closes that gap by sending a trained mechanic directly to your hotel, shop, or home anywhere between Chuna Mandi and Sadar Bazaar, completing the job right where your bike already sits. Doorstep service here starts at ₹275, covering an engine oil change, filter cleaning, spark plug check, and brake adjustment, all finished without you having to push your bike through Paharganj's crowded lanes. We service every common two-wheeler brand seen around DB Gupta Road and Rani Jhansi Road — Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, and Royal Enfield — along with scooties like the Activa that traders and commuters frequently ride near Arakashan Road. Every job comes with a written estimate before any work begins, so the price you agree to is exactly what you pay once the mechanic finishes.</p>
              <p>The dense market traffic around Sadar Bazaar and the steady footfall near Ramakrishna Ashram wear down brake pads, chains, and engine oil faster than usual, and our mechanics are trained to catch these early signs before they cause a full breakdown. If your bike does stall suddenly anywhere between Karol Bagh and Connaught Place, a single call sends a technician straight to your spot for an on-the-road fix, no towing needed. We regularly manage battery replacements, brake pad swaps, clutch adjustments, and tubeless puncture repairs right at the roadside. Garage Fix Care has completed over 1,00,000 services across Delhi NCR and maintains a steady 4.7-star Google rating for being prompt and upfront about pricing. Reach us through our website, a quick WhatsApp message, or a direct call, and get your bike sorted without leaving Paharganj.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><p className="text-xs">Flat ₹10 Off Your First Paharganj Booking</p><h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Service Pledge</span></h2><p className="mb-4">Paharganj's reliable doorstep bike mechanic. We work on every common motorcycle and scooter brand — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right at your gali, shop, or hotel.</p><div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div></div>
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
            <div className="order-1"><h2 className="text-3xl font-bold mb-2">Why Paharganj Riders Choose <span className="text-red-600">GarageFixCare</span></h2><p>We bring the workshop to you across Paharganj and the surrounding station belt — fair pricing, genuine parts, no pushing your bike through crowded lanes.</p><ul className="space-y-2 mt-4">{["Mechanic Comes to Your Gali", "Verified, Trained Technicians", "Transparent, No-Surprise Pricing", "Genuine Spare Parts Only", "Backed by a Service Guarantee", "Quick, Professional Turnaround"].map(item => <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>)}</ul></div>
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
            <div><h2 className="text-3xl font-bold text-white mb-2">Booking a Mechanic in <span className="text-red-600">Paharganj</span> is Simple</h2><p className="text-white mb-4">Share your bike's issue and your nearest landmark, and a mechanic is on the way.</p><ul className="space-y-2">{["Share Location & Bike Issue", "We Assign the Nearest Mechanic", "Repair Done Right Outside Your Gali", "Clear Cost Breakdown Shared", "Quality Checked Before Handover", "Easy Payment, Quick Feedback"].map(s => <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> {s}</li>)}</ul></div>
            <div className="flex justify-center"><img src={howWorksImage} alt="How it works" className="rounded-lg shadow-lg max-w-sm" /></div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">We're Also Active in <span className="text-red-600">Other NCR Locations</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {linkedAreaPages.map(city => <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>)}
          </div>
        </section>

        {/* Testimonials & Customer Speaks */}
        <section className="bg-slate-800 py-10">
          <div className="text-center"><h2 className="text-3xl font-bold text-white">What Our <span className="text-red-600">Riders Say</span></h2><p className="text-white">Genuine Feedback Shared on Google</p><div className="flex justify-center gap-1 my-2">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}<span className="text-white ml-2 font-semibold">4.7 Rating on Google</span></div><a href="https://www.google.com" target="_blank" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Leave Us a Review</a></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[{ name: "Imran Siddiqui", img: testimonial1, text: "Mechanic reached my hotel near the railway station within an hour. Fair pricing throughout.", time: "two weeks ago" }, { name: "Pallavi Saluja", img: testimonial2, text: "Booked for my scooty near Chuna Mandi, work was finished right outside my shop.", time: "three weeks ago" }, { name: "Yuvraj Negi", img: testimonial3, text: "Quoted the price upfront before starting near Sadar Bazaar. No hidden additions later.", time: "a month ago" }, { name: "Tanvi Arora", img: testimonial4, text: "Quick response near Karol Bagh, mechanic was polite and finished the job fast.", time: "a month ago" }].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center"><img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" /><div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div><p className="text-xs mt-1">{t.text}</p><img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" /><h3 className="font-semibold text-sm">{t.name}</h3><span className="text-xs">{t.time}</span></div>
            ))}
          </div>
        </section>

        {/* FAQs - Paharganj specific */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Paharganj Bike Service — <span className="text-red-600">Quick Answers</span></h2>
            <div className="space-y-3">
              {[
                { q: "What is the starting cost for bike service near Paharganj?", a: "Doorstep bike service near Paharganj begins at ₹275 under the Station Quick Plan for 100-125cc bikes. Standard is ₹365, Comfort ₹455, Cruiser ₹555, and Superbike ₹919, all with labour included." },
                { q: "Do you send mechanics close to New Delhi Railway Station?", a: "Yes, we regularly attend bookings near New Delhi Railway Station, arriving fully equipped so most repairs are completed without a workshop trip." },
                { q: "Which exact areas around Paharganj are covered?", a: "Our coverage spans New Delhi Railway Station, Ajmeri Gate, Ramakrishna Ashram, Chuna Mandi, Arakashan Road, DB Gupta Road, Sadar Bazaar, Connaught Place, Karol Bagh, and Rani Jhansi Road." },
                { q: "Can I get a mechanic near Ajmeri Gate quickly?", a: "Yes, bookings near Ajmeri Gate are usually attended within 2-4 hours. A phone call helps us prioritise urgent or breakdown-related requests." },
                { q: "Do you service scooties used by traders near Sadar Bazaar?", a: "Absolutely. We regularly service scooties such as the Honda Activa and TVS Jupiter that are common among traders and commuters around Sadar Bazaar." },
                { q: "Is there a guarantee on bike repairs near DB Gupta Road?", a: "Every repair carries a 10-day service guarantee. If the same problem reappears within that window, we fix it again at no extra cost." },
                { q: "How do I arrange a bike pickup from Rani Jhansi Road?", a: "Free pickup and drop is available on request from Rani Jhansi Road and nearby lanes — simply mention it while booking and we will coordinate timing." },
                { q: "What if my bike breaks down near Karol Bagh or Connaught Place?", a: "Call us right away with your nearest landmark, and we will dispatch the closest available mechanic to get you moving again on the spot." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-700 rounded-md">
                  <button className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700" onClick={() => setActiveQuestionIdx(activeQuestionIdx === idx ? null : idx)}><span className="text-red-600">Q{idx+1}.</span><span className="ml-2">{faq.q}</span>{activeQuestionIdx === idx ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
                  {activeQuestionIdx === idx && <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Get Your Bike Serviced Near Paharganj Today</h2>
          <p className="text-white mb-4">Doorstep service across Paharganj and the station belt starts at ₹275 — no pushing your bike anywhere, no hidden charges.</p>
          <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 inline-block">Book Your Service</a>
        </section>

        {/* Floating Buttons */}
        <div className="fixed top-1/2 right-4 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
          <a href="tel:9540553759" className="btn-shake w-13 h-13 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)', width: '52px', height: '52px' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg></a>
          <a href="https://wa.me/9540553759" target="_blank" rel="noopener noreferrer" className="btn-shake text-white flex items-center justify-center shadow-2xl rounded-full" style={{ background: 'linear-gradient(135deg, #25d366, #128c4e)', width: '52px', height: '52px' }}><FaWhatsapp size={26} /></a>
        </div>
        <style>{`.btn-shake { animation: shake 1.8s ease-in-out infinite; } .btn-shake:hover { animation: none; transform: scale(1.12); } @keyframes shake { 0%,100%{transform:rotate(0deg)} 15%{transform:rotate(-18deg)} 30%{transform:rotate(18deg)} 45%{transform:rotate(-14deg)} 60%{transform:rotate(14deg)} 75%{transform:rotate(-8deg)} 90%{transform:rotate(8deg)} }`}</style>

        {/* Modal */}
        {packageModalOpen && selectedPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-md flex flex-col">
              <div className="p-4 border-b flex justify-between"><div><h3 className="text-xl font-bold text-black">{selectedPackage.title}</h3><p className="text-sm text-gray-600">{selectedPackage.subtitle}</p></div><button onClick={dismissPackageModal}><X className="h-6 w-6" /></button></div>
              <div className="p-4 overflow-y-auto"><h4 className="font-semibold mb-2">Inspection Checklist:</h4><ul className="space-y-2">{selectedPackage.checklist.map((item, i) => <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>)}</ul></div>
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Mobile Number*" maxLength={10} value={enteredNumber} onChange={(e) => setEnteredNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={submitBookingRequest} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Confirm Mechanic Visit</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServicePaharganj;
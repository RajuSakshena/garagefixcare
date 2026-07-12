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

interface Service {
  title: string;
  subtitle: string;
  checklist: string[];
}

const BestBikeServiceConnaughtPlace = () => {
  const [happyRidersServed, setHappyRidersServed] = useState(0);
  const [googleRating, setGoogleRating] = useState(4.5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalContactNumber, setModalContactNumber] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Hero carousel
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [heroImage, bigGarageBike, mechanicImage, bigGarageCar];
  const heroCaptions = [
    "Best bike service in Connaught Place at your doorstep",
    "Doorstep two-wheeler repair near Rajiv Chowk",
    "Trained bike mechanics serving Connaught Place",
    "Verified motorcycle service technician Connaught Place"
  ];
  useEffect(() => {
    const slideTimer = setInterval(() => setHeroSlide(s => (s + 1) % heroSlides.length), 2500);
    return () => clearInterval(slideTimer);
  }, []);

  const dealsCarousel = [
    { src: bikeServiceOfferImage, alt: "Bike service deal Connaught Place" },
    { src: doorstepImage, alt: "Doorstep bike servicing Connaught Place" },
    { src: engineImage, alt: "Bike engine repair near Rajiv Chowk" },
    { src: roadsideImage, alt: "Roadside bike help Connaught Place" },
  ];

  // Animated counters
  useEffect(() => {
    const finalCount = 100000;
    const span = 2000;
    const step = Math.ceil(finalCount / (span / 10));
    if (happyRidersServed < finalCount) {
      const counterTimer = setInterval(() => {
        setHappyRidersServed(prev => {
          const next = prev + step;
          if (next >= finalCount) {
            clearInterval(counterTimer);
            return finalCount;
          }
          return next;
        });
      }, 10);
      return () => clearInterval(counterTimer);
    }
  }, [happyRidersServed]);

  useEffect(() => {
    const finalRating = 4.7;
    const span = 1000;
    const tick = 10;
    const step = (finalRating - googleRating) / (span / tick);
    let runningRating = googleRating;
    const ratingTimer = setInterval(() => {
      runningRating += step;
      if (runningRating >= finalRating) {
        runningRating = finalRating;
        clearInterval(ratingTimer);
      }
      setGoogleRating(parseFloat(runningRating.toFixed(1)));
    }, tick);
    return () => clearInterval(ratingTimer);
  }, []);

  const servicePackages = [
    { title: "Doorstep Basic Tune-Up", subtitle: "100 CC - 125 CC", originalPrice: "Rs. 579", discountedPrice: "Rs. 289", features: ["Engine Oil Top-Up", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Doorstep Standard Tune-Up", subtitle: "135 CC - 200 CC", originalPrice: "Rs. 779", discountedPrice: "Rs. 379", features: ["Engine Oil Top-Up", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Doorstep Advanced Tune-Up", subtitle: "220 CC - 300 CC", originalPrice: "Rs. 1,149", discountedPrice: "Rs. 469", features: ["Engine Oil Top-Up", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Doorstep Cruiser Tune-Up", subtitle: "350 CC - 450 CC", originalPrice: "Rs. 1,549", discountedPrice: "Rs. 579", features: ["Engine Oil Top-Up", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Doorstep Superbike Tune-Up", subtitle: "Above 500 CC", originalPrice: "Rs. 2,099", discountedPrice: "Rs. 949", features: ["Engine Oil Top-Up", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] }
  ];

  const fullChecklist = [
    "Coolant Level Check", "Quick Hand Wash", "Chassis Oiling and Greasing", "Battery Terminal Check",
    "Engine Sound Inspection", "Front Fork Inspection", "Carburettor Quick Check", "Wiring & Electrical Check",
    "Front & Rear Brake Adjustment", "Drive Chain Cleaning", "Nut, Bolt & Screw Tightening",
    "Mileage & Performance Check", "Engine Oil Change (Billed Separately)", "Oil Filter Replacement (If Needed)",
    "Air Filter Replacement (If Needed)", "Spark Plug Replacement (If Needed)", "Tubeless Tyre Air Top-Up",
    "Complimentary Pickup & Drop (On Request)"
  ];

  const handleOpenChecklist = (title: string, subtitle: string) => {
    setSelectedService({ title, subtitle, checklist: fullChecklist });
    setModalContactNumber('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setModalContactNumber('');
  };

  const handleConfirmBooking = async () => {
    if (!modalContactNumber || modalContactNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!selectedService) return;
    try {
      const serviceType = `${selectedService.title} (${selectedService.subtitle})`;
      await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
        phoneNumber: modalContactNumber,
        serviceType: serviceType
      });
      alert('Booking received! Our team will call you within 5 minutes to confirm your slot.');
      handleCloseModal();
    } catch (error) {
      alert('We could not process your booking. Please try again.');
      console.error('Error booking service:', error);
    }
  };

  const ncrZones = [
    { name: "Connaught Place", color: "text-indigo-700" },
    { name: "Gurgaon", color: "text-red-700" },
    { name: "Noida", color: "text-teal-700" },
    { name: "Ghaziabad", color: "text-gray-900" },
    { name: "Faridabad", color: "text-orange-700" },
    { name: "Greater Noida", color: "text-slate-700" },
  ];

  const localityCoverage = [
    "Rajiv Chowk", "Janpath", "Barakhamba Road", "Kasturba Gandhi Marg",
    "Minto Road", "Shivaji Stadium", "Palika Bazaar", "Outer Circle",
    "Inner Circle", "Bangla Sahib"
  ];

  const nearbyCityLinks = [
    { name: "Gurgaon", path: "/best-bike-service-gurgaon" },
    { name: "Noida", path: "/best-bike-service-noida" },
    { name: "Greater Noida", path: "/best-bike-service-greater-noida" },
    { name: "Ghaziabad", path: "/best-bike-service-ghaziabad" },
    { name: "Faridabad", path: "/best-bike-service-faridabad" },
  ];

  return (
    <>
      <SEOHelmet
        title="Best Bike Service in Connaught Place | Doorstep Repair ₹289 | Garage Fix Care"
        description="Reliable doorstep bike service in Connaught Place starting at ₹289. Same-day repair, servicing, and maintenance near Rajiv Chowk and Janpath at your home."
        canonical="https://www.garagefixcare.in/best-bike-service-connaught-place"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-connaught-place",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Best bike service in Connaught Place at doorstep by Garage Fix Care",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep bike service and repair in Connaught Place",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Best bike service in Connaught Place. Doorstep two-wheeler repair, servicing, oil change, and battery replacement starting at ₹289.",
            "url": "https://www.garagefixcare.in/best-bike-service-connaught-place",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Connaught Place",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.6315", "longitude": "77.2167" },
            "areaServed": [
                { "@type": "Place", "name": "Connaught Place", "sameAs": "https://en.wikipedia.org/wiki/Connaught_Place,_New_Delhi" },
                { "@type": "Place", "name": "Rajiv Chowk" },
                { "@type": "Place", "name": "Janpath" },
                { "@type": "Place", "name": "Barakhamba Road" },
                { "@type": "Place", "name": "Kasturba Gandhi Marg" },
                { "@type": "Place", "name": "Minto Road" },
                { "@type": "Place", "name": "Shivaji Stadium" },
                { "@type": "Place", "name": "Palika Bazaar" },
                { "@type": "Place", "name": "Bangla Sahib" }
              ],
            "serviceType": ["Bike Repair", "Doorstep Bike Service", "Engine Repair", "Battery Replacement", "Brake Repair", "Tyre Service"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Doorstep Bike Service in Connaught Place",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "Connaught Place",
            "description": "At-home bike servicing starting at ₹289. Oil change, engine repair, battery replacement, puncture fix — same-day doorstep service across Connaught Place.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "289", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does a bike service cost near Connaught Place?", "acceptedAnswer": { "@type": "Answer", "text": "Bike service near Connaught Place starts from ₹289 for 100–125cc bikes. Standard Tune-Up is ₹379, Advanced ₹469, Cruiser ₹579, and Superbike ₹949. All prices include labour with no hidden charges." } },
              { "@type": "Question", "name": "Do you offer doorstep bike repair around Rajiv Chowk?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide full doorstep bike repair around Rajiv Chowk and Connaught Place. Verified mechanics come fully equipped to your location — no garage visit required." } },
              { "@type": "Question", "name": "Which Connaught Place localities do you cover?", "acceptedAnswer": { "@type": "Answer", "text": "We cover Rajiv Chowk, Janpath, Barakhamba Road, Kasturba Gandhi Marg, Minto Road, Shivaji Stadium, Palika Bazaar, Outer Circle, Inner Circle, and the Bangla Sahib stretch." } },
              { "@type": "Question", "name": "Do you handle sudden bike breakdowns near Connaught Place?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If your bike breaks down anywhere around Connaught Place, call us right away and a mechanic is sent to your location for on-spot repair or recovery." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Best Bike Service in Connaught Place", "item": "https://www.garagefixcare.in/best-bike-service-connaught-place" }
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
                    Best Bike Service in Connaught Place
                    <span className="text-orange-500"> — Doorstep Repair from ₹289</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Starting at just ₹289 • Same-Day Repair Near Rajiv Chowk • Verified Mechanics
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    Get dependable bike service in Connaught Place without stepping out of your home or office. Whether you ride a commuter bike, a sports bike, or a scooty around Rajiv Chowk and Janpath, our trained mechanics handle everything from a quick oil change to a full engine overhaul, right where you are parked.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ Starting ₹289", "✔ Same-Day Repair", "✔ Doorstep Mechanics", "✔ Verified Technicians", "✔ Upfront Pricing"].map((point, i) => (
                      <span key={i} className="font-medium">{point}</span>
                    ))}
                  </div>

                  {/* Book + Call Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-orange-700 transition-all duration-300 inline-block">
                      Schedule a Mechanic
                    </a>
                    <a href="tel:9540553759" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> Call Now</a>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="mt-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-4 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 text-center">Choose Your Vehicle Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-semibold text-base transition-all duration-300"><Bike className="h-6 w-6" /><span>Bike &amp; Scooty</span></button>
                      <button onClick={() => navigate('/car')} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 text-white py-3 rounded-2xl font-semibold text-base"><Car className="h-6 w-6" /><span>Cars</span></button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Carousel + Reviews */}
                <div className="relative flex flex-col items-center lg:items-end gap-1">
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                    <img src={heroSlides[heroSlide]} alt={heroCaptions[heroSlide]} className="w-full rounded-lg transition-opacity duration-700" style={{ minHeight: '200px', objectFit: 'cover' }} />
                    <button onClick={() => setHeroSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronLeft className="h-6 w-6" /></button>
                    <button onClick={() => setHeroSlide(s => (s + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronRight className="h-6 w-6" /></button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {heroSlides.map((_, i) => <button key={i} onClick={() => setHeroSlide(i)} className={`w-2 h-2 rounded-full transition-all ${i === heroSlide ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="flex items-center justify-center gap-2 text-lg font-bold"><Star className="h-4 w-4 text-yellow-400 fill-current" />{googleRating.toFixed(1)}/5</div><div className="text-xs font-semibold">Google Review</div></div>
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="text-lg font-bold">{happyRidersServed.toLocaleString()}+</div><div className="text-xs font-semibold">Riders Served</div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Marquee cities */}
        <div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
          <div className="flex items-center text-sm font-semibold max-w-7xl mx-auto">
            <div className="flex-shrink-0 px-2"><span className="text-red-600 mr-1 font-bold">Service Available</span><span className="text-brandRed font-bold"> (10% off)</span></div>
            <div className="flex-1 overflow-hidden"><div className="flex items-center animate-marquee">{[...Array(3)].map((_, repIdx) => ncrZones.map((zone, idx) => <span key={`${repIdx}-${idx}`} className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm ${zone.color}`}>{zone.name}</span>))}</div></div>
          </div>
        </div>

        {/* Hot Deals Carousel */}
        <section className="py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center mb-8"><div className="flex items-center"><h2 className="text-2xl sm:text-4xl font-bold mr-4"><span className="text-white">This Week's</span> <span className="text-red-600">Best Offers</span></h2><Flame className="h-8 w-8 text-orange-500" /></div><p className="text-lg text-white text-center">Special limited-period pricing for riders around Connaught Place. Save up to 10% on bike repair and servicing booked at your doorstep. Slots fill up fast!</p></div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }} onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...dealsCarousel, ...dealsCarousel].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1"><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">CP</span><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Delhi</span></div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </section>

        {/* What Clients Say */}
        <section className="bg-slate-800 text-black py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 text-center mb-4"><h2 className="text-xl sm:text-3xl font-bold"><span className="text-white">Reviews From</span> <span className="text-red-600">Our Riders</span></h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto px-2">
            {[{ img: googleReviewsImage, name: "Google", rating: "4.7/5", link: "https://goo.gl/maps/dqmKivbhftEaVxK79" }, { img: facebookReviewsImage, name: "Facebook", rating: "4.7/5", link: "https://www.instagram.com/p/DQVj8SmktgG/" }, { img: justdialReviewsImage, name: "JustDial", rating: "4.7/5", link: "https://www.justdial.com/jd-business?docid=011PXX11.XX11.251024223108.U1U5" }].map((rev, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-3 shadow-sm text-center"><img src={rev.img} alt={rev.name} className="mx-auto h-10 mb-2" /><div className="flex justify-center mb-1">{[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 text-yellow-400 fill-current" />)}</div><p className="font-semibold text-sm">{rev.rating} Rating</p><a href={rev.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">view us on {rev.name}</a></div>
            ))}
          </div>
        </section>

        {/* At-Home Service Price List */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4"><span className="text-white">Doorstep Service</span> <span className="text-red-600">Rate Card</span></h2>
            <p className="text-xl text-white mb-6">Clear, upfront pricing for bike service around Connaught Place. Labour cost depends only on engine size — nothing hidden.</p>
            <div className="grid grid-cols-2 gap-3 justify-items-center">
              {servicePackages.map((service, idx) => (
                <div key={idx} className="bg-brandRed p-1 rounded-lg w-full"><div className="bg-sky-100 rounded-lg p-2"><div className="text-left"><h3 className="text-base font-bold">{service.title}</h3><p className="text-xs font-semibold">{service.subtitle}</p><div><span className="line-through text-red-500 mr-1">{service.originalPrice}</span><span className="text-green-600 font-bold">{service.discountedPrice}/-</span></div></div><ul className="list-none text-left text-xs mt-1">{service.features.map((f, fi) => <li key={fi} className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />{f}</li>)}</ul><div className="flex justify-end mt-1"><button onClick={() => handleOpenChecklist(service.title, service.subtitle)} className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">View checklist</button></div></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Covered Section */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Serving Every Corner of <span className="text-red-600">Connaught Place</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {localityCoverage.map(area => <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>)}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">Whether you are parked near Rajiv Chowk, Janpath, Barakhamba Road, Kasturba Gandhi Marg, Minto Road, Shivaji Stadium, Palika Bazaar, the Outer or Inner Circle, or close to Bangla Sahib, our mechanics reach you within 2-4 hours. Same-day bike service is available throughout Connaught Place.</p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Complete Two-Wheeler Care, <span className="text-red-600">Delivered to Your Doorstep in CP</span></h2>
            <p className="text-white mb-6">From a quick oil top-up to a full engine job — our mechanics near Connaught Place handle it all.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {["General Servicing", "Engine Repair", "Battery Replacement", "Brake Repair", "Tyre Service", "Insurance Assistance"].map(service => (
                <div key={service} className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm">{service}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Bike Service Content */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Garage Fix Care Leads <span className="text-red-600">Bike Servicing in Connaught Place</span></h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>Connaught Place sits at the heart of Delhi's daily traffic, and the two-wheelers that circle Rajiv Chowk, Janpath, and the Outer and Inner Circles every day need servicing that keeps pace with the area's congestion and constant footfall. Garage Fix Care brings background-checked, trained mechanics directly to wherever you have parked — outside a shop on Janpath, near your office on Barakhamba Road, or at home close to Kasturba Gandhi Marg. Most bookings around Connaught Place are attended within 2-4 hours, and doorstep service starts at just ₹289, covering an engine oil top-up, air filter wash, spark plug cleaning, brake adjustment, and a basic electrical check, all completed on the spot. We service practically every two-wheeler brand seen on CP's roads — Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, Royal Enfield, and KTM — along with everyday scooties like the Honda Activa and TVS Jupiter that commuters rely on near Minto Road and Shivaji Stadium. What sets us apart is a written, itemised estimate handed over before any tool touches your bike, so the final bill never carries a surprise. Every service uses Motul and Wurth engine oil along with manufacturer-recommended parts, and is backed by a 10-day service guarantee at no extra cost.</p>
              <p>The stop-start traffic around Palika Bazaar and Inner Circle, combined with Delhi's dust and seasonal heat, wears down brake pads, air filters, and engine oil faster than usual — making routine checks a genuine safety measure rather than an afterthought. Our mechanics carry diagnostic tools to catch early warning signs in the engine or electricals before they turn into costlier repairs, which keeps your bike running longer and riding smoother through CP's crowded lanes. We also respond to sudden breakdowns anywhere in the area — if your bike stalls near Bangla Sahib or along the Outer Circle, a quick call gets a mechanic moving to your exact location. Battery swaps, brake pad replacements, clutch cable fixes, and tyre puncture repairs are all handled right there, without towing your bike anywhere. Garage Fix Care has completed over 1,00,000 services across Delhi NCR and holds a steady 4.7-star rating on Google for being punctual, transparent, and easy to deal with. Book your next service near Connaught Place through our website, a WhatsApp message, or a direct call, and let two-wheeler care come to you instead.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><p className="text-xs">Get Rs.10 Off On Your First Booking in Connaught Place</p><h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Service Promise</span></h2><p className="mb-4">Connaught Place's trusted doorstep bike service. We work on every major motorcycle and scooter brand — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right where you live, work, or shop.</p><div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ img: warrantyImg, title: "10-Day Free Service Guarantee", desc: "Worry-Free Warranty" }, { img: pickupImg, title: "Complimentary Pickup and Drop", desc: "Hassle-free for you" }, { img: transparentImg, title: "Upfront, Honest Pricing", desc: "Save up to 30%" }, { img: trainedImg, title: "Background-Verified Mechanics", desc: "Trained technicians" }].map((item, idx) => (
                <div key={idx} className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3"><img src={item.img} alt={item.title} className="h-10 w-10 object-contain" /><div><h3 className="font-bold text-sm">{item.title}</h3><p className="text-xs">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div className="order-2 lg:order-1"><img src={handshakeImg} alt="Handshake" className="rounded-lg shadow-lg w-full max-w-sm" /></div>
            <div className="order-1"><h2 className="text-3xl font-bold mb-2">Why Riders Pick <span className="text-red-600">GarageFixCare?</span></h2><p>We send trained mechanics straight to riders across Connaught Place — fair pricing, genuine parts, zero back-and-forth.</p><ul className="space-y-2 mt-4">{["Convenient Doorstep Service", "Trained, Verified Technicians", "Fair, Transparent Pricing", "Genuine Spare Parts", "Satisfaction Guaranteed", "Quick, Professional Turnaround"].map(item => <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>)}</ul></div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-12 bg-slate-900 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Riders</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 justify-items-center">
            {[{ name: "WURTH", img: wurthImg }, { name: "MOTUL", img: motulImg }, { name: "Turtlemint", img: turtlemintImg }, { name: "Buniyad", img: buniyadImg }, { name: "Dunzo", img: dunzoImg }].map(brand => <div key={brand.name} className="bg-white rounded-lg p-3 w-32 h-20 flex items-center justify-center"><img src={brand.img} alt={brand.name} className="max-h-12 object-contain" /></div>)}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><h2 className="text-3xl font-bold text-white mb-2">How <span className="text-red-600">GarageFixCare</span> Works?</h2><p className="text-white mb-4">Booking a bike service near Connaught Place takes a minute. Book online or call us, and a trained mechanic comes straight to your location.</p><ul className="space-y-2">{["Pick Your Service Slot", "Mechanic Heads to You", "Service Completed On-Site", "Clear, Honest Updates", "Quality You Can Rely On", "Simple Payment & Feedback"].map(s => <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> {s}</li>)}</ul></div>
            <div className="flex justify-center"><img src={howWorksImage} alt="How it works" className="rounded-lg shadow-lg max-w-sm" /></div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">We Also Serve <span className="text-red-600">Nearby NCR Cities</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {nearbyCityLinks.map(city => <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>)}
          </div>
        </section>

        {/* Testimonials & Customer Speaks */}
        <section className="bg-slate-800 py-10">
          <div className="text-center"><h2 className="text-3xl font-bold text-white">What <span className="text-red-600">Riders Tell Us</span></h2><p className="text-white">Genuine Testimonials from Google Reviews</p><div className="flex justify-center gap-1 my-2">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}<span className="text-white ml-2 font-semibold">4.7 Rating on Google</span></div><a href="https://www.google.com" target="_blank" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Leave Us a Review</a></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[{ name: "Anikait Verma", img: testimonial1, text: "Mechanic reached my office near Barakhamba Road on time. Honest pricing throughout.", time: "two weeks ago" }, { name: "Falguni Rao", img: testimonial2, text: "Loved the upfront estimate before any work started. No last-minute surprises.", time: "three weeks ago" }, { name: "Devraj Mehta", img: testimonial3, text: "Came straight to Janpath, fixed my bike in under an hour. Smooth experience.", time: "a month ago" }, { name: "Ishaani Kapoor", img: testimonial4, text: "Quick booking, polite mechanic, fair price. Would book again near CP.", time: "a month ago" }].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center"><img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" /><div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div><p className="text-xs mt-1">{t.text}</p><img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" /><h3 className="font-semibold text-sm">{t.name}</h3><span className="text-xs">{t.time}</span></div>
            ))}
          </div>
        </section>

        {/* FAQs (15 items - Connaught Place specific) */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Bike Service Near Connaught Place — <span className="text-red-600">Frequently Asked</span></h2>
            <div className="space-y-3">
              {[
                { q: "How much does a doorstep bike service cost near Connaught Place?", a: "Doorstep bike service near Connaught Place starts at ₹289 for 100–125cc bikes (Basic Tune-Up). Standard Tune-Up (135–200 CC) is ₹379, Advanced Tune-Up (220–300 CC) is ₹469, Cruiser Tune-Up (350–450 CC) is ₹579, and Superbike Tune-Up (above 500 CC) is ₹949, all with labour included and no hidden add-ons." },
                { q: "Can a mechanic come to me near Rajiv Chowk for bike repair?", a: "Yes, our mechanics regularly serve riders around Rajiv Chowk and the wider Connaught Place circle. They arrive with tools, oils, and common spare parts so most jobs are finished on the spot." },
                { q: "Which areas around Connaught Place do you cover?", a: "We cover Rajiv Chowk, Janpath, Barakhamba Road, Kasturba Gandhi Marg, Minto Road, Shivaji Stadium, Palika Bazaar, Outer Circle, Inner Circle, and the Bangla Sahib stretch." },
                { q: "What makes Garage Fix Care a strong choice for bike service in CP?", a: "Garage Fix Care offers doorstep bike service starting at ₹289, with trained mechanics, an upfront written estimate, genuine parts, and a 10-day service guarantee — handled entirely at your parking spot." },
                { q: "Do you work on Royal Enfield bikes near Connaught Place?", a: "Yes. We regularly service Royal Enfield models — Classic 350, Bullet 350, Meteor 350, and Himalayan — for riders across the Connaught Place area." },
                { q: "How long does it take a mechanic to reach me near CP?", a: "Mechanics typically reach locations around Connaught Place within 2–4 hours of booking. For urgent breakdowns, a call helps us prioritise your request." },
                { q: "Is the pricing for bike service near Connaught Place transparent?", a: "Yes. You get a complete itemised estimate before any work begins, so the amount you agree to is exactly what you pay at the end." },
                { q: "Do you service scooties near Janpath and Palika Bazaar?", a: "Yes. We handle scooties such as the Honda Activa, TVS Jupiter, Suzuki Access 125, and Hero Maestro for riders near Janpath, Palika Bazaar, and the surrounding lanes." },
                { q: "Is there a warranty on bike servicing in Connaught Place?", a: "Every service includes a 10-day service guarantee. If a problem related to our work shows up within that window, we fix it free of charge." },
                { q: "How do I book a mechanic near Connaught Place?", a: "Book through our website, message us on WhatsApp at 9540553759, or call directly. Share your nearest CP landmark and a preferred time, and we take it from there." },
                { q: "What payment methods can I use near CP?", a: "We accept cash and UPI through Google Pay, PhonePe, or Paytm. Payment is collected only once the service is finished to your satisfaction." },
                { q: "Do I need to keep tools or engine oil ready at home?", a: "Not at all. Our mechanics carry their own tools along with Motul and Wurth oils and the spare parts needed for most common repairs." },
                { q: "Can I get two bikes serviced together near Barakhamba Road?", a: "Yes, just mention the number of bikes while booking and we will schedule the right number of mechanics for your slot." },
                { q: "Do you respond to breakdowns near Shivaji Stadium or Minto Road?", a: "Yes. For breakdowns anywhere around Shivaji Stadium, Minto Road, or elsewhere in Connaught Place, call us and a mechanic is sent directly to your location." },
                { q: "Why choose Garage Fix Care over a roadside CP mechanic?", a: "We come to you, give a written cost estimate before starting, use genuine parts, and back the work with a 10-day guarantee — protections a roadside fix near Connaught Place rarely offers." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-700 rounded-md">
                  <button className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700" onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}><span className="text-red-600">Q{idx+1}.</span><span className="ml-2">{faq.q}</span>{openFaqIndex === idx ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
                  {openFaqIndex === idx && <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Book Bike Service Near Connaught Place Today</h2>
          <p className="text-white mb-4">Same-day doorstep service starting at ₹289. No travel, no waiting, no hidden charges.</p>
          <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 inline-block">Book Your Service</a>
        </section>

        {/* Floating Buttons */}
        <div className="fixed top-1/2 right-4 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
          <a href="tel:9540553759" className="btn-shake w-13 h-13 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)', width: '52px', height: '52px' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg></a>
          <a href="https://wa.me/9540553759" target="_blank" rel="noopener noreferrer" className="btn-shake text-white flex items-center justify-center shadow-2xl rounded-full" style={{ background: 'linear-gradient(135deg, #25d366, #128c4e)', width: '52px', height: '52px' }}><FaWhatsapp size={26} /></a>
        </div>
        <style>{`.btn-shake { animation: shake 1.8s ease-in-out infinite; } .btn-shake:hover { animation: none; transform: scale(1.12); } @keyframes shake { 0%,100%{transform:rotate(0deg)} 15%{transform:rotate(-18deg)} 30%{transform:rotate(18deg)} 45%{transform:rotate(-14deg)} 60%{transform:rotate(14deg)} 75%{transform:rotate(-8deg)} 90%{transform:rotate(8deg)} }`}</style>

        {/* Modal */}
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-md flex flex-col">
              <div className="p-4 border-b flex justify-between"><div><h3 className="text-xl font-bold text-black">{selectedService.title}</h3><p className="text-sm text-gray-600">{selectedService.subtitle}</p></div><button onClick={handleCloseModal}><X className="h-6 w-6" /></button></div>
              <div className="p-4 overflow-y-auto"><h4 className="font-semibold mb-2">Full Checklist:</h4><ul className="space-y-2">{selectedService.checklist.map((item, i) => <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>)}</ul></div>
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Mobile Number*" maxLength={10} value={modalContactNumber} onChange={(e) => setModalContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={handleConfirmBooking} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Confirm Booking</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServiceConnaughtPlace;
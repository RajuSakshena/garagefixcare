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

const BestBikeServiceIndirapuram = () => {
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Hero carousel
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [heroImage, bigGarageBike, mechanicImage, bigGarageCar];
  const heroAlts = [
    "Best bike service in Indirapuram at your doorstep",
    "Doorstep two-wheeler repair Indirapuram Ghaziabad",
    "Expert motorcycle mechanic near Shipra Suncity",
    "Certified bike technician Ahinsa Khand Indirapuram"
  ];
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 2500);
    return () => clearInterval(t);
  }, []);

  const carouselImages = [
    { src: bikeServiceOfferImage, alt: "Bike service offer Indirapuram" },
    { src: doorstepImage, alt: "Doorstep bike service Indirapuram" },
    { src: engineImage, alt: "Bike engine repair Indirapuram Ghaziabad" },
    { src: roadsideImage, alt: "Roadside bike assistance NH-24 Indirapuram" },
  ];

  // Animated counters
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
    { title: "At-Home Regular Service", subtitle: "100 CC - 125 CC", originalPrice: "Rs. 599", discountedPrice: "Rs. 299", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "At-Home Classic Service", subtitle: "135 CC - 200 CC", originalPrice: "Rs. 799", discountedPrice: "Rs. 399", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "At-Home Premium Service", subtitle: "220 CC - 300 CC", originalPrice: "Rs. 1,199", discountedPrice: "Rs. 499", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "At-Home Royal Service", subtitle: "350 CC - 450 CC", originalPrice: "Rs. 1,599", discountedPrice: "Rs. 599", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "At-Home Sports Service", subtitle: "Above 500 CC", originalPrice: "Rs. 2,199", discountedPrice: "Rs. 999", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] }
  ];

  const checklistItems = [
    "Coolant check-up", "Basic Hand Cleaning", "Oiling and greasing", "Battery General check-up",
    "Basic Engine Inspection", "Basic Fork Inspection", "Carburettor Basic check-up", "Minor Electrical check-up",
    "Brakes – Front & Rear Adjust", "Driven Chain Basic Cleaning", "Tightening of Screws Bolts & Nuts",
    "Average and Performance check-up", "Engine Oil Change (Price Extra)", "Oil Filter Clean (If Replace Charges)",
    "Air Filter Clean (If Replace Charges)", "Spark Plug Clean (If Replace Charges)", "Tyre Air Fill (only tubeless)",
    "Free Pick and Drop (if needed)"
  ];

  const handleSeeChecklist = (title: string, subtitle: string) => {
    setSelectedService({ title, subtitle, checklist: checklistItems });
    setModalPhoneNumber('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setModalPhoneNumber('');
  };

  const handleModalBookNow = async () => {
    if (!modalPhoneNumber || modalPhoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!selectedService) return;
    try {
      const serviceType = `${selectedService.title} (${selectedService.subtitle})`;
      await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
        phoneNumber: modalPhoneNumber,
        serviceType: serviceType
      });
      alert('Thanks for booking! We have received your request and will contact you in 5 minutes.');
      closeModal();
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error('Error booking service:', error);
    }
  };

  const serviceCities = [
    { name: "Indirapuram", color: "text-indigo-700" },
    { name: "Ghaziabad", color: "text-red-700" },
    { name: "Noida", color: "text-teal-700" },
    { name: "Delhi", color: "text-gray-900" },
    { name: "Greater Noida", color: "text-orange-700" },
    { name: "Faridabad", color: "text-slate-700" },
  ];

  const coveredAreas = [
    "Shipra Suncity", "Ahinsa Khand 1", "Ahinsa Khand 2",
    "Gyan Khand", "Vaibhav Khand", "Aditya Mall",
    "Habitat Centre", "Kala Pathar Road", "CISF Road", "NH-24"
  ];

  const cityPages = [
    { name: "Gurgaon", path: "/best-bike-service-gurgaon" },
    { name: "Delhi", path: "/best-bike-service-delhi" },
    { name: "Noida", path: "/best-bike-service-noida" },
    { name: "Greater Noida", path: "/best-bike-service-greater-noida" },
    { name: "Ghaziabad", path: "/best-bike-service-ghaziabad" },
    { name: "Faridabad", path: "/best-bike-service-faridabad" },
    { name: "Indirapuram", path: "/best-bike-service-indirapuram" },
  ];

  return (
    <>
      <SEOHelmet
        title="Best Bike Service in Indirapuram | Doorstep Two-Wheeler Repair ₹299 | Garage Fix Care"
        description="Top-rated doorstep bike service in Indirapuram starting at ₹299. Expert mechanics visit Shipra Suncity, Ahinsa Khand, Gyan Khand & all areas. Same-day repair, engine overhaul, battery & tyre service with zero hidden charges."
        canonical="https://www.garagefixcare.in/best-bike-service-indirapuram"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-indirapuram",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep bike repair service in Indirapuram by Garage Fix Care",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Certified two-wheeler mechanics at your doorstep in Indirapuram",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Indirapuram's most trusted doorstep bike servicing — covering Shipra Suncity, Ahinsa Khand 1 & 2, Gyan Khand, Vaibhav Khand, and all residential pockets along NH-24. Starting at ₹299.",
            "url": "https://www.garagefixcare.in/best-bike-service-indirapuram",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Indirapuram",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.6406", "longitude": "77.3692" },
            "areaServed": [
              { "@type": "Place", "name": "Indirapuram", "sameAs": "https://en.wikipedia.org/wiki/Indirapuram" },
              { "@type": "City", "name": "Ghaziabad" },
              { "@type": "City", "name": "Noida" },
              { "@type": "City", "name": "Delhi" },
              { "@type": "City", "name": "Greater Noida" },
              { "@type": "City", "name": "Faridabad" }
            ],
            "serviceType": ["Bike Repair", "Doorstep Bike Service", "Engine Repair", "Battery Replacement", "Brake Repair", "Tyre Service", "Puncture Repair"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Doorstep Bike Repair in Indirapuram",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "Indirapuram, Ghaziabad",
            "description": "At-home two-wheeler servicing across Indirapuram — Shipra Suncity, Ahinsa Khand, Gyan Khand, Vaibhav Khand, Kala Pathar Road, CISF Road, and NH-24. Oil change, engine repair, battery swap, puncture fix from ₹299.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "299", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does bike servicing cost in Indirapuram?", "acceptedAnswer": { "@type": "Answer", "text": "At Garage Fix Care, bike service in Indirapuram starts at ₹299 for 100–125cc bikes. Classic Service (135–200cc) is ₹399, Premium (220–300cc) ₹499, Royal (350–450cc) ₹599, and Sports (above 500cc) ₹999 — all inclusive of labour, no hidden fees." } },
              { "@type": "Question", "name": "Do you send a mechanic to Shipra Suncity and Ahinsa Khand?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our mechanics regularly visit Shipra Suncity, Ahinsa Khand 1, Ahinsa Khand 2, Gyan Khand, and Vaibhav Khand. We arrive fully equipped at your society gate or parking area within 2–4 hours of booking." } },
              { "@type": "Question", "name": "Can you fix my bike near Aditya Mall or Habitat Centre?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Whether you are shopping at Aditya Mall, working near Habitat Centre, or commuting on NH-24, our Indirapuram mechanics can reach you within hours for on-spot repair or scheduled maintenance." } },
              { "@type": "Question", "name": "Do you cover CISF Road and Kala Pathar Road for bike repair?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, both CISF Road and Kala Pathar Road fall within our Indirapuram service zone. Our technicians travel to these areas with all necessary tools, oils, and spare parts." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Best Bike Service in Indirapuram", "item": "https://www.garagefixcare.in/best-bike-service-indirapuram" }
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
                    Best Bike Service in Indirapuram
                    <span className="text-orange-500"> — Doorstep Repair from ₹299</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Starting at just ₹299 • Same-Day Two-Wheeler Repair • Verified Mechanics at Your Door
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    Indirapuram residents now get professional bike care without stepping out. Our background-verified mechanics arrive at your housing society, office, or preferred spot — whether you live in Shipra Suncity, Ahinsa Khand 1 &amp; 2, Gyan Khand, or Vaibhav Khand. From routine oil changes to complete engine diagnostics, every job is done on the spot with genuine parts and full transparency.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ Starting ₹299", "✔ Same-Day Booking", "✔ Society Doorstep", "✔ Verified Mechanics", "✔ Zero Hidden Charges"].map((point, i) => (
                      <span key={i} className="font-medium">{point}</span>
                    ))}
                  </div>

                  {/* Book + Call Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-orange-700 transition-all duration-300 inline-block">
                      Book Service Now
                    </a>
                    <a href="tel:9540553759" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> Call Now</a>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="mt-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-4 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 text-center">Select Your Vehicle</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-semibold text-base transition-all duration-300"><Bike className="h-6 w-6" /><span>Bike &amp; Scooty</span></button>
                      <button onClick={() => navigate('/car')} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 text-white py-3 rounded-2xl font-semibold text-base"><Car className="h-6 w-6" /><span>Cars</span></button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Carousel + Reviews */}
                <div className="relative flex flex-col items-center lg:items-end gap-1">
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                    <img src={heroImages[heroIndex]} alt={heroAlts[heroIndex]} className="w-full rounded-lg transition-opacity duration-700" style={{ minHeight: '200px', objectFit: 'cover' }} />
                    <button onClick={() => setHeroIndex(i => (i - 1 + heroImages.length) % heroImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronLeft className="h-6 w-6" /></button>
                    <button onClick={() => setHeroIndex(i => (i + 1) % heroImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronRight className="h-6 w-6" /></button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {heroImages.map((_, i) => <button key={i} onClick={() => setHeroIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === heroIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="flex items-center justify-center gap-2 text-lg font-bold"><Star className="h-4 w-4 text-yellow-400 fill-current" />{reviewScore.toFixed(1)}/5</div><div className="text-xs font-semibold">Google Review</div></div>
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="text-lg font-bold">{happyCustomersCount.toLocaleString()}+</div><div className="text-xs font-semibold">Happy Customers</div></div>
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
            <div className="flex-1 overflow-hidden"><div className="flex items-center animate-marquee">{[...Array(3)].map((_, repIdx) => serviceCities.map((city, idx) => <span key={`${repIdx}-${idx}`} className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm ${city.color}`}>{city.name}</span>))}</div></div>
          </div>
        </div>

        {/* Hot Deals Carousel */}
        <section className="py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center mb-8"><div className="flex items-center"><h2 className="text-2xl sm:text-4xl font-bold mr-4"><span className="text-white">Hot Deals</span> <span className="text-red-600">This Week</span></h2><Flame className="h-8 w-8 text-orange-500" /></div><p className="text-lg text-white text-center">Exclusive savings for Indirapuram riders! Up to 10% off on all two-wheeler repair and servicing at your doorstep. Book now before slots fill up.</p></div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }} onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1"><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Indirapuram</span><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Ghaziabad</span></div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </section>

        {/* What Clients Say */}
        <section className="bg-slate-800 text-black py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 text-center mb-4"><h2 className="text-xl sm:text-3xl font-bold"><span className="text-white">What Our</span> <span className="text-red-600">Clients Say?</span></h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto px-2">
            {[{ img: googleReviewsImage, name: "Google", rating: "4.7/5", link: "https://goo.gl/maps/dqmKivbhftEaVxK79" }, { img: facebookReviewsImage, name: "Facebook", rating: "4.7/5", link: "https://www.instagram.com/p/DQVj8SmktgG/" }, { img: justdialReviewsImage, name: "JustDial", rating: "4.7/5", link: "https://www.justdial.com/jd-business?docid=011PXX11.XX11.251024223108.U1U5" }].map((rev, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-3 shadow-sm text-center"><img src={rev.img} alt={rev.name} className="mx-auto h-10 mb-2" /><div className="flex justify-center mb-1">{[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 text-yellow-400 fill-current" />)}</div><p className="font-semibold text-sm">{rev.rating} Rating</p><a href={rev.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">view us on {rev.name}</a></div>
            ))}
          </div>
        </section>

        {/* At-Home Service Price List */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4"><span className="text-white">At-Home Service</span> <span className="text-red-600">Price List</span></h2>
            <p className="text-xl text-white mb-6">Straightforward pricing for doorstep bike service in Indirapuram. Labour charges depend on engine displacement — every rupee accounted for, no surprises.</p>
            <div className="grid grid-cols-2 gap-3 justify-items-center">
              {servicePrices.map((service, idx) => (
                <div key={idx} className="bg-brandRed p-1 rounded-lg w-full"><div className="bg-sky-100 rounded-lg p-2"><div className="text-left"><h3 className="text-base font-bold">{service.title}</h3><p className="text-xs font-semibold">{service.subtitle}</p><div><span className="line-through text-red-500 mr-1">{service.originalPrice}</span><span className="text-green-600 font-bold">{service.discountedPrice}/-</span></div></div><ul className="list-none text-left text-xs mt-1">{service.features.map((f, fi) => <li key={fi} className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />{f}</li>)}</ul><div className="flex justify-end mt-1"><button onClick={() => handleSeeChecklist(service.title, service.subtitle)} className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">See checklist</button></div></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Covered Section */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">We Cover Every Pocket of <span className="text-red-600">Indirapuram</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {coveredAreas.map(area => <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>)}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">From the high-rise towers of Shipra Suncity to the busy lanes of Ahinsa Khand 1 &amp; 2, Gyan Khand, Vaibhav Khand, CISF Road, Kala Pathar Road, and the NH-24 corridor — our mechanics travel to you within 2–4 hours. If you commute daily from Indirapuram, keep your two-wheeler running perfectly without wasting a single working hour at a workshop.</p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Complete Two-Wheeler Care, <span className="text-red-600">Right Where You Are in Indirapuram</span></h2>
            <p className="text-white mb-6">Routine maintenance, emergency breakdown help, or full engine rebuilds — our Indirapuram mechanics handle every job at your parking spot.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {["Periodic Servicing", "Engine Diagnostics", "Battery Replacement", "Brake Overhaul", "Tyre & Puncture Fix", "Insurance Assistance"].map(service => (
                <div key={service} className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm">{service}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Content Section */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Garage Fix Care is <span className="text-red-600">Indirapuram's Most Trusted Bike Service</span></h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>Indirapuram has grown into one of the most densely populated residential hubs in the Delhi NCR belt, and its two-wheeler owners — whether they live in the gated towers of Shipra Suncity, the family apartments of Ahinsa Khand 1 and Ahinsa Khand 2, or the quieter lanes of Gyan Khand and Vaibhav Khand — deserve bike maintenance that fits a fast-paced urban schedule. Garage Fix Care was built for exactly this reality: a fully equipped mechanic reaches your society gate, basement parking, or office premises in as little as 2–4 hours after you book. Our technicians are background-verified, trained on multi-brand bikes, and carry professional-grade diagnostic equipment along with genuine Motul and Wurth lubricants and manufacturer-approved spare parts. Whether you ride a Honda Activa, TVS Jupiter, Hero Splendor, Bajaj Pulsar, Royal Enfield Classic 350, or a KTM Duke, our team handles your machine with the same care and precision. Doorstep bike service in Indirapuram starts at just ₹299, covering everything from engine oil replacement and air filter cleaning to spark plug inspection and brake calibration — all completed on the spot, with a detailed post-service report shared with you.</p>
              <p>Indirapuram's mix of office commuters, school-run parents, and shopping complex visitors around Aditya Mall and Habitat Centre means that two-wheelers work hard every single day on CISF Road, Kala Pathar Road, and the NH-24 stretch. Heavy traffic, seasonal dust, and humid monsoons accelerate oil degradation and filter clogging — making quarterly servicing not optional but essential. Our Indirapuram mechanics proactively flag emerging problems such as worn clutch cables, low chain tension, and weak batteries before these minor faults turn into expensive roadside failures. We also support residential welfare associations and office fleet managers who need bulk or periodic servicing for multiple bikes without disrupting daily routines. Beyond scheduled maintenance, our emergency breakdown assistance covers you anywhere in the Indirapuram area — one call and a technician is dispatched to your GPS pin, whether you are stuck near Kala Pathar Road late in the evening or stranded on NH-24 during peak hours. With more than 1,00,000 services completed across Delhi NCR and a consistent 4.7-star Google rating, Garage Fix Care delivers the dependability that Indirapuram riders rely on. Book online, via WhatsApp, or by direct call — and let us bring the workshop to your doorstep today.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><p className="text-xs">Get Rs.10 Off On Your First Service in Indirapuram</p><h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Service Warranty</span></h2><p className="mb-4">Indirapuram's go-to doorstep bike service. We work on all makes and models — Hero, Honda, Bajaj, TVS, Yamaha, Royal Enfield, KTM, Suzuki, and more — right at your home, society parking, or workplace.</p><div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ img: warrantyImg, title: "10-Day Free Service Guarantee", desc: "Post-service peace of mind" }, { img: pickupImg, title: "Free Pickup and Drop", desc: "When on-site repair isn't possible" }, { img: transparentImg, title: "Upfront Transparent Pricing", desc: "Save up to 30% vs workshops" }, { img: trainedImg, title: "Multi-Brand Certified Mechanics", desc: "Trained, tested, trusted" }].map((item, idx) => (
                <div key={idx} className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3"><img src={item.img} alt={item.title} className="h-10 w-10 object-contain" /><div><h3 className="font-bold text-sm">{item.title}</h3><p className="text-xs">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div className="order-2 lg:order-1"><img src={handshakeImg} alt="Trusted bike service partner in Indirapuram" className="rounded-lg shadow-lg w-full max-w-sm" /></div>
            <div className="order-1"><h2 className="text-3xl font-bold mb-2">Why Indirapuram Riders <span className="text-red-600">Choose GarageFixCare</span></h2><p>We eliminate the workshop trip entirely — no queuing, no leaving your bike behind for a whole day. Our mechanics bring everything needed to your door and finish the job in front of you.</p><ul className="space-y-2 mt-4">{["Doorstep Service Across All Indirapuram Zones", "Pre-Verified, Skilled Technicians", "Itemised Estimate Before Work Begins", "Only Genuine Oils and OEM Parts Used", "10-Day Satisfaction Guarantee", "Prompt Response Within 2–4 Hours"].map(item => <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>)}</ul></div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-12 bg-slate-900 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Customers</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 justify-items-center">
            {[{ name: "WURTH", img: wurthImg }, { name: "MOTUL", img: motulImg }, { name: "Turtlemint", img: turtlemintImg }, { name: "Buniyad", img: buniyadImg }, { name: "Dunzo", img: dunzoImg }].map(brand => <div key={brand.name} className="bg-white rounded-lg p-3 w-32 h-20 flex items-center justify-center"><img src={brand.img} alt={brand.name} className="max-h-12 object-contain" /></div>)}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><h2 className="text-3xl font-bold text-white mb-2">How <span className="text-red-600">GarageFixCare</span> Works in Indirapuram?</h2><p className="text-white mb-4">Booking bike repair in Indirapuram takes under a minute. Share your location and preferred slot — our mechanic does the rest.</p><ul className="space-y-2">{["Pick Your Service &amp; Book Online", "Technician Dispatched to Your Address", "Full Service Completed On-Site", "Live Updates During the Job", "Guaranteed Quality Assurance Check", "Pay After Completion — Cash or UPI"].map(s => <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> <span dangerouslySetInnerHTML={{ __html: s }} /></li>)}</ul></div>
            <div className="flex justify-center"><img src={howWorksImage} alt="How Garage Fix Care doorstep bike service works in Indirapuram" className="rounded-lg shadow-lg max-w-sm" /></div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Also Serving in <span className="text-red-600">Nearby Cities</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cityPages.map(city => <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>)}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-slate-800 py-10">
          <div className="text-center"><h2 className="text-3xl font-bold text-white">What <span className="text-red-600">Our Customers Say</span></h2><p className="text-white">Verified Reviews from Indirapuram Riders on Google</p><div className="flex justify-center gap-1 my-2">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}<span className="text-white ml-2 font-semibold">4.7 Rating on Google</span></div><a href="https://www.google.com" target="_blank" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Leave a Review on Google</a></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[{ name: "Ankita Verma", img: testimonial1, text: "Got my Activa serviced right at my Shipra Suncity society gate. Mechanic was punctual and the work was spotless.", time: "3 weeks ago" }, { name: "Rajeev Malhotra", img: testimonial2, text: "Transparent pricing and no upselling. They showed me exactly what was done on my Royal Enfield. Highly recommend.", time: "a month ago" }, { name: "Pooja Sharma", img: testimonial3, text: "As a daily commuter from Ahinsa Khand 2, this service saves me at least half a day every quarter. Brilliant concept.", time: "2 weeks ago" }, { name: "Nitin Chauhan", img: testimonial4, text: "Quick turnaround on my Pulsar's brake job near Kala Pathar Road. Very professional team from Garage Fix Care.", time: "a month ago" }].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center"><img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" /><div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div><p className="text-xs mt-1">{t.text}</p><img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" /><h3 className="font-semibold text-sm">{t.name}</h3><span className="text-xs">{t.time}</span></div>
            ))}
          </div>
        </section>

        {/* FAQs — Indirapuram specific */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Bike Service in Indirapuram — <span className="text-red-600">Frequently Asked Questions</span></h2>
            <div className="space-y-3">
              {[
                { q: "How much does a bike service cost in Indirapuram?", a: "Garage Fix Care offers bike service in Indirapuram starting at ₹299 for 100–125cc bikes. Classic Service (135–200cc) is ₹399, Premium Service (220–300cc) is ₹499, Royal Service (350–450cc) is ₹599, and Sports Service (above 500cc) is ₹999. All rates cover labour and include a detailed checklist with zero hidden charges." },
                { q: "Do you send mechanics inside Shipra Suncity and Ahinsa Khand societies?", a: "Yes. Our mechanics routinely service bikes inside gated communities including Shipra Suncity, Ahinsa Khand 1, Ahinsa Khand 2, Gyan Khand, and Vaibhav Khand. We arrive at your basement parking or society gate fully equipped — tools, engine oil, spare parts — so residents do not need to move their bikes." },
                { q: "Can you service my bike near Aditya Mall or Habitat Centre?", a: "Absolutely. Both Aditya Mall and Habitat Centre are within our Indirapuram service zone. Whether you are parked in the mall vicinity or stationed at an office near Habitat Centre, our technicians can schedule a visit that fits your work or shopping schedule." },
                { q: "Do you cover CISF Road and Kala Pathar Road for two-wheeler repair?", a: "Yes. CISF Road and Kala Pathar Road are active areas in our coverage map. Residents and commuters in these localities can book same-day doorstep service without any extra travel or surcharge." },
                { q: "Is there an emergency breakdown service available on NH-24?", a: "If your bike breaks down on NH-24 or anywhere within the Indirapuram belt, call us immediately on 9540553759. We dispatch the nearest available mechanic to your exact location, whether it is peak hour or evening time, for on-spot assessment and repair." },
                { q: "How long does a standard doorstep service take in Indirapuram?", a: "A routine oil-change service typically takes 45–60 minutes. More complex jobs such as brake overhaul, chain cleaning, or battery replacement may take 60–90 minutes. We give you a time estimate before starting so you can plan your day accordingly." },
                { q: "Which schools and office complexes in Indirapuram do you cater to?", a: "We serve parents doing school runs, teachers, and office commuters across Indirapuram. Our mechanics can visit near major schools such as DPS Indirapuram and Kendriya Vidyalaya, as well as IT parks and commercial buildings around the Habitat Centre and Aditya Mall stretch." },
                { q: "What is the best way to book bike service in Indirapuram?", a: "You can book online via our website, send a WhatsApp message to 9540553759, or call us directly. Share your preferred date, time slot, and Indirapuram locality. We confirm the booking within minutes and send your mechanic's details before arrival." },
                { q: "Do you offer a service warranty in Indirapuram?", a: "Every bike service in Indirapuram by Garage Fix Care comes with a 10-day free service guarantee. If any issue directly linked to the work done arises within this period, we revisit and resolve it at no additional cost." },
                { q: "What payment options are available for bike service in Indirapuram?", a: "We accept cash, UPI transfers (Google Pay, PhonePe, Paytm), and all popular digital wallets. Payment is collected only after the service is fully completed — never before. You also receive a digital invoice for every transaction." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-700 rounded-md">
                  <button className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700" onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}><span className="text-red-600">Q{idx + 1}.</span><span className="ml-2">{faq.q}</span>{activeIndex === idx ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
                  {activeIndex === idx && <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Schedule Your Bike Service in Indirapuram Today</h2>
          <p className="text-white mb-4">Doorstep two-wheeler repair from ₹299 — no garage visit, no waiting, no hidden fees. Serving Shipra Suncity, Ahinsa Khand, Gyan Khand &amp; all of Indirapuram.</p>
          <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 inline-block">Book Your Service Now</a>
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
              <div className="p-4 border-b flex justify-between"><div><h3 className="text-xl font-bold text-black">{selectedService.title}</h3><p className="text-sm text-gray-600">{selectedService.subtitle}</p></div><button onClick={closeModal}><X className="h-6 w-6" /></button></div>
              <div className="p-4 overflow-y-auto"><h4 className="font-semibold mb-2">Full Service Checklist:</h4><ul className="space-y-2">{selectedService.checklist.map((item, i) => <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>)}</ul></div>
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Phone Number*" maxLength={10} value={modalPhoneNumber} onChange={(e) => setModalPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={handleModalBookNow} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Book Now</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServiceIndirapuram;
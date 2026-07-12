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

const BestBikeServiceDelhi = () => {
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
    "Best bike service in Delhi at doorstep",
    "Doorstep bike repair in Delhi",
    "Professional motorcycle repair Delhi",
    "Certified bike mechanic near me Delhi"
  ];
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 2500);
    return () => clearInterval(t);
  }, []);

  const carouselImages = [
    { src: bikeServiceOfferImage, alt: "Bike service offer Delhi" },
    { src: doorstepImage, alt: "Doorstep bike service Delhi" },
    { src: engineImage, alt: "Bike engine repair Delhi" },
    { src: roadsideImage, alt: "Roadside bike assistance Delhi" },
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
    { name: "Delhi", color: "text-red-700" },
    { name: "Noida", color: "text-teal-700" },
    { name: "Ghaziabad", color: "text-gray-900" },
    { name: "Gurugram", color: "text-indigo-700" },
    { name: "Faridabad", color: "text-orange-700" },
    { name: "Greater Noida", color: "text-slate-700" },
  ];

  // Areas covered in Delhi
  const coveredAreas = ["South Delhi", "North Delhi", "East Delhi", "West Delhi", "Dwarka", "Rohini", "Laxmi Nagar", "Saket"];

  // Internal links to other city pages
  const cityPages = [
    { name: "Delhi", path: "/best-bike-service-delhi" },
    { name: "Noida", path: "/best-bike-service-noida" },
    { name: "Greater Noida", path: "/best-bike-service-greater-noida" },
    { name: "Ghaziabad", path: "/best-bike-service-ghaziabad" },
    { name: "Gurugram", path: "/best-bike-service-gurugram" },
    { name: "Faridabad", path: "/best-bike-service-faridabad" },
  ];

  return (
    <>
      <SEOHelmet
        title="Best Bike Service in Delhi | Doorstep Bike Repair ₹299 | Garage Fix Care"
        description="Book best bike service in Delhi starting at ₹299. Doorstep bike repair, oil change, battery replacement and trusted mechanics across Delhi NCR."
        canonical="https://www.garagefixcare.in/best-bike-service-delhi"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-delhi",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Best bike service in Delhi at doorstep by Garage Fix Care",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep bike service and repair in Delhi",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Best bike service in Delhi. Doorstep bike repair, servicing, oil change, battery replacement starting at ₹299.",
            "url": "https://www.garagefixcare.in/best-bike-service-delhi",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Delhi",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.6139", "longitude": "77.2090" },
            "areaServed": [
                { "@type": "City", "name": "Delhi", "sameAs": "https://en.wikipedia.org/wiki/Delhi" },
                { "@type": "City", "name": "Noida" },
                { "@type": "City", "name": "Ghaziabad" },
                { "@type": "City", "name": "Gurugram" },
                { "@type": "City", "name": "Faridabad" },
                { "@type": "City", "name": "Greater Noida" }
              ],
            "serviceType": ["Bike Repair", "Doorstep Bike Service", "Engine Repair", "Battery Replacement", "Brake Repair", "Tyre Service"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Doorstep Bike Service in Delhi",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "Delhi",
            "description": "At-home bike servicing starting at ₹299. Oil change, engine repair, battery replacement, puncture fix — same-day doorstep service across Delhi.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "299", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does bike service cost in Delhi?", "acceptedAnswer": { "@type": "Answer", "text": "Bike service in Delhi starts from ₹299 for 100–125cc bikes. Classic Service is ₹399, Premium ₹499, Royal ₹599, and Sports ₹999. All include labour with no hidden charges." } },
              { "@type": "Question", "name": "Do you provide doorstep bike repair in Delhi?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide complete doorstep bike repair across all major areas of Delhi. Certified mechanics come to your home fully equipped — no garage visit needed." } },
              { "@type": "Question", "name": "Which areas of Delhi are covered?", "acceptedAnswer": { "@type": "Answer", "text": "We cover South Delhi, North Delhi, East Delhi, West Delhi, Dwarka, Rohini, Laxmi Nagar, Saket, Pitampura, Janakpuri, Mayur Vihar, Vasant Kunj and all surrounding localities." } },
              { "@type": "Question", "name": "Do you handle emergency bike breakdown in Delhi?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If your bike breaks down anywhere in Delhi, call us immediately and we dispatch a mechanic to your location for on-spot repair or recovery." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Best Bike Service in Delhi", "item": "https://www.garagefixcare.in/best-bike-service-delhi" }
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
                    Best Bike Service in Delhi
                    <span className="text-orange-500"> — Doorstep Repair from ₹299</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Starting at just ₹299 • Same-Day Bike Repair • Certified Mechanics Near You
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    Get the most trusted bike service in Delhi right at your doorstep. Whether you own a commuter bike, sports bike, or scooty, our expert mechanics handle everything from oil change to engine overhaul. No garage queues, no hidden costs — just honest, affordable, and professional service across Delhi NCR.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ Starting ₹299", "✔ Same-Day Service", "✔ Doorstep Mechanics", "✔ Trusted Technicians", "✔ No Hidden Charges"].map((point, i) => (
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
            <div className="flex flex-col items-center justify-center mb-8"><div className="flex items-center"><h2 className="text-2xl sm:text-4xl font-bold mr-4"><span className="text-white">Hot Deals</span> <span className="text-red-600">This Week</span></h2><Flame className="h-8 w-8 text-orange-500" /></div><p className="text-lg text-white text-center">Limited-time offer for Delhi customers! Get up to 10% off on bike repairs and servicing at your doorstep. Hurry—these deals won’t last long!</p></div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }} onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1"><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Delhi</span><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">NCR</span></div>
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
            <p className="text-xl text-white mb-6">Transparent pricing for doorstep bike service in Delhi. Labour charges based on engine size — no hidden fees.</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">We Cover All Major Areas in <span className="text-red-600">Delhi NCR</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {coveredAreas.map(area => <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>)}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">Whether you live in South Delhi, North Delhi, East Delhi, West Delhi, Dwarka, Rohini, Laxmi Nagar, or Saket, our bike mechanics reach your doorstep within 2-4 hours. Same-day bike service available across Delhi NCR.</p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Complete Bike Care, <span className="text-red-600">Right at Your Door in Delhi</span></h2>
            <p className="text-white mb-6">From routine oil changes to full engine repair — our Delhi mechanics handle it all.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {["Regular Service", "Engine Repair", "Battery Replacement", "Brake Repair", "Tyre Service", "Insurance Assistance"].map(service => (
                <div key={service} className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm">{service}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Bike Service Content (1000+ words) */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Garage Fix Care is the <span className="text-red-600">Best Bike Service in Delhi</span></h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>Getting a trustworthy bike service in Delhi has always been harder than it should be. Across the city — from the crowded lanes of Laxmi Nagar to the wide avenues of Dwarka, from busy Rohini to upscale South Delhi — two-wheeler owners routinely face overcharging, unclear billing, and mechanics who keep bikes for days without updates. Garage Fix Care was built specifically to solve this. We are Delhi's most trusted doorstep bike service, sending certified and background-verified mechanics directly to your home or office. Our doorstep bike repair in Delhi starts at just ₹299, and we cover every major locality across the city — North Delhi, South Delhi, East Delhi, West Delhi, Dwarka, Rohini, Saket, Laxmi Nagar, Pitampura, Janakpuri, Mayur Vihar, and Vasant Kunj. Our mechanics arrive fully equipped with tools, genuine engine oils, and spare parts, so your bike gets serviced on the spot without you stepping out. Whether you ride a Hero Splendor, Honda Activa, Bajaj Pulsar, Royal Enfield Classic 350, KTM Duke, or any other brand, our expert Delhi mechanics handle everything from routine oil changes to full engine overhauls. What makes us the best bike service in Delhi is simple: complete pricing transparency. You receive a detailed cost estimate before a single bolt is turned — zero surprise charges, guaranteed. We use only certified engine oils from Motul and Wurth with manufacturer-recommended parts, and every service is backed by our 10-day hassle-free guarantee.</p>
              <p>Delhi's extreme heat, heavy traffic, and dusty roads put serious stress on your bike's engine, air filter, brakes, and tyres. Regular professional servicing is not a luxury — it is essential for safety and performance on Delhi roads. Our mechanics use diagnostic tools to catch issues early before they become expensive problems, significantly extending the life of your vehicle. Beyond scheduled servicing, we also handle emergency breakdown situations in Delhi. If your bike stops working mid-route anywhere in the city, call us and we dispatch a mechanic to your exact location as quickly as possible. From battery replacement and brake pad changes to clutch cable adjustment and tyre puncture repair, we do it all on the spot. We have successfully completed over 1,00,000 services across Delhi NCR, and our customers consistently rate us 4.7 stars on Google for punctuality, honesty, and professionalism. <a href="https://www.garagefixcare.in/bookservice" className="text-orange-400 hover:text-orange-300 underline">Book your bike service in Delhi</a> today through our website, WhatsApp, or phone — and experience the difference that genuine doorstep care makes.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><p className="text-xs">Get Rs.10 Off On First Service in Delhi</p><h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Service Warranty</span></h2><p className="mb-4">Delhi's trusted doorstep bike service. We service all motorcycle and scooter brands — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right at your home or office.</p><div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ img: warrantyImg, title: "10-Day Free Service Guarantee", desc: "Hassle-Free Warranty" }, { img: pickupImg, title: "Free Pickup and Drop", desc: "Convenient service" }, { img: transparentImg, title: "Transparent Pricing", desc: "Save up to 30%" }, { img: trainedImg, title: "Skilled Certified Mechanics", desc: "Expert technicians" }].map((item, idx) => (
                <div key={idx} className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3"><img src={item.img} alt={item.title} className="h-10 w-10 object-contain" /><div><h3 className="font-bold text-sm">{item.title}</h3><p className="text-xs">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div className="order-2 lg:order-1"><img src={handshakeImg} alt="Handshake" className="rounded-lg shadow-lg w-full max-w-sm" /></div>
            <div className="order-1"><h2 className="text-3xl font-bold mb-2">Why Choose <span className="text-red-600">GarageFixCare?</span></h2><p>We bring certified mechanics directly to Delhi residents — honest pricing, genuine parts, zero hassle.</p><ul className="space-y-2 mt-4">{["Hassle-Free Doorstep Service", "Certified and Skilled Technicians", "Honest Pricing", "Certified Genuine Parts", "Your Satisfaction Guaranteed", "Fast and Professional Service"].map(item => <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>)}</ul></div>
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
            <div><h2 className="text-3xl font-bold text-white mb-2">How <span className="text-red-600">GarageFixCare</span> Works?</h2><p className="text-white mb-4">Getting your bike serviced in Delhi is simple. Book online or call us, a skilled mechanic arrives at your doorstep.</p><ul className="space-y-2">{["Schedule Your Service", "Technician Sent to You", "Service Done on the Spot", "Clear Communication", "Guaranteed Quality", "Easy Payment & Feedback"].map(s => <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> {s}</li>)}</ul></div>
            <div className="flex justify-center"><img src={howWorksImage} alt="How it works" className="rounded-lg shadow-lg max-w-sm" /></div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Also Serving in <span className="text-red-600">Nearby Cities</span></h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {cityPages.map(city => <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>)}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="text-gray-300 hover:text-white text-sm underline underline-offset-2">← Back to Home</Link>
            <span className="text-gray-500">|</span>
            <Link to="/contact" className="text-gray-300 hover:text-white text-sm underline underline-offset-2">Contact Us</Link>
            <span className="text-gray-500">|</span>
            <a href="https://www.garagefixcare.in/bookservice" className="text-orange-400 hover:text-orange-300 text-sm font-semibold underline underline-offset-2">Book Service Now →</a>
          </div>
        </section>

        {/* Testimonials & Customer Speaks */}
        <section className="bg-slate-800 py-10">
          <div className="text-center"><h2 className="text-3xl font-bold text-white">What <span className="text-red-600">Customers Say</span></h2><p className="text-white">Customer Testimonials on Google</p><div className="flex justify-center gap-1 my-2">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}<span className="text-white ml-2 font-semibold">4.7 Rating on Google</span></div><a href="https://www.google.com" target="_blank" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Review us on Google</a></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[{ name: "Surendra Singh", img: testimonial1, text: "Excellent experience with GarageFixCare. Professional and knowledgeable.", time: "a month ago" }, { name: "Dharmendra Gupta", img: testimonial2, text: "Transparent service with video evidence. Highly reliable.", time: "a month ago" }, { name: "Rohit Prasad", img: testimonial3, text: "Great doorstep service, convenient and affordable.", time: "a month ago" }, { name: "Prabhjeet Sharma", img: testimonial4, text: "Quick response, professional mechanic. Will recommend.", time: "a month ago" }].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center"><img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" /><div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div><p className="text-xs mt-1">{t.text}</p><img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" /><h3 className="font-semibold text-sm">{t.name}</h3><span className="text-xs">{t.time}</span></div>
            ))}
          </div>
        </section>

        {/* FAQs (15 items - Delhi specific) */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Bike Service in Delhi — <span className="text-red-600">Common Questions</span></h2>
            <div className="space-y-3">
              {[
                { q: "How much does bike service cost in Delhi?", a: "Bike service in Delhi at Garage Fix Care starts from ₹299 for 100–125cc bikes (Regular Service). Classic Service (135–200 CC) is ₹399, Premium Service (220–300 CC) is ₹499, Royal Service (350–450 CC) is ₹599, and Sports Service (above 500 CC) is ₹999. All prices cover labour with zero hidden charges." },
                { q: "Do you provide doorstep bike repair in Delhi?", a: "Yes, we provide complete doorstep bike repair across all major areas of Delhi. Our certified mechanics come to your home or office fully equipped with tools, oils, and parts. You never need to visit a garage." },
                { q: "Which areas of Delhi are covered for bike service?", a: "We cover South Delhi, North Delhi, East Delhi, West Delhi, Dwarka, Rohini, Laxmi Nagar, Saket, Pitampura, Janakpuri, Mayur Vihar, Vasant Kunj, and all surrounding Delhi NCR localities." },
                { q: "What is the best bike service in Delhi?", a: "Garage Fix Care is Delhi's highest-rated doorstep bike service, starting at ₹299 with certified mechanics, transparent pricing, genuine parts, and a 10-day service guarantee." },
                { q: "Do you service Royal Enfield bikes in Delhi?", a: "Yes. We specialise in Royal Enfield servicing across Delhi — Classic 350, Bullet 350, Meteor 350, Himalayan, and Thunderbird — all serviced at your doorstep." },
                { q: "How quickly can a mechanic reach me in Delhi?", a: "Our mechanics typically reach your location in Delhi within 2–4 hours of booking. For urgent requests, call us and we will prioritise your slot." },
                { q: "Is your bike service pricing transparent in Delhi?", a: "Absolutely. We provide a full cost estimate before starting any work. No surprise bills — what you see is exactly what you pay." },
                { q: "Do you service scooties in Delhi?", a: "Yes. We repair and service all scooties across Delhi — Honda Activa, TVS Jupiter, Suzuki Access 125, Honda Dio, Hero Maestro — all at your doorstep." },
                { q: "Do you offer a warranty on bike service in Delhi?", a: "Every service by Garage Fix Care in Delhi includes a 10-day hassle-free service guarantee. If any issue arises post-service, we address it at no extra cost." },
                { q: "How do I book a bike mechanic near me in Delhi?", a: "You can book via our website, WhatsApp us on 9540553759, or call directly. Share your Delhi area and preferred time slot — we handle the rest." },
                { q: "What payment methods are accepted in Delhi?", a: "We accept cash, UPI (Google Pay, PhonePe, Paytm), and all major mobile wallets. Payment is collected only after the service is complete." },
                { q: "Do I need to arrange any tools or oils?", a: "No. Our Delhi mechanics arrive fully equipped — tools, genuine Motul/Wurth engine oils, and all required spare parts are brought by the mechanic." },
                { q: "Can I book service for multiple bikes in Delhi?", a: "Yes, simply mention the number of bikes while booking and we will arrange the right team for your location." },
                { q: "What makes Garage Fix Care better than a local Delhi workshop?", a: "We come to you, save your travel time, offer transparent itemised billing, use genuine parts, and provide a 10-day warranty — something most local Delhi workshops cannot match." },
                { q: "Do you handle emergency bike breakdown in Delhi?", a: "Yes. If your bike breaks down anywhere in Delhi, call us immediately. We dispatch a mechanic to your location for on-spot repair or recovery assistance." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-700 rounded-md">
                  <button className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700" onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}><span className="text-red-600">Q{idx+1}.</span><span className="ml-2">{faq.q}</span>{activeIndex === idx ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
                  {activeIndex === idx && <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Book Bike Service in Delhi Today</h2>
          <p className="text-white mb-4">Same-day doorstep service starting at ₹299. No travel, no waiting, no hidden charges.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 inline-block">Book Your Service</a>
            <Link to="/" className="bg-slate-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-600 inline-block">Home</Link>
            <Link to="/contact" className="bg-slate-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-600 inline-block">Contact Us</Link>
          </div>
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
              <div className="p-4 overflow-y-auto"><h4 className="font-semibold mb-2">Full Checklist:</h4><ul className="space-y-2">{selectedService.checklist.map((item, i) => <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>)}</ul></div>
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Phone Number*" maxLength={10} value={modalPhoneNumber} onChange={(e) => setModalPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={() => { handleModalBookNow(); }} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Book Now</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServiceDelhi;
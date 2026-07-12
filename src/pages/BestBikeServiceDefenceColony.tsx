import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X, Plus, Phone as PhoneIcon, ChevronLeft, ChevronRight, Bike, Car } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

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

const BestBikeServiceDefenceColony = () => {
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [heroImage, bigGarageBike, mechanicImage, bigGarageCar];
  const heroAlts = [
    "Best bike service in Defence Colony at your doorstep",
    "Doorstep bike repair near Defence Colony Delhi",
    "Professional mechanic for bikes in South Delhi",
    "Certified bike technician Defence Colony and Lajpat Nagar"
  ];

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 2500);
    return () => clearInterval(t);
  }, []);

  const carouselImages = [
    { src: bikeServiceOfferImage, alt: "Bike service offer Defence Colony Delhi" },
    { src: doorstepImage, alt: "Doorstep bike repair South Delhi" },
    { src: engineImage, alt: "Bike engine repair near Lajpat Nagar" },
    { src: roadsideImage, alt: "Roadside bike assistance South Extension Delhi" },
  ];

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
    { title: "Essential Home Service", subtitle: "100 CC - 125 CC", originalPrice: "Rs. 599", discountedPrice: "Rs. 299", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "Standard Home Service", subtitle: "135 CC - 200 CC", originalPrice: "Rs. 799", discountedPrice: "Rs. 399", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "Advanced Home Service", subtitle: "220 CC - 300 CC", originalPrice: "Rs. 1,199", discountedPrice: "Rs. 499", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "Elite Home Service", subtitle: "350 CC - 450 CC", originalPrice: "Rs. 1,599", discountedPrice: "Rs. 599", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] },
    { title: "Performance Home Service", subtitle: "Above 500 CC", originalPrice: "Rs. 2,199", discountedPrice: "Rs. 999", features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"] }
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
      alert('Booking confirmed! Our team will call you within 5 minutes to schedule your Defence Colony visit.');
      closeModal();
    } catch (error) {
      alert('Booking failed. Please try again or call us directly.');
      console.error('Error booking service:', error);
    }
  };

  const serviceCities = [
    { name: "Defence Colony", color: "text-indigo-700" },
    { name: "Delhi", color: "text-red-700" },
    { name: "Noida", color: "text-teal-700" },
    { name: "Ghaziabad", color: "text-gray-900" },
    { name: "Faridabad", color: "text-orange-700" },
    { name: "Greater Noida", color: "text-slate-700" },
  ];

  const coveredAreas = [
    "Defence Colony Main Market",
    "Lajpat Nagar",
    "South Extension",
    "Lodhi Colony",
    "INA Market",
    "Jangpura",
    "Andrews Ganj",
    "AIIMS",
    "Moolchand",
    "Ring Road"
  ];

  const cityPages = [
    { name: "Delhi", path: "/best-bike-service-delhi" },
    { name: "Noida", path: "/best-bike-service-noida" },
    { name: "Greater Noida", path: "/best-bike-service-greater-noida" },
    { name: "Ghaziabad", path: "/best-bike-service-ghaziabad" },
    { name: "Faridabad", path: "/best-bike-service-faridabad" },
  ];

  return (
    <>
      <SEOHelmet
        title="Best Bike Service in Defence Colony Delhi | Doorstep Repair from ₹299 | Garage Fix Care"
        description="Need a trusted bike mechanic near Defence Colony? Garage Fix Care delivers certified doorstep bike service across South Delhi — oil change, engine repair & more from ₹299."
        canonical="https://www.garagefixcare.in/best-bike-service-defence-colony"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-defence-colony",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep bike service in Defence Colony Delhi by Garage Fix Care",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Professional bike repair and service at home in Defence Colony",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Doorstep bike service and repair in Defence Colony, South Delhi. Certified mechanics for oil change, engine overhaul, battery replacement and full bike maintenance starting at ₹299.",
            "url": "https://www.garagefixcare.in/best-bike-service-defence-colony",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Defence Colony",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.5726", "longitude": "77.2246" },
            "areaServed": [
              { "@type": "Place", "name": "Defence Colony" },
              { "@type": "Place", "name": "Lajpat Nagar" },
              { "@type": "Place", "name": "South Extension" },
              { "@type": "Place", "name": "Lodhi Colony" },
              { "@type": "Place", "name": "INA" },
              { "@type": "Place", "name": "Jangpura" },
              { "@type": "Place", "name": "Andrews Ganj" },
              { "@type": "Place", "name": "AIIMS" },
              { "@type": "Place", "name": "Moolchand" }
            ],
            "serviceType": ["Bike Repair", "Doorstep Bike Service", "Engine Repair", "Battery Replacement", "Brake Repair", "Tyre Service"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Doorstep Bike Service in Defence Colony Delhi",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "Defence Colony, South Delhi",
            "description": "At-home bike repair and maintenance across Defence Colony and neighbouring South Delhi areas. Covers oil change, brake service, engine diagnostics, battery swap and more — starting at ₹299 with no hidden charges.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "299", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Is doorstep bike service available in Defence Colony?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Garage Fix Care provides fully equipped doorstep bike servicing across Defence Colony, Lajpat Nagar, South Extension, Lodhi Colony, INA, Jangpura, Andrews Ganj, AIIMS, Moolchand and Ring Road." } },
              { "@type": "Question", "name": "How much does bike repair cost near Defence Colony Main Market?", "acceptedAnswer": { "@type": "Answer", "text": "Service starts at ₹299 for 100–125cc bikes. Rates go up to ₹999 for performance bikes above 500cc. All prices are inclusive of labour with itemised billing." } },
              { "@type": "Question", "name": "How quickly does a mechanic arrive in Defence Colony?", "acceptedAnswer": { "@type": "Answer", "text": "Our mechanics typically reach your Defence Colony address within 2–4 hours of booking. For priority slots, call us directly." } },
              { "@type": "Question", "name": "Do you service bikes near AIIMS and Moolchand?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We regularly service bikes belonging to medical staff, students and residents near AIIMS Delhi, Moolchand Hospital and the surrounding colonies." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Best Bike Service in Defence Colony", "item": "https://www.garagefixcare.in/best-bike-service-defence-colony" }
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
                    Doorstep Bike Service in Defence Colony
                    <span className="text-orange-500"> — Starting at ₹299</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Certified Mechanics • Same-Day Slots • Zero Hidden Charges
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    South Delhi's busiest lanes — from Defence Colony Main Market to Ring Road — demand a bike that performs every single day. Whether you ride to your office in Lodhi Colony, drop kids at a school near Jangpura, or commute to AIIMS, Garage Fix Care's verified mechanics arrive at your door fully equipped. No workshop visit, no downtime, no surprises on the bill.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ From ₹299", "✔ Same-Day Booking", "✔ Verified Mechanics", "✔ 10-Day Warranty", "✔ Genuine Parts"].map((point, i) => (
                      <span key={i} className="font-medium">{point}</span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-orange-700 transition-all duration-300 inline-block">
                      Book Service Now
                    </a>
                    <a href="tel:9540553759" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="mt-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-4 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 text-center">Choose Your Vehicle Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-semibold text-base transition-all duration-300">
                        <Bike className="h-6 w-6" /><span>Bike &amp; Scooty</span>
                      </button>
                      <button onClick={() => navigate('/car')} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 text-white py-3 rounded-2xl font-semibold text-base">
                        <Car className="h-6 w-6" /><span>Cars</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Carousel + Counters */}
                <div className="relative flex flex-col items-center lg:items-end gap-1">
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                    <img src={heroImages[heroIndex]} alt={heroAlts[heroIndex]} className="w-full rounded-lg transition-opacity duration-700" style={{ minHeight: '200px', objectFit: 'cover' }} />
                    <button onClick={() => setHeroIndex(i => (i - 1 + heroImages.length) % heroImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full">
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button onClick={() => setHeroIndex(i => (i + 1) % heroImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full">
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {heroImages.map((_, i) => (
                        <button key={i} onClick={() => setHeroIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === heroIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center">
                      <div className="flex items-center justify-center gap-2 text-lg font-bold">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />{reviewScore.toFixed(1)}/5
                      </div>
                      <div className="text-xs font-semibold">Google Review</div>
                    </div>
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center">
                      <div className="text-lg font-bold">{happyCustomersCount.toLocaleString()}+</div>
                      <div className="text-xs font-semibold">Satisfied Riders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Marquee cities */}
        <div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
          <div className="flex items-center text-sm font-semibold max-w-7xl mx-auto">
            <div className="flex-shrink-0 px-2">
              <span className="text-red-600 mr-1 font-bold">Service Available</span>
              <span className="text-brandRed font-bold"> (10% off)</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center animate-marquee">
                {[...Array(3)].map((_, repIdx) => serviceCities.map((city, idx) => (
                  <span key={`${repIdx}-${idx}`} className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm ${city.color}`}>{city.name}</span>
                )))}
              </div>
            </div>
          </div>
        </div>

        {/* Hot Deals Carousel */}
        <section className="py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center">
                <h2 className="text-2xl sm:text-4xl font-bold mr-4">
                  <span className="text-white">Limited Offers</span> <span className="text-red-600">for South Delhi</span>
                </h2>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-lg text-white text-center">Exclusive deals for riders in Defence Colony and nearby areas. Up to 10% off on bike repair and servicing this week only!</p>
            </div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10 relative" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1">
                    <span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Defence Colony</span>
                    <span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">South Delhi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </section>

        {/* What Clients Say — Ratings */}
        <section className="bg-slate-800 text-black py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 text-center mb-4">
            <h2 className="text-xl sm:text-3xl font-bold"><span className="text-white">Riders in Defence Colony</span> <span className="text-red-600">Trust Us</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto px-2">
            {[
              { img: googleReviewsImage, name: "Google", rating: "4.7/5", link: "https://goo.gl/maps/dqmKivbhftEaVxK79" },
              { img: facebookReviewsImage, name: "Facebook", rating: "4.7/5", link: "https://www.instagram.com/p/DQVj8SmktgG/" },
              { img: justdialReviewsImage, name: "JustDial", rating: "4.7/5", link: "https://www.justdial.com/jd-business?docid=011PXX11.XX11.251024223108.U1U5" }
            ].map((rev, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-3 shadow-sm text-center">
                <img src={rev.img} alt={rev.name} className="mx-auto h-10 mb-2" />
                <div className="flex justify-center mb-1">{[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 text-yellow-400 fill-current" />)}</div>
                <p className="font-semibold text-sm">{rev.rating} Rating</p>
                <a href={rev.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">View us on {rev.name}</a>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Transparent Pricing —</span> <span className="text-red-600">No Surprises</span>
            </h2>
            <p className="text-xl text-white mb-6">Flat labour rates for doorstep bike care across Defence Colony. What you see is exactly what you pay.</p>
            <div className="grid grid-cols-2 gap-3 justify-items-center">
              {servicePrices.map((service, idx) => (
                <div key={idx} className="bg-brandRed p-1 rounded-lg w-full">
                  <div className="bg-sky-100 rounded-lg p-2">
                    <div className="text-left">
                      <h3 className="text-base font-bold">{service.title}</h3>
                      <p className="text-xs font-semibold">{service.subtitle}</p>
                      <div>
                        <span className="line-through text-red-500 mr-1">{service.originalPrice}</span>
                        <span className="text-green-600 font-bold">{service.discountedPrice}/-</span>
                      </div>
                    </div>
                    <ul className="list-none text-left text-xs mt-1">
                      {service.features.map((f, fi) => (
                        <li key={fi} className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />{f}</li>
                      ))}
                    </ul>
                    <div className="flex justify-end mt-1">
                      <button onClick={() => handleSeeChecklist(service.title, service.subtitle)} className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">See checklist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Covered */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">We Reach Every Corner of <span className="text-red-600">South Delhi</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {coveredAreas.map(area => (
                <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>
              ))}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">
              From Defence Colony Main Market and INA to Moolchand and Ring Road, our mechanics cover every block of South Delhi. Residents of Jangpura, Andrews Ganj, Lodhi Colony and South Extension can book same-day slots and receive service within 2–4 hours.
            </p>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Every Bike Need Covered, <span className="text-red-600">Right at Your Gate</span></h2>
            <p className="text-white mb-6">Our Defence Colony mechanics handle everything from a quick oil top-up to a full electrical diagnosis — without you losing a working day.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {["Regular Servicing", "Engine Overhaul", "Battery Swap", "Brake Adjustment", "Puncture Repair", "Insurance Claims"].map(service => (
                <div key={service} className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm">{service}</div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Long-form Content */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Why Defence Colony Riders Choose <span className="text-red-600">Garage Fix Care</span>
            </h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>
                Defence Colony is one of South Delhi's most vibrant residential and commercial hubs. Thousands of two-wheeler owners navigate its lanes every morning — heading to offices in Lodhi Colony, picking up groceries from Defence Colony Main Market, visiting cafes along South Extension, or commuting to hospitals near AIIMS and Moolchand. For these riders, a smoothly running bike is not a luxury but a necessity. Yet finding reliable, honest bike service in this part of the city has historically meant either long waits at a local workshop or expensive dealership charges. Garage Fix Care was built to change that reality.
              </p>
              <p>
                We deploy background-verified, certified mechanics directly to your home, office parking, or society gate across Defence Colony, Lajpat Nagar, INA, Jangpura, Andrews Ganj, Ring Road and the surrounding pockets. There is no need to push your bike to a service centre or waste half your day in a workshop waiting area. Book online or over a call, share your address and preferred time, and our technician arrives with a fully stocked kit — genuine engine oils from Motul and Wurth, manufacturer-approved filters, spark plugs, and professional diagnostic tools. Every service begins with a transparent cost estimate; you approve the scope before any work starts, so there are zero bill shocks when the job is done.
              </p>
              <p>
                South Delhi's road conditions — from the Ring Road flyovers to the tight bylanes near Jangpura and Andrews Ganj — put consistent pressure on brakes, tyres, clutch cables, and engine components. Our mechanics are trained to spot minor wear before it escalates. During a standard service we inspect brake pads, chain tension, battery terminals, tyre pressure, and the air and oil filters, catching problems early and saving you from costlier repairs down the road. We also handle urgent breakdowns — if your bike stalls near Moolchand or dies on the way to school near South Extension, a call to Garage Fix Care will have a mechanic at your precise location, not asking you to bring the bike to us.
              </p>
              <p>
                Medical professionals commuting to AIIMS, families running errands near INA Market, students riding between tuition classes in Lajpat Nagar, delivery riders navigating residential colonies — all trust Garage Fix Care because our pricing starts at just ₹299 and every completed job carries a 10-day hassle-free service guarantee. We service every popular brand: Hero Splendor, Honda CB Shine, Bajaj Pulsar, Royal Enfield Classic, TVS Apache, Yamaha FZ, Honda Activa, TVS Jupiter, Suzuki Access 125 and more. With over one lakh services completed across Delhi NCR and a consistent 4.7-star Google rating, we bring both expertise and accountability to your doorstep. Book your slot today and experience two-wheeler care that respects your time and your budget.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-xs">Exclusive: ₹10 Off on Your First Booking in Defence Colony</p>
              <h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Quality Promise</span></h2>
              <p className="mb-4">
                We service all motorcycle and scooter brands in Defence Colony and South Delhi — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM — arriving at your home, office parking or society gate.
              </p>
              <div className="flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { img: warrantyImg, title: "10-Day Service Guarantee", desc: "Post-service issues fixed free of cost" },
                { img: pickupImg, title: "Free Pickup & Drop", desc: "When on-site service isn't possible" },
                { img: transparentImg, title: "Upfront Pricing", desc: "Full estimate before work begins" },
                { img: trainedImg, title: "Background-Verified Mechanics", desc: "Skilled, trusted, professional" }
              ].map((item, idx) => (
                <div key={idx} className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3">
                  <img src={item.img} alt={item.title} className="h-10 w-10 object-contain" />
                  <div>
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <p className="text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div className="order-2 lg:order-1">
              <img src={handshakeImg} alt="Trusted bike service partner Defence Colony" className="rounded-lg shadow-lg w-full max-w-sm" />
            </div>
            <div className="order-1">
              <h2 className="text-3xl font-bold mb-2">What Sets <span className="text-red-600">Garage Fix Care Apart?</span></h2>
              <p>South Delhi riders deserve more than a quick patch-up. We bring integrity, skill, and genuine parts directly to Defence Colony and beyond.</p>
              <ul className="space-y-2 mt-4">
                {[
                  "Mechanics arrive at your gate — no travel needed",
                  "Itemised quotation approved by you before work starts",
                  "Genuine Motul & Wurth lubricants on every job",
                  "10-day warranty on all services, no fine print",
                  "Punctual, polite, background-checked technicians",
                  "Emergency breakdown response across South Delhi"
                ].map(item => (
                  <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-12 bg-slate-900 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Backed by <span className="text-red-600">Industry Leaders</span> and Trusted by <span className="text-red-600">1,00,000+ Customers</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 justify-items-center">
            {[
              { name: "WURTH", img: wurthImg },
              { name: "MOTUL", img: motulImg },
              { name: "Turtlemint", img: turtlemintImg },
              { name: "Buniyad", img: buniyadImg },
              { name: "Dunzo", img: dunzoImg }
            ].map(brand => (
              <div key={brand.name} className="bg-white rounded-lg p-3 w-32 h-20 flex items-center justify-center">
                <img src={brand.img} alt={brand.name} className="max-h-12 object-contain" />
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">How <span className="text-red-600">GarageFixCare</span> Works in Defence Colony?</h2>
              <p className="text-white mb-4">
                Getting your bike serviced near Defence Colony Main Market or anywhere in South Delhi takes just a few steps — no garage run, no waiting room.
              </p>
              <ul className="space-y-2">
                {[
                  "Pick a time slot and share your address",
                  "Verified mechanic rides to your location",
                  "Inspection and estimate shared upfront",
                  "All work done on-site with genuine parts",
                  "Test ride and quality check before we leave",
                  "Pay digitally or cash — only after you're satisfied"
                ].map(s => (
                  <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> {s}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <img src={howWorksImage} alt="How Garage Fix Care works" className="rounded-lg shadow-lg max-w-sm" />
            </div>
          </div>
        </section>

        {/* Nearby Areas / Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Also Serving <span className="text-red-600">Nearby Cities</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cityPages.map(city => (
              <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-slate-800 py-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">What Our <span className="text-red-600">Riders Say</span></h2>
            <p className="text-white">Verified testimonials from customers across Defence Colony and South Delhi</p>
            <div className="flex justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
              <span className="text-white ml-2 font-semibold">4.7 Rating on Google</span>
            </div>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Leave a Google Review</a>
          </div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[
              { name: "Surendra Singh", img: testimonial1, text: "My Pulsar broke down near INA. The mechanic arrived in under 3 hours, fixed it on-site, and the pricing was crystal clear. Excellent service.", time: "a month ago" },
              { name: "Dharmendra Gupta", img: testimonial2, text: "Video evidence of every step gave me total confidence. Great work near Lajpat Nagar. Won't go to a workshop again.", time: "a month ago" },
              { name: "Rohit Prasad", img: testimonial3, text: "My Activa wouldn't start on a Monday morning before my hospital shift. They were at my gate in Defence Colony by 8 AM. Lifesavers!", time: "a month ago" },
              { name: "Prabhjeet Sharma", img: testimonial4, text: "Fast, professional, and genuinely affordable. My Royal Enfield runs smoother than it has in years. Highly recommended for South Delhi riders.", time: "a month ago" }
            ].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center">
                <img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" />
                <div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
                <p className="text-xs mt-1">{t.text}</p>
                <img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" />
                <h3 className="font-semibold text-sm">{t.name}</h3>
                <span className="text-xs">{t.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs — Defence Colony Specific */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Bike Service in Defence Colony — <span className="text-red-600">Your Questions Answered</span>
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "Do you offer doorstep bike service near Defence Colony Main Market?",
                  a: "Yes. Our mechanics reach Defence Colony Main Market and all adjacent blocks directly. You don't need to move your bike — we come fully equipped to your parking spot or gate."
                },
                {
                  q: "What is the starting price for bike service in Defence Colony?",
                  a: "Service for 100–125cc bikes starts at ₹299. Standard bikes (135–200cc) are ₹399, premium (220–300cc) ₹499, elite Royal Enfield-class bikes (350–450cc) ₹599, and high-performance bikes above 500cc ₹999. All rates are for labour and include zero hidden fees."
                },
                {
                  q: "Can I book a bike mechanic near Lajpat Nagar or South Extension?",
                  a: "Absolutely. We cover Lajpat Nagar, South Extension Part I and II, INA Market and the entire surrounding belt. Book a slot and our mechanic will arrive at your specified South Delhi address within 2–4 hours."
                },
                {
                  q: "Do you service bikes for medical staff commuting to AIIMS or Moolchand?",
                  a: "Yes, and we understand the urgency for healthcare professionals. Early morning and late evening slots are available for riders near AIIMS, Moolchand Hospital and Safdarjung Enclave so that you can get your bike serviced without disrupting your shift."
                },
                {
                  q: "Is bike servicing available near Jangpura and Andrews Ganj?",
                  a: "Yes. Jangpura and Andrews Ganj fall well within our service radius. Residents of both areas can book same-day or next-morning slots for complete doorstep bike maintenance."
                },
                {
                  q: "My bike broke down on Ring Road — can you help?",
                  a: "Call us immediately. Our breakdown response team dispatches a mechanic to your Ring Road location and can perform on-spot repairs for most common failures including flat tyres, battery issues, and minor engine faults."
                },
                {
                  q: "Do you handle bikes used for office commutes and school runs in South Delhi?",
                  a: "Most of our Defence Colony customers use their bikes for daily office commutes in Lodhi Colony, school runs near Jangpura, café trips in South Extension, or market visits at INA. We schedule visits at times that don't disrupt your routine — early mornings, lunch slots or evenings."
                },
                {
                  q: "What warranty do you give on bike service in Defence Colony?",
                  a: "Every service carries our 10-day hassle-free guarantee. If any issue related to the work performed arises within 10 days, we return and resolve it at no extra cost. No arguments, no fine print."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-700 rounded-md">
                  <button
                    className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700"
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  >
                    <span className="text-red-600">Q{idx + 1}.</span>
                    <span className="ml-2 flex-1">{faq.q}</span>
                    {activeIndex === idx ? <X className="h-5 w-5 flex-shrink-0" /> : <Plus className="h-5 w-5 flex-shrink-0" />}
                  </button>
                  {activeIndex === idx && (
                    <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Book Your Defence Colony Bike Service Today</h2>
          <p className="text-white mb-4">Certified mechanics at your doorstep. Prices from ₹299. No garage, no waiting, no hidden bills.</p>
          <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 inline-block">Book Your Slot Now</a>
        </section>

        {/* Floating Action Buttons */}
        <div className="fixed top-1/2 right-4 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
          <a href="tel:9540553759" className="btn-shake w-13 h-13 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)', width: '52px', height: '52px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>
          <a href="https://wa.me/9540553759" target="_blank" rel="noopener noreferrer" className="btn-shake text-white flex items-center justify-center shadow-2xl rounded-full" style={{ background: 'linear-gradient(135deg, #25d366, #128c4e)', width: '52px', height: '52px' }}>
            <FaWhatsapp size={26} />
          </a>
        </div>
        <style>{`.btn-shake { animation: shake 1.8s ease-in-out infinite; } .btn-shake:hover { animation: none; transform: scale(1.12); } @keyframes shake { 0%,100%{transform:rotate(0deg)} 15%{transform:rotate(-18deg)} 30%{transform:rotate(18deg)} 45%{transform:rotate(-14deg)} 60%{transform:rotate(14deg)} 75%{transform:rotate(-8deg)} 90%{transform:rotate(8deg)} }`}</style>

        {/* Booking Modal */}
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-md flex flex-col">
              <div className="p-4 border-b flex justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black">{selectedService.title}</h3>
                  <p className="text-sm text-gray-600">{selectedService.subtitle}</p>
                </div>
                <button onClick={closeModal}><X className="h-6 w-6" /></button>
              </div>
              <div className="p-4 overflow-y-auto">
                <h4 className="font-semibold mb-2">Complete Service Checklist:</h4>
                <ul className="space-y-2">
                  {selectedService.checklist.map((item, i) => (
                    <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border-t bg-gray-50">
                <div className="relative mb-3">
                  <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Enter 10-digit Phone Number*"
                    maxLength={10}
                    value={modalPhoneNumber}
                    onChange={(e) => setModalPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="terms" className="mr-2" />
                  <label htmlFor="terms" className="text-sm">I agree to the <span className="underline">Terms of Service</span></label>
                </div>
                <button onClick={handleModalBookNow} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Confirm Booking</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServiceDefenceColony;
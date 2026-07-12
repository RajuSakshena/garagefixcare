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

const BestBikeServicePalam = () => {
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
    "Best bike service in Palam at your doorstep",
    "Expert doorstep bike repair in Palam Colony",
    "Certified motorcycle mechanic serving Palam Village",
    "Professional bike servicing near IGI Airport Palam"
  ];
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 2500);
    return () => clearInterval(t);
  }, []);

  const carouselImages = [
    { src: bikeServiceOfferImage, alt: "Bike service offer Palam Delhi" },
    { src: doorstepImage, alt: "Doorstep bike service Palam Colony" },
    { src: engineImage, alt: "Bike engine overhaul Palam Village" },
    { src: roadsideImage, alt: "Roadside bike assistance near Dwarka Palam" },
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
    { name: "Palam", color: "text-indigo-700" },
    { name: "Delhi", color: "text-red-700" },
    { name: "Dwarka", color: "text-teal-700" },
    { name: "Noida", color: "text-gray-900" },
    { name: "Faridabad", color: "text-orange-700" },
    { name: "Greater Noida", color: "text-slate-700" },
  ];

  const coveredAreas = [
    "Palam Colony", "Palam Village", "Raj Nagar", "Dashrath Puri",
    "Dwarka Sector 7", "Dwarka Sector 8", "Dwarka Sector 9",
    "Delhi Cantonment", "Manglapuri", "IGI Airport Area"
  ];

  const cityPages = [
    { name: "Delhi", path: "/best-bike-service-delhi" },
    { name: "Dwarka", path: "/best-bike-service-dwarka" },
    { name: "Noida", path: "/best-bike-service-noida" },
    { name: "Greater Noida", path: "/best-bike-service-greater-noida" },
    { name: "Ghaziabad", path: "/best-bike-service-ghaziabad" },
    { name: "Faridabad", path: "/best-bike-service-faridabad" },
  ];

  return (
    <>
      <SEOHelmet
        title="Best Bike Service in Palam | Doorstep Bike Repair ₹299 | Garage Fix Care"
        description="Top-rated doorstep bike repair in Palam, Delhi starting at ₹299. Covering Palam Colony, Palam Village, Raj Nagar, Dashrath Puri, Dwarka Sector 7–9 & more. Book now!"
        canonical="https://www.garagefixcare.in/best-bike-service-palam"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-palam",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Doorstep bike service in Palam Delhi by Garage Fix Care",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Expert bike repair at home in Palam Colony and surrounding areas",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Trusted doorstep bike service in Palam, Delhi. At-home bike repair, oil change, engine servicing and battery replacement starting at ₹299. Serving Palam Colony, Palam Village, Raj Nagar, Dashrath Puri and Dwarka.",
            "url": "https://www.garagefixcare.in/best-bike-service-palam",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Palam",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.5921", "longitude": "77.0811" },
            "areaServed": [
              { "@type": "City", "name": "Palam", "sameAs": "https://en.wikipedia.org/wiki/Palam,_Delhi" },
              { "@type": "City", "name": "Delhi" },
              { "@type": "City", "name": "Dwarka" },
              { "@type": "City", "name": "Noida" },
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
            "name": "Doorstep Bike Service in Palam Delhi",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "Palam, Delhi",
            "description": "At-home bike servicing starting at ₹299 across Palam Colony, Palam Village, Raj Nagar, Dashrath Puri, Dwarka Sector 7, 8, 9 and Delhi Cantonment. Oil change, engine repair, battery replacement — same-day doorstep service.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "299", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How much does bike service cost in Palam?", "acceptedAnswer": { "@type": "Answer", "text": "Bike service in Palam starts from ₹299 for 100–125cc bikes. Classic Service is ₹399, Premium ₹499, Royal ₹599, and Sports ₹999 — all inclusive of labour with zero hidden charges." } },
              { "@type": "Question", "name": "Do you cover Palam Colony and Palam Village for doorstep bike service?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide full doorstep bike repair in Palam Colony, Palam Village, Raj Nagar, Dashrath Puri, Dwarka Sectors 7–9, Manglapuri, Delhi Cantonment and IGI Airport area." } },
              { "@type": "Question", "name": "Can your mechanic reach me near IGI Airport in Palam?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Our mechanics regularly serve residents and professionals near the IGI Airport zone. Share your pin location and we dispatch a certified technician within 2–4 hours." } },
              { "@type": "Question", "name": "Do you handle emergency breakdown in Palam?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If your bike breaks down on any road in Palam, Dashrath Puri or Dwarka Sector 8, call us immediately and we dispatch a mechanic to your exact location for on-spot repair." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Best Bike Service in Palam", "item": "https://www.garagefixcare.in/best-bike-service-palam" }
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
                    Best Bike Service in Palam
                    <span className="text-orange-500"> — Doorstep Repair from ₹299</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Starting at just ₹299 • Same-Day Bike Repair • Verified Mechanics at Your Door
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    Residents of Palam Colony, Palam Village, Raj Nagar, Dashrath Puri, and Dwarka sectors no longer need to hunt for a reliable workshop. Garage Fix Care brings certified two-wheeler mechanics directly to your society gate, home parking, or office — handling everything from routine engine oil changes to complex brake and electrical repairs. Transparent pricing, genuine parts, and zero surprise bills guaranteed.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ Starting ₹299", "✔ Same-Day Service", "✔ Doorstep Mechanics", "✔ Verified Technicians", "✔ No Hidden Charges"].map((point, i) => (
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
            <div className="flex flex-col items-center justify-center mb-8"><div className="flex items-center"><h2 className="text-2xl sm:text-4xl font-bold mr-4"><span className="text-white">Hot Deals</span> <span className="text-red-600">This Week</span></h2><Flame className="h-8 w-8 text-orange-500" /></div><p className="text-lg text-white text-center">Exclusive limited-period offers for Palam residents! Grab up to 10% off on two-wheeler servicing and repairs at your doorstep. Book before slots fill up!</p></div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }} onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1"><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Palam</span><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Delhi</span></div>
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
            <p className="text-xl text-white mb-6">Clear, upfront pricing for doorstep bike servicing in Palam. Labour charges are engine-size based — no surprise additions at the end.</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">We Cover All Major Areas in <span className="text-red-600">Palam</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {coveredAreas.map(area => <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>)}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">Whether your home is tucked inside the lanes of Palam Colony, the older quarters of Palam Village, the residential blocks of Raj Nagar, Dashrath Puri, or the rapidly growing Dwarka Sector 7, 8 and 9 — our mechanics reach you within 2–4 hours. We also serve professionals and staff near Delhi Cantonment, Manglapuri markets, and the IGI Airport corridor.</p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Every Bike Problem Solved, <span className="text-red-600">Right in Your Palam Neighbourhood</span></h2>
            <p className="text-white mb-6">From basic tune-ups for daily commuters to advanced overhauls — our Palam mechanics bring the workshop to you.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {["Regular Servicing", "Engine Overhaul", "Battery Replacement", "Brake Adjustment", "Tyre & Puncture", "Insurance Claims"].map(service => (
                <div key={service} className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm">{service}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Bike Service Content */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Palam's Most Reliable <span className="text-red-600">Doorstep Bike Service</span> — Why Garage Fix Care Leads</h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>Palam is one of Southwest Delhi's most densely connected localities — a patchwork of established residential colonies, bustling market lanes, military cantonments, and the arterial roads that feed into IGI Airport. For the tens of thousands of two-wheeler owners navigating through Palam Colony's narrow by-lanes, the Raj Nagar market stretch, Dashrath Puri's working-class quarters, or commuting daily between Manglapuri and Dwarka Sector 7, 8 and 9, maintaining a healthy bike is not a luxury — it is a daily necessity. The problem has always been the same: good local mechanics are either too far, too busy, or too opaque about pricing. Garage Fix Care was built to solve exactly this problem. Our certified, background-verified mechanics travel to your doorstep anywhere in Palam and the surrounding belt. Whether you are a resident in Palam Village's older housing blocks, a professional near Delhi Cantonment, or a family in one of Dwarka Sector 8's multi-storey societies, you get the same quality service — starting at just ₹299 for a complete at-home regular bike service covering engine oil change, air filter cleaning, spark plug inspection, brake calibration, chain lubrication, and a thorough electrical check. No prior visit to a garage. No waiting in a queue. No inflated bills.</p>
              <p>The roads connecting Palam to the airport ring road and the Dwarka Expressway see heavy mixed traffic — auto-rickshaws, heavy vehicles, and daily commuters weaving through congestion. This takes a real toll on your two-wheeler's engine oil, brake pads, tyre pressure, and suspension. Palam's summer heat further degrades oil viscosity and battery charge. Our mechanics understand these local conditions intimately and bring professional diagnostic tools to spot deterioration before it turns into an expensive breakdown. We use only Motul and Wurth certified engine oils and manufacturer-grade spare parts to ensure your engine runs clean and efficiently long after our visit. Every completed service comes with a 10-day hassle-free guarantee — if any issue directly related to our work surfaces within that window, we return and fix it at no cost. Garage Fix Care has served over 1,00,000 customers across Delhi NCR and maintains a 4.7-star Google rating built on consistent professionalism, punctuality, and honest itemised billing. To book a bike mechanic in Palam today, WhatsApp us on 9540553759, call us directly, or schedule through our website — and let us handle your bike while you get on with your day.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><p className="text-xs">Get Rs.10 Off On First Service in Palam</p><h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Service Warranty</span></h2><p className="mb-4">Palam's go-to doorstep bike service. We work on every major motorcycle and scooty brand — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM and more — at your home, office, or society parking in Palam Colony, Palam Village, Raj Nagar and Dwarka sectors.</p><div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ img: warrantyImg, title: "10-Day Free Service Guarantee", desc: "Post-service assurance on all work" }, { img: pickupImg, title: "Free Pickup and Drop", desc: "Convenient when parts are needed" }, { img: transparentImg, title: "Upfront Itemised Pricing", desc: "Save up to 30% vs local workshops" }, { img: trainedImg, title: "Certified & Verified Mechanics", desc: "Background-checked professionals" }].map((item, idx) => (
                <div key={idx} className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3"><img src={item.img} alt={item.title} className="h-10 w-10 object-contain" /><div><h3 className="font-bold text-sm">{item.title}</h3><p className="text-xs">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div className="order-2 lg:order-1"><img src={handshakeImg} alt="Trusted bike service partnership in Palam" className="rounded-lg shadow-lg w-full max-w-sm" /></div>
            <div className="order-1"><h2 className="text-3xl font-bold mb-2">Why Palam Riders <span className="text-red-600">Choose GarageFixCare?</span></h2><p>From Dashrath Puri's crowded lanes to Dwarka Sector 9's wide avenues — Palam's two-wheeler owners trust us for honesty, expertise, and doorstep convenience.</p><ul className="space-y-2 mt-4">{["Mechanics Come to Your Palam Address", "Transparent Bill Before Work Begins", "Genuine OEM-Grade Spare Parts Only", "10-Day Post-Service Guarantee", "Skilled in All Major Bike Brands", "Quick Slots Available Same Day"].map(item => <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>)}</ul></div>
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
            <div><h2 className="text-3xl font-bold text-white mb-2">How <span className="text-red-600">GarageFixCare</span> Works in Palam?</h2><p className="text-white mb-4">Getting your bike fixed in Palam Colony or Dwarka Sector 8 is now as easy as ordering food. Pick a slot, our mechanic arrives, the job gets done at your doorstep.</p><ul className="space-y-2">{["Book Online or Call Us", "Mechanic Dispatched to You", "Full Service at Your Location", "Itemised Cost Shared Upfront", "10-Day Work Guarantee", "Pay After Job is Done"].map(s => <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> {s}</li>)}</ul></div>
            <div className="flex justify-center"><img src={howWorksImage} alt="How Garage Fix Care doorstep service works in Palam" className="rounded-lg shadow-lg max-w-sm" /></div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Also Serving in <span className="text-red-600">Nearby Areas</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cityPages.map(city => <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>)}
          </div>
        </section>

        {/* Testimonials & Customer Speaks */}
        <section className="bg-slate-800 py-10">
          <div className="text-center"><h2 className="text-3xl font-bold text-white">What <span className="text-red-600">Customers Say</span></h2><p className="text-white">Verified Testimonials from Google</p><div className="flex justify-center gap-1 my-2">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}<span className="text-white ml-2 font-semibold">4.7 Rating on Google</span></div><a href="https://www.google.com" target="_blank" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Review us on Google</a></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[{ name: "Surendra Singh", img: testimonial1, text: "Outstanding doorstep service. The mechanic arrived on time at my Palam Colony home and completed everything professionally.", time: "a month ago" }, { name: "Dharmendra Gupta", img: testimonial2, text: "Very transparent. They shared the full cost breakdown before starting. My scooter runs great now.", time: "a month ago" }, { name: "Rohit Prasad", img: testimonial3, text: "Excellent value. Saved me so much time — no need to ride to a garage from Dashrath Puri.", time: "a month ago" }, { name: "Prabhjeet Sharma", img: testimonial4, text: "Fast response and skilled mechanics. I'll definitely book again for my Royal Enfield.", time: "a month ago" }].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center"><img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" /><div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div><p className="text-xs mt-1">{t.text}</p><img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" /><h3 className="font-semibold text-sm">{t.name}</h3><span className="text-xs">{t.time}</span></div>
            ))}
          </div>
        </section>

        {/* FAQs — Palam-specific */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Bike Service in Palam — <span className="text-red-600">Frequently Asked Questions</span></h2>
            <div className="space-y-3">
              {[
                { q: "How much does doorstep bike service cost in Palam?", a: "At Garage Fix Care, bike service in Palam starts at ₹299 for 100–125cc commuter bikes (Regular Service). Classic Service for 135–200cc is ₹399, Premium Service for 220–300cc is ₹499, Royal Service for 350–450cc is ₹599, and Sports Service for 500cc and above is ₹999. All quoted prices cover labour in full — there are no hidden charges added later." },
                { q: "Do you provide doorstep bike repair in Palam Colony and Palam Village?", a: "Yes. Garage Fix Care operates across all parts of Palam Colony, Palam Village, Raj Nagar, Dashrath Puri and the surrounding residential pockets. Our certified mechanics come equipped with tools, oils and parts — your bike gets serviced without ever leaving your locality." },
                { q: "Can a mechanic reach me in Dwarka Sector 7, 8 or 9 from Palam?", a: "Absolutely. We cover the entire stretch from Palam into Dwarka Sector 7, Sector 8 and Sector 9 seamlessly. Residents in multi-storey societies and independent houses alike can book a slot and have a mechanic arrive at their parking area within 2–4 hours." },
                { q: "Do you serve the area near IGI Airport and Delhi Cantonment?", a: "Yes. We regularly service two-wheelers for residents and working professionals near the IGI Airport zone and Delhi Cantonment. Share your exact pin location and we dispatch the nearest available mechanic to your address promptly." },
                { q: "What bike brands do you service in Palam?", a: "We service all major two-wheeler brands available in Palam and Dwarka — Hero Splendor, Honda Activa, Bajaj Pulsar, TVS Apache, TVS Jupiter, Suzuki Access 125, Yamaha FZ, Royal Enfield Classic 350, Himalayan, KTM Duke, and more. Both motorcycles and scooties are covered." },
                { q: "Is there emergency breakdown assistance available in Palam and Manglapuri?", a: "Yes. If your bike breaks down on any road in Palam Colony, Manglapuri market area, Raj Nagar or the roads connecting to Dwarka Sector 9, call us immediately on 9540553759. We dispatch a mechanic to your GPS location for on-the-spot repair or assistance." },
                { q: "Do you service Royal Enfield bikes in Palam?", a: "Yes, we specialise in Royal Enfield doorstep servicing across Palam and Dwarka — Classic 350, Bullet 350, Meteor 350, Himalayan, and all other models. Our mechanics are trained to handle the specific oil grades and engine requirements of these machines." },
                { q: "What payment options do you accept in Palam?", a: "We accept cash, UPI (Google Pay, PhonePe, Paytm), and all popular mobile wallets. Payment is collected only after the service is fully completed and you are satisfied — there is no advance required to confirm your booking." }
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
          <h2 className="text-3xl font-bold text-white mb-2">Get Your Bike Serviced in Palam Today</h2>
          <p className="text-white mb-4">Doorstep bike repair across Palam Colony, Raj Nagar, Dashrath Puri & Dwarka — starting at just ₹299. No queues, no garage trips, no surprises.</p>
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
              <div className="p-4 overflow-y-auto"><h4 className="font-semibold mb-2">Full Checklist:</h4><ul className="space-y-2">{selectedService.checklist.map((item, i) => <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>)}</ul></div>
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Phone Number*" maxLength={10} value={modalPhoneNumber} onChange={(e) => setModalPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={handleModalBookNow} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Book Now</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServicePalam;
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

interface ServicePlan {
  title: string;
  subtitle: string;
  checklist: string[];
}

const BestBikeServiceUttamNagar = () => {
  const [ridersAssisted, setRidersAssisted] = useState(0);
  const [starRating, setStarRating] = useState(4.4);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [activePlan, setActivePlan] = useState<ServicePlan | null>(null);
  const [contactDigits, setContactDigits] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const goTo = useNavigate();

  // Hero rotating banner
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerImages = [heroImage, bigGarageBike, mechanicImage, bigGarageCar];
  const bannerCaptions = [
    "Doorstep bike service for Uttam Nagar riders",
    "Two-wheeler repair at home near Uttam Nagar West",
    "Trained bike technician serving Uttam Nagar",
    "On-site motorcycle mechanic near Janakpuri"
  ];
  useEffect(() => {
    const rotateTimer = setInterval(() => setBannerIndex(b => (b + 1) % bannerImages.length), 2500);
    return () => clearInterval(rotateTimer);
  }, []);

  const offerStrip = [
    { src: bikeServiceOfferImage, alt: "Bike service offer Uttam Nagar" },
    { src: doorstepImage, alt: "Doorstep bike mechanic Uttam Nagar West" },
    { src: engineImage, alt: "Bike engine repair near Nawada" },
    { src: roadsideImage, alt: "Roadside bike help Mohan Garden" },
  ];

  // Animated counters
  useEffect(() => {
    const cap = 100000;
    const time = 2000;
    const step = Math.ceil(cap / (time / 10));
    if (ridersAssisted < cap) {
      const counter = setInterval(() => {
        setRidersAssisted(prev => {
          const next = prev + step;
          if (next >= cap) {
            clearInterval(counter);
            return cap;
          }
          return next;
        });
      }, 10);
      return () => clearInterval(counter);
    }
  }, [ridersAssisted]);

  useEffect(() => {
    const cap = 4.7;
    const time = 1000;
    const tick = 10;
    const step = (cap - starRating) / (time / tick);
    let live = starRating;
    const rater = setInterval(() => {
      live += step;
      if (live >= cap) {
        live = cap;
        clearInterval(rater);
      }
      setStarRating(parseFloat(live.toFixed(1)));
    }, tick);
    return () => clearInterval(rater);
  }, []);

  const planList = [
    { title: "Quick Care Plan", subtitle: "100 CC - 125 CC", originalPrice: "Rs. 549", discountedPrice: "Rs. 279", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Daily Rider Plan", subtitle: "135 CC - 200 CC", originalPrice: "Rs. 749", discountedPrice: "Rs. 369", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Power Commuter Plan", subtitle: "220 CC - 300 CC", originalPrice: "Rs. 1,099", discountedPrice: "Rs. 459", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Heavy Cruiser Plan", subtitle: "350 CC - 450 CC", originalPrice: "Rs. 1,499", discountedPrice: "Rs. 559", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] },
    { title: "Superbike Care Plan", subtitle: "Above 500 CC", originalPrice: "Rs. 2,049", discountedPrice: "Rs. 929", features: ["Engine Oil Change", "Oil Filter Wash", "Air Filter Wash", "Spark Plug Cleaning"] }
  ];

  const fullInspectionList = [
    "Coolant Top-Up Check", "Quick Exterior Wash", "Chain & Pivot Greasing", "Battery Terminal Check",
    "Engine Idle Inspection", "Front Fork Check", "Carburettor Tune Check", "Wiring & Light Check",
    "Front & Rear Brake Setting", "Drive Chain Cleaning", "Bolt & Nut Tightening",
    "Mileage & Power Check", "Engine Oil Replacement (Billed Separately)", "Oil Filter Swap (If Required)",
    "Air Filter Swap (If Required)", "Spark Plug Swap (If Required)", "Tubeless Tyre Air Refill",
    "Free Pickup & Drop (On Request)"
  ];

  const openPlanDetails = (title: string, subtitle: string) => {
    setActivePlan({ title, subtitle, checklist: fullInspectionList });
    setContactDigits('');
    setShowChecklistModal(true);
  };

  const dismissModal = () => {
    setShowChecklistModal(false);
    setActivePlan(null);
    setContactDigits('');
  };

  const submitQuickBooking = async () => {
    if (!contactDigits || contactDigits.length !== 10) {
      alert('Please share a valid 10-digit mobile number to proceed.');
      return;
    }
    if (!activePlan) return;
    try {
      const serviceType = `${activePlan.title} (${activePlan.subtitle})`;
      await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
        phoneNumber: contactDigits,
        serviceType: serviceType
      });
      alert('Request received! Our Uttam Nagar team will call you shortly to lock in your slot.');
      dismissModal();
    } catch (error) {
      alert('Something went wrong while booking. Please try once more.');
      console.error('Error booking service:', error);
    }
  };

  const regionStrip = [
    { name: "Uttam Nagar", color: "text-indigo-700" },
    { name: "Janakpuri", color: "text-red-700" },
    { name: "Dwarka", color: "text-teal-700" },
    { name: "Vikas Puri", color: "text-gray-900" },
    { name: "Najafgarh", color: "text-orange-700" },
    { name: "Tilak Nagar", color: "text-slate-700" },
  ];

  const localPockets = [
    "Uttam Nagar East", "Uttam Nagar West", "Nawada", "Mohan Garden",
    "Om Vihar", "Dwarka Mor", "Bindapur", "Janakpuri",
    "Vikas Puri", "Matiyala"
  ];

  const otherCityLinks = [
    { name: "Gurgaon", path: "/best-bike-service-gurgaon" },
    { name: "Connaught Place", path: "/best-bike-service-connaught-place" },
    { name: "Noida", path: "/best-bike-service-noida" },
    { name: "Ghaziabad", path: "/best-bike-service-ghaziabad" },
    { name: "Faridabad", path: "/best-bike-service-faridabad" },
  ];

  return (
    <>
      <SEOHelmet
        title="Bike Mechanic Near Uttam Nagar | Home Service from ₹279 | Garage Fix Care"
        description="Need a bike mechanic near Uttam Nagar? Garage Fix Care sends trained technicians to your doorstep across Uttam Nagar East, West, Nawada & Janakpuri from ₹279."
        canonical="https://www.garagefixcare.in/best-bike-service-uttam-nagar"
        robots="index, follow"
        og={{
          url: "https://www.garagefixcare.in/best-bike-service-uttam-nagar",
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Bike mechanic visiting a home in Uttam Nagar for doorstep servicing",
          type: "website",
        }}
        twitter={{
          image: "https://www.garagefixcare.in/og-banner.png",
          imageAlt: "Garage Fix Care doorstep bike mechanic in Uttam Nagar",
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage Fix Care",
            "description": "Doorstep bike mechanic service for Uttam Nagar and nearby West Delhi localities, covering general servicing, repairs, and breakdown support from ₹279.",
            "url": "https://www.garagefixcare.in/best-bike-service-uttam-nagar",
            "telephone": "+919540553759",
            "priceRange": "₹₹",
            "image": "https://www.garagefixcare.in/og-banner.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Uttam Nagar",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "28.6219", "longitude": "77.0584" },
            "areaServed": [
                { "@type": "Place", "name": "Uttam Nagar East" },
                { "@type": "Place", "name": "Uttam Nagar West" },
                { "@type": "Place", "name": "Nawada" },
                { "@type": "Place", "name": "Mohan Garden" },
                { "@type": "Place", "name": "Om Vihar" },
                { "@type": "Place", "name": "Dwarka Mor" },
                { "@type": "Place", "name": "Bindapur" },
                { "@type": "Place", "name": "Janakpuri" },
                { "@type": "Place", "name": "Vikas Puri" },
                { "@type": "Place", "name": "Matiyala" }
              ],
            "serviceType": ["Bike Mechanic Visit", "Doorstep Two-Wheeler Service", "Engine Repair", "Battery Replacement", "Brake Repair", "Puncture Repair"],
            "openingHours": "Mo-Su 08:00-20:00",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "100000" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Home Bike Servicing in Uttam Nagar",
            "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
            "areaServed": "Uttam Nagar",
            "description": "On-demand bike servicing at home starting at ₹279, including oil change, brake setting, battery check, and puncture fix across Uttam Nagar and nearby pockets.",
            "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "279", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What is the starting price for bike service in Uttam Nagar?", "acceptedAnswer": { "@type": "Answer", "text": "Home bike servicing in Uttam Nagar begins at ₹279 for the Quick Care Plan (100-125cc). Larger engines are priced higher, with the Superbike Care Plan at ₹929, all inclusive of labour." } },
              { "@type": "Question", "name": "Do mechanics visit homes in Uttam Nagar West?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our technicians regularly visit homes and offices across Uttam Nagar West with the tools and parts needed to finish most jobs on the spot." } },
              { "@type": "Question", "name": "Which Uttam Nagar pockets are covered?", "acceptedAnswer": { "@type": "Answer", "text": "We cover Uttam Nagar East, Uttam Nagar West, Nawada, Mohan Garden, Om Vihar, Dwarka Mor, Bindapur, Janakpuri, Vikas Puri, and Matiyala." } },
              { "@type": "Question", "name": "Can I get same-day bike repair near Nawada or Mohan Garden?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, same-day repair is available near Nawada and Mohan Garden. Call ahead and we will arrange the nearest available mechanic for your slot." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.garagefixcare.in/" },
              { "@type": "ListItem", "position": 2, "name": "Bike Mechanic Near Uttam Nagar", "item": "https://www.garagefixcare.in/best-bike-service-uttam-nagar" }
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
                    Bike Mechanic Near Uttam Nagar
                    <span className="text-orange-500"> — At Your Door from ₹279</span>
                  </h1>
                  <p className="font-poppins text-xs sm:text-sm font-semibold text-orange-300 mb-2">
                    Plans from ₹279 • Quick Turnaround • Mechanics Across West Delhi
                  </p>
                  <p className="font-poppins text-xs sm:text-sm leading-relaxed text-white/90 mb-3 sm:mb-4">
                    Tired of pushing your bike to a roadside shop? Garage Fix Care sends a trained mechanic straight to your gate anywhere in Uttam Nagar East, Uttam Nagar West, Nawada, or Mohan Garden. From a routine oil top-up to a stubborn engine issue, we handle the job while you carry on with your day.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 sm:mb-5 text-xs text-white/80">
                    {["✔ From ₹279", "✔ Quick Slots Daily", "✔ Mechanic At Your Gate", "✔ Skilled Technicians", "✔ Clear Billing"].map((point, i) => (
                      <span key={i} className="font-medium">{point}</span>
                    ))}
                  </div>

                  {/* Book + Call Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-orange-700 transition-all duration-300 inline-block">
                      Get a Mechanic Now
                    </a>
                    <a href="tel:9540553759" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> Call Now</a>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="mt-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-4 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 text-center">What Are You Riding?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-semibold text-base transition-all duration-300"><Bike className="h-6 w-6" /><span>Bike &amp; Scooty</span></button>
                      <button onClick={() => goTo('/car')} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-slate-600 text-white py-3 rounded-2xl font-semibold text-base"><Car className="h-6 w-6" /><span>Cars</span></button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Carousel + Reviews */}
                <div className="relative flex flex-col items-center lg:items-end gap-1">
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                    <img src={bannerImages[bannerIndex]} alt={bannerCaptions[bannerIndex]} className="w-full rounded-lg transition-opacity duration-700" style={{ minHeight: '200px', objectFit: 'cover' }} />
                    <button onClick={() => setBannerIndex(b => (b - 1 + bannerImages.length) % bannerImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronLeft className="h-6 w-6" /></button>
                    <button onClick={() => setBannerIndex(b => (b + 1) % bannerImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"><ChevronRight className="h-6 w-6" /></button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {bannerImages.map((_, i) => <button key={i} onClick={() => setBannerIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === bannerIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="flex items-center justify-center gap-2 text-lg font-bold"><Star className="h-4 w-4 text-yellow-400 fill-current" />{starRating.toFixed(1)}/5</div><div className="text-xs font-semibold">Google Rating</div></div>
                    <div className="bg-sky-100 text-black p-1 rounded-lg shadow-lg flex-1 text-center"><div className="text-lg font-bold">{ridersAssisted.toLocaleString()}+</div><div className="text-xs font-semibold">Riders Assisted</div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Marquee cities */}
        <div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
          <div className="flex items-center text-sm font-semibold max-w-7xl mx-auto">
            <div className="flex-shrink-0 px-2"><span className="text-red-600 mr-1 font-bold">Mechanics Active Now</span><span className="text-brandRed font-bold"> (Flat 10% Off)</span></div>
            <div className="flex-1 overflow-hidden"><div className="flex items-center animate-marquee">{[...Array(3)].map((_, repIdx) => regionStrip.map((zone, idx) => <span key={`${repIdx}-${idx}`} className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm ${zone.color}`}>{zone.name}</span>))}</div></div>
          </div>
        </div>

        {/* Hot Deals Carousel */}
        <section className="py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center mb-8"><div className="flex items-center"><h2 className="text-2xl sm:text-4xl font-bold mr-4"><span className="text-white">Fresh Discounts</span> <span className="text-red-600">For Uttam Nagar</span></h2><Flame className="h-8 w-8 text-orange-500" /></div><p className="text-lg text-white text-center">Special savings this week for riders across Uttam Nagar and nearby West Delhi pockets. Lock your slot before the offer ends!</p></div>
          </div>
          <div className="overflow-hidden w-full px-2 sm:px-4">
            <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content', gap: '14px' }} onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')} onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {[...offerStrip, ...offerStrip].map((img, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10" style={{ width: 'min(76vw, 400px)' }}>
                  <img src={img.src} alt={img.alt} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex gap-1"><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">Uttam Nagar</span><span className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">West Delhi</span></div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </section>

        {/* What Clients Say */}
        <section className="bg-slate-800 text-black py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 text-center mb-4"><h2 className="text-xl sm:text-3xl font-bold"><span className="text-white">Hear It From</span> <span className="text-red-600">Our Riders</span></h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto px-2">
            {[{ img: googleReviewsImage, name: "Google", rating: "4.7/5", link: "https://goo.gl/maps/dqmKivbhftEaVxK79" }, { img: facebookReviewsImage, name: "Facebook", rating: "4.7/5", link: "https://www.instagram.com/p/DQVj8SmktgG/" }, { img: justdialReviewsImage, name: "JustDial", rating: "4.7/5", link: "https://www.justdial.com/jd-business?docid=011PXX11.XX11.251024223108.U1U5" }].map((rev, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-3 shadow-sm text-center"><img src={rev.img} alt={rev.name} className="mx-auto h-10 mb-2" /><div className="flex justify-center mb-1">{[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 text-yellow-400 fill-current" />)}</div><p className="font-semibold text-sm">{rev.rating} Rating</p><a href={rev.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">view us on {rev.name}</a></div>
            ))}
          </div>
        </section>

        {/* At-Home Service Price List */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4"><span className="text-white">Home Service</span> <span className="text-red-600">Pricing Sheet</span></h2>
            <p className="text-xl text-white mb-6">Plain, upfront rates for bike servicing across Uttam Nagar. You only pay based on your bike's engine size — nothing extra, ever.</p>
            <div className="grid grid-cols-2 gap-3 justify-items-center">
              {planList.map((service, idx) => (
                <div key={idx} className="bg-brandRed p-1 rounded-lg w-full"><div className="bg-sky-100 rounded-lg p-2"><div className="text-left"><h3 className="text-base font-bold">{service.title}</h3><p className="text-xs font-semibold">{service.subtitle}</p><div><span className="line-through text-red-500 mr-1">{service.originalPrice}</span><span className="text-green-600 font-bold">{service.discountedPrice}/-</span></div></div><ul className="list-none text-left text-xs mt-1">{service.features.map((f, fi) => <li key={fi} className="flex items-center"><CheckCircle className="h-3 w-3 text-green-500 mr-1" />{f}</li>)}</ul><div className="flex justify-end mt-1"><button onClick={() => openPlanDetails(service.title, service.subtitle)} className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">Full checklist</button></div></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Covered Section */}
        <section className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Mechanics Active Across <span className="text-red-600">Uttam Nagar</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {localPockets.map(area => <span key={area} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">{area}</span>)}
            </div>
            <p className="text-white text-base max-w-3xl mx-auto">No matter if your bike is parked in Uttam Nagar East, Uttam Nagar West, Nawada, Mohan Garden, Om Vihar, Dwarka Mor, Bindapur, Janakpuri, Vikas Puri, or Matiyala, a mechanic typically reaches you within 2-4 hours. Same-day visits are the norm across this stretch of West Delhi.</p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Everything Your Bike Needs, <span className="text-red-600">Sorted at Your Doorstep</span></h2>
            <p className="text-white mb-6">Routine maintenance or a tricky fault — our Uttam Nagar mechanics are equipped for both.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {["General Servicing", "Engine Diagnosis", "Battery Swap", "Brake Setting", "Tyre & Puncture", "Insurance Help"].map(service => (
                <div key={service} className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm">{service}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Bike Service Content */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Our <span className="text-red-600">Doorstep Bike Service in Uttam Nagar</span></h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <p>Uttam Nagar is one of West Delhi's busiest residential belts, packed with narrow lanes, dense markets, and a huge number of daily commuters riding bikes and scooties through Uttam Nagar East and Uttam Nagar West every single day. Finding parking outside a workshop here can eat up more time than the actual repair, which is exactly the gap Garage Fix Care closes. Our technicians travel directly to your home, shop, or society gate anywhere between Nawada and Mohan Garden, carrying every tool and part needed to finish the job without a second trip. Pricing for a home visit begins at ₹279, covering an oil change, filter cleaning, spark plug check, and a basic brake adjustment, with the entire job wrapped up in your own lane. We work on the full spread of brands riders prefer in this part of Delhi — Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, and Royal Enfield — along with scooties like the Activa and Jupiter that dominate short trips around Om Vihar and Dwarka Mor. Every estimate is shared with you before work starts, so there's no guessing about the final bill once the mechanic is done.</p>
              <p>The roads through Bindapur, Janakpuri, and Vikas Puri see constant stop-and-go traffic, which is tough on brake pads, chains, and engine oil — small wear-and-tear issues that turn expensive if ignored for too long. Our mechanics check for these warning signs proactively, catching problems early instead of waiting for a full breakdown. If your bike does stall unexpectedly anywhere near Matiyala or along the main Uttam Nagar stretch, a single call brings a technician to your exact spot for an on-the-road fix. We routinely handle battery changes, brake pad swaps, clutch wire adjustments, and tubeless puncture repairs without needing to tow the bike anywhere. Garage Fix Care has now supported over 1,00,000 riders across Delhi NCR and maintains a strong 4.7 rating on Google, built on punctual visits and straightforward pricing. Reach out through our website, a quick WhatsApp text, or a direct call, and get your bike sorted without leaving Uttam Nagar.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div><p className="text-xs">Flat ₹10 Off Your First Uttam Nagar Booking</p><h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Care Assurance</span></h2><p className="mb-4">Uttam Nagar's go-to doorstep bike mechanic. We service every common motorcycle and scooter brand — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right at your home, shop, or office.</p><div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ img: warrantyImg, title: "10-Day Service Backup", desc: "Worry-free coverage" }, { img: pickupImg, title: "Free Pickup & Drop", desc: "Zero travel hassle" }, { img: transparentImg, title: "Clear, Upfront Pricing", desc: "Save up to 30%" }, { img: trainedImg, title: "Trained, Verified Mechanics", desc: "Skilled hands every time" }].map((item, idx) => (
                <div key={idx} className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3"><img src={item.img} alt={item.title} className="h-10 w-10 object-contain" /><div><h3 className="font-bold text-sm">{item.title}</h3><p className="text-xs">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <div className="order-2 lg:order-1"><img src={handshakeImg} alt="Handshake" className="rounded-lg shadow-lg w-full max-w-sm" /></div>
            <div className="order-1"><h2 className="text-3xl font-bold mb-2">Why Uttam Nagar Trusts <span className="text-red-600">GarageFixCare</span></h2><p>We bring the workshop to your doorstep across Uttam Nagar and the neighbouring colonies — fair rates, real parts, no back-and-forth.</p><ul className="space-y-2 mt-4">{["Mechanic Comes to Your Lane", "Trained & Background-Checked Staff", "No-Surprise Pricing", "Genuine Spare Parts Only", "Service Backed by Guarantee", "Fast, Reliable Turnaround"].map(item => <li key={item} className="flex items-center"><span className="text-red-500 mr-1">◆</span> {item}</li>)}</ul></div>
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
            <div><h2 className="text-3xl font-bold text-white mb-2">Booking a Mechanic in <span className="text-red-600">Uttam Nagar</span> is Simple</h2><p className="text-white mb-4">No app downloads, no long forms. Just tell us your bike issue and location, and help is on the way.</p><ul className="space-y-2">{["Tell Us Your Location & Issue", "We Assign a Nearby Mechanic", "Repair Done at Your Doorstep", "Transparent Cost Breakdown", "Quality Checked Before Handover", "Pay Easily, Rate Your Experience"].map(s => <li key={s} className="flex items-center text-white"><span className="text-red-500 mr-1">◆</span> {s}</li>)}</ul></div>
            <div className="flex justify-center"><img src={howWorksImage} alt="How it works" className="rounded-lg shadow-lg max-w-sm" /></div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">We're Also Active in <span className="text-red-600">Other NCR Locations</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {otherCityLinks.map(city => <Link key={city.name} to={city.path} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition">{city.name}</Link>)}
          </div>
        </section>

        {/* Testimonials & Customer Speaks */}
        <section className="bg-slate-800 py-10">
          <div className="text-center"><h2 className="text-3xl font-bold text-white">Words From <span className="text-red-600">Our Customers</span></h2><p className="text-white">Real Feedback Shared on Google</p><div className="flex justify-center gap-1 my-2">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}<span className="text-white ml-2 font-semibold">4.7 Rating on Google</span></div><a href="https://www.google.com" target="_blank" className="bg-red-600 px-5 py-2 rounded-md text-white inline-block">Add Your Review</a></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-4 mt-6">
            {[{ name: "Tarun Bhandari", img: testimonial1, text: "Mechanic reached my lane in Uttam Nagar West within an hour. Fair pricing, no drama.", time: "two weeks ago" }, { name: "Sneha Choudhary", img: testimonial2, text: "Booked for my Activa near Nawada, work was done right outside my gate.", time: "three weeks ago" }, { name: "Rohit Tanwar", img: testimonial3, text: "Quoted the price upfront before touching the bike. Very transparent process.", time: "a month ago" }, { name: "Komal Saxena", img: testimonial4, text: "Quick response near Mohan Garden, mechanic was polite and skilled.", time: "a month ago" }].map(t => (
              <div key={t.name} className="bg-sky-100 rounded-lg p-3 text-center"><img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" /><div className="flex justify-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div><p className="text-xs mt-1">{t.text}</p><img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" /><h3 className="font-semibold text-sm">{t.name}</h3><span className="text-xs">{t.time}</span></div>
            ))}
          </div>
        </section>

        {/* FAQs - Uttam Nagar specific */}
        <section className="bg-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Uttam Nagar Bike Service — <span className="text-red-600">Quick Answers</span></h2>
            <div className="space-y-3">
              {[
                { q: "What does a home bike service cost in Uttam Nagar?", a: "Home bike servicing in Uttam Nagar starts at ₹279 under the Quick Care Plan for 100-125cc bikes. Daily Rider Plan is ₹369, Power Commuter ₹459, Heavy Cruiser ₹559, and Superbike Care ₹929, all with labour included." },
                { q: "Do you send mechanics to Uttam Nagar East specifically?", a: "Yes, Uttam Nagar East is one of our most regularly served pockets. Technicians arrive fully stocked, so most repairs are completed during the first visit itself." },
                { q: "Which exact areas around Uttam Nagar are covered?", a: "Our coverage spans Uttam Nagar East, Uttam Nagar West, Nawada, Mohan Garden, Om Vihar, Dwarka Mor, Bindapur, Janakpuri, Vikas Puri, and Matiyala." },
                { q: "Can I book a mechanic near Dwarka Mor or Bindapur quickly?", a: "Yes, bookings near Dwarka Mor and Bindapur are usually fulfilled within 2-4 hours. A phone call helps speed things up further for urgent needs." },
                { q: "Do you handle scooty servicing near Janakpuri and Vikas Puri?", a: "Absolutely. We service scooties like the Honda Activa, TVS Jupiter, and Suzuki Access regularly for riders around Janakpuri and Vikas Puri." },
                { q: "Is there a guarantee on bike repairs done in Uttam Nagar?", a: "Every repair carries a 10-day service backup. If the same issue resurfaces within that window, we resolve it without any additional charge." },
                { q: "How do I arrange a bike pickup from Matiyala?", a: "Free pickup and drop is available on request from Matiyala and surrounding lanes — just mention it while booking and we'll coordinate the timing." },
                { q: "What if my bike breaks down suddenly near Mohan Garden?", a: "Call us right away with your location near Mohan Garden, and we will dispatch the nearest available mechanic to get you riding again." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-700 rounded-md">
                  <button className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700" onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}><span className="text-red-600">Q{idx+1}.</span><span className="ml-2">{faq.q}</span>{expandedQuestion === idx ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
                  {expandedQuestion === idx && <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Your Bike, Fixed Right Where You Park It</h2>
          <p className="text-white mb-4">Doorstep service across Uttam Nagar starts at ₹279 — no towing, no waiting around, no hidden costs.</p>
          <a href="https://www.garagefixcare.in/bookservice" className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 inline-block">Book a Mechanic</a>
        </section>

        {/* Floating Buttons */}
        <div className="fixed top-1/2 right-4 flex flex-col space-y-4 z-50 transform -translate-y-1/2">
          <a href="tel:9540553759" className="btn-shake w-13 h-13 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)', width: '52px', height: '52px' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg></a>
          <a href="https://wa.me/9540553759" target="_blank" rel="noopener noreferrer" className="btn-shake text-white flex items-center justify-center shadow-2xl rounded-full" style={{ background: 'linear-gradient(135deg, #25d366, #128c4e)', width: '52px', height: '52px' }}><FaWhatsapp size={26} /></a>
        </div>
        <style>{`.btn-shake { animation: shake 1.8s ease-in-out infinite; } .btn-shake:hover { animation: none; transform: scale(1.12); } @keyframes shake { 0%,100%{transform:rotate(0deg)} 15%{transform:rotate(-18deg)} 30%{transform:rotate(18deg)} 45%{transform:rotate(-14deg)} 60%{transform:rotate(14deg)} 75%{transform:rotate(-8deg)} 90%{transform:rotate(8deg)} }`}</style>

        {/* Modal */}
        {showChecklistModal && activePlan && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-md flex flex-col">
              <div className="p-4 border-b flex justify-between"><div><h3 className="text-xl font-bold text-black">{activePlan.title}</h3><p className="text-sm text-gray-600">{activePlan.subtitle}</p></div><button onClick={dismissModal}><X className="h-6 w-6" /></button></div>
              <div className="p-4 overflow-y-auto"><h4 className="font-semibold mb-2">Inspection Checklist:</h4><ul className="space-y-2">{activePlan.checklist.map((item, i) => <li key={i} className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />{item}</li>)}</ul></div>
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Mobile Number*" maxLength={10} value={contactDigits} onChange={(e) => setContactDigits(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={submitQuickBooking} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Confirm Mechanic Visit</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServiceUttamNagar;
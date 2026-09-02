import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X, Plus, Phone, Bike, Car } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";

// Hero background video (same assets/crossfade system as Delhi Cantt / Home.tsx)
import insideVideo from '../images/inside.mp4';
import outsideVideo from '../images/outside.mp4';

// Hot Deals marquee — same assets as Delhi Cantt / Home.tsx
import hotDealsImage1 from '../images/hotdeals1.png';
import hotDealsImage2 from '../images/hotdeals2.png';
import hotDealsImage3 from '../images/hotdeals3.png';
import hotDealsImage4 from '../images/hotdeals4.png';
import hotDealsImage5 from '../images/hotdeals5.png';

import warrantyImg from "../images/warranty.webp";
import pickupImg from "../images/free pickup.webp";
import transparentImg from "../images/transparent.webp";
import trainedImg from "../images/trainie.webp";
import whyChooseImg from '../images/whychoose.png';
import wurthImg from "../images/WURTH.png";
import motulImg from "../images/Motul.jpeg";
import turtlemintImg from "../images/Turtlemint.png";
import buniyadImg from "../images/Buniyad.png";
import dunzoImg from "../images/Dunzo.png";
import bmw310Image from '../images/bmw310.png';
import googleIcon from "../images/Testimonial1.png";
import testimonial1 from "../images/Testimonial1.jpeg";
import testimonial2 from "../images/Testimonial2.jpeg";
import testimonial3 from "../images/Testimonial3.jpeg";
import testimonial4 from "../images/Testimonial4.jpeg";

interface Service {
  title: string;
  subtitle: string;
  checklist: string[];
}

// ==================================================
// Reusable Framer Motion variants — same system used on the Delhi Cantt page
// ==================================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const viewportOnce = { once: true, amount: 0.15 };

const heroStaggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const heroStaggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const BestBikeServiceIndirapuram = () => {
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const prefersReducedMotion = useReducedMotion();

  // Subtle top-of-page scroll progress indicator (same as Delhi Cantt / Home.tsx)
  const { scrollYProgress } = useScroll();
  const scrollProgressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // ================= Navbar-flush hero offset =================
  // Measure the actual rendered navbar height at runtime and use that exact value as the
  // hero's top offset, so the hero video always starts immediately below the navbar with
  // 0px gap, on every breakpoint, even if the navbar's height changes.
  const [heroTopOffset, setHeroTopOffset] = useState(88);
  useLayoutEffect(() => {
    const navEl = (document.querySelector('header[class*="fixed"]') ||
      document.querySelector('nav[class*="fixed"]') ||
      document.querySelector('header') ||
      document.querySelector('nav')) as HTMLElement | null;
    if (!navEl) return;

    const measure = () => {
      const height = Math.round(navEl.getBoundingClientRect().height);
      if (height > 0) setHeroTopOffset(height);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(navEl);
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // ================= Hero video sequence (same two-slot crossfade system as Delhi Cantt / Home.tsx) =================
  // inside.mp4 -> outside.mp4 -> inside.mp4 -> ... loops forever, no hard cut, no blank frame.
  const heroVideoSources = [insideVideo, outsideVideo];
  const heroVideoSlot0Ref = useRef<HTMLVideoElement | null>(null);
  const heroVideoSlot1Ref = useRef<HTMLVideoElement | null>(null);
  const heroVideoRefs = [heroVideoSlot0Ref, heroVideoSlot1Ref] as const;
  const [activeHeroSlot, setActiveHeroSlot] = useState<0 | 1>(0);
  const heroSequencePosRef = useRef(0);
  const heroTransitioningRef = useRef(false);

  const HERO_CROSSFADE_SECONDS = prefersReducedMotion ? 0 : 0.65;
  const HERO_TRANSITION_LEAD_SECONDS = 0.6;

  useEffect(() => {
    const slot0 = heroVideoRefs[0].current;
    const slot1 = heroVideoRefs[1].current;
    if (!slot0 || !slot1) return;

    slot0.src = heroVideoSources[0];
    slot0.load();
    slot0.play().catch(() => {});

    slot1.src = heroVideoSources[1];
    slot1.load();

    heroSequencePosRef.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attemptHeroTransition = (fromSlot: 0 | 1) => {
    if (heroTransitioningRef.current) return;
    const toSlot: 0 | 1 = fromSlot === 0 ? 1 : 0;
    const nextEl = heroVideoRefs[toSlot].current;
    if (!nextEl || nextEl.readyState < 3) return;

    heroTransitioningRef.current = true;
    const nextLogicalIndex = (heroSequencePosRef.current + 1) % heroVideoSources.length;

    nextEl.currentTime = 0;
    const playPromise = nextEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    setActiveHeroSlot(toSlot);
    heroSequencePosRef.current = nextLogicalIndex;

    window.setTimeout(() => {
      const idleEl = heroVideoRefs[fromSlot].current;
      if (idleEl) {
        const upcomingIndex = (nextLogicalIndex + 1) % heroVideoSources.length;
        idleEl.pause();
        idleEl.src = heroVideoSources[upcomingIndex];
        idleEl.load();
      }
      heroTransitioningRef.current = false;
    }, HERO_CROSSFADE_SECONDS * 1000);
  };

  const handleHeroTimeUpdate = (slot: 0 | 1) => () => {
    if (activeHeroSlot !== slot || heroTransitioningRef.current) return;
    const el = heroVideoRefs[slot].current;
    if (!el || !el.duration || Number.isNaN(el.duration)) return;
    if (el.duration - el.currentTime <= HERO_TRANSITION_LEAD_SECONDS) {
      attemptHeroTransition(slot);
    }
  };

  const handleHeroEnded = (slot: 0 | 1) => () => {
    if (activeHeroSlot !== slot || heroTransitioningRef.current) return;
    const el = heroVideoRefs[slot].current;
    if (!el) return;
    el.currentTime = Math.max(0, el.duration - 1);
    el.play().catch(() => {});
    attemptHeroTransition(slot);
  };
  // ================= End hero video sequence =================

  // Hot Deals marquee images — Indirapuram specific copy/alt text, Home-style assets
  const carouselImages = [
    { src: hotDealsImage1, alt: 'Bike service offer in Indirapuram' },
    { src: hotDealsImage2, alt: 'Doorstep bike service in Indirapuram' },
    { src: hotDealsImage3, alt: 'Bike engine repair in Indirapuram' },
    { src: hotDealsImage4, alt: 'Roadside bike assistance in Indirapuram' },
    { src: hotDealsImage5, alt: 'Doorstep bike repair offer in Indirapuram' },
  ];
  const hotDealsAreaBadges = ["Indirapuram", "Shipra Suncity", "Ahinsa Khand", "Gyan Khand", "Vaibhav Khand", "Aditya Mall", "Kala Pathar Road", "CISF Road", "NH-24"];

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

  // Brands We Service marquee data (same structure/logic as the Delhi Cantt page)
  const bikeBrands = ["Hero", "Honda", "TVS", "Bajaj", "Suzuki", "Yamaha", "Kawasaki", "Royal Enfield", "KTM", "BMW", "Harley Davidson", "Ducati", "Triumph", "Indian", "Vespa", "Benelli", "Aprilia", "Yezdi", "Husqvarna", "Other"];
  const scootyBrands = ["Honda", "TVS", "Hero", "Suzuki", "Yamaha", "Ather", "Ola Electric", "Bajaj", "Vespa", "Aprilia", "Other"];
  const marqueeBrands = Array.from(
    new Set([...bikeBrands, ...scootyBrands, "Jawa", "Bajaj Chetak", "Vida", "Okinawa", "Ampere", "Revolt"])
  ).filter(brand => brand !== "Other");
  const marqueeBrandsRow1 = marqueeBrands.filter((_, i) => i % 2 === 0);
  const marqueeBrandsRow2 = marqueeBrands.filter((_, i) => i % 2 !== 0);

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

      {/* Subtle scroll progress indicator — same as Delhi Cantt / Home.tsx */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-orange-500 origin-left z-[70]"
        style={{ scaleX: scrollProgressScaleX }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <main className="bg-slate-800" style={{ paddingTop: `${heroTopOffset}px` }}>
          <section className="relative text-white overflow-hidden min-h-[700px] sm:min-h-[600px] lg:min-h-[680px]">
            {/* Cinematic background video: inside.mp4 <-> outside.mp4, continuous crossfade loop */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <motion.video
                ref={heroVideoRefs[0]}
                autoPlay
                muted
                loop={false}
                playsInline
                preload="auto"
                onTimeUpdate={handleHeroTimeUpdate(0)}
                onEnded={handleHeroEnded(0)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: 'transform, opacity' }}
                animate={{
                  opacity: activeHeroSlot === 0 ? 1 : 0,
                  scale: prefersReducedMotion ? 1 : [1, 1.02, 1],
                }}
                transition={{
                  opacity: { duration: HERO_CROSSFADE_SECONDS, ease: 'easeInOut' },
                  scale: prefersReducedMotion ? undefined : { duration: 15, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
              <motion.video
                ref={heroVideoRefs[1]}
                autoPlay
                muted
                loop={false}
                playsInline
                preload="auto"
                onTimeUpdate={handleHeroTimeUpdate(1)}
                onEnded={handleHeroEnded(1)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: 'transform, opacity' }}
                animate={{
                  opacity: activeHeroSlot === 1 ? 1 : 0,
                  scale: prefersReducedMotion ? 1 : [1, 1.02, 1],
                }}
                transition={{
                  opacity: { duration: HERO_CROSSFADE_SECONDS, ease: 'easeInOut' },
                  scale: prefersReducedMotion ? undefined : { duration: 15, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
              <div
                className="absolute inset-0 sm:hidden"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.72) 22%, rgba(0,0,0,0.22) 40%, rgba(0,0,0,0.22) 60%, rgba(0,0,0,0.52) 78%, rgba(0,0,0,0.52) 100%)',
                }}
              />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="hero-light-sweep absolute inset-0 pointer-events-none" />
            </div>

            <style>{`
              @keyframes heroLightSweep {
                0%   { transform: translateX(-15%); opacity: 0.35; }
                50%  { transform: translateX(15%);  opacity: 0.55; }
                100% { transform: translateX(-15%); opacity: 0.35; }
              }
              .hero-light-sweep {
                background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.06) 48%, transparent 66%);
                animation: heroLightSweep 10s ease-in-out infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .hero-light-sweep { animation: none; opacity: 0.2; }
              }
            `}</style>

            <div className="absolute inset-0 sm:relative z-10 w-full sm:px-6 lg:pl-[6vw] lg:pr-6 sm:py-10 lg:py-12">
              {/* TOP ZONE — H1 + subheading (Indirapuram specific) */}
              <motion.div
                className="absolute top-5 left-4 right-4 sm:relative sm:top-auto sm:left-auto sm:right-auto sm:w-full lg:max-w-[560px]"
                initial="hidden"
                animate="visible"
                variants={heroStaggerContainer}
              >
                <motion.h1
                  variants={heroStaggerItem}
                  className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] sm:leading-tight mb-1.5 sm:mb-3"
                >
                  Best Bike Service in Indirapuram
                  <span style={{ color: '#FF7A18' }}> — Doorstep Repair from ₹299</span>
                </motion.h1>

                <motion.p
                  variants={heroStaggerItem}
                  className="font-poppins text-[11px] sm:text-sm font-semibold text-white/85 leading-tight mb-1.5 sm:mb-2"
                >
                  Starting at just <span style={{ color: '#FF7A18' }}>₹299</span> &bull; Same-Day Bike Repair &bull; Certified Mechanics Near You
                </motion.p>

                <motion.p
                  variants={heroStaggerItem}
                  className="hidden sm:block text-xs sm:text-sm leading-relaxed text-white/80 mb-2 sm:mb-3 max-w-[520px]"
                >
                  Trusted by riders across Shipra Suncity, Ahinsa Khand 1 &amp; 2, Gyan Khand, Vaibhav Khand, Aditya Mall, Habitat Centre, Kala Pathar Road, CISF Road and the NH-24 corridor — our expert mechanics handle everything from routine servicing to engine repairs right at your doorstep.
                </motion.p>
              </motion.div>

              {/* BOTTOM ZONE — trust points, CTAs, vehicle selector, stats */}
              <motion.div
                className="absolute bottom-3 left-4 right-4 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:w-full lg:max-w-[560px] sm:mt-0"
                initial="hidden"
                animate="visible"
                variants={heroStaggerContainer}
              >
                <motion.div
                  variants={heroStaggerItem}
                  className="grid grid-cols-2 gap-x-2 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-3 sm:gap-y-1 mb-2 sm:mb-5 text-[9px] sm:text-xs text-white/85"
                >
                  {['Starting ₹299', 'Same-Day Service', 'Doorstep Mechanics', 'Trusted Technicians', 'No Hidden Charges'].map((point, i) => (
                    <span key={i} className="inline-flex items-center gap-1 font-medium">
                      <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" style={{ color: '#FF7A18' }} />
                      {point}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={heroStaggerItem} className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <a
                    href="https://www.garagefixcare.in/bookservice"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs sm:px-6 sm:py-3 sm:rounded-xl font-semibold sm:text-base shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:translate-y-0 transition-all duration-300 inline-block"
                  >
                    Book Service Now
                  </a>
                  <a
                    href="tel:9540553759"
                    className="border-2 border-white text-white px-4 py-2 rounded-lg text-xs sm:px-6 sm:py-3 sm:rounded-xl font-semibold sm:text-base hover:bg-white hover:text-blue-900 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Call Now
                  </a>
                </motion.div>

                {/* Select Your Vehicle */}
                <motion.div
                  variants={heroStaggerItem}
                  className="mt-2 sm:mt-5 w-full sm:max-w-[380px] lg:max-w-[420px] bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-3 shadow-lg"
                >
                  <p className="text-white/90 text-[9px] sm:text-xs font-semibold mb-1 sm:mb-2 tracking-tight">Select Your Vehicle</p>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      aria-pressed="true"
                      className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white py-1.5 sm:py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-slate-900 transition-all duration-300 active:scale-95"
                    >
                      <Bike className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>Bike &amp; Scooty</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/car')}
                      className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-slate-600 hover:border-slate-400 text-white py-1.5 sm:py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-slate-900 transition-all duration-300 active:scale-95"
                    >
                      <Car className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>Cars</span>
                    </button>
                  </div>
                </motion.div>

                {/* Review + Customer Stats */}
                <motion.div variants={heroStaggerItem} className="flex flex-row items-center gap-2 sm:gap-3 w-full mt-2 sm:mt-4">
                  <div className="bg-sky-100 text-black px-2 py-1.5 sm:p-1 rounded-lg sm:rounded-xl shadow-lg flex-1">
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-xl font-bold">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                      {reviewScore.toFixed(1)}/5
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-center">Google Review</div>
                  </div>
                  <div className="bg-sky-100 text-black px-2 py-1.5 sm:p-1 rounded-lg sm:rounded-xl shadow-lg flex-1">
                    <div className="text-xs sm:text-xl font-bold text-center">{happyCustomersCount.toLocaleString()}+</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-center">Happy Customers</div>
                  </div>
                </motion.div>
              </motion.div>
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

        {/* Hot Deals This Week — premium marquee design, Indirapuram-specific copy & assets */}
        <section className="py-8 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col items-center justify-center mb-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="flex items-center justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mr-4">
                  <span className="text-white">Hot Deals</span> <span className="text-red-600">This Week</span>
                </h2>
                <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
              <p className="text-base sm:text-lg text-white max-w-7xl mx-auto mt-2 text-center">
                Exclusive savings for Indirapuram riders! Get up to 10% off on all two-wheeler repair and servicing at your doorstep across Shipra Suncity, Ahinsa Khand, Gyan Khand &amp; Vaibhav Khand. Book now before slots fill up.
              </p>
            </motion.div>
          </div>
          <div className="hotdeals-marquee-viewport overflow-hidden w-full px-6 sm:px-12 lg:px-20">
            <div
              className="hotdeals-marquee-track"
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...carouselImages, ...carouselImages].map((img, i) => (
                <div
                  key={i}
                  className="hotdeals-card group flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ width: 'min(76vw, 400px)' }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-contain bg-slate-800 transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{ height: '220px' }}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex flex-wrap gap-1">
                      {[hotDealsAreaBadges[i % hotDealsAreaBadges.length], hotDealsAreaBadges[(i + 2) % hotDealsAreaBadges.length]].map((area, ai) => (
                        <span key={ai} className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes marqueeScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .hotdeals-marquee-viewport {
              -webkit-mask-image: linear-gradient(to right, transparent 0, black 40px, black calc(100% - 40px), transparent 100%);
              mask-image: linear-gradient(to right, transparent 0, black 40px, black calc(100% - 40px), transparent 100%);
            }
            .hotdeals-marquee-track {
              display: flex;
              width: max-content;
              gap: 14px;
              animation: marqueeScroll 22s linear infinite;
            }
          `}</style>
        </section>

        {/* Bikes & Scooters — Brands We Service (replaces the old Google/Facebook/JustDial review section) */}
        <section className="bg-slate-800 text-white py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-6 sm:mb-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-orange-400 uppercase mb-2">Bikes &amp; Scooters</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                <span className="text-white">Brands We</span> <span style={{ color: '#FF7A18' }}>Service</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">Service support for leading two-wheeler brands.</p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="brand-marquee-viewport overflow-hidden w-full">
              <div
                className="brand-marquee-track brand-marquee-track-1"
                onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
                onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
              >
                {[...marqueeBrandsRow1, ...marqueeBrandsRow1].map((brand, i) => (
                  <div
                    key={`row1-${brand}-${i}`}
                    className="brand-tile flex-shrink-0 bg-white/90 rounded-lg px-3 py-2 sm:px-5 sm:py-3 shadow-sm"
                    style={{ border: '1px solid #E2E8F0' }}
                  >
                    <span className="text-xs sm:text-sm font-semibold whitespace-nowrap tracking-wide" style={{ color: '#334155' }}>
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="brand-marquee-viewport overflow-hidden w-full">
              <div
                className="brand-marquee-track brand-marquee-track-2"
                onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
                onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
              >
                {[...marqueeBrandsRow2, ...marqueeBrandsRow2].map((brand, i) => (
                  <div
                    key={`row2-${brand}-${i}`}
                    className="brand-tile flex-shrink-0 bg-white/90 rounded-lg px-3 py-2 sm:px-5 sm:py-3 shadow-sm"
                    style={{ border: '1px solid #E2E8F0' }}
                  >
                    <span className="text-xs sm:text-sm font-semibold whitespace-nowrap tracking-wide" style={{ color: '#334155' }}>
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes brandMarqueeScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .brand-marquee-viewport {
              -webkit-mask-image: linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%);
              mask-image: linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%);
            }
            .brand-marquee-track {
              display: flex;
              width: max-content;
              gap: 8px;
            }
            @media (min-width: 640px) {
              .brand-marquee-track { gap: 12px; }
            }
            .brand-marquee-track-1 { animation: brandMarqueeScroll 24s linear infinite; }
            .brand-marquee-track-2 { animation: brandMarqueeScroll 30s linear infinite reverse; }
            .brand-tile { transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
            .brand-tile:hover { border-color: #FDBA74 !important; transform: translateY(-2px); }
            .brand-tile:hover span { color: #EA580C !important; }
          `}</style>
        </section>

        {/* At-Home Service Price List — premium vertical service-plan cards, Indirapuram pricing */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">At-Home Service</span> <span className="text-red-600">Price List</span>
              </h2>
              <p className="text-base sm:text-xl text-white mb-10 sm:mb-12 max-w-3xl mx-auto">
                Straightforward pricing for doorstep bike service in Indirapuram, Shipra Suncity, Ahinsa Khand &amp; Gyan Khand. Labour charges depend on engine displacement — every rupee accounted for, no surprises.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {servicePrices.map((service, index) => {
                const isBestValue = service.title === "At-Home Premium Service";
                // Distinct-but-consistent GarageFixCare orange-family gradient per plan.
                const headerGradients = [
                  'linear-gradient(135deg, #1f2937 0%, #92400e 130%)', // Regular — dark to amber
                  'linear-gradient(135deg, #78350f 0%, #f97316 120%)', // Classic — warm orange
                  'linear-gradient(135deg, #ea580c 0%, #FF7A18 100%)', // Premium — strong orange (best value)
                  'linear-gradient(135deg, #7c2d12 0%, #f97316 130%)', // Royal — deep orange-red
                  'linear-gradient(135deg, #111827 0%, #c2410c 140%)', // Sports — dark orange
                ];
                const headerGradient = headerGradients[index % headerGradients.length];

                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="pricing-plan-card relative flex flex-col text-left w-full max-w-[300px] rounded-[22px] overflow-hidden"
                    style={{
                      background: '#111827',
                      border: isBestValue ? '1px solid rgba(255,122,24,0.55)' : '1px solid rgba(255,255,255,0.10)',
                      boxShadow: isBestValue
                        ? '0 12px 32px rgba(0,0,0,0.35), 0 0 26px rgba(255,122,24,0.18)'
                        : '0 12px 32px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Best value badge — floats over the header/body seam */}
                    {isBestValue && (
                      <span
                        className="absolute top-3 right-3 z-20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full shadow-md"
                        style={{ background: 'linear-gradient(135deg, #FFB157, #FF7A18)', boxShadow: '0 4px 12px rgba(255,122,24,0.45)' }}
                      >
                        Best Value
                      </span>
                    )}

                    {/* Colored header panel */}
                    <div className="pricing-card-header relative pt-6 px-5 pb-9" style={{ background: headerGradient }}>
                      {/* Faint automotive watermark icon */}
                      <Bike className="absolute -right-2 -top-2 h-16 w-16 text-white/10 pointer-events-none" strokeWidth={1.5} />
                      {/* Decorative accent dots */}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                      </div>
                      <h3 className="relative text-lg sm:text-xl font-extrabold text-white leading-tight tracking-tight">
                        AT-HOME
                        <br />
                        {service.title.replace('At-Home ', '').toUpperCase()}
                      </h3>
                      {/* Curved bottom edge of the header, blending into the card body */}
                      <svg
                        className="absolute bottom-0 left-0 w-full h-6 sm:h-7"
                        viewBox="0 0 300 28"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d="M0,28 C75,0 225,0 300,28 L300,28 L0,28 Z" fill="#111827" />
                      </svg>
                      {/* CC range pill, overlapping the curve */}
                      <span className="absolute left-5 -bottom-3 z-10 inline-block bg-slate-900 border border-white/10 text-slate-200 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        {service.subtitle}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-grow px-5 pt-6 pb-5">
                      {/* Price hierarchy */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl sm:text-[34px] font-extrabold leading-none" style={{ color: '#FF7A18' }}>
                          {service.discountedPrice}/-
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500 line-through">{service.originalPrice}</span>
                      </div>

                      {/* Feature list */}
                      <ul className="list-none space-y-2 mb-6 flex-grow">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#FF7A18' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* See checklist CTA */}
                      <button
                        onClick={() => handleSeeChecklist(service.title, service.subtitle)}
                        className="pricing-checklist-btn mt-auto w-full inline-flex items-center justify-center gap-1.5 text-white px-4 py-3 text-xs sm:text-sm rounded-full font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
                        style={{ background: 'linear-gradient(135deg, #FF7A18, #EA580C)' }}
                        aria-label={`See full checklist for ${service.title}`}
                      >
                        See checklist <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <style>{`
            .pricing-plan-card {
              transition: border-color 300ms ease, box-shadow 300ms ease;
            }
            .pricing-plan-card:hover {
              border-color: rgba(255,122,24,0.55) !important;
              box-shadow: 0 18px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,122,24,0.2) !important;
            }
            .pricing-plan-card:hover .pricing-card-header {
              filter: brightness(1.08);
            }
            .pricing-card-header {
              transition: filter 300ms ease;
            }
            .pricing-checklist-btn {
              transition: filter 200ms ease, transform 200ms ease, box-shadow 200ms ease;
            }
            .pricing-checklist-btn:hover {
              filter: brightness(1.1);
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(255,122,24,0.4);
            }
          `}</style>
        </section>

        {/* Areas Covered Section */}
        <section className="py-10 sm:py-14 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              We Cover Every Pocket of <span className="text-red-600">Indirapuram</span>
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {coveredAreas.map(area => (
                <motion.span
                  key={area}
                  variants={staggerItem}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"
                >
                  {area}
                </motion.span>
              ))}
            </motion.div>
            <motion.p
              className="text-white text-base max-w-3xl mx-auto"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              From the high-rise towers of Shipra Suncity to the busy lanes of Ahinsa Khand 1 &amp; 2, Gyan Khand, Vaibhav Khand, CISF Road, Kala Pathar Road, and the NH-24 corridor — our mechanics travel to you within 2–4 hours. If you commute daily from Indirapuram, keep your two-wheeler running perfectly without wasting a single working hour at a workshop.
            </motion.p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Complete Two-Wheeler Care, <span className="text-red-600">Right Where You Are in Indirapuram</span></h2>
              <p className="text-white mb-6">Routine maintenance, emergency breakdown help, or full engine rebuilds — our Indirapuram mechanics handle every job at your parking spot.</p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {["Periodic Servicing", "Engine Diagnostics", "Battery Replacement", "Brake Overhaul", "Tyre & Puncture Fix", "Insurance Assistance"].map(service => (
                <motion.div
                  key={service}
                  variants={staggerItem}
                  className="bg-sky-100 rounded-lg p-3 shadow-md text-center font-semibold text-gray-800 text-sm"
                >
                  {service}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comprehensive Content Section */}
        <section className="py-10 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Why Garage Fix Care is <span className="text-red-600">Indirapuram's Most Trusted Bike Service</span>
            </motion.h2>
            <div className="space-y-4 text-gray-200 text-base leading-relaxed">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                Indirapuram has grown into one of the most densely populated residential hubs in the Delhi NCR belt, and its two-wheeler owners — whether they live in the gated towers of Shipra Suncity, the family apartments of Ahinsa Khand 1 and Ahinsa Khand 2, or the quieter lanes of Gyan Khand and Vaibhav Khand — deserve bike maintenance that fits a fast-paced urban schedule. Garage Fix Care was built for exactly this reality: a fully equipped mechanic reaches your society gate, basement parking, or office premises in as little as 2–4 hours after you book. Our technicians are background-verified, trained on multi-brand bikes, and carry professional-grade diagnostic equipment along with genuine Motul and Wurth lubricants and manufacturer-approved spare parts. Whether you ride a Honda Activa, TVS Jupiter, Hero Splendor, Bajaj Pulsar, Royal Enfield Classic 350, or a KTM Duke, our team handles your machine with the same care and precision. Doorstep bike service in Indirapuram starts at just ₹299, covering everything from engine oil replacement and air filter cleaning to spark plug inspection and brake calibration — all completed on the spot, with a detailed post-service report shared with you.
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                Indirapuram's mix of office commuters, school-run parents, and shopping complex visitors around Aditya Mall and Habitat Centre means that two-wheelers work hard every single day on CISF Road, Kala Pathar Road, and the NH-24 stretch. Heavy traffic, seasonal dust, and humid monsoons accelerate oil degradation and filter clogging — making quarterly servicing not optional but essential. Our Indirapuram mechanics proactively flag emerging problems such as worn clutch cables, low chain tension, and weak batteries before these minor faults turn into expensive roadside failures. We also support residential welfare associations and office fleet managers who need bulk or periodic servicing for multiple bikes without disrupting daily routines. Beyond scheduled maintenance, our emergency breakdown assistance covers you anywhere in the Indirapuram area — one call and a technician is dispatched to your GPS pin, whether you are stuck near Kala Pathar Road late in the evening or stranded on NH-24 during peak hours. With more than 1,00,000 services completed across Delhi NCR and a consistent 4.7-star Google rating, Garage Fix Care delivers the dependability that Indirapuram riders rely on. Book online, via WhatsApp, or by direct call — and let us bring the workshop to your doorstep today.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-xs">Get Rs.10 Off On Your First Service in Indirapuram</p>
              <h2 className="text-3xl font-bold">GarageFixCare <span className="text-red-600">Service Warranty</span></h2>
              <p className="mb-4">Indirapuram's go-to doorstep bike service. We work on all makes and models — Hero, Honda, Bajaj, TVS, Yamaha, Royal Enfield, KTM, Suzuki, and more — right at your home, society parking, or workplace.</p>
              <div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[{ img: warrantyImg, title: "10-Day Free Service Guarantee", desc: "Post-service peace of mind" }, { img: pickupImg, title: "Free Pickup and Drop", desc: "When on-site repair isn't possible" }, { img: transparentImg, title: "Upfront Transparent Pricing", desc: "Save up to 30% vs workshops" }, { img: trainedImg, title: "Multi-Brand Certified Mechanics", desc: "Trained, tested, trusted" }].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="bg-sky-100 text-black rounded-lg p-3 flex items-center gap-3"
                >
                  <img src={item.img} alt={item.title} className="h-10 w-10 object-contain" />
                  <div><h3 className="font-bold text-sm">{item.title}</h3><p className="text-xs">{item.desc}</p></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose GarageFixCare */}
        <section className="py-12 sm:py-16 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div
              className="flex justify-center order-2 lg:order-1"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <img src={whyChooseImg} alt="Why Choose GarageFixCare for bike service in Indirapuram" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div className="order-1 lg:order-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Why Choose <span className="text-red-600">GarageFixCare?</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                We bring certified mechanics directly to residents of Indirapuram, Shipra Suncity, Ahinsa Khand, and Gyan Khand — honest pricing, genuine parts, zero hassle.
              </p>
              <motion.ul
                className="space-y-2 text-left"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {["Hassle-Free Doorstep Service", "Certified and Skilled Technicians", "Honest Pricing", "Genuine Parts", "Satisfaction Guaranteed", "Fast and Professional Service"].map(item => (
                  <motion.li key={item} variants={staggerItem} className="flex items-center text-gray-200 text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-12 bg-slate-900 text-center">
          <motion.h2
            className="text-3xl font-bold text-white mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Customers</span>
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 justify-items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[{ name: "WURTH", img: wurthImg }, { name: "MOTUL", img: motulImg }, { name: "Turtlemint", img: turtlemintImg }, { name: "Buniyad", img: buniyadImg }, { name: "Dunzo", img: dunzoImg }].map((brand, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center justify-center w-full max-w-[150px] h-16 sm:w-40 sm:h-20 hover:shadow-xl transition-shadow duration-200"
              >
                <img src={brand.img} alt={brand.name} className="max-h-10 sm:max-h-12 object-contain" loading="lazy" decoding="async" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How GarageFixCare Works */}
        <section className="bg-slate-800 text-white py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                How <span className="text-red-600">GarageFixCare</span> Works?
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                Getting your bike serviced in Indirapuram is simple. Book online or call us, and a skilled mechanic arrives at your society gate or doorstep with everything needed to get your bike running at its best — all done on the spot.
              </p>
              <motion.ul
                className="space-y-2 text-left"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {["Schedule Your Service", "Technician Sent to You", "Service Done on the Spot", "Clear and Transparent Communication", "Guaranteed Quality Service", "Easy Payment & Feedback"].map(item => (
                  <motion.li key={item} variants={staggerItem} className="flex items-center text-white text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div className="flex justify-center" variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <img src={bmw310Image} alt="How GarageFixCare Works for bike service in Indirapuram" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </section>

        {/* City Coverage & Internal Links */}
        <section className="py-10 sm:py-14 bg-slate-900 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Also Serving in <span className="text-red-600">Nearby Cities</span>
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {cityPages.map(city => (
                <motion.div key={city.name} variants={staggerItem}>
                  <Link
                    to={city.path}
                    className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 inline-block"
                  >
                    {city.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-slate-800 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                What <span className="text-red-600">Our Customers Say</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base mt-1">Verified Reviews from Indirapuram Riders on Google</p>
              <div className="flex justify-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-white ml-2 font-semibold text-sm sm:text-base">4.7 Rating on Google</span>
              </div>
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 px-5 py-2 rounded-lg text-white inline-block text-sm sm:text-base font-semibold hover:bg-red-700 hover:shadow-lg transition-all duration-200"
              >
                Leave a Review on Google
              </a>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[{ name: "Ankita Verma", img: testimonial1, text: "Got my Activa serviced right at my Shipra Suncity society gate. Mechanic was punctual and the work was spotless.", time: "3 weeks ago" }, { name: "Rajeev Malhotra", img: testimonial2, text: "Transparent pricing and no upselling. They showed me exactly what was done on my Royal Enfield. Highly recommend.", time: "a month ago" }, { name: "Pooja Sharma", img: testimonial3, text: "As a daily commuter from Ahinsa Khand 2, this service saves me at least half a day every quarter. Brilliant concept.", time: "2 weeks ago" }, { name: "Nitin Chauhan", img: testimonial4, text: "Quick turnaround on my Pulsar's brake job near Kala Pathar Road. Very professional team from Garage Fix Care.", time: "a month ago" }].map(t => (
                <motion.div key={t.name} variants={staggerItem} className="bg-sky-100 rounded-xl shadow-lg p-4 text-center">
                  <img src={googleIcon} alt="Google" className="h-6 mx-auto mb-2" loading="lazy" decoding="async" />
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-xs mt-1 text-gray-700">{t.text}</p>
                  <img src={t.img} alt={t.name} className="h-8 w-8 rounded-full mx-auto mt-2" loading="lazy" decoding="async" />
                  <h3 className="font-semibold text-sm mt-1">{t.name}</h3>
                  <span className="text-xs text-gray-600">{t.time}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQs — Indirapuram specific */}
        <section className="bg-slate-900 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Bike Service in Indirapuram — <span className="text-red-600">Frequently Asked Questions</span>
            </motion.h2>
            <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
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
                <motion.div key={idx} variants={staggerItem} className="border border-gray-700 rounded-md">
                  <button className="flex justify-between w-full p-3 text-left font-semibold text-white hover:bg-slate-700" onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}><span className="text-red-600">Q{idx + 1}.</span><span className="ml-2">{faq.q}</span>{activeIndex === idx ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
                  {activeIndex === idx && <div className="p-3 bg-slate-700 text-gray-300 text-sm">{faq.a}</div>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-10 sm:py-14 bg-slate-800">
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">Schedule Your Bike Service in Indirapuram Today</h2>
            <p className="text-sm sm:text-base text-white mb-3 sm:mb-5 max-w-xl mx-auto">Doorstep two-wheeler repair from ₹299 — no garage visit, no waiting, no hidden fees. Serving Shipra Suncity, Ahinsa Khand, Gyan Khand &amp; all of Indirapuram.</p>
            <a
              href="https://www.garagefixcare.in/bookservice"
              className="bg-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:translate-y-0 transition-all duration-200 inline-block"
            >
              Book Your Service Now
            </a>
          </motion.div>
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
              <div className="p-4 border-t bg-gray-50"><div className="relative mb-3"><Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="tel" placeholder="Enter 10-digit Phone Number*" maxLength={10} value={modalPhoneNumber} onChange={(e) => setModalPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300" /></div><div className="flex items-center mb-4"><input type="checkbox" id="terms" className="mr-2" /><label htmlFor="terms" className="text-sm">Yes, I agree to the <span className='underline'>Terms of Service</span></label></div><button onClick={handleModalBookNow} className="bg-brandRed text-white w-full py-2 rounded-lg font-semibold hover:bg-red-700">Book Now</button></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestBikeServiceIndirapuram;

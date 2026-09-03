// BestBikeServicePaharganj.tsx
// Paharganj specific SEO/content + Delhi Cantt/Home.tsx design system (video hero, Framer Motion, marquees)
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X, Plus, Phone, Bike, Car } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';

// Hero background video (same assets/crossfade system as Delhi Cantt/Home.tsx)
import insideVideo from '../images/inside.mp4';
import outsideVideo from '../images/outside.mp4';

// Hot Deals marquee — same assets as Delhi Cantt/Home.tsx
import hotDealsImage1 from '../images/hotdeals1.png';
import hotDealsImage2 from '../images/hotdeals2.png';
import hotDealsImage3 from '../images/hotdeals3.png';
import hotDealsImage4 from '../images/hotdeals4.png';
import hotDealsImage5 from '../images/hotdeals5.png';

// Bike Services icons — same assets as Delhi Cantt/Home.tsx
import routineService from '../images/Routine Service.png';
import bikeInsurance from '../images/Bike Insurance.png';
import doorstepService from '../images/Doorstep Service.png';
import wheelCare from '../images/Wheel Care.png';
import bikeBatteries from '../images/Bike Battery.png';
import engineRepair from '../images/Engine Repair.png';

// Paharganj specific / existing assets — kept from the original page
import warrantyImg from '../images/warranty.webp';
import pickupImg from '../images/free pickup.webp';
import transparentImg from '../images/transparent.webp';
import trainedImg from '../images/trainie.webp';
import whyChooseImg from '../images/whychoose.png';
import wurthImg from '../images/WURTH.png';
import motulImg from '../images/Motul.jpeg';
import turtlemintImg from '../images/Turtlemint.png';
import buniyadImg from '../images/Buniyad.png';
import dunzoImg from '../images/Dunzo.png';
import bmw310Image from '../images/bmw310.png';
import googleIcon from '../images/Testimonial1.png';
import testimonial1 from '../images/Testimonial1.jpeg';
import testimonial2 from '../images/Testimonial2.jpeg';
import testimonial3 from '../images/Testimonial3.jpeg';
import testimonial4 from '../images/Testimonial4.jpeg';

interface CarePackage {
  title: string;
  subtitle: string;
  checklist: string[];
}

// ==================================================
// Reusable Framer Motion variants — same system as Delhi Cantt/Home.tsx
// ==================================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
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

const BestBikeServicePaharganj = () => {
  const [bikersSupported, setBikersSupported] = useState(0);
  const [ratingValue, setRatingValue] = useState(4.5);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CarePackage | null>(null);
  const [enteredNumber, setEnteredNumber] = useState('');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(null);
  const moveTo = useNavigate();

  const prefersReducedMotion = useReducedMotion();

  // Subtle top-of-page scroll progress indicator (same as Delhi Cantt/Home.tsx)
  const { scrollYProgress } = useScroll();
  const scrollProgressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // ================= Navbar-flush hero offset =================
  // Measures the actual rendered navbar height at runtime and uses that exact value as the
  // hero's top offset, guaranteeing the hero video always starts immediately below the navbar
  // with 0px gap, on every breakpoint, even if the navbar's height changes.
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

  // ================= Hero video sequence (same two-slot crossfade system as Delhi Cantt/Home.tsx) =================
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

  // Hot Deals marquee images — Paharganj specific copy/alt text, Delhi Cantt/Home-style assets
  const dealStrip = [
    { src: hotDealsImage1, alt: 'Bike service offer near Paharganj' },
    { src: hotDealsImage2, alt: 'Doorstep bike service near Chuna Mandi' },
    { src: hotDealsImage3, alt: 'Bike engine repair near Sadar Bazaar' },
    { src: hotDealsImage4, alt: 'Roadside bike assistance near Karol Bagh' },
    { src: hotDealsImage5, alt: 'Doorstep bike repair deal near Ajmeri Gate' },
  ];
  const hotDealsAreaBadges = ['Paharganj', 'Chuna Mandi', 'Sadar Bazaar', 'Karol Bagh', 'New Delhi Railway Station', 'Ajmeri Gate'];

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
    { title: 'Station Quick Plan', subtitle: '100 CC - 125 CC', originalPrice: 'Rs. 549', discountedPrice: 'Rs. 299', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Station Standard Plan', subtitle: '135 CC - 200 CC', originalPrice: 'Rs. 749', discountedPrice: 'Rs. 399', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Station Comfort Plan', subtitle: '220 CC - 300 CC', originalPrice: 'Rs. 1,099', discountedPrice: 'Rs. 450', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Station Cruiser Plan', subtitle: '350 CC - 450 CC', originalPrice: 'Rs. 1,489', discountedPrice: 'Rs. 550', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Station Superbike Plan', subtitle: 'Above 500 CC', originalPrice: 'Rs. 2,029', discountedPrice: 'Rs. 599', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
  ];

  const inspectionItems = [
    'Coolant Level Check', 'Quick Body Wipe-Down', 'Chain & Pivot Greasing', 'Battery Terminal Check',
    'Engine Idle & Sound Inspection', 'Front Fork Inspection', 'Carburettor Quick Tune', 'Lights & Wiring Check',
    'Front & Rear Brake Setting', 'Drive Chain Cleaning', 'Bolt & Nut Tightening',
    'Mileage & Power Check', 'Engine Oil Replacement (Billed Separately)', 'Oil Filter Swap (If Needed)',
    'Air Filter Swap (If Needed)', 'Spark Plug Swap (If Needed)', 'Tubeless Tyre Air Refill',
    'Free Pickup & Drop (On Request)',
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
        serviceType: serviceType,
      });
      alert('Booking confirmed! Our Paharganj team will call you shortly to finalise the slot.');
      dismissPackageModal();
    } catch (error) {
      alert('We could not complete your booking. Please try again.');
      console.error('Error booking service:', error);
    }
  };

  const marqueeZones = [
    { name: 'Paharganj', color: 'text-indigo-700' },
    { name: 'Karol Bagh', color: 'text-red-700' },
    { name: 'Connaught Place', color: 'text-teal-700' },
    { name: 'New Delhi', color: 'text-gray-900' },
    { name: 'Sadar Bazaar', color: 'text-orange-700' },
    { name: 'Rani Jhansi Road', color: 'text-slate-700' },
  ];

  const localityCoverage = [
    'New Delhi Railway Station', 'Ajmeri Gate', 'Ramakrishna Ashram', 'Chuna Mandi',
    'Arakashan Road', 'DB Gupta Road', 'Sadar Bazaar', 'Connaught Place',
    'Karol Bagh', 'Rani Jhansi Road',
  ];

  const linkedAreaPages = [
    { name: 'Connaught Place', path: '/best-bike-service-connaught-place' },
    { name: 'New Delhi', path: '/best-bike-service-new-delhi' },
    { name: 'Chanakyapuri', path: '/best-bike-service-chanakyapuri' },
    { name: 'Uttam Nagar', path: '/best-bike-service-uttam-nagar' },
    { name: 'Gurgaon', path: '/best-bike-service-gurgaon' },
  ];

  // Brands We Service marquee data (same structure/logic as Delhi Cantt/Home.tsx)
  const bikeBrands = ['Hero', 'Honda', 'TVS', 'Bajaj', 'Suzuki', 'Yamaha', 'Kawasaki', 'Royal Enfield', 'KTM', 'BMW', 'Harley Davidson', 'Ducati', 'Triumph', 'Indian', 'Vespa', 'Benelli', 'Aprilia', 'Yezdi', 'Husqvarna', 'Other'];
  const scootyBrands = ['Honda', 'TVS', 'Hero', 'Suzuki', 'Yamaha', 'Ather', 'Ola Electric', 'Bajaj', 'Vespa', 'Aprilia', 'Other'];
  const marqueeBrands = Array.from(
    new Set([...bikeBrands, ...scootyBrands, 'Jawa', 'Bajaj Chetak', 'Vida', 'Okinawa', 'Ampere', 'Revolt'])
  ).filter(brand => brand !== 'Other');
  const marqueeBrandsRow1 = marqueeBrands.filter((_, i) => i % 2 === 0);
  const marqueeBrandsRow2 = marqueeBrands.filter((_, i) => i % 2 !== 0);

  const bikeServiceCards = [
    { name: 'Regular Service', img: routineService },
    { name: 'Engine Repair', img: engineRepair },
    { name: 'Battery Replacement', img: bikeBatteries },
    { name: 'Brake Repair', img: wheelCare },
    { name: 'Tyre Service', img: doorstepService },
    { name: 'Insurance Assistance', img: bikeInsurance },
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

      {/* Subtle scroll progress indicator — same as Delhi Cantt/Home.tsx */}
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
              {/* TOP ZONE — H1 + subheading (Paharganj specific) */}
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
                  Bike Mechanic Near Paharganj
                  <span style={{ color: '#FF7A18' }}> — Doorstep Service from ₹275</span>
                </motion.h1>

                <motion.p
                  variants={heroStaggerItem}
                  className="font-poppins text-[11px] sm:text-sm font-semibold text-white/85 leading-tight mb-1.5 sm:mb-2"
                >
                  Starting at <span style={{ color: '#FF7A18' }}>₹275</span> &bull; Mechanics Near the Station Belt &bull; Same-Day Slots
                </motion.p>

                <motion.p
                  variants={heroStaggerItem}
                  className="hidden sm:block text-xs sm:text-sm leading-relaxed text-white/80 mb-2 sm:mb-3 max-w-[520px]"
                >
                  Paharganj&apos;s narrow lanes, packed markets, and the constant rush around New Delhi Railway Station make finding parking outside a workshop a real struggle. Garage Fix Care sends a trained mechanic straight to your gali, hotel, or shopfront anywhere between Ajmeri Gate and Sadar Bazaar, handling everything from a quick service to a full engine repair without you stepping out.
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
                  {['From ₹275', 'Same-Day Repair', 'Mechanic At Your Gali', 'Verified Technicians', 'Honest Billing'].map((point, i) => (
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
                    Request a Mechanic
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
                      onClick={() => moveTo('/car')}
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
                      {ratingValue.toFixed(1)}/5
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-center">Google Rating</div>
                  </div>
                  <div className="bg-sky-100 text-black px-2 py-1.5 sm:p-1 rounded-lg sm:rounded-xl shadow-lg flex-1">
                    <div className="text-xs sm:text-xl font-bold text-center">{bikersSupported.toLocaleString()}+</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-center">Bikers Supported</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Dark premium information strip — Paharganj specific copy */}
        <motion.div
          className="w-full"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #172033 55%, #111827 100%)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
          }}
        >
          <div className="max-w-[1100px] mx-auto px-[14px] py-[10px] sm:px-6 sm:py-3.5 relative overflow-hidden">
            <div
              className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.10) 0%, transparent 70%)' }}
            />
            <span className="relative inline-flex items-center gap-1.5 mb-1">
              <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ff7a00' }} />
              <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#ff7a00' }}>
                Garage Fix Care — Paharganj
              </span>
            </span>
            <p className="relative text-[10px] sm:text-sm leading-[1.4] sm:leading-relaxed" style={{ color: '#cbd5e1' }}>
              Skip the garage queue. Our certified mechanics come to your hotel, gali or shopfront across Paharganj, New Delhi Railway Station, Ajmeri Gate, Chuna Mandi, Sadar Bazaar, Karol Bagh, Connaught Place and Rani Jhansi Road — handling everything from routine servicing to engine repairs. Fast, transparent, and affordable.
            </p>
          </div>
        </motion.div>

        {/* Marquee: Service Available cities */}
        <div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
          <div className="flex items-center text-sm sm:text-sm font-semibold max-w-7xl mx-auto">
            <div className="flex-shrink-0 px-2 sm:px-2 pr-2">
              <span className="text-red-600 mr-1 sm:mr-2 font-bold">Mechanics On Standby </span>
              <span className="text-brandRed font-bold sm:inline"> (10% Off Today)</span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center animate-marquee">
                {[...Array(3)].map((_, repIdx) =>
                  marqueeZones.map((zone, idx) => (
                    <span
                      key={`${repIdx}-${idx}`}
                      className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm sm:text-sm ${zone.color}`}
                    >
                      {zone.name}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hot Deals This Week — Paharganj specific copy, Delhi Cantt/Home-style marquee */}
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
                  <span className="text-white">This Week&apos;s Offers</span> <span className="text-red-600">in Paharganj</span>
                </h2>
                <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
              <p className="text-base sm:text-lg text-white max-w-7xl mx-auto mt-2 text-center">
                Limited-period savings for riders around the railway station belt and nearby market lanes. Lock in your slot before it&apos;s gone!
              </p>
            </motion.div>
          </div>
          <div className="hotdeals-marquee-viewport overflow-hidden w-full px-6 sm:px-12 lg:px-20">
            <div
              className="hotdeals-marquee-track"
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...dealStrip, ...dealStrip].map((img, i) => (
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

        {/* Bikes & Scooters — Brands We Service */}
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

        {/* At-Home Service Price List — Paharganj pricing (premium vertical service-plan cards) */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Paharganj Service</span> <span className="text-red-600">Rate Card</span>
              </h2>
              <p className="text-base sm:text-xl text-white mb-10 sm:mb-12 max-w-3xl mx-auto">
                Plain, upfront pricing for doorstep bike service across Paharganj and the railway station belt. The only variable is your engine size — nothing else changes the bill.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {carePackages.map((service, index) => {
                const isBestValue = service.title === 'Station Comfort Plan';
                // Distinct-but-consistent GarageFixCare orange-family gradient per plan.
                const headerGradients = [
                  'linear-gradient(135deg, #1f2937 0%, #92400e 130%)', // Quick — dark to amber
                  'linear-gradient(135deg, #78350f 0%, #f97316 120%)', // Standard — warm orange
                  'linear-gradient(135deg, #ea580c 0%, #FF7A18 100%)', // Comfort — strong orange (best value)
                  'linear-gradient(135deg, #7c2d12 0%, #f97316 130%)', // Cruiser — deep orange-red
                  'linear-gradient(135deg, #111827 0%, #c2410c 140%)', // Superbike — dark orange
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
                        STATION
                        <br />
                        {service.title.replace('Station ', '').toUpperCase()}
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
                        onClick={() => launchPackageModal(service.title, service.subtitle)}
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

        {/* Areas Covered — Paharganj localities */}
        <section className="py-10 sm:py-14 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Covering Every Gali of <span className="text-red-600">Paharganj</span>
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {localityCoverage.map(area => (
                <motion.span
                  key={area}
                  variants={staggerItem}
                  className="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:bg-red-700 transition-colors duration-200"
                >
                  {area}
                </motion.span>
              ))}
            </motion.div>
            <motion.p
              className="text-white/90 text-sm sm:text-base max-w-3xl mx-auto"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Whether your bike is parked near New Delhi Railway Station, Ajmeri Gate, Ramakrishna Ashram, Chuna Mandi, Arakashan Road, DB Gupta Road, Sadar Bazaar, Connaught Place, Karol Bagh, or Rani Jhansi Road, our mechanics reach you within 2-4 hours. Same-day visits are routine across this busy stretch of Central Delhi.
            </motion.p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                Complete Bike Care, <span className="text-red-600">Sorted Right Outside Your Gali</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
                From a quick servicing run to a deeper engine fix — our Paharganj mechanics are equipped for both.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {bikeServiceCards.map((service, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="bg-sky-100 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-200"
                >
                  <img
                    src={service.img}
                    alt={`${service.name} in Paharganj`}
                    className="h-12 w-12 sm:h-16 sm:w-16 object-contain mb-2"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="font-semibold text-gray-800 text-xs sm:text-sm text-center">{service.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comprehensive Bike Service Content (Paharganj specific) */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              About Doorstep Bike Service in <span className="text-red-600">Paharganj</span>
            </motion.h2>
            <motion.div
              className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p>Paharganj sits right next to one of Delhi&apos;s busiest transit hubs, and the constant flow of traffic around New Delhi Railway Station and Ajmeri Gate makes parking outside a workshop almost impossible during peak hours. Garage Fix Care closes that gap by sending a trained mechanic directly to your hotel, shop, or home anywhere between Chuna Mandi and Sadar Bazaar, completing the job right where your bike already sits. Doorstep service here starts at ₹275, covering an engine oil change, filter cleaning, spark plug check, and brake adjustment, all finished without you having to push your bike through Paharganj&apos;s crowded lanes. We service every common two-wheeler brand seen around DB Gupta Road and Rani Jhansi Road — Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, and Royal Enfield — along with scooties like the Activa that traders and commuters frequently ride near Arakashan Road. Every job comes with a written estimate before any work begins, so the price you agree to is exactly what you pay once the mechanic finishes.</p>
              <p>The dense market traffic around Sadar Bazaar and the steady footfall near Ramakrishna Ashram wear down brake pads, chains, and engine oil faster than usual, and our mechanics are trained to catch these early signs before they cause a full breakdown. If your bike does stall suddenly anywhere between Karol Bagh and Connaught Place, a single call sends a technician straight to your spot for an on-the-road fix, no towing needed. We regularly manage battery replacements, brake pad swaps, clutch adjustments, and tubeless puncture repairs right at the roadside. Garage Fix Care has completed over 1,00,000 services across Delhi NCR and maintains a steady 4.7-star Google rating for being prompt and upfront about pricing. Reach us through our website, a quick WhatsApp message, or a direct call, and get your bike sorted without leaving Paharganj.</p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <p className="text-xs sm:text-sm font-semibold text-orange-400 uppercase tracking-wide mb-1">
                Flat ₹10 Off Your First Paharganj Booking
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                GarageFixCare <span className="text-red-600">Service Pledge</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                Paharganj&apos;s reliable doorstep bike mechanic. We work on every common motorcycle and scooter brand — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right at your gali, shop, or hotel.
              </p>
              <div className="flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" loading="lazy" decoding="async" />
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" loading="lazy" decoding="async" />
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[
                { img: warrantyImg, title: '10-Day Service Guarantee', desc: 'Worry-free coverage' },
                { img: pickupImg, title: 'Free Pickup & Drop', desc: 'No travel required' },
                { img: transparentImg, title: 'Clear, Itemised Pricing', desc: 'Save up to 30%' },
                { img: trainedImg, title: 'Verified, Trained Mechanics', desc: 'Skilled every visit' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="bg-sky-100 text-black rounded-xl p-4 sm:p-6 shadow-lg flex items-center space-x-2 sm:space-x-3"
                >
                  <img src={item.img} alt={item.title} className="h-8 w-8 sm:h-10 sm:w-10 object-contain" loading="lazy" decoding="async" />
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-900">{item.desc}</p>
                  </div>
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
              <img src={whyChooseImg} alt="Why Paharganj Riders Choose GarageFixCare" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div className="order-1 lg:order-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Why Paharganj Riders Choose <span className="text-red-600">GarageFixCare</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                We bring the workshop to you across Paharganj and the surrounding station belt — fair pricing, genuine parts, no pushing your bike through crowded lanes.
              </p>
              <ul className="space-y-2 text-left">
                {['Mechanic Comes to Your Gali', 'Verified, Trained Technicians', 'Transparent, No-Surprise Pricing', 'Genuine Spare Parts Only', 'Backed by a Service Guarantee', 'Quick, Professional Turnaround'].map(item => (
                  <li key={item} className="flex items-center text-gray-200 text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 sm:mb-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Backed by <span className="text-red-600">Trusted Brands</span> and <span className="text-red-600">1,00,000+ Riders</span>
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 justify-items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[
                { name: 'WURTH', img: wurthImg },
                { name: 'MOTUL', img: motulImg },
                { name: 'Turtlemint', img: turtlemintImg },
                { name: 'Buniyad', img: buniyadImg },
                { name: 'Dunzo', img: dunzoImg },
              ].map((brand, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center justify-center w-full max-w-[150px] h-16 sm:w-40 sm:h-20 hover:shadow-xl transition-shadow duration-200"
                >
                  <img src={brand.img} alt={brand.name} className="max-h-10 sm:max-h-12 object-contain" loading="lazy" decoding="async" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-800 text-white py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                Booking a Mechanic in <span className="text-red-600">Paharganj</span> is Simple
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                Share your bike&apos;s issue and your nearest landmark, and a mechanic is on the way.
              </p>
              <ul className="space-y-2 text-left">
                {['Share Location & Bike Issue', 'We Assign the Nearest Mechanic', 'Repair Done Right Outside Your Gali', 'Clear Cost Breakdown Shared', 'Quality Checked Before Handover', 'Easy Payment, Quick Feedback'].map(item => (
                  <li key={item} className="flex items-center text-white text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="flex justify-center" variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <img src={bmw310Image} alt="How GarageFixCare Works in Paharganj" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
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
              We&apos;re Also Active in <span className="text-red-600">Other NCR Locations</span>
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {linkedAreaPages.map(city => (
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

        {/* Testimonials & Customer Speaks */}
        <section className="bg-slate-800 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                What Our <span className="text-red-600">Riders Say</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base mt-1">Genuine Feedback Shared on Google</p>
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
                Leave Us a Review
              </a>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[
                { name: 'Imran Siddiqui', img: testimonial1, text: 'Mechanic reached my hotel near the railway station within an hour. Fair pricing throughout.', time: 'two weeks ago' },
                { name: 'Pallavi Saluja', img: testimonial2, text: 'Booked for my scooty near Chuna Mandi, work was finished right outside my shop.', time: 'three weeks ago' },
                { name: 'Yuvraj Negi', img: testimonial3, text: 'Quoted the price upfront before starting near Sadar Bazaar. No hidden additions later.', time: 'a month ago' },
                { name: 'Tanvi Arora', img: testimonial4, text: 'Quick response near Karol Bagh, mechanic was polite and finished the job fast.', time: 'a month ago' },
              ].map(t => (
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

        {/* FAQs - Paharganj specific */}
        <section className="bg-slate-900 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Paharganj Bike Service — <span className="text-red-600">Quick Answers</span>
            </motion.h2>
            <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              {[
                { q: 'What is the starting cost for bike service near Paharganj?', a: 'Doorstep bike service near Paharganj begins at ₹275 under the Station Quick Plan for 100-125cc bikes. Standard is ₹365, Comfort ₹455, Cruiser ₹555, and Superbike ₹919, all with labour included.' },
                { q: 'Do you send mechanics close to New Delhi Railway Station?', a: 'Yes, we regularly attend bookings near New Delhi Railway Station, arriving fully equipped so most repairs are completed without a workshop trip.' },
                { q: 'Which exact areas around Paharganj are covered?', a: 'Our coverage spans New Delhi Railway Station, Ajmeri Gate, Ramakrishna Ashram, Chuna Mandi, Arakashan Road, DB Gupta Road, Sadar Bazaar, Connaught Place, Karol Bagh, and Rani Jhansi Road.' },
                { q: 'Can I get a mechanic near Ajmeri Gate quickly?', a: 'Yes, bookings near Ajmeri Gate are usually attended within 2-4 hours. A phone call helps us prioritise urgent or breakdown-related requests.' },
                { q: 'Do you service scooties used by traders near Sadar Bazaar?', a: 'Absolutely. We regularly service scooties such as the Honda Activa and TVS Jupiter that are common among traders and commuters around Sadar Bazaar.' },
                { q: 'Is there a guarantee on bike repairs near DB Gupta Road?', a: 'Every repair carries a 10-day service guarantee. If the same problem reappears within that window, we fix it again at no extra cost.' },
                { q: 'How do I arrange a bike pickup from Rani Jhansi Road?', a: 'Free pickup and drop is available on request from Rani Jhansi Road and nearby lanes — simply mention it while booking and we will coordinate timing.' },
                { q: 'What if my bike breaks down near Karol Bagh or Connaught Place?', a: 'Call us right away with your nearest landmark, and we will dispatch the closest available mechanic to get you moving again on the spot.' }
              ].map((faq, idx) => (
                <motion.div key={idx} variants={staggerItem} className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/40">
                  <button
                    className="flex justify-between items-center w-full p-3 sm:p-4 text-left font-semibold text-white hover:bg-slate-700/60 transition-colors duration-200"
                    onClick={() => setActiveQuestionIdx(activeQuestionIdx === idx ? null : idx)}
                  >
                    <span className="flex items-start">
                      <span className="text-red-600 mr-2">Q{idx + 1}.</span>
                      <span className="text-sm sm:text-base">{faq.q}</span>
                    </span>
                    {activeQuestionIdx === idx ? <X className="h-5 w-5 flex-shrink-0 ml-2" /> : <Plus className="h-5 w-5 flex-shrink-0 ml-2" />}
                  </button>
                  {activeQuestionIdx === idx && (
                    <div className="p-3 sm:p-4 bg-slate-700/60 text-gray-300 text-xs sm:text-sm">{faq.a}</div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-10 sm:py-14 bg-slate-800">
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
              Get Your Bike Serviced Near Paharganj Today
            </h2>
            <p className="text-sm sm:text-base text-white mb-3 sm:mb-5 max-w-xl mx-auto">
              Doorstep service across Paharganj and the station belt starts at ₹275 — no pushing your bike anywhere, no hidden charges.
            </p>
            <a
              href="https://www.garagefixcare.in/bookservice"
              className="bg-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:translate-y-0 transition-all duration-200 inline-block"
            >
              Book Your Service
            </a>
          </motion.div>
        </section>
      </div>

      {/* Floating Buttons */}
      <style>{`
        @keyframes shake {
          0%, 100%      { transform: rotate(0deg) scale(1); }
          2%            { transform: rotate(-16deg) scale(1.06); }
          4%            { transform: rotate(16deg) scale(1.06); }
          6%            { transform: rotate(-12deg) scale(1.06); }
          8%            { transform: rotate(12deg) scale(1.06); }
          10%           { transform: rotate(-6deg) scale(1.03); }
          12%           { transform: rotate(6deg) scale(1.03); }
          14%, 100%     { transform: rotate(0deg) scale(1); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.85); opacity: 0.55; }
          70%  { transform: scale(1.7);  opacity: 0; }
          100% { transform: scale(1.7);  opacity: 0; }
        }
        @keyframes floatIn {
          0%   { transform: translateX(60px); opacity: 0; }
          100% { transform: translateX(0);     opacity: 1; }
        }
        .btn-float-wrap {
          position: relative;
          animation: floatIn 0.6s ease-out both;
        }
        .btn-float-wrap:nth-child(2) { animation-delay: 0.12s; }
        .btn-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          animation: pulseRing 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          pointer-events: none;
        }
        .btn-shake {
          animation: shake 4s ease-in-out infinite;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-shake:hover {
          animation: none;
          transform: scale(1.14);
          box-shadow: 0 0 0 6px rgba(255,255,255,0.12), 0 12px 28px rgba(0,0,0,0.45);
        }
      `}</style>
      <div className="fixed top-1/2 right-4 sm:right-6 flex flex-col space-y-3 sm:space-y-4 z-50 transform -translate-y-1/2">
        <div className="btn-float-wrap">
          <span className="btn-pulse-ring" style={{ background: '#1d72b8' }} />
          <a
            href="tel:9540553759"
            className="btn-shake w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full text-white flex items-center justify-center shadow-2xl relative"
            style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)' }}
            aria-label="Call Us"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </a>
        </div>
        <div className="btn-float-wrap">
          <span className="btn-pulse-ring" style={{ background: '#25d366', animationDelay: '0.4s' }} />
          <a
            href="https://wa.me/9540553759"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shake w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] text-white flex items-center justify-center shadow-2xl rounded-full relative"
            style={{ background: 'linear-gradient(135deg, #25d366, #128c4e)' }}
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size="1em" className="text-[22px] sm:text-[26px]" />
          </a>
        </div>
      </div>

      {/* Checklist Modal */}
      {packageModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-sm sm:max-w-md flex flex-col">
            <div className="p-4 border-b flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black">{selectedPackage.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{selectedPackage.subtitle}</p>
              </div>
              <button onClick={dismissPackageModal} className="text-gray-400 hover:text-gray-900">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Full Checklist:</h4>
              <ul className="list-none space-y-2 text-left text-gray-700 text-xs sm:text-sm">
                {selectedPackage.checklist.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t bg-gray-50 rounded-b-xl">
              <div className="w-full mb-3 relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Enter 10-digit Mobile Number*"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={enteredNumber}
                  onChange={(e) => setEnteredNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  className="pl-10 pr-3 py-2 w-full rounded-xl text-black border border-gray-300 focus:outline-none focus:border-red-600 shadow-sm text-sm"
                />
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="terms" required className="mr-2 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 select-none">
                  Yes, I agree to the <span className="underline">Terms of Service</span>
                </label>
              </div>
              <button
                onClick={submitBookingRequest}
                className="bg-brandRed text-white w-full py-3 rounded-xl font-semibold shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base"
              >
                Confirm Mechanic Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestBikeServicePaharganj;

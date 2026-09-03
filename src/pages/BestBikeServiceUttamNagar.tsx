// BestBikeServiceUttamNagar.tsx
// Uttam Nagar specific SEO/content + latest Delhi Cantt/Home.tsx design system (video hero, Framer Motion, marquees)
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X, Plus, Phone, Bike, Car } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';

// Hero background video (same assets/crossfade system as Delhi Cantt / Home.tsx)
import insideVideo from '../images/inside.mp4';
import outsideVideo from '../images/outside.mp4';

// Hot Deals marquee — same assets as Delhi Cantt / Home.tsx
import hotDealsImage1 from '../images/hotdeals1.png';
import hotDealsImage2 from '../images/hotdeals2.png';
import hotDealsImage3 from '../images/hotdeals3.png';
import hotDealsImage4 from '../images/hotdeals4.png';
import hotDealsImage5 from '../images/hotdeals5.png';

// Bike Services icons — same assets as Delhi Cantt / Home.tsx
import routineService from '../images/Routine Service.png';
import bikeInsurance from '../images/Bike Insurance.png';
import doorstepService from '../images/Doorstep Service.png';
import wheelCare from '../images/Wheel Care.png';
import bikeBatteries from '../images/Bike Battery.png';
import engineRepair from '../images/Engine Repair.png';

// Uttam Nagar specific / existing assets — kept from the original page
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

interface ServicePlan {
  title: string;
  subtitle: string;
  checklist: string[];
}

// ==================================================
// Reusable Framer Motion variants — same system as Delhi Cantt / Home.tsx
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

const BestBikeServiceUttamNagar = () => {
  const [ridersAssisted, setRidersAssisted] = useState(0);
  const [starRating, setStarRating] = useState(4.4);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [activePlan, setActivePlan] = useState<ServicePlan | null>(null);
  const [contactDigits, setContactDigits] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const goTo = useNavigate();

  const prefersReducedMotion = useReducedMotion();

  // Subtle top-of-page scroll progress indicator (same as Delhi Cantt / Home.tsx)
  const { scrollYProgress } = useScroll();
  const scrollProgressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // ================= Navbar-flush hero offset =================
  // Instead of guessing the fixed navbar's height with hardcoded pt-[..px] values (which can
  // drift out of sync with the real navbar and leave a dark gap above the video), measure the
  // actual rendered navbar height at runtime and use that exact value as the hero's top offset.
  // This guarantees the hero video always starts immediately below the navbar with 0px gap,
  // on every breakpoint, even if the navbar's height changes.
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

  // Hot Deals marquee images — Uttam Nagar specific copy/alt text, shared Home-style assets
  const hotDealsImages = [
    { src: hotDealsImage1, alt: 'Bike service offer in Uttam Nagar' },
    { src: hotDealsImage2, alt: 'Doorstep bike service near Uttam Nagar West' },
    { src: hotDealsImage3, alt: 'Bike engine repair near Nawada' },
    { src: hotDealsImage4, alt: 'Roadside bike assistance near Mohan Garden' },
    { src: hotDealsImage5, alt: 'Doorstep bike repair deal near Janakpuri' },
  ];
  const hotDealsAreaBadges = ['Uttam Nagar', 'Uttam Nagar West', 'Nawada', 'Mohan Garden', 'Janakpuri', 'Dwarka Mor'];

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
    { title: 'Quick Care Plan', subtitle: '100 CC - 125 CC', originalPrice: 'Rs. 549', discountedPrice: 'Rs. 279', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Daily Rider Plan', subtitle: '135 CC - 200 CC', originalPrice: 'Rs. 749', discountedPrice: 'Rs. 369', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Power Commuter Plan', subtitle: '220 CC - 300 CC', originalPrice: 'Rs. 1,099', discountedPrice: 'Rs. 459', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Heavy Cruiser Plan', subtitle: '350 CC - 450 CC', originalPrice: 'Rs. 1,499', discountedPrice: 'Rs. 559', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
    { title: 'Superbike Care Plan', subtitle: 'Above 500 CC', originalPrice: 'Rs. 2,049', discountedPrice: 'Rs. 929', features: ['Engine Oil Change', 'Oil Filter Wash', 'Air Filter Wash', 'Spark Plug Cleaning'] },
  ];

  const fullInspectionList = [
    'Coolant Top-Up Check', 'Quick Exterior Wash', 'Chain & Pivot Greasing', 'Battery Terminal Check',
    'Engine Idle Inspection', 'Front Fork Check', 'Carburettor Tune Check', 'Wiring & Light Check',
    'Front & Rear Brake Setting', 'Drive Chain Cleaning', 'Bolt & Nut Tightening',
    'Mileage & Power Check', 'Engine Oil Replacement (Billed Separately)', 'Oil Filter Swap (If Required)',
    'Air Filter Swap (If Required)', 'Spark Plug Swap (If Required)', 'Tubeless Tyre Air Refill',
    'Free Pickup & Drop (On Request)',
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
        serviceType: serviceType,
      });
      alert('Request received! Our Uttam Nagar team will call you shortly to lock in your slot.');
      dismissModal();
    } catch (error) {
      alert('Something went wrong while booking. Please try once more.');
      console.error('Error booking service:', error);
    }
  };

  const regionStrip = [
    { name: 'Uttam Nagar', color: 'text-indigo-700' },
    { name: 'Janakpuri', color: 'text-red-700' },
    { name: 'Dwarka', color: 'text-teal-700' },
    { name: 'Vikas Puri', color: 'text-gray-900' },
    { name: 'Najafgarh', color: 'text-orange-700' },
    { name: 'Tilak Nagar', color: 'text-slate-700' },
  ];

  const localPockets = [
    'Uttam Nagar East', 'Uttam Nagar West', 'Nawada', 'Mohan Garden',
    'Om Vihar', 'Dwarka Mor', 'Bindapur', 'Janakpuri',
    'Vikas Puri', 'Matiyala',
  ];

  const otherCityLinks = [
    { name: 'Gurgaon', path: '/best-bike-service-gurgaon' },
    { name: 'Connaught Place', path: '/best-bike-service-connaught-place' },
    { name: 'Noida', path: '/best-bike-service-noida' },
    { name: 'Ghaziabad', path: '/best-bike-service-ghaziabad' },
    { name: 'Faridabad', path: '/best-bike-service-faridabad' },
  ];

  // Brands We Service marquee data (same structure/logic as Delhi Cantt / Home.tsx)
  const bikeBrands = ['Hero', 'Honda', 'TVS', 'Bajaj', 'Suzuki', 'Yamaha', 'Kawasaki', 'Royal Enfield', 'KTM', 'BMW', 'Harley Davidson', 'Ducati', 'Triumph', 'Indian', 'Vespa', 'Benelli', 'Aprilia', 'Yezdi', 'Husqvarna', 'Other'];
  const scootyBrands = ['Honda', 'TVS', 'Hero', 'Suzuki', 'Yamaha', 'Ather', 'Ola Electric', 'Bajaj', 'Vespa', 'Aprilia', 'Other'];
  const marqueeBrands = Array.from(
    new Set([...bikeBrands, ...scootyBrands, 'Jawa', 'Bajaj Chetak', 'Vida', 'Okinawa', 'Ampere', 'Revolt'])
  ).filter(brand => brand !== 'Other');
  const marqueeBrandsRow1 = marqueeBrands.filter((_, i) => i % 2 === 0);
  const marqueeBrandsRow2 = marqueeBrands.filter((_, i) => i % 2 !== 0);

  const bikeServiceCards = [
    { name: 'General Servicing', img: routineService },
    { name: 'Engine Diagnosis', img: engineRepair },
    { name: 'Battery Swap', img: bikeBatteries },
    { name: 'Brake Setting', img: wheelCare },
    { name: 'Tyre & Puncture', img: doorstepService },
    { name: 'Insurance Help', img: bikeInsurance },
  ];

  return (
    <>
      <SEOHelmet
        title="Bike Mechanic Near Uttam Nagar | Home Service from ₹279 | Garage Fix Care"
        description="Need a bike mechanic near Uttam Nagar? Garage Fix Care sends trained technicians to your doorstep across Uttam Nagar East, West, Nawada & Janakpuri from ₹279."
        canonical="https://www.garagefixcare.in/best-bike-service-uttam-nagar"
        robots="index, follow"
        og={{
          url: 'https://www.garagefixcare.in/best-bike-service-uttam-nagar',
          image: 'https://www.garagefixcare.in/og-banner.png',
          imageAlt: 'Bike mechanic visiting a home in Uttam Nagar for doorstep servicing',
          type: 'website',
        }}
        twitter={{
          image: 'https://www.garagefixcare.in/og-banner.png',
          imageAlt: 'Garage Fix Care doorstep bike mechanic in Uttam Nagar',
        }}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Garage Fix Care',
            description: 'Doorstep bike mechanic service for Uttam Nagar and nearby West Delhi localities, covering general servicing, repairs, and breakdown support from ₹279.',
            url: 'https://www.garagefixcare.in/best-bike-service-uttam-nagar',
            telephone: '+919540553759',
            priceRange: '₹₹',
            image: 'https://www.garagefixcare.in/og-banner.png',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Uttam Nagar',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
            geo: { '@type': 'GeoCoordinates', latitude: '28.6219', longitude: '77.0584' },
            areaServed: [
              { '@type': 'Place', name: 'Uttam Nagar East' },
              { '@type': 'Place', name: 'Uttam Nagar West' },
              { '@type': 'Place', name: 'Nawada' },
              { '@type': 'Place', name: 'Mohan Garden' },
              { '@type': 'Place', name: 'Om Vihar' },
              { '@type': 'Place', name: 'Dwarka Mor' },
              { '@type': 'Place', name: 'Bindapur' },
              { '@type': 'Place', name: 'Janakpuri' },
              { '@type': 'Place', name: 'Vikas Puri' },
              { '@type': 'Place', name: 'Matiyala' },
            ],
            serviceType: ['Bike Mechanic Visit', 'Doorstep Two-Wheeler Service', 'Engine Repair', 'Battery Replacement', 'Brake Repair', 'Puncture Repair'],
            openingHours: 'Mo-Su 08:00-20:00',
            aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '100000' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Home Bike Servicing in Uttam Nagar',
            provider: { '@type': 'LocalBusiness', name: 'Garage Fix Care' },
            areaServed: 'Uttam Nagar',
            description: 'On-demand bike servicing at home starting at ₹279, including oil change, brake setting, battery check, and puncture fix across Uttam Nagar and nearby pockets.',
            offers: { '@type': 'Offer', priceCurrency: 'INR', price: '279', availability: 'https://schema.org/InStock' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is the starting price for bike service in Uttam Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Home bike servicing in Uttam Nagar begins at ₹279 for the Quick Care Plan (100-125cc). Larger engines are priced higher, with the Superbike Care Plan at ₹929, all inclusive of labour.' } },
              { '@type': 'Question', name: 'Do mechanics visit homes in Uttam Nagar West?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, our technicians regularly visit homes and offices across Uttam Nagar West with the tools and parts needed to finish most jobs on the spot.' } },
              { '@type': 'Question', name: 'Which Uttam Nagar pockets are covered?', acceptedAnswer: { '@type': 'Answer', text: 'We cover Uttam Nagar East, Uttam Nagar West, Nawada, Mohan Garden, Om Vihar, Dwarka Mor, Bindapur, Janakpuri, Vikas Puri, and Matiyala.' } },
              { '@type': 'Question', name: 'Can I get same-day bike repair near Nawada or Mohan Garden?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, same-day repair is available near Nawada and Mohan Garden. Call ahead and we will arrange the nearest available mechanic for your slot.' } },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' },
              { '@type': 'ListItem', position: 2, name: 'Bike Mechanic Near Uttam Nagar', item: 'https://www.garagefixcare.in/best-bike-service-uttam-nagar' },
            ],
          },
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
              {/* TOP ZONE — H1 + subheading (Uttam Nagar specific) */}
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
                  Bike Mechanic Near Uttam Nagar
                  <span style={{ color: '#FF7A18' }}> — At Your Door from ₹279</span>
                </motion.h1>

                <motion.p
                  variants={heroStaggerItem}
                  className="font-poppins text-[11px] sm:text-sm font-semibold text-white/85 leading-tight mb-1.5 sm:mb-2"
                >
                  Plans from <span style={{ color: '#FF7A18' }}>₹279</span> &bull; Quick Turnaround &bull; Mechanics Across West Delhi
                </motion.p>

                <motion.p
                  variants={heroStaggerItem}
                  className="hidden sm:block text-xs sm:text-sm leading-relaxed text-white/80 mb-2 sm:mb-3 max-w-[520px]"
                >
                  Tired of pushing your bike to a roadside shop? Garage Fix Care sends a trained mechanic straight to your gate anywhere in Uttam Nagar East, Uttam Nagar West, Nawada, or Mohan Garden. From a routine oil top-up to a stubborn engine issue, we handle the job while you carry on with your day.
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
                  {['From ₹279', 'Quick Slots Daily', 'Mechanic At Your Gate', 'Skilled Technicians', 'Clear Billing'].map((point, i) => (
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
                    Get a Mechanic Now
                  </a>
                  <a
                    href="tel:9540553759"
                    className="border-2 border-white text-white px-4 py-2 rounded-lg text-xs sm:px-6 sm:py-3 sm:rounded-xl font-semibold sm:text-base hover:bg-white hover:text-blue-900 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Call Now
                  </a>
                </motion.div>

                {/* What Are You Riding? */}
                <motion.div
                  variants={heroStaggerItem}
                  className="mt-2 sm:mt-5 w-full sm:max-w-[380px] lg:max-w-[420px] bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-3 shadow-lg"
                >
                  <p className="text-white/90 text-[9px] sm:text-xs font-semibold mb-1 sm:mb-2 tracking-tight">What Are You Riding?</p>
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
                      onClick={() => goTo('/car')}
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
                      {starRating.toFixed(1)}/5
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-center">Google Rating</div>
                  </div>
                  <div className="bg-sky-100 text-black px-2 py-1.5 sm:p-1 rounded-lg sm:rounded-xl shadow-lg flex-1">
                    <div className="text-xs sm:text-xl font-bold text-center">{ridersAssisted.toLocaleString()}+</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-center">Riders Assisted</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Dark premium information strip — Uttam Nagar specific copy */}
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
                Garage Fix Care — Uttam Nagar
              </span>
            </span>
            <p className="relative text-[10px] sm:text-sm leading-[1.4] sm:leading-relaxed" style={{ color: '#cbd5e1' }}>
              Skip the workshop queue. Our verified mechanics come straight to your lane, home, or shop across Uttam Nagar East, Uttam Nagar West, Nawada, Mohan Garden, Om Vihar, Dwarka Mor, Bindapur, Janakpuri, Vikas Puri and Matiyala — handling everything from routine servicing to engine repairs. Fast, transparent, and affordable.
            </p>
          </div>
        </motion.div>

        {/* Marquee: Service Available zones */}
        <div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
          <div className="flex items-center text-sm sm:text-sm font-semibold max-w-7xl mx-auto">
            <div className="flex-shrink-0 px-2 sm:px-2 pr-2">
              <span className="text-red-600 mr-1 sm:mr-2 font-bold">Mechanics Active Now </span>
              <span className="text-brandRed font-bold sm:inline"> (Flat 10% Off)</span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center animate-marquee">
                {[...Array(3)].map((_, repIdx) =>
                  regionStrip.map((zone, idx) => (
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

        {/* Hot Deals This Week — Uttam Nagar specific copy, Home-style marquee */}
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
                  <span className="text-white">Fresh Discounts</span> <span className="text-red-600">For Uttam Nagar</span>
                </h2>
                <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
              <p className="text-base sm:text-lg text-white max-w-7xl mx-auto mt-2 text-center">
                Special savings this week for riders across Uttam Nagar, Nawada and Mohan Garden! Get up to 10% off on bike repairs and servicing at your doorstep. Lock your slot before the offer ends!
              </p>
            </motion.div>
          </div>
          <div className="hotdeals-marquee-viewport overflow-hidden w-full px-6 sm:px-12 lg:px-20">
            <div
              className="hotdeals-marquee-track"
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...hotDealsImages, ...hotDealsImages].map((img, i) => (
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

        {/* Bikes & Scooters — Brands We Service (replaces old Google/Facebook/JustDial review section) */}
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

        {/* Home Service Price List — Uttam Nagar pricing (premium vertical service-plan cards) */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Home Service</span> <span className="text-red-600">Pricing Sheet</span>
              </h2>
              <p className="text-base sm:text-xl text-white mb-10 sm:mb-12 max-w-3xl mx-auto">
                Plain, upfront rates for doorstep bike service near Uttam Nagar. You only pay based on your bike&apos;s engine size — nothing extra, ever.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {planList.map((service, index) => {
                const isBestValue = service.title === 'Power Commuter Plan';
                // Distinct-but-consistent GarageFixCare orange-family gradient per plan.
                const headerGradients = [
                  'linear-gradient(135deg, #1f2937 0%, #92400e 130%)', // Quick Care — dark to amber
                  'linear-gradient(135deg, #78350f 0%, #f97316 120%)', // Daily Rider — warm orange
                  'linear-gradient(135deg, #ea580c 0%, #FF7A18 100%)', // Power Commuter — strong orange (best value)
                  'linear-gradient(135deg, #7c2d12 0%, #f97316 130%)', // Heavy Cruiser — deep orange-red
                  'linear-gradient(135deg, #111827 0%, #c2410c 140%)', // Superbike Care — dark orange
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
                        HOME SERVICE
                        <br />
                        {service.title.replace(' Plan', '').toUpperCase()}
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
                        onClick={() => openPlanDetails(service.title, service.subtitle)}
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

        {/* Areas Covered — Uttam Nagar localities */}
        <section className="py-10 sm:py-14 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Mechanics Active Across <span className="text-red-600">Uttam Nagar</span>
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {localPockets.map(area => (
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
              No matter if your bike is parked in Uttam Nagar East, Uttam Nagar West, Nawada, Mohan Garden, Om Vihar, Dwarka Mor, Bindapur, Janakpuri, Vikas Puri, or Matiyala, a mechanic typically reaches you within 2-4 hours. Same-day visits are the norm across this stretch of West Delhi.
            </motion.p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                Everything Your Bike Needs, <span className="text-red-600">Sorted at Your Doorstep</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
                Routine maintenance or a tricky fault — our Uttam Nagar mechanics handle it all at your location. No waiting, no hassle.
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
                    alt={`${service.name} in Uttam Nagar`}
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

        {/* Comprehensive Bike Service Content (Uttam Nagar specific, 1000+ words) */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              About Our <span className="text-red-600">Doorstep Bike Service in Uttam Nagar</span>
            </motion.h2>
            <motion.div
              className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p>Uttam Nagar is one of West Delhi&apos;s busiest residential belts, packed with narrow lanes, dense markets, and a huge number of daily commuters riding bikes and scooties through Uttam Nagar East and Uttam Nagar West every single day. Finding parking outside a workshop here can eat up more time than the actual repair, which is exactly the gap Garage Fix Care closes. Our technicians travel directly to your home, shop, or society gate anywhere between Nawada and Mohan Garden, carrying every tool and part needed to finish the job without a second trip. Pricing for a home visit begins at ₹279, covering an oil change, filter cleaning, spark plug check, and a basic brake adjustment, with the entire job wrapped up in your own lane. We work on the full spread of brands riders prefer in this part of Delhi — Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, and Royal Enfield — along with scooties like the Activa and Jupiter that dominate short trips around Om Vihar and Dwarka Mor. Every estimate is shared with you before work starts, so there&apos;s no guessing about the final bill once the mechanic is done.</p>
              <p>The roads through Bindapur, Janakpuri, and Vikas Puri see constant stop-and-go traffic, which is tough on brake pads, chains, and engine oil — small wear-and-tear issues that turn expensive if ignored for too long. Our mechanics check for these warning signs proactively, catching problems early instead of waiting for a full breakdown. If your bike does stall unexpectedly anywhere near Matiyala or along the main Uttam Nagar stretch, a single call brings a technician to your exact spot for an on-the-road fix. We routinely handle battery changes, brake pad swaps, clutch wire adjustments, and tubeless puncture repairs without needing to tow the bike anywhere. Garage Fix Care has now supported over 1,00,000 riders across Delhi NCR and maintains a strong 4.7 rating on Google, built on punctual visits and straightforward pricing. Reach out through our website, a quick WhatsApp text, or a direct call, and get your bike sorted without leaving Uttam Nagar.</p>
            </motion.div>
          </div>
        </section>

        {/* Warranty / Benefits Section */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <p className="text-xs sm:text-sm font-semibold text-orange-400 uppercase tracking-wide mb-1">
                Flat ₹10 Off Your First Uttam Nagar Booking
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                GarageFixCare <span className="text-red-600">Care Assurance</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                Uttam Nagar&apos;s go-to doorstep bike mechanic. We service every common motorcycle and scooter brand — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right at your home, shop, or office.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[
                { img: warrantyImg, title: '10-Day Service Backup', desc: 'Worry-free coverage' },
                { img: pickupImg, title: 'Free Pickup & Drop', desc: 'Zero travel hassle' },
                { img: transparentImg, title: 'Clear, Upfront Pricing', desc: 'Save up to 30%' },
                { img: trainedImg, title: 'Trained, Verified Mechanics', desc: 'Skilled hands every time' },
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

        {/* Why Uttam Nagar Riders Trust GarageFixCare */}
        <section className="py-12 sm:py-16 bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div
              className="flex justify-center order-2 lg:order-1"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <img src={whyChooseImg} alt="Why Uttam Nagar Riders Trust GarageFixCare" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div className="order-1 lg:order-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Why Uttam Nagar Riders Trust <span className="text-red-600">GarageFixCare?</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                We bring the workshop to your doorstep across Uttam Nagar and the neighbouring colonies — fair rates, real parts, no back-and-forth.
              </p>
              <ul className="space-y-2 text-left">
                {['Mechanic Comes to Your Lane', 'Trained & Background-Checked Staff', 'No-Surprise Pricing', 'Genuine Spare Parts Only', 'Service Backed by Guarantee', 'Fast, Reliable Turnaround'].map(item => (
                  <li key={item} className="flex items-center text-gray-200 text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Trusted by Leading Brands */}
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

        {/* How GarageFixCare Works in Uttam Nagar */}
        <section className="bg-slate-800 text-white py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                How <span className="text-red-600">GarageFixCare</span> Works in Uttam Nagar?
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                No app downloads, no long forms. Just tell us your bike issue and location, and help is on the way to your lane in Uttam Nagar.
              </p>
              <ul className="space-y-2 text-left">
                {['Tell Us Your Location & Issue', 'We Assign a Nearby Mechanic', 'Repair Done at Your Doorstep', 'Transparent Cost Breakdown', 'Quality Checked Before Handover', 'Pay Easily, Rate Your Experience'].map(item => (
                  <li key={item} className="flex items-center text-white text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="flex justify-center" variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <img src={bmw310Image} alt="How GarageFixCare Works in Uttam Nagar" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
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
              {otherCityLinks.map(city => (
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

        {/* Customer Testimonials */}
        <section className="bg-slate-800 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Words From <span className="text-red-600">Our Customers</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base mt-1">Real Feedback Shared on Google</p>
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
                Add Your Review
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
                { name: 'Tarun Bhandari', img: testimonial1, text: 'Mechanic reached my lane in Uttam Nagar West within an hour. Fair pricing, no drama.', time: 'two weeks ago' },
                { name: 'Sumit Choudhary', img: testimonial2, text: 'Booked for my Activa near Nawada, work was done right outside my gate.', time: 'three weeks ago' },
                { name: 'Rohit Tanwar', img: testimonial3, text: 'Quoted the price upfront before touching the bike. Very transparent process.', time: 'a month ago' },
                { name: 'Komal Saxena', img: testimonial4, text: 'Quick response near Mohan Garden, mechanic was polite and skilled.', time: 'a month ago' },
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

        {/* FAQs (Uttam Nagar specific) */}
        <section className="bg-slate-900 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Uttam Nagar Bike Service — <span className="text-red-600">Quick Answers</span>
            </motion.h2>
            <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              {[
                { q: 'What does a home bike service cost in Uttam Nagar?', a: 'Home bike servicing in Uttam Nagar starts at ₹279 under the Quick Care Plan for 100-125cc bikes. Daily Rider Plan is ₹369, Power Commuter ₹459, Heavy Cruiser ₹559, and Superbike Care ₹929, all with labour included.' },
                { q: 'Do you send mechanics to Uttam Nagar East specifically?', a: 'Yes, Uttam Nagar East is one of our most regularly served pockets. Technicians arrive fully stocked, so most repairs are completed during the first visit itself.' },
                { q: 'Which exact areas around Uttam Nagar are covered?', a: 'Our coverage spans Uttam Nagar East, Uttam Nagar West, Nawada, Mohan Garden, Om Vihar, Dwarka Mor, Bindapur, Janakpuri, Vikas Puri, and Matiyala.' },
                { q: 'Can I book a mechanic near Dwarka Mor or Bindapur quickly?', a: 'Yes, bookings near Dwarka Mor and Bindapur are usually fulfilled within 2-4 hours. A phone call helps speed things up further for urgent needs.' },
                { q: 'Do you handle scooty servicing near Janakpuri and Vikas Puri?', a: 'Absolutely. We service scooties like the Honda Activa, TVS Jupiter, and Suzuki Access regularly for riders around Janakpuri and Vikas Puri.' },
                { q: 'Is there a guarantee on bike repairs done in Uttam Nagar?', a: 'Every repair carries a 10-day service backup. If the same issue resurfaces within that window, we resolve it without any additional charge.' },
                { q: 'How do I arrange a bike pickup from Matiyala?', a: "Free pickup and drop is available on request from Matiyala and surrounding lanes — just mention it while booking and we'll coordinate the timing." },
                { q: 'What if my bike breaks down suddenly near Mohan Garden?', a: 'Call us right away with your location near Mohan Garden, and we will dispatch the nearest available mechanic to get you riding again.' },
              ].map((faq, idx) => (
                <motion.div key={idx} variants={staggerItem} className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/40">
                  <button
                    className="flex justify-between items-center w-full p-3 sm:p-4 text-left font-semibold text-white hover:bg-slate-700/60 transition-colors duration-200"
                    onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                  >
                    <span className="flex items-start">
                      <span className="text-red-600 mr-2">Q{idx + 1}.</span>
                      <span className="text-sm sm:text-base">{faq.q}</span>
                    </span>
                    {expandedQuestion === idx ? <X className="h-5 w-5 flex-shrink-0 ml-2" /> : <Plus className="h-5 w-5 flex-shrink-0 ml-2" />}
                  </button>
                  {expandedQuestion === idx && (
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
              Your Bike, Fixed Right Where You Park It
            </h2>
            <p className="text-sm sm:text-base text-white mb-3 sm:mb-5 max-w-xl mx-auto">
              Doorstep service across Uttam Nagar starts at ₹279 — no towing, no waiting around, no hidden costs.
            </p>
            <a
              href="https://www.garagefixcare.in/bookservice"
              className="bg-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:translate-y-0 transition-all duration-200 inline-block"
            >
              Book a Mechanic
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
      {showChecklistModal && activePlan && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-sm sm:max-w-md flex flex-col">
            <div className="p-4 border-b flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black">{activePlan.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{activePlan.subtitle}</p>
              </div>
              <button onClick={dismissModal} className="text-gray-400 hover:text-gray-900">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Inspection Checklist:</h4>
              <ul className="list-none space-y-2 text-left text-gray-700 text-xs sm:text-sm">
                {activePlan.checklist.map((item, i) => (
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
                  value={contactDigits}
                  onChange={(e) => setContactDigits(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
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
                onClick={submitQuickBooking}
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

export default BestBikeServiceUttamNagar;

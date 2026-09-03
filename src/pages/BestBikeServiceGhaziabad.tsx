// BestBikeServiceGhaziabad.tsx
// Ghaziabad specific SEO/content + Delhi Cantt / Home.tsx design system (video hero, Framer Motion, marquees)
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X, Plus, Phone, Bike, Car } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';

// Hero background video (same assets/crossfade system as Home.tsx / Delhi Cantt)
import insideVideo from '../images/inside.mp4';
import outsideVideo from '../images/outside.mp4';

// Hot Deals marquee — now using the same Delhi Cantt/Home assets
import hotDealsImage1 from '../images/hotdeals1.png';
import hotDealsImage2 from '../images/hotdeals2.png';
import hotDealsImage3 from '../images/hotdeals3.png';
import hotDealsImage4 from '../images/hotdeals4.png';
import hotDealsImage5 from '../images/hotdeals5.png';

// Bike Services icons — same as Delhi Cantt
import routineService from '../images/Routine Service.png';
import bikeInsurance from '../images/Bike Insurance.png';
import doorstepService from '../images/Doorstep Service.png';
import wheelCare from '../images/Wheel Care.png';
import bikeBatteries from '../images/Bike Battery.png';
import engineRepair from '../images/Engine Repair.png';

// Ghaziabad specific / existing assets — kept from the original page
import warrantyImg from '../images/warranty.webp';
import pickupImg from '../images/free pickup.webp';
import transparentImg from '../images/transparent.webp';
import trainedImg from '../images/trainie.webp';
import whyChooseImg from '../images/whychoose.png';  // replaced handshake.jpg
import wurthImg from '../images/WURTH.png';
import motulImg from '../images/Motul.jpeg';
import turtlemintImg from '../images/Turtlemint.png';
import buniyadImg from '../images/Buniyad.png';
import dunzoImg from '../images/Dunzo.png';
import bmw310Image from '../images/bmw310.png';      // replaced How-works.jpg
import googleIcon from '../images/Testimonial1.png';
import testimonial1 from '../images/Testimonial1.jpeg';
import testimonial2 from '../images/Testimonial2.jpeg';
import testimonial3 from '../images/Testimonial3.jpeg';
import testimonial4 from '../images/Testimonial4.jpeg';

interface Service {
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

const BestBikeServiceGhaziabad = () => {
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showInput, setShowInput] = useState(false);
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

  // ================= Hero video sequence — robust two-slot crossfade with readiness handling =================
  const heroVideoSources = [insideVideo, outsideVideo];
  const heroVideoSlot0Ref = useRef<HTMLVideoElement | null>(null);
  const heroVideoSlot1Ref = useRef<HTMLVideoElement | null>(null);
  const heroVideoRefs = [heroVideoSlot0Ref, heroVideoSlot1Ref] as const;
  const [activeHeroSlot, setActiveHeroSlot] = useState<0 | 1>(0);
  const heroSequencePosRef = useRef(0);
  const heroTransitioningRef = useRef(false);
  const heroNextReadyRef = useRef(false);          // true when the next slot's video is ready
  const heroPendingTransitionRef = useRef(false);  // true if a transition was requested but not yet executed
  const heroNextSlotRef = useRef<0 | 1>(0);        // the slot we want to switch to
  const heroCanPlayHandlersRef = useRef<(() => void)[]>([]);

  const HERO_CROSSFADE_SECONDS = prefersReducedMotion ? 0 : 0.65;
  const HERO_TRANSITION_LEAD_SECONDS = 0.6;

  // Helper to clean up event listeners from a video element
  const cleanupVideoListeners = (video: HTMLVideoElement | null) => {
    if (!video) return;
    heroCanPlayHandlersRef.current.forEach(handler => {
      video.removeEventListener('canplay', handler);
    });
    heroCanPlayHandlersRef.current = [];
  };

  // Initial setup: load both videos, play the first, preload the second
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
    heroNextReadyRef.current = false;
    heroPendingTransitionRef.current = false;
    heroNextSlotRef.current = 1;

    // Cleanup on unmount
    return () => {
      cleanupVideoListeners(slot0);
      cleanupVideoListeners(slot1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to request a transition to the next video
  const requestHeroTransition = (fromSlot: 0 | 1) => {
    if (heroTransitioningRef.current) return;
    const toSlot: 0 | 1 = fromSlot === 0 ? 1 : 0;
    const nextEl = heroVideoRefs[toSlot].current;
    if (!nextEl) return;

    // If the next video is already ready (canplay or readyState >= 3), proceed immediately
    if (nextEl.readyState >= 3) {
      performHeroTransition(fromSlot, toSlot);
      return;
    }

    // Otherwise, wait for the 'canplay' event on the next video
    heroNextReadyRef.current = false;
    heroPendingTransitionRef.current = true;
    heroNextSlotRef.current = toSlot;

    const onCanPlay = () => {
      heroNextReadyRef.current = true;
      if (heroPendingTransitionRef.current && heroNextSlotRef.current === toSlot) {
        heroPendingTransitionRef.current = false;
        performHeroTransition(fromSlot, toSlot);
      }
      // Remove the listener after it fires
      nextEl.removeEventListener('canplay', onCanPlay);
      // Remove from stored handlers
      heroCanPlayHandlersRef.current = heroCanPlayHandlersRef.current.filter(h => h !== onCanPlay);
    };
    nextEl.addEventListener('canplay', onCanPlay);
    heroCanPlayHandlersRef.current.push(onCanPlay);
  };

  // Actually perform the crossfade transition
  const performHeroTransition = (fromSlot: 0 | 1, toSlot: 0 | 1) => {
    if (heroTransitioningRef.current) return;
    const nextEl = heroVideoRefs[toSlot].current;
    if (!nextEl) return;

    heroTransitioningRef.current = true;
    const nextLogicalIndex = (heroSequencePosRef.current + 1) % heroVideoSources.length;

    // Ensure the next video starts from the beginning
    nextEl.currentTime = 0;
    const playPromise = nextEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    // Switch active slot – this triggers the Framer Motion crossfade
    setActiveHeroSlot(toSlot);
    heroSequencePosRef.current = nextLogicalIndex;

    // After the crossfade duration, preload the upcoming source into the idle slot
    window.setTimeout(() => {
      const idleEl = heroVideoRefs[fromSlot].current;
      if (idleEl) {
        const upcomingIndex = (nextLogicalIndex + 1) % heroVideoSources.length;
        idleEl.pause();
        idleEl.src = heroVideoSources[upcomingIndex];
        idleEl.load();
        // The next video will fire 'canplay' when ready – we'll handle that in the timeupdate/ended logic
      }
      heroTransitioningRef.current = false;
      heroNextReadyRef.current = false;
      heroPendingTransitionRef.current = false;
      // Clear any pending listeners for this slot
      cleanupVideoListeners(heroVideoRefs[toSlot].current);
    }, HERO_CROSSFADE_SECONDS * 1000);
  };

  // Timeupdate: when we're near the end of the active video, request a transition
  const handleHeroTimeUpdate = (slot: 0 | 1) => () => {
    if (activeHeroSlot !== slot || heroTransitioningRef.current) return;
    const el = heroVideoRefs[slot].current;
    if (!el || !el.duration || Number.isNaN(el.duration)) return;
    if (el.duration - el.currentTime <= HERO_TRANSITION_LEAD_SECONDS) {
      requestHeroTransition(slot);
    }
  };

  // Ended: if we somehow reach the end, request transition immediately (fallback)
  const handleHeroEnded = (slot: 0 | 1) => () => {
    if (activeHeroSlot !== slot || heroTransitioningRef.current) return;
    requestHeroTransition(slot);
  };
  // ================= End hero video sequence =================

  // Hot Deals marquee images — Ghaziabad specific copy/alt text, now using Delhi Cantt/Home assets
  const carouselImages = [
    { src: hotDealsImage1, alt: 'Bike service offer in Ghaziabad' },
    { src: hotDealsImage2, alt: 'Doorstep bike service near Indirapuram' },
    { src: hotDealsImage3, alt: 'Bike engine repair near Vaishali' },
    { src: hotDealsImage4, alt: 'Roadside bike assistance near Raj Nagar Extension' },
    { src: hotDealsImage5, alt: 'Doorstep bike repair deal in Ghaziabad' },
  ];
  const hotDealsAreaBadges = ['Ghaziabad', 'Indirapuram', 'Vaishali', 'Raj Nagar Extension', 'Vasundhara', 'Kaushambi'];

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
    { title: 'At-Home Regular Service', subtitle: '100 CC - 125 CC', originalPrice: 'Rs. 599', discountedPrice: 'Rs. 299', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Classic Service', subtitle: '135 CC - 200 CC', originalPrice: 'Rs. 799', discountedPrice: 'Rs. 399', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Premium Service', subtitle: '220 CC - 300 CC', originalPrice: 'Rs. 1,199', discountedPrice: 'Rs. 450', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Royal Service', subtitle: '350 CC - 450 CC', originalPrice: 'Rs. 1,599', discountedPrice: 'Rs. 550', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Sports Service', subtitle: 'Above 500 CC', originalPrice: 'Rs. 2,199', discountedPrice: 'Rs. 599', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
  ];

  const checklistItems = [
    'Coolant check-up', 'Basic Hand Cleaning', 'Oiling and greasing', 'Battery General check-up',
    'Basic Engine Inspection', 'Basic Fork Inspection', 'Carburettor Basic check-up', 'Minor Electrical check-up',
    'Brakes – Front & Rear Adjust', 'Driven Chain Basic Cleaning', 'Tightening of Screws Bolts & Nuts',
    'Average and Performance check-up', 'Engine Oil Change (Price Extra)', 'Oil Filter Clean (If Replace Charges)',
    'Air Filter Clean (If Replace Charges)', 'Spark Plug Clean (If Replace Charges)', 'Tyre Air Fill (only tubeless)',
    'Free Pick and Drop (if needed)',
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
        serviceType: serviceType,
      });
      alert('Thanks for booking! We have received your request and will contact you in 5 minutes.');
      closeModal();
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error('Error booking service:', error);
    }
  };

  const handleHeroQuickBook = async () => {
    if (!modalPhoneNumber || modalPhoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
        phoneNumber: modalPhoneNumber,
        serviceType: 'Doorstep Bike Service',
      });
      alert('✅ Booking received! Our team will contact you shortly.');
      setModalPhoneNumber('');
      setShowInput(false);
    } catch (error) {
      alert('❌ Booking failed. Please try again.');
      console.error('Error booking service:', error);
    }
  };

  const serviceCities = [
    { name: 'Ghaziabad', color: 'text-gray-900' },
    { name: 'Delhi', color: 'text-red-700' },
    { name: 'Noida', color: 'text-teal-700' },
    { name: 'Gurgaon', color: 'text-indigo-700' },
    { name: 'Faridabad', color: 'text-orange-700' },
    { name: 'Greater Noida', color: 'text-slate-700' },
  ];

  const coveredAreas = [
    'Indirapuram', 'Vaishali', 'Raj Nagar Extension',
    'Crossings Republik', 'Vasundhara', 'Kaushambi',
  ];

  const cityPages = [
    { name: 'Ghaziabad', path: '/best-bike-service-ghaziabad' },
    { name: 'Delhi', path: '/best-bike-service-delhi' },
    { name: 'Noida', path: '/best-bike-service-noida' },
    { name: 'Gurgaon', path: '/best-bike-service-gurgaon' },
    { name: 'Greater Noida', path: '/best-bike-service-greater-noida' },
    { name: 'Faridabad', path: '/best-bike-service-faridabad' },
  ];

  // Brands We Service marquee data (same as Delhi Cantt)
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
        title="Best Bike Service in Ghaziabad | Doorstep Bike Repair ₹299 | Garage Fix Care"
        description="Best doorstep bike service in Ghaziabad starting at ₹299. Trusted mechanics for bike repair, maintenance, oil change and battery replacement."
        canonical="https://www.garagefixcare.in/best-bike-service-ghaziabad"
        robots="index, follow"
        og={{
          url: 'https://www.garagefixcare.in/best-bike-service-ghaziabad',
          image: 'https://www.garagefixcare.in/og-banner.png',
          imageAlt: 'Best bike service in Ghaziabad at doorstep by Garage Fix Care',
          type: 'website',
        }}
        twitter={{
          image: 'https://www.garagefixcare.in/og-banner.png',
          imageAlt: 'Doorstep bike service and repair in Ghaziabad',
        }}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Garage Fix Care',
            description: 'Best bike service in Ghaziabad. Doorstep bike repair, maintenance, oil change, and battery replacement starting at ₹299.',
            url: 'https://www.garagefixcare.in/best-bike-service-ghaziabad',
            telephone: '+919540553759',
            priceRange: '₹₹',
            image: 'https://www.garagefixcare.in/og-banner.png',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Indirapuram',
              addressLocality: 'Ghaziabad',
              addressRegion: 'Uttar Pradesh',
              postalCode: '201014',
              addressCountry: 'IN',
            },
            geo: { '@type': 'GeoCoordinates', latitude: '28.6692', longitude: '77.4538' },
            areaServed: [
              { '@type': 'City', name: 'Ghaziabad' },
              { '@type': 'City', name: 'Delhi' },
              { '@type': 'City', name: 'Noida' },
              { '@type': 'City', name: 'Gurgaon' },
              { '@type': 'City', name: 'Faridabad' },
              { '@type': 'City', name: 'Greater Noida' },
            ],
            hasMap: 'https://goo.gl/maps/dqmKivbhftEaVxK79',
            serviceType: ['Bike Repair', 'Doorstep Bike Service', 'Bike Service Ghaziabad', 'Bike Repair Ghaziabad', 'Engine Repair', 'Battery Replacement', 'Brake Repair', 'Tyre Service'],
            openingHours: 'Mo-Su 08:00-20:00',
            aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '100000' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Best Bike Service in Ghaziabad',
            provider: { '@type': 'LocalBusiness', name: 'Garage Fix Care' },
            areaServed: { '@type': 'City', name: 'Ghaziabad' },
            description: 'Best doorstep bike service in Ghaziabad starting at ₹299. Oil change, engine repair, battery replacement, puncture fix — same-day bike repair across Ghaziabad including Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, and Kaushambi.',
            offers: { '@type': 'Offer', priceCurrency: 'INR', price: '299', availability: 'https://schema.org/InStock' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is the best bike service in Ghaziabad?', acceptedAnswer: { '@type': 'Answer', text: 'Garage Fix Care is the best bike service in Ghaziabad, offering doorstep bike repair starting at ₹299 with certified mechanics, genuine parts, and same-day service across Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, and Kaushambi.' } },
              { '@type': 'Question', name: 'Do you provide doorstep bike repair in Ghaziabad?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Garage Fix Care provides doorstep bike repair in Ghaziabad. Our mechanics come to your home or office for all bike repairs and servicing. Just book online or call us.' } },
              { '@type': 'Question', name: 'How much does bike service cost in Ghaziabad?', acceptedAnswer: { '@type': 'Answer', text: 'Bike service in Ghaziabad with Garage Fix Care starts at just ₹299 for 100–125cc bikes. Prices vary by engine size and service type. All pricing is transparent with no hidden charges.' } },
              { '@type': 'Question', name: 'Which areas in Ghaziabad do you cover for bike service?', acceptedAnswer: { '@type': 'Answer', text: 'We cover all major areas in Ghaziabad including Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, and Kaushambi for doorstep bike service and bike repair.' } },
              { '@type': 'Question', name: 'How quickly can a bike mechanic reach me in Ghaziabad?', acceptedAnswer: { '@type': 'Answer', text: 'Our bike mechanics typically reach your location in Ghaziabad within 2–4 hours. For urgent same-day service, call us and we will prioritise your booking.' } },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' },
              { '@type': 'ListItem', position: 2, name: 'Best Bike Service in Ghaziabad', item: 'https://www.garagefixcare.in/best-bike-service-ghaziabad' },
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
              {/* TOP ZONE — H1 + subheading (Ghaziabad specific) */}
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
                  Best Bike Service in Ghaziabad
                  <span style={{ color: '#FF7A18' }}> — Doorstep Bike Repair ₹299</span>
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
                  Get the most trusted bike service in Ghaziabad right at your doorstep. Whether you live in Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, or Kaushambi, our expert mechanics handle everything from oil change to engine overhaul — no garage queues, no hidden costs.
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
                  {!showInput ? (
                    <button
                      type="button"
                      onClick={() => setShowInput(true)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs sm:px-6 sm:py-3 sm:rounded-xl font-semibold sm:text-base shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:translate-y-0 transition-all duration-300"
                    >
                      Book Service Now
                    </button>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 transition-all duration-500 ease-in-out">
                      <input
                        type="tel"
                        maxLength={10}
                        value={modalPhoneNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setModalPhoneNumber(val);
                        }}
                        placeholder="10-digit mobile number"
                        className="px-3 py-2 rounded-lg text-black text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-[150px] sm:w-[190px]"
                      />
                      <button
                        type="button"
                        onClick={handleHeroQuickBook}
                        className="bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm shadow-lg hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        Confirm Booking
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowInput(false)}
                        className="text-white/70 text-xs sm:text-sm hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
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

        {/* Dark premium information strip — Ghaziabad/global copy */}
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
                Garage Fix Care
              </span>
            </span>
            <p className="relative text-[10px] sm:text-sm leading-[1.4] sm:leading-relaxed" style={{ color: '#cbd5e1' }}>
              Skip the garage queue. Our certified mechanics come to your home or office across Noida, Gurgaon, Delhi and the rest of Delhi NCR — handling everything from routine bike servicing and car oil changes to engine repairs and scooty fixes. Fast, transparent, and affordable.
            </p>
          </div>
        </motion.div>

        {/* Marquee: Service Available cities */}
        <div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
          <div className="flex items-center text-sm sm:text-sm font-semibold max-w-7xl mx-auto">
            <div className="flex-shrink-0 px-2 sm:px-2 pr-2">
              <span className="text-red-600 mr-1 sm:mr-2 font-bold">Service Available </span>
              <span className="text-brandRed font-bold sm:inline"> (10% off)</span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center animate-marquee">
                {[...Array(3)].map((_, repIdx) =>
                  serviceCities.map((city, idx) => (
                    <span
                      key={`${repIdx}-${idx}`}
                      className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm sm:text-sm ${city.color}`}
                    >
                      {city.name}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hot Deals This Week — Ghaziabad specific copy, Delhi Cantt-style marquee */}
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
                Limited-time offer for Ghaziabad customers! Get up to 10% off on bike repairs and servicing at your doorstep. Hurry—these deals won&apos;t last long!
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

        {/* At-Home Service Price List — Ghaziabad pricing (premium vertical service-plan cards) */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">At-Home Service</span> <span className="text-red-600">Price List</span>
              </h2>
              <p className="text-base sm:text-xl text-white mb-10 sm:mb-12 max-w-3xl mx-auto">
                Transparent pricing for doorstep bike service in Ghaziabad. Check the labour charges below based on your bike&apos;s engine size — no hidden fees, no surprises.
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
                const isBestValue = service.title === 'At-Home Premium Service';
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

        {/* Areas Covered — Ghaziabad localities */}
        <section className="py-10 sm:py-14 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              We Cover All Major Areas in <span className="text-red-600">Ghaziabad</span>
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {coveredAreas.map(area => (
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
              Whether you live in Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, or Kaushambi, our bike mechanics reach your doorstep within 2-4 hours. Same-day bike service available across Ghaziabad.
            </motion.p>
          </div>
        </section>

        {/* Bike Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                Complete Bike Care, <span className="text-red-600">Right at Your Door in Ghaziabad</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
                From routine oil changes to full engine repair — our Ghaziabad mechanics handle it all at your location. No waiting, no hassle.
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
                    alt={`${service.name} in Ghaziabad`}
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

        {/* Comprehensive Bike Service Content — Ghaziabad specific, 1000+ words */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Why Garage Fix Care is the <span className="text-red-600">Best Bike Service in Ghaziabad</span>
            </motion.h2>
            <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                Finding a reliable bike service in Ghaziabad can be challenging. Most local garages overcharge, use duplicate parts, or keep your bike for days without a clear timeline. Garage Fix Care changes that entirely. We bring fully certified, background-verified mechanics directly to your home or office in Ghaziabad — whether you live in Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, or Kaushambi. Our doorstep bike service in Ghaziabad saves you time, money, and unnecessary hassle.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                Ghaziabad is one of the fastest-growing cities in the NCR region, with lakhs of two-wheeler commuters navigating busy stretches like NH-9 and NH-58, and densely trafficked inner roads through Raj Nagar, Lal Kuan, Modi Nagar, and GT Road. This demanding environment accelerates engine wear, brake fade, chain stretch, and tyre pressure loss. That is why timely bike repair in Ghaziabad is not optional — it is critical for your safety and the long-term health of your vehicle.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                We service every bike brand popular among Ghaziabad riders — Hero Splendor, Honda Activa, Bajaj Pulsar, TVS Apache, Suzuki Access, Yamaha FZ, Royal Enfield Classic 350, KTM Duke, and many more. Our mechanics carry all necessary tools and genuine spare parts on every visit, handling everything from a routine oil change to complex engine diagnostics and overhauls, all at your doorstep in Ghaziabad. Need a battery swap before your morning commute? A brake pad replacement for weekend riding? Clutch cable adjustment? It gets done on the spot.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                What consistently ranks us as the best bike service in Ghaziabad is our unwavering commitment to transparency. Before any work begins, we provide a written cost estimate — no surprise charges, no pressure upselling, no hidden fees. We use only genuine engine oils from Motul and Wurth, and manufacturer-recommended parts for every brand. Every completed service is backed by a 10-day hassle-free warranty, giving you full peace of mind long after the mechanic has left your driveway.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                Ghaziabad&apos;s dust, pollution, and summer heat also accelerate air filter clogging and coolant depletion, both of which directly impact fuel efficiency and engine longevity. Our mechanics perform a thorough 18-point inspection during each service visit — covering engine oil level, brake pads, chain tension, electrical connections, tyre air pressure, spark plug condition, coolant level, and more. Nothing gets skipped, and you receive a full report of work done.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                We have completed over 1,00,000 successful bike services across Ghaziabad, Delhi, Noida, and Gurugram. Our customer satisfaction rate exceeds 98%, reflected in our 4.7-star average ratings on Google, Facebook, and JustDial. For scooty owners in Ghaziabad, we provide complete service for Honda Activa, TVS Jupiter, Suzuki Access, Honda Dio, and Hero Pleasure — including tyre puncture repair, chain lubrication, air filter replacement, and battery testing, all done at your door.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                We also offer emergency roadside assistance across Ghaziabad. If your bike breaks down on a highway or in a residential colony at an inconvenient hour, call us and we dispatch a mechanic immediately. From puncture repair to electrical fault diagnosis, our team keeps you moving.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                Choose Garage Fix Care for affordable, reliable, and the best doorstep bike service in Ghaziabad. Book your appointment today and discover why over one lakh customers trust us with their bikes.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Warranty / Benefits Section */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <p className="text-xs sm:text-sm font-semibold text-orange-400 uppercase tracking-wide mb-1">
                Get Rs.10 Off On First Service in Ghaziabad
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                GarageFixCare <span className="text-red-600">Service Warranty</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                Ghaziabad&apos;s trusted doorstep bike service. We service all motorcycle and scooter brands — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right at your home or office.
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
                { img: warrantyImg, title: 'Enjoy a 10-Day Free Service Guarantee', desc: '10-Day Hassle-Free Warranty' },
                { img: pickupImg, title: 'Enjoy Free Pickup and Drop at Your Convenience', desc: 'Free Pick & Drop Available' },
                { img: transparentImg, title: 'Transparent Pricing, Competitive Rate', desc: 'Save up to 30% on your bike service' },
                { img: trainedImg, title: 'Skilled and Certified Mechanics', desc: 'Exclusively Certified Two-Wheeler Mechanics' },
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
              <img src={whyChooseImg} alt="Why Choose GarageFixCare in Ghaziabad" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div className="order-1 lg:order-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Why Choose <span className="text-red-600">GarageFixCare?</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                We bring certified mechanics directly to Ghaziabad residents — honest pricing, genuine parts, zero hassle.
              </p>
              <motion.ul
                className="space-y-2 text-left"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {['Hassle-Free Doorstep Service', 'Certified and Skilled Technicians', 'Honest Pricing', 'Certified Genuine Parts', 'Your Satisfaction Guaranteed', 'Fast and Professional Service'].map(item => (
                  <motion.li key={item} variants={staggerItem} className="flex items-center text-gray-200 text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </motion.li>
                ))}
              </motion.ul>
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
              Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Customers</span>
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

        {/* How GarageFixCare Works */}
        <section className="bg-slate-800 text-white py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                How <span className="text-red-600">GarageFixCare</span> Works?
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                Getting your bike serviced in Ghaziabad is simple. Book online or call us, and a skilled mechanic arrives at your doorstep with everything needed to get your bike running at its best — all done on the spot.
              </p>
              <motion.ul
                className="space-y-2 text-left"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {['Schedule Your Service', 'Technician Sent to You', 'Service Done on the Spot', 'Clear and Transparent Communication', 'Guaranteed Quality Service', 'Easy Payment & Feedback'].map(item => (
                  <motion.li key={item} variants={staggerItem} className="flex items-center text-white text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div className="flex justify-center" variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <img src={bmw310Image} alt="How GarageFixCare Works in Ghaziabad" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
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

        {/* Customer Testimonials */}
        <section className="bg-slate-800 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                What <span className="text-red-600">Customers Say</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base mt-1">Customer Testimonials on Google</p>
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
                Review us on Google
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
                { name: 'Surendra Singh', img: testimonial1, text: 'Excellent experience with GarageFixCare. Professional and knowledgeable.', time: 'a month ago' },
                { name: 'Dharmendra Gupta', img: testimonial2, text: 'Transparent service with video evidence. Highly reliable.', time: 'a month ago' },
                { name: 'Rohit Prasad', img: testimonial3, text: 'Great doorstep service, convenient and affordable.', time: 'a month ago' },
                { name: 'Prabhjeet Sharma', img: testimonial4, text: 'Quick response, professional mechanic. Will recommend.', time: 'a month ago' },
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

        {/* FAQs — Bike Service Ghaziabad */}
        <section className="bg-slate-900 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-2"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Frequently Asked Questions — <span className="text-red-600">Bike Service in Ghaziabad</span>
            </motion.h2>
            <motion.p
              className="text-center text-gray-400 mb-6 text-sm sm:text-base"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Everything you need to know about bike repair and bike service in Ghaziabad with Garage Fix Care.
            </motion.p>
            <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              {[
                { q: 'What is the best bike service in Ghaziabad?', a: 'Garage Fix Care is the best bike service in Ghaziabad, offering doorstep bike repair starting at ₹299 with certified mechanics, genuine parts, and same-day service across Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, Kaushambi, and all major areas of Ghaziabad.' },
                { q: 'How do I book a bike service in Ghaziabad?', a: 'Booking a bike service in Ghaziabad with Garage Fix Care is simple. Call us, WhatsApp us, or use the booking form on this page. Share your Ghaziabad address and preferred time slot, and a trained mechanic will arrive at your doorstep.' },
                { q: 'What is the cost of bike service in Ghaziabad?', a: 'Bike service in Ghaziabad with Garage Fix Care starts at just ₹299 for 100–125cc bikes. Classic bikes (135–200cc) start at ₹399, premium bikes (220–300cc) at ₹499, and Royal Enfield and higher CC bikes from ₹599. Pricing is fully transparent with no hidden charges.' },
                { q: 'Do you provide doorstep bike repair in Ghaziabad?', a: 'Yes, Garage Fix Care specialises in doorstep bike repair in Ghaziabad. Our mechanics come to your home or office fully equipped with tools, oils, and parts. No need to visit any garage.' },
                { q: 'Which areas in Ghaziabad do you cover for bike service?', a: 'We cover all major localities in Ghaziabad including Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, Vasundhara, Kaushambi, Lal Kuan, Modi Nagar, Mohan Nagar, Raj Nagar, and surrounding areas.' },
                { q: 'How quickly can a mechanic reach me in Ghaziabad?', a: 'Our bike mechanics typically reach your Ghaziabad location within 2–4 hours. For urgent same-day bike repair in Ghaziabad, call us and we will prioritise your booking.' },
                { q: 'Do you service Royal Enfield bikes in Ghaziabad?', a: 'Absolutely. We specialise in Royal Enfield servicing in Ghaziabad, including Classic 350, Bullet 350, Meteor, Himalayan, and Hunter 350. All services use genuine parts and oils.' },
                { q: 'Do you repair scooties in Ghaziabad?', a: 'Yes, we provide complete scooty repair and service in Ghaziabad for Honda Activa, TVS Jupiter, Suzuki Access, Hero Pleasure, and Honda Dio. All repairs are done at your doorstep in Ghaziabad.' },
                { q: 'Is your bike service pricing transparent in Ghaziabad?', a: 'Yes, we provide a written estimate before work begins on any bike in Ghaziabad. You will never be surprised by hidden charges or unexplained costs.' },
                { q: 'Do you offer a service warranty for bike repair in Ghaziabad?', a: 'Every bike service and repair in Ghaziabad comes with a 10-day hassle-free service guarantee. If the same issue recurs within 10 days, we will fix it at no extra cost.' },
                { q: 'Are your bike mechanics certified in Ghaziabad?', a: 'Yes, all our bike mechanics serving Ghaziabad are trained, certified, background-verified professionals. They follow safety protocols and use genuine parts on every visit.' },
                { q: 'What payment methods do you accept for bike service in Ghaziabad?', a: 'We accept cash, UPI (Google Pay, PhonePe, Paytm), and other mobile wallets for bike service payments in Ghaziabad.' },
                { q: 'Do I need to provide tools for the mechanic in Ghaziabad?', a: 'No, our mechanics arrive at your Ghaziabad location fully equipped with all necessary tools, engine oils, and spare parts. Just share your address and we handle the rest.' },
                { q: 'Can I book bike service for multiple bikes in Ghaziabad?', a: 'Yes, you can book service for multiple bikes in Ghaziabad at the same time. Just mention the number of vehicles while booking and we will arrange accordingly.' },
                { q: 'What makes GarageFixCare the best bike service in Ghaziabad compared to local garages?', a: 'Unlike traditional Ghaziabad garages, GarageFixCare comes to you, offers transparent pricing, uses genuine parts, employs trained mechanics, and backs every job with a 10-day warranty — saving you time, travel, and money.' },
              ].map((faq, idx) => (
                <motion.div key={idx} variants={staggerItem} className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/40">
                  <button
                    className="flex justify-between items-center w-full p-3 sm:p-4 text-left font-semibold text-white hover:bg-slate-700/60 transition-colors duration-200"
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  >
                    <span className="flex items-start">
                      <span className="text-red-600 mr-2">Q{idx + 1}.</span>
                      <span className="text-sm sm:text-base">{faq.q}</span>
                    </span>
                    {activeIndex === idx ? <X className="h-5 w-5 flex-shrink-0 ml-2" /> : <Plus className="h-5 w-5 flex-shrink-0 ml-2" />}
                  </button>
                  {activeIndex === idx && (
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
              Book Bike Service in Ghaziabad Today
            </h2>
            <p className="text-sm sm:text-base text-white mb-3 sm:mb-5 max-w-xl mx-auto">
              Same-day doorstep service starting at ₹299. Our mechanic comes to you — no travel, no waiting, no hidden charges.
            </p>
            <Link
              to="/book"
              className="bg-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:translate-y-0 transition-all duration-200 inline-block"
            >
              Book Your Service
            </Link>
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
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-sm sm:max-w-md flex flex-col">
            <div className="p-4 border-b flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black">{selectedService.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{selectedService.subtitle}</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-900">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Full Checklist:</h4>
              <ul className="list-none space-y-2 text-left text-gray-700 text-xs sm:text-sm">
                {selectedService.checklist.map((item, i) => (
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
                  placeholder="Enter 10-digit Phone Number*"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={modalPhoneNumber}
                  onChange={(e) => setModalPhoneNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
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
                onClick={handleModalBookNow}
                className="bg-brandRed text-white w-full py-3 rounded-xl font-semibold shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestBikeServiceGhaziabad;

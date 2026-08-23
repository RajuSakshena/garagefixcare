// Home.tsx (FULL UPDATED CODE - navigation added for Cars button using useNavigate)
import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Star,
  Flame,
  X,
  Plus,
  Phone,
  ChevronDown,
  MapPin,
  Bike,
  Car,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios'; // Used for the quick-book API calls

// react-slick removed — using a custom lightweight carousel instead
import { FaWhatsapp } from 'react-icons/fa';


//last section 
// Import your local images
import hotDealsImage1 from '../images/hotdeals1.png';
import hotDealsImage2 from '../images/hotdeals2.png';
import hotDealsImage3 from '../images/hotdeals3.png';
import hotDealsImage4 from '../images/hotdeals4.png';
import hotDealsImage5 from '../images/hotdeals5.png';
import mechanicImage from '../images/image.jpg';
import routineService from "../images/Routine Service.png";
import bikeInsurance from "../images/Bike Insurance.png";
import doorstepService from "../images/Doorstep Service.png";
import wheelCare from "../images/Wheel Care.png";
import bikeBatteries from "../images/Bike Battery.png";
import engineRepair from "../images/Engine Repair.png";
import warrantyImg from "../images/warranty.webp";
import pickupImg from "../images/free pickup.webp";
import transparentImg from "../images/transparent.webp";
import trainedImg from "../images/trainie.webp";
import whyChooseImg from "../images/whychoose.png";
import wurthImg from "../images/WURTH.png";
import motulImg from "../images/Motul.jpeg";
import turtlemintImg from "../images/Turtlemint.png";
import buniyadImg from "../images/Buniyad.png";
import dunzoImg from "../images/Dunzo.png";
import bmw310Image from "../images/bmw310.png";
import delhiImg from "../images/Delhi.jpeg";
import noidaImg from "../images/Noida.jpg";
import greaterNoidaImg from "../images/Greater-Noida.jpg";
import gurugramImg from "../images/Gurugram.jpeg";
import faridabadImg from "../images/Faridabad.jpeg";
import ghaziabadImg from "../images/Ghaziabad.jpeg";
import googleIcon from "../images/Testimonial1.png";
import testimonial1 from "../images/Testimonial1.jpeg";
import testimonial2 from "../images/Testimonial2.jpeg";
import testimonial3 from "../images/Testimonial3.jpeg";
import testimonial4 from "../images/Testimonial4.jpeg";
import maintainGearboxImg from "../images/Maintain-Gearbox1.webp";
import fourValveEngineImg from "../images/Four-valves.webp";
import driveBeltScootyImg from "../images/Drive-belt.webp";
import insideVideo from "../images/inside.mp4";
import outsideVideo from "../images/outside.mp4";

// Interface for clean type-checking (required for the new logic)
interface Service {
  title: string;
  subtitle: string;
  checklist: string[];
}

// ==================================================
// Reusable Framer Motion variants (scroll + entrance)
// ==================================================
// Simple opacity + upward slide — used for headings and standalone blocks.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// Plain opacity fade — used where movement would be distracting.
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// Very subtle scale-in — used for large images/banners so they feel alive without a big parallax jump.
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// Wrap around a grid/row of cards; staggers each staggerItem child as the section enters view.
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Individual card/item entrance used inside a staggerContainer.
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Shared viewport setting: animate once, a little before the section is fully in view.
const viewportOnce = { once: true, amount: 0.15 };

// Hero-only stagger variants: smaller vertical travel + faster stagger so the
// mobile hero content settles in quickly without ever overflowing the fixed-height hero.
const heroStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const heroStaggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const Home = () => {
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Respect prefers-reduced-motion: used to disable/soften continuous motion (video zoom, light sweep, marquees)
  const prefersReducedMotion = useReducedMotion();

  // Subtle top-of-page scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scrollProgressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  

  // NEW Modal State for API booking
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState(''); // State for phone input in modal

  const [selectedVehicle, setSelectedVehicle] = useState('Bike');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Hero background video sequence: inside.mp4 -> outside.mp4 -> inside.mp4 -> ... (loops forever)
  // Two persistent <video> elements are used (never unmounted/recreated). One is the
  // active/visible clip, the other silently preloads the next clip in the background.
  // When the active clip nears its end AND the other element reports it is sufficiently
  // buffered (readyState >= 3 / HAVE_FUTURE_DATA), we start playback on the preloaded
  // element and crossfade its opacity in — never a hard cut, never a blank/poster frame.
  const heroVideoSources = [insideVideo, outsideVideo]; // 0 = inside, 1 = outside — fixed order, never randomized
  const heroVideoSlot0Ref = useRef<HTMLVideoElement | null>(null);
  const heroVideoSlot1Ref = useRef<HTMLVideoElement | null>(null);
  const heroVideoRefs = [heroVideoSlot0Ref, heroVideoSlot1Ref] as const;
  const [activeHeroSlot, setActiveHeroSlot] = useState<0 | 1>(0);
  const heroSequencePosRef = useRef(0); // heroVideoSources index currently assigned to the active slot
  const heroTransitioningRef = useRef(false);

  const HERO_CROSSFADE_SECONDS = prefersReducedMotion ? 0 : 0.65;
  const HERO_TRANSITION_LEAD_SECONDS = 0.6; // start the handoff shortly before the active clip ends

  // Kick off the sequence once: slot 0 plays inside.mp4, slot 1 silently preloads outside.mp4.
  useEffect(() => {
    const slot0 = heroVideoRefs[0].current;
    const slot1 = heroVideoRefs[1].current;
    if (!slot0 || !slot1) return;

    slot0.src = heroVideoSources[0];
    slot0.load();
    slot0.play().catch(() => {
      // Autoplay can be blocked in some browser contexts; safe to ignore.
    });

    slot1.src = heroVideoSources[1];
    slot1.load(); // preload only — stays paused and hidden until it's its turn

    heroSequencePosRef.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hands playback over from `fromSlot` to the other slot, provided the other slot is
  // sufficiently buffered. If it isn't ready yet, this is a no-op and will be retried.
  const attemptHeroTransition = (fromSlot: 0 | 1) => {
    if (heroTransitioningRef.current) return;
    const toSlot: 0 | 1 = fromSlot === 0 ? 1 : 0;
    const nextEl = heroVideoRefs[toSlot].current;
    if (!nextEl || nextEl.readyState < 3) return; // not buffered enough yet — keep waiting, no blank screen

    heroTransitioningRef.current = true;

    const nextLogicalIndex = (heroSequencePosRef.current + 1) % heroVideoSources.length;

    nextEl.currentTime = 0;
    const playPromise = nextEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    setActiveHeroSlot(toSlot);
    heroSequencePosRef.current = nextLogicalIndex;

    // Once the crossfade has finished, quietly preload the *following* clip into the
    // slot that just became inactive, well ahead of when it will be needed again.
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

  // Begin the handoff slightly before the active clip actually ends, so the crossfade
  // has time to play out and the next clip is already moving by the time this one stops.
  const handleHeroTimeUpdate = (slot: 0 | 1) => () => {
    if (activeHeroSlot !== slot || heroTransitioningRef.current) return;
    const el = heroVideoRefs[slot].current;
    if (!el || !el.duration || Number.isNaN(el.duration)) return;
    if (el.duration - el.currentTime <= HERO_TRANSITION_LEAD_SECONDS) {
      attemptHeroTransition(slot);
    }
  };

  // Safety net: if the active clip reaches its end before the next one was ready, hold
  // on its final moment (replaying it) instead of showing a blank frame, and keep
  // retrying the handoff until the next clip is finally buffered.
  const handleHeroEnded = (slot: 0 | 1) => () => {
    if (activeHeroSlot !== slot || heroTransitioningRef.current) return;
    const el = heroVideoRefs[slot].current;
    if (!el) return;
    el.currentTime = Math.max(0, el.duration - 1);
    el.play().catch(() => {});
    attemptHeroTransition(slot);
  };

  // Marquee deals images (continuous scroll, no index needed)
  const carouselImages = [
    { src: hotDealsImage1, alt: "Hot deal offer 1 - bike service in Noida" },
    { src: hotDealsImage2, alt: "Hot deal offer 2 - bike service in Noida" },
    { src: hotDealsImage3, alt: "Hot deal offer 3 - bike service in Noida" },
    { src: hotDealsImage4, alt: "Hot deal offer 4 - bike service in Noida" },
    { src: hotDealsImage5, alt: "Hot deal offer 5 - bike service in Noida" },
  ];

  // NEW: useNavigate hook for SPA navigation to Car page
  const navigate = useNavigate();

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
    {
      title: "At-Home Regular Service",
      subtitle: "100 CC, 110 CC, 125 CC.",
      originalPrice: "Rs. 599",
      discountedPrice: "Rs. 299",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Classic Service",
      subtitle: "135 CC, 160 CC, 200 CC.",
      originalPrice: "Rs. 799",
      discountedPrice: "Rs. 399",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Premium Service",
      subtitle: "220 CC, 250 CC, 300 CC.",
      originalPrice: "Rs. 1,199",
      discountedPrice: "Rs. 499",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Royal Service",
      subtitle: "350 CC, 400 CC, 450 CC.",
      originalPrice: "Rs. 1,599",
      discountedPrice: "Rs. 599",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    },
    {
      title: "At-Home Sports Service",
      subtitle: "Above 500, 600 CC, 650 CC.",
      originalPrice: "Rs. 2,199",
      discountedPrice: "Rs. 999",
      features: ["Engine Oil Change", "Oil Filter Clean", "Air Filter Clean", "Spark Plug Clean"]
    }
  ];

  const checklistItems = [
    "Coolant check-up",
    "Basic Hand Cleaning",
    "Oiling and greasing",
    "Battery General check-up",
    "Basic Engine Inspection",
    "Basic Fork Inspection",
    "Carburettor Basic check-up",
    "Minor Electrical check-up",
    "Brakes – Front & Rear Adjust",
    "Driven Chain Basic Cleaning",
    "Tightening of Screws Bolts & Nuts",
    "Average and Performance check-up",
    "Engine Oil Change (Price Extra)",
    "Oil Filter Clean (If Replace Charges)",
    "Air Filter Clean (If Replace Charges)",
    "Spark Plug Clean (If Replace Charges)",
    "Tyre Air Fill (only tubeless)",
    "Free Pick and Drop (if needed)"
  ];

  const bikeBrands = [
    "Hero",
    "Honda",
    "TVS",
    "Bajaj",
    "Suzuki",
    "Yamaha",
    "Kawasaki",
    "Royal Enfield",
    "KTM",
    "BMW",
    "Harley Davidson",
    "Ducati",
    "Triumph",
    "Indian",
    "Vespa",
    "Benelli",
    "Aprilia",
    "Yezdi",
    "Husqvarna",
    "Other"
  ];

  const scootyBrands = [
    "Honda",
    "TVS",
    "Hero",
    "Suzuki",
    "Yamaha",
    "Ather",
    "Ola Electric",
    "Bajaj",
    "Vespa",
    "Aprilia",
    "Other"
  ];

  // Brands We Service marquee — built from the existing bikeBrands/scootyBrands arrays,
  // with a few extra recognizable two-wheeler brands added and duplicates/"Other" removed.
  const marqueeBrands = Array.from(
    new Set([
      ...bikeBrands,
      ...scootyBrands,
      "Jawa",
      "Bajaj Chetak",
      "Vida",
      "Okinawa",
      "Ampere",
      "Revolt",
    ])
  ).filter(brand => brand !== "Other");

  // Split into two rows for the opposite-direction marquee (row 1 moves right→left, row 2 moves left→right)
  const marqueeBrandsRow1 = marqueeBrands.filter((_, i) => i % 2 === 0);
  const marqueeBrandsRow2 = marqueeBrands.filter((_, i) => i % 2 !== 0);

  // --- UPDATED HANDLERS ---
  
  // 1. Function to open the modal (Now uses selectedService state)
  const handleSeeChecklist = (title: string, subtitle: string) => {
    // OLD: setModalServiceTitle(title); setModalServiceSubtitle(subtitle);
    
    // NEW: Combine service details with the full checklist and save it
    setSelectedService({ title, subtitle, checklist: checklistItems }); 
    setModalPhoneNumber(''); // Clear phone number whenever a new modal opens
    setIsModalOpen(true); // OLD: setIsModalOpen(true);
  };

  // 2. Function to close the modal (remains mostly the same, clears new state too)
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setModalPhoneNumber('');
  };

  // 3. NEW: Function to handle the final submission (Called by the modal's "Book Now" button)
  const handleModalBookNow = async () => {
    if (!modalPhoneNumber || modalPhoneNumber.length !== 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    if (!selectedService) return; // Safety check

    try {
        const serviceType = `${selectedService.title} (${selectedService.subtitle})`;
        
        // API call to the new dedicated quick-book endpoint
        await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, { 
            phoneNumber: modalPhoneNumber,
            serviceType: serviceType
        });
        
        // Success Pop-up (as requested)
        alert('Thanks for booking! We have received your request and will contact you in 5 minutes.');
        
        // Close modal and reset state
        closeModal();
        
    } catch (error) {
        alert('Booking failed. Please try again.');
        console.error('Error booking service:', error);
    }
  };
  
  // --- END OF UPDATED HANDLERS ---


  const [showInput, setShowInput] = useState(false);
  // Location authority accordions (Delhi / Noida / Greater Noida / Gurgaon / Ghaziabad / Faridabad)
  // Only one open at a time, collapsed by default so the homepage stays clean and scannable.
  const [openAreaAccordion, setOpenAreaAccordion] = useState<string | null>(null);
  const toggleAreaAccordion = (city: string) =>
    setOpenAreaAccordion((prev) => (prev === city ? null : city));

  // Popular Pages accordion — collapsed by default for UI cleanliness.
  // All links stay rendered in the initial HTML for SEO/crawlability; only the
  // visual height is collapsed via CSS, so nothing is lazy-rendered or removed.
  const [isPopularPagesOpen, setIsPopularPagesOpen] = useState(false);

  // Primary Delhi NCR cities — each links to its existing dedicated landing page.
  // Internal links only, so Noida's existing rankings/internal linking are untouched
  // and are in fact reinforced by extra contextual internal links below.
  const ncrServiceAreas = [
    { name: "Noida", bikeTo: "/best-bike-service-noida", carTo: "/best-car-service-noida" },
    { name: "Delhi", bikeTo: "/best-bike-service-delhi", carTo: "/best-car-service-delhi" },
    { name: "New Delhi", bikeTo: "/best-bike-service-new-delhi", carTo: "/best-car-service-delhi" },
    { name: "Greater Noida", bikeTo: "/best-bike-service-greater-noida-west", carTo: "/best-car-service-noida" },
    { name: "Gurgaon / Gurugram", bikeTo: "/best-bike-service-gurgaon", carTo: "/best-car-service-gurgaon" },
    { name: "Ghaziabad", bikeTo: "/best-bike-service-ghaziabad", carTo: "/best-car-service-ghaziabad" },
    // NOTE: add/verify these two routes in the router — see chat notes.
    { name: "Faridabad", bikeTo: "/best-bike-service-faridabad", carTo: "/best-car-service-faridabad" },
  ];

  // Locality-level location tags, grouped by city, for the "Explore All Service Areas"
  // accordions. A locality links to its own dedicated landing page ONLY when one is
  // confirmed to exist (see the *_DEDICATED maps below). Every other locality is shown
  // as a plain (non-clickable) location chip — this keeps the hub topically comprehensive
  // for Delhi NCR without ever generating a broken or fake URL. Each accordion also carries
  // one clear "hub" link so users can always reach a real bike/car service page for that city.
  interface LocalityArea { name: string; to?: string }
  interface AreaGroup {
    key: string;
    title: string;
    hub: { bikeTo: string; carTo: string };
    areas: LocalityArea[];
  }

  // Confirmed dedicated landing pages — only these get a real link.
  const DELHI_DEDICATED: Record<string, string> = {
    "Connaught Place": "/best-bike-service-connaught-place",
    "Karol Bagh": "/best-bike-service-karol-bagh",
    "Dwarka": "/best-bike-service-dwarka",
    "Rajouri Garden": "/best-bike-service-rajouri-garden",
    "Uttam Nagar": "/best-bike-service-uttam-nagar",
    "Pitampura": "/best-bike-service-pitampura",
    "Rohini": "/best-bike-service-rohini",
    "Vasant Kunj": "/best-bike-service-vasant-kunj",
    "Greater Kailash": "/best-bike-service-greater-kailash",
    "Lajpat Nagar": "/best-bike-service-lajpat-nagar",
    "Defence Colony": "/best-bike-service-defence-colony",
    "Hauz Khas": "/best-bike-service-hauz-khas",
    "Saket": "/best-bike-service-saket",
    "Nehru Place": "/best-bike-service-nehru-place",
    "Chanakyapuri": "/best-bike-service-chanakyapuri",
    "Paharganj": "/best-bike-service-paharganj",
    "Palam": "/best-bike-service-palam",
    "Delhi Cantt": "/best-bike-service-delhi-cantt",
    "New Delhi": "/best-bike-service-new-delhi",
  };
  const GURGAON_DEDICATED: Record<string, string> = {
    "Udyog Vihar": "/best-bike-service-udyog-vihar",
    "Sushant Lok 1": "/best-bike-service-sushant-lok-phase-1",
    "Sector 56": "/best-bike-service-sector-56-gurugram",
    "Sikanderpur Ghosi": "/best-bike-service-sikanderpur-ghosi",
  };
  const GHAZIABAD_DEDICATED: Record<string, string> = {
    "Indirapuram": "/best-bike-service-indirapuram",
    "Vaishali": "/best-bike-service-vaishali",
  };
  const GREATER_NOIDA_DEDICATED: Record<string, string> = {
    "Greater Noida West": "/best-bike-service-greater-noida-west",
    "West Greater Noida": "/best-bike-service-greater-noida-west",
  };

  const buildAreas = (names: string[], dedicated: Record<string, string> = {}): LocalityArea[] =>
    names.map((name) => ({ name, to: dedicated[name] }));

  const areaGroups: AreaGroup[] = [
    {
      key: "delhi",
      title: "Delhi Areas",
      hub: { bikeTo: "/best-bike-service-delhi", carTo: "/best-car-service-delhi" },
      areas: buildAreas([
        "Connaught Place", "Karol Bagh", "Janakpuri", "Dwarka", "Palam", "Rajouri Garden",
        "Tilak Nagar", "Hari Nagar", "Uttam Nagar", "Mayapuri", "Naraina", "Patel Nagar",
        "Kirti Nagar", "Punjabi Bagh", "Paschim Vihar", "Peeragarhi", "Pitampura", "Rohini",
        "Shalimar Bagh", "Ashok Vihar", "Civil Lines", "Model Town", "Mukherjee Nagar",
        "Burari", "Narela", "Bawana", "Najafgarh", "Mahipalpur", "IGI Airport", "Aerocity",
        "Chanakyapuri", "RK Puram", "Vasant Kunj", "Vasant Vihar", "Greater Kailash",
        "Lajpat Nagar", "Defence Colony", "Green Park", "AIIMS", "INA", "Saket",
        "Malviya Nagar", "Hauz Khas", "Mehrauli", "Chattarpur", "Kalkaji", "Govindpuri",
        "Nehru Place", "Okhla", "Jasola", "Sarita Vihar", "Badarpur", "Laxmi Nagar",
        "Preet Vihar", "Mayur Vihar", "IP Extension", "Anand Vihar", "Shahdara",
        "Dilshad Garden", "Krishna Nagar", "Geeta Colony", "Seelampur", "Yamuna Vihar",
        "New Delhi", "Paharganj", "Delhi Cantt",
      ], DELHI_DEDICATED),
    },
    {
      key: "noida",
      title: "Noida Areas",
      hub: { bikeTo: "/best-bike-service-noida", carTo: "/best-car-service-noida" },
      areas: buildAreas([
        "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6", "Sector 7",
        "Sector 8", "Sector 9", "Sector 10", "Sector 11", "Sector 12", "Sector 15",
        "Sector 16", "Sector 18", "Sector 19", "Sector 22", "Sector 27", "Sector 29",
        "Sector 31", "Sector 34", "Sector 37", "Sector 41", "Sector 44", "Sector 45",
        "Sector 46", "Sector 47", "Sector 49", "Sector 50", "Sector 51", "Sector 52",
        "Sector 55", "Sector 56", "Sector 57", "Sector 61", "Sector 62", "Sector 63",
        "Sector 71", "Sector 72", "Sector 73", "Sector 74", "Sector 75", "Sector 76",
        "Sector 77", "Sector 78", "Sector 79", "Sector 82", "Sector 93", "Sector 100",
        "Sector 104", "Sector 105", "Sector 107", "Sector 110", "Sector 117", "Sector 119",
        "Sector 121", "Sector 122", "Sector 128", "Sector 132", "Sector 135", "Sector 137",
        "Sector 142", "Sector 143", "Sector 144", "Sector 150",
      ]),
    },
    {
      key: "greater-noida",
      title: "Greater Noida Areas",
      hub: { bikeTo: "/best-bike-service-greater-noida-west", carTo: "/best-car-service-noida" },
      areas: buildAreas([
        "Pari Chowk", "Alpha 1", "Alpha 2", "Beta 1", "Beta 2", "Gamma 1", "Gamma 2",
        "Delta 1", "Delta 2", "Omicron 1", "Omicron 2", "Sigma 1", "Sigma 2", "Sigma 3",
        "Chi 1", "Chi 2", "Pi 1", "Pi 2", "Knowledge Park 1", "Knowledge Park 2",
        "Knowledge Park 3", "Knowledge Park 4", "Jagat Farm", "Surajpur", "Kasna",
        "Ecotech", "Techzone", "West Greater Noida", "Gaur City", "Noida Extension",
      ], GREATER_NOIDA_DEDICATED),
    },
    {
      key: "gurgaon",
      title: "Gurgaon / Gurugram Areas",
      hub: { bikeTo: "/best-bike-service-gurgaon", carTo: "/best-car-service-gurgaon" },
      areas: buildAreas([
        "Sector 4", "Sector 5", "Sector 7", "Sector 9", "Sector 10", "Sector 12",
        "Sector 14", "Sector 15", "Sector 17", "Sector 21", "Sector 22", "Sector 23",
        "Sector 24", "Sector 25", "Sector 27", "Sector 28", "Sector 29", "Sector 30",
        "Sector 31", "Sector 38", "Sector 39", "Sector 40", "Sector 43", "Sector 45",
        "Sector 46", "Sector 47", "Sector 48", "Sector 49", "Sector 50", "Sector 51",
        "Sector 52", "Sector 54", "Sector 55", "Sector 56", "Sector 57", "Sector 58",
        "Sector 65", "Sector 67", "Sector 69", "Sector 70", "DLF Phase 1", "DLF Phase 2",
        "DLF Phase 3", "DLF Phase 4", "DLF Phase 5", "Sushant Lok 1", "Sushant Lok 2",
        "Golf Course Road", "Golf Course Extension Road", "MG Road", "Cyber City",
        "Udyog Vihar", "Sohna Road", "Palam Vihar", "New Colony", "South City 1",
        "South City 2", "Nirvana Country", "Sikanderpur Ghosi",
      ], GURGAON_DEDICATED),
    },
    {
      key: "ghaziabad",
      title: "Ghaziabad Areas",
      hub: { bikeTo: "/best-bike-service-ghaziabad", carTo: "/best-car-service-ghaziabad" },
      areas: buildAreas([
        "Indirapuram", "Vaishali", "Vasundhara", "Kaushambi", "Raj Nagar",
        "Raj Nagar Extension", "Crossings Republik", "Sahibabad", "Mohan Nagar",
        "Shalimar Garden", "Nehru Nagar", "Govindpuram", "Kavi Nagar", "Patel Nagar",
        "Loni", "Wave City", "Vijay Nagar", "Modinagar", "Muradnagar",
      ], GHAZIABAD_DEDICATED),
    },
    {
      key: "faridabad",
      title: "Faridabad Areas",
      hub: { bikeTo: "/best-bike-service-faridabad", carTo: "/best-car-service-faridabad" },
      areas: buildAreas([
        "NIT Faridabad", "Old Faridabad", "Ballabhgarh", "Greenfield Colony", "Sector 3",
        "Sector 7", "Sector 9", "Sector 10", "Sector 11", "Sector 14", "Sector 15",
        "Sector 16", "Sector 17", "Sector 19", "Sector 21", "Sector 22", "Sector 23",
        "Sector 28", "Sector 29", "Sector 31", "Sector 35", "Sector 37", "Sector 46",
        "Sector 49", "Sector 55", "Sector 75", "Sector 76", "Sector 77", "Sector 81",
        "Sector 82", "Sector 85", "Sector 86", "Sector 87", "Sector 88", "Sector 89",
      ]),
    },
  ];


const serviceCities = [
    { name: "Noida", color: "text-red-700" },
    { name: "Greater Noida", color: "text-teal-700" },
    { name: "Ghaziabad", color: "text-gray-900" },
    { name: "Delhi", color: "text-slate-700" },
    { name: "Gurugram", color: "text-indigo-700" },
    { name: "Faridabad", color: "text-orange-700" },
];
  return (
    <>
     <SEOHelmet
  title=" Doorstep Bike & Car Service in Noida, Gurgaon & Delhi NCR | ₹299 Onwards"
  description="Doorstep bike & car service across Noida, Delhi, Gurgaon, Ghaziabad, Greater Noida & Faridabad — Delhi NCR. Same-Day Service, Trusted Mechanics, from just ₹299."
  keywords="bike service near me, bike repair near me, doorstep mechanic, doorstep bike service delhi ncr, bike service noida, bike repair noida, bike service delhi, bike repair delhi, bike service gurgaon, bike repair gurgaon, mechanic near me gurgaon, bike service ghaziabad, bike service faridabad, bike service greater noida, car service noida, car service delhi, car service gurgaon, car service ghaziabad, same day bike service, doorstep service delhi ncr, trusted mechanics delhi ncr, garage fix care"
  canonical="https://www.garagefixcare.in/"
  robots="index, follow"
  og={{
    url: "https://www.garagefixcare.in/",
    image: "https://www.garagefixcare.in/og-banner.png",
    imageAlt: "Doorstep bike & car service across Noida, Gurgaon and Delhi NCR by Garage Fix Care",
    type: "website",
  }}
  twitter={{
    image: "https://www.garagefixcare.in/og-banner.png",
    imageAlt: "Doorstep bike and car service across Delhi NCR",
  }}
  structuredData={[
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Garage Fix Care",
      "description": "Doorstep bike and car service across Delhi NCR — Noida, Greater Noida, Delhi, New Delhi, Gurgaon, Ghaziabad and Faridabad — starting at ₹299. Same-day repair, oil change, battery & engine service by certified mechanics.",
      "url": "https://www.garagefixcare.in",
      "telephone": "+919540553759",
      "priceRange": "₹₹",
      "image": "https://www.garagefixcare.in/og-banner.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.5355",
        "longitude": "77.3910"
      },
      "areaServed": [
        { "@type": "City", "name": "Noida" },
        { "@type": "City", "name": "Greater Noida" },
        { "@type": "City", "name": "Ghaziabad" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "New Delhi" },
        { "@type": "City", "name": "Gurgaon" },
        { "@type": "City", "name": "Gurugram" },
        { "@type": "City", "name": "Faridabad" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" }
      ],
      "serviceType": ["Bike Repair", "Car Repair", "Doorstep Bike Service", "Doorstep Car Service"],
      "openingHours": "Mo-Su 08:00-20:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "100000"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Doorstep Bike & Car Service in Noida & Delhi NCR",
      "provider": { "@type": "LocalBusiness", "name": "Garage Fix Care" },
      "areaServed": [
        { "@type": "City", "name": "Noida" },
        { "@type": "City", "name": "Greater Noida" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "New Delhi" },
        { "@type": "City", "name": "Gurgaon" },
        { "@type": "City", "name": "Ghaziabad" },
        { "@type": "City", "name": "Faridabad" }
      ],
      "description": "At-home bike and car servicing across Noida, Delhi, Gurgaon, Ghaziabad and Faridabad starting at ₹299. Oil change, engine repair, battery replacement, puncture fix — same-day doorstep service.",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "299",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.garagefixcare.in/"
        }
      ]
    }
  ]}
/>

      {/* Subtle scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-orange-500 origin-left z-[70]"
        style={{ scaleX: scrollProgressScaleX }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        {/* Mobile navbar = 3px accent + 56px nav = 59px. Desktop = 32px strip + 56px nav = 88px */}
        <main className="bg-slate-800 pt-[59px] lg:pt-[88px]">

<section className="relative text-white overflow-hidden min-h-[700px] sm:min-h-[600px] lg:min-h-[680px]">
  {/* Full-width cinematic background video: inside.mp4 <-> outside.mp4, continuous crossfade loop, no static image between clips */}
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
    {/* Mobile-only: dark behind the top and bottom text zones, clear over the middle video band */}
    <div
      className="absolute inset-0 sm:hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.72) 22%, rgba(0,0,0,0.22) 40%, rgba(0,0,0,0.22) 60%, rgba(0,0,0,0.52) 78%, rgba(0,0,0,0.52) 100%)',
      }}
    />
    {/* Desktop/tablet: cinematic gradient overlay, strong dark on the left (behind text), fading to transparent on the right */}
    <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
    {/* Desktop/tablet: subtle bottom gradient for extra depth */}
    <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    {/* Very subtle moving light sweep for cinematic lighting feel */}
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
      .hero-light-sweep {
        animation: none;
        opacity: 0.2;
      }
    }
  `}</style>

  {/* Mobile: absolute positioning context that fills the fixed-height hero, so the top and bottom
      zones can pin to opposite edges and leave the middle band of video clear.
      Desktop/tablet (sm:+): reverts to the original static, single-column flow — unchanged. */}
  <div className="absolute inset-0 sm:relative z-10 w-full sm:px-6 lg:pl-[6vw] lg:pr-6 sm:py-10 lg:py-12">

      {/* ============== TOP ZONE (mobile: pinned to top) ==============
          Heading, subtitle, description, trust points — everything the visitor reads first. */}
      <motion.div
        className="absolute top-5 left-4 right-4 sm:relative sm:top-auto sm:left-auto sm:right-auto sm:w-full lg:max-w-[520px]"
        initial="hidden"
        animate="visible"
        variants={heroStaggerContainer}
      >
      <motion.h1
        variants={heroStaggerItem}
        className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] sm:leading-tight mb-1.5 sm:mb-3"
      >
  Bike, Scooty &amp; Car Service in Noida, Gurgaon &amp; Delhi NCR
  <span style={{ color: '#FF7A18' }}> at Your Doorstep</span>
</motion.h1>

       {/* Subheading */}
       <motion.p
         variants={heroStaggerItem}
         className="font-poppins text-[11px] sm:text-sm font-semibold text-white/85 leading-tight mb-1.5 sm:mb-2"
       >
  Starting at just <span style={{ color: '#FF7A18' }}>₹299</span> &bull; Same-Day Bike &amp; Car Repair &bull; Trusted Mechanics Across Delhi NCR
</motion.p>
      </motion.div>
      {/* ============== END TOP ZONE ==============
          Clear video band lives here on mobile — nothing is rendered in this gap. */}

      {/* ============== BOTTOM ZONE (mobile: pinned to bottom) ==============
          Trust points, CTA buttons, vehicle selector, review stats. */}
      <motion.div
        className="absolute bottom-3 left-4 right-4 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:w-full lg:max-w-[520px] sm:mt-0"
        initial="hidden"
        animate="visible"
        variants={heroStaggerContainer}
      >
{/* Trust points strip */}
<motion.div
  variants={heroStaggerItem}
  className="grid grid-cols-2 gap-x-2 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-3 sm:gap-y-1 mb-2 sm:mb-5 text-[9px] sm:text-xs text-white/85"
>
  {["Starting ₹299", "Same-Day Service", "Doorstep Mechanics", "Trusted Technicians", "No Hidden Charges"].map((point, i) => (
    <span key={i} className="inline-flex items-center gap-1 font-medium">
      <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" style={{ color: '#FF7A18' }} />
      {point}
    </span>
  ))}
</motion.div>

        {/* Book + Call Buttons Row */}
        <motion.div
          variants={heroStaggerItem}
          className="flex flex-wrap items-center gap-2 sm:gap-3"
        >
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs sm:px-6 sm:py-3 sm:rounded-xl font-semibold sm:text-base shadow-lg hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 active:translate-y-0 transition-all duration-300"
            >
              Book Service Now
            </button>
          ) : (
            <div
              className={`flex flex-col sm:flex-row items-center gap-3 transition-all duration-500 ease-in-out ${
                showInput ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              <input
                type="tel"
                maxLength={10}
                value={modalPhoneNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setModalPhoneNumber(val);
                }}
                placeholder="Enter 10-digit mobile number"
                className="w-full sm:w-auto px-4 py-3 rounded-xl text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={async () => {
                  if (!modalPhoneNumber || modalPhoneNumber.length !== 10) {
                    alert('Please enter a valid 10-digit phone number.');
                    return;
                  }
                  try {
                    await axios.post(`${import.meta.env.VITE_API_URL}/api/quick-book-service`, {
                      phoneNumber: modalPhoneNumber,
                      serviceType: "Doorstep Bike Service",
                    });
                    alert('✅ Booking received! Our team will contact you shortly.');
                    setModalPhoneNumber('');
                    setShowInput(false);
                  } catch (err) {
                    console.error('Booking failed:', err);
                    alert('❌ Booking failed. Please try again.');
                  }
                }}
                className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:bg-green-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Call Button */}
          <a
            href="tel:9540553759"
            className="border-2 border-white text-white px-4 py-2 rounded-lg text-xs sm:px-6 sm:py-3 sm:rounded-xl font-semibold sm:text-base hover:bg-white hover:text-blue-900 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Call Now
          </a>
        </motion.div>

        {/* === Compact "Select Your Vehicle" segmented control === */}
        <motion.div
          variants={heroStaggerItem}
          className="mt-2 sm:mt-5 w-full sm:max-w-[380px] lg:max-w-[420px] bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-3 shadow-lg"
        >
          <p className="text-white/90 text-[9px] sm:text-xs font-semibold mb-1 sm:mb-2 tracking-tight">Select Your Vehicle</p>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {/* Bike & Scooty - Default Active */}
            <button
              type="button"
              aria-pressed="true"
              className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white py-1.5 sm:py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-slate-900 transition-all duration-300 active:scale-95"
            >
              <Bike className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Bike &amp; Scooty</span>
            </button>

            {/* Cars - Navigates to /car using useNavigate (SPA - no reload) */}
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
        {/* === END SECTION === */}

        {/* Review + Customer Stats — moved under the CTA/vehicle selector, aligned with left content */}
        <motion.div
          variants={heroStaggerItem}
          className="flex flex-row items-center gap-2 sm:gap-3 w-full mt-2 sm:mt-4"
        >
          <div className="bg-sky-100 text-black px-2 py-1.5 sm:p-1 rounded-lg sm:rounded-xl shadow-lg flex-1">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-xl font-bold">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
              {reviewScore.toFixed(1)}/5
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-center">Google Review</div>
          </div>
          <div className="bg-sky-100 text-black px-2 py-1.5 sm:p-1 rounded-lg sm:rounded-xl shadow-lg flex-1">
            <div className="text-xs sm:text-xl font-bold text-center">
              {happyCustomersCount.toLocaleString()}+
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-center">Happy Customers</div>
          </div>
        </motion.div>
      </motion.div>
      {/* ============== END BOTTOM ZONE ============== */}

  </div>
</section>

</main>
{/* --- Insert this new section after the Hero section --- */}

{/* Dark premium information strip — sits between the hero (video + rating/stats) and the
    Service Available / city marquee. Continues the cinematic dark visual language of the
    hero instead of a disconnected white block. Same structure on mobile and desktop. */}
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
    {/* extremely subtle orange glow accent */}
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

{/* Background color based on your Navbar: likely a light gray or white. 
    Assuming the Navbar is bg-white or bg-gray-50 based on the screenshot. */}
<div className="bg-sky-100 border-y border-gray-200 py-2 overflow-hidden">
  <div className="flex items-center text-sm sm:text-sm font-semibold max-w-7xl mx-auto">
    <div className="flex-shrink-0 px-2 sm:px-2 pr-2">
      <span className="text-red-600 mr-1 sm:mr-2 font-bold">Service Available </span>
      <span className="text-brandRed font-bold sm:inline"> (10% off)</span>
      
    </div>
    <div className="flex-1 min-w-0 overflow-hidden">
      <div className="flex items-center animate-marquee">
        {[...Array(3)].map((_, repetitionIndex) => (
          serviceCities.map((city, index) => (
          <span 
  key={`${repetitionIndex}-${index}`}
  className={`ml-2 sm:ml-6 md:ml-12 tracking-wider flex-shrink-0 font-bold text-sm sm:text-sm ${city.color}`}
>
  {city.name}
</span>

          ))
        ))}
      </div>
    </div>
  </div>
</div>
{/* --- Your "Hot Deals This Week" section follows here --- */}
          {/* Autoplay Card Carousel Section */}
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
                    {/* UPDATED: Reduced text size on mobile (text-2xl) and scaled up (md:text-4xl) */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mr-4">
                        <span className="text-white">Hot Deals</span>{' '}
                        <span className="text-red-600">This Week</span>
                    </h2>

                    <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                  </div>
                  {/* UPDATED: Reduced text size on mobile (text-base) and scaled up (text-xl) */}
                  <p className="text-base sm:text-lg text-white max-w-7xl mx-auto mt-2 text-center">
                  Limited-time offer for Noida customers!
  Get up to 10% off on bike repairs and servicing at your doorstep.
  Hurry—these deals won’t last long!
                  </p>
                </motion.div>
            </div>
            {/* Marquee-style infinite scrolling image strip */}
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
                      {/* City badge overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 flex flex-wrap gap-1">
                        {['Noida', 'Delhi', 'Greater Noida', 'Ghaziabad', 'Gurugram', 'Faridabad'].slice(0, i % 2 === 0 ? 3 : 3).map((_city, ci) => (
                          <span key={ci} className="text-white text-xs font-semibold bg-red-600/80 px-2 py-0.5 rounded-full">
                            {['Noida', 'Delhi', 'Greater Noida', 'Ghaziabad', 'Gurugram', 'Faridabad'][(i * 2 + ci) % 6]}
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

          {/* Brands We Service — Bike & Scooty brand marquee (replaces old "What Our Clients Say?" section) */}
          <section className="bg-slate-800 text-white py-10 sm:py-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-6 sm:mb-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-orange-400 uppercase mb-2">
          Bikes &amp; Scooters
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          <span className="text-white">Brands We</span>{' '}
          <span style={{ color: '#FF7A18' }}>Service</span>
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
          Service support for leading two-wheeler brands.
        </p>
      </motion.div>
    </div>

    {/* Seamless two-row infinite brand marquee, rows move in opposite directions */}
    <div className="flex flex-col gap-2 sm:gap-3">
      {/* Row 1: right → left */}
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

      {/* Row 2: left → right */}
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
        .brand-marquee-track {
          gap: 12px;
        }
      }
      .brand-marquee-track-1 {
        animation: brandMarqueeScroll 24s linear infinite;
      }
      .brand-marquee-track-2 {
        animation: brandMarqueeScroll 30s linear infinite reverse;
      }
      .brand-tile {
        transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
      }
      .brand-tile:hover {
        border-color: #FDBA74 !important;
        transform: translateY(-2px);
      }
      .brand-tile:hover span {
        color: #EA580C !important;
      }
    `}</style>
  </section>
          
          {/* At Home Service Price List Section (YOUR REQUIRED SECTION) */}
        
  <section className="py-12 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <span className="text-white">At-Home Service</span>{' '}
          <span className="text-red-600">Price List</span>
        </h2>
        <p className="text-base sm:text-xl text-white mb-6 max-w-3xl mx-auto">
          Transparent pricing for doorstep bike and car service in Noida. Check the labour charges below based on your vehicle's engine size — no hidden fees, no surprises.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 justify-items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {servicePrices.map((service, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="bg-brandRed p-1.5 rounded-xl w-full max-w-full shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="bg-sky-100 rounded-xl shadow-sm p-3 sm:p-4 w-full h-full">
              <div className="flex flex-col items-start text-left mb-1">
                <h3 className="text-base sm:text-lg font-bold text-black mb-1">{service.title}</h3>
                <p className="text-black text-xs sm:text-sm font-semibold">{service.subtitle}</p>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  <span className="line-through text-red-500 mr-1">{service.originalPrice}</span>
                  <span className="text-green-600">{service.discountedPrice}/-</span>
                </div>
              </div>
              <ul className="list-none space-y-0.5 text-left text-gray-700 text-xs">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-1">
                <button
                  onClick={() => handleSeeChecklist(service.title, service.subtitle)}
                  className="bg-red-600 text-white px-3 py-1.5 text-xs rounded-lg font-semibold hover:bg-red-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition-all duration-200"
                  aria-label={`See full checklist for ${service.title}`}
                >
                  See checklist
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>

        
  <section className="relative pt-12 pb-16 sm:py-20">
    <img
      src={mechanicImage}
      alt="Mechanic background"
      className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="bg-sky-100 rounded-xl shadow-lg p-4 sm:p-6 order-2 lg:order-1">
          <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 text-center">
            Choose Your Vehicle
          </h3>
          <div className="flex justify-center gap-1 mb-2">
            <button
              onClick={() => setSelectedVehicle("Bike")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md font-semibold text-xs sm:text-sm transition-colors ${
                selectedVehicle === "Bike"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Bike
            </button>
            <button
              onClick={() => setSelectedVehicle("Scooty")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md font-semibold text-xs sm:text-sm transition-colors ${
                selectedVehicle === "Scooty"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Scooty
            </button>
          </div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
          >
            <option value="">Select Brand</option>
            {(selectedVehicle === "Bike" ? bikeBrands : scootyBrands).map(
              (brand, idx) => (
                <option key={idx} value={brand}>
                  {brand}
                </option>
              )
            )}
          </select>
        </div>
        <div className="text-center lg:text-left text-white flex flex-col justify-center p-0 lg:p-0 order-1 lg:order-2">
          <p className="text-white text-sm font-semibold mb-1 underline decoration-red-600">
            Book Service
          </p>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            <span className="text-orange-500">Doorstep Bike &amp; Car Service</span> in Noida &amp; Nearby Areas
          </h2>
          <p className="text-base sm:text-lg font-bold text-blue-400 mb-4">
            Certified Genuine Parts
          </p>
          <a
            href="tel:9540553759"
            className="w-full lg:w-2/3 inline-block bg-red-600 text-white px-4 py-3 rounded-xl font-semibold text-sm hover:bg-red-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 flex items-center justify-center space-x-1 shadow-lg mx-auto lg:mx-0"
          >
            <Phone className="h-4 w-4" />
            <span>Book on Call</span>
          </a>
          <p className="text-xs sm:text-sm text-gray-300 mt-3">
            Prefer to book online instead?{' '}
            <Link to="/book" className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">
              Book your service here
            </Link>
            , or see our{' '}
            <Link to="/car" className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">
              dedicated car service page
            </Link>.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
  {/* Bike Services at Home Section */}
  <section className="py-12 bg-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
          Complete Bike &amp; Car Care, <span className="text-red-600"> Right at Your Door in Noida</span>
        </h2>
        <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
          From routine oil changes to engine repair, scooty service to car AC checks — our mechanics in Noida handle it all at your location. No waiting, no hassle.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {[
          { name: "Routine Service", img: routineService },
          { name: "Bike Insurance", img: bikeInsurance },
          { name: "Doorstep Service", img: doorstepService },
          { name: "Wheel Care", img: wheelCare },
          { name: "Bike Batteries", img: bikeBatteries },
          { name: "Engine Repair", img: engineRepair },
        ].map((service, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="bg-sky-100 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src={service.img}
              alt={`${service.name} in Noida`}
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain mb-1 sm:mb-2"
              loading="lazy"
              decoding="async"
            />
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 text-center">{service.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>

  {/* GarageFixCare Benefits Section */}
  <section className="py-10 sm:py-14 bg-slate-900 text-white">
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div>
        <p className="text-xs text-white mb-1">Get Rs.10 Off On First Service in Noida</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          GarageFixCare <span className="text-red-600">Service Warranty</span>
        </h2>
        <p className="text-sm sm:text-base text-sky-100 mb-4">
          Noida's trusted doorstep service for bikes and cars. We service all motorcycle and scooter brands — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — plus cars of all makes, right at your home or office.
        </p>
        <div className="flex gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-8 sm:h-10"
              loading="lazy"
              decoding="async"
            />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-8 sm:h-10"
              loading="lazy"
              decoding="async"
            />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <div className="bg-sky-100 text-black rounded-xl p-4 sm:p-6 shadow-lg flex items-center space-x-2 sm:space-x-3">
          <img src={warrantyImg} alt="Warranty" className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              loading="lazy"
              decoding="async"
            />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Enjoy a 10-Day Free Service Guarantee</h3>
            <p className="text-xs sm:text-sm text-gray-900">10-Day Hassle-Free Warranty</p>
          </div>
        </div>
        <div className="bg-sky-100 text-black rounded-xl p-4 sm:p-6 shadow-lg flex items-center space-x-2 sm:space-x-3">
          <img src={pickupImg} alt="Pickup Service" className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              loading="lazy"
              decoding="async"
            />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Enjoy Free Pickup and Drop at Your Convenience</h3>
            <p className="text-xs sm:text-sm text-gray-900">Free Pick & Drop Available</p>
          </div>
        </div>
        <div className="bg-sky-100 text-black rounded-xl p-4 sm:p-6 shadow-lg flex items-center space-x-2 sm:space-x-3">
          <img src={transparentImg} alt="Transparent Pricing" className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              loading="lazy"
              decoding="async"
            />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Transparent Pricing, Competitive Rate</h3>
            <p className="text-xs sm:text-sm text-gray-900">Save up to 30% on your bike service</p>
          </div>
        </div>
        <div className="bg-sky-100 text-black rounded-xl p-4 sm:p-6 shadow-lg flex items-center space-x-2 sm:space-x-3">
          <img src={trainedImg} alt="Trained Mechanics" className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              loading="lazy"
              decoding="async"
            />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Skilled and Certified Mechanics</h3>
            <p className="text-xs sm:text-sm text-gray-900">Exclusively Certified Two-Wheeler Mechanics</p>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
  {/* Why Choose GarageFixCare Section */}
  <section className="py-12 sm:py-16 bg-slate-800 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
      <motion.div
        className="flex justify-center order-2 lg:order-1"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <img
          src={whyChooseImg}
          alt="Why Choose GarageFixCare"
          className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm"
              loading="lazy"
              decoding="async"
            />
      </motion.div>
      <motion.div
        className="order-1 lg:order-2"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Why Choose <span className="text-red-600">GarageFixCare?</span>
        </h2>
        <p className="text-sm sm:text-base text-white mb-4">
          We know how much you rely on your two-wheeler every day. That's why GarageFixCare brings certified mechanics directly to Noida residents — with honest pricing, genuine parts, and zero hassle. Here's what makes us different:
        </p>
        <ul className="space-y-2 text-left">
          {[
            "Hassle-Free Doorstep Service",
            "Certified and Skilled Technicians",
            "Honest Pricing",
            "Certified Genuine Parts and Quality Lubricants",
            "Your Satisfaction Guaranteed",
            "Fast and Professional Service",
          ].map((item, index) => (
            <li key={index} className="flex items-center text-gray-200 text-sm sm:text-base">
              <span className="text-red-500 text-base mr-1">◆</span> {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>

  {/* Trusted by Top Brands Section */}
  <section className="py-12 sm:py-16 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* UPDATED: Reduced text size on mobile (text-xl) and scaled up (md:text-3xl) */}
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 sm:mb-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Trusted by <span className="text-red-600">Leading Brands</span> and <span className="text-red-600">Over 100,000 Customers</span>
      </motion.h2>


      {/* Brand Logos */}
      {/* UPDATED: Uses 3 columns on mobile (sm:grid-cols-3) and 5 on desktop (md:grid-cols-5) */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 justify-items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {[
          { name: "WURTH", img: wurthImg },
          { name: "MOTUL", img: motulImg },
          { name: "Turtlemint", img: turtlemintImg },
          { name: "Buniyad", img: buniyadImg },
          { name: "Dunzo", img: dunzoImg },
        ].map((brand, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center justify-center w-full max-w-[150px] h-16 sm:w-40 sm:h-20 hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="max-h-10 sm:max-h-12 object-contain"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  {/* How GarageFixCare Works Section */}
  <section className="bg-slate-800 text-white py-10 sm:py-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
          How <span className="text-red-600">GarageFixCare</span> Works?
        </h2>
        <p className="text-sm sm:text-base text-white mb-4">
          Getting your bike serviced in Noida has never been simpler. Book online or call us, and a skilled mechanic arrives at your doorstep with everything needed to get your bike running at its best — all done on the spot.
        </p>
        <ul className="space-y-2 text-left">
          {[
            "Schedule Your Service",
            "Technician Sent to You",
            "Service Done on the Spot",
            "Clear and Transparent Communication",
            "Guaranteed Quality Service",
            "Easy Payment & Feedback",
          ].map((item, index) => (
            <li key={index} className="flex items-center text-white text-sm sm:text-base">
              <span className="text-red-500 text-base mr-1">◆</span> {item}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="flex justify-center"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <img
          src={bmw310Image}
          alt="How GarageFixCare Works"
          className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm"
              loading="lazy"
              decoding="async"
            />
      </motion.div>
    </div>
  </section>
  {/* We Provide Best Bike Service Section */}
  <section className="bg-slate-900 text-white py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Doorstep <span className="text-red-600">Bike Service</span> by <span className="text-red-600">Certified Experts</span> Near You
      </motion.h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 justify-items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {[
          { name: "Bike Service in Noida", img: noidaImg, to: "/best-bike-service-noida" },
          { name: "Bike Service in Greater Noida", img: greaterNoidaImg, to: "/best-bike-service-greater-noida-west" },
          { name: "Bike Service in Ghaziabad", img: ghaziabadImg, to: "/best-bike-service-ghaziabad" },
          { name: "Bike Service in Delhi", img: delhiImg, to: "/best-bike-service-delhi" },
          { name: "Bike Service in Gurugram", img: gurugramImg, to: "/best-bike-service-gurgaon" },
          { name: "Bike Service in Faridabad", img: faridabadImg, to: "/best-bike-service-gurgaon" },
        ].map((city, index) => (
          <motion.div key={index} variants={staggerItem} className="w-full max-w-xs">
            <Link
              to={city.to}
              className="block bg-sky-100 rounded-xl shadow-lg p-4 sm:p-6 w-full text-center hover:shadow-xl transition-shadow duration-200"
            >
              <img
                src={city.img}
                alt={city.name}
                className="h-16 w-16 sm:h-20 sm:w-20 mx-auto rounded-full mb-2 object-cover"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-sm sm:text-base font-semibold text-black">
                {city.name.split("in ")[0]} <span className="text-red-600">{city.name.split("in ")[1]}</span>
              </h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  {/* Customers Speaks Section */}
  <section className="bg-slate-800 text-white py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
          What <span className="text-red-600">Customers Say</span>
        </h2>
        <p className="text-sm sm:text-base text-white mb-2 sm:mb-4">
          Customer Testimonials on Google
        </p>
        <div className="flex justify-center items-center gap-1 mb-2 sm:mb-4">
          <span className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current"
              />
            ))}
          </span>
          <span className="text-white font-semibold text-sm">4.7 Rating on Google</span>
        </div>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 px-4 py-1 sm:px-5 sm:py-2 rounded-md font-semibold text-xs sm:text-sm text-white hover:bg-red-700 transition-colors duration-200 inline-block"
        >
          Review us on Google
        </a>
      </motion.div>
    </div>
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 bg-slate-800"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {[
        {
          name: "Surendra Pratap Singh",
          img: testimonial1,
          text: "I had an excellent experience with GarageFixCare. The team was knowledgeable and professional, delivering high-quality service along with valuable maintenance guidance.",
          time: "a month ago",
        },
        {
          name: "Dharmendra Gupta",
          img: testimonial2,
          text: "I discovered GarageFixCare through Google and was initially unsure, but they provided video evidence of the service. Their work is professional, transparent, and highly reliable.",
          time: "a month ago",
        },
        {
          name: "Rohit Prasad",
          img: testimonial3,
          text: "GarageFixCare provides excellent services, whether you’re stranded or prefer to stay at home. They offer a comprehensive range of reliable and convenient solutions.",
          time: "a month ago",
        },
        {
          name: "Prabhjeet Sharma",
          img: testimonial4,
          text: "When my bike broke down, GarageFixCare responded immediately. The mechanic arrived the next morning, providing prompt and highly professional service",
          time: "a month ago",
        },
      ].map((t, i) => (
        <motion.div
          key={i}
          variants={staggerItem}
          className="bg-sky-100 text-black rounded-xl p-4 sm:p-6 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-200 h-full"
        >
          <img src={googleIcon} alt="Google" className="h-5 sm:h-6 mb-2"
              loading="lazy"
              decoding="async"
            />
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-base">★</span>
            ))}
          </div>
          <p className="text-black mb-2 text-xs sm:text-sm line-clamp-3">{t.text}</p>
          <img src={t.img} alt={t.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mb-1"
              loading="lazy"
              decoding="async"
            />
          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">{t.name}</h3>
          <span className="text-xs text-black">{t.time}</span>
        </motion.div>
      ))}
    </motion.div>
  </section>
  {/* Bike Brands We Service Section */}
  <section className="bg-slate-900 text-white py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* UPDATED: Reduced text size on mobile (text-2xl) and scaled up (md:text-4xl) */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        All Major Bike <span className="text-red-600">Brands</span> Serviced <span className="text-red-600">at Your Doorstep</span>
      </motion.h2>


      <motion.div
        className="bg-slate-800 rounded-xl shadow-lg inline-block px-4 py-3 sm:px-6 sm:py-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* UPDATED: Reduced text size on mobile (text-sm) and scaled up (text-lg) */}
        <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
          TVS / Bajaj / Royal Enfield / Yamaha / Honda / Hero / Suzuki / KTM / Jawa / Harley Davidson / Ducati / Kawasaki / Benelli / Triumph / Indian / BMW / Aprilia / Yezdi / Husqvarna
        </p>
      </motion.div>
    </div>
  </section>
  {/* Latest Post Section */}
  <section className="bg-slate-800 text-white py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Latest <span className="text-red-600">Post</span>
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {[
          {
            title: "How to Maintain the Gearbox on Your R15 V3?",
            img: maintainGearboxImg,
            desc: "Proper maintenance of your R15 V3 gearbox is essential for smooth operation, extended transmission life, and optimal overall performance.",
            link: "/blog",
          },
          {
            title: "What are the advantages of a four-valve engine in bikes?",
            img: fourValveEngineImg,
            desc: "A four-valve engine offers numerous advantages over traditional two-valve engines in motorcycles.",
            link: "/blog",
          },
          {
            title: "How do I maintain the drive belt on my scooty?",
            img: driveBeltScootyImg,
            desc: "Maintaining the drive belt on your scooty is essential for ensuring smooth and reliable performance.",
            link: "/blog",
          },
        ].map((post, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="bg-sky-100 text-black rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
          >
            <div className="w-full h-40 sm:h-48 bg-slate-200 flex items-center justify-center overflow-hidden">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-4 sm:p-6 text-left">
              <h3 className="text-sm sm:text-base font-bold mb-1">{post.title}</h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-2">{post.desc}</p>
            
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  {/* Frequently Asked Questions Section */}
  <section className="bg-slate-900 text-white py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-4 sm:mb-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Bike Service in Noida — <span className="text-red-600">Common Questions</span>
        </h2>
      </motion.div>
      <motion.div
        className="space-y-2 sm:space-y-3"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {[
          {
            q: "Do you provide both bike and car service in Noida?",
            a: "Yes, we offer doorstep service for both bikes and cars in Noida. Whether it's a routine bike service, scooty repair, or car oil change and maintenance — our certified mechanics come directly to your location."
          },
          {
            q: "Which areas in Noida do you cover for doorstep service?",
            a: "We cover all major sectors of Noida including Sector 18, 62, 63, 75, 76, 77, 78, as well as Greater Noida. We also serve parts of Ghaziabad on request."
          },
          {
            q: "What bike and car repair services do you offer at home?",
            a: "Our Noida mechanics handle regular servicing, oil changes, engine repair, brake adjustment, tyre inflation, battery replacement, air filter cleaning, spark plug replacement, and full vehicle inspection — all at your doorstep."
          },
          {
            q: "How much does a doorstep bike or car service in Noida cost?",
            a: "Our at-home bike service starts from just ₹299 for 100–125cc bikes. Car service pricing varies by model and service type. All rates are transparent — no hidden charges."
          },
          {
            q: "Do you offer Royal Enfield service in Noida?",
            a: "Yes, we specialise in Royal Enfield servicing at your doorstep in Noida. Our mechanics are trained to handle Classic 350, Bullet, Meteor, Himalayan, and other RE models."
          },
          {
            q: "How quickly can a mechanic reach my location in Noida?",
            a: "In most cases, our mechanic will reach you within 2–4 hours of booking. For urgent same-day service, call us directly and we'll do our best to prioritise your request."
          },
          {
            q: "Is your service pricing transparent with no hidden fees?",
            a: "Absolutely. We share a detailed estimate before starting any work. What we quote is what you pay — no surprise charges at the end."
          },
          {
            q: "Do you provide a service warranty?",
            a: "Yes, every service comes with a 10-day hassle-free service guarantee. If you face any issue related to the work done, we'll fix it at no extra cost."
          },
          {
            q: "How do I book a mechanic near me in Noida?",
            a: "You can book by calling us, messaging on WhatsApp, or using the booking form on this page. Share your location in Noida and preferred time, and we'll confirm your slot."
          },
          {
            q: "What payment methods do you accept?",
            a: "We accept cash, UPI (Google Pay, PhonePe, Paytm), and other mobile wallets for your convenience."
          },
          {
            q: "Do I need to arrange any tools or equipment for the mechanic?",
            a: "Not at all. Our mechanics arrive fully equipped with all tools, oils, and parts needed. You just need to be present at your Noida address."
          },
          {
            q: "Do you also service scooties like Activa, Jupiter, or Dio?",
            a: "Yes, we provide complete scooty repair and service in Noida for all popular models including Honda Activa, TVS Jupiter, Hero Destini, Suzuki Access, and Yamaha Fascino."
          },
          {
            q: "What safety standards do your mechanics follow during home visits?",
            a: "Our technicians are trained, verified, and follow safety protocols including protective equipment usage and clean workspaces to ensure a professional experience at your home."
          },
          {
            q: "Can I schedule service for multiple bikes at once?",
            a: "Yes, you can book a single appointment for multiple two-wheelers. Just mention it while booking and we'll arrange accordingly."
          },
          {
            q: "What makes GarageFixCare better than a regular bike workshop?",
            a: "Unlike a traditional garage, we come to you — saving you travel time and waiting. We offer transparent pricing, trained mechanics, genuine parts, and a 10-day service warranty, making us the preferred choice for bike service in Noida."
          },
        ].map((faq, index) => (
          <div key={index} className="border border-gray-700 rounded-md overflow-hidden">
            <button
              className="flex justify-between items-start w-full p-2 sm:p-3 text-left font-semibold text-white hover:bg-slate-700 focus:outline-none text-sm sm:text-base"
              onClick={() => {
                if (activeIndex === index) {
                  setActiveIndex(null);
                } else {
                  setActiveIndex(index);
                }
              }}
            >
              <span className="text-red-600 mr-1">Ques {index + 1}.</span>
              <span className="flex-1 ml-2 text-left">{faq.q}</span>
              <span className="transition-transform duration-300">
                {activeIndex === index ? <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" /> : <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />}
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-2 sm:p-3 bg-slate-700 text-gray-300 text-xs sm:text-sm">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>

  {/* ── Service Locations & Popular Pages (combined) ── */}
  <section className="py-8 sm:py-10 bg-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section heading */}
      <motion.h2
        className="text-lg sm:text-xl font-bold text-white mb-3"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Service Locations &amp; <span className="text-red-600">Popular Pages</span>
      </motion.h2>

      {/* 2-column on md+, single column on mobile */}
      <div className="flex flex-col md:flex-row md:gap-10">

        {/* LEFT — Service Locations */}
        <div className="md:w-auto md:flex-shrink-0 mb-3 md:mb-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Service Locations</p>

          {/* Bike Service Row */}
          <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 mb-1.5">
            <span className="text-sm font-semibold text-orange-400 whitespace-nowrap mr-1">Bike:</span>
            {[
              { city: "Noida",      to: "/best-bike-service-noida" },
              { city: "Delhi",      to: "/best-bike-service-delhi" },
              { city: "Gurgaon",   to: "/best-bike-service-gurgaon" },
              { city: "Ghaziabad", to: "/best-bike-service-ghaziabad" },
            ].map((item, i, arr) => (
              <span key={item.to} className="inline-flex items-center">
                <Link
                  to={item.to}
                  className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-150"
                >
                  {item.city}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-gray-600 mx-1.5 select-none">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Car Service Row */}
          <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
            <span className="text-sm font-semibold text-orange-400 whitespace-nowrap mr-1">Car:</span>
            {[
              { city: "Noida",      to: "/best-car-service-noida" },
              { city: "Delhi",      to: "/best-car-service-delhi" },
              { city: "Gurgaon",   to: "/best-car-service-gurgaon" },
              { city: "Ghaziabad", to: "/best-car-service-ghaziabad" },
            ].map((item, i, arr) => (
              <span key={item.to} className="inline-flex items-center">
                <Link
                  to={item.to}
                  className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-150"
                >
                  {item.city}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-gray-600 mx-1.5 select-none">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Divider — vertical on desktop, horizontal on mobile */}
        <div className="hidden md:block w-px bg-slate-700 self-stretch" />
        <div className="block md:hidden h-px bg-slate-700 mb-3" />

        {/* RIGHT — Popular Service Pages (accordion, collapsed by default) */}
        <div className="flex-1">
          <button
            type="button"
            onClick={() => setIsPopularPagesOpen((prev) => !prev)}
            className="w-full flex items-center justify-between mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded"
            aria-expanded={isPopularPagesOpen}
            aria-controls="popular-pages-panel"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Popular Pages</p>
            <ChevronDown
              className={`h-4 w-4 text-orange-400 flex-shrink-0 transition-transform duration-300 ${
                isPopularPagesOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            id="popular-pages-panel"
            className={`grid transition-all duration-300 ease-in-out ${
              isPopularPagesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
          <div className="overflow-hidden">
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1">
            {[
              { label: "Best Bike Service in Noida",      to: "/best-bike-service-noida" },
              { label: "Best Bike Service in Delhi",      to: "/best-bike-service-delhi" },
              { label: "Best Bike Service in Gurgaon",   to: "/best-bike-service-gurgaon" },
              { label: "Best Bike Service in Ghaziabad", to: "/best-bike-service-ghaziabad" },
              { label: "Best Bike Service in Dwarka",            to: "/best-bike-service-dwarka" },
              { label: "Best Bike Service in Greater Kailash",   to: "/best-bike-service-greater-kailash" },
              { label: "Best Bike Service in Defence Colony",   to: "/best-bike-service-defence-colony" },
              { label: "Best Bike Service in Hauz Khas",         to: "/best-bike-service-hauz-khas" },
              { label: "Best Bike Service in Saket",             to: "/best-bike-service-saket" },
              { label: "Best Bike Service in Connaught Place",   to: "/best-bike-service-connaught-place" },
              { label: "Best Bike Service in Uttam Nagar",       to: "/best-bike-service-uttam-nagar" },
              { label: "Best Bike Service in New Delhi",         to: "/best-bike-service-new-delhi" },
              { label: "Best Bike Service in Chanakyapuri",      to: "/best-bike-service-chanakyapuri" },
              { label: "Best Bike Service in Paharganj",         to: "/best-bike-service-paharganj" },
              { label: "Best Bike Service in Palam",             to: "/best-bike-service-palam" },
              { label: "Best Bike Service in Delhi Cantt",       to: "/best-bike-service-delhi-cantt" },
              { label: "Best Bike Service in Udyog Vihar",       to: "/best-bike-service-udyog-vihar" },
              { label: "Best Bike Service in Sushant Lok Phase 1", to: "/best-bike-service-sushant-lok-phase-1" },
              { label: "Best Bike Service in Sector 56 Gurugram", to: "/best-bike-service-sector-56-gurugram" },
              { label: "Best Bike Service in Sikanderpur Ghosi", to: "/best-bike-service-sikanderpur-ghosi" },
              { label: "Best Bike Service in Indirapuram",       to: "/best-bike-service-indirapuram" },
              { label: "Best Bike Service in Vaishali",          to: "/best-bike-service-vaishali" },
              { label: "Best Bike Service in Greater Noida West", to: "/best-bike-service-greater-noida-west" },
              { label: "Best Car Service in Noida",      to: "/best-car-service-noida" },
              { label: "Best Car Service in Delhi",      to: "/best-car-service-delhi" },
              { label: "Best Car Service in Gurgaon",   to: "/best-car-service-gurgaon" },
              { label: "Best Car Service in Ghaziabad", to: "/best-car-service-ghaziabad" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-gray-400 hover:text-orange-400 underline underline-offset-2 transition-colors duration-150"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          </div>
          </div>
        </div>

      </div>

      {/* ── Explore All Service Areas — collapsed-by-default Location Hub ── */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Explore All Service Areas
        </p>
        <div className="space-y-2">
          {areaGroups.map((group) => {
            const isOpen = openAreaAccordion === group.key;
            return (
              <div
                key={group.key}
                className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900/40"
              >
                <button
                  type="button"
                  onClick={() => toggleAreaAccordion(group.key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  aria-expanded={isOpen}
                  aria-controls={`area-panel-${group.key}`}
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base font-semibold text-white">
                    <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    {group.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-orange-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  id={`area-panel-${group.key}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      {/* Hub links — always real, always crawlable */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Link
                          to={group.hub.bikeTo}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-orange-600/15 text-orange-400 hover:bg-orange-600/25 transition-colors duration-150"
                        >
                          Bike Service in {group.title.replace(' Areas', '')} →
                        </Link>
                        <Link
                          to={group.hub.carTo}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-orange-600/15 text-orange-400 hover:bg-orange-600/25 transition-colors duration-150"
                        >
                          Car Service in {group.title.replace(' Areas', '')} →
                        </Link>
                      </div>

                      {/* Locality chips — linked only where a real page exists, plain text otherwise */}
                      <div className="flex flex-wrap gap-1.5">
                        {group.areas.map((area) =>
                          area.to ? (
                            <Link
                              key={area.name}
                              to={area.to}
                              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-gray-300 underline underline-offset-2 hover:text-orange-400 hover:bg-slate-700 transition-colors duration-150"
                            >
                              {area.name}
                            </Link>
                          ) : (
                            <span
                              key={area.name}
                              className="text-xs px-2.5 py-1 rounded-md bg-slate-800/50 text-gray-500"
                            >
                              {area.name}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>

          {/* CTA Section */}
          <section className="py-10 sm:py-14 bg-slate-800">
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
        Book Bike or Car Service in Noida Today
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
    {/* Call Button — blue color */}
    <div className="btn-float-wrap">
      <span className="btn-pulse-ring" style={{ background: '#1d72b8' }} />
      <a
        href="tel:9540553759"
        className="btn-shake w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full text-white flex items-center justify-center shadow-2xl relative"
        style={{ background: 'linear-gradient(135deg, #1d72b8, #145a9c)' }}
        aria-label="Call Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      </a>
    </div>
    {/* WhatsApp Button — green */}
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


        {/* Checklist Modal (UPDATED WITH PHONE INPUT AND API CALL) */}
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] w-full max-w-sm sm:max-w-md flex flex-col">
              
              {/* Modal Header */}
              <div className="p-4 border-b flex justify-between items-start">
                  <div>
                      <h3 className="text-lg sm:text-xl font-bold text-black">{selectedService.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{selectedService.subtitle}</p>
                  </div>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-900">
                      <X className="h-6 w-6" />
                  </button>
              </div>
              
              {/* Modal Body: Scrolling Checklist */}
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
              
              {/* Modal Footer: Phone Input and Book Now Button (THE NEW SECTION) */}
              <div className="p-4 border-t bg-gray-50 rounded-b-xl">
                  
                  {/* NEW: Phone Number Input Field */}
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
                  
                  {/* Terms and Conditions Checkbox (Updated with Tailwind classes) */}
                  <div className="flex items-center mb-4">
                      <input type="checkbox" id="terms" required className="mr-2 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                      <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 select-none">
                          Yes, I agree to the <span className='underline'>Terms of Service</span>
                      </label>
                  </div>
                  
                  {/* Book Now Button (Updated to call handleModalBookNow) */}
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
  export default Home;

// BestBikeServiceSarojiniNagar.tsx
// Sarojini Nagar specific SEO/content + Home.tsx design system (video hero, Framer Motion, marquees)
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Flame, X, Plus, Phone, Bike, Car } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';

// Hero background video (same assets/crossfade system as Home.tsx)
import insideVideo from '../images/inside.mp4';
import outsideVideo from '../images/outside.mp4';

// Hot Deals marquee — same assets as Home.tsx
import hotDealsImage1 from '../images/hotdeals1.png';
import hotDealsImage2 from '../images/hotdeals2.png';
import hotDealsImage3 from '../images/hotdeals3.png';
import hotDealsImage4 from '../images/hotdeals4.png';
import hotDealsImage5 from '../images/hotdeals5.png';

// Bike Services icons — same assets as Home.tsx
import routineService from '../images/Routine Service.png';
import bikeInsurance from '../images/Bike Insurance.png';
import doorstepService from '../images/Doorstep Service.png';
import wheelCare from '../images/Wheel Care.png';
import bikeBatteries from '../images/Bike Battery.png';
import engineRepair from '../images/Engine Repair.png';

// Sarojini Nagar specific / existing assets
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

interface Service {
  title: string;
  subtitle: string;
  checklist: string[];
}

// ==================================================
// Reusable Framer Motion variants — same system as Home.tsx
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

const BestBikeServiceSarojiniNagar = () => {
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);
  const [reviewScore, setReviewScore] = useState(4.6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalPhoneNumber, setModalPhoneNumber] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const prefersReducedMotion = useReducedMotion();

  // Subtle top-of-page scroll progress indicator (same as Home.tsx)
  const { scrollYProgress } = useScroll();
  const scrollProgressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // ================= Navbar-flush hero offset =================
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

  // ================= Hero video sequence (two-slot crossfade system) =================
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

  // Hot Deals marquee images — Sarojini Nagar specific copy/alt text
  const carouselImages = [
    { src: hotDealsImage1, alt: 'Bike service offer in Sarojini Nagar' },
    { src: hotDealsImage2, alt: 'Doorstep scooty service near Sarojini Nagar Market' },
    { src: hotDealsImage3, alt: 'Car engine repair near Netaji Nagar' },
    { src: hotDealsImage4, alt: 'Roadside vehicle assistance near INA Colony' },
    { src: hotDealsImage5, alt: 'Doorstep vehicle repair deal near Safdarjung Enclave' },
  ];
  const hotDealsAreaBadges = ['Sarojini Nagar', 'Netaji Nagar', 'INA Colony', 'Safdarjung Enclave', 'Moti Bagh', 'Dhaula Kuan'];

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
    { title: 'At-Home Basic Service', subtitle: '100 CC - 125 CC', originalPrice: 'Rs. 599', discountedPrice: 'Rs. 299', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Standard Service', subtitle: '135 CC - 200 CC', originalPrice: 'Rs. 799', discountedPrice: 'Rs. 399', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Premium Service', subtitle: '220 CC - 300 CC', originalPrice: 'Rs. 1,199', discountedPrice: 'Rs. 499', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Complete Care', subtitle: '350 CC - 450 CC', originalPrice: 'Rs. 1,599', discountedPrice: 'Rs. 599', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
    { title: 'At-Home Luxury Care', subtitle: 'Above 500 CC', originalPrice: 'Rs. 2,199', discountedPrice: 'Rs. 999', features: ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'] },
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

  const serviceCities = [
    { name: 'Sarojini Nagar', color: 'text-indigo-700' },
    { name: 'Netaji Nagar', color: 'text-red-700' },
    { name: 'INA Colony', color: 'text-teal-700' },
    { name: 'Safdarjung Enclave', color: 'text-gray-900' },
    { name: 'Moti Bagh', color: 'text-orange-700' },
    { name: 'Dhaula Kuan', color: 'text-slate-700' },
  ];

  const coveredAreas = [
    'Sarojini Nagar', 'Sarojini Nagar Market', 'Sarojini Nagar Block A',
    'Sarojini Nagar Block B', 'Sarojini Nagar Block C', 'Sarojini Nagar Block D',
    'Pilanji', 'Netaji Nagar', 'Kidwai Nagar East', 'Kidwai Nagar West',
    'Laxmi Bai Nagar', 'INA Colony',
  ];

  const cityPages = [
    { name: 'Gurgaon', path: '/best-bike-service-gurgaon' },
    { name: 'Delhi', path: '/best-bike-service-delhi' },
    { name: 'Delhi Cantt', path: '/best-bike-service-delhi-cantt' },
    { name: 'Dhaula Kuan', path: '/best-bike-service-dhaula-kuan' },
    { name: 'Mahipalpur', path: '/best-bike-service-mahipalpur' },
    { name: 'Chhatarpur', path: '/best-bike-service-chhatarpur' },
  ];

  // Brands We Service marquee data
  const bikeBrands = ['Hero', 'Honda', 'TVS', 'Bajaj', 'Suzuki', 'Yamaha', 'Kawasaki', 'Royal Enfield', 'KTM', 'BMW', 'Harley Davidson', 'Ducati', 'Triumph', 'Indian', 'Vespa', 'Benelli', 'Aprilia', 'Yezdi', 'Husqvarna', 'Other'];
  const scootyBrands = ['Honda', 'TVS', 'Hero', 'Suzuki', 'Yamaha', 'Ather', 'Ola Electric', 'Bajaj', 'Vespa', 'Aprilia', 'Other'];
  const marqueeBrands = Array.from(
    new Set([...bikeBrands, ...scootyBrands, 'Jawa', 'Bajaj Chetak', 'Vida', 'Okinawa', 'Ampere', 'Revolt'])
  ).filter(brand => brand !== 'Other');
  const marqueeBrandsRow1 = marqueeBrands.filter((_, i) => i % 2 === 0);
  const marqueeBrandsRow2 = marqueeBrands.filter((_, i) => i % 2 !== 0);

  const bikeServiceCards = [
    { name: 'Routine Service', img: routineService },
    { name: 'Engine Repair', img: engineRepair },
    { name: 'Battery Replacement', img: bikeBatteries },
    { name: 'Brake Repair', img: wheelCare },
    { name: 'Tyre Service', img: doorstepService },
    { name: 'Insurance Assistance', img: bikeInsurance },
  ];

  return (
    <>
      <SEOHelmet
        title="Best Bike, Scooty and Car Service in Sarojini Nagar | Doorstep Service Just ₹299"
        description="Garage Fix Care offers doorstep bike, scooty and car service in Sarojini Nagar, Delhi, including Sarojini Nagar Market, Netaji Nagar, INA Colony, Kidwai Nagar, Safdarjung Enclave and Moti Bagh, starting at just ₹299. Certified mechanics, same-day vehicle repair at your home."
        canonical="https://www.garagefixcare.in/best-bike-service-sarojini-nagar"
        robots="index, follow"
        og={{
          url: 'https://www.garagefixcare.in/best-bike-service-sarojini-nagar',
          image: 'https://www.garagefixcare.in/og-banner.png',
          imageAlt: 'Best bike, scooty and car service in Sarojini Nagar at doorstep by Garage Fix Care',
          type: 'website',
        }}
        twitter={{
          image: 'https://www.garagefixcare.in/og-banner.png',
          imageAlt: 'Doorstep bike, scooty and car service in Sarojini Nagar, Delhi',
        }}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Garage Fix Care',
            description: 'Best bike, scooty and car service in Sarojini Nagar. Doorstep repair, servicing, oil change and battery replacement for bikes, scooties and cars, starting at just ₹299.',
            url: 'https://www.garagefixcare.in/best-bike-service-sarojini-nagar',
            telephone: '+919540553759',
            priceRange: '₹₹',
            image: 'https://www.garagefixcare.in/og-banner.png',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Sarojini Nagar, New Delhi',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
            geo: { '@type': 'GeoCoordinates', latitude: '28.5756', longitude: '77.1997' },
            areaServed: [
              { '@type': 'Place', name: 'Sarojini Nagar' },
              { '@type': 'Place', name: 'Sarojini Nagar Market' },
              { '@type': 'Place', name: 'Pilanji' },
              { '@type': 'Place', name: 'Netaji Nagar' },
              { '@type': 'Place', name: 'Kidwai Nagar East' },
              { '@type': 'Place', name: 'Kidwai Nagar West' },
              { '@type': 'Place', name: 'Laxmi Bai Nagar' },
              { '@type': 'Place', name: 'INA Colony' },
              { '@type': 'Place', name: 'Safdarjung Enclave' },
              { '@type': 'Place', name: 'Moti Bagh' },
              { '@type': 'Place', name: 'Dhaula Kuan' },
              { '@type': 'Place', name: 'Chanakyapuri' },
            ],
            serviceType: ['Bike Repair', 'Scooty Repair', 'Car Service', 'Doorstep Vehicle Service', 'Engine Repair', 'Battery Replacement', 'Brake Repair', 'Tyre Service'],
            openingHours: 'Mo-Su 08:00-20:00',
            aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '100000' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Doorstep Bike, Scooty and Car Service in Sarojini Nagar',
            provider: { '@type': 'LocalBusiness', name: 'Garage Fix Care' },
            areaServed: 'Sarojini Nagar, New Delhi',
            description: 'At-home bike, scooty and car servicing starting at ₹299 across Sarojini Nagar, Sarojini Nagar Market, Pilanji, Netaji Nagar, Kidwai Nagar East, Kidwai Nagar West, Laxmi Bai Nagar, INA Colony, Safdarjung Enclave, Moti Bagh and Dhaula Kuan. Oil change, engine repair, battery replacement, puncture fix and car maintenance — same-day doorstep service.',
            offers: { '@type': 'Offer', priceCurrency: 'INR', price: '299', availability: 'https://schema.org/InStock' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Is bike service available in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Garage Fix Care provides doorstep bike service in Sarojini Nagar starting at just ₹299, with certified mechanics arriving at your home or office within 2–4 hours of booking.' } },
              { '@type': 'Question', name: 'Do you provide scooty repair in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we repair and service all scooties in Sarojini Nagar — Honda Activa, TVS Jupiter, Suzuki Access 125, Honda Dio and Hero Maestro — at your doorstep with genuine parts and transparent pricing.' } },
              { '@type': 'Question', name: 'Do you provide car service at home in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Alongside bikes and scooties, we offer doorstep car servicing in Sarojini Nagar and nearby areas. Car service pricing is quoted based on your car model and the work required — book online or call us for a quote.' } },
              { '@type': 'Question', name: 'What is the starting service price in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Bike and scooty service in Sarojini Nagar starts from ₹299 for 100–125cc vehicles (Basic Service). Standard Service (135–200 CC) is ₹399, Premium Service (220–300 CC) is ₹499, Complete Care (350–450 CC) is ₹599, and Luxury Care (above 500 CC) is ₹999. All prices include labour with no hidden charges.' } },
              { '@type': 'Question', name: 'Is doorstep vehicle service available in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Garage Fix Care is a doorstep-first service. Our certified mechanics arrive at your home, apartment or office in Sarojini Nagar fully equipped with tools, oils and parts — no garage visit needed.' } },
              { '@type': 'Question', name: 'Is same-day service available in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Same-day bike, scooty and car service is available across Sarojini Nagar and surrounding areas. Book before noon and our mechanic typically reaches you the same day.' } },
              { '@type': 'Question', name: 'Do you provide pickup and drop for vehicles in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Free pickup and drop is available for bikes, scooties and cars in Sarojini Nagar whenever the service requires taking the vehicle to our workshop for specialised work.' } },
              { '@type': 'Question', name: 'Which areas around Sarojini Nagar are covered?', acceptedAnswer: { '@type': 'Answer', text: 'We cover Sarojini Nagar, Sarojini Nagar Market, all Sarojini Nagar Blocks, Pilanji, Netaji Nagar, Kidwai Nagar East, Kidwai Nagar West, Laxmi Bai Nagar, INA Colony, Safdarjung Enclave, Moti Bagh, Dhaula Kuan, Vasant Vihar and R.K. Puram.' } },
              { '@type': 'Question', name: 'Do you cover Netaji Nagar and Kidwai Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Netaji Nagar, Kidwai Nagar East, Kidwai Nagar West, Laxmi Bai Nagar and Pilanji are all well within our regular doorstep service zone. Mechanics reach these areas within 2–4 hours for bikes, scooties and cars.' } },
              { '@type': 'Question', name: 'Do you cover INA Colony and Safdarjung Enclave?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. INA, INA Colony, Safdarjung, Safdarjung Enclave and Bhikaji Cama Place are all covered for doorstep bike, scooty and car service with the same ₹299 starting price.' } },
              { '@type': 'Question', name: 'Do you cover Moti Bagh and Chanakyapuri?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Moti Bagh, Chanakyapuri, Diplomatic Enclave, South Extension and Africa Avenue are all covered for doorstep bike, scooty and car service, including oil change, brake repair and battery replacement.' } },
              { '@type': 'Question', name: 'Can you replace vehicle batteries at home in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We replace two-wheeler and car batteries at your doorstep in Sarojini Nagar using genuine, warranty-backed batteries, with installation included.' } },
              { '@type': 'Question', name: 'Do you repair brakes at your doorstep in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Brake pad replacement, brake shoe change and brake adjustment for bikes, scooties and cars are all done at your doorstep in Sarojini Nagar with genuine parts.' } },
              { '@type': 'Question', name: 'Do you handle engine repairs for bikes, scooties and cars in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. From basic engine tuning to full engine overhaul, our certified mechanics handle engine repair for bikes, scooties and cars. Complex jobs are picked up and returned via our free pickup and drop service.' } },
              { '@type': 'Question', name: 'How can I book a vehicle service in Sarojini Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'You can book via our website, WhatsApp us on 9540553759, or call directly. Share whether it is a bike, scooty or car, your location in Sarojini Nagar and your preferred time slot — we handle the rest.' } },
              { '@type': 'Question', name: 'Is pricing transparent after inspection?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. We provide a full itemised cost estimate before starting any work, whether it is a bike, scooty or car. No surprise bills — what you see is exactly what you pay.' } },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.garagefixcare.in/' },
              { '@type': 'ListItem', position: 2, name: 'Delhi', item: 'https://www.garagefixcare.in/best-bike-service-delhi' },
              { '@type': 'ListItem', position: 3, name: 'Sarojini Nagar', item: 'https://www.garagefixcare.in/best-bike-service-sarojini-nagar' },
              { '@type': 'ListItem', position: 4, name: 'Best Bike, Scooty and Car Service in Sarojini Nagar', item: 'https://www.garagefixcare.in/best-bike-service-sarojini-nagar' },
            ],
          },
        ]}
      />

      {/* Subtle scroll progress indicator — same as Home.tsx */}
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
              {/* TOP ZONE — H1 + subheading (Sarojini Nagar specific) */}
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
                  Best Bike, Scooty and Car Service in Sarojini Nagar
                  <span style={{ color: '#FF7A18' }}> — Doorstep Service Just ₹299</span>
                </motion.h1>

                <motion.p
                  variants={heroStaggerItem}
                  className="font-poppins text-[11px] sm:text-sm font-semibold text-white/85 leading-tight mb-1.5 sm:mb-2"
                >
                  Starting at just <span style={{ color: '#FF7A18' }}>₹299</span> &bull; Bikes, Scooties &amp; Cars &bull; Same-Day Doorstep Service &bull; Certified Mechanics Near You
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

        {/* Dark premium information strip — Sarojini Nagar specific copy */}
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
                Garage Fix Care — Sarojini Nagar
              </span>
            </span>
            <p className="relative text-[10px] sm:text-sm leading-[1.4] sm:leading-relaxed" style={{ color: '#cbd5e1' }}>
              Skip the garage queue. Our certified mechanics come to your home or office across Sarojini Nagar, Sarojini Nagar Market, Pilanji, Netaji Nagar, Kidwai Nagar East &amp; West, Laxmi Bai Nagar, INA Colony, Safdarjung Enclave and Moti Bagh — servicing bikes, scooties and cars, from routine maintenance to engine repairs, starting at ₹299. Fast, transparent and affordable.
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

        {/* Hot Deals This Week — Sarojini Nagar specific copy */}
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
                Limited-time offer for Sarojini Nagar, Netaji Nagar and INA Colony customers! Get up to 10% off on bike, scooty and car repairs and servicing at your doorstep, starting at ₹299. Hurry—these deals won&apos;t last long!
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

        {/* At-Home Service Price List — Sarojini Nagar pricing */}
        <section className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">At-Home Bike &amp; Scooty Service</span> <span className="text-red-600">Price List</span>
              </h2>
              <p className="text-base sm:text-xl text-white mb-10 sm:mb-12 max-w-3xl mx-auto">
                Transparent pricing for doorstep bike and scooty service near Sarojini Nagar and Netaji Nagar, starting at just ₹299. Check the labour charges below based on your two-wheeler&apos;s engine size — no hidden fees, no surprises. Looking for car service instead? Tap Cars above for a tailored quote.
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
                const headerGradients = [
                  'linear-gradient(135deg, #1f2937 0%, #92400e 130%)',
                  'linear-gradient(135deg, #78350f 0%, #f97316 120%)',
                  'linear-gradient(135deg, #ea580c 0%, #FF7A18 100%)',
                  'linear-gradient(135deg, #7c2d12 0%, #f97316 130%)',
                  'linear-gradient(135deg, #111827 0%, #c2410c 140%)',
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
                    {isBestValue && (
                      <span
                        className="absolute top-3 right-3 z-20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full shadow-md"
                        style={{ background: 'linear-gradient(135deg, #FFB157, #FF7A18)', boxShadow: '0 4px 12px rgba(255,122,24,0.45)' }}
                      >
                        Best Value
                      </span>
                    )}

                    <div className="pricing-card-header relative pt-6 px-5 pb-9" style={{ background: headerGradient }}>
                      <Bike className="absolute -right-2 -top-2 h-16 w-16 text-white/10 pointer-events-none" strokeWidth={1.5} />
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
                      <svg
                        className="absolute bottom-0 left-0 w-full h-6 sm:h-7"
                        viewBox="0 0 300 28"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d="M0,28 C75,0 225,0 300,28 L300,28 L0,28 Z" fill="#111827" />
                      </svg>
                      <span className="absolute left-5 -bottom-3 z-10 inline-block bg-slate-900 border border-white/10 text-slate-200 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        {service.subtitle}
                      </span>
                    </div>

                    <div className="flex flex-col flex-grow px-5 pt-6 pb-5">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl sm:text-[34px] font-extrabold leading-none" style={{ color: '#FF7A18' }}>
                          {service.discountedPrice}/-
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500 line-through">{service.originalPrice}</span>
                      </div>

                      <ul className="list-none space-y-2 mb-6 flex-grow">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#FF7A18' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>

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

        {/* Areas Covered — Sarojini Nagar localities */}
        <section className="py-10 sm:py-14 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Bike, Scooty &amp; Car Service Areas in <span className="text-red-600">Sarojini Nagar</span>
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
              Whether you live in Sarojini Nagar Market, any of the Sarojini Nagar Blocks, Pilanji, Netaji Nagar, Kidwai Nagar East or West, Laxmi Bai Nagar, INA Colony, Safdarjung Enclave, Moti Bagh or near Dhaula Kuan, our bike, scooty and car mechanics reach your doorstep within 2-4 hours. Same-day doorstep service available across the Sarojini Nagar belt, starting at ₹299.
            </motion.p>
          </div>
        </section>

        {/* Vehicle Services We Offer */}
        <section className="py-12 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                Complete Bike, Scooty &amp; Car Care, <span className="text-red-600">Right at Your Door in Sarojini Nagar</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
                From routine oil changes to full engine repair — our Sarojini Nagar mechanics handle bikes, scooties and cars at your location, starting at ₹299. No waiting, no hassle.
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
                    alt={`${service.name} in Sarojini Nagar`}
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

        {/* Comprehensive SEO Content (Sarojini Nagar specific) */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Why Garage Fix Care is the <span className="text-red-600">Best Bike, Scooty and Car Service in Sarojini Nagar</span>
            </motion.h2>
            <motion.div
              className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p>Sarojini Nagar is one of South Delhi&apos;s best-connected residential neighbourhoods — a compact pocket of government colonies and housing blocks that sits right next to the bustling Sarojini Nagar Market, the Ring Road, INA Market, AIIMS and the Delhi Metro corridor. Residents here — many from central government quarters in Netaji Nagar, Kidwai Nagar East, Kidwai Nagar West, Laxmi Bai Nagar and Pilanji — rely on their bikes, scooties and cars for daily commutes to Bhikaji Cama Place, Safdarjung, Chanakyapuri, Moti Bagh and further into central Delhi. Garage Fix Care is Sarojini Nagar&apos;s trusted doorstep service for bikes, scooties and cars, with certified and background-verified mechanics arriving at your home, quarters or office within 2–4 hours of booking. Doorstep bike and scooty service in Sarojini Nagar starts at just ₹299 and covers all essential checks — engine oil change, air filter cleaning, spark plug inspection, brake adjustment and basic electrical check — completed on the spot without you needing to ride to a workshop. Car servicing is also available at your doorstep, with pricing quoted transparently based on your car&apos;s model and requirement. We service every major two-wheeler and four-wheeler brand seen across Sarojini Nagar, Netaji Nagar and the surrounding colonies — Hero, Honda, Bajaj, TVS, Suzuki, Yamaha, Royal Enfield, KTM, plus popular hatchbacks and sedans. What makes us the best bike, scooty and car service in Sarojini Nagar is our strict pricing transparency: you receive a full itemised estimate before any work begins, genuine Motul and Wurth engine oils, manufacturer-approved spare parts and a 10-day hassle-free service guarantee.</p>
              <p>The constant stop-and-go traffic around Sarojini Nagar Market and the Ring Road, the short in-colony trips between Sarojini Nagar, Netaji Nagar and INA Colony, and the dusty stretches near AIIMS and Safdarjung accelerate wear on engine oil, air filters, tyres and brakes — making regular servicing a safety necessity rather than a luxury, for bikes, scooties and cars alike. Our mechanics carry professional diagnostic tools to identify emerging issues before they turn into expensive failures, extending your vehicle&apos;s lifespan whether you commute daily to Bhikaji Cama Place and Chanakyapuri or simply drive within the colony. We also handle emergency breakdowns across Sarojini Nagar and nearby areas — if your bike, scooty or car stops near INA Market, Moti Bagh or on the Ring Road, call us and we dispatch a mechanic to your exact location immediately. From battery replacement and brake pad changes to clutch cable adjustment, tyre puncture repair and engine diagnostics, our technicians fix it all on the spot. Garage Fix Care has completed over 1,00,000 services across Delhi NCR and earned a consistent 4.7-star Google rating for professionalism, punctuality and honest pricing. Book your bike, scooty or car service in Sarojini Nagar, Sarojini Nagar Market, all Sarojini Nagar Blocks, Pilanji, Netaji Nagar, Kidwai Nagar East, Kidwai Nagar West, Laxmi Bai Nagar, INA, INA Colony, Safdarjung, Safdarjung Enclave, Bhikaji Cama Place, Chanakyapuri, Diplomatic Enclave, South Extension, Africa Avenue, Moti Bagh, Shanti Niketan, Anand Niketan, Satya Niketan, Dhaula Kuan, Vasant Vihar, R.K. Puram or Rama Krishna Puram — via our website, WhatsApp, or a direct call, and discover professional doorstep vehicle care starting at just ₹299.</p>
            </motion.div>
          </div>
        </section>

        {/* Warranty / Benefits Section */}
        <section className="py-10 sm:py-14 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-4 sm:gap-6 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <p className="text-xs sm:text-sm font-semibold text-orange-400 uppercase tracking-wide mb-1">
                Get Rs.10 Off On First Service in Sarojini Nagar
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                GarageFixCare <span className="text-red-600">Service Warranty</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                Sarojini Nagar&apos;s trusted doorstep bike, scooty and car service, starting at ₹299. We service all major motorcycle, scooter and car brands — Royal Enfield, Hero, Honda, Bajaj, TVS, Yamaha, KTM, and more — right at your home or office near Netaji Nagar and INA Colony.
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
                { img: warrantyImg, title: 'Enjoy a 10-Day Free Service Guarantee', desc: '10-Day Hassle-Free Warranty' },
                { img: pickupImg, title: 'Enjoy Free Pickup and Drop at Your Convenience', desc: 'Free Pick & Drop Available' },
                { img: transparentImg, title: 'Transparent Pricing, Competitive Rate', desc: 'Save up to 30% on your bike, scooty or car service' },
                { img: trainedImg, title: 'Skilled and Certified Mechanics', desc: 'Certified Bike, Scooty and Car Mechanics' },
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
              <img src={whyChooseImg} alt="Why Choose GarageFixCare in Sarojini Nagar" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div className="order-1 lg:order-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Why Choose <span className="text-red-600">GarageFixCare?</span>
              </h2>
              <p className="text-sm sm:text-base text-white mb-4">
                We bring certified mechanics for bikes, scooties and cars directly to residents of Sarojini Nagar, Netaji Nagar and INA Colony — doorstep service starting at ₹299, with honest pricing, genuine parts and zero hassle.
              </p>
              <ul className="space-y-2 text-left">
                {['Hassle-Free Doorstep Service', 'Certified and Skilled Technicians', 'Honest Pricing', 'Certified Genuine Parts', 'Your Satisfaction Guaranteed', 'Fast and Professional Service'].map(item => (
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
                Getting your bike, scooty or car serviced near Sarojini Nagar is simple. Book online or call us, and a skilled mechanic arrives at your doorstep with everything needed to get your vehicle running at its best — starting at ₹299, all done on the spot.
              </p>
              <ul className="space-y-2 text-left">
                {['Schedule Your Service', 'Technician Sent to You', 'Service Done on the Spot', 'Clear and Transparent Communication', 'Guaranteed Quality Service', 'Easy Payment & Feedback'].map(item => (
                  <li key={item} className="flex items-center text-white text-sm sm:text-base">
                    <span className="text-red-500 text-base mr-1">◆</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="flex justify-center" variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <img src={bmw310Image} alt="How GarageFixCare Works in Sarojini Nagar" className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm" loading="lazy" decoding="async" />
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
                { name: 'Vikram Bisht', img: testimonial1, text: 'Doorstep service in Sarojini Nagar was fast and professional.', time: 'a month ago' },
                { name: 'Pooja Rathi', img: testimonial2, text: 'Transparent billing with video evidence, booked from Netaji Nagar. Very reliable.', time: 'a month ago' },
                { name: 'Ravinder Negi', img: testimonial3, text: 'Great service near INA Colony, convenient and affordable.', time: 'a month ago' },
                { name: 'Simran Kaur', img: testimonial4, text: 'Quick response near Safdarjung Enclave, professional mechanic. Will recommend.', time: 'a month ago' },
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

        {/* FAQs (Sarojini Nagar specific) */}
        <section className="bg-slate-900 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Bike, Scooty &amp; Car Service in Sarojini Nagar — <span className="text-red-600">Common Questions</span>
            </motion.h2>
            <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              {[
                { q: 'Is bike service available in Sarojini Nagar?', a: 'Yes. Garage Fix Care provides doorstep bike service in Sarojini Nagar starting at just ₹299, with certified mechanics arriving at your home or office within 2–4 hours of booking.' },
                { q: 'Do you provide scooty repair in Sarojini Nagar?', a: 'Yes, we repair and service all scooties in Sarojini Nagar — Honda Activa, TVS Jupiter, Suzuki Access 125, Honda Dio and Hero Maestro — at your doorstep with genuine parts and transparent pricing.' },
                { q: 'Do you provide car service at home in Sarojini Nagar?', a: 'Yes. Alongside bikes and scooties, we offer doorstep car servicing in Sarojini Nagar and nearby areas. Car service pricing is quoted based on your car model and the work required — book online or call us for a quote.' },
                { q: 'What is the starting service price in Sarojini Nagar?', a: 'Bike and scooty service in Sarojini Nagar starts from ₹299 for 100–125cc vehicles (Basic Service). Standard Service (135–200 CC) is ₹399, Premium Service (220–300 CC) is ₹499, Complete Care (350–450 CC) is ₹599, and Luxury Care (above 500 CC) is ₹999. All prices include labour with no hidden charges.' },
                { q: 'Is doorstep vehicle service available in Sarojini Nagar?', a: 'Yes. Garage Fix Care is a doorstep-first service. Our certified mechanics arrive at your home, apartment or office in Sarojini Nagar fully equipped with tools, oils and parts — no garage visit needed.' },
                { q: 'Is same-day service available in Sarojini Nagar?', a: 'Yes. Same-day bike, scooty and car service is available across Sarojini Nagar and surrounding areas. Book before noon and our mechanic typically reaches you the same day.' },
                { q: 'Do you provide pickup and drop for vehicles in Sarojini Nagar?', a: 'Yes. Free pickup and drop is available for bikes, scooties and cars in Sarojini Nagar whenever the service requires taking the vehicle to our workshop for specialised work.' },
                { q: 'Which areas around Sarojini Nagar are covered?', a: 'We cover Sarojini Nagar, Sarojini Nagar Market, all Sarojini Nagar Blocks, Pilanji, Netaji Nagar, Kidwai Nagar East, Kidwai Nagar West, Laxmi Bai Nagar, INA Colony, Safdarjung Enclave, Moti Bagh, Dhaula Kuan, Vasant Vihar and R.K. Puram.' },
                { q: 'Do you cover Netaji Nagar and Kidwai Nagar?', a: 'Yes. Netaji Nagar, Kidwai Nagar East, Kidwai Nagar West, Laxmi Bai Nagar and Pilanji are all well within our regular doorstep service zone. Mechanics reach these areas within 2–4 hours for bikes, scooties and cars.' },
                { q: 'Do you cover INA Colony and Safdarjung Enclave?', a: 'Yes. INA, INA Colony, Safdarjung, Safdarjung Enclave and Bhikaji Cama Place are all covered for doorstep bike, scooty and car service with the same ₹299 starting price.' },
                { q: 'Do you cover Moti Bagh and Chanakyapuri?', a: 'Yes. Moti Bagh, Chanakyapuri, Diplomatic Enclave, South Extension and Africa Avenue are all covered for doorstep bike, scooty and car service, including oil change, brake repair and battery replacement.' },
                { q: 'Can you replace vehicle batteries at home in Sarojini Nagar?', a: 'Yes. We replace two-wheeler and car batteries at your doorstep in Sarojini Nagar using genuine, warranty-backed batteries, with installation included.' },
                { q: 'Do you repair brakes at your doorstep in Sarojini Nagar?', a: 'Yes. Brake pad replacement, brake shoe change and brake adjustment for bikes, scooties and cars are all done at your doorstep in Sarojini Nagar with genuine parts.' },
                { q: 'Do you handle engine repairs for bikes, scooties and cars in Sarojini Nagar?', a: 'Yes. From basic engine tuning to full engine overhaul, our certified mechanics handle engine repair for bikes, scooties and cars. Complex jobs are picked up and returned via our free pickup and drop service.' },
                { q: 'How can I book a vehicle service in Sarojini Nagar?', a: 'You can book via our website, WhatsApp us on 9540553759, or call directly. Share whether it is a bike, scooty or car, your location in Sarojini Nagar and your preferred time slot — we handle the rest.' },
                { q: 'Is pricing transparent after inspection?', a: 'Absolutely. We provide a full itemised cost estimate before starting any work, whether it is a bike, scooty or car. No surprise bills — what you see is exactly what you pay.' },
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
              Book Bike, Scooty or Car Service in Sarojini Nagar Today
            </h2>
            <p className="text-sm sm:text-base text-white mb-3 sm:mb-5 max-w-xl mx-auto">
              Same-day doorstep service starting at ₹299. Our mechanic comes to you — no travel, no waiting, no hidden charges.
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

export default BestBikeServiceSarojiniNagar;
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import BookService from './pages/BookService';
import Blog from './pages/Blog';
import Car from './pages/Car'; // ✅ ADD THIS LINE

// City Landing Pages — Bike
import BestBikeServiceNoida from './pages/BestBikeServiceNoida';
import BestBikeServiceDelhi from './pages/BestBikeServiceDelhi';
import BestBikeServiceGurgaon from './pages/BestBikeServiceGurgaon';
import BestBikeServiceGhaziabad from './pages/BestBikeServiceGhaziabad';
import BestBikeServiceDwarka from "./pages/BestBikeServiceDwarka";
import BestBikeServiceGreaterKailash from './pages/BestBikeServiceGreaterKailash';
import BestBikeServiceDefenceColony from './pages/BestBikeServiceDefenceColony';
import BestBikeServiceHauzKhas from './pages/BestBikeServiceHauzKhas';
import BestBikeServiceSaket from './pages/BestBikeServiceSaket';
import BestBikeServiceConnaughtPlace from './pages/BestBikeServiceConnaughtPlace';
import BestBikeServiceUttamNagar from './pages/BestBikeServiceUttamNagar';
import BestBikeServiceNewDelhi from './pages/BestBikeServiceNewDelhi';
import BestBikeServiceChanakyapuri from './pages/BestBikeServiceChanakyapuri';
import BestBikeServicePaharganj from './pages/BestBikeServicePaharganj';
import BestBikeServicePalam from './pages/BestBikeServicePalam';
import BestBikeServiceDelhiCantt from './pages/BestBikeServiceDelhiCantt';
import BestBikeServiceUdyogVihar from './pages/BestBikeServiceUdyogVihar';
import BestBikeServiceSushantLokPhase1 from './pages/BestBikeServiceSushantLokPhase1';
import BestBikeServiceSector56Gurugram from './pages/BestBikeServiceSector56Gurugram';
import BestBikeServiceSikanderpurGhosi from './pages/BestBikeServiceSikanderpurGhosi';
import BestBikeServiceIndirapuram from './pages/BestBikeServiceIndirapuram';
import BestBikeServiceVaishali from './pages/BestBikeServiceVaishali';
import BestBikeServiceGreaterNoidaWest from './pages/BestBikeServiceGreaterNoidaWest';

// City Landing Pages — Car
import BestCarServiceNoida from './pages/BestCarServiceNoida';
import BestCarServiceDelhi from './pages/BestCarServiceDelhi';
import BestCarServiceGurgaon from './pages/BestCarServiceGurgaon';
import BestCarServiceGhaziabad from './pages/BestCarServiceGhaziabad';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ✅ ADD THIS ROUTE */}
            <Route path="/car" element={<Car />} />

            {/* City Landing Pages — Bike */}
            <Route path="/best-bike-service-noida" element={<BestBikeServiceNoida />} />
            <Route path="/best-bike-service-delhi" element={<BestBikeServiceDelhi />} />
            <Route path="/best-bike-service-gurgaon" element={<BestBikeServiceGurgaon />} />
            <Route path="/best-bike-service-ghaziabad" element={<BestBikeServiceGhaziabad />} />
            <Route path="/best-bike-service-dwarka" element={<BestBikeServiceDwarka />} />
            <Route path="/best-bike-service-greater-kailash" element={<BestBikeServiceGreaterKailash />} />
            <Route path="/best-bike-service-defence-colony" element={<BestBikeServiceDefenceColony />} />
            <Route path="/best-bike-service-hauz-khas" element={<BestBikeServiceHauzKhas />} />
            <Route path="/best-bike-service-saket" element={<BestBikeServiceSaket />} />
            <Route path="/best-bike-service-connaught-place" element={<BestBikeServiceConnaughtPlace />} />
            <Route path="/best-bike-service-uttam-nagar" element={<BestBikeServiceUttamNagar />} />
            <Route path="/best-bike-service-new-delhi" element={<BestBikeServiceNewDelhi />} />
            <Route path="/best-bike-service-chanakyapuri" element={<BestBikeServiceChanakyapuri />} />
            <Route path="/best-bike-service-paharganj" element={<BestBikeServicePaharganj />} />
            <Route path="/best-bike-service-palam" element={<BestBikeServicePalam />} />
            <Route path="/best-bike-service-delhi-cantt" element={<BestBikeServiceDelhiCantt />} />
            <Route path="/best-bike-service-udyog-vihar" element={<BestBikeServiceUdyogVihar />} />
            <Route path="/best-bike-service-sushant-lok-phase-1" element={<BestBikeServiceSushantLokPhase1 />} />
            <Route path="/best-bike-service-sector-56-gurugram" element={<BestBikeServiceSector56Gurugram />} />
            <Route path="/best-bike-service-sikanderpur-ghosi" element={<BestBikeServiceSikanderpurGhosi />} />
            <Route path="/best-bike-service-indirapuram" element={<BestBikeServiceIndirapuram />} />
            <Route path="/best-bike-service-vaishali" element={<BestBikeServiceVaishali />} />
            <Route path="/best-bike-service-greater-noida-west" element={<BestBikeServiceGreaterNoidaWest />} />

            {/* City Landing Pages — Car */}
            <Route path="/best-car-service-noida" element={<BestCarServiceNoida />} />
            <Route path="/best-car-service-delhi" element={<BestCarServiceDelhi />} />
            <Route path="/best-car-service-gurgaon" element={<BestCarServiceGurgaon />} />
            <Route path="/best-car-service-ghaziabad" element={<BestCarServiceGhaziabad />} />

            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookService />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
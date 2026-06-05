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

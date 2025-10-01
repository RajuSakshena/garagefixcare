import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import BookService from './pages/BookService';
import Blog from './pages/Blog'; // Import the new Blog component

// Component to handle scrolling to the top on route changes
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
            
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookService />} />
             
            <Route path="/blog" element={<Blog />} /> {/* Add the route for the Blog page */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

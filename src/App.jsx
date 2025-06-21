import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import VerifyCertificate from './pages/VerifyCertificate';
import Contact from './pages/Contact';
import AnimatedCursor from './components/AnimatedCursor';
import Footer from './components/Footer';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'smooth' if you want smooth scrolling
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <AnimatedCursor />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}
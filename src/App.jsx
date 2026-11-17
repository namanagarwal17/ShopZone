import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Helper component to scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Footer Component
function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">Shop<span>Zone</span></span>
          </div>
          <p className="footer-desc">
            A high-performance Single Page Application (SPA) built with React,
            React Router DOM, and React Context API for Prodesk Sprint 6.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop Catalog</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Data Source</h4>
          <p className="footer-text">
            Powered by the public DummyJSON Products REST API.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopZone SPA. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

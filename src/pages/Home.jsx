import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=4');
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setFeaturedProducts(data.products || []);
          }
        }
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page">
      {/* Premium Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          {/* Hero Copy */}
          <div className="hero-text-col">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              <span>New Season Launch 2026</span>
            </div>
            <h1 className="hero-heading">
              Curated Essentials <br />
              <span className="hero-gradient-text">For Modern Living</span>
            </h1>
            <p className="hero-description">
              Discover a handpicked catalog of cutting-edge tech, premium lifestyle
              goods, and everyday home essentials. Enjoy guaranteed quality,
              transparent pricing, and swift doorstep delivery.
            </p>

            <div className="hero-btn-group">
              <Link to="/shop" className="btn btn-primary btn-lg hero-cta-btn">
                <span>Shop Collection</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Need Help? Contact Us
              </Link>
            </div>

            {/* Social Proof & Metrics */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-val">50k+</span>
                <span className="metric-lbl">Happy Customers</span>
              </div>
              <div className="metric-separator"></div>
              <div className="metric-item">
                <span className="metric-val">4.9 ★</span>
                <span className="metric-lbl">Verified Rating</span>
              </div>
              <div className="metric-separator"></div>
              <div className="metric-item">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Authentic Items</span>
              </div>
            </div>
          </div>

          {/* Hero Visual / Lifestyle Asset */}
          <div className="hero-visual-col">
            <div className="hero-visual-wrapper">
              <div className="hero-image-backdrop"></div>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="Premium Wireless Sound & Lifestyle Gadgets"
                className="hero-main-image"
                loading="eager"
              />

              {/* Floating Discount Badge */}
              <div className="floating-deal-badge">
                <span className="deal-icon">🔥</span>
                <div>
                  <span className="deal-title">Weekend Sale</span>
                  <span className="deal-discount">Up to 40% OFF</span>
                </div>
              </div>

              {/* Floating Product Highlight Card */}
              <Link to="/shop" className="floating-highlight-card">
                <div className="highlight-pill">Trending Now</div>
                <div className="highlight-content">
                  <span className="highlight-name">Wireless Hi-Fi Audio</span>
                  <span className="highlight-price">$199.99</span>
                </div>
                <span className="highlight-action">View In Catalog →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Value Proposition Section */}
      <section className="benefits-section" aria-label="Customer Benefits">
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon-wrapper">
              <span className="benefit-icon">🚚</span>
            </div>
            <div className="benefit-content">
              <h3>Free Express Shipping</h3>
              <p>Complimentary delivery on all orders over $50 with real-time tracking.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-wrapper">
              <span className="benefit-icon">🔒</span>
            </div>
            <div className="benefit-content">
              <h3>Secure Payments</h3>
              <p>Bank-grade 256-bit SSL encryption protecting every transaction.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-wrapper">
              <span className="benefit-icon">🔄</span>
            </div>
            <div className="benefit-content">
              <h3>30-Day Easy Returns</h3>
              <p>Not 100% satisfied? Return or exchange with no questions asked.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-wrapper">
              <span className="benefit-icon">🎧</span>
            </div>
            <div className="benefit-content">
              <h3>24/7 Priority Support</h3>
              <p>Our dedicated care specialists are always here to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Quick Links */}
      <section className="quick-categories-section">
        <div className="section-header-compact">
          <span className="section-eyebrow">Explore Collections</span>
          <h2 className="section-title-sm">Shop By Department</h2>
        </div>
        <div className="categories-pills-grid">
          {[
            { label: 'Smartphones & Tech', icon: '📱' },
            { label: 'Laptops & Office', icon: '💻' },
            { label: 'Fragrances & Beauty', icon: '✨' },
            { label: 'Home & Living', icon: '🛋️' },
            { label: 'Groceries & Gourmet', icon: '🥗' },
            { label: 'Fashion & Style', icon: '👟' },
          ].map((cat, idx) => (
            <Link key={idx} to="/shop" className="category-pill-card">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.label}</span>
              <span className="cat-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">Handpicked For You</span>
            <h2 className="section-title">Trending Products</h2>
            <p className="section-description">
              Customer favorites with top ratings and proven reliability.
            </p>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm">
            View All Products ({featuredProducts.length > 0 ? '30+' : '...'}) →
          </Link>
        </div>

        {loading ? (
          <div className="featured-skeleton-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="skeleton-card">
                <div className="skeleton-media"></div>
                <div className="skeleton-body">
                  <div className="skeleton-line title-line"></div>
                  <div className="skeleton-line desc-line"></div>
                  <div className="skeleton-line price-line"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="products-grid featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Final Promotional CTA Section */}
      <section className="lifestyle-promo-section">
        <div className="lifestyle-promo-card">
          <div className="promo-details">
            <span className="promo-badge">Limited Time Offer</span>
            <h2 className="promo-headline">
              Ready to Upgrade Your Everyday Gear?
            </h2>
            <p className="promo-text">
              Join thousands of satisfied shoppers. Browse our full catalog with
              real-time availability, clear specifications, and instant cart management.
            </p>
            <div className="promo-cta-wrapper">
              <Link to="/shop" className="btn btn-primary btn-lg promo-main-btn">
                Shop The Catalog Now 🛍️
              </Link>
              <Link to="/contact" className="btn btn-ghost promo-secondary-btn">
                Contact Customer Care
              </Link>
            </div>
          </div>
          <div className="promo-accent-pattern" aria-hidden="true"></div>
        </div>
      </section>
    </div>
  );
}

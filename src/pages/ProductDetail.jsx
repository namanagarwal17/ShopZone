import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  const [addedMessage, setAddedMessage] = useState('');

  const fetchProductDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? `Product #${id} was not found.`
            : `Failed to load product (HTTP ${response.status})`
        );
      }
      const data = await response.json();
      setProduct(data);
      setActiveImage(data.thumbnail || (data.images && data.images[0]));
    } catch (err) {
      setError(err.message || 'Error loading product details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    setQuantity(1);
    setAddedMessage('');
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedMessage(`Added ${quantity} × "${product.title}" to your cart!`);
    setTimeout(() => {
      setAddedMessage('');
    }, 3500);
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/shop">Shop</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">
          {product ? product.title : `Product #${id}`}
        </span>
      </nav>

      {/* Loading State */}
      {loading && (
        <div className="state-container loading-state">
          <div className="spinner"></div>
          <p>Fetching product details for item #{id}...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="state-container error-state">
          <div className="error-icon">⚠️</div>
          <h3>Product Not Found</h3>
          <p>{error}</p>
          <div className="state-actions">
            <button className="btn btn-primary" onClick={fetchProductDetail}>
              Try Again
            </button>
            <Link to="/shop" className="btn btn-outline">
              Back to Shop
            </Link>
          </div>
        </div>
      )}

      {/* Product Content */}
      {!loading && !error && product && (
        <div className="product-detail-card">
          {/* Gallery / Images Section */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={activeImage || product.thumbnail}
                alt={product.title}
                className="main-product-image"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-strip">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${product.title} thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details / Actions Section */}
          <div className="product-info-column">
            <div className="product-category-tag">{product.category}</div>
            <h1 className="product-detail-title">{product.title}</h1>

            <div className="product-meta-row">
              {product.brand && (
                <span className="product-brand">
                  Brand: <strong>{product.brand}</strong>
                </span>
              )}
              {product.rating && (
                <span className="product-rating">
                  ⭐ {product.rating} / 5
                </span>
              )}
              {product.stock !== undefined && (
                <span className="product-stock-tag in-stock">
                  ✓ In Stock ({product.stock} available)
                </span>
              )}
            </div>

            <div className="product-price-section">
              <div className="price-tag">
                <span className="currency">$</span>
                <span className="amount">{product.price.toFixed(2)}</span>
              </div>
              {product.discountPercentage && (
                <span className="discount-tag">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="product-description-block">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Notification message when added */}
            {addedMessage && (
              <div className="add-success-banner" role="status">
                <span className="success-icon">✓</span>
                <span>{addedMessage}</span>
                <Link to="/cart" className="view-cart-link">
                  View Cart →
                </Link>
              </div>
            )}

            {/* Quantity Selector and Add to Cart Button */}
            <div className="purchase-controls">
              <div className="quantity-selector">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-add-cart"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
            </div>

            <div className="product-perks">
              <div className="perk-item">
                <span>📦</span>
                <span>Free standard shipping worldwide</span>
              </div>
              <div className="perk-item">
                <span>🛡️</span>
                <span>1 Year Manufacturer Warranty</span>
              </div>
              <div className="perk-item">
                <span>🔄</span>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

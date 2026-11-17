import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-media">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="product-card-img"
        />
        <span className="product-badge">{product.category}</span>
      </Link>

      <div className="product-card-body">
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        
        <p className="product-card-desc">
          {product.description
            ? product.description.slice(0, 75) + (product.description.length > 75 ? '...' : '')
            : ''}
        </p>

        <div className="product-card-footer">
          <div className="product-price-wrapper">
            <span className="currency">$</span>
            <span className="price-amount">{product.price.toFixed(2)}</span>
          </div>
          <Link to={`/product/${product.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/products?limit=30');
      if (!response.ok) {
        throw new Error(`Failed to fetch products (HTTP ${response.status})`);
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Unique categories list
  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products based on search term and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-page">
      <header className="page-header">
        <h1 className="page-title">Explore Catalog</h1>
        <p className="page-subtitle">
          Browse our collection fetched directly from DummyJSON Products API.
        </p>
      </header>

      {/* Filter & Search Bar */}
      <div className="shop-controls">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-filter-wrapper">
          <label htmlFor="category-select" className="filter-label">Category:</label>
          <select
            id="category-select"
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="state-container loading-state">
          <div className="spinner"></div>
          <p>Loading products from catalog...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="state-container error-state">
          <div className="error-icon">⚠️</div>
          <h3>Failed to Load Products</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchProducts}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty Filtered State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="state-container empty-state">
          <div className="empty-icon">📦</div>
          <h3>No Products Found</h3>
          <p>We couldn't find any products matching your search criteria.</p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

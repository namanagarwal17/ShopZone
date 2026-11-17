import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <header className="page-header">
          <h1 className="page-title">Your Shopping Cart</h1>
        </header>

        <div className="state-container empty-cart-state">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>
            Looks like you haven't added anything to your cart yet. Explore our
            shop and find something you love!
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="page-header">
        <h1 className="page-title">Your Shopping Cart</h1>
        <p className="page-subtitle">
          Review your items ({totalItems} {totalItems === 1 ? 'item' : 'items'}) before proceeding.
        </p>
      </header>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-section">
          <div className="cart-table-header">
            <span className="col-product">Product</span>
            <span className="col-price">Price</span>
            <span className="col-qty">Quantity</span>
            <span className="col-total">Subtotal</span>
            <span className="col-action">Action</span>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => {
              const itemTotal = (item.price * item.quantity).toFixed(2);
              return (
                <div key={item.id} className="cart-item-row">
                  <div className="col-product item-product-info">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-item-thumb"
                    />
                    <div className="item-text">
                      <Link to={`/product/${item.id}`} className="item-title">
                        {item.title}
                      </Link>
                      {item.category && (
                        <span className="item-category">{item.category}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-price item-unit-price">
                    ${item.price.toFixed(2)}
                  </div>

                  <div className="col-qty item-qty-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="col-total item-total-price">
                    ${itemTotal}
                  </div>

                  <div className="col-action item-remove-col">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-actions-bar">
            <Link to="/shop" className="btn btn-outline">
              ← Continue Shopping
            </Link>
            <button
              type="button"
              className="btn btn-ghost text-danger"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="cart-summary-sidebar">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span className="summary-value">{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-value">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Standard Shipping</span>
              <span className="summary-value text-success">Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Estimated Total</span>
              <span className="total-amount">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="checkout-note">
              <span className="note-icon">ℹ️</span>
              <span>Checkout is disabled (Phase 3 out-of-scope). Cart is maintained in React Context state.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import React, { createContext, useContext, useState } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Custom hook for convenient access to CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart - increments quantity if product already exists
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Product exists: update quantity immutably
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Product does not exist: append new item with initial quantity
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category,
            quantity: quantity,
          },
        ];
      }
    });
  };

  // Remove single item completely from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Update item quantity directly (with minimum of 1)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Dynamic calculations for navbar badge and order summary
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice: Number(totalPrice.toFixed(2)),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

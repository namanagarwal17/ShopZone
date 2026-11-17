# ShopZone – E-commerce SPA

ShopZone is a modern single-page e-commerce application built using React. It allows users to browse products, view detailed product information, manage a shopping cart, and navigate between pages without full page reloads.

## Features

- **Home Page:** Modern landing page with promotional sections, featured products and category navigation.
- **Product Catalog:** Fetches products dynamically from the DummyJSON API.
- **Product Details:** Displays individual product information using dynamic route parameters.
- **Shopping Cart:** Add products, update quantities, remove items and calculate the total price.
- **Global Navigation:** Persistent navbar with a dynamic cart item counter.
- **Contact Form:** Form validation with submission confirmation.
- **Responsive Design:** Optimized for desktop and mobile screens.

## Tech Stack

- React 19
- Vite
- JavaScript (JSX)
- React Router DOM
- Context API
- CSS
- DummyJSON Products API

## Application Architecture

The application follows a component-based structure:

- **Pages:** Home, Shop, Product Details, Cart, Contact and Not Found.
- **Components:** Reusable Navbar and ProductCard components.
- **Context:** Centralized cart state management through CartContext.

## Key React Concepts

- Client-side routing with BrowserRouter, Routes and Link.
- Dynamic routing using useParams.
- State management using useState.
- Global state sharing using Context API.
- Side effects and API integration using useEffect.
- Immutable state updates for cart operations.

## API Integration

Product data is fetched from the DummyJSON API:

`https://dummyjson.com/products`

Individual product details are retrieved using:

`https://dummyjson.com/products/:id`

## Project Scope

The project implements Phase 1 (P0) and Phase 2 (P1) requirements. Cart data is maintained in React state and is not persisted after a browser refresh.

## Developer

Developed as part of the Prodesk Internship – Sprint 6.

## Deploy link
Link : https://shop-zone-kappa.vercel.app/shop

import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="state-container not-found-state">
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Back to Home 🏠
        </Link>
      </div>
    </div>
  );
}

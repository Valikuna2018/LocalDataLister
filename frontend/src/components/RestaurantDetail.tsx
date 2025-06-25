// frontend/src/components/RestaurantDetail.tsx

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Restaurant } from '../types';

const API_URL = 'http://localhost:5000/api/restaurants';

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<Restaurant[]>(API_URL)
      .then(res => {
        const found = res.data.find(r => r.id === Number(id));
        if (found) setRestaurant(found);
        else setError('Restaurant not found.');
      })
      .catch(() => setError('Failed to load data.'));
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }
  if (!restaurant) {
    return <div className="rdl-loading">Loading...</div>;
  }

  return (
    <div className="rdl-detail-container">
      <button className="rdl-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="rdl-card">
        <img
          className="rdl-image"
          src={restaurant.imageUrl}
          alt={restaurant.name}
        />
        <div className="rdl-info">
          <h2 className="rdl-title">{restaurant.name}</h2>
          <div className="rdl-tags">
            <span className="rdl-tag">{restaurant.cuisine}</span>
            <span className="rdl-rating">
              <span className="rdl-star">★</span> {restaurant.rating} / 5
            </span>
          </div>
          <p className="rdl-address">{restaurant.address}</p>
          <p className="rdl-description">{restaurant.description}</p>
        </div>
      </div>
    </div>
  );
}

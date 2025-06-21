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
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '1.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: 'none',
          background: '#2c3e50',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginBottom: '1rem' }}>{restaurant.name}</h2>
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      />

      <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
      <p><strong>Rating:</strong> {restaurant.rating} / 5</p>
      <p><strong>Address:</strong> {restaurant.address}</p>
      <p style={{ marginTop: '1rem', lineHeight: 1.5 }}>
        {restaurant.description}
      </p>
    </div>
  );
}

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

/* Add the following CSS to your global stylesheet or in a CSS module:

.rdl-detail-container {
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
  min-height: 100vh;
  padding: 3rem 0;
}

.rdl-back-btn {
  margin: 0 0 2rem 2rem;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  border: none;
  background: #34495e;
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.rdl-back-btn:hover {
  background: #22313a;
}

.rdl-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(44, 62, 80, 0.08);
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.rdl-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-bottom: 1px solid #eaeaea;
}

.rdl-info {
  padding: 2rem;
}

.rdl-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.rdl-tags {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.rdl-tag {
  background: #eaf6ff;
  color: #2980b9;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
}

.rdl-rating {
  background: #fff7e6;
  color: #f39c12;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.rdl-star {
  font-size: 1.1em;
  color: #f39c12;
}

.rdl-address {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.rdl-description {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #34495e;
}

.rdl-loading {
  text-align: center;
  margin-top: 4rem;
  font-size: 1.3rem;
  color: #888;
}
*/

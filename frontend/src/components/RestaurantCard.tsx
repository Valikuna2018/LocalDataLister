// frontend/src/components/RestaurantCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import type { Restaurant } from '../types';
import './RestaurantCard.css';
import StarRating from './StarRating';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="card-link">
      <div className="card">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="card-img"
        />
        <div className="card-content">
          <h3 className="card-title">{restaurant.name}</h3>
          
          <div className="card-details">
            <span className="cuisine-badge">{restaurant.cuisine}</span>
            
            <div className="rating-container">
              <StarRating rating={restaurant.rating} />
              <span className="rating-text">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="card-description">
            {restaurant.description}
          </p>
          <p className="card-address">
            {restaurant.address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

import React from 'react';
import type { Restaurant } from '../types';
import './RestaurantCard.css';
import StarRating from './StarRating'; // 1. IMPORT our new component

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="card">
      <img src={restaurant.imageUrl} alt={restaurant.name} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{restaurant.name}</h3>
        
        <div className="card-details">
          <span className="cuisine-badge">{restaurant.cuisine}</span>
          
          {/* 2. REPLACE the old text rating with our new component */}
          <div className="rating-container">
            <StarRating rating={restaurant.rating} />
            <span className="rating-text">{restaurant.rating.toFixed(1)}</span>
          </div>

        </div>

        <p className="card-description">{restaurant.description}</p>
        <p className="card-address">{restaurant.address}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
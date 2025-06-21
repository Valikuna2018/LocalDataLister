import React from 'react';
import type { Restaurant } from '../types';
import './RestaurantCard.css';

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
          <span>{restaurant.cuisine}</span>
          <span>⭐ {restaurant.rating} / 5</span>
        </div>
        <p className="card-description">{restaurant.description}</p>
        <p className="card-address">{restaurant.address}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
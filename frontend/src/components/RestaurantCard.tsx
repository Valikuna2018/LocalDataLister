import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Restaurant } from '../types';
import './RestaurantCard.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="card-img"
      />
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

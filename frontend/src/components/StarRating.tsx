import React from 'react';
import './StarRating.css'; // We will create this CSS file next

interface StarRatingProps {
  // The rating to display, e.g., 4.7
  rating: number;
  // The maximum possible rating, defaults to 5
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  // We use useMemo to avoid re-calculating on every render, which is a good practice.
  const stars = React.useMemo(() => {
    const starElements = [];
    
    // Loop from 1 to the maximum rating (e.g., 1 to 5)
    for (let i = 1; i <= maxRating; i++) {
      let starClass = 'star';
      if (i <= rating) {
        // This star should be full
        starClass += ' full';
      } else if (i - 0.5 <= rating) {
        // This star should be a half-star
        starClass += ' half';
      } else {
        // This star should be empty
        starClass += ' empty';
      }
      starElements.push(<span key={i} className={starClass}>★</span>);
    }
    return starElements;

  }, [rating, maxRating]);

  return (
    <div className="star-rating" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      {stars}
    </div>
  );
};

export default StarRating;
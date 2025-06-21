import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import type { Restaurant } from './types';
import RestaurantCard from './components/RestaurantCard';
import './App.css';

// The URL for our backend API.
const API_URL = 'http://localhost:5000/api/restaurants';

function App() {
  // State for the full list of restaurants from the API
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // State for the user's search query
  const [searchTerm, setSearchTerm] = useState('');
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Restaurant[]>(API_URL);
        setRestaurants(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
        setError('Failed to load data. Please make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // The empty array [] means this effect runs only once

  // useMemo to efficiently filter restaurants whenever the search term or list changes
  const filteredRestaurants = useMemo(() => {
    if (!searchTerm) {
      return restaurants;
    }
    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [restaurants, searchTerm]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kutaisi Restaurant Lister</h1>
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main className="app-main">
        {loading && <p>Loading restaurants...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && (
          <div className="restaurant-grid">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}

        {!loading && filteredRestaurants.length === 0 && searchTerm && (
          <p>No restaurants found matching your search.</p>
        )}
      </main>
    </div>
  );
}

export default App;
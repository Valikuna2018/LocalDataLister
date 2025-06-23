import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import type { Restaurant } from './types';
import RestaurantCard from './components/RestaurantCard';
import RestaurantDetail from './components/RestaurantDetail';
import './App.css';
import { Routes, Route } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/restaurants';

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');             // ← new
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Restaurant[]>(API_URL);
        setRestaurants(response.data);
        setError(null);
      } catch {
        setError('Failed to load data. Please make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = useMemo(() => {
    let data = restaurants;

    // 1️⃣ filter by search
    if (searchTerm) {
      data = data.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2️⃣ sort by rating
    if (sortOption === 'high-to-low') {
      data = [...data].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'low-to-high') {
      data = [...data].sort((a, b) => a.rating - b.rating);
    }

    return data;
  }, [restaurants, searchTerm, sortOption]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <header className="app-header">
              <h1>Kutaisi Restaurant Lister</h1>

              <div className="controls">
                <input
                  type="text"
                  placeholder="Search by name or cuisine..."
                  className="search-bar"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />

                <select
                  className="sort-dropdown"
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                >
                  <option value="">Sort by rating</option>
                  <option value="high-to-low">Rating: High → Low</option>
                  <option value="low-to-high">Rating: Low → High</option>
                </select>
              </div>
            </header>

            <main className="app-main">
              {loading && <p>Loading restaurants...</p>}
              {error && <p className="error-message">{error}</p>}

              {!loading && !error && (
                <div className="restaurant-grid">
                  {filteredRestaurants.map(r => (
                    <RestaurantCard key={r.id} restaurant={r} />
                  ))}
                </div>
              )}

              {!loading && filteredRestaurants.length === 0 && searchTerm && (
                <div className="no-results-message">
                  <p>No restaurants found matching your search.</p>
                </div>
              )}
            </main>
          </div>
        }
      />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
    </Routes>
  );
}

export default App;

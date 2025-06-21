import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import restaurants from './data/restaurants.json'; // TypeScript can import JSON files directly
import { Restaurant } from './types';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// The main API endpoint
app.get('/api/restaurants', (req: Request, res: Response) => {
  // We explicitly type the data to ensure it matches our interface
  const data: Restaurant[] = restaurants;
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});
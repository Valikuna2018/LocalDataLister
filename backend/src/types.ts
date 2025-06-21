// This interface defines the shape of our restaurant data.
// We will share this structure with the frontend.
export interface Restaurant {
  id: number;
  name: string;
  cuisine: string; // e.g., "Georgian", "European", "Steakhouse"
  address: string;
  rating: number; // A number from 1 to 5
  description: string;
  imageUrl: string; // A URL to a representative image
}
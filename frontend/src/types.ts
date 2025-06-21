// This interface MUST match the one in the backend.
// In a more advanced setup, this could be a shared package.
export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  address: string;
  rating: number;
  description: string;
  imageUrl: string;
}
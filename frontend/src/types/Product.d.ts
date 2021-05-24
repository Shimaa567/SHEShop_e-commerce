export interface Product {
  _id: string | number | undefined;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: string | number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews?: string[];
}

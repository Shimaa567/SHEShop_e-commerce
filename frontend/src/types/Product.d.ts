export interface Product {
  _id: string | number | undefined;
  name: string | undefined;
  image: string | undefined;
  description: string | undefined;
  brand: string | undefined;
  category: string | undefined;
  price: string | number | undefined;
  countInStock: number | string;
  rating: number;
  numReviews?: number | undefined;
  reviews?: string[] | undefined;
}

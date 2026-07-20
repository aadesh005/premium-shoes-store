export interface Product {
  id: string;
  name: string;
  price: number; // in PKR
  originalPrice?: number; // in PKR (for discount display)
  rating: number;
  reviewsCount: number;
  description: string;
  longDescription: string;
  category: 'Sneakers' | 'Sandals' | 'Leather Shoes';
  gender: 'Men' | 'Women' | 'Unisex';
  images: string[];
  colors: string[];
  sizes: number[];
  badge?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'grains' | 'livestock' | 'produce';
  price: number;
  unit: string;
  location: string;
  grade: string;
  quantity: number;
  imageUrl: string;
  description: string;
  certifications: string[];
  harvestDate: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'wholesaler';
  location: string;
}
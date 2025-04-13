import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

const products: Record<string, Product> = {
  // Regular products
  '1': {
    id: '1',
    title: 'Premium Organic Coffee',
    description: 'High-quality organic coffee beans from sustainable farms. Perfect for coffee enthusiasts who appreciate rich flavor and ethical sourcing.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1541692641319-98172eda766f?auto=format&fit=crop&q=80',
    category: 'Beverages',
    rating: 4.8,
    reviews: 120,
    inStock: true
  },
  '2': {
    id: '2',
    title: 'Fresh Organic Vegetables',
    description: 'Locally sourced organic vegetables, freshly harvested and packed with nutrients. Perfect for healthy meals and snacks.',
    price: 800,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80',
    category: 'Produce',
    rating: 4.6,
    reviews: 95,
    inStock: true
  },
  '3': {
    id: '3',
    title: 'Artisanal Bread',
    description: 'Handcrafted bread made with organic flour and natural ingredients. Perfect for sandwiches or as a side to your meals.',
    price: 600,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
    category: 'Bakery',
    rating: 4.7,
    reviews: 85,
    inStock: true
  },
  // Discounted products
  'd1': {
    id: 'd1',
    title: 'Organic Rice',
    description: 'Premium quality organic rice, perfect for daily meals. Rich in nutrients and grown sustainably.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    category: 'Grains',
    rating: 4.5,
    reviews: 75,
    inStock: true
  },
  'd2': {
    id: 'd2',
    title: 'Fresh Dairy Milk',
    description: 'Fresh, pasteurized milk from grass-fed cows. Rich in calcium and essential nutrients.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80',
    category: 'Dairy',
    rating: 4.4,
    reviews: 60,
    inStock: true
  },
  'd3': {
    id: 'd3',
    title: 'Organic Honey',
    description: 'Pure, raw honey from local beekeepers. Natural sweetener with numerous health benefits.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80',
    category: 'Sweeteners',
    rating: 4.9,
    reviews: 110,
    inStock: true
  },
  // Weekly offers
  'w1': {
    id: 'w1',
    title: 'Bulk Corn Supply',
    description: 'High-quality corn supply for wholesale buyers. Perfect for food processing and animal feed.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1601263426287-c6c51f8d5400?auto=format&fit=crop&q=80',
    category: 'Grains',
    rating: 4.3,
    reviews: 45,
    inStock: true
  },
  'w2': {
    id: 'w2',
    title: 'Fresh Dairy Cattle',
    description: 'Healthy dairy cattle for farm expansion. Vaccinated and ready for production.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80',
    category: 'Livestock',
    rating: 4.7,
    reviews: 30,
    inStock: true
  },
  'w3': {
    id: 'w3',
    title: 'Organic Rice',
    description: 'Premium quality organic rice, perfect for daily meals. Rich in nutrients and grown sustainably.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    category: 'Grains',
    rating: 4.5,
    reviews: 75,
    inStock: true
  }
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');

  const product = id ? products[id] : null;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#2E8B57] text-white px-6 py-3 rounded-md hover:bg-[#256F3A] transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: `/product/${id}` } });
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
    
    // Show notification
    setNotification(`${product.title} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-[#2E8B57] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-2xl font-bold text-[#2E8B57]">₵{product.price.toFixed(2)}</p>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#2E8B57] text-white px-6 py-3 rounded-md hover:bg-[#256F3A] transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>

          <div className="flex items-center text-gray-600">
            <Truck className="w-5 h-5 mr-2" />
            <span>Free shipping on orders over ₵1000</span>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Category:</span> {product.category}
              </li>
              <li>
                <span className="font-medium">Availability:</span>{' '}
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
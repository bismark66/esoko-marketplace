import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import ProductFilters from '../components/ProductFilters';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Sample product data - in a real app this would come from an API
const products = {
  grains: [
    {
      id: '1',
      name: 'Premium Wheat',
      price: 320,
      unit: 'ton',
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80',
      grade: 'Grade A',
      seller: { name: 'Midwest Grain Co.', rating: 4.8 }
    },
    {
      id: '4',
      name: 'Organic Rice',
      price: 550,
      unit: 'ton',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80',
      grade: 'Organic',
      seller: { name: 'Pacific Farms', rating: 4.9 }
    },
    {
      id: '7',
      name: 'Yellow Corn',
      price: 280,
      unit: 'ton',
      imageUrl: 'https://images.unsplash.com/photo-1592985684811-6c0f98adb014?auto=format&fit=crop&q=80',
      grade: 'Grade B',
      seller: { name: 'Heartland Suppliers', rating: 4.6 }
    }
  ],
  livestock: [
    {
      id: '3',
      name: 'Angus Cattle',
      price: 2100,
      unit: 'head',
      imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80',
      grade: 'Prime',
      seller: { name: 'Western Ranch Supplies', rating: 4.7 }
    },
    {
      id: '5',
      name: 'Merino Sheep',
      price: 450,
      unit: 'head',
      imageUrl: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80',
      grade: 'Premium',
      seller: { name: 'Mountain Meadows Farm', rating: 4.7 }
    },
    {
      id: '9',
      name: 'Heritage Pigs',
      price: 700,
      unit: 'head',
      imageUrl: 'https://images.unsplash.com/photo-1512153493142-fc2da847cb3d?auto=format&fit=crop&q=80',
      grade: 'Premium',
      seller: { name: 'Heritage Farms', rating: 4.8 }
    }
  ],
  produce: [
    {
      id: '2',
      name: 'Organic Soybeans',
      price: 450,
      unit: 'ton',
      imageUrl: 'https://images.unsplash.com/photo-1601263426287-c6c51f8d5400?auto=format&fit=crop&q=80',
      grade: 'Organic',
      seller: { name: 'Green Fields Organic', rating: 4.9 }
    },
    {
      id: '6',
      name: 'Fresh Apples',
      price: 1200,
      unit: 'ton',
      imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80',
      grade: 'Premium',
      seller: { name: 'Orchard Valley', rating: 4.8 }
    },
    {
      id: '8',
      name: 'Organic Vegetables',
      price: 1800,
      unit: 'ton',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80',
      grade: 'Organic',
      seller: { name: 'Fresh Earth Farms', rating: 4.9 }
    }
  ]
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'grains' | 'livestock' | 'produce'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState('');
  
  // Get all products
  const allProducts = Object.values(products).flat();
  
  // Filter products based on active category
  const displayedProducts = activeCategory === 'all' 
    ? allProducts 
    : products[activeCategory as keyof typeof products];

    const handleAddToCart = (product: Product) => {
      if (!isAuthenticated) {
        navigate('/signin', { state: { from: '/products' } });
        return;
      }
  
      addToCart({
        id: product.id,
        title: product.name,
        price: product.discountedPrice,
        image: product.imageUrl
      });
      
      // Show notification
      setNotification(`${product.name} added to cart!`);
      setTimeout(() => setNotification(''), 3000);
    };
  
    const handleViewDetails = (productId: string) => {
      navigate(`/product/${productId}`);
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agricultural Products</h1>
        <p className="mt-2 text-gray-600">Browse our selection of high-quality farm products</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products,inputs,fertilizers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8">
          <ProductFilters />
        </div>
      )}
      
      {/* Category Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex space-x-8">
          {['all', 'grains', 'livestock', 'produce'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as any)}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeCategory === category
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProducts.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 h-48 relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                {product.grade}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                {product.name}
              </h3>
              <p className="text-blue-600 font-medium mt-1 flex items-center justify-between">
                <div className='flex-1'>${product.price}/{product.unit}</div>
                <button
                    // onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#2E8B57]/90 transition-colors"
                  >
                    Add to Cart
                  </button>
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{product.seller.name}</span>
                <span className="text-sm text-blue-600">★ {product.seller.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
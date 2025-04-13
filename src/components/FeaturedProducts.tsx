import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductFilters from './ProductFilters';

const products = [
  {
    id: '1',
    name: 'Premium Wheat',
    price: 320,
    unit: 'ton',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80',
    grade: 'Grade A',
    location: 'midwest',
    condition: 'premium'
  },
  {
    id: '2',
    name: 'Organic Soybeans',
    price: 450,
    unit: 'ton',
    imageUrl: 'https://images.unsplash.com/photo-1601263426287-c6c51f8d5400?auto=format&fit=crop&q=80',
    grade: 'Organic',
    location: 'northeast',
    condition: 'organic'
  },
  {
    id: '3',
    name: 'Angus Cattle',
    price: 210,
    unit: 'head',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80',
    grade: 'Prime',
    location: 'west',
    condition: 'premium'
  },
];

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filters: any) => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesCondition = filters.condition === 'all' || product.condition === filters.condition;
      const matchesLocation = filters.location === 'all' || product.location === filters.location;
      
      return matchesSearch && matchesPrice && matchesCondition && matchesLocation;
    });
    
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: typeof products[0]) => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/products' } });
      return;
    }

    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.imageUrl
    });
  };

  return (
    <section className="py-16  bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#2E8B57] text-white px-3 py-1 rounded-full text-sm">
                    {product.grade}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xl font-bold text-[#2E8B57]">
                    ₵{product.price}/{product.unit}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#8B4513] text-white px-4 py-2 rounded-full hover:bg-[#6B3410] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
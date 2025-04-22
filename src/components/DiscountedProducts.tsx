import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  unit: string;
  imageUrl: string;
  discount: string;
}

const DiscountedProducts = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState("");

  const discountedProducts: Product[] = [
    {
      id: "d1",
      name: "Fresh Tomatoes",
      originalPrice: 120,
      discountedPrice: 90,
      unit: "kg",
      imageUrl:
        "https://images.unsplash.com/photo-1592841200221-1907caa581f7?auto=format&fit=crop&q=80",
      discount: "25%",
    },
    {
      id: "d2",
      name: "Organic Potatoes",
      originalPrice: 80,
      discountedPrice: 64,
      unit: "kg",
      imageUrl:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80",
      discount: "20%",
    },
    {
      id: "d3",
      name: "Premium Rice",
      originalPrice: 150,
      discountedPrice: 120,
      unit: "kg",
      imageUrl:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80",
      discount: "20%",
    },
  ];

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/products" } });
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.name,
        price: product.discountedPrice,
        image: product.imageUrl,
      },
    });

    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notification */}
        {notification && (
          <div className="fixed top-20 right-4 bg-[#2E8B57] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
            {notification}
          </div>
        )}
      
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Discounted Products</h2>
          <p className="mt-4 text-lg text-gray-600">Special offers on our best-selling items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {discountedProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="relative h-64">
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  Save {product.discount}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#2E8B57]">
                      ₵{product.discountedPrice}
                    </span>
                    <span className="text-sm text-gray-600">/{product.unit}</span>
                  </div>
                  <span className="text-gray-500 line-through">
                    ₵{product.originalPrice}/{product.unit}
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#2E8B57]/90 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="flex-1 border border-[#2E8B57] text-[#2E8B57] px-4 py-2 rounded-md hover:bg-[#2E8B57]/10 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountedProducts;
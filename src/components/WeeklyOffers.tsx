import React, { useState } from 'react';
import { Calendar, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface WeeklyOffer {
  id: string;
  name: string;
  originalPrice: number;
  offerPrice: number;
  unit: string;
  imageUrl: string;
  validUntil: string;
  savings: string;
}

const WeeklyOffers = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState("");
  // Removed destructuring as dispatch is a function

  const weeklyOffers: WeeklyOffer[] = [
    {
      id: "w1",
      name: "Bulk Corn Supply",
      originalPrice: 280,
      offerPrice: 245,
      unit: "ton",
      imageUrl:
        "https://images.unsplash.com/photo-1601263426287-c6c51f8d5400?auto=format&fit=crop&q=80",
      validUntil: "2024-03-20",
      savings: "12%",
    },
    {
      id: "w2",
      name: "Fresh Dairy Cattle",
      originalPrice: 1800,
      offerPrice: 1620,
      unit: "head",
      imageUrl:
        "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80",
      validUntil: "2024-03-22",
      savings: "10%",
    },
    {
      id: "w3",
      name: "Organic Rice",
      originalPrice: 950,
      offerPrice: 807,
      unit: "ton",
      imageUrl:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80",
      validUntil: "2024-03-25",
      savings: "15%",
    },
  ];

  const handleViewDetails = (offerId: string) => {
    navigate(`/product/${offerId}`);
  };

  const handleAddToCart = (offer: WeeklyOffer) => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/" } });
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: offer.id,
        title: offer.name,
        price: offer.offerPrice,
        image: offer.imageUrl,
      },
    });

    // Show notification
    setNotification(`${offer.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notification */}
        {notification && (
          <div className="fixed top-20 right-4 bg-[#2E8B57] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
            {notification}
          </div>
        )}

        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-8 h-8 text-[#2E8B57]" />
          <h2 className="text-3xl font-bold text-gray-900">
            Weekly Special Offers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weeklyOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={offer.imageUrl}
                  alt={offer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  Save {offer.savings}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {offer.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#2E8B57]">
                      ₵{offer.offerPrice}
                    </span>
                    <span className="text-sm text-gray-600">/{offer.unit}</span>
                  </div>
                  <span className="text-gray-500 line-through">
                    ₵{offer.originalPrice}/{offer.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Valid until{" "}
                    {new Date(offer.validUntil).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleAddToCart(offer)}
                    className="flex-1 bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#2E8B57]/90 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleViewDetails(offer.id)}
                    className="flex-1 bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#2E8B57]/90 transition-colors"
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

export default WeeklyOffers;
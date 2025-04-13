import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      // TODO: Replace with actual API call
      // For now, we'll simulate a search with mock data
      setLoading(true);
      setTimeout(() => {
        setResults([
          {
            id: '1',
            title: 'Premium Organic Coffee',
            description: 'High-quality organic coffee beans from sustainable farms',
            price: 1200,
            image: 'https://images.unsplash.com/photo-1541692641319-98172eda766f?auto=format&fit=crop&q=80'
          },
          {
            id: '2',
            title: 'Fresh Organic Vegetables',
            description: 'Locally sourced organic vegetables, freshly harvested',
            price: 800,
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80'
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [searchParams]);

  const handleAddToCart = (product: SearchResult) => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/search' } });
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
    <div className="container mx-auto px-4 py-8">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-[#2E8B57] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {notification}
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E8B57]"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={result.image} alt={result.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                <p className="text-gray-600 mb-4">{result.description}</p>
                <p className="text-[#2E8B57] font-bold mb-4">₵{result.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(result)}
                    className="flex items-center gap-2 bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#256F3A] transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${result.id}`}
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
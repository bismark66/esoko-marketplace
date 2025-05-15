import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from "../context/AuthContext";
import ImageCarousel from "../components/ImageCarousel";
import { useGetProduct } from "../utils/api/hooks";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  currency: string;
  stockQuantity: number;
  imagesUrls: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string | null;
  createdBy?: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");

  // Use the hook to get product data
  const { data: product, isLoading, isError } = useGetProduct(id || "");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          {/* The product you're looking for doesn't exist or has been removed. */}
          Login to view Details of the product
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/products")}
            className="bg-[#2E8B57] text-white px-6 py-3 rounded-md hover:bg-[#256F3A] transition-colors"
          >
            Return to Products
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="bg-[#2E8B57] text-white px-6 py-3 rounded-md hover:bg-[#256F3A] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: `/product/${id}` } });
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id.toString(),
        title: product.name,
        price: parseFloat(product.price),
        image: product.imagesUrls[0] || "",
      },
    });

    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  if (!isAuthenticated) {
    navigate("/signin", { state: { from: `/product/${id}` } });
    return;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-[#2E8B57] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <ImageCarousel
          images={product.imagesUrls}
          title={product.name}
          containerClassName="bg-white rounded-lg shadow-md overflow-hidden"
          imageContainerClassName="w-full h-96 relative"
        />

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 // Default rating since not in API
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                4.5 (50 reviews) {/* Default values since not in API */}
              </span>
            </div>
          </div>

          <p className="text-2xl font-bold text-[#2E8B57]">
            {product.currency} {product.price}
          </p>

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
              disabled={!product.isActive || product.stockQuantity < 1}
              className={`flex-1 bg-primary-btn text-white px-6 py-3 rounded-md hover:bg-primary-btn-hover transition-colors flex items-center justify-center ${
                !product.isActive || product.stockQuantity < 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {!product.isActive || product.stockQuantity < 1
                ? "Out of Stock"
                : "Add to Cart"}
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
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </li>
              <li>
                <span className="font-medium">Availability:</span>{" "}
                {product.isActive && product.stockQuantity > 0
                  ? `In Stock (${product.stockQuantity} available)`
                  : "Out of Stock"}
              </li>
              {product.createdAt && (
                <li>
                  <span className="font-medium">Listed:</span>{" "}
                  {new Date(product.createdAt).toLocaleDateString()}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
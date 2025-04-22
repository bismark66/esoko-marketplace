import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  // const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const {
    state: { cartItems },
    dispatch,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some items to your cart to get started
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#2E8B57] text-white px-6 py-3 rounded-full hover:bg-[#256F3A] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-[#2E8B57] font-bold mt-1">
                      ₵{item.price?.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity - 1 },
                        })
                      }
                      className="text-gray-500 hover:text-[#2E8B57] transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-gray-900 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="text-gray-500 hover:text-[#2E8B57] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: item.id })
                    }
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₵{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold text-[#2E8B57]">
                    ₵{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-[#2E8B57] text-white text-center py-3 rounded-full hover:bg-[#256F3A] transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import PaymentMethod from "../components/PaymentMethod";

interface PaymentDetails {
  mobileMoney: {
    network: string;
    phoneNumber: string;
  };
  creditCard: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  total: number;
  trackingNumber: string;
  estimatedDelivery: string;
  paymentMethod: "mobileMoney" | "creditCard";
  paymentDetails: {
    mobileMoney?: {
      network: string;
      phoneNumber: string;
    };
    creditCard?: {
      cardNumber: string;
      cardName: string;
      expiryDate: string;
      cvv: string;
    };
  };
}

const generateOrderNumber = () => {
  return `ORD-${Date.now().toString().slice(-6)}`;
};

const generateTrackingNumber = () => {
  return `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
};

export default function Checkout() {
  const navigate = useNavigate();
  const {
    state: { cartItems },
    totalPrice,
    dispatch,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<
    "mobileMoney" | "creditCard"
  >("mobileMoney");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    mobileMoney: {
      network: "",
      phoneNumber: "",
    },
    creditCard: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/checkout" } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handlePaymentMethodChange = (method: "mobileMoney" | "creditCard") => {
    setPaymentMethod(method);
  };

  const handlePaymentDetailsChange = (details: Partial<PaymentDetails>) => {
    setPaymentDetails((prev) => ({
      ...prev,
      ...details,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty");
      setIsLoading(false);
      return;
    }

    // Validate payment details based on selected method
    if (paymentMethod === "mobileMoney") {
      if (
        !paymentDetails.mobileMoney.network ||
        !paymentDetails.mobileMoney.phoneNumber
      ) {
        setError("Please fill in all mobile money details");
        setIsLoading(false);
        return;
      }
    } else {
      if (
        !paymentDetails.creditCard.cardNumber ||
        !paymentDetails.creditCard.cardName ||
        !paymentDetails.creditCard.expiryDate ||
        !paymentDetails.creditCard.cvv
      ) {
        setError("Please fill in all credit card details");
        setIsLoading(false);
        return;
      }
    }

    try {
      // Create new order
      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: generateOrderNumber(),
        date: new Date().toISOString(),
        status: "processing",
        items: cartItems.map((item) => ({
          name: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
        trackingNumber: generateTrackingNumber(),
        estimatedDelivery: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // 7 days from now
        paymentMethod,
        paymentDetails: {
          [paymentMethod]: paymentDetails[paymentMethod],
        },
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, newOrder])
      );

      // Clear cart and redirect
      dispatch({ type: "RESET_CART" });
      navigate("/order-confirmation", { state: { order: newOrder } });
    } catch (error) {
      console.error("Payment processing error:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cartItems) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">Loading cart items...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#256F3A]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your purchase</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          </div>

          <div className="px-6 py-5">
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₵{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-medium text-gray-900">
                  ₵{totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Payment Method
            </h2>

            <PaymentMethod
              selectedMethod={paymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
              onPaymentDetailsChange={handlePaymentDetailsChange}
            />

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E8B57] hover:bg-[#256F3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E8B57] ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Complete Purchase"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Truck, Package, CreditCard } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  trackingNumber: string;
  estimatedDelivery: string;
  paymentMethod: 'mobileMoney' | 'creditCard';
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

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the order details. Please check your orders page.</p>
          <button
            onClick={() => navigate('/orders')}
            className="bg-[#2E8B57] text-white px-6 py-2 rounded-lg hover:bg-[#256F3A] transition-colors"
          >
            View Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#2E8B57] p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-2xl font-bold text-center">Order Confirmed!</h1>
            <p className="text-center mt-2">Thank you for your purchase</p>
          </div>

          {/* Order Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Order Number:</span>{" "}
                    {order.orderNumber}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span className="capitalize">{order.status}</span>
                  </p>
                </div>
              </div>

              {/* Tracking Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Tracking Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Tracking Number:</span>{" "}
                    {order.trackingNumber}
                  </p>
                  <p>
                    <span className="font-medium">Estimated Delivery:</span>{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">₵{item.price}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="font-semibold">Total</p>
                  <p className="font-bold text-lg">₵{order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {order.paymentMethod === "creditCard" ? (
                    <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                  ) : (
                    <Package className="w-5 h-5 mr-2 text-gray-600" />
                  )}
                  <p className="font-medium capitalize">
                    {order.paymentMethod.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                </div>
                {order.paymentMethod === "creditCard" && (
                  <p className="text-sm text-gray-600">
                    Card ending in{" "}
                    {order.paymentDetails.creditCard?.cardNumber.slice(-4)}
                  </p>
                )}
                {order.paymentMethod === "mobileMoney" && (
                  <p className="text-sm text-gray-600">
                    {order.paymentDetails.mobileMoney?.network} -{" "}
                    {order.paymentDetails.mobileMoney?.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/track-order")}
                className="flex-1 bg-[#2E8B57] text-white px-6 py-3 rounded-lg hover:bg-[#256F3A] transition-colors flex items-center justify-center"
              >
                <Truck className="w-5 h-5 mr-2" />
                Track Order
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="flex-1 bg-white border border-[#2E8B57] text-[#2E8B57] px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
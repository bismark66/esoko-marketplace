import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
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

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your orders</h2>
          <p className="text-gray-600">You need to be logged in to access this feature.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E8B57] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="mt-2 text-gray-600">View and track your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by making your first purchase.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Order #{order.orderNumber}</h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tracking Number</p>
                      <p className="mt-1 text-sm text-gray-900">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Estimated Delivery</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Method</p>
                      <p className="mt-1 text-sm text-gray-900 capitalize">
                        {order.paymentMethod === 'mobileMoney' ? 'Mobile Money' : 'Credit Card'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Details</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {order.paymentMethod === 'mobileMoney'
                          ? `${order.paymentDetails.mobileMoney?.network} - ${order.paymentDetails.mobileMoney?.phoneNumber}`
                          : `Card ending in ${order.paymentDetails.creditCard?.cardNumber.slice(-4)}`}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900">Order Items</h4>
                    <div className="mt-2 border-t border-gray-200">
                      {order.items.map((item, index) => (
                        <div key={index} className="py-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">₵{item.price}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                      <p className="text-base font-medium text-gray-900">Total</p>
                      <p className="text-base font-medium text-gray-900">₵{order.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
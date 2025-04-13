import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Search, Clock, CheckCircle2, XCircle } from 'lucide-react';

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
}

export default function TrackOrder() {
  const { isAuthenticated } = useAuth();
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  // Mock order data - in a real app, this would come from an API
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-03-15',
      status: 'processing',
      items: [
        { name: 'Organic Rice', quantity: 2, price: 950 },
        { name: 'Fresh Vegetables', quantity: 1, price: 350 }
      ],
      total: 2250,
      trackingNumber: 'TRK-123456',
      estimatedDelivery: '2024-03-20'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-03-16',
      status: 'shipped',
      items: [
        { name: 'Bulk Corn Supply', quantity: 1, price: 245 }
      ],
      total: 245,
      trackingNumber: 'TRK-789012',
      estimatedDelivery: '2024-03-22'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);

    if (!orderNumber && !trackingNumber) {
      setError('Please enter either an order number or tracking number');
      return;
    }

    const foundOrder = mockOrders.find(
      order => order.orderNumber === orderNumber || order.trackingNumber === trackingNumber
    );

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setError('No order found with the provided details');
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to track your orders</h2>
          <p className="text-gray-600">You need to be logged in to access this feature.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="mt-2 text-gray-600">Enter your order number or tracking number to check the status of your order</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                  Order Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="orderNumber"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="focus:ring-[#2E8B57] focus:border-[#2E8B57] block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. ORD-2024-001"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
                  Tracking Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="trackingNumber"
                    id="trackingNumber"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="focus:ring-[#2E8B57] focus:border-[#2E8B57] block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. TRK-123456"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E8B57] hover:bg-[#256F3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E8B57]"
            >
              <Search className="w-5 h-5 mr-2" />
              Track Order
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>

        {order && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
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
                  <p className="text-sm font-medium text-gray-500">Order Number</p>
                  <p className="mt-1 text-sm text-gray-900">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Date</p>
                  <p className="mt-1 text-sm text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tracking Number</p>
                  <p className="mt-1 text-sm text-gray-900">{order.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Delivery</p>
                  <p className="mt-1 text-sm text-gray-900">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
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
        )}
      </div>
    </div>
  );
} 
import React from 'react';
import { Truck, RefreshCw, Clock, Shield } from 'lucide-react';

export default function ShippingReturns() {
  return (
    <div className="bg-white">
      <div className="relative h-[300px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Shipping & Returns Policy
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Truck className="w-6 h-6 text-[#2563eb] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Delivery Methods</h3>
                  <p className="text-gray-600">
                    We offer various shipping options to meet your needs:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li>Standard Shipping (5-7 business days)</li>
                    <li>Express Shipping (2-3 business days)</li>
                    <li>Next Day Delivery (order before 2 PM)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-[#2563eb] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <p className="text-gray-600">
                    Orders are typically processed within 24-48 hours after payment confirmation.
                    You'll receive a tracking number once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Returns Policy</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <RefreshCw className="w-6 h-6 text-[#2563eb] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Return Process</h3>
                  <p className="text-gray-600">
                    If you're not satisfied with your purchase, you can return it within
                    30 days of delivery. Items must be unused and in their original packaging.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="w-6 h-6 text-[#2563eb] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                  <p className="text-gray-600">
                    We stand behind the quality of our products. If you receive damaged
                    or defective items, we'll replace them at no additional cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2563eb] text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="mb-6">
            Our customer service team is available to assist you with any questions
            about shipping or returns.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-[#2563eb] px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
            <button className="border border-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
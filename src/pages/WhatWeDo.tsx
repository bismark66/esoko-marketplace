import React from 'react';
import { ShoppingBag, TrendingUp, Shield, Truck, Users, BarChart } from 'lucide-react';

export default function WhatWeDo() {
  const services = [
    {
      icon: <ShoppingBag className="w-12 h-12 text-[#2E8B57]" />,
      title: "Digital Marketplace",
      description: "A secure platform for buying and selling agricultural products with real-time pricing and inventory management."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#2E8B57]" />,
      title: "Market Analysis",
      description: "Advanced analytics and market insights to help make informed decisions about buying and selling."
    },
    {
      icon: <Shield className="w-12 h-12 text-[#2E8B57]" />,
      title: "Quality Assurance",
      description: "Rigorous quality control measures and verification processes for all listed products."
    },
    {
      icon: <Truck className="w-12 h-12 text-[#2E8B57]" />,
      title: "Logistics Support",
      description: "End-to-end logistics solutions including transportation and warehousing services."
    },
    {
      icon: <Users className="w-12 h-12 text-[#2E8B57]" />,
      title: "Community Building",
      description: "Networking opportunities and knowledge sharing among agricultural professionals."
    },
    {
      icon: <BarChart className="w-12 h-12 text-[#2E8B57]" />,
      title: "Price Monitoring",
      description: "Real-time price tracking and historical data analysis for better decision making."
    }
  ];

  return (
    <div className="bg-white">
      <div className="relative h-[400px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            What We Do
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive solutions for agricultural commerce, connecting farmers 
            with buyers while ensuring quality, transparency, and efficiency at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FFFDD0] rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers who are already benefiting from our platform.
          </p>
          <button className="bg-[#2E8B57] text-white px-8 py-3 rounded-full hover:bg-[#236B43] transition-colors text-lg font-semibold">
            Join Esoko Today
          </button>
        </div>
      </div>
    </div>
  );
}
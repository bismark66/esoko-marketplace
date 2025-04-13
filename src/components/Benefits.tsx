import React from 'react';
import { Clock, DollarSign, Shield, Handshake } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Clock className="w-16 h-16 text-[#2E8B57]" />,
      title: "Time Efficiency",
      description: "Save valuable time with our streamlined trading process and quick order fulfillment"
    },
    {
      icon: <DollarSign className="w-16 h-16 text-[#2E8B57]" />,
      title: "Cost Effective",
      description: "Competitive prices and reduced transaction costs through direct trading"
    },
    {
      icon: <Shield className="w-16 h-16 text-[#2E8B57]" />,
      title: "Secure Trading",
      description: "Protected transactions with escrow services and verified seller profiles"
    },
    {
      icon: <Handshake className="w-16 h-16 text-[#2E8B57]" />,
      title: "Trusted Network",
      description: "Access to a verified network of farmers, wholesalers, and agribusinesses"
    }
  ];

  return (
    <section className="py-16 bg-[#FFFDD0] bg-[#2563eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Esoko?</h2>
          <p className="text-lg text-gray-600">Experience the advantages of modern agricultural trading</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 text-center transform transition-transform hover:scale-105"
            >
              <div className="flex justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
import React from 'react';
import { Truck, ShieldCheck, Users, BarChart } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Truck className="w-12 h-12 text-[#2E8B57]" />,
      title: "Nationwide Delivery",
      description: "Fast and reliable delivery service across the country with real-time tracking"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#2E8B57]" />,
      title: "Quality Assurance",
      description: "All products undergo strict quality checks and certification processes"
    },
    {
      icon: <Users className="w-12 h-12 text-[#2E8B57]" />,
      title: "Direct Trading",
      description: "Connect directly with farmers and wholesalers without intermediaries"
    },
    {
      icon: <BarChart className="w-12 h-12 text-[#2E8B57]" />,
      title: "Market Analytics",
      description: "Access real-time market prices and trend analysis for informed decisions"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">Empowering agricultural trade with innovative solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
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
      </div>
    </section>
  );
};

export default Services;
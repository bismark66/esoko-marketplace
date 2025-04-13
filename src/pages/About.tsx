import React from 'react';
import { Users, Globe, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      <div className="relative h-[400px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            About Esoko
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded in 2023, Esoko emerged from a vision to revolutionize agricultural commerce. 
              We recognized the challenges faced by farmers and buyers in connecting directly and 
              conducting seamless transactions.
            </p>
            <p className="text-lg text-gray-600">
              Today, we're proud to be one of the fastest-growing agricultural marketplaces, 
              serving thousands of farmers and buyers across the country.
            </p>
          </div>
          <div className="relative h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1595508064774-5ff825ff0f81?auto=format&fit=crop&q=80"
              alt="Farmer in field"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <Users className="w-12 h-12 text-[#2E8B57] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">10,000+ Users</h3>
            <p className="text-gray-600">Active farmers and buyers on our platform</p>
          </div>
          <div className="text-center p-6">
            <Globe className="w-12 h-12 text-[#2E8B57] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nationwide Reach</h3>
            <p className="text-gray-600">Operating across all major agricultural regions</p>
          </div>
          <div className="text-center p-6">
            <Leaf className="w-12 h-12 text-[#2E8B57] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sustainable Practice</h3>
            <p className="text-gray-600">Promoting eco-friendly farming methods</p>
          </div>
        </div>

        <div className="bg-[#FFFDD0] rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            To create a transparent, efficient, and sustainable agricultural marketplace that empowers 
            farmers and provides buyers with direct access to quality produce. We're committed to 
            supporting local farming communities while ensuring food security for future generations.
          </p>
        </div>
      </div>
    </div>
  );
}
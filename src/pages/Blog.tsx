import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Sustainable Farming Practices for the Modern Age",
    excerpt: "Learn about the latest sustainable farming techniques that are revolutionizing agriculture...",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
    date: "March 15, 2024",
    author: "John Smith",
    category: "Farming"
  },
  {
    id: 2,
    title: "The Rise of Digital Agriculture",
    excerpt: "How technology is transforming traditional farming methods and improving efficiency...",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
    date: "March 12, 2024",
    author: "Sarah Johnson",
    category: "Technology"
  },
  {
    id: 3,
    title: "Market Trends in Agricultural Commodities",
    excerpt: "Analysis of current market trends and future predictions for agricultural products...",
    image: "https://images.unsplash.com/photo-1595508064774-5ff825ff0f81?auto=format&fit=crop&q=80",
    date: "March 10, 2024",
    author: "Michael Brown",
    category: "Market Analysis"
  }
];

export default function Blog() {
  return (
    <div className="bg-white">
      <div className="relative h-[400px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Esoko Blog
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <User className="w-4 h-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-[#2563eb] hover:text-blue-700"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
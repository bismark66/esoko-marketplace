import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: Record<string, FAQItem[]> = {
  'Ordering & Payment': [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, bank transfers, and agricultural credit systems. For large orders, we also offer financing options with our partner lending institutions.'
    },
    {
      question: 'How do I place a bulk order?',
      answer: 'For bulk orders, you can either use our platform and select your desired quantity or contact our dedicated business team. Orders exceeding certain thresholds may qualify for volume discounts and custom shipping arrangements.'
    },
    {
      question: 'Can I modify or cancel my order after it has been placed?',
      answer: 'Orders can be modified or cancelled within 24 hours of placement. After this window, please contact our customer service team to discuss your options, as many of our products are prepared for shipment immediately.'
    }
  ],
  'Shipping & Delivery': [
    {
      question: 'How do you ship agricultural commodities?',
      answer: 'We use a combination of specialized agricultural transport services depending on the product type and volume. This includes refrigerated trucks for perishables, grain haulers for bulk commodities, and specialized livestock transporters for animals. All shipments comply with relevant agricultural regulations.'
    },
    {
      question: 'What are the shipping costs and delivery times?',
      answer: 'Shipping costs vary based on product weight, volume, and destination. Delivery times typically range from 3-10 business days for domestic shipments and 10-21 days for international orders. For larger commodities, we provide custom shipping quotes and timelines.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most international locations, subject to local agricultural import regulations. International orders may require additional documentation and phytosanitary certificates, which our export team can help arrange.'
    }
  ],
  'Products & Quality': [
    {
      question: 'How do you ensure product quality?',
      answer: 'All products undergo rigorous quality control inspections before shipment. For agricultural commodities, we test for moisture content, protein levels, and other relevant quality indicators. Our livestock undergoes veterinary inspections, and all products are certified to meet or exceed industry standards.'
    },
    {
      question: 'What certifications do your products have?',
      answer: 'Our products carry various certifications depending on their type, including USDA Organic, Non-GMO Project Verified, Animal Welfare Approved, and Global GAP certifications. Each product listing includes its specific certifications.'
    },
    {
      question: 'How fresh are your products when they arrive?',
      answer: 'We prioritize freshness by maintaining an efficient supply chain. Perishable products are harvested or processed just before shipment, and our cold chain logistics ensure they maintain optimal quality throughout transit.'
    }
  ],
  'Returns & Refunds': [
    {
      question: 'What is your return policy?',
      answer: 'Given the nature of agricultural products, returns are handled on a case-by-case basis. If products arrive damaged or not as described, we offer replacements or refunds. All quality concerns must be reported within 48 hours of delivery with supporting documentation.'
    },
    {
      question: 'How do I request a refund?',
      answer: 'To request a refund, contact our customer service team with your order number and details about the issue. Our team will guide you through the necessary steps, which may include providing photos of the received products or other verification methods.'
    },
    {
      question: 'What happens if my shipment is damaged during transit?',
      answer: 'If your shipment arrives damaged, document the condition with photos before accepting delivery if possible. Contact our customer service team immediately, and we\'ll arrange for replacement or refund depending on product availability and your preference.'
    }
  ],
  'Account & Orders': [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order through your account dashboard or by using the tracking number provided in your shipping confirmation email. For bulk shipments, our logistics team provides additional tracking and updates.'
    },
    {
      question: 'Can I create a business account?',
      answer: 'Yes, we offer business accounts with features like volume pricing, credit terms, and dedicated account managers. Business accounts are available for verified agricultural businesses, cooperatives, processors, and distributors.'
    },
    {
      question: 'How do I view my order history?',
      answer: 'Your complete order history is available in the "Orders" section of your account dashboard. Each order record includes product details, transaction information, and shipping status.'
    }
  ]
};

export default function FAQ() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Ordering & Payment': true,
    'Shipping & Delivery': false,
    'Products & Quality': false,
    'Returns & Refunds': false,
    'Account & Orders': false
  });
  
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});
  
  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="mt-4 text-gray-600">
          Find answers to common questions about our agricultural marketplace
        </p>
      </div>
      
      <div className="space-y-8">
        {Object.entries(faqs).map(([category, questions]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <h2 className="text-lg font-medium text-gray-900">{category}</h2>
              {openCategories[category] ? (
                <Minus className="w-5 h-5 text-gray-500" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {openCategories[category] && (
              <div className="divide-y divide-gray-200">
                {questions.map((faq, index) => (
                  <div key={index} className="p-4">
                    <button
                      onClick={() => toggleQuestion(`${category}-${index}`)}
                      className="w-full flex justify-between items-center focus:outline-none"
                    >
                      <h3 className="text-md font-medium text-gray-900">{faq.question}</h3>
                      {openQuestions[`${category}-${index}`] ? (
                        <Minus className="w-4 h-4 text-blue-500 flex-shrink-0 ml-2" />
                      ) : (
                        <Plus className="w-4 h-4 text-blue-500 flex-shrink-0 ml-2" />
                      )}
                    </button>
                    
                    {openQuestions[`${category}-${index}`] && (
                      <div className="mt-2 text-gray-600 prose prose-sm max-w-none">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">
          If you couldn't find the answer to your question, please don't hesitate to contact our customer support team.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
} 
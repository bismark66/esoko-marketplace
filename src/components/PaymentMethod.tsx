import React, { useState } from 'react';
import { CreditCard, Smartphone } from 'lucide-react';

interface PaymentMethodProps {
  onPaymentMethodChange: (method: 'mobileMoney' | 'creditCard') => void;
  onPaymentDetailsChange: (details: any) => void;
}

export default function PaymentMethod({ onPaymentMethodChange, onPaymentDetailsChange }: PaymentMethodProps) {
  const [paymentMethod, setPaymentMethod] = useState<'mobileMoney' | 'creditCard'>('mobileMoney');
  const [paymentDetails, setPaymentDetails] = useState({
    mobileMoney: {
      network: '',
      phoneNumber: '',
    },
    creditCard: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const handleMethodChange = (method: 'mobileMoney' | 'creditCard') => {
    setPaymentMethod(method);
    onPaymentMethodChange(method);
  };

  const handleInputChange = (method: 'mobileMoney' | 'creditCard', field: string, value: string) => {
    const newDetails = {
      ...paymentDetails,
      [method]: {
        ...paymentDetails[method],
        [field]: value,
      },
    };
    setPaymentDetails(newDetails);
    onPaymentDetailsChange(newDetails);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handleMethodChange('mobileMoney')}
          className={`flex-1 flex items-center justify-center p-4 border rounded-lg ${
            paymentMethod === 'mobileMoney'
              ? 'border-[#2E8B57] bg-[#2E8B57]/5'
              : 'border-gray-300 hover:border-[#2E8B57]'
          }`}
        >
          <Smartphone className={`w-5 h-5 mr-2 ${paymentMethod === 'mobileMoney' ? 'text-[#2E8B57]' : 'text-gray-500'}`} />
          <span className={`font-medium ${paymentMethod === 'mobileMoney' ? 'text-[#2E8B57]' : 'text-gray-700'}`}>
            Mobile Money
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleMethodChange('creditCard')}
          className={`flex-1 flex items-center justify-center p-4 border rounded-lg ${
            paymentMethod === 'creditCard'
              ? 'border-[#2E8B57] bg-[#2E8B57]/5'
              : 'border-gray-300 hover:border-[#2E8B57]'
          }`}
        >
          <CreditCard className={`w-5 h-5 mr-2 ${paymentMethod === 'creditCard' ? 'text-[#2E8B57]' : 'text-gray-500'}`} />
          <span className={`font-medium ${paymentMethod === 'creditCard' ? 'text-[#2E8B57]' : 'text-gray-700'}`}>
            Credit Card
          </span>
        </button>
      </div>

      {paymentMethod === 'mobileMoney' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="network" className="block text-sm font-medium text-gray-700">
              Mobile Network
            </label>
            <select
              id="network"
              value={paymentDetails.mobileMoney.network}
              onChange={(e) => handleInputChange('mobileMoney', 'network', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2E8B57] focus:ring-[#2E8B57] sm:text-sm"
            >
              <option value="">Select Network</option>
              <option value="mtn">MTN</option>
              <option value="vodafone">Vodafone</option>
              <option value="airteltigo">AirtelTigo</option>
            </select>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={paymentDetails.mobileMoney.phoneNumber}
              onChange={(e) => handleInputChange('mobileMoney', 'phoneNumber', e.target.value)}
              placeholder="Enter your phone number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2E8B57] focus:ring-[#2E8B57] sm:text-sm"
            />
          </div>
        </div>
      )}

      {paymentMethod === 'creditCard' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={paymentDetails.creditCard.cardNumber}
              onChange={(e) => handleInputChange('creditCard', 'cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2E8B57] focus:ring-[#2E8B57] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              value={paymentDetails.creditCard.cardName}
              onChange={(e) => handleInputChange('creditCard', 'cardName', e.target.value)}
              placeholder="Enter name as it appears on card"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2E8B57] focus:ring-[#2E8B57] sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                value={paymentDetails.creditCard.expiryDate}
                onChange={(e) => handleInputChange('creditCard', 'expiryDate', e.target.value)}
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2E8B57] focus:ring-[#2E8B57] sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={paymentDetails.creditCard.cvv}
                onChange={(e) => handleInputChange('creditCard', 'cvv', e.target.value)}
                placeholder="123"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2E8B57] focus:ring-[#2E8B57] sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
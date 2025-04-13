import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  priceRange: [number, number];
  condition: string;
  location: string;
}

export default function ProductFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [0, 10000],
    condition: 'all',
    location: 'all'
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (${filters.priceRange[0]} - ${filters.priceRange[1]})
          </label>
          <Slider
            range
            min={0}
            max={10000}
            value={filters.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
            className="my-4"
            trackStyle={[{ backgroundColor: '#2E8B57' }]}
            handleStyle={[
              { backgroundColor: '#2E8B57', borderColor: '#2E8B57' },
              { backgroundColor: '#2E8B57', borderColor: '#2E8B57' }
            ]}
            railStyle={{ backgroundColor: '#E5E7EB' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300"
            value={filters.condition}
            onChange={(e) => handleFilterChange('condition', e.target.value)}
          >
            <option value="all">All</option>
            <option value="organic">Organic</option>
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="midwest">Midwest</option>
            <option value="northeast">Northeast</option>
            <option value="southeast">Southeast</option>
            <option value="southwest">Southwest</option>
            <option value="west">West</option>
          </select>
        </div>
      </div>
    </div>
  );
}
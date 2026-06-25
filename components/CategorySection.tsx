import React from 'react';
import { Category } from '../types';
import ServiceCard from './ServiceCard';

interface CategorySectionProps {
  category: Category;
}

// Gradient mapping based on category ID
const getGradient = (id: string): string => {
  switch (id) {
    case 'identity':
      return 'from-blue-500 to-blue-600'; // Blue
    case 'health':
      return 'from-rose-500 to-red-600'; // Red/Pink
    case 'finance':
      return 'from-emerald-500 to-teal-600'; // Green
    case 'transport':
      return 'from-orange-400 to-red-500'; // Orange
    case 'business':
      return 'from-violet-500 to-purple-600'; // Purple
    case 'education':
      return 'from-sky-400 to-indigo-500'; // Sky/Indigo
    case 'safety':
      return 'from-slate-600 to-slate-800'; // Dark Slate
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  if (category.services.length === 0) return null;

  const gradient = getGradient(category.id);

  return (
    <div className="mb-12">
      {/* Apple Settings-style Header */}
      <h2 className="mb-4 ml-1 text-xs font-bold uppercase tracking-wider text-gray-500">
        {category.title}
      </h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            gradient={gradient}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
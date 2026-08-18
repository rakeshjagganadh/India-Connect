import React from 'react';
import { Category, ServiceLink, ViewMode } from '../types';
import ServiceCard from './ServiceCard';
import ServiceListItem from './ServiceListItem';
import Icon from './Icon';

interface CategorySectionProps {
  category: Category;
  services: ServiceLink[];
  viewMode: ViewMode;
  onSelectDetail: (service: ServiceLink) => void;
  onViewCategory: (categoryId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  services,
  viewMode,
  onSelectDetail,
  onViewCategory,
}) => {
  if (services.length === 0) return null;

  return (
    <section className="mb-10 sm:mb-12">
      {/* Category Section Header */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-xs`}
          >
            <Icon name={category.iconName} className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {category.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">
            {services.length} {services.length === 1 ? 'service' : 'services'}
          </span>
          <button
            onClick={() => onViewCategory(category.id)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline hidden sm:inline-block"
          >
            View all &rarr;
          </button>
        </div>
      </div>

      {/* Services Grid or List */}
      {viewMode === 'list' ? (
        <div className="space-y-2.5">
          {services.map((service) => (
            <ServiceListItem
              key={service.id}
              service={service}
              gradient={category.gradient}
              onSelectDetail={onSelectDetail}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              gradient={category.gradient}
              onSelectDetail={onSelectDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;

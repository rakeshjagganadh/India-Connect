import React from 'react';
import { ServiceLink } from '../types';
import Icon from './Icon';

interface ServiceCardProps {
  service: ServiceLink;
  gradient: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, gradient }) => {
  return (
    <a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col h-full bg-white rounded-[22px] border border-gray-200 p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-300 animate-fade-in"
    >
      <div className="flex flex-col h-full items-start w-full">
        {/* Icon Container with Gradient */}
        <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-sm ring-1 ring-black/5`}>
          <Icon name={service.iconName} className="h-7 w-7 drop-shadow-sm" />
        </div>
        
        {/* Content */}
        <div className="flex-1 w-full">
          <h3 className="mb-1.5 text-[17px] font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-[13px] leading-relaxed text-gray-500 font-medium line-clamp-2">
            {service.description}
          </p>
        </div>
        
        {/* Chevron Action */}
        <div className="mt-4 flex w-full items-center justify-between border-t border-gray-50 pt-3 opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-blue-600 transition-colors">Open</span>
          <div className="h-6 w-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
             <svg className="h-3 w-3 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;
import React from 'react';
import { ServiceLink } from '../types';
import Icon from './Icon';
import { motion } from 'motion/react';

interface ServiceListItemProps {
  service: ServiceLink;
  gradient: string;
  onSelectDetail: (service: ServiceLink) => void;
}

const ServiceListItem: React.FC<ServiceListItemProps> = ({
  service,
  gradient,
  onSelectDetail,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group flex items-center justify-between gap-3 p-3 sm:p-3.5 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-xs`}
        >
          <Icon name={service.iconName} className="h-5 w-5 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {service.title}
            </h4>
            {service.badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                {service.badge}
              </span>
            )}
            {service.state && (
              <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200/50">
                {service.state}
              </span>
            )}
          </div>
          <p className="text-[12px] text-slate-500 truncate mt-0.5">
            {service.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onSelectDetail(service)}
          className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-600 hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Icon name="info" className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Details</span>
        </button>

        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-[12px] font-semibold transition-all"
        >
          <span>Open</span>
          <Icon name="external-link" className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};

export default ServiceListItem;

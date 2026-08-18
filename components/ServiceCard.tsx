import React from 'react';
import { ServiceLink } from '../types';
import Icon from './Icon';
import { motion } from 'motion/react';

interface ServiceCardProps {
  service: ServiceLink;
  gradient: string;
  onSelectDetail: (service: ServiceLink) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  gradient,
  onSelectDetail,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-slate-300/90 transition-all duration-200"
    >
      <div>
        {/* Top Header: Icon + Badge */}
        <div className="flex items-start justify-between gap-2 mb-3.5">
          <div
            className={`flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform duration-200`}
          >
            <Icon name={service.iconName} className="h-6 w-6 text-white" />
          </div>

          {service.badge && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide ${
                service.badge === 'Essential'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  : service.badge === 'Popular'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  : service.badge === 'Instant'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {service.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
              {service.title}
            </h3>
            {service.state && (
              <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                {service.state}
              </span>
            )}
          </div>

          <p className="text-[13px] leading-relaxed text-slate-500 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Department / Authority note */}
        {service.department && (
          <div className="mb-3 text-[11px] font-medium text-slate-400 truncate flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0"></span>
            <span className="truncate">{service.department}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <button
          type="button"
          onClick={() => onSelectDetail(service)}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-600 hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Icon name="info" className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[12px] font-semibold shadow-sm hover:shadow transition-all group/btn"
        >
          <span>Open Portal</span>
          <Icon
            name="external-link"
            className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform"
          />
        </a>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

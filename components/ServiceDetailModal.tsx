import React, { useState } from 'react';
import { ServiceLink } from '../types';
import Icon from './Icon';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceDetailModalProps {
  service: ServiceLink | null;
  gradient: string;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  gradient,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!service) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(service.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="relative p-6 bg-slate-50 border-b border-slate-100">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close modal"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 pr-8">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md`}
              >
                <Icon name={service.iconName} className="h-7 w-7 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {service.badge}
                    </span>
                  )}
                  {service.state && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {service.state}
                    </span>
                  )}
                </div>
                {service.department && (
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {service.department}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Overview
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Official Portal Verification */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-800 text-xs font-medium">
              <Icon name="shield-check" className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified Direct Link: Routes directly to official Indian Government domain.</span>
            </div>

            {/* Key Online Services / Features */}
            {service.features && service.features.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Services & Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl"
                    >
                      <Icon name="check-circle" className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tags */}
            {service.tags && service.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Related Keywords
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Official URL row */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Portal URL</span>
                <span className="text-xs font-mono text-slate-700 truncate block">
                  {service.url}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors"
                title="Copy URL"
              >
                <Icon name={copied ? 'check' : 'copy'} className={`w-4 h-4 ${copied ? 'text-emerald-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all"
            >
              <Icon name={copied ? 'check' : 'copy'} className={`w-3.5 h-3.5 ${copied ? 'text-emerald-600' : ''}`} />
              <span>{copied ? 'Copied URL!' : 'Copy Portal URL'}</span>
            </button>

            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <span>Visit Official Portal</span>
              <Icon name="external-link" className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceDetailModal;

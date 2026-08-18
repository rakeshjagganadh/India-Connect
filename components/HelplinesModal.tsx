import React from 'react';
import { Helpline } from '../types';
import Icon from './Icon';
import { motion, AnimatePresence } from 'motion/react';
import { HELPLINES_DATA } from '../constants';

interface HelplinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelplinesModal: React.FC<HelplinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-rose-50/70 border-b border-rose-100/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                <Icon name="phone-call" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  National Emergency & Helplines
                </h3>
                <p className="text-xs text-rose-700 font-medium">
                  24x7 Official Toll-Free Government Helplines
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
              aria-label="Close modal"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>

          {/* List of Helplines */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
            {HELPLINES_DATA.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-rose-200 hover:shadow-sm transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={item.iconName} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-[15px] font-bold text-slate-900">
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-rose-100 text-rose-700">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
                >
                  <Icon name="phone-call" className="w-3.5 h-3.5" />
                  <span>{item.number}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
            Calls to standard 3-digit and 4-digit emergency numbers are completely toll-free across all telecom networks in India.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HelplinesModal;

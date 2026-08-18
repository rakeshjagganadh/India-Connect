import React, { useState, useEffect, useRef } from 'react';
import { ServiceLink, Category } from '../types';
import Icon from './Icon';
import { motion, AnimatePresence } from 'motion/react';
import { POPULAR_SEARCH_TAGS } from '../constants';

interface SpotlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceLink[];
  categories: Category[];
  onSelectService: (service: ServiceLink) => void;
  onSelectCategory: (categoryId: string) => void;
}

const SpotlightSearchModal: React.FC<SpotlightSearchModalProps> = ({
  isOpen,
  onClose,
  services,
  categories,
  onSelectService,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return services.filter((s) => {
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      const matchDept = s.department?.toLowerCase().includes(q) || false;
      const matchTags = s.tags?.some((t) => t.toLowerCase().includes(q)) || false;
      const matchState = s.state?.toLowerCase().includes(q) || false;
      return matchTitle || matchDesc || matchDept || matchTags || matchState;
    }).slice(0, 8);
  }, [query, services]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onSelectService(filtered[selectedIndex]);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Spotlight Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200/90 flex flex-col max-h-[80vh]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-white">
            <Icon name="search" className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search by portal, service, scheme, or state..."
              className="w-full bg-transparent text-[15px] text-slate-900 placeholder-slate-400 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-100 rounded border border-slate-200">
              ESC
            </kbd>
          </div>

          {/* Results Area */}
          <div className="overflow-y-auto p-2">
            {query ? (
              filtered.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Services & Portals ({filtered.length})
                  </div>
                  {filtered.map((service, idx) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        onSelectService(service);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                        selectedIndex === idx
                          ? 'bg-blue-50 text-blue-900 border border-blue-100'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Icon name={service.iconName} className="w-4 h-4 text-slate-700" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold truncate text-slate-900">
                              {service.title}
                            </span>
                            {service.badge && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700 font-medium">
                                {service.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <Icon name="arrow-right" className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm font-medium text-slate-500">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try searching for Aadhaar, Tax, Passport, FASTag, or a state name.
                  </p>
                </div>
              )
            ) : (
              <div className="p-3 space-y-4">
                {/* Popular Search Suggestions */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Popular Services
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SEARCH_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Categories Navigation */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Jump to Category
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.filter((c) => c.id !== 'all').map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          onClose();
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center shrink-0">
                          <Icon name={cat.iconName} className="w-3.5 h-3.5 text-slate-700" />
                        </div>
                        <span className="truncate">{cat.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="hidden sm:inline">Use ↑ ↓ arrows to navigate, Enter to view details</span>
            <span>IndiaConnect Directory</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpotlightSearchModal;

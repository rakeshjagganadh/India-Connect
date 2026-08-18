import React, { useRef, useEffect } from 'react';
import { Category } from '../types';
import Icon from './Icon';

interface MobileCategoryPillsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  serviceCounts: Record<string, number>;
}

const MobileCategoryPills: React.FC<MobileCategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  serviceCounts,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll selected pill into view smoothly
  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [selectedCategory]);

  return (
    <div className="md:hidden w-full overflow-x-auto no-scrollbar py-2.5 px-4 -mx-4 flex items-center gap-2 border-b border-slate-200/70 bg-white/95 backdrop-blur-md sticky top-14 z-20">
      <div ref={containerRef} className="flex items-center gap-2 min-w-max">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = serviceCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              data-active={isSelected ? 'true' : 'false'}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/40'
              }`}
            >
              <Icon
                name={cat.iconName}
                className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`}
              />
              <span>{cat.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileCategoryPills;

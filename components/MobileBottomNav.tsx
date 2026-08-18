import React from 'react';
import Icon from './Icon';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onOpenCategories: () => void;
  onOpenHelplines: () => void;
  onOpenSearch: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onGoHome,
  onOpenCategories,
  onOpenHelplines,
  onOpenSearch,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-lg px-4 py-2 flex items-center justify-around">
      {/* Directory / Home */}
      <button
        type="button"
        onClick={onGoHome}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-700 hover:text-blue-600 font-semibold transition-all min-w-[65px] active:scale-95"
      >
        <Icon name="layout-grid" className="w-5 h-5 mb-0.5 text-blue-600" />
        <span className="text-[11px]">All Services</span>
      </button>

      {/* Categories Drawer */}
      <button
        type="button"
        onClick={onOpenCategories}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 hover:text-slate-900 font-medium transition-all min-w-[65px] active:scale-95"
      >
        <Icon name="layers" className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">Topics</span>
      </button>

      {/* Quick Search trigger */}
      <button
        type="button"
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 hover:text-blue-600 font-medium transition-all min-w-[65px] active:scale-95"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-0.5">
          <Icon name="search" className="w-4 h-4 text-slate-700" />
        </div>
        <span className="text-[11px]">Search</span>
      </button>

      {/* Emergency Helplines */}
      <button
        type="button"
        onClick={onOpenHelplines}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-rose-600 hover:text-rose-700 font-semibold transition-all min-w-[65px] active:scale-95"
      >
        <div className="relative">
          <Icon name="phone-call" className="w-5 h-5 mb-0.5" />
          <span className="absolute -top-0.5 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        </div>
        <span className="text-[11px]">Helplines</span>
      </button>
    </div>
  );
};

export default MobileBottomNav;

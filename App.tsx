import React, { useState, useMemo, useEffect } from 'react';
import { SERVICE_DATA, CATEGORY_CONFIG, POPULAR_SEARCH_TAGS, STATE_LIST } from './constants';
import { ServiceLink, ViewMode } from './types';
import ServiceCard from './components/ServiceCard';
import ServiceListItem from './components/ServiceListItem';
import CategorySection from './components/CategorySection';
import ServiceDetailModal from './components/ServiceDetailModal';
import SpotlightSearchModal from './components/SpotlightSearchModal';
import HelplinesModal from './components/HelplinesModal';
import MobileCategoryPills from './components/MobileCategoryPills';
import MobileBottomNav from './components/MobileBottomNav';
import Icon from './components/Icon';
import { AnimatePresence, motion } from 'motion/react';

// The 4 most important, essential national portals
const TOP_QUICK_PORTAL_IDS = ['aadhaar', 'incometax', 'digilocker', 'passport'];

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isHelplinesOpen, setIsHelplinesOpen] = useState(false);
  const [detailService, setDetailService] = useState<ServiceLink | null>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / slash)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsSpotlightOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Count services per category for badges
  const serviceCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: SERVICE_DATA.length,
    };
    CATEGORY_CONFIG.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = SERVICE_DATA.filter((s) => s.categoryId === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered services based on search, category, state, and badge
  const filteredServices = useMemo(() => {
    let list = SERVICE_DATA;

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((s) => s.categoryId === selectedCategory);
    }

    // State filter (especially for Land records)
    if (selectedState !== 'All States') {
      list = list.filter((s) => !s.state || s.state === selectedState);
    }

    // Badge filter
    if (selectedBadge !== 'all') {
      list = list.filter((s) => s.badge === selectedBadge);
    }

    // Text Search query
    const q = searchQuery.trim().toLowerCase();
    if (q.length > 0) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.department && s.department.toLowerCase().includes(q)) ||
          (s.tags && s.tags.some((t) => t.toLowerCase().includes(q))) ||
          (s.state && s.state.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery, selectedState, selectedBadge]);

  // The 4 top essential Quick Portals
  const quickPortals = useMemo(() => {
    return TOP_QUICK_PORTAL_IDS.map((id) => SERVICE_DATA.find((s) => s.id === id)).filter(
      Boolean
    ) as ServiceLink[];
  }, []);

  // Helper to get category gradient
  const getGradientForCategory = (categoryId: string) => {
    const cat = CATEGORY_CONFIG.find((c) => c.id === categoryId);
    return cat ? cat.gradient : 'from-slate-600 to-slate-800';
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedState('All States');
    setSelectedBadge('all');
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans select-none antialiased">
      {/* 
        ========================================
        DESKTOP & TABLET SIDEBAR
        ========================================
      */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200/90
          transform transition-transform duration-300 ease-out
          md:static md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col shadow-2xl md:shadow-none
        `}
      >
        {/* Sidebar Header */}
        <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-white to-emerald-600 shadow-md p-0.5 flex items-center justify-center ring-1 ring-slate-900/10">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-[13px] font-black tracking-tight text-white">IC</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none">
                  IndiaConnect
                </h1>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                  Directory
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Verified Citizen Gateway</span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Access Action in Sidebar */}
        <div className="p-3 border-b border-slate-100 space-y-1.5">
          {/* Spotlight Search Shortcut */}
          <button
            type="button"
            onClick={() => setIsSpotlightOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/90 text-slate-500 text-xs font-medium border border-slate-200/70 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Icon name="search" className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
              <span>Quick Search 60+ Portals...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 rounded border border-slate-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Helplines Shortcut Button */}
          <button
            type="button"
            onClick={() => setIsHelplinesOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-rose-50/80 hover:bg-rose-100/80 text-rose-700 text-xs font-semibold border border-rose-200/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Icon name="phone-call" className="w-4 h-4 text-rose-600" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                </span>
              </div>
              <span>Emergency 112 & Helplines</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-rose-200/80 text-rose-800 rounded">
              24x7
            </span>
          </button>
        </div>

        {/* Categories Navigation */}
        <div className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Services Directory ({SERVICE_DATA.length} Portals)
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 no-scrollbar">
          {CATEGORY_CONFIG.map((category) => {
            const isSelected = selectedCategory === category.id;
            const count = serviceCounts[category.id] || 0;

            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`
                  group flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150
                  ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    <Icon name={category.iconName} className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{category.title}</span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-[11px] text-slate-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Independent Citizen Directory</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            Not an official government portal. Directs users safely to official .gov.in services.
          </p>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 
        ========================================
        MAIN CONTENT VIEW
        ========================================
      */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth flex flex-col bg-[#F8FAFC]">
        {/* 
          Top App Bar for Mobile & Tablet
        */}
        <div className="md:hidden sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Icon name="menu" className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-amber-500 via-white to-emerald-600 p-0.5 flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-md flex items-center justify-center">
                <span className="text-[10px] font-black text-white">IC</span>
              </div>
            </div>
            <span className="font-bold text-sm text-slate-900 tracking-tight">IndiaConnect</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsHelplinesOpen(true)}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
              title="Emergency Helplines"
              aria-label="Emergency Helplines"
            >
              <Icon name="phone-call" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsSpotlightOpen(true)}
              className="p-2 -mr-1 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Search"
              aria-label="Search"
            >
              <Icon name="search" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 
          Official Disclaimer & Notice Bar (Prominent top verification indicator)
        */}
        <div className="bg-amber-50/90 border-b border-amber-200/70 px-4 sm:px-6 py-2 text-[11px] sm:text-xs text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 max-w-6xl mx-auto w-full">
            <Icon name="info" className="w-4 h-4 text-amber-700 shrink-0" />
            <p className="leading-snug">
              <strong className="font-semibold">Public Notice & Disclaimer:</strong> IndiaConnect is an independent
              informational directory and verified reference platform. This is <strong>not a government website</strong>.
              All service buttons safely redirect directly to official Indian Government (<code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-800">.gov.in</code> / <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-800">.nic.in</code>) portals.
            </p>
          </div>
        </div>

        {/* 
          Sticky Desktop Header with Search, State Filter, and View Mode
        */}
        <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 py-3 sm:py-3.5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input on Desktop */}
            <div className="relative flex-1 max-w-xl group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Icon name="search" className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 60+ verified portals, ITR, Aadhaar, Land Records..."
                className="w-full bg-slate-50 group-hover:bg-slate-100/80 border border-slate-200/90 shadow-2xs rounded-xl py-2 pl-10 pr-20 text-[14px] text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 transition-all"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <Icon name="x" className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSpotlightOpen(true)}
                  className="hidden sm:flex absolute inset-y-0 right-0 items-center pr-3 text-[11px] font-mono text-slate-400 hover:text-slate-600"
                >
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">
                    ⌘K
                  </kbd>
                </button>
              )}
            </div>

            {/* Filter Controls Row (State Filter, Badge Filter, View Mode) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {/* State Filter (Useful for Land Records) */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
                <Icon name="map" className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  {STATE_LIST.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag / Badge Filter */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-xl p-1 text-xs">
                {['all', 'Essential', 'Popular'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBadge(b)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedBadge === b
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {b === 'all' ? 'All' : b}
                  </button>
                ))}
              </div>

              {/* View Switcher (Grid / List / Grouped) */}
              <div className="hidden sm:flex items-center bg-slate-50 border border-slate-200/80 rounded-xl p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-2xs font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Icon name="grid" className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  title="Compact List View"
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-2xs font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Icon name="list" className="w-4 h-4" />
                </button>
                {selectedCategory === 'all' && (
                  <button
                    type="button"
                    onClick={() => setViewMode('grouped')}
                    title="Grouped by Topic"
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'grouped'
                        ? 'bg-white text-blue-600 shadow-2xs font-bold'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Icon name="layers" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* 
          Mobile Horizontal Category Pills Carousel (Instant one-thumb switching)
        */}
        <div className="px-4">
          <MobileCategoryPills
            categories={CATEGORY_CONFIG}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            serviceCounts={serviceCounts}
          />
        </div>

        {/* 
          Main Scrollable Content
        */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28 md:pb-16">
          {/* Welcome Banner on 'All Services' overview */}
          {selectedCategory === 'all' &&
            searchQuery === '' &&
            selectedState === 'All States' &&
            selectedBadge === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800"
              >
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 -mb-12 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-300">
                      Verified Directory & Guide
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2.5">
                    Official Indian Government Services Directory
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    A comprehensive, verified citizen gateway linking directly to {SERVICE_DATA.length}+ authentic government portals for Aadhaar, Income Tax, DigiLocker, Land Records,
                    Farming Schemes, Student Scholarships, and 24x7 National Emergency Helplines.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                        <Icon name="shield-check" className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">100% Direct Links</div>
                        <div className="text-[10px] text-slate-400">Official .gov.in Domains</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                        <Icon name="sparkles" className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{SERVICE_DATA.length}+ Portals</div>
                        <div className="text-[10px] text-slate-400">Across 10 Categories</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                        <Icon name="zap" className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">No Intermediaries</div>
                        <div className="text-[10px] text-slate-400">Zero Middlemen</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-rose-400">
                        <Icon name="phone-call" className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Emergency 112</div>
                        <div className="text-[10px] text-slate-400">24x7 Free Helplines</div>
                      </div>
                    </div>
                  </div>

                  {/* Popular Tags Row */}
                  <div className="mt-5 flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-slate-400">Popular:</span>
                    {POPULAR_SEARCH_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          {/* 
            QUICK PORTALS (4 Most Essential Portals)
          */}
          {quickPortals.length > 0 &&
            selectedCategory === 'all' &&
            searchQuery === '' && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-700">
                      <Icon name="sparkles" className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Quick Portals
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Top 4 Essential Services
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {quickPortals.map((service) => {
                    const gradient = getGradientForCategory(service.categoryId);
                    return (
                      <div
                        key={service.id}
                        onClick={() => setDetailService(service)}
                        className="group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                          >
                            <Icon name={service.iconName} className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                            Essential
                          </span>
                        </div>

                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 truncate mb-1">
                            {service.title}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                            Open Portal
                          </span>
                          <div className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-blue-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-colors">
                            <Icon name="external-link" className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Section Heading & Result Metrics */}
          <div className="mb-5 flex items-baseline justify-between gap-2 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {searchQuery
                    ? `Search results for "${searchQuery}"`
                    : CATEGORY_CONFIG.find((c) => c.id === selectedCategory)?.title}
                </h2>
                {selectedState !== 'All States' && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {selectedState}
                  </span>
                )}
                {selectedBadge !== 'all' && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {selectedBadge}
                  </span>
                )}
              </div>
              {selectedCategory !== 'all' && searchQuery === '' && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {CATEGORY_CONFIG.find((c) => c.id === selectedCategory)?.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">
                {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'} Available
              </span>

              {(searchQuery || selectedState !== 'All States' || selectedBadge !== 'all') && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Render Services (Grid vs Compact List vs Grouped) */}
          {filteredServices.length > 0 ? (
            viewMode === 'grouped' && selectedCategory === 'all' && !searchQuery ? (
              <div className="space-y-4">
                {CATEGORY_CONFIG.filter((c) => c.id !== 'all').map((cat) => {
                  const catServices = filteredServices.filter((s) => s.categoryId === cat.id);
                  return (
                    <CategorySection
                      key={cat.id}
                      category={cat}
                      services={catServices}
                      viewMode={viewMode}
                      onSelectDetail={(s) => setDetailService(s)}
                      onViewCategory={(catId) => handleCategorySelect(catId)}
                    />
                  );
                })}
              </div>
            ) : viewMode === 'list' ? (
              <div className="space-y-2.5">
                <AnimatePresence>
                  {filteredServices.map((service) => (
                    <ServiceListItem
                      key={service.id}
                      service={service}
                      gradient={getGradientForCategory(service.categoryId)}
                      onSelectDetail={(s) => setDetailService(s)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
                <AnimatePresence>
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      gradient={getGradientForCategory(service.categoryId)}
                      onSelectDetail={(s) => setDetailService(s)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )
          ) : (
            /* Empty State */
            <div className="py-16 px-4 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-200/80 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Icon name="search" className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                No matching services found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mb-4">
                We couldn&apos;t find any services matching your search query or selected filters.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Portal Directory Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 space-y-3">
            <div className="flex items-center justify-center gap-4 flex-wrap text-slate-600 font-semibold">
              <a
                href="https://india.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                National Portal of India (india.gov.in) ↗
              </a>
              <span>•</span>
              <a
                href="https://digitalindia.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Digital India ↗
              </a>
              <span>•</span>
              <a
                href="https://web.umang.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                UMANG App Portal ↗
              </a>
              <span>•</span>
              <a
                href="https://mygov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                MyGov Citizen Platform ↗
              </a>
            </div>

            <div className="max-w-2xl mx-auto p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
              <p className="font-semibold text-slate-700 mb-1">
                Legal Disclaimer & Official Notice
              </p>
              <p>
                <strong>IndiaConnect is an independent public information directory and verified reference platform.</strong> This platform is <strong>not an official government website</strong> and is not associated with, endorsed by, or operated by any government ministry or department. All logos, portal names, and trademarks belong to their respective authorities. Users clicking any link are redirected directly to authentic <code className="font-mono text-slate-700">.gov.in</code> / <code className="font-mono text-slate-700">.nic.in</code> and verified statutory portals.
              </p>
            </div>
          </footer>
        </div>
      </main>

      {/* 
        ========================================
        MOBILE BOTTOM APP-STYLE DOCK
        ========================================
      */}
      <MobileBottomNav
        onGoHome={() => setSelectedCategory('all')}
        onOpenCategories={() => setIsMobileMenuOpen(true)}
        onOpenHelplines={() => setIsHelplinesOpen(true)}
        onOpenSearch={() => setIsSpotlightOpen(true)}
      />

      {/* 
        ========================================
        MODALS & DIALOGS
        ========================================
      */}
      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={detailService}
        gradient={detailService ? getGradientForCategory(detailService.categoryId) : 'from-slate-700 to-slate-900'}
        onClose={() => setDetailService(null)}
      />

      {/* Spotlight Search Modal (⌘K) */}
      <SpotlightSearchModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        services={SERVICE_DATA}
        categories={CATEGORY_CONFIG}
        onSelectService={(s) => {
          setDetailService(s);
          setIsSpotlightOpen(false);
        }}
        onSelectCategory={(catId) => {
          handleCategorySelect(catId);
          setIsSpotlightOpen(false);
        }}
      />

      {/* 24x7 National Emergency & Helplines Modal */}
      <HelplinesModal
        isOpen={isHelplinesOpen}
        onClose={() => setIsHelplinesOpen(false)}
      />
    </div>
  );
};

export default App;

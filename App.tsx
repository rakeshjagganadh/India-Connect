import React, { useState, useMemo, useEffect } from 'react';
import { SERVICE_DATA, CATEGORY_CONFIG } from './constants';
import ServiceCard from './components/ServiceCard';
import Icon from './components/Icon';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for main content header
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 10);
  };

  const filteredServices = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // If there is a search query, search globally (ALL categories)
    if (lowerQuery.length > 0) {
      return SERVICE_DATA.filter(
        (service) =>
          service.title.toLowerCase().includes(lowerQuery) ||
          service.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Otherwise, filter by selected category
    if (selectedCategory === 'all') {
      return SERVICE_DATA;
    }

    return SERVICE_DATA.filter((service) => service.categoryId === selectedCategory);
  }, [selectedCategory, searchQuery]);

  // Helper to get gradient for a category (needed for cards)
  const getGradientForService = (categoryId: string) => {
    const cat = CATEGORY_CONFIG.find(c => c.id === categoryId);
    return cat ? cat.gradient : 'from-gray-500 to-gray-600';
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F5F7] text-[#1D1D1F] overflow-hidden font-sans">

      {/* 
        ========================================
        MOBILE HEADER (Visible only on mobile)
        ========================================
      */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-gray-200 z-30 flex items-center justify-between px-4">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-200/50 transition-colors"
        >
          <Icon name="menu" className="w-6 h-6" />
        </button>
        <div className="font-bold text-lg text-[#1D1D1F] tracking-tight">IndiaConnect</div>
        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-orange-400 via-white to-green-500 shadow-sm flex items-center justify-center">
           <span className="text-[10px] font-bold text-blue-900">IC</span>
        </div>
      </div>

      {/* 
        ========================================
        MOBILE OVERLAY BACKDROP
        ========================================
      */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* 
        ========================================
        SIDEBAR (Drawer on Mobile, Sticky on Desktop)
        ========================================
      */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-2xl border-r border-gray-200
        transform transition-transform duration-300 ease-out
        md:static md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col shadow-2xl md:shadow-none
      `}>
        {/* Sidebar Header */}
        <div className="px-6 py-6 md:py-8 flex items-center justify-between min-w-max">
           <div className="flex items-center gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-tr from-orange-400 via-white to-green-500 shadow-md flex items-center justify-center">
                <span className="text-sm md:text-lg font-bold text-blue-900">IC</span>
             </div>
             <div>
               <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#1D1D1F]">
                IndiaConnect
               </h1>
               <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full tracking-wider inline-block">
                 PRO
               </span>
             </div>
           </div>
           
           {/* Close Button (Mobile Only) */}
           <button 
             onClick={() => setIsMobileMenuOpen(false)}
             className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-800 transition-colors"
           >
             <Icon name="x" className="w-5 h-5" />
           </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-1">
          {CATEGORY_CONFIG.map((category) => (
             <button
               key={category.id}
               onClick={() => handleCategorySelect(category.id)}
               className={`
                 group flex items-center w-full px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200
                 ${selectedCategory === category.id && searchQuery === ''
                   ? 'bg-blue-600 text-white shadow-md' 
                   : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
               `}
             >
               <span className={`
                 w-2 h-2 rounded-full mr-3 transition-colors duration-200
                 ${selectedCategory === category.id && searchQuery === '' ? 'bg-white' : 'bg-transparent border border-gray-300 group-hover:border-gray-400'}
               `}></span>
               {category.title}
             </button>
          ))}
        </nav>
        
        {/* Sidebar Footer (Desktop Only) */}
        <div className="mt-auto p-6 hidden md:block">
           <p className="text-xs text-gray-400 leading-relaxed">
             Secure gateway to 100+ Govt Services.
             <br/>
             <span className="opacity-50">&copy; 2025</span>
           </p>
        </div>
      </aside>

      {/* 
        ========================================
        MAIN CONTENT AREA 
        ========================================
      */}
      <main 
        className="flex-1 h-full overflow-y-auto relative scroll-smooth pt-16 md:pt-0"
        onScroll={handleScroll}
      >
        {/* Sticky Search Header */}
        <header className={`
           sticky top-0 z-20 w-full px-4 md:px-6 py-4 md:py-6 transition-all duration-300
           ${scrolled ? 'bg-[#F5F5F7]/90 backdrop-blur-md shadow-sm border-b border-gray-200/50' : 'bg-[#F5F5F7]'}
        `}>
           <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="relative w-full max-w-lg group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full bg-white border border-gray-200 shadow-sm rounded-xl py-3 pl-12 pr-4 text-[15px] text-[#1D1D1F] placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="hidden lg:flex items-center space-x-2 text-xs font-semibold text-gray-400 uppercase tracking-wide ml-4">
                 <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                 <span>Online</span>
              </div>
           </div>
        </header>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20 pt-2">
          
          {/* Welcome Banner (Visible on 'All' category with no search) */}
          {selectedCategory === 'all' && searchQuery === '' && (
            <div className="mb-8 relative overflow-hidden rounded-[22px] bg-white border border-gray-200 shadow-sm p-6 md:p-10 animate-fade-in">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 blur-3xl opacity-50 pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                   <span className="text-[11px] font-bold uppercase tracking-wide text-blue-700">Unified Portal v2.0</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3 tracking-tight">
                  One Nation. One Dashboard.
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  Welcome to IndiaConnect, your premium gateway to 100+ essential government services. 
                  Access Aadhaar, Tax, Land Records, and Healthcare portals instantly in one secure, unified dashboard.
                </p>
                
                <div className="flex flex-wrap gap-4 md:gap-8 border-t border-gray-100 pt-6">
                   <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <Icon name="shield-check" className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">Official Sources</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <Icon name="zap" className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">Fast Access</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Icon name="users" className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">Citizen Centric</span>
                   </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Section Title */}
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1F] truncate mr-2">
              {searchQuery ? `Search: "${searchQuery}"` : 
               CATEGORY_CONFIG.find(c => c.id === selectedCategory)?.title}
            </h2>
            <span className="text-xs md:text-sm font-medium text-gray-400 whitespace-nowrap">
              {filteredServices.length} Services
            </span>
          </div>

          {/* The Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  gradient={getGradientForService(service.categoryId)}
                />
              ))}
            </div>
          ) : (
             <div className="h-64 flex flex-col items-center justify-center text-center opacity-60">
                <svg className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-500">No services found.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-blue-600 font-semibold hover:underline"
                >
                  Clear Search
                </button>
             </div>
          )}
          
          {/* Footer inside content area */}
          <footer className="mt-20 pt-10 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Not an official government website. Information directory only.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
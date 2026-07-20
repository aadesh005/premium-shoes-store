import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  Search, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const { wishlist } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync state from URL search params on mount or param change
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const filter = searchParams.get('filter');

    if (search) setSearchQuery(search);
    if (category) setSelectedCategories([category]);
    if (gender) setSelectedGenders([gender.charAt(0).toUpperCase() + gender.slice(1)]);
    if (filter === 'wishlist') {
      // Toggle a state or handle it
      setSelectedCategories([]);
      setSelectedGenders([]);
    }
  }, [searchParams]);

  // Handle category checkbox changes
  const handleCategoryChange = (cat: string) => {
    setCurrentPage(1);
    setSelectedCategories((prev) => 
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Handle gender checkbox changes
  const handleGenderChange = (gender: string) => {
    setCurrentPage(1);
    setSelectedGenders((prev) => 
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenders([]);
    setSelectedCategories([]);
    setMaxPrice(30000);
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Check if any filter is active
  const isFilterActive = useMemo(() => {
    return (
      searchQuery !== '' ||
      selectedGenders.length > 0 ||
      selectedCategories.length > 0 ||
      maxPrice < 30000 ||
      searchParams.get('filter') === 'wishlist'
    );
  }, [searchQuery, selectedGenders, selectedCategories, maxPrice, searchParams]);

  // Filter and sort computation
  const filteredAndSortedProducts = useMemo(() => {
    let results = [...PRODUCTS];

    // Wishlist Only Filter
    const isWishlistOnly = searchParams.get('filter') === 'wishlist';
    if (isWishlistOnly) {
      results = results.filter((p) => wishlist.includes(p.id));
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(
        (p) => 
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Gender filter
    if (selectedGenders.length > 0) {
      results = results.filter((p) => {
        if (selectedGenders.includes('Unisex')) {
          return selectedGenders.includes(p.gender) || p.gender === 'Unisex';
        }
        return selectedGenders.includes(p.gender);
      });
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    results = results.filter((p) => p.price <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Sort with a custom order or by ID
        results.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return results;
  }, [searchQuery, selectedGenders, selectedCategories, maxPrice, sortBy, searchParams, wishlist]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  // Ensure current page is valid when filters change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const displayedPriceRange = maxPrice.toLocaleString();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Title / Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-linear-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-lg">
          <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold block mb-2">Showcase Catalog</span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-display text-white">
            {searchParams.get('filter') === 'wishlist' ? 'Your Saved Wishlist' : 'Explore All Footwear'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-medium">
            Find premium sneakers, hand-burnished leather shoes, and comfortable slides. Filter by price, category, or gender to match your preference.
          </p>
        </div>
      </div>
 
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* DESKTOP SIDEBAR FILTER */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 bg-white border border-slate-150 p-6 rounded-3xl shadow-xs self-start">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5 font-display">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" /> Filters
            </h3>
            {isFilterActive && (
              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-black text-slate-500 hover:text-rose-500 hover:underline flex items-center gap-1 transition-all uppercase tracking-wide"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
 
          {/* Search Input Filter */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase block">Search Keyword</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Type shoe name..."
                value={searchQuery}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchQuery(e.target.value);
                }}
                className="w-full bg-slate-50 text-xs py-2.5 pl-3 pr-8 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-slate-800 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
 
          {/* Footwear Categories */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase block">Category</span>
            <div className="space-y-2">
              {['Sneakers', 'Sandals', 'Leather Shoes'].map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4 rounded-sm border-slate-300 text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
 
          {/* Gender options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase block">Gender</span>
            <div className="space-y-2">
              {['Men', 'Women', 'Unisex'].map((gender) => (
                <label key={gender} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(gender)}
                    onChange={() => handleGenderChange(gender)}
                    className="w-4 h-4 rounded-sm border-slate-300 text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                  />
                  {gender === 'Unisex' ? 'Unisex / All' : gender}
                </label>
              ))}
            </div>
          </div>
 
          {/* Max Price Range Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Max Price</span>
              <span className="text-xs font-black text-slate-900 font-mono">Rs. {displayedPriceRange}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="30000"
              step="500"
              value={maxPrice}
              onChange={(e) => {
                setCurrentPage(1);
                setMaxPrice(Number(e.target.value));
              }}
              className="w-full accent-orange-600 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono font-medium">
              <span>Rs. 5,000</span>
              <span>Rs. 30,000</span>
            </div>
          </div>
 
          {/* Extra visual checklist */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 block font-bold">⚡ Showroom Perks</span>
            <div className="text-[10px] text-slate-500 space-y-1.5 leading-relaxed font-semibold">
              <p>• Complimentary Nationwide Delivery</p>
              <p>• Direct door-to-door sizing swaps</p>
              <p>• Premium packaging matching standards</p>
            </div>
          </div>
        </aside>
 
        {/* MAIN PRODUCT VIEWPORT */}
        <main className="flex-1">
          
          {/* Top Control Bar: Total Results, Mobile Filter Trigger, Sort */}
          <div className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-wrap justify-between items-center mb-8 gap-4 shadow-xs">
            <div className="text-xs text-slate-500 font-semibold">
              Showing <span className="text-slate-950 font-black">{filteredAndSortedProducts.length}</span> luxury footwear model{filteredAndSortedProducts.length !== 1 ? 's' : ''}
              {searchParams.get('filter') === 'wishlist' && ' in your wishlist'}
            </div>
 
            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                id="mobile-filter-toggle-btn"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-slate-850 hover:text-white bg-slate-50 hover:bg-orange-600 border border-slate-200 px-4 py-2.5 rounded-xl transition-all shrink-0"
              >
                <Filter className="w-4 h-4" /> Filter
              </button>
 
              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setSortBy(e.target.value);
                  }}
                  className="bg-slate-50 text-xs font-bold text-slate-800 py-2.5 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="featured">Featured Selections</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">New Arrivals First</option>
                </select>
              </div>
            </div>
          </div>
 
          {/* Active Filter Badges */}
          {isFilterActive && (
            <div className="flex flex-wrap gap-2 mb-8 items-center">
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Active Filters:</span>
              
              {searchParams.get('filter') === 'wishlist' && (
                <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-rose-100">
                  <Heart className="w-3 h-3 fill-rose-600" /> Wishlist Only
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-slate-200">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-black"><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategories.map((cat) => (
                <span key={cat} className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-slate-200">
                  {cat}
                  <button onClick={() => handleCategoryChange(cat)} className="text-slate-400 hover:text-black"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {selectedGenders.map((gen) => (
                <span key={gen} className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-slate-200">
                  {gen}
                  <button onClick={() => handleGenderChange(gen)} className="text-slate-400 hover:text-black"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {maxPrice < 30000 && (
                <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-lg flex items-center gap-1 border border-slate-200">
                  Under Rs. {displayedPriceRange}
                  <button onClick={() => setMaxPrice(30000)} className="text-slate-400 hover:text-black"><X className="w-3 h-3" /></button>
                </span>
              )}
 
              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-black text-rose-500 hover:underline px-2 py-1 uppercase tracking-wide"
              >
                Clear All
              </button>
            </div>
          )}
 
          {/* Product Cards Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-500">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-12 text-center border border-dashed border-slate-250">
              <span className="text-3xl block mb-4">👟</span>
              <h3 className="text-base font-black text-slate-800 font-display">No matching footwear found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-medium">
                Try widening your price range, clearing some checkboxes, or searching for other keywords like "Pro", "Classic", "Slide", or "Air".
              </p>
              <button 
                onClick={handleResetFilters}
                className="mt-6 px-6 py-3 bg-orange-600 text-white font-bold text-xs rounded-xl hover:bg-orange-700 active:scale-95 transition-all shadow-sm"
              >
                Reset Search Filters
              </button>
            </div>
          )}
 
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-14 flex justify-center items-center gap-2">
              <button
                id="prev-page-btn"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2.5 border border-slate-200 hover:border-orange-500 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl transition-all disabled:opacity-45 disabled:pointer-events-none"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
 
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      currentPage === pageNum 
                        ? 'bg-orange-600 text-white shadow-md' 
                        : 'border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
 
              <button
                id="next-page-btn"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 border border-slate-200 hover:border-orange-500 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl transition-all disabled:opacity-45 disabled:pointer-events-none"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
 
        </main>
      </div>
 
      {/* MOBILE SLIDE-OUT FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[100] lg:hidden transition-all duration-300">
          <div className="fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5 font-display">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" /> Filters
                </h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-black transition-all"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
 
              {/* Form scroll list */}
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
                
                {/* Search query */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 tracking-wide uppercase block">Search Keyword</span>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type shoe name..."
                      value={searchQuery}
                      onChange={(e) => {
                        setCurrentPage(1);
                        setSearchQuery(e.target.value);
                      }}
                      className="w-full bg-slate-50 text-xs py-2.5 pl-3 pr-8 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-slate-800 font-medium"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
 
                {/* Categories */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 tracking-wide uppercase block">Category</span>
                  <div className="space-y-2">
                    {['Sneakers', 'Sandals', 'Leather Shoes'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                          className="w-4 h-4 rounded-sm border-slate-300 text-orange-600 accent-orange-600 focus:ring-orange-500"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
 
                {/* Genders */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 tracking-wide uppercase block">Gender</span>
                  <div className="space-y-2">
                    {['Men', 'Women', 'Unisex'].map((gender) => (
                      <label key={gender} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGenders.includes(gender)}
                          onChange={() => handleGenderChange(gender)}
                          className="w-4 h-4 rounded-sm border-slate-300 text-orange-600 accent-orange-600 focus:ring-orange-500"
                        />
                        {gender === 'Unisex' ? 'Unisex / All' : gender}
                      </label>
                    ))}
                  </div>
                </div>
 
                {/* Price range */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Max Price</span>
                    <span className="text-xs font-black text-slate-900 font-mono">Rs. {displayedPriceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="30000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setMaxPrice(Number(e.target.value));
                    }}
                    className="w-full accent-orange-600 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
 
              </div>
            </div>
 
            {/* Bottom buttons */}
            <div className="pt-6 border-t border-slate-100 flex gap-3">
              <button 
                onClick={handleResetFilters}
                className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-wider"
              >
                Reset All
              </button>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm uppercase tracking-wider"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
 
    </div>
  );
}

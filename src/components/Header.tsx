import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Percent, 
  Truck, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Header() {
  const { cartCount, wishlist } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  // Handle sticky header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search filter
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'All Shoes', path: '/shop' },
    { name: 'Sneakers', path: '/category/Sneakers' },
    { name: 'Sandals', path: '/category/Sandals' },
    { name: 'Leather Shoes', path: '/category/Leather Shoes' },
  ];

  const infoLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQs', path: '/faq' },
  ];

  return (
    <header className="w-full z-50 transition-all duration-300 font-sans">
      {/* Top Notification Bar */}
      <div className="bg-slate-950 text-white text-[11px] py-2 px-4 flex flex-wrap justify-between items-center gap-2 border-b border-slate-900">
        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium tracking-wide">
            <Truck className="w-3.5 h-3.5 text-orange-500" />
            FREE Express Shipping over Rs. 12,000 across Pakistan!
          </span>
          <span className="hidden md:inline-block text-slate-700">|</span>
          <span className="hidden md:flex items-center gap-1 text-orange-400 font-medium">
            <Percent className="w-3.5 h-3.5" /> Use Code <strong className="underline tracking-widest text-white">SOLE10</strong> for 10% off
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <Link to="/faq" className="hover:text-white transition-colors">Help & FAQ</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Track Order</Link>
          <span className="flex items-center gap-1 text-orange-500 font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Live Showcase
          </span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'sticky top-0 shadow-md border-b border-slate-100 py-3.5' : 'py-5 border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Mobile Menu Trigger */}
          <button 
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-slate-700 hover:text-black p-1 -ml-1 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 group">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-6 shadow-md border border-slate-800">
              <span className="font-black text-xl italic tracking-tighter text-orange-500">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl tracking-tighter font-black font-display text-slate-900 leading-none">SOLE<span className="text-orange-600">STYLE</span></span>
              <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase leading-none mt-1 font-bold">Luxury Footwear</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`text-sm font-bold tracking-wide hover:text-orange-600 transition-colors ${location.pathname === '/' ? 'text-orange-600 underline underline-offset-4' : 'text-slate-600'}`}>
              Home
            </Link>
            
            {/* Category Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-bold tracking-wide text-slate-600 hover:text-orange-600 transition-colors">
                Categories <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {categories.map((cat) => (
                  <Link 
                    key={cat.name} 
                    to={cat.path}
                    className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition-colors font-semibold"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/wishlist" className={`text-sm font-bold tracking-wide hover:text-orange-600 transition-colors ${location.pathname === '/wishlist' ? 'text-orange-600 underline underline-offset-4' : 'text-slate-600'}`}>
              Wishlist
            </Link>
            <Link to="/about" className={`text-sm font-bold tracking-wide hover:text-orange-600 transition-colors ${location.pathname === '/about' ? 'text-orange-600 underline underline-offset-4' : 'text-slate-600'}`}>
              About Us
            </Link>
            <Link to="/contact" className={`text-sm font-bold tracking-wide hover:text-orange-600 transition-colors ${location.pathname === '/contact' ? 'text-orange-600 underline underline-offset-4' : 'text-slate-600'}`}>
              Contact
            </Link>
            <Link to="/faq" className={`text-sm font-bold tracking-wide hover:text-orange-600 transition-colors ${location.pathname === '/faq' ? 'text-orange-600 underline underline-offset-4' : 'text-slate-600'}`}>
              FAQ
            </Link>
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Trigger */}
            <div className="relative" ref={searchRef}>
              <button 
                id="search-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-slate-700 hover:text-orange-600 p-2 rounded-full hover:bg-slate-50 transition-all"
                aria-label="Search items"
              >
                <Search className="w-5.5 h-5.5" />
              </button>

              {/* Instant Search Bar */}
              {isSearchOpen && (
                <div className="absolute right-0 sm:right-[-60px] top-full mt-3 w-80 sm:w-96 bg-white border border-slate-150 rounded-3xl shadow-2xl p-4.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search Sneakers, Oxfords, Sandals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-55 text-xs py-2.5 pl-4 pr-10 rounded-2xl border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-slate-800 font-medium"
                      autoFocus
                    />
                    <button type="submit" className="absolute right-2 text-slate-400 hover:text-orange-600 p-1.5 transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                  </form>

                  {/* Realtime dropdown list */}
                  {searchQuery.trim().length > 1 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block mb-2">Suggested Products</span>
                      {searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((prod) => (
                            <Link 
                              key={prod.id} 
                              to={`/product/${prod.id}`}
                              onClick={() => {
                                setIsSearchOpen(false);
                                  setSearchQuery('');
                              }}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                              <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 object-cover rounded-xl bg-slate-100 border border-slate-100" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-orange-600">{prod.name}</h4>
                                <p className="text-[10px] text-slate-400 font-medium">{prod.category} • {prod.gender}</p>
                              </div>
                              <span className="text-xs font-black text-slate-900">Rs. {prod.price.toLocaleString()}</span>
                            </Link>
                          ))}
                          <Link 
                            to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="block text-center text-xs font-bold text-slate-800 hover:text-orange-600 py-2 bg-slate-50 rounded-xl hover:bg-slate-100 mt-2 transition-colors border border-slate-100"
                          >
                            View All Search Results
                          </Link>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 py-2">No shoes found matching "{searchQuery}"</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link 
              to="/wishlist" 
              className="relative text-slate-700 hover:text-orange-600 p-2 rounded-full hover:bg-slate-50 transition-all hidden sm:inline-flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5.5 h-5.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-orange-600 text-[10px] text-white rounded-full flex items-center justify-center font-bold shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart link */}
            <Link 
              to="/cart" 
              className="relative text-slate-700 hover:text-orange-600 p-2 rounded-full hover:bg-slate-50 transition-all"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-orange-600 text-[10px] text-white rounded-full flex items-center justify-center font-bold animate-bounce shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>

      {/* Responsive Slide-out Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[100] lg:hidden transition-all duration-300">
          <div className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white font-extrabold italic text-sm">
                    <span className="text-orange-500">S</span>
                  </div>
                  <span className="text-lg font-black tracking-tighter text-slate-900 font-display">SOLE<span className="text-orange-600">STYLE</span></span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-black transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search in Mobile Menu */}
              <form onSubmit={handleSearchSubmit} className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search footwear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-55 text-sm py-2.5 pl-4 pr-10 rounded-2xl border border-slate-200 focus:outline-none"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Navigation list */}
              <div className="space-y-5">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">Shop Navigation</span>
                <Link 
                  to="/" 
                  className="block text-base font-bold text-slate-800 hover:text-orange-600 transition-colors"
                >
                  Home
                </Link>

                <div className="space-y-2 pl-2">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      to={cat.path}
                      className="block text-sm font-bold text-slate-600 hover:text-orange-600"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">Information</span>
                  {infoLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      to={link.path}
                      className="block text-sm font-bold text-slate-700 hover:text-orange-600"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-slate-100">
              <Link 
                to="/wishlist"
                className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-orange-600 mb-4"
              >
                <Heart className="w-4.5 h-4.5 text-orange-500" /> Wishlist ({wishlist.length})
              </Link>
              <p className="text-xs text-slate-400 font-medium">Complimentary Nationwide Delivery</p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono font-bold">Premium Customer Service: +92-300-SOLSTYLE</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

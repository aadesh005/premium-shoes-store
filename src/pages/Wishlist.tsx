import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight, Sparkles, Trash2, Home, ChevronRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useShop();

  // Find all products that are in the wishlist
  const wishlistedProducts = React.useMemo(() => {
    return PRODUCTS.filter((product) => wishlist.includes(product.id));
  }, [wishlist]);

  // Handle clearing the entire wishlist
  const handleClearWishlist = () => {
    // Toggle all currently wishlisted products out of the list
    wishlist.forEach((id) => {
      toggleWishlist(id);
    });
  };

  // Empty wishlist fallback state
  if (wishlistedProducts.length === 0) {
    return (
      <div 
        className="max-w-4xl mx-auto px-4 py-24 text-center font-sans animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-6 shadow-sm">
          <Heart className="w-10 h-10 fill-rose-500/10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Keep track of the footwear models you adore! Add items to your wishlist and they will be waiting here for you when you are ready to decide.
        </p>
        <Link 
          to="/shop" 
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
        >
          Explore Catalog <ArrowRight className="w-4 h-4 text-orange-500" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-8" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-black flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-900 font-bold">Wishlist</span>
      </nav>

      {/* Header Banner */}
      <div 
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-100 pb-6 mb-10 animate-in fade-in slide-in-from-bottom-3 duration-400"
      >
        <div>
          <span className="flex items-center gap-1.5 text-orange-600 uppercase tracking-widest text-[10px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> CURATED FAVOURITES
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            Your Wishlist
            <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 uppercase font-mono">
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl font-medium">
            Review and easily add your saved premium sneakers, bespoke leather shoes, and anatomical sandals to your luxury shopping bag.
          </p>
        </div>

        <button 
          onClick={handleClearWishlist}
          className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Trash2 className="w-4 h-4" /> Clear All Saved
        </button>
      </div>

      {/* Product Catalog Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-in fade-in duration-500 delay-100"
      >
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Continuation CTA */}
      <div 
        className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg animate-in fade-in duration-500 delay-200"
      >
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/20 z-10 pointer-events-none"></div>
        <div className="relative z-20 max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
            Ready to find more premium footwear?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
            We continuously drop fresh designer collections. Check back often or search all our premium boots, oxfords, active slides, and track sneakers.
          </p>
          <Link 
            to="/shop" 
            className="mt-2 inline-flex items-center gap-1.5 px-6 py-3 bg-white text-slate-900 hover:bg-neutral-100 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            Browse New Arrivals <ArrowRight className="w-4 h-4 text-orange-500" />
          </Link>
        </div>
      </div>

    </div>
  );
}

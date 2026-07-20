import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  key?: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const navigate = useNavigate();
  const isWishlisted = isInWishlist(product.id);

  // Quick add to cart chooses first size and color
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes[1] || product.sizes[0], product.colors[0]);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discounted = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = discounted 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-250 transition-all duration-300 flex flex-col h-full relative font-sans">
      
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 shrink-0">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-xs text-white ${
              product.badge === 'Best Seller' ? 'bg-orange-600' :
              product.badge === 'Premium' ? 'bg-slate-900' :
              product.badge === 'Sale' ? 'bg-rose-500' :
              product.badge === 'Exclusive' ? 'bg-purple-600' : 'bg-slate-800'
            }`}>
              {product.badge}
            </span>
          )}
          {discounted && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-xs bg-emerald-500 text-white">
              -{discountPercent}% OFF
            </span>
          )}
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-xs bg-white/90 text-slate-800 border border-slate-100 backdrop-blur-xs self-start">
            {product.gender}
          </span>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full shadow-md z-10 transition-all duration-300 ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 scale-105' 
              : 'bg-white text-slate-400 hover:text-rose-500 hover:bg-slate-50'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="w-4.5 h-4.5 transition-colors" fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Hover overlay quick actions */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
          <Link 
            to={`/product/${product.id}`}
            className="p-3 bg-white text-slate-900 hover:bg-orange-600 hover:text-white rounded-full shadow-lg transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button 
            onClick={handleQuickAdd}
            className="p-3 bg-white text-slate-900 hover:bg-orange-600 hover:text-white rounded-full shadow-lg transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            title="Quick Add to Cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Card Body Information */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Category badge */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
            {product.category}
          </span>
          {/* Stars */}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-current" />
            <span className="text-xs font-bold text-slate-800">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product title */}
        <Link 
          to={`/product/${product.id}`}
          className="text-sm font-extrabold text-slate-800 hover:text-orange-600 line-clamp-1 mb-1.5 group-hover:underline decoration-orange-600 transition-all font-display"
        >
          {product.name}
        </Link>

        {/* Short description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 font-medium">
          {product.description}
        </p>

        {/* Price & Action Container */}
        <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            {discounted && (
              <span className="text-xs text-slate-400 line-through leading-none mb-0.5 font-bold">
                Rs. {product.originalPrice!.toLocaleString()}
              </span>
            )}
            <span className="text-base font-black text-slate-900 leading-none font-display">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          <button 
            onClick={handleQuickAdd}
            className="text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-3.5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Buy
          </button>
        </div>

      </div>

    </div>
  );
}

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ArrowLeft, Home, Sparkles } from 'lucide-react';

const CATEGORY_META: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  tag: string;
  accentColor: string;
}> = {
  'Sneakers': {
    title: 'High-Performance & Lifestyle Sneakers',
    subtitle: 'Step into the future of foot mechanics and streetwear design.',
    description: 'Our sneakers combine cutting-edge tech like carbon propulsion plates, shock-absorbing nitrogen-infused foams, and breathable fly-knit uppers with outstanding aesthetics to keep your posture aligned and your wardrobe sharp.',
    bgImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop',
    tag: 'ULTRA COMFORT',
    accentColor: 'text-emerald-400'
  },
  'Leather Shoes': {
    title: 'Bespoke Premium Leather Shoes',
    subtitle: 'Timeless European style meticulously crafted from elite English & Italian calfskins.',
    description: 'Step into classical sophistication with Goodyear welted Oxfords, Brogues, and handcrafted loafers. Hand-burnished to an rich vintage luster, each pair adapts uniquely to your stride to provide absolute comfort in the boardroom or ballroom.',
    bgImage: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop',
    tag: 'EXECUTIVE SOVEREIGN',
    accentColor: 'text-amber-400'
  },
  'Sandals': {
    title: 'Anatomical Slides & Sandals',
    subtitle: 'Laid-back warm-weather footwear featuring contoured cork-latex beds.',
    description: 'Designed for effortless elegance and summer excursions. Handcrafted with vegetable-tanned genuine leathers, quick-dry active web straps, and orthopedic cork footbeds that cradle your arches and provide supreme shock relief.',
    bgImage: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1200&auto=format&fit=crop',
    tag: 'SUMMER ARCHES',
    accentColor: 'text-sky-400'
  }
};

export default function Category() {
  const { categoryName } = useParams<{ categoryName: string }>();

  // Format parameter (e.g. handle decoded spaces or casing)
  const activeCategory = useMemo(() => {
    if (!categoryName) return '';
    // Find matching category in products
    const decoded = decodeURIComponent(categoryName);
    const match = PRODUCTS.find(p => p.category.toLowerCase() === decoded.toLowerCase());
    return match ? match.category : decoded;
  }, [categoryName]);

  // Filter products matching this category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const meta = CATEGORY_META[activeCategory] || {
    title: `${activeCategory} Collection`,
    subtitle: 'Premium hand-selected footwear.',
    description: 'Browse our exclusive line of handcrafted models built for superior comfort, durability, and style.',
    bgImage: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1200&auto=format&fit=crop',
    tag: 'LIMITED SPECIAL',
    accentColor: 'text-neutral-300'
  };

  // Get other categories to recommend
  const otherCategories = useMemo(() => {
    const allCats = ['Sneakers', 'Sandals', 'Leather Shoes'];
    return allCats.filter(cat => cat !== activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-semibold mb-8" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-black flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
        <Link to="/shop" className="hover:text-black transition-colors">Categories</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
        <span className="text-neutral-900 font-bold">{activeCategory}</span>
      </nav>

      {/* 2. Category Hero Banner */}
      <section className="bg-neutral-900 text-white rounded-3xl overflow-hidden relative min-h-[350px] flex items-center p-8 sm:p-12 lg:p-16 mb-14 shadow-md">
        {/* Overlay backdrop */}
        <div className="absolute inset-0 bg-neutral-950/60 z-10"></div>
        <img 
          src={meta.bgImage} 
          alt={activeCategory} 
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        <div className="relative z-20 max-w-2xl flex flex-col items-start gap-3.5">
          <span className="flex items-center gap-1 px-2.5 py-1 bg-white/15 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            {meta.tag}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            {meta.title}
          </h1>
          <p className="text-sm font-semibold text-neutral-200 leading-relaxed max-w-xl">
            {meta.subtitle}
          </p>
          <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
            {meta.description}
          </p>
          <Link 
            to="/shop"
            className="mt-4 flex items-center gap-1.5 text-xs font-bold text-white hover:underline hover:text-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to all models
          </Link>
        </div>
      </section>

      {/* 3. Product Catalog Grid */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
          <h2 className="text-xl font-bold text-neutral-900">
            Available Models ({categoryProducts.length})
          </h2>
          <span className="text-xs text-neutral-500 font-semibold">
            Complimentary doorstep delivery in Pakistan
          </span>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-50 rounded-3xl p-12 text-center border border-dashed border-neutral-200">
            <h3 className="text-sm font-bold text-neutral-800">No products found in {activeCategory}</h3>
            <p className="text-xs text-neutral-500 mt-1">Check back later or browse other categories.</p>
          </div>
        )}
      </section>

      {/* 4. Cross-sell Recommendation collections */}
      <section className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-100">
        <h3 className="text-lg font-bold text-neutral-900 mb-6 text-center">Explore Other Handcrafted Collections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherCategories.map((cat) => {
            const info = CATEGORY_META[cat];
            if (!info) return null;
            return (
              <div 
                key={cat}
                className="group bg-white border border-neutral-150 rounded-2xl p-6 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">RECOMMENDED</span>
                  <h4 className="text-base font-black text-neutral-900 group-hover:text-black transition-colors">{cat}</h4>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{info.subtitle}</p>
                </div>
                <div className="mt-6">
                  <Link 
                    to={`/category/${cat}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-black group-hover:underline"
                  >
                    Browse Collection <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  ChevronLeft, 
  ChevronRight,
  Star
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'THE ULTIMATE COMFORT IN MOTION',
    heading: 'High-Performance Neon Sneakers',
    description: 'Engineered with responsive carbon propulsion, breathable seamless mesh, and next-generation dual cushion to elevate your stride.',
    btnText: 'Shop Sneakers',
    link: '/category/Sneakers',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop',
    tag: 'NEW ARRIVAL'
  },
  {
    id: 2,
    title: 'HERITAGE EUROPEAN CRAFTSMANSHIP',
    heading: 'Bespoke Italian Leather Oxfords',
    description: '100% genuine full-grain calfskin leather, hand-burnished details, and Goodyear welted soles crafted to last a lifetime.',
    btnText: 'Shop Leather Shoes',
    link: '/category/Leather Shoes',
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop',
    tag: 'PREMIUM EXECUTIVE'
  },
  {
    id: 3,
    title: 'EASY BAREFOOT SOPHISTICATION',
    heading: 'Anatomical Summer Cork Sandals',
    description: 'Natural contoured cork-latex beds covered with buttery-soft brushed suede for luxurious, effortless warm-weather styling.',
    btnText: 'Shop Sandals',
    link: '/category/Sandals',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1200&auto=format&fit=crop',
    tag: 'SUMMER ESSENTIALS'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'best' | 'new' | 'featured'>('featured');

  // Slide transition effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Filtered lists for display
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  const getActiveProducts = () => {
    if (activeTab === 'best') return bestSellers;
    if (activeTab === 'new') return newArrivals;
    return featuredProducts;
  };

  return (
    <div className="w-full bg-slate-50 font-sans pb-12">
      
      {/* 1. Hero Carousel (Framed Bento Component) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-900">
          {HERO_SLIDES.map((slide, idx) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
                idx === currentSlide 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {/* Backdrop image */}
              <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
              <img 
                src={slide.image} 
                alt={slide.heading} 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Content stage */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="px-6 sm:px-12 lg:px-16 w-full text-white">
                  <div className="max-w-2xl flex flex-col items-start gap-4 sm:gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-800 backdrop-blur-md text-orange-400">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                      {slide.tag}
                    </span>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] font-display">
                      {slide.heading}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-medium">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-2">
                      <Link 
                        to={slide.link}
                        className="bg-orange-600 text-white hover:bg-orange-700 active:scale-95 px-7 py-3.5 rounded-2xl font-bold text-xs tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                      >
                        {slide.btnText} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link 
                        to="/shop"
                        className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white hover:bg-slate-900/90 px-7 py-3.5 rounded-2xl font-bold text-xs tracking-wide transition-all backdrop-blur-md"
                      >
                        Browse Catalog
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 bg-slate-950/45 hover:bg-orange-600 border border-slate-800 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 bg-slate-950/45 hover:bg-orange-600 border border-slate-800 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Carousel dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-orange-500' : 'w-1.5 bg-white/40'}`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Custom Category Showcase (Bento Block Grid) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-600 font-bold block mb-2">Refined Selections</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-display">Shop by Category</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Explore handcrafted designs tailored for active, professional, and weekend lifestyles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Sneakers */}
            <div className="group relative h-96 rounded-3xl overflow-hidden shadow-md border border-slate-150">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" 
                alt="Sneakers" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end items-start text-white">
                <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase mb-1 font-bold">Dynamic Fit</span>
                <h3 className="text-xl font-bold font-display mb-1 text-white">Sneakers & Athleisure</h3>
                <p className="text-xs text-slate-300 mb-4 font-medium">Carbon propulsion plates, mesh runners, and street low-tops.</p>
                <Link 
                  to="/category/Sneakers"
                  className="px-4 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 hover:bg-orange-600 hover:text-white transition-colors shadow-sm"
                >
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Leather Shoes */}
            <div className="group relative h-96 rounded-3xl overflow-hidden shadow-md border border-slate-150">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1486308512493-ae6a1e530099?q=80&w=600&auto=format&fit=crop" 
                alt="Leather Shoes" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end items-start text-white">
                <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase mb-1 font-bold">Elite Class</span>
                <h3 className="text-xl font-bold font-display mb-1 text-white">Premium Leather Shoes</h3>
                <p className="text-xs text-slate-300 mb-4 font-medium">Goodyear welted Oxfords, Brogue boots, and tassel loafers.</p>
                <Link 
                  to="/category/Leather Shoes"
                  className="px-4 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 hover:bg-orange-600 hover:text-white transition-colors shadow-sm"
                >
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Sandals */}
            <div className="group relative h-96 rounded-3xl overflow-hidden shadow-md border border-slate-150">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=600&auto=format&fit=crop" 
                alt="Sandals" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end items-start text-white">
                <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase mb-1 font-bold">Laid Back</span>
                <h3 className="text-xl font-bold font-display mb-1 text-white">Slides & Sandals</h3>
                <p className="text-xs text-slate-300 mb-4 font-medium">Contoured cork-latex footbeds, active straps, and dress slides.</p>
                <Link 
                  to="/category/Sandals"
                  className="px-4 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 hover:bg-orange-600 hover:text-white transition-colors shadow-sm"
                >
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Product Catalog Grid with Active Tabs */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-150 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="py-4">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div className="max-w-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-orange-600 font-bold block mb-2">Curated Selections</span>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl font-display">Featured Collections</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Discover footwear constructed using the finest materials and orthotic comfort technology.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl self-start border border-slate-200">
              <button 
                onClick={() => setActiveTab('featured')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  activeTab === 'featured' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                Featured Pairs
              </button>
              <button 
                onClick={() => setActiveTab('best')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  activeTab === 'best' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                Best Sellers
              </button>
              <button 
                onClick={() => setActiveTab('new')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  activeTab === 'new' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                New Arrivals
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {getActiveProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-950 text-white hover:bg-orange-600 active:scale-95 text-sm font-bold tracking-wide rounded-2xl shadow-md transition-all group border border-slate-900"
            >
              Browse Entire Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Elegant Promotional Banner */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative shadow-xl border border-slate-800">
            {/* Background vector accents */}
            <div className="absolute top-0 right-0 w-80 h-full bg-linear-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
            
            <div className="p-8 sm:p-12 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
              <div className="max-w-xl text-center md:text-left">
                <span className="text-[10px] font-mono tracking-widest text-orange-400 font-bold uppercase block mb-3">Limited Period Offer</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-display">
                  Premium Experience. Smart Savings.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-medium">
                  Apply voucher code <strong className="text-orange-400 underline tracking-widest font-bold">SOLE10</strong> during checkout to unlock a flat 10% instant discount across sneakers, oxfords, and sandals.
                </p>
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="px-3.5 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 font-bold">
                    🚚 Free Express Nationwide Delivery
                  </div>
                  <div className="px-3.5 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 font-bold">
                    🔄 15-Day Exchange Policy
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl text-center shadow-lg min-w-[240px] shrink-0">
                <span className="text-xs text-slate-400 font-bold block">WEEKEND PROMO CODE</span>
                <span className="text-2xl font-mono font-black text-white block mt-1 tracking-widest uppercase text-orange-500">SOLE10</span>
                <span className="text-[10px] text-orange-400 font-black block mt-1">10% OFF EXTRA</span>
                <Link 
                  to="/shop"
                  className="block mt-4 text-center text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 py-3 px-4 rounded-xl transition-colors shadow-sm"
                >
                  Shop with Code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-150 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="py-4">
          
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-600 font-bold block mb-2">Verified Feedback</span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl font-display">Client Testimonials</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Read honest feedback from stylish individuals, fitness runners, and corporate executives across Pakistan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {REVIEWS.map((review) => (
              <div 
                key={review.id}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-150 hover:border-slate-250 transition-all shadow-xs hover:shadow-md flex flex-col"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-slate-200'
                      }`} 
                      id={`star-${review.id}-${i}`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-6 flex-1 font-medium">
                  "{review.comment}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  {review.avatar && (
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="w-10 h-10 object-cover rounded-full bg-slate-200 border border-slate-250" 
                    />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{review.author}</h4>
                    <span className="text-[9px] text-slate-400 font-semibold font-mono">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Newsletter Sign-up */}
      <div className="mt-16 sm:mt-20">
        <Newsletter />
      </div>

    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Heart, Award, ArrowRight, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Header Hero Banner */}
      <section className="bg-neutral-900 text-white rounded-3xl overflow-hidden relative min-h-[300px] flex items-center p-8 sm:p-12 lg:p-16 mb-14 shadow-md">
        <div className="absolute inset-0 bg-neutral-950/65 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1200&auto=format&fit=crop" 
          alt="Footwear Craftsmanship" 
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 max-w-2xl flex flex-col items-start gap-3.5 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="flex items-center gap-1 px-2.5 py-1 bg-white/15 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            OUR STORY & LEGACY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            Handcrafted Footwear, Reimagined.
          </h1>
          <p className="text-sm font-semibold text-neutral-200 leading-relaxed max-w-xl">
            Where classical European leather craft meets state-of-the-art orthopedic sports biomechanics.
          </p>
        </div>
      </section>

      {/* 2. Split Screen Heritage Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">SINCE 2012</span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight">
            The Stride Towards Perfect Posture Alignment
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Founded with a singular vision to alleviate back strain and plantar pressure caused by flat, rigid footwear. SoleStyle began as a bespoke orthopedic workshop in Karachi. Over the years, our certified podiatrists and shoemakers worked together to develop the <strong>AeroCell® Dual Cushion</strong> and the contoured **Cork-latex cradle**.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            By sourcing top-grade calfskin from sustainable local tanneries, and custom-molding every outsole to support the natural skeletal system, we make sure each step returns energy and aligns the joints correctly, without compromising on haute-couture styles.
          </p>
          <div className="pt-2">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-all"
            >
              Shop Curated Pairs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-4/3 bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=800&auto=format&fit=crop" 
            alt="Hand stitching leather shoes" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. Core Pillars / Values Cards */}
      <section className="py-16 border-t border-b border-neutral-200 mb-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-2">Our Pillars</span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">Built on Three Core Principles</h2>
          <p className="text-xs text-neutral-500 mt-2">Every pair we design is subject to extensive podiatric wear trials and quality logs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white border border-neutral-150 p-8 rounded-2xl shadow-xs flex flex-col gap-4">
            <div className="w-12 h-12 bg-neutral-50 text-neutral-900 rounded-xl flex items-center justify-center border border-neutral-150">
              <Award className="w-5.5 h-5.5 text-emerald-500" />
            </div>
            <h3 className="font-bold text-base text-neutral-900">Uncompromising Integrity</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We never utilize synthetic imitation "pleathers" or toxic formaldehyde adhesives. All leather oxfords are 100% full-grain calfskin tanned utilizing eco-safe natural vegetable extracts.
            </p>
          </div>

          <div className="bg-white border border-neutral-150 p-8 rounded-2xl shadow-xs flex flex-col gap-4">
            <div className="w-12 h-12 bg-neutral-50 text-neutral-900 rounded-xl flex items-center justify-center border border-neutral-150">
              <Compass className="w-5.5 h-5.5 text-amber-500" />
            </div>
            <h3 className="font-bold text-base text-neutral-900">Anatomical Archetypes</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Our designs match the standard organic human footbed shape. By stabilizing the heel block, raising the central metatarsal arch, and widening the toe box, our pairs prevent long-term fatigue.
            </p>
          </div>

          <div className="bg-white border border-neutral-150 p-8 rounded-2xl shadow-xs flex flex-col gap-4">
            <div className="w-12 h-12 bg-neutral-50 text-neutral-900 rounded-xl flex items-center justify-center border border-neutral-150">
              <Heart className="w-5.5 h-5.5 text-sky-500" />
            </div>
            <h3 className="font-bold text-base text-neutral-900">Handmade Craft Preservation</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              By hiring generational shoemakers and providing highly paid, safe artisanal workspaces in Sindh and Punjab, we preserve the rich heritage of classical South Asian and European footwear design.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Mini Call to Action section */}
      <section className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-80 h-full bg-linear-to-r from-emerald-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block">CHOOSE COMFORT</span>
          <h3 className="text-2xl sm:text-3xl font-black">Experience the Difference in Every Step</h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Ready to swap heavy, rigid, flat soles for active podiatric cradles? Explore our collections of luxury lifestyle sneakers, formal oxfords, or casual cork slides.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link 
              to="/shop" 
              className="px-6 py-3 bg-white text-neutral-950 font-bold text-xs rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Browse Catalog
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 border border-white/30 hover:border-white hover:bg-white/10 text-white font-bold text-xs rounded-xl transition-all"
            >
              Book Fitting Showroom Visit
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

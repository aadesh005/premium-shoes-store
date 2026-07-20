import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      
      {/* Visual illustration */}
      <div className="w-20 h-20 bg-neutral-50 border border-neutral-150 rounded-3xl flex items-center justify-center text-neutral-400 mx-auto animate-bounce shadow-inner">
        <Compass className="w-10 h-10 text-neutral-600" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-bold">404 ERROR DETECTED</span>
        <h1 className="text-3xl font-black text-neutral-900 tracking-tight">This Shoe Lost Its Path!</h1>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
          We’re sorry, but the page or footwear catalog link you followed appears to have wandered off our roadmap. Let’s guide you back to steady ground.
        </p>
      </div>

      {/* Suggested navigation pathways */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <Link 
          to="/" 
          className="px-6 py-3 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
        >
          <Home className="w-3.5 h-3.5" /> Return to Home
        </Link>
        <Link 
          to="/shop" 
          className="px-6 py-3 border border-neutral-200 hover:border-neutral-900 text-neutral-800 font-bold text-xs rounded-xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-1.5 group"
        >
          Browse Shoe Catalog <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

    </div>
  );
}

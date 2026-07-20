import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Footprints, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  Facebook, 
  Instagram, 
  Twitter
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 font-sans">
      
      {/* Trust Badges - Top Row */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-orange-500 border border-slate-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-wide text-white">100% Authentic Products</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Directly sourced premium craftsmanship, guaranteed genuine leather & top-grade sneakers.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-orange-500 border border-slate-800">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-wide text-white">15-Day Free Exchanges</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Wrong size? No problem. Free door-to-door sizing exchanges across Pakistan.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-orange-500 border border-slate-800">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-wide text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Always available via email or phone support to help track or modify your order.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-orange-500 border border-slate-800">
              <Footprints className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-wide text-white">Handcrafted Integrity</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Meticulously inspected pairs matching global standards in ergonomics and fashion.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* About Brand */}
        <div className="flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black italic text-base border border-slate-800">
              <span className="text-orange-500">S</span>
            </div>
            <span className="text-lg font-black tracking-tighter text-white font-display">SOLE<span className="text-orange-500">STYLE</span></span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Pakistan’s premier multi-brand footwear showcase. Merging premium European leather craft with cutting-edge streetwear sneaker technology for unparalleled style and day-long posture support.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-xl hover:bg-orange-600 hover:text-white transition-colors text-slate-400 border border-slate-800">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-xl hover:bg-orange-600 hover:text-white transition-colors text-slate-400 border border-slate-800">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-xl hover:bg-orange-600 hover:text-white transition-colors text-slate-400 border border-slate-800">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Shoe Categories */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Footwear Categories</h3>
          <ul className="space-y-3 text-xs text-slate-400 font-medium">
            <li>
              <Link to="/shop" className="hover:text-orange-500 transition-colors">Show All Shoes</Link>
            </li>
            <li>
              <Link to="/category/Sneakers" className="hover:text-orange-500 transition-colors">Lifestyle & Running Sneakers</Link>
            </li>
            <li>
              <Link to="/category/Leather Shoes" className="hover:text-orange-500 transition-colors">Premium Leather Oxfords & Brogues</Link>
            </li>
            <li>
              <Link to="/category/Sandals" className="hover:text-orange-500 transition-colors">Casual Cork Slides & Sport Sandals</Link>
            </li>
            <li>
              <Link to="/shop?gender=men" className="hover:text-orange-500 transition-colors">Men’s Executive Footwear</Link>
            </li>
            <li>
              <Link to="/shop?gender=women" className="hover:text-orange-500 transition-colors">Women’s Elegant & Comfort Footwear</Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Customer Care</h3>
          <ul className="space-y-3 text-xs text-slate-400 font-medium">
            <li>
              <Link to="/about" className="hover:text-orange-500 transition-colors">Our Story & Heritage</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Our Support</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-orange-500 transition-colors">Frequently Asked Questions (FAQ)</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-conditions" className="hover:text-orange-500 transition-colors">Terms & Conditions of Sale</Link>
            </li>
            <li>
              <Link to="/404" className="hover:text-orange-500 transition-colors">Track Shipment (404 demo)</Link>
            </li>
          </ul>
        </div>

        {/* Showroom Contact details */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">SoleStyle Showroom</h3>
          <ul className="space-y-4 text-xs text-slate-400 font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <span>Plot 24-C, Lane 5, Bukhari Commercial Area, Phase 6, DHA, Karachi, Pakistan</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span>+92 (300) 765-3789</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <span>support@solestyle.pk</span>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-slate-900">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block mb-2">We Accept</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[9px] text-slate-300 font-bold">Cash on Delivery</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[9px] text-slate-300 font-bold">Visa / Mastercard</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[9px] text-slate-300 font-bold">EasyPaisa</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[9px] text-slate-300 font-bold">JazzCash</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom copyright row */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center md:text-left font-semibold">
          <p>© {currentYear} SoleStyle Pakistan Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-[10px] text-slate-600">Static Premium Showcase. Built with React (Vite) and Tailwind.</p>
        </div>
      </div>

    </footer>
  );
}

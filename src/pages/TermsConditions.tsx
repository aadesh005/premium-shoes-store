import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Home } from 'lucide-react';

export default function TermsConditions() {
  const lastUpdated = 'July 20, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back links */}
      <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-8">
        <Link to="/" className="hover:text-black flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Terms & Conditions</span>
      </div>

      <div className="bg-white border border-neutral-100 p-6 sm:p-10 rounded-3xl shadow-xs space-y-6">
        
        <div className="border-b border-neutral-100 pb-5">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mb-3" />
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">Terms & Conditions of Sale</h1>
          <p className="text-[10px] text-neutral-400 font-mono tracking-widest mt-1">LAST UPDATED: {lastUpdated}</p>
        </div>

        {/* Terms Texts */}
        <div className="text-xs sm:text-sm text-neutral-600 space-y-6 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">1. Showcase Disclaimer</h2>
            <p>
              By accessing SoleStyle Pakistan ("Website"), you acknowledge that this is a premium **static eCommerce showcase application** built for showcasing handcrafted footwear designs. Any actions taken, including adding shoes to the shopping bag, applying promo discount coupons, or typing shipping coordinates during checkout, are purely client-side simulations. No real financial payments are processed, and no physical shoe deliveries are dispatched.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">2. Handcrafted Size & Color Variation</h2>
            <p>
              Because our leather footwear (Oxfords, Brogues, and Sandals) is handcrafted using 100% authentic full-grain calfskin leather and hand-burnished details, minor variations in texture, color, and finish are natural. These characteristics are not faults, but proof of unique hand-waxed craftsmanship.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">3. 15-Day Doorstep Sizing Exchange Policy</h2>
            <p>
              For our simulated and future real commerce channels, we offer a complimentary 15-day exchange policy. If your received footwear does not fit perfectly, you may exchange it for another size. The shoe must be in brand-new, unworn condition, returned in its original SoleStyle packaging, accompanied by the proof of purchase receipt.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">4. Pricing in Pakistani Rupees (PKR)</h2>
            <p>
              All prices displayed on the website are listed in Pakistani Rupees (PKR) and are inclusive of standard local distribution taxes. We reserve the right to alter pricing catalogs or discontinue seasonal sneaker drops or boot lines without prior notice.
            </p>
          </section>

        </div>

        <div className="pt-6 border-t border-neutral-100 text-center sm:text-left">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 px-6 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back Home
          </Link>
        </div>

      </div>

    </div>
  );
}

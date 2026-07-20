import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Home } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = 'July 20, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back links */}
      <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-8">
        <Link to="/" className="hover:text-black flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Privacy Policy</span>
      </div>

      <div className="bg-white border border-neutral-100 p-6 sm:p-10 rounded-3xl shadow-xs space-y-6">
        
        <div className="border-b border-neutral-100 pb-5">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mb-3" />
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">Privacy Policy</h1>
          <p className="text-[10px] text-neutral-400 font-mono tracking-widest mt-1">LAST UPDATED: {lastUpdated}</p>
        </div>

        {/* Policy Texts */}
        <div className="text-xs sm:text-sm text-neutral-600 space-y-6 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">1. Information We Collect</h2>
            <p>
              SoleStyle Pakistan ("we", "our", "us") respects your privacy. When you browse our static website or place a simulated purchase through our checkout portal, we temporarily request details including your recipient name, contact email address, Pakistan delivery phone number, and physical billing/shipping address.
            </p>
            <p>
              Please note that as a **static showcase catalog**, all checkout inputs are handled strictly on the client side in your local browser window. We do not store or persist these metrics on external databases, nor do we sell or disclose customer records to third-party telemarketing groups.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">2. Cookies and Local Storage</h2>
            <p>
              We utilize browser **Local Storage** (`localStorage`) to remember items added to your active Shopping Bag, coupon codes applied, and footwear models added to your wishlist. This data remains on your physical device and can be cleared at any time by wiping your browser’s cache or clearing site cookies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">3. Payment Credentials and Credit Cards</h2>
            <p>
              If you select the credit card payment gateway during checkout, we show input fields for card numbers, expirations, and security CVV codes. This is purely a visual simulation. We do not transmit, process, or authorize real financial transactions, and card numbers are never stored. For real transactions, we recommend utilizing Cash on Delivery (COD) where payment is rendered physically upon parcel delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wide">4. Contacting Our Privacy Officer</h2>
            <p>
              For further inquiries regarding privacy protection, local cookie tracking, or user details clearance, please reach out to our team at **support@solestyle.pk** or call us at **+92-300-SOLSTYLE**.
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

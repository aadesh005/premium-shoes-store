import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please check and try again.');
      return;
    }

    // Success transition
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden font-sans border-t border-slate-800">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        {/* Subtle Icon */}
        <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6 border border-slate-850 shadow-inner">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 font-display">
          Join the SoleStyle Elite
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-10 font-medium">
          Subscribe to receive private sale invitations, sneaker drop alerts, custom fitting advice, and <strong className="text-orange-400">Rs. 1,000 off</strong> your next luxury purchase.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 bg-slate-950 border border-slate-850 rounded-2xl shadow-xl">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none text-white placeholder-slate-600 font-medium"
                required
              />
              <button 
                type="submit"
                className="bg-orange-600 text-white hover:bg-orange-700 active:scale-95 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-1.5 group shrink-0"
              >
                Join Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {error && (
              <p className="text-rose-400 text-xs mt-3 font-semibold text-left sm:text-center animate-pulse">
                {error}
              </p>
            )}

            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium">
              By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a> and <a href="/terms-conditions" className="underline hover:text-white">Terms of Sale</a>. No spam, unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-8 bg-slate-950/90 border border-slate-850 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Welcome to the Club!</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              We’ve sent your exclusive **Rs. 1,000 discount voucher** to your inbox. Check your emails shortly to unlock your premium shopping benefits.
            </p>
            <button 
              onClick={() => setIsSubscribed(false)}
              className="text-xs font-semibold text-slate-500 hover:text-white mt-6 underline underline-offset-4"
            >
              Subscribe another email
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FAQS } from '../data/products';
import { ChevronDown, HelpCircle, PhoneCall, ArrowRight, MessageSquare } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title Segment */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <HelpCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-3xl font-black text-neutral-900 tracking-tight sm:text-4xl">Support Desk & FAQ</h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2">Find swift answers regarding sizes, nationwide shipping, return exchanges, and leather preservation advice.</p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 mb-16">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="bg-white border border-neutral-150 rounded-2xl overflow-hidden shadow-2xs transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 hover:bg-neutral-50/50 transition-colors focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-neutral-900' : ''}`} />
              </button>

              {/* Collapsible Panel */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-60 border-t border-neutral-100' : 'max-h-0'
                } overflow-hidden`}
              >
                <p className="p-5 sm:p-6 text-xs text-neutral-600 leading-relaxed bg-neutral-50/30">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-Sell Support Help block */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-60 h-full bg-linear-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-lg mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">UNRESOLVED QUESTION?</span>
          <h3 className="text-xl font-bold">Speak with our Shoemakers Today</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Can’t find the exact fitting solution or boot care advice? Submit a direct inquiry form or speak to our showroom staff on WhatsApp.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              to="/contact" 
              className="px-5 py-2.5 bg-white text-neutral-950 font-bold text-xs rounded-xl hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Open Support Form
            </Link>
            <a 
              href="tel:+923007653789"
              className="px-5 py-2.5 border border-white/30 hover:border-white hover:bg-white/10 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call: +92-300-SOLSTYLE
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

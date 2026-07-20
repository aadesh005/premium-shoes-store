import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Map, 
  Compass, 
  PhoneCall, 
  AlertCircle
} from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !subject || !message) {
      setError('Please fill out all the input fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address format.');
      return;
    }

    // Success response
    setIsSent(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block mb-2">Concierge Support</span>
        <h1 className="text-3xl font-black text-neutral-900 tracking-tight sm:text-4xl">We’d Adore to Hear From You</h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2">Have a sizing inquiry? Need a customized leather polish consultation? Our shoe designers are here to assist.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* LEFT COLUMN: SHOWROOM DETAILS & VISUAL MAP */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Outlet Karachi */}
          <div className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-xs flex gap-4">
            <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl text-neutral-900 shrink-0 h-11 w-11 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Karachi Flagship Showroom</h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Plot 24-C, Lane 5, Bukhari Commercial Area, Phase 6, DHA, Karachi, Pakistan.
              </p>
              <span className="text-[10px] text-neutral-400 font-semibold block mt-1">📍 Near Bukhari Kheban-e-Bukhari Intersection</span>
            </div>
          </div>

          {/* Outlet Lahore */}
          <div className="bg-white border border-neutral-100 p-6 rounded-2xl shadow-xs flex gap-4">
            <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl text-neutral-900 shrink-0 h-11 w-11 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Lahore Fitting Studio</h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                Floor 1, Block K, Gulberg 3 (Opposite Al-Fatah Mall), Lahore, Pakistan.
              </p>
              <span className="text-[10px] text-neutral-400 font-semibold block mt-1">📍 Near Liberty Roundabout</span>
            </div>
          </div>

          {/* General contact metrics */}
          <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-md space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">Immediate Contacts</h4>
            
            <div className="flex items-center gap-3.5 text-xs">
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>+92 (300) 765-3789 (Support Line)</span>
            </div>
            <div className="flex items-center gap-3.5 text-xs">
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>support@solestyle.pk (General / Business)</span>
            </div>
            <div className="flex items-center gap-3.5 text-xs">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>Showrooms: 11:00 AM – 9:00 PM (Monday – Saturday)</span>
            </div>
          </div>

          {/* Styled visual Map Placeholder */}
          <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-150 text-center space-y-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 p-1.5 bg-white border border-neutral-150 rounded-lg text-neutral-500">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <span className="text-xl block">🗺️</span>
            <strong className="text-xs text-neutral-800 block">Interactive Showroom Navigation Map</strong>
            <p className="text-[10px] text-neutral-500 leading-relaxed max-w-xs mx-auto">
              Our flagship showrooms have dedicated visual kiosks and podiatric scan scales to measure your dynamic center-of-pressure for perfect sizing.
            </p>
            <div className="pt-2">
              <span className="px-3 py-1 bg-white border border-neutral-150 rounded-full font-mono text-[9px] text-neutral-600 inline-block shadow-2xs">
                Latitude: 24.8152° N, Longitude: 67.0681° E
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CONTACT FORM OR SUCCESS MESSAGE */}
        <div className="lg:col-span-7">
          
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 sm:p-8 shadow-xs">
            
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-500" /> Dispatch a Message
                </h3>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Muhammad Bilal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. bilal@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Size Exchange Inquiry - Order #8271"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                      required
                    />
                  </div>

                  {/* Message body */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Message / Inquiry Details</label>
                    <textarea
                      rows={5}
                      placeholder="Type your questions or sizing concerns here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium resize-none"
                      required
                    ></textarea>
                  </div>

                </div>

                {error && (
                  <p className="text-rose-500 text-xs font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 text-white font-bold text-xs tracking-wide rounded-xl hover:bg-neutral-850 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Inquiry
                </button>

              </form>
            ) : (
              /* FORM SUBMISSION SUCCESS BLOCK */
              <div className="py-12 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-neutral-900">Inquiry Received Successfully!</h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{name}</strong>! We have logged your request under reference ID <strong>#SS-INQ-{Math.floor(1000 + Math.random() * 9000)}</strong>. One of our master shoemakers or customer support representatives will email you back within 4 business hours.
                </p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 border border-neutral-200 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

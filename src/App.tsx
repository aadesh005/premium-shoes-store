import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

// Lucide icon
import { BellRing, X } from 'lucide-react';

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Inline Toast Notification Component
function ToastNotification() {
  const { toastMessage, hideToast } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-neutral-900 border border-neutral-800 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 z-[200] max-w-sm animate-in slide-in-from-bottom-5 duration-300">
      <div className="w-8 h-8 bg-neutral-800 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
        <BellRing className="w-4 h-4 animate-pulse" />
      </div>
      <p className="text-xs font-bold leading-relaxed pr-6">{toastMessage}</p>
      <button 
        onClick={hideToast}
        className="text-neutral-400 hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-800 rounded-lg transition-all"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white antialiased font-sans">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <MainLayout />
      </Router>
    </ShopProvider>
  );
}

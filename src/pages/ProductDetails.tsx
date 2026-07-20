import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, REVIEWS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Plus, 
  Minus,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  // Find active product
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === id);
  }, [id]);

  // States
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes[1] || product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Loading or invalid fallback
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-4xl block mb-4">🔎</span>
        <h2 className="text-xl font-bold text-neutral-800">Footwear Model Not Found</h2>
        <p className="text-xs text-neutral-500 mt-2">The shoe model you are looking for does not exist or has been discontinued.</p>
        <Link to="/shop" className="mt-6 inline-block px-6 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  // Compute related products
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  const handleAddCartClick = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNowClick = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => Math.max(1, prev - 1));

  const discounted = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back link & Category indicators */}
      <div className="flex justify-between items-center mb-8 text-xs text-neutral-500 font-semibold">
        <div className="flex items-center gap-1.5">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-black">{product.category}</Link>
          <span>/</span>
          <span className="text-neutral-900 font-bold">{product.name}</span>
        </div>
        <span className="text-emerald-500 uppercase tracking-widest text-[10px] font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> IN STOCK SHOWCASE
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        {/* LEFT COLUMN: IMAGES GALLERY */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Stage */}
          <div className="aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 relative shadow-inner">
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-900 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm text-white z-10">
                {product.badge}
              </span>
            )}
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover object-center transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square bg-neutral-50 rounded-xl overflow-hidden border transition-all ${
                  selectedImage === img 
                    ? 'border-neutral-900 ring-2 ring-neutral-900/10' 
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS & SPECIFICATION */}
        <div className="lg:col-span-5 flex flex-col">
          
          {/* Badge & Rating Row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded-md border border-neutral-200 uppercase font-mono">
              {product.category}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-semibold text-neutral-700">{product.gender} Collection</span>
            <span className="text-xs text-neutral-400">•</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-neutral-800">{product.rating}</span>
              <span className="text-xs text-neutral-400">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2">
            {product.name}
          </h1>

          {/* Price Tag in PKR */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl sm:text-3xl font-black text-neutral-900">
              Rs. {product.price.toLocaleString()}
            </span>
            {discounted && (
              <>
                <span className="text-base text-neutral-400 line-through">
                  Rs. {product.originalPrice!.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-100">
                  SAVE Rs. {(product.originalPrice! - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* Short description */}
          <p className="text-xs text-neutral-500 leading-relaxed mb-6 pb-6 border-b border-neutral-100">
            {product.longDescription}
          </p>

          {/* COLOR SELECTOR */}
          <div className="space-y-3 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Select Color: <strong className="text-neutral-500">{selectedColor}</strong>
            </span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedColor === color 
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 bg-white'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Select Size (Euro): <strong className="text-neutral-500">{selectedSize}</strong>
              </span>
              <button 
                onClick={() => setActiveTab('care')}
                className="text-[10px] font-bold text-neutral-500 hover:text-black underline"
              >
                Sizing Chart
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === size 
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY AND WISHLIST ROW */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-neutral-100">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Quantity</span>
              <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-1">
                <button 
                  onClick={decrementQty}
                  className="p-1.5 rounded-lg hover:bg-neutral-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 text-neutral-600" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-neutral-800">{quantity}</span>
                <button 
                  onClick={incrementQty}
                  className="p-1.5 rounded-lg hover:bg-neutral-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 text-neutral-600" />
                </button>
              </div>
            </div>

            {/* Favorite Wishlist toggler */}
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border flex items-center justify-center transition-all mt-5 ${
                isWishlisted 
                  ? 'border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100' 
                  : 'border-neutral-200 hover:border-neutral-400 text-neutral-400 hover:text-rose-500'
              }`}
              title={isWishlisted ? "Remove from Saved" : "Save for later"}
            >
              <Heart className="w-5 h-5 transition-colors" fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* PRIMARY CTAS (ADD TO CART / BUY NOW) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            <button 
              onClick={handleAddCartClick}
              className="w-full py-4 bg-neutral-100 hover:bg-neutral-200 active:scale-98 text-neutral-900 border border-neutral-200 hover:border-neutral-300 font-extrabold text-sm tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <ShoppingBag className="w-4.5 h-4.5" /> Add to Cart
            </button>

            <button 
              onClick={handleBuyNowClick}
              className="w-full py-4 bg-neutral-900 hover:bg-neutral-850 active:scale-98 text-white font-extrabold text-sm tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              Buy Now
            </button>
          </div>

          {/* TRUSTED DELIVERY METRIC SLATE */}
          <div className="bg-neutral-50 rounded-2xl p-4.5 space-y-3.5 border border-neutral-150">
            <div className="flex gap-3 text-xs leading-relaxed">
              <Truck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-800 font-bold">Complimentary Shipping Nationwide</strong>
                <p className="text-neutral-500 text-[11px] mt-0.5">Dispatched within 24 hours. Arrives in 2-3 business days with leading local carriers.</p>
              </div>
            </div>
            <div className="flex gap-3 text-xs leading-relaxed">
              <RotateCcw className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-800 font-bold">Hassle-Free Doorstep Exchanges</strong>
                <p className="text-neutral-500 text-[11px] mt-0.5">Simply initiate a reverse swap within 15 days if the fitting is not ideal.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* TABS STAGE: FEATURE CHECKLISTS / CARE GUIDE */}
      <section className="border-t border-neutral-200 pt-12 mb-20">
        <div className="flex border-b border-neutral-200 gap-6 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('details')}
            className={`pb-3.5 text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap border-b-2 leading-none ${
              activeTab === 'details' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Premium Features
          </button>
          <button 
            onClick={() => setActiveTab('shipping')}
            className={`pb-3.5 text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap border-b-2 leading-none ${
              activeTab === 'shipping' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Showroom Policies
          </button>
          <button 
            onClick={() => setActiveTab('care')}
            className={`pb-3.5 text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap border-b-2 leading-none ${
              activeTab === 'care' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Sizing & Care Charts
          </button>
        </div>

        {/* Tab content cards */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-8 shadow-xs">
          {activeTab === 'details' && (
            <div className="max-w-2xl">
              <h3 className="font-bold text-sm text-neutral-900 mb-4">Construction & Ergonomic Elements</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-2xl space-y-4 text-xs text-neutral-600 leading-relaxed">
              <p>
                <strong>Delivery Timelines:</strong> Standard orders within Karachi, Lahore, and Islamabad are delivered within 2 business days. For other remote nationwide cities, delivery spans 3 to 4 business days.
              </p>
              <p>
                <strong>Secure Payment Options:</strong> We support secure visual credit/debit card gateway inputs (Visa, Mastercard) as well as the local cash on delivery (COD) option where you pay when you physically receive the box.
              </p>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-neutral-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-neutral-900 mb-2">Footwear Sizing Chart (Euro to US)</h4>
                <div className="border border-neutral-150 rounded-lg overflow-hidden font-mono text-[10px]">
                  <div className="grid grid-cols-2 bg-neutral-50 p-2 border-b border-neutral-150 font-bold">
                    <span>Euro Size</span>
                    <span>US Men / US Women</span>
                  </div>
                  <div className="p-2 border-b border-neutral-100 flex justify-between"><span>39</span><span>Men 6.5 / Women 8</span></div>
                  <div className="p-2 border-b border-neutral-100 flex justify-between"><span>40</span><span>Men 7.5 / Women 9</span></div>
                  <div className="p-2 border-b border-neutral-100 flex justify-between"><span>41</span><span>Men 8 / Women 9.5</span></div>
                  <div className="p-2 border-b border-neutral-100 flex justify-between"><span>42</span><span>Men 9 / Women 10.5</span></div>
                  <div className="p-2 border-b border-neutral-100 flex justify-between"><span>43</span><span>Men 10 / Women 11.5</span></div>
                  <div className="p-2 flex justify-between"><span>44</span><span>Men 11 / Women 12.5</span></div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 mb-2">Leather & Mesh Care Guide</h4>
                <p className="mb-2">
                  <strong>Genuine Leather:</strong> Wipe away dust after every wear. Apply protective oil or polish beeswax paste with a microfiber cloth once every month. Keep away from direct water immersion.
                </p>
                <p>
                  <strong>Sneakers / Mesh:</strong> Spot-clean mesh structures with a soft, warm soapy damp brush. Do not dry-tumble; air dry away from harsh hot sunshine.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200 pt-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">RECOMMENDED</span>
              <h2 className="text-xl font-bold text-neutral-900">You Might Also Adore</h2>
            </div>
            <Link 
              to={`/category/${product.category}`} 
              className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1.5"
            >
              Browse Category <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

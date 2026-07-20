import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Minus, 
  Plus, 
  Percent,
  Sparkles
} from 'lucide-react';

export default function Cart() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartTotal, 
    shippingFee, 
    couponCode, 
    couponDiscount, 
    applyCoupon 
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  const discountAmount = Math.round((cartSubtotal * couponDiscount) / 100);

  // Empty cart fallback state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-neutral-50 border border-neutral-150 rounded-3xl flex items-center justify-center text-neutral-400 mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Your Cart is Empty</h2>
        <p className="text-xs text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
          It looks like you haven’t added any premium footwear yet. Explore our latest sneaker drops or classic leather dress collections.
        </p>
        <Link 
          to="/shop" 
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white hover:bg-neutral-800 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
        >
          Explore Shoes Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-8">
        Your Luxury Shopping Bag
      </h1>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: LIST OF ITEMS */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white border border-neutral-100 rounded-2xl divide-y divide-neutral-100 overflow-hidden shadow-xs">
            {cartItems.map((item, idx) => {
              const prodPriceSum = item.product.price * item.quantity;
              return (
                <div 
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  {/* Left part: Image + info */}
                  <div className="flex gap-4">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-20 h-20 object-cover rounded-xl bg-neutral-50 shrink-0 border border-neutral-100" 
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 block mb-0.5">{item.product.category}</span>
                      <Link 
                        to={`/product/${item.product.id}`}
                        className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-black hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      
                      {/* Configuration details */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1.5 text-[10px] text-neutral-500 font-semibold">
                        <span>Size: <strong className="text-neutral-800">{item.selectedSize}</strong></span>
                        <span className="text-neutral-300">|</span>
                        <span>Color: <strong className="text-neutral-800">{item.selectedColor}</strong></span>
                        <span className="text-neutral-300">|</span>
                        <span>Gender: <strong className="text-neutral-800">{item.product.gender}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right part: Editor controls + remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10">
                    
                    {/* Quantity modifier controls */}
                    <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 p-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-1 rounded-sm hover:bg-neutral-250 text-neutral-500"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-neutral-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-1 rounded-sm hover:bg-neutral-250 text-neutral-500"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Cost summary for product */}
                    <div className="text-right min-w-[80px]">
                      <span className="text-xs text-neutral-400 block leading-none mb-1">Unit: Rs. {item.product.price.toLocaleString()}</span>
                      <span className="text-sm font-black text-neutral-900 leading-none">
                        Rs. {prodPriceSum.toLocaleString()}
                      </span>
                    </div>

                    {/* Trash remove button */}
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-neutral-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-neutral-50 transition-colors shrink-0"
                      title="Remove product"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="flex justify-between items-center pt-4">
            <Link 
              to="/shop"
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-black group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Continue Shopping
            </Link>
            <span className="text-[10px] text-neutral-400 font-semibold font-mono">
              Secure 256-Bit SSL Checkout Encryption
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: CART ORDER SUMMARY */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
              Order Subtotal
            </h3>

            {/* Calculations lines */}
            <div className="space-y-3.5 text-xs text-neutral-500 font-medium">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="text-neutral-900 font-bold">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Promo Discount ({couponDiscount}%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="text-neutral-900 font-bold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-500 font-bold uppercase text-[10px] tracking-wider">FREE Delivery</span>
                  ) : (
                    `Rs. ${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>

              {shippingFee > 0 && (
                <p className="text-[10px] text-neutral-400 leading-relaxed bg-neutral-50 p-2 rounded-lg border border-neutral-150">
                  💡 Add shoes worth <strong>Rs. {(12000 - cartSubtotal).toLocaleString()}</strong> more to unlock <strong>FREE Delivery</strong> across Pakistan!
                </p>
              )}
            </div>

            {/* Coupon Promo Field */}
            <form onSubmit={handleApplyCouponSubmit} className="pt-4 border-t border-neutral-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Have a Voucher Code?</span>
              <div className="flex gap-2 p-1 bg-neutral-50 border border-neutral-200 rounded-xl">
                <input
                  type="text"
                  placeholder="e.g. SOLE10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none uppercase font-semibold text-neutral-800"
                />
                <button 
                  type="submit"
                  className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-neutral-850 active:scale-95 transition-all"
                >
                  Apply
                </button>
              </div>
              {couponCode && (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-2.5">
                  <Percent className="w-3 h-3" /> Code "{couponCode}" applied (Save Rs. {discountAmount.toLocaleString()})
                </span>
              )}
            </form>

            {/* Final Total */}
            <div className="pt-4 border-t border-neutral-100 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900">Total amount (PKR)</span>
              <span className="text-2xl font-black text-neutral-900">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>

            {/* CTA to Checkout */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-neutral-900 hover:bg-neutral-850 active:scale-98 text-white font-extrabold text-sm tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Proceed to Checkout <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Small security note */}
          <div className="bg-neutral-50 rounded-2xl p-4 space-y-3.5 border border-neutral-150 text-[11px] text-neutral-500 leading-relaxed">
            <div className="flex gap-2.5">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Exchanges Guaranteed:</strong> Rest easy. Handcrafted items are eligible for fully reverse-dispatched exchanges for 15 full days.</span>
            </div>
            <div className="flex gap-2.5">
              <Truck className="w-4.5 h-4.5 text-sky-500 shrink-0 mt-0.5" />
              <span><strong>Trackable Shipping:</strong> Free shipment is automatically tracked with live notifications sent via SMS.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

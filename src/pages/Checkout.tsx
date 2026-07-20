import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle2, 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  MapPin, 
  ShoppingBag, 
  Percent, 
  ShieldCheck,
  Smartphone,
  PhoneCall
} from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartSubtotal, cartTotal, shippingFee, couponCode, couponDiscount, clearCart } = useShop();
  const navigate = useNavigate();

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'easypaisa'>('cod');
  
  // Card input visual states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Submission States
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Discount math
  const discountAmount = Math.round((cartSubtotal * couponDiscount) / 100);

  const PAK_CITIES = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
  ];

  const handleValidation = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid email is required.';
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^((\+92)|(0092)|(03))[0-9]{9}$/.test(phoneNumber.replace(/[-\s]/g, ''))) {
      errors.phoneNumber = 'Please input a valid Pakistani mobile number (e.g., 03001234567).';
    }
    if (!address.trim()) errors.address = 'Detailed shipping address is required.';
    
    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Valid card number is required.';
      if (!cardExpiry.trim()) errors.cardExpiry = 'Expiry is required.';
      if (!cardCvv.trim() || cardCvv.length < 3) errors.cardCvv = 'CVV is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    // Generate random order id
    const randNum = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`SS-${randNum}`);
    setIsSuccess(true);
  };

  const handleFinishSuccess = () => {
    clearCart();
    navigate('/');
  };

  // If cart is empty and order hasn't been placed yet, redirect
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-bold text-neutral-800">Your Cart is Empty</h2>
        <p className="text-xs text-neutral-500 mt-2">Cannot check out without items in the bag.</p>
        <Link to="/shop" className="mt-6 inline-block px-6 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {!isSuccess ? (
        <>
          {/* Back to Cart link */}
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Return to shopping bag
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-8">
            Complete Your Purchase
          </h1>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: BILLING & SHIPPING DETAILS */}
            <div className="lg:col-span-7 bg-white border border-neutral-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Shipping Address Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                <MapPin className="w-5 h-5 text-neutral-700" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Shipping & Delivery Address
                </h3>
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full name */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Recipient Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Haris"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                  />
                  {formErrors.fullName && <p className="text-rose-500 text-[10px] font-bold">{formErrors.fullName}</p>}
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Email Address (for Receipt)</label>
                  <input
                    type="email"
                    placeholder="e.g. haris@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                  />
                  {formErrors.email && <p className="text-rose-500 text-[10px] font-bold">{formErrors.email}</p>}
                </div>

                {/* Phone number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Contact Number (Pakistan Mobile)</label>
                  <input
                    type="tel"
                    placeholder="e.g. 03001234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                  />
                  {formErrors.phoneNumber && <p className="text-rose-500 text-[10px] font-bold">{formErrors.phoneNumber}</p>}
                </div>

                {/* City dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-bold cursor-pointer"
                  >
                    {PAK_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Postal code (visual only) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Postal / Zip Code (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 75500"
                    className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                  />
                </div>

                {/* Detailed street address */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Detailed Street Address / Apartment No</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. House 54, Block 3, Khalid Bin Walid Road..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-50 text-xs py-3 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium resize-none"
                  ></textarea>
                  {formErrors.address && <p className="text-rose-500 text-[10px] font-bold">{formErrors.address}</p>}
                </div>

              </div>

              {/* PAYMENT METHOD SECTION */}
              <div className="pt-6 border-t border-neutral-100 space-y-4">
                <div className="flex items-center gap-2 pb-2">
                  <CreditCard className="w-5 h-5 text-neutral-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Payment Method Selector
                  </h3>
                </div>

                {/* Method Options Radio buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* COD */}
                  <label className={`border rounded-xl p-4 flex flex-col justify-between h-28 cursor-pointer transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                      : 'border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50'
                  }`}>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <Truck className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-emerald-400' : 'text-neutral-500'}`} />
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-emerald-400 bg-emerald-400' : 'border-neutral-300'}`}>
                        {paymentMethod === 'cod' && <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs block font-bold">Cash on Delivery</strong>
                      <span className={`text-[10px] ${paymentMethod === 'cod' ? 'text-neutral-300' : 'text-neutral-400'} block mt-0.5`}>Pay cash upon delivery box</span>
                    </div>
                  </label>

                  {/* Visa Mastercard */}
                  <label className={`border rounded-xl p-4 flex flex-col justify-between h-28 cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                      : 'border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50'
                  }`}>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-emerald-400' : 'text-neutral-500'}`} />
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-emerald-400 bg-emerald-400' : 'border-neutral-300'}`}>
                        {paymentMethod === 'card' && <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs block font-bold">Debit / Credit Card</strong>
                      <span className={`text-[10px] ${paymentMethod === 'card' ? 'text-neutral-300' : 'text-neutral-400'} block mt-0.5`}>Visa, Mastercard, PayPak</span>
                    </div>
                  </label>

                  {/* EasyPaisa */}
                  <label className={`border rounded-xl p-4 flex flex-col justify-between h-28 cursor-pointer transition-all ${
                    paymentMethod === 'easypaisa' 
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                      : 'border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50'
                  }`}>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={() => setPaymentMethod('easypaisa')}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <Smartphone className={`w-5 h-5 ${paymentMethod === 'easypaisa' ? 'text-emerald-400' : 'text-neutral-500'}`} />
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'easypaisa' ? 'border-emerald-400 bg-emerald-400' : 'border-neutral-300'}`}>
                        {paymentMethod === 'easypaisa' && <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>}
                      </span>
                    </div>
                    <div>
                      <strong className="text-xs block font-bold">EasyPaisa / Mobile</strong>
                      <span className={`text-[10px] ${paymentMethod === 'easypaisa' ? 'text-neutral-300' : 'text-neutral-400'} block mt-0.5`}>JazzCash or EasyPaisa wall</span>
                    </div>
                  </label>

                </div>

                {/* Sub-form inputs for credit card visual */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3.5 animate-in slide-in-from-top-2 duration-200">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Secure Card Credentials</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-3 space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Card Number</label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9 ]/g, ''))}
                          className="w-full bg-white text-xs py-2.5 px-3 rounded-lg border border-neutral-200 focus:outline-none"
                        />
                        {formErrors.cardNumber && <p className="text-rose-500 text-[10px] font-bold">{formErrors.cardNumber}</p>}
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white text-xs py-2.5 px-3 rounded-lg border border-neutral-200 focus:outline-none"
                        />
                        {formErrors.cardExpiry && <p className="text-rose-500 text-[10px] font-bold">{formErrors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">CVV / Security Code</label>
                        <input
                          type="password"
                          placeholder="123"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full bg-white text-xs py-2.5 px-3 rounded-lg border border-neutral-200 focus:outline-none"
                        />
                        {formErrors.cardCvv && <p className="text-rose-500 text-[10px] font-bold">{formErrors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* RIGHT COLUMN: ORDER DETAILS SUMMARY */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-xs space-y-6">
                
                {/* Header title */}
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                  <ShoppingBag className="w-5 h-5 text-neutral-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Order Items Breakdown
                  </h3>
                </div>

                {/* List items */}
                <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto pr-1 space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex items-center gap-3 py-1.5 first:pt-0 last:pb-0"
                    >
                      <img src={item.product.images[0]} alt={item.product.name} className="w-11 h-11 object-cover rounded-lg bg-neutral-50 shrink-0 border border-neutral-150" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-neutral-800 truncate">{item.product.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-semibold mt-0.5">
                          <span>Qty: <strong className="text-neutral-700">{item.quantity}</strong></span>
                          <span>•</span>
                          <span>Size: <strong className="text-neutral-700">{item.selectedSize}</strong></span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-neutral-900 shrink-0">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals segment */}
                <div className="pt-4 border-t border-neutral-100 space-y-3 text-xs text-neutral-500 font-medium">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="text-neutral-900 font-bold">Rs. {cartSubtotal.toLocaleString()}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span className="flex items-center gap-1"><Percent className="w-3.5 h-3.5" /> Coupon Discount ({couponDiscount}%)</span>
                      <span>- Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Nationwide Express Shipping</span>
                    <span className="text-neutral-900 font-bold">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-500 font-bold uppercase text-[10px] tracking-wider">FREE Delivery</span>
                      ) : (
                        `Rs. ${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  {/* Expected Arrival Box */}
                  <div className="bg-neutral-50 border border-neutral-150 p-3 rounded-xl flex items-start gap-2 text-[11px] leading-relaxed">
                    <Truck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Expected doorstep arrival: <strong className="text-neutral-800 font-bold">July 23, 2026</strong> (dispatched from Karachi tanneries).
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-neutral-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-neutral-900">Grand Total amount (PKR)</span>
                  <span className="text-xl font-black text-neutral-900">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-neutral-900 hover:bg-neutral-850 active:scale-98 text-white font-extrabold text-sm tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  Place Order (COD/Visual Only)
                </button>

                <p className="text-[10px] text-neutral-400 text-center leading-relaxed">
                  By clicking Place Order, you authorize the dynamic placement of this mock purchase. Delivery is simulated on the client-side.
                </p>

              </div>

              {/* Extra visual lock */}
              <div className="flex items-center gap-2.5 p-4 border border-dashed border-neutral-200 rounded-xl text-[10px] text-neutral-400 leading-relaxed justify-center bg-neutral-50/50">
                <ShieldCheck className="w-4.5 h-4.5 text-neutral-400 shrink-0" />
                <span>Safeguarded by local footwear distribution protection framework.</span>
              </div>

            </div>

          </form>
        </>
      ) : (
        /* ORDER PLACED SUCCESS PANEL */
        <div className="max-w-xl mx-auto py-16 px-6 bg-white border border-neutral-100 shadow-2xl rounded-3xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase font-bold">Purchase Successful</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">Order Placed, {fullName}!</h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Thank you for choosing SoleStyle. Your order has been placed successfully. A receipt containing details and shipping track link was visual-dispatched to <strong>{email}</strong>.
            </p>
          </div>

          {/* Reference numbers boxes */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-150 grid grid-cols-2 gap-4 text-xs font-semibold font-mono">
            <div className="text-left border-r border-neutral-150 pr-4">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-sans block">Order Number</span>
              <span className="text-neutral-900 font-extrabold block mt-0.5">{orderId}</span>
            </div>
            <div className="text-left pl-2">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-sans block">Delivery Type</span>
              <span className="text-neutral-900 font-extrabold block mt-0.5">
                {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Paid Credit/Card'}
              </span>
            </div>
          </div>

          {/* Summary list */}
          <div className="border border-neutral-100 rounded-2xl divide-y divide-neutral-100 overflow-hidden text-left bg-white shadow-xs max-h-40 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.product.id} className="p-3 text-xs flex justify-between items-center">
                <span className="text-neutral-600 font-medium truncate max-w-[280px]">
                  {item.product.name} (x{item.quantity})
                </span>
                <span className="text-neutral-900 font-bold shrink-0">
                  Size: {item.selectedSize}
                </span>
              </div>
            ))}
          </div>

          {/* Phone call support visual */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-150 text-[11px] text-neutral-500 flex gap-3 leading-relaxed text-left">
            <PhoneCall className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <strong>Showroom Concierge Support:</strong> For sizing corrections before dispatch, please call or WhatsApp our team at <strong>+92-300-SOLSTYLE</strong> quoting Order ID <strong>{orderId}</strong>.
            </span>
          </div>

          {/* Return Home CTA button */}
          <button
            onClick={handleFinishSuccess}
            className="w-full py-4 bg-neutral-900 hover:bg-neutral-850 text-white font-extrabold text-sm tracking-wide rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            Clear Bag & Go Back to Home
          </button>

        </div>
      )}

    </div>
  );
}

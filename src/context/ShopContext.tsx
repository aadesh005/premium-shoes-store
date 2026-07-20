import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface ShopContextType {
  cartItems: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity: number, size: number, color: string) => void;
  removeFromCart: (productId: string, size: number, color: string) => void;
  updateQuantity: (productId: string, size: number, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  couponDiscount: number; // Percentage, e.g. 10 for 10%
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  shippingFee: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('solestyle_cart');
    return local ? JSON.parse(local) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const local = localStorage.getItem('solestyle_wishlist');
    return local ? JSON.parse(local) : [];
  });

  const [couponCode, setCouponCode] = useState(() => {
    return localStorage.getItem('solestyle_coupon') || '';
  });

  const [couponDiscount, setCouponDiscount] = useState(() => {
    const discount = localStorage.getItem('solestyle_discount');
    return discount ? Number(discount) : 0;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('solestyle_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('solestyle_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, quantity: number, size: number, color: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        showToast(`Updated "${product.name}" quantity in cart!`);
        return newItems;
      } else {
        showToast(`Added "${product.name}" to cart!`);
        return [...prevItems, { product, quantity, selectedSize: size, selectedColor: color }];
      }
    });
  };

  const removeFromCart = (productId: string, size: number, color: string) => {
    setCartItems((prevItems) => {
      const filtered = prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      );
      showToast('Item removed from cart.');
      return filtered;
    });
  };

  const updateQuantity = (productId: string, size: number, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
    setCouponDiscount(0);
    localStorage.removeItem('solestyle_coupon');
    localStorage.removeItem('solestyle_discount');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === 'SOLE10' || formattedCode === 'STEP10') {
      setCouponCode(formattedCode);
      setCouponDiscount(10);
      localStorage.setItem('solestyle_coupon', formattedCode);
      localStorage.setItem('solestyle_discount', '10');
      showToast('10% Discount applied successfully!');
      return true;
    } else if (formattedCode === 'WALK20' || formattedCode === 'PREMIUM20') {
      setCouponCode(formattedCode);
      setCouponDiscount(20);
      localStorage.setItem('solestyle_coupon', formattedCode);
      localStorage.setItem('solestyle_discount', '20');
      showToast('20% Promo discount applied successfully!');
      return true;
    }
    showToast('Invalid coupon code.');
    return false;
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const shippingFee = cartSubtotal > 12000 || cartSubtotal === 0 ? 0 : 350; // Free shipping over Rs.12,000

  const discountAmount = Math.round((cartSubtotal * couponDiscount) / 100);

  const cartTotal = cartSubtotal - discountAmount + shippingFee;

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        couponCode,
        applyCoupon,
        couponDiscount,
        cartCount,
        cartSubtotal,
        cartTotal,
        shippingFee,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

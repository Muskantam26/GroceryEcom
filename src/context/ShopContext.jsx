import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/productsData';
import { availableCoupons } from '../data/couponsData';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Products State (Admin editable)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('comrade_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('comrade_products', JSON.stringify(products));
  }, [products]);

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('comrade_cart');
    return saved ? JSON.parse(saved) : [
      { product: initialProducts[0], quantity: 2 },
      { product: initialProducts[4], quantity: 1 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('comrade_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('comrade_wishlist');
    return saved ? JSON.parse(saved) : ["prod-1", "prod-9", "prod-13"];
  });

  useEffect(() => {
    localStorage.setItem('comrade_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Location Selector
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem('comrade_location') || "Mumbai - 400001";
  });

  const changeLocation = (loc) => {
    setSelectedLocation(loc);
    localStorage.setItem('comrade_location', loc);
    showToast(`Delivery location set to ${loc}`, 'success');
  };

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('comrade_user');
    return saved ? JSON.parse(saved) : {
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43210",
      isLoggedIn: true
    };
  });

  const login = (emailOrPhone, password) => {
    const mockUser = {
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : "Customer",
      email: emailOrPhone.includes('@') ? emailOrPhone : "customer@example.com",
      phone: !emailOrPhone.includes('@') ? emailOrPhone : "+91 98765 43210",
      isLoggedIn: true
    };
    setUser(mockUser);
    localStorage.setItem('comrade_user', JSON.stringify(mockUser));
    showToast('Logged in successfully!', 'success');
  };

  const logout = () => {
    setUser({ isLoggedIn: false });
    localStorage.removeItem('comrade_user');
    showToast('Logged out of your account', 'info');
  };

  const register = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      isLoggedIn: true
    };
    setUser(newUser);
    localStorage.setItem('comrade_user', JSON.stringify(newUser));
    showToast('Account registered successfully!', 'success');
  };

  // Addresses State
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('comrade_addresses');
    return saved ? JSON.parse(saved) : [
      {
        id: "addr-1",
        type: "Home",
        name: "Rahul Sharma",
        phone: "+91 98765 43210",
        flat: "Flat 402, Green Valley Heights",
        area: "Main Street, Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400053",
        isDefault: true
      },
      {
        id: "addr-2",
        type: "Work",
        name: "Rahul Sharma",
        phone: "+91 98765 43210",
        flat: "Suite 601, Cyber Park",
        area: "Mindspace, Malad West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400064",
        isDefault: false
      }
    ];
  });

  const [selectedAddressId, setSelectedAddressId] = useState("addr-1");

  const addAddress = (newAddr) => {
    const addrObj = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [...prev, addrObj]);
    setSelectedAddressId(addrObj.id);
    localStorage.setItem('comrade_addresses', JSON.stringify([...addresses, addrObj]));
    showToast('New delivery address saved!', 'success');
  };

  // Coupons State
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Toast Notification State
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Cart Helper Methods
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartMrpTotal = cart.reduce((acc, item) => acc + (item.product.mrp * item.quantity), 0);
  const cartSavings = cartMrpTotal - cartSubtotal;

  // Coupon Logic
  const applyCoupon = (code) => {
    const found = availableCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid coupon code!', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Minimum order amount of ₹${found.minOrder} required for ${found.code}`, 'warning');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.flatDiscount) {
      couponDiscount = appliedCoupon.flatDiscount;
    } else if (appliedCoupon.discountPercent) {
      const calc = (cartSubtotal * appliedCoupon.discountPercent) / 100;
      couponDiscount = Math.min(calc, appliedCoupon.maxDiscount || calc);
    }
  }

  const freeDeliveryThreshold = 499;
  const deliveryFee = (cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0) ? 0 : 40;
  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  // Wishlist Logic
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const isWish = prev.includes(productId);
      let updated;
      if (isWish) {
        updated = prev.filter(id => id !== productId);
        showToast('Removed from Wishlist', 'info');
      } else {
        updated = [...prev, productId];
        showToast('Added to Wishlist ❤️', 'success');
      }
      return updated;
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Orders & Tracking State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('comrade_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "ORD-9840",
        date: new Date().toISOString(),
        items: [
          { name: "Amul Taaza Milk", price: 54, quantity: 2, image: initialProducts[4].image },
          { name: "Aashirvaad Atta 5kg", price: 245, quantity: 1, image: initialProducts[8].image }
        ],
        amount: 353,
        status: "Out for Delivery",
        deliveryAddress: "Flat 402, Green Valley Heights, Andheri West, Mumbai",
        paymentMethod: "UPI (PhonePe)",
        estimatedDelivery: "Today in 15 mins"
      }
    ];
  });

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      items: cart.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      amount: finalTotal,
      status: "Order Placed",
      deliveryAddress: orderData.address,
      deliverySlot: orderData.slot,
      paymentMethod: orderData.paymentMethod,
      estimatedDelivery: orderData.slot === "express" ? "Within 15-30 minutes" : "Today 4:00 PM - 7:00 PM"
    };

    setOrders(prev => [newOrder, ...prev]);
    localStorage.setItem('comrade_orders', JSON.stringify([newOrder, ...orders]));
    clearCart();
    return newOrder;
  };

  // Admin Actions
  const addProduct = (prodData) => {
    const newProd = {
      ...prodData,
      id: `prod-${Date.now()}`,
      rating: 4.5,
      reviews: 1,
      categoryId: prodData.category.toLowerCase().replace(/[^a-z0-9]/g, '-')
    };
    setProducts(prev => [newProd, ...prev]);
    showToast('New product added to catalog', 'success');
  };

  const deleteProduct = (prodId) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
    showToast('Product deleted', 'info');
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      cartMrpTotal,
      cartSavings,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      couponDiscount,
      freeDeliveryThreshold,
      deliveryFee,
      finalTotal,
      wishlist,
      toggleWishlist,
      isInWishlist,
      selectedLocation,
      changeLocation,
      user,
      login,
      logout,
      register,
      addresses,
      selectedAddressId,
      setSelectedAddressId,
      addAddress,
      searchQuery,
      setSearchQuery,
      toast,
      showToast,
      orders,
      placeOrder,
      addProduct,
      deleteProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};

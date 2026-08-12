import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  X
} from 'lucide-react';

const CartPage = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
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
    showToast
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  // Free delivery progress calculation
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryPercent = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-3xl text-slate-900">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Looks like you haven't added any fresh groceries or daily essentials yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-heading font-extrabold text-sm shadow-xl shadow-emerald-900/20 transition-all hover:scale-105"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Shopping Cart ({cartCount} Items)</span>
      </nav>

      {/* FREE DELIVERY PROGRESS BAR */}
      <div className="bg-emerald-900 text-white p-4 rounded-3xl border border-emerald-800 shadow-md space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400" />
            {amountNeededForFreeDelivery > 0 ? (
              <span>Add <strong className="text-amber-300 font-extrabold">₹{amountNeededForFreeDelivery}</strong> more to get FREE express delivery!</span>
            ) : (
              <span className="text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Congratulations! You unlocked FREE express delivery 🎉
              </span>
            )}
          </div>
          <span className="font-mono text-emerald-300">{Math.round(freeDeliveryPercent)}%</span>
        </div>
        <div className="w-full bg-emerald-950/80 rounded-full h-2 overflow-hidden p-0.5">
          <div 
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${freeDeliveryPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: CART ITEMS LIST */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>ITEMS IN YOUR CART ({cartCount})</span>
              <span className="text-emerald-800">Total Savings: ₹{cartSavings}</span>
            </div>

            <div className="divide-y divide-slate-100">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-xl border border-slate-100 shrink-0" 
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                        {product.brand}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-slate-900 truncate">
                        {product.name}
                      </h4>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {product.quantity} • <strong className="text-slate-800">₹{product.price}</strong> each
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    
                    {/* QUANTITY CONTROLLER */}
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-black text-xs text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* ITEM SUBTOTAL */}
                    <div className="text-right min-w-[70px]">
                      <div className="font-heading font-extrabold text-sm text-slate-900">
                        ₹{product.price * quantity}
                      </div>
                      {product.mrp > product.price && (
                        <div className="text-[10px] text-slate-400 line-through">
                          ₹{product.mrp * quantity}
                        </div>
                      )}
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Quick Info Badge */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Safely packed under hygienic strict standards. Freshness guaranteed.</span>
          </div>

        </div>

        {/* RIGHT: ORDER SUMMARY SIDEBAR */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* COUPON CODE BOX */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Tag className="w-4 h-4 text-emerald-700" />
              <span>Apply Promo Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div>
                  <span className="font-mono font-extrabold text-xs text-emerald-950 block">
                    🎉 {appliedCoupon.code} APPLIED
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    You saved ₹{couponDiscount}!
                  </span>
                </div>
                <button 
                  onClick={removeCoupon}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter COMRADE10 or FRESH50"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 uppercase font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            <div className="text-[11px] text-slate-500 font-medium">
              Available: <strong className="font-mono text-emerald-800">COMRADE10</strong> (10% OFF), <strong className="font-mono text-emerald-800">FRESH50</strong> (₹50 OFF)
            </div>
          </div>

          {/* BILL DETAILS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 border-b pb-3">
              Bill Summary
            </h3>

            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between">
                <span>Item Total (MRP)</span>
                <span className="font-mono">₹{cartMrpTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Product Discount</span>
                <span className="font-mono">- ₹{cartSavings}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">- ₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-mono">{deliveryFee === 0 ? <strong className="text-emerald-700 font-bold uppercase">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span className="font-heading font-extrabold text-sm text-slate-900 block">To Pay</span>
                <span className="text-[10px] text-slate-400 font-semibold">Inclusive of all taxes</span>
              </div>
              <div className="font-heading font-black text-2xl text-emerald-900">
                ₹{finalTotal}
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-emerald-950 font-heading font-extrabold text-sm shadow-xl shadow-amber-400/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CartPage;

import React from 'react';
import { availableCoupons } from '../data/couponsData';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';
import { Tag, Sparkles, Copy, CheckCircle2 } from 'lucide-react';

const OffersPage = () => {
  const { products, showToast } = useShop();
  const dealProducts = products.filter(p => p.discount >= 15);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast(`Coupon code ${code} copied to clipboard!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-emerald-800 to-emerald-950 text-white rounded-3xl p-8 border border-amber-300/40 shadow-xl space-y-3">
        <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
          SUPER SAVINGS ZONE
        </span>
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white">
          Exclusive Grocery Offers & Promo Codes
        </h1>
        <p className="text-emerald-100 text-xs md:text-sm max-w-xl">
          Copy coupon codes at checkout or shop high-discount deal products with up to 30% instant savings.
        </p>
      </div>

      {/* PROMO COUPONS GRID */}
      <section className="space-y-4">
        <h3 className="font-heading font-extrabold text-xl text-slate-900 flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-500" />
          <span>Active Promo Coupons</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableCoupons.map(c => (
            <div key={c.code} className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-lg text-emerald-900">{c.code}</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {c.discountPercent ? `${c.discountPercent}% OFF` : `₹${c.flatDiscount} OFF`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold">{c.description}</p>
                <div className="text-[10px] text-slate-400 font-medium pt-1">
                  Min order: ₹{c.minOrder}
                </div>
              </div>

              <button
                onClick={() => copyCode(c.code)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Coupon Code</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HIGH DISCOUNT PRODUCTS */}
      <section className="space-y-4 pt-4">
        <h3 className="font-heading font-extrabold text-xl text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>Super Savings Deals</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dealProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default OffersPage;

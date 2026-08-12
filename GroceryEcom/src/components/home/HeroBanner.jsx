import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Tag, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-2xl border border-emerald-800/50">
      
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Text Content */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>⚡ Superfast 15-30 Minute Express Delivery</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            Freshness Delivered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-200">
              to Your Door.
            </span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
            Shop fresh groceries, everyday essentials, farm fresh produce and household favorites at unmatchable prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-emerald-950 font-heading font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/offers"
              className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-bold text-sm sm:text-base backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Tag className="w-5 h-5 text-amber-300" />
              <span>Explore Offers</span>
            </Link>
          </div>

          {/* Micro badges */}
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-emerald-800/60 max-w-md text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>15 Min Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Best Prices</span>
            </div>
          </div>

        </div>

        {/* Right Hero Image Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-700/40 group">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Fresh Indian Groceries"
              className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 text-slate-900 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Deal of the Day</span>
                <div className="font-heading font-extrabold text-sm text-slate-900">Aashirvaad Atta + Amul Taaza</div>
                <div className="text-xs text-slate-500">Combo Savings Pack</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through">₹346</span>
                <div className="font-heading font-black text-lg text-emerald-800">₹289</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HeroBanner;

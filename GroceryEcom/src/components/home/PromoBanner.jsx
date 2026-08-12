import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight } from 'lucide-react';

const PromoBanner = () => {
  return (
    <section className="py-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white p-8 md:p-12 shadow-xl border border-emerald-600/40">
        
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
            alt="Groceries"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 font-black text-xs uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Up to 30% OFF</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white leading-tight">
            Save More on Everyday Essentials
          </h2>

          <p className="text-emerald-100 text-xs md:text-sm leading-relaxed">
            Stock up on cooking oil, wheat flour, spices, fresh dairy and cleaning products with exclusive Comrade savings coupons.
          </p>

          <div className="pt-2">
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-emerald-950 font-heading font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>View Offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromoBanner;

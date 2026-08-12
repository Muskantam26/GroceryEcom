import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DealsOfDay = () => {
  const { products } = useShop();
  const deals = products.filter(p => p.isDealOfDay || p.discount >= 15).slice(0, 8);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8">
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/5 to-amber-500/10 rounded-3xl p-6 md:p-8 border border-amber-200/60 shadow-sm">
        
        {/* SECTION HEADER WITH TIMER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
                Deals of the Day
              </h2>
              <p className="text-xs md:text-sm text-slate-600">Super savings on everyday essentials</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-amber-200 shadow-xs">
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">Ends in:</span>
            <div className="flex items-center gap-1 font-mono font-extrabold text-amber-700 text-sm">
              <span className="bg-amber-100 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>:
              <span className="bg-amber-100 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>:
              <span className="bg-amber-100 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/products?filter=deals"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors shadow-xs"
          >
            <span>View All Daily Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default DealsOfDay;

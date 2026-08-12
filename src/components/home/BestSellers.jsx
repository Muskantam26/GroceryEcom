import React from 'react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BestSellers = () => {
  const { products } = useShop();
  const bestSellers = products.filter(p => p.rating >= 4.8).slice(0, 8);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
              Best Sellers
            </h2>
            <p className="text-xs md:text-sm text-slate-500">Most loved grocery items ordered every minute</p>
          </div>
        </div>
        <Link 
          to="/products?filter=bestsellers"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
        >
          See All Best Sellers →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestSellers.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;

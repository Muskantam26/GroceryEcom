import React from 'react';
import { categories } from '../../data/categoriesData';
import CategoryCard from '../common/CategoryCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
            Shop by Category
          </h2>
          <p className="text-xs md:text-sm text-slate-500">Explore fresh fruits, daily dairy, snacks & household staples</p>
        </div>
        <Link 
          to="/products"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;

import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group relative bg-white rounded-2xl border border-slate-200/70 hover:border-emerald-500/50 p-4 flex flex-col items-center text-center shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-3 bg-emerald-50/50 group-hover:scale-105 transition-transform duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-1 right-1 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-sm shadow-xs">
          {category.icon}
        </span>
      </div>

      <h4 className="font-heading font-bold text-xs md:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
        {category.name}
      </h4>

      <span className="text-[11px] font-semibold text-emerald-700 mt-0.5">
        {category.count}+ items
      </span>
    </Link>
  );
};

export default CategoryCard;

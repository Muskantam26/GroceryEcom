import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../data/categoriesData';
import { ChevronDown, Tag, Flame, Sparkles, Grid, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-emerald-900 text-emerald-50 text-xs border-b border-emerald-800 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        <div className="flex items-center gap-1 font-semibold">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `py-3 px-4 flex items-center gap-1.5 transition-colors border-b-2 ${isActive ? 'border-amber-400 text-amber-300 font-bold bg-emerald-800/60' : 'border-transparent hover:bg-emerald-800/40 text-emerald-100'}`
            }
          >
            Home
          </NavLink>

          {/* Categories Mega Dropdown */}
          <div className="relative group">
            <NavLink 
              to="/products" 
              className="py-3 px-4 flex items-center gap-1.5 transition-colors border-b-2 border-transparent hover:bg-emerald-800/40 text-emerald-100 group-hover:text-amber-300"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All Categories</span>
              <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </NavLink>

            <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-b-2xl shadow-2xl border border-emerald-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {categories.map(cat => (
                <NavLink
                  key={cat.id}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-900 transition-colors"
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink 
            to="/offers" 
            className={({ isActive }) => 
              `py-3 px-4 flex items-center gap-1.5 transition-colors border-b-2 ${isActive ? 'border-amber-400 text-amber-300 font-bold bg-emerald-800/60' : 'border-transparent hover:bg-emerald-800/40 text-emerald-100'}`
            }
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Offers & Coupons</span>
          </NavLink>

          <NavLink 
            to="/products?filter=bestsellers" 
            className={({ isActive }) => 
              `py-3 px-4 flex items-center gap-1.5 transition-colors border-b-2 ${isActive ? 'border-amber-400 text-amber-300 font-bold bg-emerald-800/60' : 'border-transparent hover:bg-emerald-800/40 text-emerald-100'}`
            }
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Best Sellers</span>
          </NavLink>

          <NavLink 
            to="/products?filter=new" 
            className={({ isActive }) => 
              `py-3 px-4 flex items-center gap-1.5 transition-colors border-b-2 ${isActive ? 'border-amber-400 text-amber-300 font-bold bg-emerald-800/60' : 'border-transparent hover:bg-emerald-800/40 text-emerald-100'}`
            }
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>New Arrivals</span>
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <NavLink 
            to="/admin" 
            className="py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-200 hover:text-white font-bold flex items-center gap-1.5 text-[11px] transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Portal</span>
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

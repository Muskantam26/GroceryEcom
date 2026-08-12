import React from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';

const MobileBottomNav = () => {
  const { cartCount, wishlist } = useShop();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 px-3 py-2 flex items-center justify-around shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
            isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
            isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <Grid className="w-5 h-5" />
        <span>Categories</span>
      </NavLink>

      <NavLink
        to="/products?focus=search"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
            isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
            isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
        <span>Wishlist</span>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
            isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 right-1 w-4 h-4 bg-emerald-800 text-white rounded-full text-[9px] font-black flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span>Cart</span>
      </NavLink>
    </div>
  );
};

export default MobileBottomNav;

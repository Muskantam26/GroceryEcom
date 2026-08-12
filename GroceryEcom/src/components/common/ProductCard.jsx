import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Star, Heart, Plus, Minus, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity, toggleWishlist, isInWishlist } = useShop();

  const isWish = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* BADGES & WISHLIST */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.discount > 0 ? (
          <span className="badge-offer text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
            {product.discount}% OFF
          </span>
        ) : product.badge ? (
          <span className="badge-green text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        ) : <div />}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-90 transition-all"
          title={isWish ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* PRODUCT IMAGE */}
      <Link to={`/product/${product.id}`} className="relative aspect-square w-full bg-slate-50 overflow-hidden block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.stock === "Low Stock" && (
          <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Only few left
          </div>
        )}
      </Link>

      {/* CARD BODY */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* BRAND & RATING */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-emerald-800 uppercase text-[10px] tracking-wider truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* PRODUCT NAME */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-heading font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* QUANTITY METRIC */}
          <div className="text-xs text-slate-500 mt-1 font-medium">
            {product.quantity}
          </div>
        </div>

        {/* PRICING & ADD ACTION */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-base md:text-lg text-slate-900">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">
              Inclusive of taxes
            </span>
          </div>

          {/* ADD / QUANTITY BUTTON */}
          {inCartQty === 0 ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-800/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-emerald-800 text-white rounded-xl p-1 shadow-md">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="w-6 h-6 rounded-lg bg-emerald-900 hover:bg-emerald-950 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Minus className="w-3 h-3 stroke-[3]" />
              </button>
              <span className="w-6 text-center text-xs font-black">
                {inCartQty}
              </span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="w-6 h-6 rounded-lg bg-emerald-900 hover:bg-emerald-950 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductCard;

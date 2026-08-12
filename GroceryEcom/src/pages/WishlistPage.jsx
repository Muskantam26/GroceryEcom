import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, products } = useShop();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-100 shadow-inner">
          <Heart className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-3xl text-slate-900">Your Wishlist is Empty</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Save your favorite daily groceries, fruits, and snacks here to buy them later with 1-click.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-heading font-extrabold text-sm shadow-xl transition-all"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 border border-emerald-800 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            Saved Favorites
          </span>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white">
            My Wishlist ({wishlistProducts.length} Items)
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlistProducts.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

    </div>
  );
};

export default WishlistPage;

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';
import { 
  Star, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Zap, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCcw, 
  ChevronRight, 
  Truck, 
  Share2, 
  ThumbsUp
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, cart, updateQuantity, toggleWishlist, isInWishlist, selectedLocation, showToast } = useShop();

  const product = products.find(p => p.id === id) || products[0];
  const isWish = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("400001");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  // Related Products
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus({ valid: true, msg: `Delivery available to ${pincode} in 15-30 minutes!` });
    } else {
      setPincodeStatus({ valid: false, msg: "Please enter a valid 6-digit Pincode" });
    }
  };

  const handleBuyNow = () => {
    if (inCartQty === 0) {
      addToCart(product, quantity);
    }
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-emerald-700">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* MAIN DETAIL GRID */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: GALLERY */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 badge-offer text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                {product.discount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all"
            >
              <Heart className={`w-5 h-5 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[product.image, product.image, product.image, product.image].map((img, idx) => (
              <div key={idx} className="aspect-square rounded-xl border-2 border-emerald-600 overflow-hidden cursor-pointer">
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              {product.brand}
            </span>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 leading-tight">
              {product.name}
            </h1>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Net Quantity: <span className="text-slate-800 font-bold">{product.quantity}</span>
            </div>

            {/* RATING BADGE */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-xs">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {product.reviews} Verified Customer Ratings
              </span>
            </div>
          </div>

          {/* PRICING CARD */}
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100/80 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-heading font-black text-3xl text-slate-900">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-slate-400 line-through font-semibold">
                  MRP ₹{product.mrp}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Save ₹{product.mrp - product.price}
                </span>
              )}
            </div>
            <p className="text-[11px] font-semibold text-slate-500">
              Inclusive of all taxes • Best everyday value guaranteed
            </p>
          </div>

          {/* QUANTITY SELECTOR & CTA BUTTONS */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700 uppercase">Quantity:</span>
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-black text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-heading font-extrabold text-sm shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-emerald-950 font-heading font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 stroke-[2.5]" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* PINCODE CHECKER */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Delivery Availability Checker</span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600"
              />
              <button type="submit" className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-900">
                Check
              </button>
            </form>
            {pincodeStatus && (
              <div className={`text-xs font-bold flex items-center gap-1.5 ${pincodeStatus.valid ? 'text-emerald-700' : 'text-rose-600'}`}>
                {pincodeStatus.valid ? <CheckCircle2 className="w-4 h-4" /> : null}
                <span>{pincodeStatus.msg}</span>
              </div>
            )}
          </div>

          {/* SERVICE BADGES */}
          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 font-semibold border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>15-30 Min Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCcw className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Instant Returns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% Original</span>
            </div>
          </div>

        </div>

      </div>

      {/* LOWER SPECIFICATION TABS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'description' ? 'border-emerald-700 text-emerald-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            Description & Highlights
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'specs' ? 'border-emerald-700 text-emerald-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            Ingredients & Specs
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-emerald-700 text-emerald-900 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            Customer Reviews ({product.reviews})
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
            <p>{product.description}</p>
            {product.highlights && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Product Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-emerald-950 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-3 text-xs md:text-sm text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Brand</span>
                <span className="font-bold text-slate-900">{product.brand}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Category</span>
                <span className="font-bold text-slate-900">{product.category}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Ingredients</span>
                <span className="font-bold text-slate-900">{product.ingredients || "Fresh produce"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Shelf Life</span>
                <span className="font-bold text-slate-900">Refer to package date</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <div className="text-center pr-4 border-r border-emerald-200">
                <div className="font-heading font-black text-3xl text-emerald-900">{product.rating}</div>
                <div className="flex items-center text-amber-400 text-xs mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>
              <div className="text-xs text-emerald-950 font-medium">
                <strong>98% of buyers</strong> recommend this product for quality and taste.
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-3 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Sunil K. - Verified Buyer</span>
                  <span className="text-slate-400 text-[10px]">2 days ago</span>
                </div>
                <div className="flex text-amber-400">★★★★★</div>
                <p className="text-slate-600">Extremely fresh and packaged really well. Arrived in 12 minutes!</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Meenakshi P. - Verified Buyer</span>
                  <span className="text-slate-400 text-[10px]">1 week ago</span>
                </div>
                <div className="flex text-amber-400">★★★★★</div>
                <p className="text-slate-600">Comrade's price is lower than my local grocery store. Will order again.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <h3 className="font-heading font-extrabold text-xl text-slate-900">
            Similar Products You Might Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetailPage;

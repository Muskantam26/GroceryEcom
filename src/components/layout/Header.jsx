import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { 
  Search, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  User, 
  ChevronDown, 
  Sparkles, 
  X, 
  LogOut, 
  LayoutDashboard, 
  ShoppingBasket
} from 'lucide-react';

const locations = [
  "Mumbai - 400001",
  "Bengaluru - 560001",
  "Delhi NCR - 110001",
  "Hyderabad - 500001",
  "Pune - 411001",
  "Kolkata - 700001",
  "Chennai - 600001"
];

const Header = () => {
  const { 
    products, 
    cartCount, 
    cartSubtotal, 
    wishlist, 
    selectedLocation, 
    changeLocation, 
    user, 
    logout, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [showLocModal, setShowLocModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Autocomplete matching
  const searchResults = searchQuery.trim() === "" ? [] : products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSuggestion = (product) => {
    setSearchQuery("");
    setIsSearching(false);
    navigate(`/product/${product.id}`);
  };

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4 md:gap-6">
        
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <ShoppingBasket className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-heading font-extrabold text-xl md:text-2xl tracking-tight text-emerald-950">
                COMRADE'S
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase block -mt-1">
              GROCERY MART
            </span>
          </div>
        </Link>

        {/* LOCATION SELECTOR */}
        <button 
          onClick={() => setShowLocModal(true)}
          className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/60 text-left transition-colors text-xs shrink-0"
        >
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0 animate-bounce" />
          <div>
            <div className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">Deliver to</div>
            <div className="font-bold text-emerald-950 flex items-center gap-1">
              {selectedLocation}
              <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
            </div>
          </div>
        </button>

        {/* SEARCH BAR WITH AUTOCOMPLETE */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search for fresh fruits, milk, atta, snacks, soaps..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all font-medium placeholder:text-slate-400"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          {isSearching && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-50 animate-slide-up">
              <div className="p-2 text-xs font-semibold text-slate-400 border-b border-slate-100 flex justify-between px-4">
                <span>SUGGESTIONS</span>
                <span>{searchResults.length} items found</span>
              </div>
              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {searchResults.map(prod => (
                    <div 
                      key={prod.id}
                      onClick={() => handleSelectSuggestion(prod)}
                      className="p-3 flex items-center gap-3 hover:bg-emerald-50/50 cursor-pointer transition-colors"
                    >
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">{prod.name}</div>
                        <div className="text-xs text-emerald-700 font-medium">{prod.category} • {prod.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-emerald-900">₹{prod.price}</div>
                        <div className="text-[10px] text-slate-400 line-through">₹{prod.mrp}</div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 text-center text-xs font-bold text-emerald-700 hover:bg-emerald-100/50 transition-colors"
                  >
                    View all results for "{searchQuery}" →
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-slate-500">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* HEADER ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Admin Dashboard Quick Link */}
          <Link
            to="/admin"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>Admin</span>
          </Link>

          {/* Account Dropdown */}
          <div className="relative">
            {user.isLoggedIn ? (
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 md:px-3 md:py-2 rounded-xl hover:bg-slate-100 transition-colors text-xs font-bold text-slate-800"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline truncate max-w-[100px]">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
              </button>
            ) : (
              <Link 
                to="/auth"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs transition-colors"
              >
                <User className="w-4 h-4 text-emerald-700" />
                <span>Login</span>
              </Link>
            )}

            {/* User Menu Popup */}
            {showUserMenu && user.isLoggedIn && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-slide-up">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                </div>
                <Link 
                  to="/orders"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  My Orders & Tracking
                </Link>
                <Link 
                  to="/wishlist"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  My Wishlist ({wishlist.length})
                </Link>
                <Link 
                  to="/admin"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  Admin Dashboard
                </Link>
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link 
            to="/wishlist" 
            className="relative p-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pop-in">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon & Trigger */}
          <Link 
            to="/cart" 
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-transform active:scale-95 shadow-md shadow-emerald-900/20"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-amber-400 text-emerald-950 rounded-full text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">₹{cartSubtotal}</span>
          </Link>

        </div>

      </div>

      {/* LOCATION SELECTION MODAL */}
      {showLocModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 animate-pop-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <h3 className="font-heading font-bold text-lg text-slate-900">Select Delivery Location</h3>
              </div>
              <button 
                onClick={() => setShowLocModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Choose your delivery location to see accurate stock and superfast delivery times.
            </p>
            <div className="space-y-2">
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    changeLocation(loc);
                    setShowLocModal(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold border transition-all flex items-center justify-between ${
                    selectedLocation === loc 
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/20' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{loc}</span>
                  {selectedLocation === loc && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

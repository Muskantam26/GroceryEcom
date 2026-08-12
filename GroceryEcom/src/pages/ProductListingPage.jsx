import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';
import { categories } from '../data/categoriesData';
import { Filter, SlidersHorizontal, ChevronRight, X, RotateCcw, Search } from 'lucide-react';

const ProductListingPage = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Query Params
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  // Local Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [maxPrice, setMaxPrice] = useState(800);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Sync categoryParam when searchParams changes
  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set(products.map(p => p.brand));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search query
      if (searchParam && !p.name.toLowerCase().includes(searchParam.toLowerCase()) && !p.brand.toLowerCase().includes(searchParam.toLowerCase()) && !p.category.toLowerCase().includes(searchParam.toLowerCase())) {
        return false;
      }
      // Category filter
      if (selectedCategory && selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Special Filter Params
      if (filterParam === 'bestsellers' && p.rating < 4.8) return false;
      if (filterParam === 'deals' && p.discount < 15) return false;

      // Price filter
      if (p.price > maxPrice) return false;
      // Brand filter
      if (selectedBrand !== 'All' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      // Rating filter
      if (p.rating < minRating) return false;
      // Discount filter
      if (p.discount < minDiscount) return false;
      // Stock filter
      if (inStockOnly && p.stock !== 'In Stock') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discount - a.discount;
      return b.reviews - a.reviews; // Popular
    });
  }, [products, searchParam, selectedCategory, filterParam, maxPrice, selectedBrand, minRating, minDiscount, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('');
    setMaxPrice(800);
    setSelectedBrand('All');
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-semibold">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">
          {searchParam ? `Search: "${searchParam}"` : selectedCategory || "All Groceries"}
        </span>
      </nav>

      {/* PAGE HEADING BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 mb-6 shadow-md border border-emerald-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Supermarket Catalog
          </span>
          <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white">
            {searchParam ? `Results for "${searchParam}"` : selectedCategory ? selectedCategory : "Fresh Groceries & Essentials"}
          </h1>
          <p className="text-xs md:text-sm text-emerald-200 mt-1">
            Showing {filteredProducts.length} premium quality items with 15-30 min express delivery
          </p>
        </div>

        <button
          onClick={() => setShowMobileFilter(true)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow-md"
        >
          <Filter className="w-4 h-4 text-emerald-700" />
          <span>Filters & Sort</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-heading font-bold text-base text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <span>Filter Products</span>
            </div>
            <button 
              onClick={resetFilters}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Categories</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => { setSelectedCategory(''); setSearchParams({}); }}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${!selectedCategory ? 'bg-emerald-100 text-emerald-950 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'bg-emerald-100 text-emerald-950 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider">Max Price</span>
              <span className="font-extrabold text-emerald-800">₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="30" 
              max="1000" 
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>₹30</span>
              <span>₹1,000</span>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Brand</h4>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-600"
            >
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Minimum Rating</h4>
            <div className="flex items-center gap-2">
              {[0, 4.0, 4.5, 4.8].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${minRating === r ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  {r === 0 ? 'All' : `${r}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Discount</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 10, 20].map(d => (
                <button
                  key={d}
                  onClick={() => setMinDiscount(d)}
                  className={`py-1.5 rounded-xl text-xs font-bold border transition-colors ${minDiscount === d ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  {d === 0 ? 'All' : `${d}%+ OFF`}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Availability Toggle */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">In Stock Only</span>
            <input 
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-emerald-700 rounded cursor-pointer"
            />
          </div>

        </aside>

        {/* MAIN PRODUCT GRID CONTENT */}
        <main className="lg:col-span-9 space-y-4">
          
          {/* TOP CONTROLS BAR */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-semibold text-slate-600">
              Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> products
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
              >
                <option value="popular">Popularity / Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">No products match your filters</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try clearing some filters or searching for different grocery terms like Atta, Milk, Bananas, or Lay's.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-5 overflow-y-auto space-y-6 animate-slide-up flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-heading font-bold text-base text-slate-900">Filter & Sort</h3>
                <button onClick={() => setShowMobileFilter(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Sort */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs font-bold"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Max Price</span>
                  <span className="text-emerald-700">₹{maxPrice}</span>
                </div>
                <input 
                  type="range" min="30" max="1000" step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Mobile Category */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">Category</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs font-bold"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t flex gap-2">
              <button onClick={resetFilters} className="flex-1 py-3 rounded-xl border font-bold text-xs">Reset</button>
              <button onClick={() => setShowMobileFilter(false)} className="flex-1 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs">Apply</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductListingPage;

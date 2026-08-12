import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { adminStats, adminSalesChartData, adminRecentOrders } from '../data/adminMockData';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  X,
  Layers,
  Percent,
  Settings,
  DollarSign,
  BarChart3
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { products, addProduct, deleteProduct, showToast } = useShop();

  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Add Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'Comrade Organic',
    category: 'Staples',
    price: 120,
    mrp: 150,
    quantity: '1 kg',
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    description: 'Fresh quality product sourced directly.'
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (newProd.name && newProd.price) {
      const discount = Math.round(((newProd.mrp - newProd.price) / newProd.mrp) * 100);
      addProduct({ ...newProd, discount });
      setShowAddModal(false);
      setNewProd({
        name: '', brand: 'Comrade Organic', category: 'Staples', price: 120, mrp: 150, quantity: '1 kg', stock: 'In Stock',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', description: ''
      });
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders = adminRecentOrders.filter(o => 
    orderStatusFilter === 'All' ? true : o.status.toLowerCase() === orderStatusFilter.toLowerCase()
  );

  const getStatusBadge = (status) => {
    const styles = {
      Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Out for Delivery': 'bg-blue-100 text-blue-800 border-blue-300',
      Packed: 'bg-purple-100 text-purple-800 border-purple-300',
      Confirmed: 'bg-amber-100 text-amber-800 border-amber-300',
      Pending: 'bg-slate-100 text-slate-800 border-slate-300',
      Cancelled: 'bg-rose-100 text-rose-800 border-rose-300'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* DASHBOARD TOP HEADER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">SaaS Management System</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white mt-1">
            COMRADE'S Admin Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">Real-time store metrics, inventory control, and order fulfillment</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-emerald-950 font-heading font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'orders', label: 'Orders & Status', icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'products', label: 'Product Catalog', icon: <Package className="w-4 h-4" /> },
            { id: 'inventory', label: 'Inventory Alert', icon: <Layers className="w-4 h-4" /> },
            { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
            { id: 'coupons', label: 'Coupons & Offers', icon: <Percent className="w-4 h-4" /> },
            { id: 'reports', label: 'Financial Reports', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'settings', label: 'Store Settings', icon: <Settings className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* MAIN DASHBOARD PANEL */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 STATS CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-heading font-black text-2xl text-slate-900">
                    ₹{adminStats.totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    {adminStats.revenueGrowth} vs last month
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-heading font-black text-2xl text-slate-900">
                    {adminStats.totalOrders.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    {adminStats.ordersGrowth} vs last month
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Total Customers</span>
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-heading font-black text-2xl text-slate-900">
                    {adminStats.totalCustomers.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    {adminStats.customersGrowth} vs last month
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Active Products</span>
                    <Package className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-heading font-black text-2xl text-slate-900">
                    {products.length}
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                    {adminStats.lowStockCount} Low Stock
                  </span>
                </div>

              </div>

              {/* VISUAL REVENUE CHART */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-slate-900">Sales Overview</h3>
                    <p className="text-xs text-slate-500">Monthly gross sales and order volume performance</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                    H1 2026 Growth: +18.4%
                  </span>
                </div>

                {/* SVG Visual Bar Chart */}
                <div className="h-48 pt-6 flex items-end justify-between gap-4 border-b pb-2">
                  {adminSalesChartData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-800">
                        ₹{(d.sales / 1000).toFixed(0)}k
                      </span>
                      <div 
                        className="w-full bg-gradient-to-t from-emerald-800 to-emerald-500 rounded-t-xl group-hover:from-amber-400 group-hover:to-amber-500 transition-all duration-300"
                        style={{ height: `${(d.sales / 260000) * 140}px` }}
                      ></div>
                      <span className="text-xs font-bold text-slate-700">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT ORDERS TABLE */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-3 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-base text-slate-900">Recent Customer Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-emerald-700 hover:underline">
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b text-[10px]">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {adminRecentOrders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-900">{o.id}</td>
                          <td className="p-3 font-bold text-slate-900">{o.customer}</td>
                          <td className="p-3 text-slate-500">{o.date}</td>
                          <td className="p-3 font-mono font-bold text-emerald-900">₹{o.amount}</td>
                          <td className="p-3">{o.payment}</td>
                          <td className="p-3">{getStatusBadge(o.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">Orders Management</h3>
                <div className="flex gap-2 text-xs font-bold">
                  {['All', 'Delivered', 'Out for Delivery', 'Packed', 'Confirmed', 'Pending'].map(st => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl border transition-colors ${orderStatusFilter === st ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b text-[10px]">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer Email</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredOrders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{o.id}</td>
                        <td className="p-3 text-slate-600">{o.email}</td>
                        <td className="p-3 font-bold">{o.items} pcs</td>
                        <td className="p-3 font-mono font-bold text-emerald-900">₹{o.amount}</td>
                        <td className="p-3">{o.payment}</td>
                        <td className="p-3">{getStatusBadge(o.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCT CATALOG */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900">Product Catalog Management</h3>
                  <p className="text-xs text-slate-500">Add, update prices, stock, or remove products from live store</p>
                </div>
                
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b text-[10px]">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price / MRP</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredProducts.map(prod => (
                      <tr key={prod.id} className="hover:bg-slate-50">
                        <td className="p-3 flex items-center gap-3">
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                          <div>
                            <div className="font-bold text-slate-900">{prod.name}</div>
                            <div className="text-[10px] text-slate-400">{prod.brand} • {prod.quantity}</div>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600 font-bold">{prod.category}</td>
                        <td className="p-3">
                          <div className="font-mono font-bold text-slate-900">₹{prod.price}</div>
                          <div className="text-[10px] text-slate-400 line-through">₹{prod.mrp}</div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${prod.stock === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {prod.stock} ({prod.stockCount || 40})
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-800">★ {prod.rating}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Inventory & Stock Alerts</span>
              </h3>
              <p className="text-xs text-slate-500">Products with stock under 50 units needing re-order from distributor</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {products.slice(0, 6).map(p => (
                  <div key={p.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{p.name}</h4>
                        <span className="text-[10px] text-slate-400">Stock Count: {p.stockCount || 25} units</span>
                      </div>
                    </div>
                    <button onClick={() => showToast(`Restock order placed for ${p.name}`, 'success')} className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-bold text-[11px]">
                      Re-order 100 pcs
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5+: PLACEHOLDER SAAS SECTIONS */}
          {['customers', 'coupons', 'reports', 'settings'].includes(activeTab) && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <LayoutDashboard className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-heading font-bold text-xl text-slate-900 uppercase">
                {activeTab} Management Panel
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Commercial SaaS view configured. Operating synchronously with live Comrade Store data.
              </p>
            </div>
          )}

        </main>

      </div>

      {/* ADD NEW PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 animate-pop-in space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-base text-slate-900">Add New Product to Store</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-700">Product Title</label>
                <input
                  type="text" required placeholder="Amul Butter 500g"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-700">Brand</label>
                  <input
                    type="text" required value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-700">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  >
                    <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                    <option value="Staples">Staples</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Bakery">Bakery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-700">Selling Price (₹)</label>
                  <input
                    type="number" required value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-700">MRP (₹)</label>
                  <input
                    type="number" required value={newProd.mrp}
                    onChange={(e) => setNewProd({ ...newProd, mrp: Number(e.target.value) })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-700">Unit Metric</label>
                  <input
                    type="text" required value={newProd.quantity}
                    onChange={(e) => setNewProd({ ...newProd, quantity: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700">Image URL</label>
                <input
                  type="text" required value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <button type="submit" className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl mt-2">
                Publish Product
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;

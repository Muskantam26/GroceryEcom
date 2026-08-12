import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, CreditCard, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t border-slate-900 mt-16 pb-20 md:pb-12">
      
      {/* Top Support Callout */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/60 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white">Need help? We're here for you.</h4>
              <p className="text-xs text-emerald-200">Our customer support team is available 24/7 to resolve your queries.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="tel:1800123456" className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-900/40">
              Call 1800-COMRADE
            </a>
            <a href="mailto:support@comrade-grocery.com" className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors">
              Email Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
              <ShoppingBasket className="w-5 h-5" />
            </div>
            <span className="font-heading font-extrabold text-xl text-white tracking-tight">
              COMRADE'S Grocery Mart
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
            Freshness delivered straight from farms to your kitchen. Everyday low prices, zero compromises on quality, and lightning fast delivery across India.
          </p>
          <div className="pt-2 flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1.5 text-[11px] bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Freshness Guarantee
            </span>
            <span className="flex items-center gap-1.5 text-[11px] bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <Truck className="w-4 h-4 text-emerald-400" />
              Express Delivery
            </span>
          </div>
        </div>

        {/* Categories Links */}
        <div className="space-y-3">
          <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Top Categories</h5>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/products?category=Fruits%20%26%20Vegetables" className="hover:text-emerald-400 transition-colors">Fruits & Vegetables</Link></li>
            <li><Link to="/products?category=Dairy%20%26%20Eggs" className="hover:text-emerald-400 transition-colors">Dairy & Eggs</Link></li>
            <li><Link to="/products?category=Staples" className="hover:text-emerald-400 transition-colors">Atta, Rice & Oil</Link></li>
            <li><Link to="/products?category=Snacks" className="hover:text-emerald-400 transition-colors">Munchies & Snacks</Link></li>
            <li><Link to="/products?category=Beverages" className="hover:text-emerald-400 transition-colors">Tea, Coffee & Juices</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="space-y-3">
          <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Company</h5>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
            <li><Link to="/offers" className="hover:text-emerald-400 transition-colors">Offers & Coupons</Link></li>
            <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">Admin Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Help & Policies */}
        <div className="space-y-3">
          <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Policies & Help</h5>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/help" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy" className="hover:text-emerald-400 transition-colors">Refund Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-emerald-400 transition-colors">Shipping Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} COMRADE'S Grocery Mart. All Rights Reserved. Crafted with care for fresh living.
        </div>
        <div className="flex items-center gap-4 text-slate-400 font-medium">
          <span>100% Secure Payments:</span>
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold border border-slate-800 text-emerald-400">UPI</span>
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold border border-slate-800 text-blue-400">VISA</span>
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold border border-slate-800 text-amber-400">Mastercard</span>
            <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold border border-slate-800 text-purple-400">COD</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

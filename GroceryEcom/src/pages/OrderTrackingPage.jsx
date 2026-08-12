import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  Home, 
  Phone, 
  ChevronRight, 
  FileText,
  MapPin,
  ShieldCheck
} from 'lucide-react';

const steps = [
  { id: 1, title: "Order Placed", desc: "Received at Comrade Store", icon: <CheckCircle2 className="w-5 h-5" /> },
  { id: 2, title: "Order Confirmed", desc: "Items verified & locked", icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 3, title: "Packed", desc: "Temperature controlled bag", icon: <Package className="w-5 h-5" /> },
  { id: 4, title: "Out for Delivery", desc: "Rider on the way", icon: <Truck className="w-5 h-5" /> },
  { id: 5, title: "Delivered", desc: "Handed over safely", icon: <Home className="w-5 h-5" /> }
];

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { orders } = useShop();

  const currentOrder = orders.find(o => o.id === orderId) || orders[0];
  const currentStep = 4; // Simulated active stage: Out for Delivery

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Track Order #{currentOrder?.id}</span>
      </nav>

      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 border border-emerald-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            Live Order Status
          </span>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white">
            Arriving in 12 Minutes ⚡
          </h1>
          <p className="text-xs text-emerald-200 mt-1">
            Order #{currentOrder?.id} • Estimated Delivery: Today at 23:25
          </p>
        </div>

        <button 
          onClick={() => alert("Downloading Invoice PDF...")}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-2 backdrop-blur-xs"
        >
          <FileText className="w-4 h-4 text-amber-300" />
          <span>Download Invoice</span>
        </button>
      </div>

      {/* 5-STAGE PROGRESS TIMELINE */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-8">
        
        <h3 className="font-heading font-extrabold text-lg text-slate-900">
          Delivery Progress Timeline
        </h3>

        {/* Progress Bar & Nodes */}
        <div className="relative">
          
          {/* Connector Line */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-1 bg-slate-200 -z-0">
            <div className="h-full bg-emerald-600 transition-all duration-500" style={{ width: '75%' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {steps.map(s => {
              const isCompleted = s.id <= currentStep;
              const isCurrent = s.id === currentStep;

              return (
                <div key={s.id} className="flex md:flex-col items-center gap-3 text-left md:text-center">
                  
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shrink-0 ${
                    isCurrent 
                      ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-400/30 scale-110 shadow-lg' 
                      : isCompleted 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-slate-100 text-slate-400 border'
                  }`}>
                    {s.icon}
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                      {s.title}
                    </h4>
                    <p className="text-[10px] text-slate-500">{s.desc}</p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* LIVE RIDER DETAILS */}
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-extrabold flex items-center justify-center text-lg">
              RK
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">Assigned Delivery Executive</span>
              <h4 className="font-heading font-bold text-sm text-slate-900">Ramesh Kumar</h4>
              <p className="text-xs text-slate-600">On TVS Electric Scooter • Vaccine Verified</p>
            </div>
          </div>

          <a 
            href="tel:9876543210"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Call Rider (+91 9876543210)</span>
          </a>
        </div>

      </div>

      {/* ITEMS IN THIS ORDER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-900 border-b pb-3">
          Items in this Package
        </h3>
        <div className="divide-y divide-slate-100">
          {currentOrder?.items?.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                <div>
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="text-slate-500 text-[11px]">Quantity: {item.quantity}</div>
                </div>
              </div>
              <div className="font-mono font-bold text-slate-900">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OrderTrackingPage;

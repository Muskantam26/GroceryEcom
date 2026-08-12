import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, MapPin, CreditCard, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { orders } = useShop();

  const currentOrder = orders.find(o => o.id === orderId) || orders[0];

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-slate-900">
      
      {/* CELEBRATION CARD */}
      <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center space-y-4 relative overflow-hidden">
        
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner animate-pop-in">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
            Order Confirmed 🎉
          </span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">
            Order Placed Successfully!
          </h1>
          <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto">
            Thank you for shopping with COMRADE'S Grocery Mart. Your order is being packed right now!
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-xs font-extrabold text-emerald-950 font-mono">
          <span>ORDER ID:</span>
          <span className="text-emerald-700">{currentOrder?.id || orderId}</span>
        </div>

      </div>

      {/* ORDER SUMMARY RECAP */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        
        <h3 className="font-heading font-bold text-base text-slate-900 border-b pb-3 flex items-center justify-between">
          <span>Delivery Details</span>
          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <Truck className="w-4 h-4" />
            {currentOrder?.estimatedDelivery || '15-30 Mins'}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
          <div className="bg-slate-50 p-4 rounded-2xl border space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Delivery Address
            </span>
            <div className="text-slate-900 font-bold">{currentOrder?.deliveryAddress || "Flat 402, Green Valley, Andheri West"}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
              Payment Method
            </span>
            <div className="text-slate-900 font-bold">{currentOrder?.paymentMethod || "UPI (Instant)"}</div>
            <div className="text-emerald-700 font-extrabold text-sm">Total Paid: ₹{currentOrder?.amount}</div>
          </div>
        </div>

        {/* Itemized List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items ({currentOrder?.items?.length || 2})</h4>
          <div className="divide-y divide-slate-100 border-t border-b">
            {currentOrder?.items?.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-slate-400 text-[10px]">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-mono font-bold text-slate-900">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to={`/track-order/${currentOrder?.id || orderId}`}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-heading font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>Track Order Status</span>
          </Link>

          <Link
            to="/products"
            className="flex-1 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default OrderConfirmationPage;

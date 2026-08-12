import React from 'react';
import { Leaf, RefreshCcw, ShieldCheck, Zap } from 'lucide-react';

const badges = [
  {
    icon: <Leaf className="w-6 h-6 text-emerald-600" />,
    title: "Fresh Products",
    desc: "Directly sourced from farms & certified suppliers"
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-emerald-600" />,
    title: "Easy Returns",
    desc: "No questions asked instant return at doorstep"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    title: "Secure Payments",
    desc: "100% encrypted UPI, Cards, & COD available"
  },
  {
    icon: <Zap className="w-6 h-6 text-emerald-600" />,
    title: "Fast Delivery",
    desc: "Order delivered safely within 15-30 minutes"
  }
];

const TrustBadges = () => {
  return (
    <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map((b, idx) => (
        <div 
          key={idx}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            {b.icon}
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900">{b.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-1">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;

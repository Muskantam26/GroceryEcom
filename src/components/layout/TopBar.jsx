import React from 'react';
import { Sparkles, Zap, PhoneCall } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3 fill-emerald-400 text-emerald-400" />
            15 MINS DELIVERY
          </span>
          <span>Fresh groceries. Better prices. Delivered to your door.</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-emerald-200">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Use Code <strong className="text-amber-300 ml-1 font-mono">COMRADE10</strong> for 10% OFF
          </span>
          <a href="tel:1800123456" className="flex items-center gap-1 hover:text-white transition-colors">
            <PhoneCall className="w-3.5 h-3.5" />
            Support: 1800-COMRADE
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

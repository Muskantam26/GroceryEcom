import React from 'react';
import { Smartphone, Star, Download, CheckCircle2 } from 'lucide-react';

const AppDownload = () => {
  return (
    <section className="py-8">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>COMRADE'S MOBILE APP</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight">
              Groceries at your fingertips
            </h2>

            <p className="text-slate-300 text-sm md:text-base max-w-lg">
              Shop faster with the COMRADE'S mobile app. Track live orders, get instant stock alerts, and claim app-exclusive discounts.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Live GPS Order Tracking from Store to Door</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1-Tap Reorder your daily household favorites</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>App Exclusive ₹100 Cashback on first 3 orders</span>
              </li>
            </ul>

            {/* App Store Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              
              <button 
                onClick={() => alert("COMRADE'S Mobile App is coming soon to Google Play Store!")}
                className="px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-3 transition-transform active:scale-95 shadow-lg"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                  ▶
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase text-slate-500 font-semibold">GET IT ON</div>
                  <div className="font-heading font-extrabold text-sm leading-none">Google Play</div>
                </div>
              </button>

              <button 
                onClick={() => alert("COMRADE'S Mobile App is coming soon to Apple App Store!")}
                className="px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-3 transition-transform active:scale-95 shadow-lg"
              >
                <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                  
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase text-slate-500 font-semibold">DOWNLOAD ON THE</div>
                  <div className="font-heading font-extrabold text-sm leading-none">App Store</div>
                </div>
              </button>

            </div>

            <p className="text-[10px] text-slate-500 italic pt-1">
              * Visual concept for the upcoming COMRADE'S iOS & Android mobile application.
            </p>

          </div>

          {/* Right Phone Mockup graphic */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-[340px] bg-emerald-950 border-4 border-slate-700 rounded-[40px] p-3 shadow-2xl overflow-hidden flex flex-col justify-between">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
              
              <div className="flex-1 bg-emerald-900/60 rounded-2xl p-4 flex flex-col justify-between text-white border border-emerald-800">
                <div className="space-y-2">
                  <div className="text-xs font-extrabold text-amber-300">COMRADE'S App</div>
                  <div className="text-base font-black">⚡ 15 Min Delivery</div>
                  <div className="p-2 rounded-xl bg-emerald-800 text-[10px]">
                    📦 Order #ORD-9840 is Out for Delivery!
                  </div>
                </div>
                
                <div className="space-y-1 bg-white text-slate-900 p-2.5 rounded-xl text-center">
                  <div className="text-[10px] font-bold text-emerald-800">Use Code: APP100</div>
                  <div className="text-xs font-black">Flat ₹100 OFF</div>
                </div>
              </div>

              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AppDownload;

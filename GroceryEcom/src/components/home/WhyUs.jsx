import React from 'react';
import { Award, Tag, Truck, Lock } from 'lucide-react';

const benefits = [
  {
    icon: <Award className="w-8 h-8 text-emerald-600" />,
    title: "Quality Checked Products",
    desc: "Rigorous 3-step quality checking process ensures only farm fresh and genuine items reach you."
  },
  {
    icon: <Tag className="w-8 h-8 text-emerald-600" />,
    title: "Best Everyday Prices",
    desc: "Guaranteed lower prices than local supermarkets with daily deals, bundles & cashback coupons."
  },
  {
    icon: <Truck className="w-8 h-8 text-emerald-600" />,
    title: "Fast & Reliable Delivery",
    desc: "Real-time order tracking with 15 to 30 minute express delivery slots to fit your daily schedule."
  },
  {
    icon: <Lock className="w-8 h-8 text-emerald-600" />,
    title: "Secure Online Payments",
    desc: "100% safe checkout with Instant UPI, Debit/Credit Cards, Net Banking, and Cash on Delivery."
  }
];

const WhyUs = () => {
  return (
    <section className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
          Why Shop With COMRADE'S
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Designed to bring convenience, affordability and fresh quality to your family's doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {b.icon}
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
              {b.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;

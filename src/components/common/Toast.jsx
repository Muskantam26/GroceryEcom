import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toast } = useShop();

  if (!toast.visible) return null;

  const bgColors = {
    success: 'bg-emerald-900 text-emerald-50 border-emerald-700',
    error: 'bg-rose-900 text-rose-50 border-rose-700',
    warning: 'bg-amber-900 text-amber-50 border-amber-700',
    info: 'bg-slate-900 text-slate-50 border-slate-700'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md ${bgColors[toast.type] || bgColors.info}`}>
        {icons[toast.type]}
        <span className="text-sm font-medium pr-2">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingBasket, Lock, Mail, Phone, User, ShieldCheck, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useShop();
  const navigate = useNavigate();

  // Login Form State
  const [loginInput, setLoginInput] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register Form State
  const [regData, setRegData] = useState({ name: '', phone: '', email: '', password: '', confirmPassword: '' });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginInput && loginPass) {
      login(loginInput, loginPass);
      navigate('/');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regData.name && regData.email && regData.password) {
      if (regData.password !== regData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      register(regData);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mx-auto shadow-md">
            <ShoppingBasket className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900">
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {isLogin ? 'Log in to access your saved addresses & order history' : 'Sign up to unlock superfast grocery deliveries & deals'}
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-xl transition-all ${isLogin ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-xl transition-all ${!isLogin ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-bold">
            <div>
              <label className="text-slate-700 block mb-1">Mobile Number or Email</label>
              <div className="relative">
                <input
                  type="text" required placeholder="rahul@example.com or +91 9876543210"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-700">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to your registered email!"); }} className="text-[11px] text-emerald-700 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type="password" required placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-heading font-extrabold text-sm shadow-md transition-all">
              Sign In
            </button>

            <div className="relative text-center my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <span className="relative bg-white px-3 text-[10px] text-slate-400 font-bold uppercase">Or</span>
            </div>

            <button
              type="button"
              onClick={() => { login("google.user@gmail.com", "pass"); navigate('/'); }}
              className="w-full py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span className="font-mono text-rose-500 font-black">G</span>
              <span>Continue with Google</span>
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs font-bold">
            <div>
              <label className="text-slate-700 block mb-1">Full Name</label>
              <input
                type="text" required placeholder="Rahul Sharma"
                value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1">Mobile Number</label>
              <input
                type="text" required placeholder="+91 98765 43210"
                value={regData.phone}
                onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1">Email Address</label>
              <input
                type="email" required placeholder="rahul@example.com"
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1">Password</label>
              <input
                type="password" required placeholder="••••••••"
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1">Confirm Password</label>
              <input
                type="password" required placeholder="••••••••"
                value={regData.confirmPassword}
                onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-heading font-extrabold text-sm shadow-md transition-all mt-2">
              Create Account
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default AuthPage;

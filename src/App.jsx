import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import Toast from './components/common/Toast';

import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import WishlistPage from './pages/WishlistPage';
import AuthPage from './pages/AuthPage';
import OffersPage from './pages/OffersPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Helper component to scroll to top on route change
function ScrollToTopHelper() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTopHelper />
        <div className="min-h-screen flex flex-col bg-[#fcfbf7] font-sans antialiased text-slate-900 selection:bg-emerald-700 selection:text-white">
          <TopBar />
          <Header />
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />
              <Route path="/orders" element={<OrderTrackingPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
          <MobileBottomNav />
          <Toast />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
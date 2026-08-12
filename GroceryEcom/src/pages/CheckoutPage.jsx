import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  Plus, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  X,
  Truck
} from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    couponDiscount, 
    deliveryFee, 
    finalTotal, 
    addresses, 
    selectedAddressId, 
    setSelectedAddressId, 
    addAddress,
    placeOrder 
  } = useShop();

  const [activeStep, setActiveStep] = useState(1);
  const [deliverySlot, setDeliverySlot] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [showAddAddrModal, setShowAddAddrModal] = useState(false);

  // New Address Form State
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    name: '',
    phone: '',
    flat: '',
    area: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053'
  });

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (newAddr.name && newAddr.flat && newAddr.area) {
      addAddress(newAddr);
      setShowAddAddrModal(false);
      setNewAddr({ type: 'Home', name: '', phone: '', flat: '', area: '', city: 'Mumbai', state: 'Maharashtra', pincode: '400053' });
    }
  };

  const handleCompleteOrder = () => {
    const createdOrder = placeOrder({
      address: `${selectedAddress.flat}, ${selectedAddress.area}, ${selectedAddress.city} - ${selectedAddress.pincode}`,
      slot: deliverySlot,
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId || 'GPay'})` : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Net Banking'
    });

    navigate(`/order-confirmation/${createdOrder.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-slate-900">Your cart is empty</h2>
        <Link to="/products" className="px-6 py-2.5 bg-emerald-800 text-white rounded-xl font-bold text-xs inline-block">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/cart" className="hover:text-emerald-700">Cart</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Multi-Step Checkout</span>
      </nav>

      {/* STEP INDICATOR HEADER */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm grid grid-cols-4 gap-2 text-center text-xs font-bold">
        {[
          { num: 1, label: "1. Address" },
          { num: 2, label: "2. Delivery Slot" },
          { num: 3, label: "3. Payment" },
          { num: 4, label: "4. Review & Place" }
        ].map(step => (
          <button
            key={step.num}
            onClick={() => setActiveStep(step.num)}
            className={`py-2.5 px-2 rounded-2xl transition-all flex flex-col md:flex-row items-center justify-center gap-1 ${
              activeStep === step.num
                ? 'bg-emerald-800 text-white font-extrabold shadow-md'
                : activeStep > step.num
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-slate-50 text-slate-400'
            }`}
          >
            <span>{step.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: MULTI-STEP ACCORDION FORM */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className={`bg-white rounded-3xl border transition-all ${activeStep === 1 ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/10' : 'border-slate-200'}`}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900">Delivery Address</h3>
                  <p className="text-xs text-slate-500">Select where you want your groceries delivered</p>
                </div>
              </div>
              {activeStep !== 1 && (
                <button onClick={() => setActiveStep(1)} className="text-xs font-bold text-emerald-700 hover:underline">
                  Edit
                </button>
              )}
            </div>

            {activeStep === 1 && (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded-md uppercase">
                          {addr.type}
                        </span>
                        {selectedAddressId === addr.id && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900">{addr.name}</div>
                      <div className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {addr.flat}, {addr.area}, {addr.city} - {addr.pincode}
                      </div>
                      <div className="text-[11px] text-slate-500 font-semibold mt-2">{addr.phone}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setShowAddAddrModal(true)}
                    className="px-4 py-2.5 rounded-xl border border-dashed border-emerald-600 text-emerald-800 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>

                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <span>Deliver Here</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: DELIVERY SLOT */}
          <div className={`bg-white rounded-3xl border transition-all ${activeStep === 2 ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/10' : 'border-slate-200'}`}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900">Delivery Slot</h3>
                  <p className="text-xs text-slate-500">Choose your preferred delivery time</p>
                </div>
              </div>
              {activeStep !== 2 && (
                <button onClick={() => setActiveStep(2)} className="text-xs font-bold text-emerald-700 hover:underline">
                  Edit
                </button>
              )}
            </div>

            {activeStep === 2 && (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div
                    onClick={() => setDeliverySlot('express')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliverySlot === 'express'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        ⚡ EXPRESS 15 MINS
                      </span>
                      {deliverySlot === 'express' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </div>
                    <div className="text-xs font-bold text-slate-900">Superfast Store Delivery</div>
                    <p className="text-xs text-slate-500 mt-1">Delivered to your doorstep within 15-30 minutes right away.</p>
                  </div>

                  <div
                    onClick={() => setDeliverySlot('standard')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliverySlot === 'standard'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded-full">
                        📅 SCHEDULED
                      </span>
                      {deliverySlot === 'standard' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </div>
                    <div className="text-xs font-bold text-slate-900">Evening Delivery Slot</div>
                    <p className="text-xs text-slate-500 mt-1">Delivered today between 4:00 PM - 7:00 PM.</p>
                  </div>

                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <span>Proceed to Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className={`bg-white rounded-3xl border transition-all ${activeStep === 3 ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/10' : 'border-slate-200'}`}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900">Payment Options</h3>
                  <p className="text-xs text-slate-500">100% Encrypted & Safe Checkout</p>
                </div>
              </div>
              {activeStep !== 3 && (
                <button onClick={() => setActiveStep(3)} className="text-xs font-bold text-emerald-700 hover:underline">
                  Edit
                </button>
              )}
            </div>

            {activeStep === 3 && (
              <div className="p-5 space-y-4">
                
                <div className="space-y-3">
                  
                  {/* UPI Option */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xs bg-emerald-700 text-white px-2 py-1 rounded-md">UPI</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Instant UPI (GPay, PhonePe, Paytm, BHIM)</div>
                          <div className="text-[11px] text-slate-500">Zero extra transaction fees</div>
                        </div>
                      </div>
                      {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-emerald-100">
                        <input
                          type="text"
                          placeholder="Enter VPA / UPI ID (e.g. mobile@upi)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    )}
                  </div>

                  {/* Card Option */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-emerald-700" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">Credit / Debit Card</div>
                          <div className="text-[11px] text-slate-500">Visa, Mastercard, RuPay & Maestro</div>
                        </div>
                      </div>
                      {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </div>
                  </div>

                  {/* COD Option */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xs bg-amber-500 text-emerald-950 px-2 py-1 rounded-md">COD</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Cash on Delivery</div>
                          <div className="text-[11px] text-slate-500">Pay cash or QR scan at doorstep</div>
                        </div>
                      </div>
                      {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </div>
                  </div>

                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <span>Review Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* STEP 4: ORDER REVIEW */}
          <div className={`bg-white rounded-3xl border transition-all ${activeStep === 4 ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/10' : 'border-slate-200'}`}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  4
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900">Order Final Review</h3>
                  <p className="text-xs text-slate-500">Verify items and place your order</p>
                </div>
              </div>
            </div>

            {activeStep === 4 && (
              <div className="p-5 space-y-4">
                
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Delivery Address:</span>
                    <span className="font-bold text-slate-900 text-right max-w-xs">{selectedAddress.flat}, {selectedAddress.area}, {selectedAddress.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Delivery Time:</span>
                    <span className="font-bold text-emerald-800">{deliverySlot === 'express' ? 'Express 15-30 Mins' : 'Today 4:00 PM - 7:00 PM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Payment Method:</span>
                    <span className="font-bold text-slate-900 uppercase">{paymentMethod}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-emerald-950 font-heading font-extrabold text-base shadow-xl shadow-amber-400/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Place Order (Pay ₹{finalTotal})</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* RIGHT: DESKTOP PERSISTENT ORDER SUMMARY */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 border-b pb-3 flex justify-between items-center">
              <span>Order Summary</span>
              <span className="text-xs text-emerald-700 font-bold">{cartCount} items</span>
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="truncate">
                      <div className="font-bold text-slate-900 truncate">{product.name}</div>
                      <div className="text-[10px] text-slate-400">{quantity} x ₹{product.price}</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-800">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">₹{cartSubtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Savings</span>
                  <span className="font-mono">- ₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-mono">{deliveryFee === 0 ? <strong className="text-emerald-700 font-bold uppercase">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <span className="font-heading font-extrabold text-sm text-slate-900">Total Payable</span>
              <span className="font-heading font-black text-2xl text-emerald-900">₹{finalTotal}</span>
            </div>

          </div>
        </div>

      </div>

      {/* ADD NEW ADDRESS MODAL */}
      {showAddAddrModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-emerald-100 animate-pop-in space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-base text-slate-900">Add New Delivery Address</h3>
              <button onClick={() => setShowAddAddrModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAddress} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-700">Address Type</label>
                <div className="flex gap-2 mt-1">
                  {['Home', 'Work', 'Other'].map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => setNewAddr({ ...newAddr, type: t })}
                      className={`flex-1 py-2 rounded-xl border ${newAddr.type === t ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-700">Full Name</label>
                <input
                  type="text" required placeholder="Rahul Sharma"
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="text-slate-700">Mobile Phone</label>
                <input
                  type="text" required placeholder="+91 98765 43210"
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="text-slate-700">Flat / House / Building</label>
                <input
                  type="text" required placeholder="Flat 402, Green Valley"
                  value={newAddr.flat}
                  onChange={(e) => setNewAddr({ ...newAddr, flat: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="text-slate-700">Area / Street / Colony</label>
                <input
                  type="text" required placeholder="Main Street, Andheri West"
                  value={newAddr.area}
                  onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-700">City</label>
                  <input
                    type="text" required value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-700">Pincode</label>
                  <input
                    type="text" required value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl mt-2">
                Save Address & Select
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutPage;

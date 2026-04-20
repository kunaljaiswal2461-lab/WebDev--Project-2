import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaCreditCard, FaLock } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if(clearCart) clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-white mb-4">No items to checkout</h2>
            <button 
                onClick={() => navigate('/products')}
                className="bg-[#00ff41] text-black px-6 py-2 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all"
            >Return to Shop</button>
        </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-12">
        <h1 className="text-4xl font-black text-[#1a1a2e] mb-12 uppercase tracking-tighter">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Form */}
          <div className="lg:w-2/3">
              <form onSubmit={handlePlaceOrder} className="space-y-10">
                  
                  {/* Shipping Details */}
                  <div className="bg-white border border-[#e5e7eb] rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                      <h2 className="text-xl font-black text-[#1a1a2e] mb-8 uppercase tracking-tight flex items-center gap-3">
                          <span className="w-1.5 h-6 bg-[#00aaff] rounded-full"></span> 
                          Shipping Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">First Name</label>
                              <input required type="text" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all" />
                          </div>
                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">Last Name</label>
                              <input required type="text" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all" />
                          </div>
                          <div className="md:col-span-2 flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">Email Address</label>
                              <input required type="email" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all" />
                          </div>
                          <div className="md:col-span-2 flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">Full Shipping Address</label>
                              <input required type="text" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all" />
                          </div>
                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">City</label>
                              <input required type="text" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all" />
                          </div>
                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">Postal Code</label>
                              <input required type="text" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all" />
                          </div>
                      </div>
                  </div>

                  {/* Payment Details */}
                  <div className="bg-white border border-[#e5e7eb] rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00aaff]/5 rounded-bl-[5rem] flex items-center justify-center pointer-events-none">
                          <FaLock className="text-[#00aaff]/20" size={32} />
                      </div>
                      <h2 className="text-xl font-black text-[#1a1a2e] mb-8 uppercase tracking-tight flex items-center gap-3">
                          <span className="w-1.5 h-6 bg-[#6c5ce7] rounded-full"></span> 
                          Payment Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                          <div className="md:col-span-2 flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">Card Number</label>
                              <div className="relative">
                                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all" />
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 opacity-40" alt="Visa" />
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 opacity-40" alt="Mastercard" />
                                  </div>
                              </div>
                          </div>
                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">Expiry Date</label>
                              <input required type="text" placeholder="MM / YY" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all text-center" />
                          </div>
                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest ml-1">CVC / CVV</label>
                              <input required type="text" placeholder="3 Digits" className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl px-5 py-4 text-[#1a1a2e] font-bold focus:outline-none focus:border-[#00aaff] focus:bg-white focus:ring-4 focus:ring-[#00aaff]/5 transition-all text-center" />
                          </div>
                      </div>
                  </div>

                  <button type="submit" className="w-full bg-[#1a1a2e] text-white font-black py-6 rounded-[1.5rem] flex justify-center items-center gap-3 hover:bg-[#00aaff] hover:shadow-[0_25px_50px_rgba(0,170,255,0.3)] transition-all duration-500 text-sm uppercase tracking-[0.2em] transform hover:-translate-y-1">
                      <FaShieldAlt size={18} /> Complete Secure Purchase
                  </button>
              </form>
          </div>

          {/* Right: Summary */}
          <div className="lg:w-1/3">
              <div className="bg-white border border-[#e5e7eb] rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.05)] sticky top-28">
                  <h2 className="text-xl font-black text-[#1a1a2e] border-b border-[#e5e7eb] pb-6 mb-8 uppercase tracking-tight">Order Summary</h2>
                  
                  <div className="space-y-6 mb-10 max-h-[350px] overflow-y-auto pr-4 scrollbar-hide">
                      {cartItems.map(item => (
                          <div key={item.id} className="flex gap-5 group items-center">
                              <div className="w-20 h-20 bg-[#f8f9fa] border border-[#e5e7eb] rounded-2xl p-3 flex-shrink-0 group-hover:scale-105 transition-transform">
                                  <img src={item.thumbnail} className="w-full h-full object-contain mix-blend-multiply" alt={item.title} />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <h4 className="text-[#1a1a2e] text-sm font-black truncate mb-1">{item.title}</h4>
                                  <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest bg-[#f8f9fa] px-2 py-0.5 rounded-md">QTY: {item.quantity}</span>
                                      <p className="text-[#00aaff] font-black text-sm tracking-tight">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="border-t-2 border-dashed border-[#e5e7eb] pt-8 space-y-4">
                      <div className="flex justify-between text-[#6b7280] font-bold text-[10px] uppercase tracking-widest">
                          <span>Subtotal</span>
                          <span className="text-[#1a1a2e] tracking-tight">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#6b7280] font-bold text-[10px] uppercase tracking-widest">
                          <span>Sales Tax (10%)</span>
                          <span className="text-[#1a1a2e] tracking-tight">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#6b7280] font-bold text-[10px] uppercase tracking-widest">
                          <span>Global Shipping</span>
                          <span className="text-[#00aaff] font-black">LOCKED/FREE</span>
                      </div>
                      
                      <div className="border-t border-[#e5e7eb] mt-6 pt-8 flex justify-between items-center">
                          <span className="text-[#1a1a2e] font-black text-xs uppercase tracking-[0.2em]">Total Due</span>
                          <span className="text-4xl font-black text-[#1a1a2e] tracking-tighter">${total.toFixed(2)}</span>
                      </div>
                  </div>
                  
                  <div className="mt-10 bg-[#f8f9fa] rounded-2xl p-6 border border-[#e5e7eb] flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00aaff] shadow-sm">
                          <FaShieldAlt size={16} />
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-[#1a1a2e] uppercase tracking-widest mb-0.5">Secure Transaction</p>
                          <p className="text-[9px] text-[#6b7280] font-medium leading-tight">Your data is encrypted with military-grade 256-bit SSL protocols.</p>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
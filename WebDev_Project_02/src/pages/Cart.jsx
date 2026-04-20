import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArrowRight, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, increaseQty, decreaseQty, removeItem } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-12">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 bg-[#00aaff]/10 rounded-2xl flex items-center justify-center text-[#00aaff]">
              <FaShoppingCart size={24} />
           </div>
           <h1 className="text-3xl font-black text-[#1a1a2e] tracking-tight uppercase">Your Shopping Bag</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-[#f8f9fa] border-2 border-dashed border-[#e5e7eb] rounded-[3rem] p-24 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-xl">
               <FaShoppingCart size={36} className="text-[#ced4da]" />
            </div>
            <h2 className="text-3xl font-black text-[#1a1a2e] mb-4 tracking-tight">Your bag is empty</h2>
            <p className="text-[#6b7280] mb-10 font-medium max-w-xs mx-auto">Looks like you haven't discovered your next favorite thing yet.</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-[#1a1a2e] text-white px-12 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#00aaff] transition-all duration-300 shadow-xl"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
              {/* Left: Cart Items */}
              <div className="lg:w-2/3">
                  <div className="bg-white border border-[#e5e7eb] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden hidden md:block">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="bg-[#f8f9fa] border-b border-[#e5e7eb] text-[#1a1a2e] text-[10px] font-black uppercase tracking-[0.2em]">
                                  <th className="p-8">Product Details</th>
                                  <th className="p-8 text-center">Quantity</th>
                                  <th className="p-8 text-right">Subtotal</th>
                                  <th className="p-8 text-center"></th>
                              </tr>
                          </thead>
                          <tbody>
                              {cartItems.map((item) => (
                                  <tr key={item.id} className="border-b border-[#e5e7eb] hover:bg-[#f8f9fa]/50 transition-colors group">
                                      <td className="p-8">
                                          <div className="flex items-center gap-6">
                                              <div className="w-24 h-24 bg-[#f8f9fa] rounded-[1.5rem] p-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 border border-[#e5e7eb]">
                                                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                              </div>
                                              <div>
                                                  <p className="font-black text-[#1a1a2e] text-lg leading-tight mb-1">{item.title}</p>
                                                  <p className="text-[#00aaff] font-bold text-sm tracking-tight">${item.price}</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td className="p-8">
                                          <div className="flex items-center justify-center">
                                              <div className="flex items-center bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl p-1">
                                                  <button onClick={() => decreaseQty(item.id)} className="w-10 h-10 flex items-center justify-center text-[#1a1a2e] hover:bg-white hover:text-[#00aaff] rounded-lg transition-all font-black shadow-sm border border-transparent hover:border-[#e5e7eb]"><FaMinus size={10} /></button>
                                                  <span className="w-12 text-center text-[#1a1a2e] font-black">{item.quantity}</span>
                                                  <button onClick={() => increaseQty(item.id)} className="w-10 h-10 flex items-center justify-center text-[#1a1a2e] hover:bg-white hover:text-[#00aaff] rounded-lg transition-all font-black shadow-sm border border-transparent hover:border-[#e5e7eb]"><FaPlus size={10} /></button>
                                              </div>
                                          </div>
                                      </td>
                                      <td className="p-8 text-right font-black text-[#1a1a2e] text-lg tracking-tighter">
                                          ${(item.price * item.quantity).toFixed(2)}
                                      </td>
                                      <td className="p-8 text-center">
                                          <button onClick={() => removeItem(item.id)} className="text-[#ced4da] hover:text-red-500 hover:bg-red-50 p-3 rounded-full transition-all">
                                              <FaTrash size={16} />
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>

                  {/* Mobile Cart View */}
                  <div className="md:hidden space-y-6">
                      {cartItems.map((item) => (
                          <div key={item.id} className="bg-white border border-[#e5e7eb] rounded-[2rem] p-6 shadow-sm flex gap-6 relative group overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#f8f9fa] to-transparent pointer-events-none"></div>
                              <div className="w-24 h-24 bg-[#f8f9fa] rounded-2xl p-4 flex-shrink-0 border border-[#e5e7eb]">
                                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between">
                                  <div className="pr-10">
                                      <h3 className="font-black text-[#1a1a2e] text-lg leading-tight mb-1">{item.title}</h3>
                                      <p className="text-[#00aaff] font-bold tracking-tight">${item.price}</p>
                                  </div>
                                  <div className="flex items-center justify-between mt-4">
                                       <div className="flex items-center bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl p-0.5">
                                          <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-[#1a1a2e]"><FaMinus size={10} /></button>
                                          <span className="w-8 text-center text-[#1a1a2e] text-sm font-black">{item.quantity}</span>
                                          <button onClick={() => increaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-[#1a1a2e]"><FaPlus size={10} /></button>
                                      </div>
                                      <p className="font-black text-[#1a1a2e] tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                              </div>
                              <button onClick={() => removeItem(item.id)} className="absolute top-6 right-6 text-[#ced4da] hover:text-red-500">
                                  <FaTrash size={16} />
                              </button>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:w-1/3">
                  <div className="bg-white border-2 border-[#1a1a2e] rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.1)] sticky top-28">
                      <h2 className="text-xl font-black text-[#1a1a2e] border-b border-[#e5e7eb] pb-6 mb-8 uppercase tracking-tight">Order Summary</h2>
                      
                      <div className="space-y-4 mb-10">
                        <div className="flex justify-between text-[#6b7280] font-bold text-sm uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span className="text-[#1a1a2e] tracking-tight">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#6b7280] font-bold text-sm uppercase tracking-widest">
                            <span>Shipping Cost</span>
                            <span className="text-[#00aaff]">Free</span>
                        </div>
                      </div>
                      
                      <div className="border-t-2 border-dashed border-[#e5e7eb] pt-8 mb-10 flex justify-between items-center">
                          <span className="text-[#1a1a2e] font-black text-xs uppercase tracking-[0.2em]">Total Amount</span>
                          <span className="text-4xl font-black text-[#1a1a2e] tracking-tighter">${total.toFixed(2)}</span>
                      </div>

                      <button
                          onClick={() => navigate("/checkout")}
                          className="w-full bg-[#1a1a2e] text-white font-black py-5 rounded-[1.25rem] flex justify-center items-center gap-3 hover:bg-[#00aaff] hover:shadow-[0_20px_40px_rgba(0,170,255,0.3)] transition-all duration-500 uppercase tracking-widest text-xs transform hover:-translate-y-1"
                      >
                          Checkout Now <FaArrowRight />
                      </button>
                      
                      <div className="mt-8 flex items-center justify-center gap-4 border-t border-[#e5e7eb] pt-6 opacity-30 grayscale p-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="Paypal" />
                      </div>
                  </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
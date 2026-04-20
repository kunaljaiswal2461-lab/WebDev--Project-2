import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { FaHeart, FaShoppingCart, FaArrowLeft, FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const data = await getSingleProduct(id);
    setProduct(data);
    setLoading(false);
  };

  if (loading) {
     return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-[#f8f9fa]">
        <div className="w-16 h-16 border-4 border-[#e5e7eb] border-t-[#00aaff] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-[#1a1a2e] bg-[#f8f9fa]">
        <h2 className="text-xl font-bold">Product not found.</h2>
      </div>
    );
  }

  const isWishlisted = wishlistItems?.some(item => item.id === product.id) || false;

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    for(let i=0; i<qty; i++) {
        addToCart(product);
    }
  };

  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : (product.price * 1.2).toFixed(2);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-[#6b7280] hover:text-[#00aaff] transition-all mb-10 group w-max bg-[#f8f9fa] px-4 py-2 rounded-full border border-[#e5e7eb]"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>

        <div className="bg-white border border-[#e5e7eb] rounded-[2.5rem] p-6 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-16 relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f8f9fa] to-transparent pointer-events-none"></div>

          {/* Left: Image Section */}
          <div className="lg:w-1/2 flex flex-col gap-6 relative z-10">
              <div className="w-full bg-[#f8f9fa] rounded-[2rem] p-10 flex items-center justify-center relative overflow-hidden group border border-[#e5e7eb] aspect-square">
                  <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 relative z-10 mix-blend-multiply"
                  />
                  {/* Sale Badge */}
                  {product.discountPercentage > 0 && (
                    <span className="absolute top-8 left-8 z-20 bg-[#6c5ce7] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  )}
                  {/* Heart Icon Top Right */}
                  <button 
                      onClick={toggleWishlist}
                      className={`absolute top-8 right-8 z-20 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 bg-white shadow-xl border ${
                          isWishlisted 
                          ? 'text-[#6c5ce7] border-[#6c5ce7]/20 bg-[#6c5ce7]/5' 
                          : 'text-[#6b7280] border-[#e5e7eb] hover:text-[#00aaff] hover:border-[#00aaff]/30'
                      }`}
                  >
                      <FaHeart size={20} className={isWishlisted ? "fill-current scale-110 transition-transform" : ""} />
                  </button>
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {product.images.slice(0, 4).map((img, i) => (
                        <div key={i} className="aspect-square bg-[#f8f9fa] rounded-2xl p-3 border border-[#e5e7eb] hover:border-[#00aaff] hover:shadow-md transition-all cursor-pointer group flex items-center justify-center">
                            <img src={img} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" alt={`view ${i+1}`} />
                        </div>
                    ))}
                </div>
              )}
          </div>

          {/* Right: Info Section */}
          <div className="lg:w-1/2 flex flex-col relative z-10 py-4">
              {/* breadcrumb-style category */}
              <div className="mb-6 flex items-center gap-4">
                  <span className="text-[#00aaff] text-[11px] font-black uppercase tracking-[0.25em] bg-[#00aaff]/5 px-3 py-1 rounded-lg border border-[#00aaff]/10">
                      {product.category.replace("-", " ")}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={14} className={i < Math.round(product.rating || 4) ? "fill-current" : "text-gray-200"} />
                      ))}
                      <span className="text-xs text-[#6b7280] ml-2 font-black uppercase tracking-widest">{product.rating || '4.5'} RATING</span>
                  </div>
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-[#1a1a2e] mb-8 leading-[1.1] tracking-tight">
                  {product.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-10">
                 <p className="text-5xl text-[#1a1a2e] font-black tracking-tighter">
                    ${product.price}
                 </p>
                 {product.discountPercentage > 0 && (
                   <div className="flex flex-col">
                      <p className="text-xl text-[#6b7280] line-through font-bold opacity-40">
                          ${originalPrice}
                      </p>
                      <span className="text-[#6c5ce7] text-[10px] font-black uppercase tracking-wider">You save ${ (originalPrice - product.price).toFixed(2) }</span>
                   </div>
                 )}
              </div>
              
              <p className="text-lg text-[#6b7280] mb-12 leading-relaxed font-medium">
                  {product.description} This {product.category.replace("-", " ")} masterpiece is engineered for those who demand excellence in every detail.
              </p>

              <div className="flex flex-col gap-10 mb-12">
                  <div className="flex flex-col gap-4">
                      <span className="text-[11px] font-black text-[#1a1a2e] uppercase tracking-widest opacity-60">Select Quantity</span>
                      <div className="flex items-center bg-[#f8f9fa] border border-[#e5e7eb] rounded-2xl w-max p-1.5 focus-within:border-[#00aaff] transition-colors">
                          <button 
                              onClick={() => setQty(q => Math.max(1, q - 1))}
                              className="w-12 h-12 flex items-center justify-center text-[#1a1a2e] hover:bg-white hover:text-[#00aaff] rounded-xl transition-all font-black text-xl shadow-sm border border-transparent hover:border-[#e5e7eb]"
                          >-</button>
                          <span className="w-16 text-center text-[#1a1a2e] font-black text-lg">{qty}</span>
                          <button 
                              onClick={() => setQty(q => q + 1)}
                              className="w-12 h-12 flex items-center justify-center text-[#1a1a2e] hover:bg-white hover:text-[#00aaff] rounded-xl transition-all font-black text-xl shadow-sm border border-transparent hover:border-[#e5e7eb]"
                          >+</button>
                      </div>
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                  <button 
                      onClick={handleAddToCart}
                      className="flex-[2] bg-[#00aaff] text-white text-sm font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1a1a2e] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 transform hover:-translate-y-1"
                  >
                      <FaShoppingCart size={18} /> Add to Shopping Bag
                  </button>
                  <button 
                      onClick={toggleWishlist}
                      className={`flex-1 border-2 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-500 ${
                        isWishlisted 
                        ? 'border-[#6c5ce7] text-[#6c5ce7] bg-[#6c5ce7]/5' 
                        : 'border-[#e5e7eb] text-[#1a1a2e] hover:border-[#00aaff] hover:text-[#00aaff]'
                      }`}
                  >
                      <FaHeart size={18} className={isWishlisted ? "fill-current" : ""}/> {isWishlisted ? 'Saved' : 'Wishlist'}
                  </button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-[#e5e7eb] flex items-center gap-8">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center text-[#00aaff]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-[10px] font-black text-[#1a1a2e] uppercase tracking-wider">Free Shipping</span>
                  </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center text-[#00aaff]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                      </div>
                      <span className="text-[10px] font-black text-[#1a1a2e] uppercase tracking-wider">2 Year Warranty</span>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
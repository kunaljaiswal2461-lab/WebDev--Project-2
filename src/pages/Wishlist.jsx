import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import ProductCard from "../component/ProductCard";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-12">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-12 h-12 bg-[#6c5ce7]/10 rounded-2xl flex items-center justify-center text-[#6c5ce7]">
              <FaHeartBroken size={24} />
           </div>
           <h1 className="text-3xl font-black text-[#1a1a2e] tracking-tight uppercase">Saved for Later</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-[#f8f9fa] border-2 border-dashed border-[#e5e7eb] rounded-[3rem] p-24 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-xl">
                  <FaHeartBroken size={36} className="text-[#ced4da]" />
              </div>
              <h2 className="text-3xl font-black text-[#1a1a2e] mb-4 tracking-tight">Your wishlist is empty</h2>
              <p className="text-[#6b7280] mb-10 font-medium max-w-xs mx-auto">Save items you like and they will show up here for later purchase.</p>
              <button 
                  onClick={() => navigate('/products')}
                  className="bg-[#1a1a2e] text-white px-12 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#00aaff] transition-all duration-300 shadow-xl"
              >
                  Explore Collections
              </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {wishlistItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
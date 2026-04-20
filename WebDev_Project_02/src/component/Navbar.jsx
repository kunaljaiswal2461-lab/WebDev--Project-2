import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { FaShoppingCart, FaHeart, FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // total items count
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const trendingTags = ["iPhone 15", "Samsung S24", "MacBook Pro", "AirPods", "Smartwatches"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#e5e7eb] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-[1] flex items-center">
            <Link to="/products" className="text-3xl font-extrabold tracking-tight text-[#1a1a2e] flex items-center gap-1 group">
              <span className="bg-[#00aaff] text-white px-2 py-0.5 rounded-lg -rotate-2 group-hover:rotate-0 transition-transform">e</span>
              <span>Com<span className="text-[#00aaff]">max</span></span>
            </Link>
          </div>

          {/* Desktop Center: Search Bar */}
          <div className="hidden md:flex flex-[2] justify-center items-center px-4">
            <div className="relative w-full max-w-lg group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b7280] group-focus-within:text-[#00aaff] transition-colors">
                <FaSearch size={16} />
              </div>
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full bg-[#f8f9fa] border border-[#e5e7eb] text-[#1a1a2e] rounded-full pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#00aaff]/20 focus:border-[#00aaff] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          {/* Right side Icons */}
          <div className="hidden md:flex flex-[1] justify-end items-center space-x-5">
            <Link to="/wishlist" className="group relative p-2.5 rounded-full hover:bg-[#f8f9fa] transition-all border border-transparent hover:border-[#e5e7eb]">
              <FaHeart size={20} className="text-[#6b7280] group-hover:text-[#6c5ce7] transition-colors" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#6c5ce7] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="group relative p-2.5 rounded-full hover:bg-[#f8f9fa] transition-all border border-transparent hover:border-[#e5e7eb]">
              <FaShoppingCart size={20} className="text-[#6b7280] group-hover:text-[#00aaff] transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#00aaff] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-3 pl-2 ml-2 border-l border-[#e5e7eb]">
              <div className="w-10 h-10 rounded-full bg-[#f8f9fa] border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] hover:text-[#00aaff] hover:border-[#00aaff] cursor-pointer transition-all overflow-hidden">
                <FaUser size={18} />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-[#6b7280]">
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#00aaff] text-white text-[10px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full border border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1a1a2e] p-2 hover:bg-[#f8f9fa] rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Trending Strip (Desktop) */}
      <div className="hidden md:flex border-t border-[#e5e7eb] bg-[#fdfdfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-2 flex items-center gap-4">
          <span className="text-[10px] font-black text-[#1a1a2e] uppercase tracking-[0.15em] flex items-center gap-1.5 opacity-70">
            <span className="w-1.5 h-1.5 bg-[#00aaff] rounded-full animate-pulse"></span>
            Search Trending:
          </span>
          <div className="flex items-center gap-2">
            {trendingTags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-bold text-[#6b7280] hover:text-[#00aaff] px-3 py-1 rounded-full cursor-pointer transition-all border border-[#e5e7eb] bg-white hover:border-[#00aaff] hover:shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e7eb] shadow-xl animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-8 space-y-4">
            <div className="relative w-full">
              <FaSearch size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#f8f9fa] border border-[#e5e7eb] text-[#1a1a2e] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00aaff] text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
               <Link
                to="/products"
                className="flex items-center justify-center h-12 rounded-xl text-sm font-bold border border-[#e5e7eb] text-[#1a1a2e] hover:bg-[#f8f9fa]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center justify-center h-12 rounded-xl text-sm font-bold border border-[#e5e7eb] text-[#1a1a2e] hover:bg-[#f8f9fa]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
            </div>
            <div className="pt-2">
              <span className="text-[10px] font-black text-[#1a1a2e] uppercase tracking-wider block mb-3 opacity-60">Trending Searches:</span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-bold text-[#6b7280] bg-[#f8f9fa] px-3 py-1.5 rounded-full border border-[#e5e7eb]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlistItems?.some(item => item.id === product.id) || false;

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Mock original price if discountPercentage exists, otherwise just show a slightly higher price for demo
  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : (product.price * 1.2).toFixed(2);

  return (
    <div 
      onClick={() => navigate(`/products/${product.id}`)}
      className="group relative bg-white border border-[#e5e7eb] rounded-2xl p-3 transition-all duration-300 cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 flex flex-col h-full"
    >
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm border border-[#e5e7eb] ${
          isWishlisted 
            ? "text-[#6c5ce7] border-[#6c5ce7]/30 bg-[#6c5ce7]/5" 
            : "text-[#6b7280] hover:text-[#00aaff] hover:border-[#00aaff]/30 hover:bg-[#00aaff]/5"
        }`}
      >
        <FaHeart size={15} className={isWishlisted ? "fill-current" : ""}/>
      </button>

      {/* Sale Badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#6c5ce7] text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
            -{Math.round(product.discountPercentage)}% OFF
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="w-full h-48 bg-[#f8f9fa] rounded-xl mb-4 overflow-hidden flex items-center justify-center p-6 mix-blend-multiply">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col px-1">
        <div className="mb-3">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={10} className={i < Math.round(product.rating || 4) ? "fill-current" : "text-gray-200"} />
              ))}
            </div>
            <span className="text-[10px] font-bold text-[#6b7280] ml-1">{product.rating || 4.0}</span>
          </div>

          <h2 className="text-[14px] font-bold text-[#1a1a2e] line-clamp-2 mb-1 group-hover:text-[#00aaff] transition-colors leading-snug">
            {product.title}
          </h2>
          <p className="text-[12px] text-[#6b7280] line-clamp-1 opacity-80">
            {product.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-[#00aaff] font-extrabold text-lg tracking-tight">
              ${product.price}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-[#6b7280] text-xs line-through opacity-60 font-medium">
                ${originalPrice}
              </p>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full h-11 flex items-center justify-center gap-2 bg-[#00aaff] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-[#00aaff]/90 hover:shadow-[0_8px_20px_rgba(0,170,255,0.3)] active:scale-95"
          >
            <FaShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
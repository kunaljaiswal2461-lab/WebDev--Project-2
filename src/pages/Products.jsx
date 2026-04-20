import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";
import ProductCard from "../component/ProductCard";
import { FaSearch, FaSlidersH, FaSortAmountDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdPhoneIphone, MdComputer, MdGamepad, MdCameraAlt, MdWatch, MdAir } from "react-icons/md";
import { BsHeadphones } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data?.products || []);
    } catch (error) {
      console.log("Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-[#f8f9fa]">
        <div className="w-16 h-16 border-4 border-[#e5e7eb] border-t-[#00aaff] rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || item.category === category;
    const matchPrice = item.price <= maxPrice;
    return matchSearch && matchCategory && matchPrice;
  });

  let sortedProducts = [...filteredProducts];
  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const categoryIcons = {
    "smartphones": <MdPhoneIphone size={24} />,
    "laptops": <MdComputer size={24} />,
    "tablets": <FiMonitor size={24} />,
    "audio": <BsHeadphones size={24} />,
    "cameras": <MdCameraAlt size={24} />,
    "gaming": <MdGamepad size={24} />,
    "wearables": <MdWatch size={24} />,
    "drones": <MdAir size={24} />
  };

  const dbCategories = [...new Set(products.map((p) => p.category))];
  const allCategories = ["all", ...dbCategories];

  const getCategoryIcon = (catName) => {
    return categoryIcons[catName.toLowerCase()] || <MdPhoneIphone size={24} />;
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-12">
        
        {/* Conditional Hero/Promo Section */}
        {category === "all" && search === "" && (
          <div className="flex flex-col lg:flex-row gap-6 mb-16">
            {/* Main Featured Banner */}
            <div className="lg:w-[65%] bg-[#f8f9fa] rounded-3xl p-10 md:p-16 flex flex-col justify-center relative overflow-hidden border border-[#e5e7eb] group">
              <div className="absolute right-[-10%] bottom-[-20%] w-[70%] h-[150%] bg-gradient-to-l from-[#00aaff]/10 to-transparent rounded-full blur-3xl mix-blend-multiply transition-transform group-hover:scale-110 duration-1000"></div>
              <div className="relative z-10 max-w-lg">
                <span className="inline-flex items-center gap-2 text-[#00aaff] font-black text-[11px] tracking-[0.2em] uppercase mb-5 bg-[#00aaff]/5 px-3 py-1 rounded-full border border-[#00aaff]/10">
                  <span className="w-2 h-2 bg-[#00aaff] rounded-full animate-pulse"></span>
                  Exclusive Offer
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] mb-6 leading-[1.1] tracking-tight">
                  Premium <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a2e] to-[#00aaff]">Tech Gadgets</span>
                </h1>
                <p className="text-[#6b7280] mb-10 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
                  Elevate your lifestyle with our curated collection of high-end electronics.
                </p>
                <button className="bg-[#00aaff] text-white px-10 py-4 rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-[#1a1a2e] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-all duration-500 transform hover:-translate-y-1">
                  Explore Now
                </button>
              </div>
            </div>
            
            {/* Side Promo Cards */}
            <div className="lg:w-[35%] flex flex-col gap-6">
              <div className="flex-1 bg-white border border-[#e5e7eb] rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end min-h-[220px] transition-all hover:border-[#6c5ce7]/30 hover:shadow-xl">
                <span className="absolute top-6 right-6 bg-[#6c5ce7] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider z-10 shadow-sm">
                  New Arrival
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-[#1a1a2e] mb-2">Smart Watches</h3>
                  <p className="text-[#6c5ce7] font-bold text-sm tracking-wide">From $249 — Series 8</p>
                </div>
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[100%] bg-gradient-to-bl from-[#6c5ce7]/5 to-transparent rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
              </div>
              
              <div className="flex-1 bg-white border border-[#e5e7eb] rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end min-h-[220px] transition-all hover:border-[#00aaff]/30 hover:shadow-xl">
                 <span className="absolute top-6 right-6 bg-[#00aaff] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider z-10 shadow-sm">
                  Trending
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-[#1a1a2e] mb-2">Audio Pro</h3>
                  <p className="text-[#00aaff] font-bold text-sm tracking-wide">Noise Cancelling — 20% OFF</p>
                </div>
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[100%] bg-gradient-to-bl from-[#00aaff]/5 to-transparent rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
              </div>
            </div>
          </div>
        )}

        {/* Category Strip */}
        <div className="mb-16 relative">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-xs font-black text-[#1a1a2e] uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00aaff] rounded-full"></span> 
                Shop by Categories
             </h2>
             <div className="flex gap-2">
               <button className="w-10 h-10 flex items-center justify-center border border-[#e5e7eb] rounded-full text-[#6b7280] hover:bg-white hover:text-[#00aaff] hover:border-[#00aaff] transition-all shadow-sm"><FaChevronLeft size={12}/></button>
               <button className="w-10 h-10 flex items-center justify-center border border-[#e5e7eb] rounded-full text-[#6b7280] hover:bg-white hover:text-[#00aaff] hover:border-[#00aaff] transition-all shadow-sm"><FaChevronRight size={12}/></button>
             </div>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide py-2">
            {allCategories.map((cat, index) => (
              <div 
                key={index}
                onClick={() => setCategory(cat)}
                className="flex flex-col items-center gap-4 cursor-pointer min-w-[110px] group"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm border-2 ${
                  category === cat 
                    ? "bg-[#00aaff] text-white border-[#00aaff] shadow-[0_10px_25px_rgba(0,170,255,0.3)] scale-110" 
                    : "bg-white text-[#6b7280] border-transparent hover:border-[#00aaff]/30 hover:shadow-xl hover:-translate-y-1"
                }`}>
                  {cat === 'all' ? <FaSlidersH size={24} /> : getCategoryIcon(cat)}
                </div>
                <span className={`text-[12px] font-bold capitalize tracking-wide transition-colors ${category === cat ? 'text-[#00aaff]' : 'text-[#1a1a2e] group-hover:text-[#00aaff]'}`}>
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-[2rem] p-4 md:p-6 mb-12">
          <div className="flex flex-col xl:flex-row gap-6 items-center">
            
            {/* Search Input */}
            <div className="relative w-full xl:w-1/3 group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#6b7280] group-focus-within:text-[#00aaff] transition-colors">
                <FaSearch size={14} />
              </div>
              <input
                type="text"
                placeholder="Find your gear..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#e5e7eb] rounded-2xl pl-12 pr-6 py-4 text-[#1a1a2e] text-sm font-medium focus:outline-none focus:border-[#00aaff] focus:ring-4 focus:ring-[#00aaff]/5 transition-all shadow-sm"
              />
            </div>

            <div className="w-full xl:flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Max Price */}
              <div className="bg-white border border-[#e5e7eb] rounded-2xl p-4 px-6 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest">Price Range</span>
                  <span className="text-[#00aaff] font-black text-sm">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f1f3f5] rounded-lg appearance-none cursor-pointer accent-[#00aaff]"
                />
              </div>

              {/* Sort By */}
              <div className="relative group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b7280] z-10 pointer-events-none group-focus-within:text-[#00aaff] transition-colors">
                    <FaSortAmountDown size={14}/>
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-white border border-[#e5e7eb] rounded-2xl pl-12 pr-10 py-4 text-[#1a1a2e] text-sm font-bold appearance-none focus:outline-none focus:border-[#00aaff] focus:ring-4 focus:ring-[#00aaff]/5 transition-all shadow-sm cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231a1a2e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 1.25rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.2em 1.2em` }}
                >
                  <option value="default">Sort: Default</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading for Grid */}
        <div className="mb-8 flex justify-between items-end border-b border-[#e5e7eb] pb-6">
           <h2 className="text-2xl font-black text-[#1a1a2e] uppercase tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#6c5ce7] inline-block rounded-full"></span> 
              Top Smartphone Trends
           </h2>
           <span className="text-[#6b7280] text-xs font-black uppercase tracking-widest bg-[#f8f9fa] px-3 py-1.5 rounded-lg border border-[#e5e7eb]">{sortedProducts.length} Results</span>
        </div>

        {/* Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center bg-white border-2 border-dashed border-[#e5e7eb] rounded-[3rem] p-24">
            <div className="w-20 h-20 bg-[#f8f9fa] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch size={24} className="text-[#ced4da]" />
            </div>
            <p className="text-[#1a1a2e] text-2xl font-black mb-2 tracking-tight">No gear found</p>
            <p className="text-[#6b7280] text-sm font-medium mb-8 max-w-xs mx-auto">Try adjusting your filters to find what you're looking for.</p>
            <button 
              onClick={() => {setSearch(''); setCategory('all'); setMaxPrice(2000); setSort('default');}}
              className="bg-[#1a1a2e] text-white px-10 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#00aaff] transition-all duration-300 shadow-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

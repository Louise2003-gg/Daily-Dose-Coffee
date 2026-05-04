import { useState, useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal";
import bgImage from "../assets/background.png";
import { useCart } from "../context/CartContext";

const SIZES = ["16oz", "22oz"];
const MILKS = ["Fresh Milk", "Full Cream Milk"];

// Price per size per category
const SIZE_PRICE = {
  iced:    { "16oz": "₱49", "22oz": "₱79" },
  non:     { "16oz": "₱49", "22oz": "₱79" },
  soda:    { "16oz": "₱49", "22oz": "₱79" },
  dessert: { "16oz": "₱49", "22oz": "₱79" },
};

function CoffeeCard({ item, activeCategory }) {
  const [size, setSize]   = useState("16oz");
  const [milk, setMilk]   = useState("Fresh Milk");
  const [added, setAdded] = useState(false);
  const { addToCart }     = useCart();

  const showMilk     = activeCategory === "iced" || activeCategory === "non";
  const isDesert     = activeCategory === "dessert";
  const displayPrice = isDesert
    ? item.price
    : (SIZE_PRICE[activeCategory]?.[size] ?? SIZE_PRICE.iced[size]);

  const ingredients = [
    {
      label: item.tag ?? "Signature",
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      label: "Premium Blend",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611A48.309 48.309 0 0012 21a48.25 48.25 0 008.135-.687c1.718-.293 2.3-2.379 1.067-3.61L19.8 15.3M5 14.5h14.8" />
        </svg>
      ),
    },
    {
      label: "Fresh Milk",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer" style={{ height: "480px", minHeight: "420px" }}>
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />

      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">

        {/* TOP: tag + price */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-2.5 py-1">
            <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              {item.tag ?? "Signature"}
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-right">
            <p className="text-amber-400 font-bold text-lg sm:text-xl leading-none">{displayPrice}</p>
            <p className="text-white/70 text-xs mt-0.5">{isDesert ? "per piece" : size}</p>
          </div>
        </div>

        {/* MIDDLE: name + desc + ingredients */}
        <div>
          <h3 className="font-playfair text-white text-2xl sm:text-3xl leading-tight mb-1">{item.name}</h3>
          <p className="text-white/55 text-xs leading-relaxed mb-3 max-w-[200px]">
            {isDesert
              ? "Freshly baked in-house. Crispy on the outside, soft on the inside."
              : "Brewed fresh to order using premium beans and your choice of milk."}
          </p>
          <div className="flex flex-col gap-1.5">
            {ingredients.map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                  {icon}
                </div>
                <span className="text-white/75 text-xs font-medium uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: customize + add to cart */}
        <div>
          {!isDesert && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 mb-3">
              <p className="text-white/45 text-xs tracking-widest uppercase mb-2">Customize</p>
              <div className="flex flex-col gap-2.5">
                {/* Size selector */}
                <div className="flex items-center gap-2">
                  <span className="text-white/65 text-xs w-10 flex-shrink-0">Size</span>
                  <div className="flex gap-1.5 flex-1">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all duration-150
                          ${size === s
                            ? "bg-[#b8860b] text-white"
                            : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Milk selector */}
                {showMilk && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/65 text-xs w-10 flex-shrink-0">Milk</span>
                    <div className="flex gap-1.5 flex-1">
                      {MILKS.map((m) => (
                        <button
                          key={m}
                          onClick={() => setMilk(m)}
                          className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all duration-150 leading-tight px-1
                            ${milk === m
                              ? "bg-[#b8860b] text-white"
                              : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              addToCart({
                ...item,
                size:  isDesert ? null : size,
                milk:  showMilk ? milk : null,
                price: displayPrice,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            className={`w-full backdrop-blur-sm transition-all duration-300 text-white font-bold text-sm py-3 rounded-2xl flex items-center justify-center gap-2 border border-white/20
              ${added ? "bg-green-600/80" : "bg-[#c8a97e]/70 hover:bg-[#b8860b]"}`}
          >
            {added ? (
              <>
                Added!
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </>
            ) : (
              <>
                ADD TO CART
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductSection({ items, activeCategory }) {
  const [page, setPage]       = useState(0);
  const [animating, setAnim]  = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef            = useRef(null);

  // Responsive perPage: 1 on mobile, 2 on sm, 3 on md+
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640)       setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else                               setPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(items.length / perPage);

  useEffect(() => {
    setPage(0);
  }, [activeCategory, perPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect    = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowH) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffsetY(progress * 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changePage = (dir) => {
    if (animating) return;
    const next = dir === "next"
      ? Math.min(page + 1, totalPages - 1)
      : Math.max(page - 1, 0);
    if (next === page) return;
    setAnim(true);
    setTimeout(() => { setPage(next); setAnim(false); }, 300);
  };

  const visible = items.slice(page * perPage, page * perPage + perPage);

  const categoryLabel = {
    iced: "Iced Coffee", non: "Non-Coffee", soda: "Soda", dessert: "Dessert",
  }[activeCategory] ?? "Our Menu";

  const [headerRef, headerVisible] = useReveal(0.1);

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 px-4 sm:px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src={bgImage} alt=""
          className="absolute inset-0 w-full object-cover"
          style={{ height: "140%", top: "-20%", transform: `translateY(${offsetY}px)`, willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 sm:mb-10 px-2 sm:px-4 gap-3">
          <div>
            <p className={`text-[#b8860b] text-sm font-semibold tracking-widest uppercase mb-2 ${headerVisible ? "reveal-up" : "opacity-0"}`}
              style={{ animationDelay: "0.05s" }}>Our Menu</p>
            <h2 className={`font-lobster text-white text-4xl sm:text-5xl leading-tight ${headerVisible ? "reveal-up" : "opacity-0"}`}
              style={{ animationDelay: "0.15s" }}>
              {categoryLabel}<br />Selection
            </h2>
          </div>
          <p className={`text-white/60 text-sm max-w-xs sm:text-right leading-relaxed sm:mt-2 ${headerVisible ? "reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.25s" }}>
            Discover our handcrafted drinks, each made with the finest ingredients and crafted to perfection.
          </p>
        </div>

        {/* Cards grid — responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4">
          {visible.map((item, i) => (
            <div key={`${activeCategory}-${page}-${i}`} className="card-enter" style={{ animationDelay: `${i * 0.1}s` }}>
              <CoffeeCard item={item} activeCategory={activeCategory} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8 sm:mt-10">
          <button onClick={() => changePage("prev")} disabled={page === 0}
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${page === 0 ? "border-white/20 text-white/20 cursor-not-allowed" : "border-white/60 text-white hover:border-[#b8860b] hover:text-[#b8860b]"}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-[#b8860b]" : "w-2 bg-white/30"}`} />
            ))}
          </div>
          <button onClick={() => changePage("next")} disabled={page === totalPages - 1}
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${page === totalPages - 1 ? "border-white/20 text-white/20 cursor-not-allowed" : "bg-[#b8860b] border-[#b8860b] text-white hover:bg-yellow-600"}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

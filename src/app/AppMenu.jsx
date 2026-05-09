import { useState } from "react";
import { useCart } from "../context/CartContext";
import { coffeeItems, nonCoffeeItems, sodaItems, dessertItems } from "../data/menuData";

const CATEGORIES = [
  { key: "all",     label: "All",         emoji: "✨" },
  { key: "iced",    label: "Iced Coffee", emoji: "☕" },
  { key: "non",     label: "Non-Coffee",  emoji: "🧋" },
  { key: "soda",    label: "Soda",        emoji: "🥤" },
  { key: "dessert", label: "Desserts",    emoji: "🍪" },
];

const ALL_ITEMS = {
  all:     [...coffeeItems, ...nonCoffeeItems, ...sodaItems, ...dessertItems],
  iced:    coffeeItems,
  non:     nonCoffeeItems,
  soda:    sodaItems,
  dessert: dessertItems,
};

const SIZES  = ["16oz", "22oz"];
const MILKS  = ["Fresh Milk", "Full Cream Milk"];
const PRICES = { "16oz": "₱49", "22oz": "₱79" };

function MenuItemCard({ item, category }) {
  const { addToCart }           = useCart();
  const [size, setSize]         = useState("16oz");
  const [milk, setMilk]         = useState("Fresh Milk");
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded]       = useState(false);
  const [pressed, setPressed]   = useState(false);

  const isDesert  = category === "dessert";
  const showMilk  = category === "iced" || category === "non" || category === "all";
  const price     = isDesert ? item.price : PRICES[size];

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart({ ...item, size: isDesert ? null : size, milk: showMilk ? milk : null, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.1s ease",
      }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={() => !isDesert && setExpanded(!expanded)}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        {item.tag && (
          <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#b8860b] text-white px-2 py-0.5 rounded-full">
            {item.tag}
          </span>
        )}
        <div className="absolute top-2 right-2 rounded-xl px-2 py-1 text-right"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
          <p className="text-amber-400 font-bold text-sm leading-none">{price}</p>
          <p className="text-white/50 text-[9px] mt-0.5">{isDesert ? "per piece" : size}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-white font-semibold text-sm leading-tight">{item.name}</p>
        <p className="text-white/40 text-[10px] mt-0.5 leading-relaxed">
          {isDesert ? "Freshly baked in-house." : "Brewed fresh to order."}
        </p>

        {/* Expanded customize */}
        {expanded && !isDesert && (
          <div className="mt-3 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={(e) => e.stopPropagation()}>
            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-2">Customize</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-[10px] w-8 flex-shrink-0">Size</span>
                <div className="flex gap-1.5 flex-1">
                  {SIZES.map((s) => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors
                        ${size === s ? "bg-[#b8860b] text-white" : "bg-white/10 text-white/50"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {showMilk && (
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-[10px] w-8 flex-shrink-0">Milk</span>
                  <div className="flex gap-1.5 flex-1">
                    {MILKS.map((m) => (
                      <button key={m} onClick={() => setMilk(m)}
                        className={`flex-1 py-1 rounded-lg text-[10px] font-semibold transition-colors leading-tight px-1
                          ${milk === m ? "bg-[#b8860b] text-white" : "bg-white/10 text-white/50"}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add to cart */}
        <button onClick={handleAdd}
          className={`w-full mt-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200
            ${added ? "bg-green-600/80 text-white" : "bg-[#b8860b] text-white"}`}>
          {added ? (
            <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> Added!</>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function AppMenu() {
  const [active, setActive]   = useState("all");
  const [search, setSearch]   = useState("");

  const items = (ALL_ITEMS[active] ?? ALL_ITEMS.all).filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d0b08]">

      {/* Header */}
      <div className="sticky top-0 z-10 px-4 pt-14 pb-3"
        style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(20px)" }}>
        <h1 className="font-playfair text-white text-2xl mb-3">Our Menu</h1>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drinks..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25" />
          {search && (
            <button onClick={() => setSearch("")} className="text-white/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(({ key, label, emoji }) => (
            <button key={key} onClick={() => setActive(key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                ${active === key
                  ? "bg-[#b8860b] text-white shadow-lg shadow-[#b8860b]/25"
                  : "text-white/55 border border-white/10"}`}
              style={active !== key ? { background: "rgba(255,255,255,0.05)" } : {}}>
              <span>{emoji}</span>{label}
              <span className={`text-[9px] rounded-full px-1.5 py-0.5 ${active === key ? "bg-white/20" : "bg-white/10 text-white/40"}`}>
                {ALL_ITEMS[key].length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 pt-3 pb-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white/50 text-sm">No drinks found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => (
              <MenuItemCard key={`${active}-${i}`} item={item} category={active} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

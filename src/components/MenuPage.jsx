import { useState } from "react";
import Navbar from "./Navbar";
import { coffeeItems, nonCoffeeItems, sodaItems, dessertItems } from "../data/menuData";
import { useCart } from "../context/CartContext";
import icedCoffeeIcon from "../assets/Ice-coffee svg.svg";
import dessertIcon from "../assets/Dessert.svg";
import bgImage from "../assets/background.png";

const SIZES = ["16oz", "22oz"];
const MILKS = ["Fresh Milk", "Full Cream Milk"];
const SIZE_PRICE = { "16oz": "₱49", "22oz": "₱79" };

const allCategories = [
  {
    key: "all",
    label: "All",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    key: "iced",
    label: "Iced Coffee",
    icon: <img src={icedCoffeeIcon} alt="Iced Coffee" className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert" />,
  },
  {
    key: "non",
    label: "Non-Coffee",
    icon: (
      <div className="relative w-4 h-4 sm:w-5 sm:h-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1.5 9a2 2 0 01-2 1.5h-5A2 2 0 017.5 17L6 8z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a2 2 0 010 4h-1" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5">
          <circle cx="12" cy="12" r="10" />
          <line x1="5" y1="5" x2="19" y2="19" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    key: "soda",
    label: "Soda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 sm:w-5 sm:h-5">
        <rect x="7" y="4" width="10" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 4V2M14 4V2" />
        <circle cx="10" cy="11" r="1" fill="currentColor" />
        <circle cx="14" cy="9" r="1" fill="currentColor" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "dessert",
    label: "Dessert",
    icon: <img src={dessertIcon} alt="Dessert" className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert" />,
  },
];

const categoryItems = {
  all:     [...coffeeItems, ...nonCoffeeItems, ...dessertItems],
  iced:    coffeeItems,
  non:     nonCoffeeItems,
  soda:    sodaItems,
  dessert: dessertItems,
};

const categoryColors = {
  all:     "from-[#2a1f0e] to-[#1a1208]",
  iced:    "from-[#0e1a2a] to-[#081018]",
  non:     "from-[#0e2a1a] to-[#081808]",
  soda:    "from-[#1a0e2a] to-[#100818]",
  dessert: "from-[#2a1a0e] to-[#180e08]",
};

function MenuCard({ item, index, category }) {
  const [size, setSize]         = useState("16oz");
  const [milk, setMilk]         = useState("Fresh Milk");
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded]       = useState(false);
  const { addToCart }           = useCart();

  const showMilk     = category === "iced" || category === "non" || category === "all";
  const isDesert     = category === "dessert";
  const displayPrice = isDesert ? item.price : SIZE_PRICE[size];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...item, size: isDesert ? null : size, milk: showMilk ? milk : null, price: displayPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="menu-card-in relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ animationDelay: `${(index % 4) * 0.08}s`, minHeight: expanded ? "auto" : "280px", height: expanded ? "auto" : "280px" }}
      onClick={() => setExpanded(!expanded)}
    >
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4">
        {/* Top */}
        <div className="flex items-start justify-between">
          {item.tag && (
            <span className="bg-[#b8860b]/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {item.tag}
            </span>
          )}
          <div className="ml-auto bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-2.5 py-1.5 text-right">
            <p className="text-amber-400 font-bold text-sm sm:text-base leading-none">{displayPrice}</p>
            <p className="text-white/70 text-xs">{isDesert ? "per piece" : size}</p>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <h3 className="font-playfair text-white text-xl sm:text-2xl leading-tight mb-1">{item.name}</h3>
          <p className="text-white/55 text-xs mb-3 leading-relaxed">
            Made with quality ingredients, crafted fresh for every order.
          </p>

          {expanded && !isDesert && (
            <div
              className="menu-card-in bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 mb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/50 text-xs tracking-widest uppercase mb-2">Customize</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs w-10 flex-shrink-0">Size</span>
                  <div className="flex gap-1 flex-1">
                    {SIZES.map((s) => (
                      <button key={s} onClick={() => setSize(s)}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all duration-150
                          ${size === s ? "bg-[#b8860b] text-white" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                {showMilk && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-xs w-10 flex-shrink-0">Milk</span>
                    <div className="flex gap-1 flex-1">
                      {MILKS.map((m) => (
                        <button key={m} onClick={() => setMilk(m)}
                          className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all duration-150 px-1 leading-tight
                            ${milk === m ? "bg-[#b8860b] text-white" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}>
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
            onClick={handleAddToCart}
            className={`w-full backdrop-blur-sm transition-all duration-200 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 border border-white/10
              ${added ? "bg-green-600/80" : "bg-[#b8860b]/80 hover:bg-[#b8860b]"}`}
          >
            {added ? (
              <>Added! <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></>
            ) : (
              <>ADD TO CART <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage({ onNavigate }) {
  const [active, setActive]           = useState("all");
  const [displayed, setDisplayed]     = useState("all");
  const [gridVisible, setGridVisible] = useState(true);

  const handleCategoryClick = (key) => {
    if (key === active) return;
    setGridVisible(false);
    setTimeout(() => {
      setActive(key);
      setDisplayed(key);
      setGridVisible(true);
    }, 250);
  };

  const items = categoryItems[displayed] ?? [];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${categoryColors[active]} transition-all duration-700 page-fade-in`}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/80" />
      </div>

      <div className="relative z-20 border-b border-white/10">
        <Navbar onNavigate={onNavigate} currentPage="menu" />
      </div>

      {/* Page header */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-28 sm:pt-36 pb-6 sm:pb-8">
        <p className="text-[#b8860b] text-sm font-semibold tracking-widest uppercase mb-2">
          Explore Our Drinks
        </p>
        <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-2">
          Our Full Menu
        </h1>
        <p className="text-white/50 text-sm max-w-md leading-relaxed">
          From bold iced coffees to refreshing non-coffee drinks and sweet desserts — there's something for everyone.
        </p>
      </div>

      {/* Category filter tabs — scrollable on mobile */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 mb-8 sm:mb-10">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allCategories.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold
                border transition-all duration-200 flex-shrink-0
                ${active === key
                  ? "bg-[#b8860b] border-[#b8860b] text-white shadow-lg shadow-[#b8860b]/30 scale-105"
                  : "bg-white/8 border-white/20 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/40"
                }`}
            >
              {icon}
              {label}
              <span className={`text-xs rounded-full px-1.5 py-0.5
                ${active === key ? "bg-white/20 text-white" : "bg-white/10 text-white/50"}`}>
                {categoryItems[key].length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pb-16 sm:pb-20"
        style={{
          opacity:    gridVisible ? 1 : 0,
          transform:  gridVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/40 text-xs tracking-widest uppercase whitespace-nowrap">
            {allCategories.find((c) => c.key === displayed)?.label} — {items.length} drinks
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Responsive grid: 1 col mobile, 2 col sm, 3 col md, 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <MenuCard key={`${displayed}-${i}`} item={item} index={i} category={displayed} />
          ))}
        </div>
      </div>
    </div>
  );
}

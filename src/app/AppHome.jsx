import { useState } from "react";
import Logo from "../Logo";
import { useCart } from "../context/CartContext";
import { coffeeItems, nonCoffeeItems, sodaItems, dessertItems } from "../data/menuData";
import baristaBg from "../assets/Barista-at-night.png";
import bgImage    from "../assets/background.png";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", emoji: "☀️" };
  if (h < 17) return { text: "Good afternoon", emoji: "☕" };
  return { text: "Good evening", emoji: "🌙" };
};

const BANNERS = [
  { img: baristaBg, title: "Crafted Fresh Daily",  sub: "Premium drinks made to order" },
  { img: baristaBg, title: "Mon–Fri · 6PM–12AM",   sub: "Gingoog City, Philippines" },
  { img: baristaBg, title: "New Arrivals",          sub: "Try our latest seasonal drinks" },
];

function MiniCard({ item, isDesert, onAdd }) {
  const [added, setAdded]     = useState(false);
  const [pressed, setPressed] = useState(false);
  const { addToCart }         = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart({ ...item, size: isDesert ? null : "16oz", milk: null, price: item.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="flex-shrink-0 w-32 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        transform: pressed ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.1s ease",
      }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      <div className="relative h-24 overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {item.tag && (
          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-[#b8860b] text-white px-1.5 py-0.5 rounded-full">
            {item.tag}
          </span>
        )}
      </div>
      <div className="p-2">
        <p className="text-white text-[11px] font-semibold leading-tight truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-amber-400 font-bold text-[11px]">{item.price}</p>
          <button onClick={handleAdd}
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${added ? "bg-green-500" : "bg-[#b8860b]"}`}>
            {added
              ? <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              : <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

function HomeSection({ title, emoji, items, isDesert, onSeeAll }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between px-4 mb-2.5">
        <p className="text-white font-semibold text-sm">{emoji} {title}</p>
        <button onClick={onSeeAll} className="text-[#b8860b] text-xs font-medium">See all</button>
      </div>
      <div className="flex gap-2.5 overflow-x-auto px-4 pb-1 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
        {items.map((item, i) => (
          <div key={i} style={{ scrollSnapAlign: "start" }}>
            <MiniCard item={item} isDesert={isDesert} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppHome({ onNavigate }) {
  const { totalItems }          = useCart();
  const [banner, setBanner]     = useState(0);
  const greeting                = getGreeting();

  return (
    <div className="min-h-screen bg-[#0d0b08]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.08) 0%, transparent 60%)" }} className="absolute inset-0" />
      </div>

      {/* ── Top bar ── */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-14 pb-4 sticky top-0"
        style={{ background: "rgba(13,11,8,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <Logo width={38} height={42} />
          <div>
            <p className="text-white/40 text-[11px]">{greeting.text} {greeting.emoji}</p>
            <p className="text-white font-semibold text-sm leading-tight">Daily Dose Coffee</p>
          </div>
        </div>
        <button onClick={() => onNavigate("cart")} className="relative w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.3)" }}>
          <svg className="w-4 h-4 text-[#b8860b]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#b8860b] text-white text-[9px] font-bold flex items-center justify-center">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="relative z-10 overflow-y-auto">

        {/* Hero banner */}
        <div className="relative mx-4 mt-3 mb-4 rounded-2xl overflow-hidden" style={{ height: "180px" }}>
          <img src={BANNERS[banner].img} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b8860b]/50 to-transparent" />
          <div className="absolute bottom-3 left-4 right-12">
            <p className="text-white font-playfair text-lg leading-tight">{BANNERS[banner].title}</p>
            <p className="text-white/55 text-xs mt-0.5">{BANNERS[banner].sub}</p>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {BANNERS.map((_, i) => (
              <button key={i} onClick={() => setBanner(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === banner ? "w-4 bg-[#b8860b]" : "w-1.5 bg-white/35"}`} />
            ))}
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-4 mb-4 overflow-x-auto scrollbar-hide">
          {[
            { label: "☕ Iced Coffee", key: "iced" },
            { label: "🧋 Non-Coffee",  key: "non"  },
            { label: "🥤 Soda",        key: "soda" },
            { label: "🍪 Desserts",    key: "dessert" },
          ].map(({ label }) => (
            <button key={label} onClick={() => onNavigate("menu")}
              className="flex-shrink-0 text-[11px] font-semibold px-3.5 py-1.5 rounded-full"
              style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.22)", color: "rgba(255,255,255,0.75)" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Product sections */}
        <HomeSection title="Iced Coffee"  emoji="☕" items={coffeeItems.slice(0, 8)}    isDesert={false} onSeeAll={() => onNavigate("menu")} />
        
        {/* Promo strip */}
        <div className="mx-4 mb-4 rounded-2xl p-3.5 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.18) 0%, rgba(184,134,11,0.06) 100%)", border: "1px solid rgba(184,134,11,0.22)" }}>
          <span className="text-2xl">🎉</span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-xs">Subscribe & Save 15%</p>
            <p className="text-white/45 text-[10px]">Join our newsletter for exclusive deals</p>
          </div>
          <button onClick={() => onNavigate("profile")}
            className="bg-[#b8860b] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex-shrink-0">
            Join
          </button>
        </div>

        <HomeSection title="Non-Coffee"   emoji="🧋" items={nonCoffeeItems.slice(0, 8)} isDesert={false} onSeeAll={() => onNavigate("menu")} />
        <HomeSection title="Soda"         emoji="🥤" items={sodaItems}                  isDesert={false} onSeeAll={() => onNavigate("menu")} />
        <HomeSection title="Desserts"     emoji="🍪" items={dessertItems}               isDesert={true}  onSeeAll={() => onNavigate("menu")} />

        {/* Store info */}
        <div className="mx-4 mb-4 rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.25)" }}>
            <svg className="w-4 h-4 text-[#b8860b]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-xs">We're Open Today</p>
            <p className="text-white/45 text-[10px]">Mon–Fri · 6:00 PM – 12:00 AM</p>
            <p className="text-white/30 text-[10px]">Brgy Anakan Purok Almaciga, Gingoog City</p>
          </div>
        </div>

      </div>
    </div>
  );
}

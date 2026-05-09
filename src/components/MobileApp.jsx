import { useState, useRef } from "react";
import Logo from "../Logo";
import { useCart } from "../context/CartContext";
import {
  coffeeItems, nonCoffeeItems, sodaItems, dessertItems,
} from "../data/menuData";
import baristaBg from "../assets/Barista-at-night.png";

/* ── Hero banner images (carousel) ── */
const BANNERS = [
  { img: baristaBg,  label: "Crafted Fresh Daily",   sub: "Premium iced coffees & more" },
  { img: baristaBg,  label: "Mon–Fri · 6PM–12AM",    sub: "Gingoog City, Philippines" },
  { img: baristaBg,  label: "Order & Track",          sub: "Place your order in seconds" },
];

/* ── Bottom nav items ── */
const NAV = [
  { key: "home",     label: "Home",   icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )},
  { key: "menu",     label: "Menu",   icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
  )},
  { key: "track",    label: "Orders", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  )},
  { key: "cart",     label: "Cart",   icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
    </svg>
  )},
  { key: "about",    label: "Profile", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )},
];

/* ── Product card ── */
function AppProductCard({ item, onAddToCart, isDesert }) {
  const [added, setAdded] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleAdd = () => {
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="flex-shrink-0 w-36 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition: "transform 0.12s ease",
      }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      {/* Image */}
      <div className="relative h-28 overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {item.tag && (
          <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#b8860b] text-white px-2 py-0.5 rounded-full">
            {item.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-white text-xs font-semibold leading-tight truncate">{item.name}</p>
        <p className="text-white/40 text-[10px] mt-0.5 leading-tight">
          {isDesert ? "per piece" : "16oz / 22oz"}
        </p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-amber-400 font-bold text-xs">{item.price}</p>
          <button
            onClick={handleAdd}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0
              ${added ? "bg-green-500" : "bg-[#b8860b] hover:bg-yellow-600"}`}
          >
            {added ? (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Horizontal scroll section ── */
function AppSection({ title, items, onAddToCart, isDesert }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <p className="text-white font-semibold text-sm tracking-wide">{title}</p>
        <span className="text-[#b8860b] text-xs font-medium">{items.length} items</span>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}>
        {items.map((item, i) => (
          <div key={i} style={{ scrollSnapAlign: "start" }}>
            <AppProductCard item={item} onAddToCart={onAddToCart} isDesert={isDesert} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main mobile app home ── */
export default function MobileApp({ onNavigate }) {
  const { addToCart, totalItems } = useCart();
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeNav, setActiveNav]       = useState("home");

  const handleNav = (key) => {
    setActiveNav(key);
    if (key !== "home") onNavigate?.(key);
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, size: "16oz", milk: null, price: item.price });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d0b08]"
      style={{ paddingBottom: "80px" }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3 sticky top-0 z-20"
        style={{ background: "rgba(13,11,8,0.92)", backdropFilter: "blur(16px)" }}>
        <Logo width={44} height={48} />
        <div className="flex-1 mx-3">
          <p className="text-white/40 text-xs">Good evening ☕</p>
          <p className="text-white font-semibold text-sm leading-tight">What would you like today?</p>
        </div>
        <button
          onClick={() => onNavigate?.("cart")}
          className="relative w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.3)" }}
        >
          <svg className="w-5 h-5 text-[#b8860b]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#b8860b] text-white text-[10px] font-bold flex items-center justify-center"
              style={{ animation: "stat-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}>
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>
      </div>

      {/* ── Hero banner carousel ── */}
      <div className="relative mx-4 mt-2 mb-5 rounded-2xl overflow-hidden" style={{ height: "190px" }}>
        <img
          src={BANNERS[activeBanner].img}
          alt="banner"
          className="w-full h-full object-cover"
          style={{ transition: "opacity 0.4s ease" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
        />
        {/* Text */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-playfair text-xl leading-tight">{BANNERS[activeBanner].label}</p>
          <p className="text-white/60 text-xs mt-0.5">{BANNERS[activeBanner].sub}</p>
        </div>
        {/* Dots */}
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setActiveBanner(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeBanner ? "w-5 bg-[#b8860b]" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
        {/* Gold accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b8860b]/60 to-transparent" />
      </div>

      {/* ── Quick action chips ── */}
      <div className="flex gap-2 px-4 mb-5 overflow-x-auto scrollbar-hide">
        {[
          { label: "☕ Iced Coffee", key: "iced" },
          { label: "🧋 Non-Coffee",  key: "non"  },
          { label: "🥤 Soda",        key: "soda" },
          { label: "🍪 Desserts",    key: "dessert" },
        ].map(({ label, key }) => (
          <button
            key={key}
            onClick={() => onNavigate?.("menu")}
            className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: "rgba(184,134,11,0.12)",
              border: "1px solid rgba(184,134,11,0.25)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">

        <AppSection
          title="☕ Iced Coffee"
          items={coffeeItems.slice(0, 6)}
          onAddToCart={handleAddToCart}
          isDesert={false}
        />

        {/* Promo banner */}
        <div className="mx-4 mb-6 rounded-2xl p-4 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.2) 0%, rgba(184,134,11,0.08) 100%)", border: "1px solid rgba(184,134,11,0.25)" }}>
          <div className="text-3xl">🎉</div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Subscribe & Save 15%</p>
            <p className="text-white/50 text-xs mt-0.5">Join our newsletter for exclusive deals</p>
          </div>
          <button
            onClick={() => onNavigate?.("home")}
            className="bg-[#b8860b] text-white text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0"
          >
            Join
          </button>
        </div>

        <AppSection
          title="🧋 Non-Coffee"
          items={nonCoffeeItems.slice(0, 6)}
          onAddToCart={handleAddToCart}
          isDesert={false}
        />

        <AppSection
          title="🥤 Soda"
          items={sodaItems}
          onAddToCart={handleAddToCart}
          isDesert={false}
        />

        <AppSection
          title="🍪 Desserts"
          items={dessertItems}
          onAddToCart={handleAddToCart}
          isDesert={true}
        />

        {/* Opening hours card */}
        <div className="mx-4 mb-6 rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.25)" }}>
              <svg className="w-5 h-5 text-[#b8860b]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">We're Open!</p>
              <p className="text-white/50 text-xs">Mon–Fri · 6:00 PM – 12:00 AM</p>
              <p className="text-white/35 text-xs">Brgy Anakan Purok Almaciga, Gingoog City</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom navigation ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-2 pb-2"
        style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-around pt-2">
          {NAV.map(({ key, label, icon }) => {
            const isActive = activeNav === key;
            return (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0"
                style={{
                  color: isActive ? "#b8860b" : "rgba(255,255,255,0.4)",
                  background: isActive ? "rgba(184,134,11,0.12)" : "transparent",
                }}
              >
                {key === "cart" ? (
                  <div className="relative">
                    {icon}
                    {totalItems > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#b8860b] text-white text-[9px] font-bold flex items-center justify-center">
                        {totalItems > 9 ? "9+" : totalItems}
                      </span>
                    )}
                  </div>
                ) : icon}
                <span className="text-[10px] font-medium leading-none">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

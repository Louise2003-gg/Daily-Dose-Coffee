import { useState } from "react";
import Logo from "../Logo";
import { useCart } from "../context/CartContext";
import AppHome    from "./AppHome";
import AppMenu    from "./AppMenu";
import AppOrders  from "./AppOrders";
import AppCart    from "./AppCart";
import AppProfile from "./AppProfile";

/* ── Shared bottom nav definition ── */
export const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    key: "menu",
    label: "Menu",
    icon: (active) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={active ? "2.2" : "1.8"} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    key: "orders",
    label: "Orders",
    icon: (active) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={active ? "2.2" : "1.8"} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    key: "cart",
    label: "Cart",
    icon: (active) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={active ? "2.2" : "1.8"} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

/* ── Bottom Navigation Bar ── */
export function BottomNav({ active, onChange, totalItems }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,8,5,0.97)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(184,134,11,0.15)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {NAV_ITEMS.map(({ key, label, icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 relative min-w-0 flex-1"
              style={{ color: isActive ? "#b8860b" : "rgba(255,255,255,0.35)" }}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#b8860b]"
                  style={{ animation: "stat-pop 0.3s ease both" }} />
              )}

              {/* Cart badge */}
              {key === "cart" && totalItems > 0 ? (
                <div className="relative">
                  {icon(isActive)}
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#b8860b] text-white text-[9px] font-bold flex items-center justify-center"
                    style={{ animation: "stat-pop 0.3s ease both" }}>
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                </div>
              ) : icon(isActive)}

              <span className={`text-[10px] font-medium leading-none transition-all ${isActive ? "font-bold" : ""}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── App Shell — manages which screen is active ── */
export default function AppShell() {
  const [screen, setScreen] = useState("home");
  const { totalItems }      = useCart();

  const screens = {
    home:    <AppHome    onNavigate={setScreen} />,
    menu:    <AppMenu    onNavigate={setScreen} />,
    orders:  <AppOrders  onNavigate={setScreen} />,
    cart:    <AppCart    onNavigate={setScreen} />,
    profile: <AppProfile onNavigate={setScreen} />,
  };

  return (
    <div className="min-h-screen bg-[#0d0b08] font-poppins" style={{ paddingBottom: "72px" }}>
      <div style={{ animation: "page-fade-in 0.3s ease both" }}>
        {screens[screen] ?? screens.home}
      </div>
      <BottomNav active={screen} onChange={setScreen} totalItems={totalItems} />
    </div>
  );
}

import { useState } from "react";
import Logo from "../Logo";
import { useCart } from "../context/CartContext";

export default function Navbar({ onNavigate, currentPage = "home" }) {
  const [clicked, setClicked]   = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems }          = useCart();

  const handleClick = (item) => {
    const key = item === "About Us" ? "about" : item.toLowerCase();
    setMenuOpen(false);
    if (clicked === key) return;
    setClicked(key);
    setTimeout(() => setClicked(null), 450);
    if (item === "Menu")     onNavigate?.("menu");
    if (item === "Home")     onNavigate?.("home");
    if (item === "About Us") onNavigate?.("about");
    if (item === "Location") onNavigate?.("location");
  };

  const getPageKey = (item) => {
    if (item === "Home")     return "home";
    if (item === "Menu")     return "menu";
    if (item === "About Us") return "about";
    return item.toLowerCase();
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 py-4">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 flex items-center justify-between">
        <Logo width={56} height={62} />

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-6 lg:gap-10 text-white text-sm lg:text-base font-medium tracking-wide">
          {["Home", "Menu", "About Us", "Location"].map((item) => {
            const pageKey   = getPageKey(item);
            const isActive  = currentPage === pageKey;
            const isClicked = clicked === pageKey;
            return (
              <li key={item} onClick={() => handleClick(item)} className="relative cursor-pointer select-none">
                <span
                  className={`transition-colors duration-200
                    ${isActive ? "text-yellow-400 font-bold" : "text-white hover:text-yellow-400"}`}
                  style={{
                    display: "inline-block",
                    transform: isClicked ? "scale(0.85)" : "scale(1)",
                    transition: "transform 0.12s ease, color 0.2s ease",
                  }}
                >
                  {item}
                </span>
                {isClicked && (
                  <span className="ripple-ring absolute pointer-events-none rounded-full border border-yellow-400/50" style={{ inset: "-6px" }} />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart button */}
          <button
            onClick={() => onNavigate?.("cart")}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#b8860b] text-white text-[10px] font-bold flex items-center justify-center"
                style={{ animation: "stat-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Order Now — hidden on very small screens */}
          <button
            onClick={() => onNavigate?.("login")}
            className="hidden sm:block bg-[#b8860b] text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Order Now
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 px-5 py-4 flex flex-col gap-1"
          style={{ animation: "cart-row-in 0.25s ease both" }}>
          {["Home", "Menu", "About Us", "Location"].map((item) => {
            const pageKey  = getPageKey(item);
            const isActive = currentPage === pageKey;
            return (
              <button
                key={item}
                onClick={() => handleClick(item)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive ? "bg-[#b8860b]/20 text-yellow-400" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                {item}
              </button>
            );
          })}
          <button
            onClick={() => { setMenuOpen(false); onNavigate?.("login"); }}
            className="mt-2 bg-[#b8860b] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Order Now
          </button>
        </div>
      )}
    </nav>
  );
}

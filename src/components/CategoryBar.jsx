import { useState } from "react";
import useReveal from "../hooks/useReveal";
import icedCoffeeIcon from "../assets/Ice-coffee svg.svg";
import dessertIcon from "../assets/Dessert.svg";

const categories = [
  {
    key: "iced",
    label: "Iced Coffee",
    icon: <img src={icedCoffeeIcon} alt="Iced Coffee" className="w-7 h-7 sm:w-9 sm:h-9 brightness-0 invert" />,
  },
  {
    key: "non",
    label: "Non-Coffee",
    icon: (
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1.5 9a2 2 0 01-2 1.5h-5A2 2 0 017.5 17L6 8z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a2 2 0 010 4h-1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5c0-1 .5-2 1.5-2s1.5 1 2.5 1 1.5-1 2.5-1" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10">
          <circle cx="12" cy="12" r="10" />
          <line x1="6" y1="6" x2="20" y2="20" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    key: "soda",
    label: "Soda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 sm:w-9 sm:h-9">
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
    icon: <img src={dessertIcon} alt="Dessert" className="w-7 h-7 sm:w-9 sm:h-9 brightness-0 invert" />,
  },
];

export { categories };

export default function CategoryBar({ activeCategory, onSelect }) {
  const [ripple, setRipple] = useState(null);
  const [ref, visible]      = useReveal(0.2);

  const handleClick = (key) => {
    setRipple(key);
    setTimeout(() => setRipple(null), 400);
    onSelect(key);
  };

  return (
    <section ref={ref} className="bg-[#b8860b] py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-20">
        {categories.map(({ key, label, icon }, i) => (
          <div
            key={key}
            onClick={() => handleClick(key)}
            className={`flex flex-col items-center cursor-pointer group gap-1.5 sm:gap-2
              transition-all duration-200
              ${activeCategory === key ? "opacity-100 scale-105" : "opacity-70 hover:opacity-100"}
              ${visible ? "reveal-up" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-200
                  ${activeCategory === key ? "bg-white/30 text-white" : "bg-white/15 text-white group-hover:bg-white/25"}
                  ${ripple === key ? "scale-90" : "scale-100"}`}
                style={{ transition: ripple === key ? "transform 0.1s ease" : "transform 0.3s ease, background 0.2s" }}
                key={ripple === key ? `${key}-active` : key}
              >
                {icon}
              </div>
              {ripple === key && (
                <span className="ripple-ring absolute inset-0 rounded-full border-2 border-white/60 pointer-events-none" />
              )}
            </div>
            <span className={`text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 text-center
              ${activeCategory === key ? "text-white font-bold" : "text-white/80"}`}>
              {label}
            </span>
            <div
              className="h-1.5 rounded-full bg-white transition-all duration-300"
              style={{ width: activeCategory === key ? "24px" : "0px", opacity: activeCategory === key ? 1 : 0 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

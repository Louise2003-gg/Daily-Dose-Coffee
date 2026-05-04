import { useState, useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal";
import StarRating from "./StarRating";
import { reviews } from "../data/menuData";
import img28 from "../assets/image 28.png";
import baristaBg from "../assets/Barista-at-night.png";

export default function Reviews() {
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(null);
  const [animKey, setAnimKey]     = useState(0);
  const [btnFlash, setBtnFlash]   = useState(null);
  const [offsetY, setOffsetY]     = useState(0);
  const [isMobile, setIsMobile]   = useState(false);
  const sectionRef                = useRef(null);
  const total                     = reviews.length;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setAnimKey((k) => k + 1);
    setBtnFlash(dir);
    setTimeout(() => setBtnFlash(null), 500);
    setCurrent((c) =>
      dir === "next" ? (c + 1) % total : (c - 1 + total) % total
    );
  };

  // On mobile show 1 card, on desktop show 3
  const getVisible = () => {
    if (isMobile) {
      return [{ review: reviews[current], position: 0 }];
    }
    return [-1, 0, 1].map((offset) => ({
      review:   reviews[(current + offset + total) % total],
      position: offset,
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect    = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowH) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffsetY(progress * 60);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAnimClass = (position) => {
    if (!direction) return "";
    return direction === "next" ? "slide-in-right" : "slide-in-left";
  };

  const [headingRef, headingVisible] = useReveal(0.1);

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 px-4 sm:px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={baristaBg}
          alt=""
          className="absolute inset-0 w-full object-cover object-center"
          style={{ height: "120%", top: "-10%", transform: `translateY(${offsetY}px)`, willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div ref={headingRef}>
          <p className={`text-center text-[#b8860b] text-sm tracking-widest uppercase mb-1 ${headingVisible ? "reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.05s" }}>
            Come and Join
          </p>
          <h2 className={`font-playfair text-center text-3xl sm:text-4xl md:text-5xl text-white mb-8 sm:mb-12 ${headingVisible ? "reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}>
            Our Happy Customers
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Prev */}
          <button
            onClick={() => go("prev")}
            className={`flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center transition-all duration-150
              ${btnFlash === "prev"
                ? "bg-white/20 border-white scale-90"
                : "border-white/40 text-white hover:border-[#b8860b] hover:text-[#b8860b]"}`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards */}
          <div className="flex-1 flex gap-3 sm:gap-5 overflow-hidden">
            {getVisible().map(({ review: r, position }) => (
              <div
                key={`${animKey}-${position}`}
                className={`rounded-2xl p-5 sm:p-7 border backdrop-blur-md
                  ${getAnimClass(position)}
                  ${position === 0
                    ? "flex-1 bg-white/18 border-white/30 scale-100 md:scale-105 shadow-2xl"
                    : "flex-1 bg-white/8 border-white/15 scale-95 opacity-70 hidden md:block"}`}
                style={{ animationDelay: `${Math.abs(position) * 0.05}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#b8860b]/60 flex-shrink-0">
                    <img src={img28} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-white truncate">{r.name}</p>
                    <p className="text-xs sm:text-sm text-white/50">{r.role}</p>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <StarRating count={r.rating} />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => go("next")}
            className={`flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center transition-all duration-150
              ${btnFlash === "next"
                ? "bg-yellow-400 border-yellow-400 scale-90"
                : "bg-[#b8860b] border-[#b8860b] text-white hover:bg-yellow-600"}`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? "next" : "prev");
                setAnimKey((k) => k + 1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300
                ${current === i ? "w-6 bg-[#b8860b]" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

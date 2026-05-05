import { useEffect, useState } from "react";
import Logo from "../Logo";

export default function Intro({ onFinish }) {
  const [phase, setPhase] = useState("start");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logoIn"),  300);
    const t2 = setTimeout(() => setPhase("tagline"), 1600);
    const t3 = setTimeout(() => setPhase("exit"),    3400);
    const t4 = setTimeout(() => onFinish(),          4600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0e0a06] transition-opacity duration-700 ease-in-out
        ${phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Ambient glow — perfectly centered */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div
          className={`w-[600px] h-[600px] rounded-full bg-[#b8860b]/10 blur-[120px]
            transition-all duration-1000
            ${phase === "start" ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        />
      </div>

      {/* Horizontal accent lines — anchored relative to center, not viewport % */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-stretch justify-center">
        <div
          className={`h-px bg-gradient-to-r from-transparent via-[#b8860b]/40 to-transparent
            transition-all duration-1000 delay-500 -translate-y-24
            ${phase === "start" ? "opacity-0" : "opacity-100"}`}
        />
        <div
          className={`h-px bg-gradient-to-r from-transparent via-[#b8860b]/40 to-transparent
            transition-all duration-1000 delay-500 translate-y-36
            ${phase === "start" ? "opacity-0" : "opacity-100"}`}
        />
      </div>

      {/* Main content — perfectly centered column */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        {/* Logo + steam */}
        <div
          className={`relative transition-all duration-1000 ease-out
            ${phase === "start" ? "opacity-0 scale-75 translate-y-6" : "opacity-100 scale-100 translate-y-0"}`}
        >
          <Logo width={110} height={120} />

          {/* Steam lines — centered above logo */}
          <div
            className={`absolute -top-8 left-1/2 -translate-x-1/2 flex gap-3
              transition-all duration-700 delay-700
              ${phase === "logoIn" || phase === "tagline" ? "opacity-100" : "opacity-0"}`}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-gradient-to-t from-[#b8860b]/60 to-transparent rounded-full animate-steam"
                style={{ height: `${20 + i * 8}px`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Brand name */}
        <div
          className={`mt-6 transition-all duration-700 delay-300
            ${phase === "start" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          <p className="font-lobster text-[#b8860b] text-4xl tracking-widest text-center">
            Daily Dose
          </p>
        </div>

        {/* Tagline */}
        <div
          className={`mt-3 transition-all duration-700
            ${phase === "tagline" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <p className="text-white/50 text-sm tracking-[0.4em] uppercase font-light text-center">
            Richest Coffee in the City
          </p>
        </div>
      </div>

      {/* Progress bar — bottom center */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="w-32 h-px bg-white/10 overflow-hidden rounded-full">
          <div
            className={`h-full bg-[#b8860b] rounded-full transition-all ease-linear
              ${phase === "start"   ? "w-0 duration-0" : ""}
              ${phase === "logoIn"  ? "w-1/3 duration-[1300ms]" : ""}
              ${phase === "tagline" ? "w-2/3 duration-[1800ms]" : ""}
              ${phase === "exit"    ? "w-full duration-[1000ms]" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

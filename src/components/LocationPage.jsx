import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import useReveal from "../hooks/useReveal";
import bgImage from "../assets/background.png";
import baristaBg from "../assets/Barista-at-night.png";
import bean1 from "../assets/bean1.png";
import bean2 from "../assets/bean2.png";

// ── Location details ──
const LOCATION = {
  name:    "Daily Dose Coffee",
  address: "Brgy Anakan Purok Almaciga",
  city:    "Gingoog City, Philippines",
  phone:   "09944525434",
  email:   "hello@dailydose.com",
  hours: [
    { day: "Monday – Friday", time: "6:00 PM – 12:00 AM" },
  ],
  lat: 8.822389,
  lng: 125.101806,
  // Google Maps embed using exact coordinates
  mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d241.8!2d125.10180555555556!3d8.822388888888889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwNDknMjAuNiJOIDEyNcKwMDYnMDYuNSJF!5e1!3m2!1sen!2sph!4v1700000000000",
};

const amenities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    label: "Dine-In Seating",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
    ),
    label: "Takeaway & Delivery",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    label: "GCash Payment",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611A48.309 48.309 0 0012 21a48.25 48.25 0 008.135-.687c1.718-.293 2.3-2.379 1.067-3.61L19.8 15.3M5 14.5h14.8" />
      </svg>
    ),
    label: "Freshly Brewed Daily",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    label: "Friendly Service",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Open Every Day",
  },
];

export default function LocationPage({ onNavigate }) {
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect    = heroRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowH) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setParallaxY(progress * 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [infoRef,      infoVisible]      = useReveal(0.15);
  const [mapRef,       mapVisible]       = useReveal(0.1);
  const [amenRef,      amenVisible]      = useReveal(0.15);
  const [ctaRef,       ctaVisible]       = useReveal(0.2);

  return (
    <div className="min-h-screen bg-[#0e0a06] font-poppins page-fade-in">

      {/* ── NAVBAR ── */}
      <Navbar onNavigate={onNavigate} currentPage="location" />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={baristaBg}
            alt=""
            className="absolute inset-0 w-full object-cover object-center"
            style={{ height: "140%", top: "-20%", transform: `translateY(${parallaxY}px)`, willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a06] via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pb-16 w-full">
          <p className="text-[#b8860b] text-sm font-semibold tracking-widest uppercase mb-3 reveal-up"
            style={{ animationDelay: "0.1s" }}>
            Find Us
          </p>
          <h1 className="font-playfair text-white text-7xl leading-tight reveal-up"
            style={{ animationDelay: "0.22s" }}>
            Come Visit Us
          </h1>
          <p className="text-white/55 text-base mt-3 max-w-md reveal-up"
            style={{ animationDelay: "0.35s" }}>
            We'd love to see you in person. Stop by, grab a seat, and let us make you something special.
          </p>
        </div>
      </section>

      {/* ── INFO + MAP ── */}
      <section className="py-14 sm:py-20 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left — info cards */}
          <div ref={infoRef} className="flex flex-col gap-6">

            {/* Address */}
            <div
              className={`bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#b8860b]/40 transition-all duration-300 ${infoVisible ? "reveal-up" : "opacity-0"}`}
              style={{ animationDelay: "0.05s" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#b8860b]/15 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#b8860b] text-xs font-semibold tracking-widest uppercase mb-1">Address</p>
                  <p className="text-white font-semibold text-base">{LOCATION.address}</p>
                  <p className="text-white/50 text-sm mt-0.5">{LOCATION.city}</p>
                  <a
                    href={`https://www.google.com/maps?q=${LOCATION.lat},${LOCATION.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-[#b8860b] text-xs font-semibold hover:text-yellow-400 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              className={`bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#b8860b]/40 transition-all duration-300 ${infoVisible ? "reveal-up" : "opacity-0"}`}
              style={{ animationDelay: "0.15s" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#b8860b]/15 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#b8860b] text-xs font-semibold tracking-widest uppercase mb-3">Opening Hours</p>
                  <div className="space-y-2">
                    {LOCATION.hours.map(({ day, time }) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">{day}</span>
                        <span className="text-white text-sm font-medium">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div
              className={`bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#b8860b]/40 transition-all duration-300 ${infoVisible ? "reveal-up" : "opacity-0"}`}
              style={{ animationDelay: "0.25s" }}
            >
              <p className="text-[#b8860b] text-xs font-semibold tracking-widest uppercase mb-4">Contact Us</p>
              <div className="space-y-3">
                <a href={`tel:${LOCATION.phone}`} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-white/8 group-hover:bg-[#b8860b]/20 transition-colors flex items-center justify-center text-white/60 group-hover:text-[#b8860b]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">{LOCATION.phone}</span>
                </a>
                <a href={`mailto:${LOCATION.email}`} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-white/8 group-hover:bg-[#b8860b]/20 transition-colors flex items-center justify-center text-white/60 group-hover:text-[#b8860b]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">{LOCATION.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right — map */}
          <div
            ref={mapRef}
            className={`${mapVisible ? "reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: "520px" }}>
              <iframe
                title="Daily Dose Coffee Location"
                src={LOCATION.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section ref={amenRef} className="py-16 px-6 bg-[#0a0704]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${amenVisible ? "reveal-up" : "opacity-0"}`}>
            <p className="text-[#b8860b] text-sm font-semibold tracking-widest uppercase mb-2">What We Offer</p>
            <h2 className="font-playfair text-white text-5xl">At Our Location</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {amenities.map(({ icon, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5
                  hover:border-[#b8860b]/40 hover:bg-white/8 transition-all duration-300
                  ${amenVisible ? "reveal-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#b8860b]/15 border border-[#b8860b]/25 flex items-center justify-center text-[#b8860b] flex-shrink-0">
                  {icon}
                </div>
                <span className="text-white/80 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src={bean1} alt="" className="absolute left-0 top-0 h-full object-cover opacity-15" />
          <img src={bean2} alt="" className="absolute right-0 top-0 h-full object-cover opacity-15 scale-x-[-1]" />
          <div className="absolute inset-0 bg-[#b8860b]/85" />
        </div>
        <div className={`relative z-10 text-center max-w-xl mx-auto ${ctaVisible ? "reveal-up" : "opacity-0"}`}>
          <h2 className="font-playfair text-white text-5xl mb-4">We're Open Today</h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            Walk in anytime during our opening hours. No reservation needed — just come as you are.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onNavigate("menu")}
              className="bg-white text-[#b8860b] font-bold px-8 py-3 rounded-full hover:bg-yellow-50 transition-colors text-sm"
            >
              View Our Menu
            </button>
            <button
              onClick={() => onNavigate("about")}
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              About Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

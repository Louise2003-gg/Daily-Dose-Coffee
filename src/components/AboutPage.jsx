import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import bgImage from "../assets/background.png";
import baristaBg from "../assets/Barista-at-night.png";
import bean1 from "../assets/bean1.png";
import bean2 from "../assets/bean2.png";
import nikkiImg from "../assets/nikki-removebg-preview.png";
import facebookIcon from "../assets/facebook-svgrepo-com.svg";
import instagramIcon from "../assets/instagram-svgrepo-com.svg";
import twitterIcon from "../assets/twitter-154-svgrepo-com.svg";

// ── Intersection observer hook for scroll-triggered animations ──
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const stats = [
  { value: "5+",   label: "Years of Craft" },
  { value: "50+",  label: "Signature Drinks" },
  { value: "10K+", label: "Happy Customers" },
  { value: "1",    label: "Passionate Owner" },
];

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611A48.309 48.309 0 0012 21a48.25 48.25 0 008.135-.687c1.718-.293 2.3-2.379 1.067-3.61L19.8 15.3M5 14.5h14.8" />
      </svg>
    ),
    title: "Premium Quality",
    desc: "Every bean is sourced from the finest farms and roasted to bring out its richest flavor profile.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Made with Love",
    desc: "Each drink is handcrafted with care, passion, and attention to detail — every single time.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Community First",
    desc: "We believe coffee brings people together. Our space is built for connection, comfort, and community.",
  },
];

export default function AboutPage({ onNavigate }) {
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef(null);

  // Hero parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
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

  const [statsRef, statsVisible]   = useReveal();
  const [storyRef, storyVisible]   = useReveal();
  const [ownerRef, ownerVisible]   = useReveal();
  const [valuesRef, valuesVisible] = useReveal();

  return (
    <div className="min-h-screen bg-[#0e0a06] font-poppins page-fade-in">

      {/* ── NAVBAR ── */}
      <Navbar onNavigate={onNavigate} currentPage="about" />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full object-cover"
            style={{ height: "140%", top: "-20%", transform: `translateY(${parallaxY}px)`, willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-20">
          <p className="text-[#b8860b] text-sm font-semibold tracking-widest uppercase mb-3 reveal-up">
            Our Story
          </p>
          <h1 className="font-playfair text-white text-7xl leading-tight mb-5 reveal-up" style={{ animationDelay: "0.1s" }}>
            Brewed with<br />Purpose
          </h1>
          <p className="text-white/60 text-base max-w-md leading-relaxed reveal-up" style={{ animationDelay: "0.2s" }}>
            Daily Dose was born from a simple belief — that a great cup of coffee can change your entire day.
            We craft every drink with intention, quality, and a whole lot of heart.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="bg-[#b8860b] py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`text-center ${statsVisible ? "stat-pop" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="font-playfair text-white text-5xl mb-1">{value}</p>
              <p className="text-white/70 text-sm tracking-wide uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section ref={storyRef} className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image side */}
          <div
            className={`relative ${storyVisible ? "reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative rounded-3xl overflow-hidden h-[480px]">
              <img src={baristaBg} alt="Our Story" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4">
                <p className="font-playfair text-white text-2xl">Est. 2019</p>
                <p className="text-white/60 text-xs mt-0.5">Daily Dose Coffee</p>
              </div>
            </div>
            {/* Decorative bean */}
            <img src={bean1} alt="" className="absolute -top-8 -right-8 w-32 h-32 object-contain opacity-30 rotate-12" />
          </div>

          {/* Text side */}
          <div className={storyVisible ? "reveal-up" : "opacity-0"} style={{ animationDelay: "0.2s" }}>
            <p className="text-[#b8860b] text-sm font-semibold tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="font-playfair text-white text-5xl leading-tight mb-6">
              More Than Just<br />a Coffee Shop
            </h2>
            <div className="space-y-4 text-white/65 text-sm leading-relaxed">
              <p>
                Daily Dose started as a small corner café with one mission: to serve the richest, most
                carefully crafted coffee in the city. What began as a passion project quickly grew into
                a beloved community gathering spot.
              </p>
              <p>
                We source our beans directly from small-batch farms across Southeast Asia, ensuring
                every cup carries the story of the people who grew it. Our roasting process is
                meticulous — we roast in small batches to preserve the unique character of each origin.
              </p>
              <p>
                Beyond coffee, we've built a space where people feel at home. Whether you're catching
                up with a friend, working on your next big idea, or simply taking a quiet moment for
                yourself — Daily Dose is your place.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => onNavigate("location")}
                className="bg-[#b8860b] text-white font-semibold px-7 py-3 rounded-full hover:bg-yellow-600 transition-colors text-sm">
                Visit Us
              </button>
              <button
                onClick={() => onNavigate("menu")}
                className="border border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:border-[#b8860b] hover:text-[#b8860b] transition-colors text-sm">
                Our Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── OWNER ── */}
      <section ref={ownerRef} className="relative py-28 px-6 overflow-hidden">
        {/* Gradient background — soft coffee tones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(184,134,11,0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(120,80,20,0.10) 0%, transparent 50%), linear-gradient(160deg, #1a1008 0%, #0e0a06 50%, #12100a 100%)" }}
          />
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-5 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className={`text-center mb-16 ${ownerVisible ? "reveal-up" : "opacity-0"}`}>
            <p className="text-[#b8860b] text-xs font-semibold tracking-[0.3em] uppercase mb-3">The Person Behind It</p>
            <h2 className="font-playfair text-white text-4xl sm:text-5xl">Meet the Owner</h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent" />
          </div>

          {/* Owner card */}
          <div
            className={`relative ${ownerVisible ? "reveal-up" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            {/* Outer glow border */}
            <div className="absolute -inset-px rounded-3xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.35) 0%, rgba(255,255,255,0.05) 40%, rgba(184,134,11,0.15) 100%)" }}
            />

            <div className="relative rounded-3xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col lg:flex-row items-center">

                {/* ── Photo column ── */}
                <div className="relative w-full lg:w-[42%] flex items-end justify-center pt-12 pb-0 lg:py-12 px-8 lg:px-10"
                  style={{ background: "linear-gradient(160deg, rgba(184,134,11,0.06) 0%, transparent 60%)" }}
                >
                  {/* Blurred ground shadow */}
                  <div className="absolute bottom-0 left-1/2 w-48 h-8 rounded-full pointer-events-none"
                    style={{ background: "rgba(0,0,0,0.55)", filter: "blur(20px)", transform: "translateX(-50%) scaleX(1.3)" }}
                  />
                  {/* Ambient glow behind figure */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-72 h-72 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(184,134,11,0.16) 0%, transparent 70%)", filter: "blur(32px)" }}
                    />
                  </div>
                  {/* Floating figure */}
                  <div className="relative z-10 owner-float"
                    style={{ filter: "drop-shadow(0 8px 32px rgba(184,134,11,0.22)) drop-shadow(0 2px 10px rgba(0,0,0,0.65))" }}
                  >
                    <img
                      src={nikkiImg}
                      alt="Kirstine Nicole Tojong"
                      className="w-60 sm:w-72 lg:w-80 object-contain select-none"
                      style={{ maxHeight: "420px" }}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Vertical divider — desktop */}
                <div className="hidden lg:block w-px self-stretch my-10"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(184,134,11,0.35), transparent)" }}
                />

                {/* ── Info column ── */}
                <div className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-5 self-start">
                    <div className="h-px w-6 bg-[#b8860b]" />
                    <span className="text-[#b8860b] text-xs font-bold tracking-[0.25em] uppercase">Founder & Owner</span>
                    <div className="h-px w-6 bg-[#b8860b]" />
                  </div>

                  <h3 className="font-playfair text-white text-3xl sm:text-4xl leading-tight mb-1">
                    Kirstine Nicole Tojong
                  </h3>
                  <p className="text-[#b8860b]/70 text-sm tracking-wide mb-6">Head Barista · Coffee Curator</p>

                  <blockquote className="relative pl-4 border-l-2 border-[#b8860b]/40 mb-7">
                    <p className="text-white/60 text-sm leading-relaxed italic">
                      "I started Daily Dose because I wanted people to experience coffee the way I fell in love
                      with it — not just as a caffeine fix, but as a ritual. Every drink we serve is a reflection
                      of that belief."
                    </p>
                  </blockquote>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {[
                      { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>), label: "Location", value: "Gingoog City" },
                      { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>), label: "Age", value: "25 years old" },
                      { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>), label: "Contact", value: "09944525434" },
                      { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>), label: "Address", value: "Brgy Anakan Purok Almaciga" },
                    ].map(({ icon, label, value }) => (
                      <div key={label}
                        className="flex items-center gap-3 rounded-xl px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <span className="text-[#b8860b] flex-shrink-0">{icon}</span>
                        <div>
                          <p className="text-white/35 text-xs">{label}</p>
                          <p className="text-white/80 text-xs font-medium">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-white/30 text-xs tracking-widest uppercase">Follow</span>
                    <div className="h-px flex-1 bg-white/10" />
                    {[
                      { icon: instagramIcon, label: "Instagram" },
                      { icon: facebookIcon,  label: "Facebook" },
                      { icon: twitterIcon,   label: "Twitter" },
                    ].map(({ icon, label }) => (
                      <a key={label} href="#" aria-label={label}
                        className="w-9 h-9 rounded-full border border-white/10 hover:border-[#b8860b] hover:bg-[#b8860b]/20 transition-all duration-200 flex items-center justify-center p-2">
                        <img src={icon} alt={label} className="w-full h-full brightness-0 invert opacity-60" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="py-16 sm:py-24 px-5 sm:px-6 bg-[#0a0704]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 ${valuesVisible ? "reveal-up" : "opacity-0"}`}>
            <p className="text-[#b8860b] text-sm font-semibold tracking-widest uppercase mb-3">What Drives Us</p>
            <h2 className="font-playfair text-white text-5xl">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className={`bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#b8860b]/40 hover:bg-white/8 transition-all duration-300
                  ${valuesVisible ? "reveal-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#b8860b]/15 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b] mb-5">
                  {icon}
                </div>
                <h3 className="font-playfair text-white text-2xl mb-3">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src={bean2} alt="" className="absolute right-0 top-0 h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-[#b8860b]/90" />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto reveal-up">
          <h2 className="font-playfair text-white text-5xl mb-4">Come Visit Us Today</h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            We're open every day from 7am to 10pm. Come in, sit down, and let us make you something special.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onNavigate("menu")}
              className="bg-white text-[#b8860b] font-bold px-8 py-3 rounded-full hover:bg-yellow-50 transition-colors text-sm"
            >
              View Our Menu
            </button>
            <a
              href="https://www.google.com/maps?q=8.822389,125.101806"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

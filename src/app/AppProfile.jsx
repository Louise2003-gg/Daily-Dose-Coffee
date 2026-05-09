import { useState } from "react";
import { useCart } from "../context/CartContext";
import nikkiImg from "../assets/nikki-removebg-preview.png";

export default function AppProfile({ onNavigate }) {
  const { orderHistory, totalItems } = useCart();
  const [email, setEmail]   = useState("");
  const [subStatus, setSub] = useState(null);

  const totalOrders     = orderHistory.length;
  const completedOrders = orderHistory.filter((o) => o.status === "delivered").length;
  const totalSpent      = orderHistory.reduce((s, o) => s + (o.total || 0), 0);

  const handleSubscribe = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setSub("error"); setTimeout(() => setSub(null), 3000); return; }
    setSub("success"); setEmail(""); setTimeout(() => setSub(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0d0b08]">

      {/* Header */}
      <div className="sticky top-0 z-10 px-4 pt-14 pb-4"
        style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(20px)" }}>
        <h1 className="font-playfair text-white text-2xl">Profile</h1>
      </div>

      <div className="px-4 pb-6 flex flex-col gap-4">

        {/* Owner card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.12) 0%, rgba(184,134,11,0.04) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          <div className="flex items-center gap-4 p-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#b8860b]/40"
                style={{ background: "rgba(184,134,11,0.1)" }}>
                <img src={nikkiImg} alt="Owner" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0d0b08]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">Kirstine Nicole Tojong</p>
              <p className="text-[#b8860b] text-xs mt-0.5">Founder & Owner</p>
              <p className="text-white/35 text-[10px] mt-0.5">Daily Dose Coffee · Gingoog City</p>
            </div>
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 border-t border-white/8">
            {[
              { label: "Orders",    value: totalOrders },
              { label: "Completed", value: completedOrders },
              { label: "Spent",     value: `₱${totalSpent}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center py-3 border-r border-white/8 last:border-r-0">
                <p className="text-amber-400 font-bold text-base leading-none">{value}</p>
                <p className="text-white/35 text-[10px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "My Orders",   emoji: "📋", action: () => onNavigate("orders") },
            { label: "My Cart",     emoji: "🛒", action: () => onNavigate("cart"),
              badge: totalItems > 0 ? totalItems : null },
            { label: "Our Menu",    emoji: "☕", action: () => onNavigate("menu") },
            { label: "Find Us",     emoji: "📍", action: () => {} },
          ].map(({ label, emoji, action, badge }) => (
            <button key={label} onClick={action}
              className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-xl">{emoji}</span>
              <span className="text-white font-medium text-sm flex-1">{label}</span>
              {badge && (
                <span className="w-5 h-5 rounded-full bg-[#b8860b] text-white text-[10px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* About the shop */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3">About Daily Dose</p>
          <p className="text-white/60 text-xs leading-relaxed">
            Daily Dose is a handcrafted coffee cart in Gingoog City serving premium iced coffees, non-coffee drinks, refreshing sodas, and freshly baked desserts.
          </p>
          <div className="mt-3 space-y-2">
            {[
              { icon: "📍", text: "Brgy Anakan Purok Almaciga, Gingoog City" },
              { icon: "🕐", text: "Mon–Fri · 6:00 PM – 12:00 AM" },
              { icon: "📞", text: "09944525434" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <span className="text-sm">{icon}</span>
                <span className="text-white/50 text-xs">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.15) 0%, rgba(184,134,11,0.05) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          <p className="text-white font-semibold text-sm mb-0.5">🎉 Get 15% Off</p>
          <p className="text-white/45 text-xs mb-3">Subscribe to our newsletter for exclusive deals.</p>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 bg-transparent text-white text-xs outline-none placeholder-white/25" />
            </div>
            <button onClick={handleSubscribe}
              className="bg-[#b8860b] text-white text-xs font-bold px-4 py-2 rounded-xl flex-shrink-0">
              Join
            </button>
          </div>
          {subStatus === "success" && <p className="text-green-400 text-xs mt-2">🎉 Subscribed! Check your email.</p>}
          {subStatus === "error"   && <p className="text-red-400 text-xs mt-2">Please enter a valid email.</p>}
        </div>

        {/* App info */}
        <div className="text-center py-2">
          <p className="text-white/20 text-[10px]">Daily Dose Coffee App · v1.0.0</p>
          <p className="text-white/15 text-[10px] mt-0.5">Made with ☕ in the Philippines</p>
        </div>

      </div>
    </div>
  );
}

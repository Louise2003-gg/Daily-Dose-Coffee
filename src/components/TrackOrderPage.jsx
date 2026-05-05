import { useState } from "react";
import Navbar from "./Navbar";
import bgImage from "../assets/background.png";

/* ── Order status steps ── */
const STEPS = [
  {
    key: "confirmed",
    label: "Order Confirmed",
    desc: "We've received your order and it's being reviewed.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: "preparing",
    label: "Preparing Your Order",
    desc: "Our barista is crafting your drinks with care.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    key: "ready",
    label: "Ready for Pickup / On the Way",
    desc: "Your order is ready! Come pick it up or wait for delivery.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    key: "delivered",
    label: "Delivered",
    desc: "Enjoy your Daily Dose! Thank you for your order.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
];

/* ── Mock order data ── */
const MOCK_ORDERS = {
  "DD-001": {
    id: "DD-001",
    date: "May 6, 2026",
    time: "7:42 PM",
    status: "preparing",
    payment: "GCash",
    items: [
      { name: "Classic Iced Coffee", size: "22oz", milk: "Fresh Milk", price: 79, qty: 2 },
      { name: "Chocolate Chip Cookie", size: null, milk: null, price: 55, qty: 1 },
    ],
    address: "Brgy Anakan Purok Almaciga, Gingoog City",
    estimatedTime: "15–20 mins",
  },
  "DD-002": {
    id: "DD-002",
    date: "May 6, 2026",
    time: "6:15 PM",
    status: "delivered",
    payment: "Cash on Delivery",
    items: [
      { name: "Matcha Latte", size: "16oz", milk: "Full Cream Milk", price: 49, qty: 1 },
      { name: "Taro Milk Tea", size: "22oz", milk: "Fresh Milk", price: 79, qty: 1 },
    ],
    address: "Gingoog City",
    estimatedTime: "Delivered",
  },
};

/* ── Step tracker component ── */
function StatusTracker({ status }) {
  const currentIdx = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-5 top-5 bottom-5 w-px bg-white/10" />
      <div
        className="absolute left-5 top-5 w-px bg-[#b8860b] transition-all duration-700"
        style={{ height: `${(currentIdx / (STEPS.length - 1)) * 100}%` }}
      />

      <div className="flex flex-col gap-6">
        {STEPS.map((step, i) => {
          const done    = i <= currentIdx;
          const current = i === currentIdx;
          return (
            <div key={step.key} className="flex items-start gap-4 relative z-10">
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500
                  ${done
                    ? current
                      ? "bg-[#b8860b] text-white shadow-lg shadow-[#b8860b]/40"
                      : "bg-[#b8860b]/80 text-white"
                    : "bg-white/5 border border-white/15 text-white/25"}`}
                style={current ? { animation: "stat-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" } : {}}
              >
                {step.icon}
              </div>

              {/* Text */}
              <div className="pt-1.5">
                <p className={`text-sm font-semibold transition-colors ${done ? "text-white" : "text-white/30"}`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5 transition-colors ${current ? "text-[#b8860b]" : done ? "text-white/45" : "text-white/20"}`}>
                  {current ? step.desc : done ? "Completed" : "Pending"}
                </p>
              </div>

              {/* Current badge */}
              {current && (
                <span className="ml-auto flex-shrink-0 mt-1 text-xs font-bold text-[#b8860b] bg-[#b8860b]/15 border border-[#b8860b]/30 px-2.5 py-1 rounded-full">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function TrackOrderPage({ onNavigate }) {
  const [orderId, setOrderId]   = useState("");
  const [order, setOrder]       = useState(null);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = () => {
    const trimmed = orderId.trim().toUpperCase();
    if (!trimmed) { setError("Please enter your order ID."); return; }
    setError("");
    setLoading(true);
    setSearched(false);

    // Simulate a network lookup
    setTimeout(() => {
      const found = MOCK_ORDERS[trimmed];
      setOrder(found ?? null);
      setSearched(true);
      setLoading(false);
      if (!found) setError("No order found with that ID. Please check and try again.");
    }, 900);
  };

  const totalPrice = order
    ? order.items.reduce((sum, i) => sum + i.price * i.qty, 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#0d0d0d] relative font-poppins page-fade-in">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={bgImage} alt="" className="w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(184,134,11,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(184,134,11,0.05) 0%, transparent 55%)" }}
        />
      </div>

      <Navbar onNavigate={onNavigate} currentPage="track" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-20">

        {/* Header */}
        <div className="mb-10" style={{ animation: "cart-row-in 0.5s ease both" }}>
          <p className="text-[#b8860b] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Real-time Updates</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl mb-2">Track Your Order</h1>
          <p className="text-white/40 text-sm">Enter your order ID to see the live status of your Daily Dose order.</p>
        </div>

        {/* Search box */}
        <div
          className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-sm"
          style={{ animation: "cart-row-in 0.5s ease 0.1s both" }}
        >
          <label className="block text-white/50 text-xs font-semibold tracking-widest uppercase mb-3">
            Order ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 border border-white/15 hover:border-white/25 focus-within:border-[#b8860b] transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <input
                type="text"
                value={orderId}
                onChange={(e) => { setOrderId(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="e.g. DD-001"
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25"
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-[#b8860b] hover:bg-yellow-600 disabled:bg-[#b8860b]/50 text-white font-bold text-sm px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 flex-shrink-0"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              )}
              {loading ? "Searching…" : "Track Order"}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-xs mt-3 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
          <p className="text-white/20 text-xs mt-3">
            💡 Try <span className="text-[#b8860b]/60 font-mono">DD-001</span> or <span className="text-[#b8860b]/60 font-mono">DD-002</span> as demo order IDs.
          </p>
        </div>

        {/* Order result */}
        {searched && order && (
          <div style={{ animation: "cart-row-in 0.5s ease both" }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Left — status tracker */}
              <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                {/* Order header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Order ID</p>
                    <p className="font-playfair text-white text-2xl">{order.id}</p>
                    <p className="text-white/35 text-xs mt-1">{order.date} · {order.time}</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold border
                    ${order.status === "delivered"
                      ? "bg-green-500/15 border-green-500/30 text-green-400"
                      : order.status === "ready"
                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                      : "bg-[#b8860b]/15 border-[#b8860b]/30 text-[#b8860b]"}`}>
                    {STEPS.find(s => s.key === order.status)?.label}
                  </div>
                </div>

                {/* Status tracker */}
                <StatusTracker status={order.status} />

                {/* Estimated time */}
                {order.status !== "delivered" && (
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#b8860b]/15 border border-[#b8860b]/25 flex items-center justify-center text-[#b8860b] flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Estimated Time</p>
                      <p className="text-white font-semibold text-sm">{order.estimatedTime}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right — order summary */}
              <div className="lg:col-span-2 flex flex-col gap-4">

                {/* Items */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                  <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Order Items</p>
                  <div className="flex flex-col gap-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{item.name}</p>
                          <div className="flex gap-1.5 mt-0.5 flex-wrap">
                            {item.size && <span className="text-white/35 text-xs bg-white/8 rounded-full px-2 py-0.5">{item.size}</span>}
                            {item.milk && <span className="text-white/35 text-xs bg-white/8 rounded-full px-2 py-0.5">{item.milk}</span>}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-amber-400 text-sm font-bold">₱{item.price * item.qty}</p>
                          <p className="text-white/30 text-xs">×{item.qty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
                    <span className="text-white/50 text-sm">Total</span>
                    <span className="text-amber-400 font-bold">₱{totalPrice}</span>
                  </div>
                </div>

                {/* Delivery info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                  <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Delivery Info</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[#b8860b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <p className="text-white/60 text-xs leading-relaxed">{order.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-[#b8860b] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                      <p className="text-white/60 text-xs">{order.payment}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => onNavigate?.("menu")}
                  className="w-full bg-[#b8860b]/15 hover:bg-[#b8860b]/25 border border-[#b8860b]/30 text-[#b8860b] font-semibold text-sm py-3 rounded-xl transition-colors"
                >
                  Order Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty state — after search with no result */}
        {searched && !order && !error && (
          <div className="text-center py-16" style={{ animation: "cart-row-in 0.5s ease both" }}>
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-white/50 text-sm">No order found. Double-check your order ID.</p>
          </div>
        )}

        {/* Initial state — before any search */}
        {!searched && !loading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2"
            style={{ animation: "cart-row-in 0.5s ease 0.2s both" }}
          >
            {[
              { icon: "☕", title: "Live Status", desc: "See exactly where your order is in real time." },
              { icon: "🔔", title: "Step by Step", desc: "Track every stage from confirmation to delivery." },
              { icon: "📍", title: "Delivery Info", desc: "View your address and payment method at a glance." },
            ].map(({ icon, title, desc }) => (
              <div key={title}
                className="bg-white/5 border border-white/8 rounded-2xl p-5 text-center"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="text-2xl mb-3">{icon}</div>
                <p className="text-white font-semibold text-sm mb-1">{title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

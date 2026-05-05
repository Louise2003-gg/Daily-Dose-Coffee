import { useState } from "react";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import bgImage from "../assets/background.png";

/* ── Status steps ── */
const STEPS = [
  {
    key: "confirmed",
    label: "Order Confirmed",
    desc: "We've received your order and it's being reviewed.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: "preparing",
    label: "Preparing Your Order",
    desc: "Our barista is crafting your drinks with care.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    key: "ready",
    label: "Ready for Pickup",
    desc: "Your order is ready! Come pick it up or wait for delivery.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    key: "delivered",
    label: "Delivered",
    desc: "Enjoy your Daily Dose! Thank you for your order.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
];

const STATUS_COLOR = {
  confirmed: "text-yellow-400 bg-yellow-400/10 border-yellow-400/25",
  preparing: "text-orange-400 bg-orange-400/10 border-orange-400/25",
  ready:     "text-blue-400 bg-blue-400/10 border-blue-400/25",
  delivered: "text-green-400 bg-green-400/10 border-green-400/25",
};

/* ── Status tracker ── */
function StatusTracker({ status }) {
  const currentIdx = STEPS.findIndex((s) => s.key === status);
  return (
    <div className="relative">
      <div className="absolute left-5 top-5 bottom-5 w-px bg-white/10" />
      <div
        className="absolute left-5 top-5 w-px bg-[#b8860b] transition-all duration-700"
        style={{ height: `${(currentIdx / (STEPS.length - 1)) * 100}%` }}
      />
      <div className="flex flex-col gap-5">
        {STEPS.map((step, i) => {
          const done    = i <= currentIdx;
          const current = i === currentIdx;
          return (
            <div key={step.key} className="flex items-start gap-4 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500
                  ${done
                    ? current ? "bg-[#b8860b] text-white shadow-lg shadow-[#b8860b]/40" : "bg-[#b8860b]/70 text-white"
                    : "bg-white/5 border border-white/15 text-white/25"}`}
                style={current ? { animation: "stat-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" } : {}}
              >
                {step.icon}
              </div>
              <div className="pt-1.5 flex-1">
                <p className={`text-sm font-semibold ${done ? "text-white" : "text-white/30"}`}>{step.label}</p>
                <p className={`text-xs mt-0.5 ${current ? "text-[#b8860b]" : done ? "text-white/40" : "text-white/20"}`}>
                  {current ? step.desc : done ? "Completed" : "Pending"}
                </p>
              </div>
              {current && (
                <span className="flex-shrink-0 mt-1 text-xs font-bold text-[#b8860b] bg-[#b8860b]/15 border border-[#b8860b]/30 px-2.5 py-1 rounded-full">
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

/* ── Order detail modal / expanded view ── */
function OrderDetail({ order, onClose, onNavigate }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ background: "rgba(20,14,6,0.97)", border: "1px solid rgba(184,134,11,0.25)", animation: "cart-row-in 0.3s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-white/10"
          style={{ background: "rgba(20,14,6,0.97)" }}>
          <div>
            <p className="text-[#b8860b] text-xs font-semibold tracking-widest uppercase">Order Details</p>
            <h2 className="font-playfair text-white text-2xl mt-0.5">{order.id}</h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Status tracker */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-5">Order Status</p>
            <StatusTracker status={order.status} />
          </div>

          {/* Items */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Items Ordered</p>
            <div className="flex flex-col gap-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  {item.img && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{item.name}</p>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {item.size && <span className="text-white/40 text-xs bg-white/8 rounded-full px-2 py-0.5">{item.size}</span>}
                      {item.milk && <span className="text-white/40 text-xs bg-white/8 rounded-full px-2 py-0.5">{item.milk}</span>}
                      <span className="text-white/40 text-xs bg-white/8 rounded-full px-2 py-0.5">×{item.qty}</span>
                    </div>
                  </div>
                  <p className="text-amber-400 font-bold text-sm flex-shrink-0">₱{item.price * item.qty}</p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white/80">₱{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Delivery Fee</span>
                <span className="text-white/80">₱{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-white/10">
                <span className="text-white">Total</span>
                <span className="text-amber-400 text-lg">₱{order.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery & payment info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">Customer</p>
              <p className="text-white text-sm font-medium">{order.customerName}</p>
              <p className="text-white/50 text-xs mt-1">{order.phone}</p>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">{order.address}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">Payment</p>
              <p className="text-white text-sm font-medium">{order.paymentMethod === "cod" ? "Cash on Delivery"
                : order.paymentMethod === "gcash" ? "GCash"
                : order.paymentMethod === "paymaya" ? "PayMaya"
                : "Pay on Pickup"}</p>
              <p className="text-white/50 text-xs mt-1">{order.date} · {order.time}</p>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={() => { onClose(); onNavigate?.("menu"); }}
            className="w-full bg-[#b8860b] hover:bg-yellow-600 text-white font-bold text-sm py-3.5 rounded-2xl transition-colors"
          >
            Order Again
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Order card (list item) ── */
function OrderCard({ order, onClick, index }) {
  const firstItem  = order.items[0];
  const moreCount  = order.items.length - 1;
  const statusStep = STEPS.find((s) => s.key === order.status);

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#b8860b]/40 hover:bg-white/8 transition-all duration-200 group"
      style={{ animation: `cart-row-in 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both` }}
    >
      <div className="flex items-center gap-4">
        {/* First item image */}
        {firstItem?.img && (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
            <img src={firstItem.img} alt={firstItem.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-white font-semibold text-sm truncate">
              {firstItem?.name}
              {moreCount > 0 && <span className="text-white/40 ml-1">+{moreCount} more</span>}
            </p>
            <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${STATUS_COLOR[order.status]}`}>
              {statusStep?.label}
            </span>
          </div>
          <p className="text-white/40 text-xs">{order.date} · {order.time}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-white/40 text-xs">{order.id} · {order.items.reduce((s, i) => s + i.qty, 0)} item{order.items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}</p>
            <p className="text-amber-400 font-bold text-sm">₱{order.total}</p>
          </div>
        </div>

        {/* Arrow */}
        <svg className="w-4 h-4 text-white/25 group-hover:text-[#b8860b] transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </button>
  );
}

/* ── Main page ── */
export default function TrackOrderPage({ onNavigate }) {
  const { orderHistory } = useCart();
  const [selected, setSelected] = useState(null);

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

      <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-20">

        {/* Header */}
        <div className="mb-8" style={{ animation: "cart-row-in 0.5s ease both" }}>
          <p className="text-[#b8860b] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Real-time Updates</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl mb-2">Track Your Order</h1>
          <p className="text-white/40 text-sm">
            {orderHistory.length > 0
              ? "Tap any order below to see its full details and live status."
              : "Your placed orders will appear here after checkout."}
          </p>
        </div>

        {/* Order list */}
        {orderHistory.length > 0 ? (
          <div className="flex flex-col gap-3">
            {orderHistory.map((order, i) => (
              <OrderCard
                key={order.id}
                order={order}
                index={i}
                onClick={() => setSelected(order)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            style={{ animation: "cart-row-in 0.5s ease 0.1s both" }}
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
              <svg className="w-9 h-9 text-white/15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h2 className="font-playfair text-white text-2xl mb-2">No orders yet</h2>
            <p className="text-white/35 text-sm mb-8 max-w-xs leading-relaxed">
              Once you place an order through the cart, it will show up here with live status updates.
            </p>
            <button
              onClick={() => onNavigate?.("menu")}
              className="bg-[#b8860b] hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Browse Menu
            </button>
          </div>
        )}
      </div>

      {/* Order detail modal */}
      {selected && (
        <OrderDetail
          order={selected}
          onClose={() => setSelected(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

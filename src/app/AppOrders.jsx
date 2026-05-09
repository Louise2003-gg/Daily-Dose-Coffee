import { useState } from "react";
import { useCart } from "../context/CartContext";

const STEPS = [
  { key: "confirmed", label: "Confirmed",  color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-400/25" },
  { key: "preparing", label: "Preparing",  color: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/25" },
  { key: "ready",     label: "Ready",      color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/25"    },
  { key: "delivered", label: "Delivered",  color: "text-green-400",   bg: "bg-green-400/10 border-green-400/25"  },
  { key: "cancelled", label: "Cancelled",  color: "text-red-400",     bg: "bg-red-400/10 border-red-400/25"      },
];

const STEP_FLOW = ["confirmed", "preparing", "ready", "delivered"];

function StatusBadge({ status }) {
  const s = STEPS.find((x) => x.key === status) ?? STEPS[0];
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg}`}>
      {s.label}
    </span>
  );
}

function StatusTracker({ status }) {
  if (status === "cancelled") return (
    <div className="flex items-center gap-2 py-2">
      <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <p className="text-red-400 text-sm font-medium">Order Cancelled</p>
    </div>
  );

  const currentIdx = STEP_FLOW.indexOf(status);
  return (
    <div className="flex items-center gap-1 py-2">
      {STEP_FLOW.map((step, i) => {
        const done    = i <= currentIdx;
        const current = i === currentIdx;
        const s       = STEPS.find((x) => x.key === step);
        return (
          <div key={step} className="flex items-center flex-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all
              ${done ? "bg-[#b8860b]" : "bg-white/10 border border-white/15"}`}
              style={current ? { boxShadow: "0 0 8px rgba(184,134,11,0.5)" } : {}}>
              {done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>}
            </div>
            {i < STEP_FLOW.length - 1 && (
              <div className={`flex-1 h-0.5 mx-0.5 rounded-full transition-all ${i < currentIdx ? "bg-[#b8860b]" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order, onSelect }) {
  const first = order.items[0];
  const more  = order.items.length - 1;

  return (
    <button onClick={() => onSelect(order)}
      className="w-full text-left rounded-2xl p-4 mb-3 transition-all duration-200 active:scale-98"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", animation: "cart-row-in 0.35s ease both" }}>
      <div className="flex items-start gap-3">
        {first?.img && (
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
            <img src={first.img} alt={first.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-white font-semibold text-sm truncate">
              {first?.name}{more > 0 && <span className="text-white/35 ml-1 text-xs">+{more} more</span>}
            </p>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-white/35 text-xs">{order.id} · {order.date}</p>
          <div className="flex items-center justify-between mt-2">
            <StatusTracker status={order.status} />
            <p className="text-amber-400 font-bold text-sm flex-shrink-0 ml-2">₱{order.total}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function OrderDetail({ order, onClose, onCancel }) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const canCancel = order.status === "confirmed" || order.status === "preparing";

  return (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
      <div className="flex-1" onClick={onClose} />
      <div className="rounded-t-3xl overflow-hidden max-h-[88vh] flex flex-col"
        style={{ background: "#0d0b08", border: "1px solid rgba(184,134,11,0.2)", animation: "slideInBottom 0.3s ease both" }}>

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <div>
            <p className="text-[#b8860b] text-xs font-semibold tracking-widest uppercase">Order Details</p>
            <p className="font-playfair text-white text-xl mt-0.5">{order.id}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">

          {/* Status tracker */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3">Status</p>
            <StatusTracker status={order.status} />
            <div className="flex justify-between mt-2">
              {["Confirmed", "Preparing", "Ready", "Delivered"].map((l) => (
                <p key={l} className="text-white/30 text-[9px] text-center flex-1">{l}</p>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3">Items</p>
            <div className="flex flex-col gap-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.img && <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name}</p>
                    <div className="flex gap-1.5 mt-0.5 flex-wrap">
                      {item.size && <span className="text-white/35 text-[10px] bg-white/8 rounded-full px-2 py-0.5">{item.size}</span>}
                      {item.milk && <span className="text-white/35 text-[10px] bg-white/8 rounded-full px-2 py-0.5">{item.milk}</span>}
                      <span className="text-white/35 text-[10px] bg-white/8 rounded-full px-2 py-0.5">×{item.qty}</span>
                    </div>
                  </div>
                  <p className="text-amber-400 font-bold text-sm flex-shrink-0">₱{item.price * item.qty}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/8 mt-3 pt-3 space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-white/45">Subtotal</span><span className="text-white/70">₱{order.subtotal}</span></div>
              <div className="flex justify-between text-xs"><span className="text-white/45">Delivery</span><span className="text-white/70">₱{order.deliveryFee}</span></div>
              <div className="flex justify-between font-bold pt-1 border-t border-white/8">
                <span className="text-white text-sm">Total</span>
                <span className="text-amber-400 text-base">₱{order.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3">Delivery Info</p>
            <p className="text-white text-sm font-medium">{order.customerName}</p>
            <p className="text-white/45 text-xs mt-0.5">{order.phone}</p>
            <p className="text-white/45 text-xs mt-0.5">{order.address}</p>
            <p className="text-white/35 text-xs mt-1">
              {order.paymentMethod === "cod" ? "Cash on Delivery"
                : order.paymentMethod === "gcash" ? "GCash"
                : order.paymentMethod === "paymaya" ? "PayMaya"
                : "Pay on Pickup"}
            </p>
          </div>

          {/* Cancel */}
          {canCancel && !confirmCancel && (
            <button onClick={() => setConfirmCancel(true)}
              className="w-full py-3 rounded-2xl text-sm font-semibold text-red-400 border border-red-500/20 bg-red-500/8">
              Cancel Order
            </button>
          )}
          {confirmCancel && (
            <div className="rounded-2xl p-4 border border-red-500/20 bg-red-500/8">
              <p className="text-white text-sm font-semibold text-center mb-1">Cancel this order?</p>
              <p className="text-white/40 text-xs text-center mb-4">This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmCancel(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white/60 bg-white/8">Keep</button>
                <button onClick={() => { onCancel(order.id); onClose(); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500/80">Yes, Cancel</button>
              </div>
            </div>
          )}
          {!canCancel && order.status !== "cancelled" && (
            <p className="text-white/25 text-xs text-center">Orders that are ready or delivered cannot be cancelled.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AppOrders() {
  const { orderHistory, cancelOrder } = useCart();
  const [selected, setSelected]       = useState(null);

  return (
    <div className="min-h-screen bg-[#0d0b08]">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 pt-14 pb-4"
        style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(20px)" }}>
        <h1 className="font-playfair text-white text-2xl">My Orders</h1>
        <p className="text-white/35 text-xs mt-0.5">
          {orderHistory.length > 0 ? `${orderHistory.length} order${orderHistory.length !== 1 ? "s" : ""}` : "No orders yet"}
        </p>
      </div>

      <div className="px-4 pt-2 pb-4">
        {orderHistory.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
            </div>
            <p className="font-playfair text-white text-xl mb-1">No orders yet</p>
            <p className="text-white/35 text-sm max-w-xs">Place an order from the menu and it will appear here.</p>
          </div>
        ) : (
          orderHistory.map((order) => (
            <OrderCard key={order.id} order={order} onSelect={setSelected} />
          ))
        )}
      </div>

      {selected && (
        <OrderDetail order={selected} onClose={() => setSelected(null)} onCancel={cancelOrder} />
      )}
    </div>
  );
}

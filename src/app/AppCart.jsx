import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const PAYMENT_METHODS = [
  { id: "cod",     label: "Cash on Delivery", emoji: "💵" },
  { id: "gcash",   label: "GCash",            emoji: "📱" },
  { id: "paymaya", label: "PayMaya",           emoji: "💳" },
  { id: "pickup",  label: "Pay on Pickup",     emoji: "🏪" },
];

function SuccessOverlay({ onDone }) {
  const [phase, setPhase] = useState("enter");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(onDone, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", opacity: phase === "hold" ? 1 : 0, transition: "opacity 0.4s ease" }}>
      <div className="relative flex items-center justify-center mb-5">
        <span className="absolute rounded-full border-2 border-yellow-400/30"
          style={{ width: 100, height: 100, animation: phase === "hold" ? "success-ring 1.2s ease-out infinite" : "none" }} />
        <div className="w-16 h-16 rounded-full bg-[#b8860b] flex items-center justify-center"
          style={{ transform: phase === "hold" ? "scale(1)" : "scale(0.6)", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>
      <p className="font-playfair text-white text-2xl mb-1"
        style={{ opacity: phase === "hold" ? 1 : 0, transform: phase === "hold" ? "translateY(0)" : "translateY(12px)", transition: "all 0.4s ease 0.1s" }}>
        Order Placed!
      </p>
      <p className="text-white/50 text-sm"
        style={{ opacity: phase === "hold" ? 1 : 0, transition: "all 0.4s ease 0.2s" }}>
        Your coffee is on its way ☕
      </p>
    </div>
  );
}

export default function AppCart({ onNavigate }) {
  const { cartItems, removeFromCart, updateQty, clearCart, totalItems, totalPrice, placeOrder } = useCart();

  const [payment, setPayment]     = useState("cod");
  const [address, setAddress]     = useState({ name: "", phone: "", street: "", city: "" });
  const [errors, setErrors]       = useState({});
  const [btnState, setBtnState]   = useState("idle");
  const [showSuccess, setSuccess] = useState(false);

  const deliveryFee = totalItems > 0 ? 50 : 0;
  const grandTotal  = totalPrice + deliveryFee;

  const validate = () => {
    const e = {};
    if (!address.name.trim())   e.name   = "Required";
    if (!address.phone.trim())  e.phone  = "Required";
    if (!address.street.trim()) e.street = "Required";
    if (!address.city.trim())   e.city   = "Required";
    return e;
  };

  const handleOrder = () => {
    if (!cartItems.length) return;
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setBtnState("loading");
    setTimeout(() => { placeOrder({ address, paymentMethod: payment }); setBtnState("done"); setSuccess(true); }, 800);
  };

  const handleDone = () => { clearCart(); onNavigate("orders"); };

  if (totalItems === 0 && !showSuccess) return (
    <div className="min-h-screen bg-[#0d0b08] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
      </div>
      <p className="font-playfair text-white text-xl mb-1">Your cart is empty</p>
      <p className="text-white/35 text-sm mb-6">Add some drinks from the menu to get started.</p>
      <button onClick={() => onNavigate("menu")} className="bg-[#b8860b] text-white font-semibold px-8 py-3 rounded-full text-sm">
        Browse Menu
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0b08]">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 pt-14 pb-4"
        style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(20px)" }}>
        <h1 className="font-playfair text-white text-2xl">Your Cart</h1>
        <p className="text-white/35 text-xs mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
      </div>

      <div className="px-4 pb-6 flex flex-col gap-4">

        {/* Cart items */}
        <div className="flex flex-col gap-2.5">
          {cartItems.map((item, i) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
            return (
              <div key={item.cartKey} className="flex items-center gap-3 rounded-2xl p-3"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", animation: `cart-row-in 0.35s ease ${i * 0.05}s both` }}>
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                  <div className="flex gap-1.5 mt-0.5 flex-wrap">
                    {item.size && <span className="text-white/35 text-[10px] bg-white/8 rounded-full px-2 py-0.5">{item.size}</span>}
                    {item.milk && <span className="text-white/35 text-[10px] bg-white/8 rounded-full px-2 py-0.5">{item.milk}</span>}
                  </div>
                  <p className="text-amber-400 font-bold text-xs mt-1">₱{price * item.qty}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => updateQty(item.cartKey, -1)}
                    className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                  </button>
                  <span className="text-white font-bold text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.cartKey, 1)}
                    className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  </button>
                  <button onClick={() => removeFromCart(item.cartKey)}
                    className="w-7 h-7 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center ml-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery address */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3">Delivery Address</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { f: "name",   label: "Full Name",      ph: "Your name",       full: false },
              { f: "phone",  label: "Phone",           ph: "09XX-XXX-XXXX",   full: false },
              { f: "street", label: "Street / Area",  ph: "Street address",  full: true  },
              { f: "city",   label: "City",            ph: "Gingoog City",    full: false },
            ].map(({ f, label, ph, full }) => (
              <div key={f} className={full ? "col-span-2" : ""}>
                <label className="text-white/40 text-[10px] mb-1 block">{label}</label>
                <input type="text" value={address[f]} placeholder={ph}
                  onChange={(e) => { setAddress((p) => ({ ...p, [f]: e.target.value })); setErrors((p) => ({ ...p, [f]: undefined })); }}
                  className={`w-full rounded-xl px-3 py-2 text-white text-xs outline-none placeholder-white/20 transition-colors
                    ${errors[f] ? "border border-red-500/50" : "border border-white/10 focus:border-[#b8860b]"}`}
                  style={{ background: "rgba(255,255,255,0.06)" }} />
                {errors[f] && <p className="text-red-400 text-[10px] mt-0.5">{errors[f]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3">Payment Method</p>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map(({ id, label, emoji }) => (
              <button key={id} onClick={() => setPayment(id)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-200
                  ${payment === id ? "border-[#b8860b] bg-[#b8860b]/12 text-white" : "border-white/10 text-white/45"}`}
                style={payment !== id ? { background: "rgba(255,255,255,0.04)" } : {}}>
                <span className="text-base">{emoji}</span>
                <span className="text-xs font-medium leading-tight">{label}</span>
                {payment === id && (
                  <span className="ml-auto w-4 h-4 rounded-full bg-[#b8860b] flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3">Order Summary</p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs"><span className="text-white/45">Subtotal</span><span className="text-white/70">₱{totalPrice}</span></div>
            <div className="flex justify-between text-xs"><span className="text-white/45">Delivery Fee</span><span className="text-white/70">₱{deliveryFee}</span></div>
            <div className="flex justify-between font-bold pt-2 border-t border-white/8">
              <span className="text-white">Total</span>
              <span className="text-amber-400 text-base">₱{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Place order */}
        <button onClick={handleOrder} disabled={btnState !== "idle"}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
            ${btnState === "idle" ? "bg-[#b8860b] text-white" : "bg-[#b8860b]/50 text-white/60 cursor-not-allowed"}`}>
          {btnState === "loading" ? (
            <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Placing Order…</>
          ) : btnState === "done" ? "Order Placed ✓" : <>Place Order <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></>}
        </button>
      </div>

      {showSuccess && <SuccessOverlay onDone={handleDone} />}
    </div>
  );
}

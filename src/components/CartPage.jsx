import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    id: "gcash",
    label: "GCash",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    id: "paymaya",
    label: "PayMaya",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    id: "pickup",
    label: "Pay on Pickup",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
];

/* ── Success overlay ─────────────────────────────────────── */
function SuccessOverlay({ onDone }) {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(onDone, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(8px)",
        opacity: phase === "hold" ? 1 : 0,
        transition: "opacity 0.45s ease",
      }}
    >
      {/* Animated ring */}
      <div className="relative flex items-center justify-center mb-6">
        <span
          className="absolute rounded-full border-2 border-yellow-400/40"
          style={{
            width: 120, height: 120,
            animation: phase === "hold" ? "success-ring 1.2s ease-out infinite" : "none",
          }}
        />
        <span
          className="absolute rounded-full border border-yellow-400/20"
          style={{
            width: 150, height: 150,
            animation: phase === "hold" ? "success-ring 1.2s ease-out 0.3s infinite" : "none",
          }}
        />
        <div
          className="w-20 h-20 rounded-full bg-[#b8860b] flex items-center justify-center"
          style={{
            transform: phase === "hold" ? "scale(1)" : "scale(0.6)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <h2
        className="font-playfair text-white text-3xl mb-2"
        style={{
          transform: phase === "hold" ? "translateY(0)" : "translateY(16px)",
          opacity: phase === "hold" ? 1 : 0,
          transition: "all 0.5s ease 0.15s",
        }}
      >
        Order Placed!
      </h2>
      <p
        className="text-white/60 text-sm font-poppins"
        style={{
          transform: phase === "hold" ? "translateY(0)" : "translateY(12px)",
          opacity: phase === "hold" ? 1 : 0,
          transition: "all 0.5s ease 0.25s",
        }}
      >
        Your coffee is on its way ☕
      </p>
    </div>
  );
}

/* ── Cart item row ───────────────────────────────────────── */
function CartItemRow({ item, index }) {
  const { removeFromCart, updateQty } = useCart();
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeFromCart(item.cartKey), 320);
  };

  const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
      style={{
        animation: `cart-row-in 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s both`,
        opacity: removing ? 0 : 1,
        transform: removing ? "translateX(40px) scale(0.95)" : "translateX(0) scale(1)",
        transition: removing ? "all 0.3s ease" : "none",
      }}
    >
      {/* Image */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-playfair text-white text-base leading-tight truncate">{item.name}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs text-white/50 bg-white/10 rounded-full px-2 py-0.5">{item.size}</span>
          {item.milk && (
            <span className="text-xs text-white/50 bg-white/10 rounded-full px-2 py-0.5">{item.milk}</span>
          )}
        </div>
        <p className="text-[#b8860b] font-bold text-sm mt-1">₱{price * item.qty}</p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => updateQty(item.cartKey, -1)}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <span className="text-white font-bold text-sm w-5 text-center">{item.qty}</span>
        <button
          onClick={() => updateQty(item.cartKey, 1)}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
          </svg>
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={handleRemove}
        className="w-7 h-7 rounded-full bg-red-500/15 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-colors flex-shrink-0"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/* ── Main CartPage ───────────────────────────────────────── */
export default function CartPage({ onNavigate, previousPage = "home" }) {
  const { cartItems, clearCart, totalItems, totalPrice, placeOrder } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress]             = useState({ name: "", phone: "", street: "", city: "" });
  const [errors, setErrors]               = useState({});
  const [showSuccess, setShowSuccess]     = useState(false);
  const [btnState, setBtnState]           = useState("idle"); // idle | loading | done

  const validate = () => {
    const e = {};
    if (!address.name.trim())   e.name   = "Name is required";
    if (!address.phone.trim())  e.phone  = "Phone number is required";
    if (!address.street.trim()) e.street = "Street address is required";
    if (!address.city.trim())   e.city   = "City is required";
    return e;
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setBtnState("loading");
    setTimeout(() => {
      placeOrder({ address, paymentMethod });
      setBtnState("done");
      setShowSuccess(true);
    }, 800);
  };

  const handleSuccessDone = () => {
    clearCart();
    onNavigate?.(previousPage);
  };

  const handleInput = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const deliveryFee = totalItems > 0 ? 50 : 0;
  const grandTotal  = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-[#0d0d0d] relative">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(184,134,11,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(184,134,11,0.04) 0%, transparent 60%)" }}
      />

      <Navbar onNavigate={onNavigate} currentPage="cart" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20">

        {/* Header */}
        <div className="mb-10" style={{ animation: "cart-row-in 0.5s ease both" }}>
          <h1 className="font-playfair text-white text-3xl sm:text-4xl md:text-5xl">Your Cart</h1>
          <p className="text-white/40 text-sm mt-1 font-poppins">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} selected`}
          </p>
        </div>

        {totalItems === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center"
            style={{ animation: "cart-row-in 0.5s ease 0.1s both" }}>
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </div>
            <h2 className="font-playfair text-white text-2xl mb-2">Nothing here yet</h2>
            <p className="text-white/40 text-sm mb-8">Add some items from our menu to get started.</p>
            <button
              onClick={() => onNavigate?.("menu")}
              className="bg-[#b8860b] hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

            {/* ── Left: Cart items + Checkout form ── */}
            <div className="lg:col-span-3 flex flex-col gap-6">

              {/* Cart items */}
              <div>
                <h2 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-4">
                  Order Items
                </h2>
                <div className="flex flex-col gap-3">
                  {cartItems.map((item, i) => (
                    <CartItemRow key={item.cartKey} item={item} index={i} />
                  ))}
                </div>
              </div>

              {/* Delivery address */}
              <div
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                style={{ animation: "cart-row-in 0.5s ease 0.2s both" }}
              >
                <h2 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">
                  Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: "name",   label: "Full Name",       placeholder: "e.g. Ali Hassan",          type: "text" },
                    { field: "phone",  label: "Phone Number",    placeholder: "e.g. 0300-1234567",        type: "tel"  },
                    { field: "street", label: "Street Address",  placeholder: "House / Street / Area",    type: "text", full: true },
                    { field: "city",   label: "City",            placeholder: "e.g. Karachi",             type: "text" },
                  ].map(({ field, label, placeholder, type, full }) => (
                    <div key={field} className={full ? "sm:col-span-2" : ""}>
                      <label className="block text-white/50 text-xs mb-1.5 font-medium">{label}</label>
                      <input
                        type={type}
                        value={address[field]}
                        onChange={(e) => handleInput(field, e.target.value)}
                        placeholder={placeholder}
                        className={`w-full bg-white/8 border rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 outline-none transition-all duration-200
                          focus:border-[#b8860b] focus:bg-white/10
                          ${errors[field] ? "border-red-500/60" : "border-white/15 hover:border-white/25"}`}
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                      {errors[field] && (
                        <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                style={{ animation: "cart-row-in 0.5s ease 0.3s both" }}
              >
                <h2 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {PAYMENT_METHODS.map((method) => {
                    const active = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200
                          ${active
                            ? "border-[#b8860b] bg-[#b8860b]/15 text-white"
                            : "border-white/10 bg-white/5 text-white/50 hover:border-white/25 hover:text-white/80"}`}
                      >
                        <span className={active ? "text-[#b8860b]" : ""}>{method.icon}</span>
                        <span className="text-sm font-medium leading-tight">{method.label}</span>
                        {active && (
                          <span className="ml-auto w-4 h-4 rounded-full bg-[#b8860b] flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right: Order summary ── */}
            <div className="lg:col-span-2">
              <div
                className="lg:sticky lg:top-28 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm"
                style={{ animation: "cart-row-in 0.5s ease 0.15s both" }}
              >
                <h2 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">
                  Order Summary
                </h2>

                {/* Item breakdown */}
                <div className="flex flex-col gap-2.5 mb-5">
                  {cartItems.map((item) => {
                    const p = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
                    return (
                      <div key={item.cartKey} className="flex items-center justify-between">
                        <span className="text-white/60 text-sm truncate max-w-[160px]">
                          {item.name}
                          <span className="text-white/30 ml-1">×{item.qty}</span>
                        </span>
                        <span className="text-white/80 text-sm font-medium flex-shrink-0">₱{p * item.qty}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mb-4" />

                {/* Totals */}
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white/80">₱{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Delivery Fee</span>
                    <span className="text-white/80">₱{deliveryFee}</span>
                  </div>
                  <div className="border-t border-white/10 mt-1 pt-3 flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-[#b8860b] font-bold text-lg">₱{grandTotal}</span>
                  </div>
                </div>

                {/* Place order button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={btnState !== "idle"}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
                    ${btnState === "idle"
                      ? "bg-[#b8860b] hover:bg-yellow-600 text-white"
                      : "bg-[#b8860b]/60 text-white/70 cursor-not-allowed"}`}
                >
                  {btnState === "loading" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Placing Order…
                    </>
                  ) : btnState === "done" ? (
                    "Order Placed ✓"
                  ) : (
                    <>
                      Place Order
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-white/25 text-xs text-center mt-3">
                  By placing your order you agree to our terms of service.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSuccess && <SuccessOverlay onDone={handleSuccessDone} />}
    </div>
  );
}

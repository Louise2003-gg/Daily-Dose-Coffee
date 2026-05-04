import { useState } from "react";

export default function Settings() {
  const [shopName, setShopName]     = useState("Daily Dose Coffee");
  const [address, setAddress]       = useState("Coffee Cart, Butuan City, Agusan del Norte");
  const [phone, setPhone]           = useState("+63 912 345 6789");
  const [email, setEmail]           = useState("hello@dailydose.com");
  const [openTime, setOpenTime]     = useState("07:00");
  const [closeTime, setCloseTime]   = useState("22:00");
  const [saved, setSaved]           = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      <div>
        <h2 className="text-white text-xl font-bold">Settings</h2>
        <p className="text-white/35 text-sm mt-0.5">Manage your shop information</p>
      </div>

      {/* Shop Info */}
      <div className="bg-[#141414] border border-white/8 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-base mb-5">Shop Information</h3>
        <div className="flex flex-col gap-4">
          {[
            { label: "Shop Name",    value: shopName,  set: setShopName },
            { label: "Address",      value: address,   set: setAddress },
            { label: "Phone Number", value: phone,     set: setPhone },
            { label: "Email",        value: email,     set: setEmail },
          ].map(({ label, value, set }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="text-white/50 text-xs font-semibold tracking-widest uppercase">{label}</label>
              <input
                value={value}
                onChange={(e) => set(e.target.value)}
                className="bg-white/6 border border-white/12 hover:border-white/25 focus:border-[#b8860b] rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hours */}
      <div className="bg-[#141414] border border-white/8 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-base mb-5">Opening Hours</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-semibold tracking-widest uppercase">Opens At</label>
            <input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)}
              className="bg-white/6 border border-white/12 hover:border-white/25 focus:border-[#b8860b] rounded-xl px-4 py-3 text-white text-sm outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-semibold tracking-widest uppercase">Closes At</label>
            <input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)}
              className="bg-white/6 border border-white/12 hover:border-white/25 focus:border-[#b8860b] rounded-xl px-4 py-3 text-white text-sm outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* Admin Account */}
      <div className="bg-[#141414] border border-white/8 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-base mb-5">Admin Account</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-semibold tracking-widest uppercase">Username</label>
            <input defaultValue="Admin" readOnly
              className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white/50 text-sm outline-none cursor-not-allowed" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-semibold tracking-widest uppercase">New Password</label>
            <input type="password" placeholder="Leave blank to keep current"
              className="bg-white/6 border border-white/12 hover:border-white/25 focus:border-[#b8860b] rounded-xl px-4 py-3 text-white text-sm outline-none transition-all placeholder-white/25" />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button onClick={handleSave}
          className="bg-[#b8860b] hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm">
          Save Changes
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-green-400 text-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}

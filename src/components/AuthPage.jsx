import { useState } from "react";
import Logo from "../Logo";
import bgImage from "../assets/background.png";
import baristaBg from "../assets/Barista-at-night.png";

function InputField({ label, type = "text", placeholder, value, onChange, icon }) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/60 text-xs font-semibold tracking-widest uppercase">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 bg-white/8 border rounded-xl px-4 py-3 transition-all duration-200
          ${focused ? "border-[#b8860b] bg-white/12" : "border-white/15 hover:border-white/30"}`}
      >
        <span className="text-white/40 flex-shrink-0">{icon}</span>
        <input
          type={isPassword && !showPass ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
          >
            {showPass ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AuthPage({ onNavigate, initialMode = "login" }) {
  const [mode, setMode]           = useState(initialMode);
  const [transitioning, setTrans] = useState(false);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [error, setError]         = useState("");

  const switchMode = (next) => {
    if (next === mode) return;
    setTrans(true);
    setError("");
    setTimeout(() => {
      setMode(next);
      setName(""); setEmail(""); setPassword(""); setConfirm("");
      setTrans(false);
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Admin login check
    if (email.trim() === "Admin" && password === "123456") {
      onNavigate("admin");
      return;
    }
    // Regular user — navigate home (wire real auth later)
    if (email && password) {
      onNavigate("home");
    } else {
      setError("Please enter your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex font-poppins">

      {/* ── LEFT — branding panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={baristaBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-[#b8860b]/30" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <button onClick={() => onNavigate("home")} className="flex items-center gap-3 group">
            <Logo width={52} height={56} />
            <span className="font-lobster text-white text-2xl group-hover:text-yellow-400 transition-colors">
              Daily Dose
            </span>
          </button>
        </div>

        {/* Center quote */}
        <div className="relative z-10">
          <div className="w-10 h-1 bg-[#b8860b] rounded-full mb-6" />
          <blockquote className="font-playfair text-white text-4xl leading-snug mb-4">
            "Every great day<br />starts with a great<br />cup of coffee."
          </blockquote>
          <p className="text-white/50 text-sm">— Daily Dose Philosophy</p>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#b8860b]/60" />
            ))}
          </div>
          <span className="text-white/30 text-xs tracking-widest uppercase">Butuan City, Philippines</span>
        </div>
      </div>

      {/* ── RIGHT — form panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 relative bg-[#0e0a06]">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-5" />
        </div>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 relative z-10">
          <button onClick={() => onNavigate("home")}>
            <Logo width={52} height={56} />
          </button>
        </div>

        <div
          className="relative z-10 w-full max-w-md"
          style={{
            opacity:    transitioning ? 0 : 1,
            transform:  transitioning ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <p className="text-[#b8860b] text-xs font-semibold tracking-widest uppercase mb-2">
              {mode === "login" ? "Welcome Back" : "Join Us"}
            </p>
            <h1 className="font-playfair text-white text-4xl font-bold mb-2">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-white/45 text-sm">
              {mode === "login"
                ? "Enter your credentials to access your account."
                : "Fill in the details below to get started."}
            </p>
          </div>

          {/* Toggle tabs */}
          <div className="flex bg-white/8 rounded-xl p-1 mb-8 border border-white/10">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                  ${mode === m
                    ? "bg-[#b8860b] text-white shadow-lg"
                    : "text-white/50 hover:text-white"}`}
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <InputField
                label="Full Name" placeholder="Your full name"
                value={name} onChange={(e) => setName(e.target.value)}
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
              />
            )}

            <InputField
              label="Email Address" type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
            />

            <InputField
              label="Password" type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>}
            />

            {mode === "signup" && (
              <InputField
                label="Confirm Password" type="password" placeholder="••••••••"
                value={confirm} onChange={(e) => setConfirm(e.target.value)}
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>}
              />
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-[#b8860b] text-xs hover:text-yellow-400 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full bg-[#b8860b] hover:bg-yellow-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#b8860b]/30 active:scale-95 text-sm tracking-wide"
            >
              {mode === "login" ? "Sign In to Daily Dose" : "Create My Account"}
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="flex gap-3">
              {[
                { label: "Google", icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                { label: "Facebook", icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map(({ label, icon }) => (
                <button key={label} type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/8 border border-white/15 hover:border-white/30 hover:bg-white/12 text-white text-sm py-3 rounded-xl transition-all duration-200">
                  {icon}{label}
                </button>
              ))}
            </div>
          </form>

          {/* Switch mode */}
          <p className="text-center text-white/40 text-sm mt-8">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="text-[#b8860b] font-semibold hover:text-yellow-400 transition-colors"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>

          {/* Back to home */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs mt-6 mx-auto transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

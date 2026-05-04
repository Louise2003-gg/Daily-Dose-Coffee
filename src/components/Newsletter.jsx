import { useState } from "react";
import useReveal from "../hooks/useReveal";
import bean1 from "../assets/bean1.png";
import bean2 from "../assets/bean2.png";

export default function Newsletter() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState(null);
  const [ref, visible]      = useReveal(0.2);

  const handleSubscribe = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section ref={ref} className="relative bg-[#b8860b] py-12 sm:py-14 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 opacity-100">
        <img src={bean1} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 opacity-100">
        <img src={bean2} alt="" className="w-full h-full object-cover scale-x-[-1]" />
      </div>
      <div className="relative z-10 text-center px-6">
        <h2
          className={`font-playfair text-white text-2xl sm:text-3xl md:text-4xl mb-2 ${visible ? "reveal-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          Join in and get 15% off!
        </h2>
        <p
          className={`text-white/80 text-sm mb-6 ${visible ? "reveal-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          Subscribe to our newsletter to get 15% off discount code.
        </p>
        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-2 ${visible ? "reveal-up" : "opacity-0"}`}
          style={{ animationDelay: "0.32s" }}
        >
          <div className="flex items-center bg-white rounded-full px-4 py-2 gap-2 w-full max-w-xs sm:w-64">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              className="outline-none text-sm flex-1 text-gray-700 bg-transparent"
            />
          </div>
          <button
            onClick={handleSubscribe}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors w-full max-w-xs sm:w-auto"
          >
            Subscribe
          </button>
        </div>
        {status === "success" && (
          <p className="text-white font-semibold text-sm mt-3">
            🎉 You're subscribed! Check your email for your 15% off code.
          </p>
        )}
        {status === "error" && (
          <p className="text-white/80 text-sm mt-3">Please enter a valid email address.</p>
        )}
      </div>
    </section>
  );
}

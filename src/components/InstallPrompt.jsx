import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [prompt, setPrompt]     = useState(null);
  const [visible, setVisible]   = useState(false);
  const [dismissed, setDismiss] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      // Show after 3s so it doesn't interrupt the intro
      setTimeout(() => setVisible(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setPrompt(null);
  };

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-6 left-4 right-4 z-50 md:left-auto md:right-6 md:w-80"
      style={{ animation: "cart-row-in 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
    >
      <div
        className="rounded-2xl p-4 flex items-center gap-4"
        style={{
          background: "rgba(20,14,6,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(184,134,11,0.35)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,134,11,0.1)",
        }}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#b8860b]/15 border border-[#b8860b]/30 flex items-center justify-center flex-shrink-0 text-xl">
          ☕
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Install Daily Dose</p>
          <p className="text-white/45 text-xs mt-0.5">Add to your home screen for quick access</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="bg-[#b8860b] hover:bg-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            Install
          </button>
          <button
            onClick={() => setDismiss(true)}
            className="text-white/30 hover:text-white/60 text-xs text-center transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

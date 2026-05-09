import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import Intro from "./components/Intro";
import InstallPrompt from "./components/InstallPrompt";
import MobileApp from "./components/MobileApp";
import { CartProvider } from "./context/CartContext";

// Lazy-load all pages for better performance
const LandingPage    = lazy(() => import("./LandingPage"));
const MenuPage       = lazy(() => import("./components/MenuPage"));
const AboutPage      = lazy(() => import("./components/AboutPage"));
const LocationPage   = lazy(() => import("./components/LocationPage"));
const AuthPage       = lazy(() => import("./components/AuthPage"));
const AdminPanel     = lazy(() => import("./admin/AdminPanel"));
const CartPage       = lazy(() => import("./components/CartPage"));
const TrackOrderPage = lazy(() => import("./components/TrackOrderPage"));

/**
 * Returns true ONLY when the app is running as an installed PWA.
 * This is determined by display-mode: standalone (Android/desktop PWA)
 * or navigator.standalone (iOS Safari PWA).
 * It will NEVER return true in a regular browser tab — regardless of screen size.
 */
function checkIsInstalledPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.navigator.standalone === true
  );
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0a06] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#b8860b]/30 border-t-[#b8860b] animate-spin" />
        <p className="text-white/30 text-xs tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro]     = useState(true);
  const [page, setPage]               = useState("home");
  const [prevPage, setPrevPage]       = useState("home");
  const [pageVisible, setPageVisible] = useState(true);

  // isInstalledPWA is set once on mount and only updates if display-mode changes
  // (which only happens when the app is actually installed/uninstalled)
  // Screen size, window resize, and mobile browser do NOT affect this value
  const [isInstalledPWA, setIsInstalledPWA] = useState(() => checkIsInstalledPWA());

  useEffect(() => {
    // Listen for display-mode changes only (not resize)
    const standaloneMQ  = window.matchMedia("(display-mode: standalone)");
    const fullscreenMQ  = window.matchMedia("(display-mode: fullscreen)");

    const update = () => setIsInstalledPWA(checkIsInstalledPWA());

    standaloneMQ.addEventListener("change", update);
    fullscreenMQ.addEventListener("change", update);

    return () => {
      standaloneMQ.removeEventListener("change", update);
      fullscreenMQ.removeEventListener("change", update);
    };
  }, []);

  const navigateTo = (target) => {
    if (target === page) return;
    if (target === "admin") { setPage("admin"); return; }
    setPageVisible(false);
    setTimeout(() => {
      setPrevPage(page);
      setPage(target);
      setPageVisible(true);
    }, 280);
  };

  if (page === "admin") {
    return (
      <CartProvider>
        <Suspense fallback={<PageSkeleton />}>
          <AdminPanel onLogout={() => navigateTo("home")} />
        </Suspense>
      </CartProvider>
    );
  }

  // App home screen ONLY when installed AND on the home page
  const showAppHome = isInstalledPWA && page === "home";

  return (
    <CartProvider>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

      <div className={`transition-opacity duration-700 ${showIntro ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

        {showAppHome ? (
          /* Installed PWA home screen */
          <MobileApp onNavigate={navigateTo} />
        ) : (
          /* Website — same design on all browsers and all screen sizes */
          <div
            style={{
              opacity:    pageVisible ? 1 : 0,
              transform:  pageVisible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.995)",
              transition: "opacity 0.28s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <Suspense fallback={<PageSkeleton />}>
              {page === "home"     && <LandingPage    onNavigate={navigateTo} />}
              {page === "menu"     && <MenuPage        onNavigate={navigateTo} />}
              {page === "about"    && <AboutPage       onNavigate={navigateTo} />}
              {page === "location" && <LocationPage    onNavigate={navigateTo} />}
              {page === "login"    && <AuthPage        onNavigate={navigateTo} initialMode="login" />}
              {page === "signup"   && <AuthPage        onNavigate={navigateTo} initialMode="signup" />}
              {page === "cart"     && <CartPage        onNavigate={navigateTo} previousPage={prevPage} />}
              {page === "track"    && <TrackOrderPage  onNavigate={navigateTo} />}
            </Suspense>
          </div>
        )}
      </div>

      {/* Install prompt — only shown in browser, never in installed app */}
      {!showIntro && !isInstalledPWA && <InstallPrompt />}
    </CartProvider>
  );
}

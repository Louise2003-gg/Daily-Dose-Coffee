import { useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import LandingPage from "./LandingPage";
import MenuPage from "./components/MenuPage";
import AboutPage from "./components/AboutPage";
import LocationPage from "./components/LocationPage";
import AuthPage from "./components/AuthPage";
import AdminPanel from "./admin/AdminPanel";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [showIntro, setShowIntro]     = useState(true);
  const [page, setPage]               = useState("home");
  const [prevPage, setPrevPage]       = useState("home");
  const [pageVisible, setPageVisible] = useState(true);

  const navigateTo = (target) => {
    if (target === page) return;
    // Admin panel doesn't need the fade wrapper
    if (target === "admin") { setPage("admin"); return; }
    setPageVisible(false);
    setTimeout(() => {
      setPrevPage(page);
      setPage(target);
      setPageVisible(true);
    }, 300);
  };

  // Admin panel renders outside the normal flow
  if (page === "admin") {
    return (
      <CartProvider>
        <AdminPanel onLogout={() => navigateTo("home")} />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
      <div className={`transition-opacity duration-700 ${showIntro ? "opacity-0" : "opacity-100"}`}>
        <div
          style={{
            opacity:    pageVisible ? 1 : 0,
            transform:  pageVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {page === "home"     && <LandingPage  onNavigate={navigateTo} />}
          {page === "menu"     && <MenuPage     onNavigate={navigateTo} />}
          {page === "about"    && <AboutPage    onNavigate={navigateTo} />}
          {page === "location" && <LocationPage onNavigate={navigateTo} />}
          {page === "login"    && <AuthPage     onNavigate={navigateTo} initialMode="login" />}
          {page === "signup"   && <AuthPage     onNavigate={navigateTo} initialMode="signup" />}
          {page === "cart"     && <CartPage     onNavigate={navigateTo} previousPage={prevPage} />}
        </div>
      </div>
    </CartProvider>
  );
}

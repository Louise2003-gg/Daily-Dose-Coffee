import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryBar from "./components/CategoryBar";
import ProductSection from "./components/ProductSection";
import BeansBanner from "./components/BeansBanner";
import Reviews from "./components/Reviews";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { coffeeItems, nonCoffeeItems, sodaItems, dessertItems } from "./data/menuData";

const categoryItems = {
  iced:    coffeeItems,
  non:     nonCoffeeItems,
  soda:    sodaItems,
  dessert: dessertItems,
};

export default function LandingPage({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("iced");

  return (
    <div className="font-poppins page-fade-in">
      <Navbar onNavigate={onNavigate} currentPage="home" />
      <Hero onNavigate={onNavigate} />
      <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />
      <ProductSection
        key={activeCategory}
        items={categoryItems[activeCategory]}
        activeCategory={activeCategory}
      />
      <BeansBanner onNavigate={onNavigate} />
      <Reviews />
      <Newsletter />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

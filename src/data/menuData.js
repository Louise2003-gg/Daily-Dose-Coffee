import icedCoffee1 from "../assets/coffee-drink1.png";
import icedCoffee2 from "../assets/coffee-drink2.png";
import icedCoffee3 from "../assets/coffee-drink3.png";
import icedCoffee4 from "../assets/coffee-drink4.png";
import icedCoffee5 from "../assets/coffee-drink5.png";
import icedCoffee6 from "../assets/coffee-drink6.png";
import icedCoffee7 from "../assets/coffee-drink7.png";
import icedCoffee8 from "../assets/coffee-drink8.png";
import icedCoffee9 from "../assets/coffee-drink9.png";
import nonCoffee1 from "../assets/non-coffee1.jpg";
import nonCoffee2 from "../assets/non-coffee2.png";
import nonCoffee3 from "../assets/non-coffee3.png";
import nonCoffee4 from "../assets/non-coffee4.png";
import nonCoffee5 from "../assets/non-coffee5.png";
import nonCoffee6 from "../assets/non-coffee6.png";
import nonCoffee7 from "../assets/non-coffee7.png";
import nonCoffee8 from "../assets/non-coffee8.png";
import nonCoffee9 from "../assets/non-coffee9.png";
import nonCoffee10 from "../assets/non-coffee10.png";
import nonCoffee11 from "../assets/non-coffee11.png";
import nonCoffee12 from "../assets/non-coffee12.png";
import sodaBlueberry from "../assets/Blue berry soda.png";
import sodaGreenApple from "../assets/green apple soda.png";
import sodaMango from "../assets/Mango soda.png";
import sodaStrawberry from "../assets/Strawberry soda.png";
import cookie1 from "../assets/cookie1.png";
import cookie2 from "../assets/cookie2.png";
import cookie3 from "../assets/cookie3.png";
import cookie4 from "../assets/cookie4.png";
import cookie5 from "../assets/cookie5.png";
import cookie6 from "../assets/cookie6.png";

export const coffeeItems = [
  { name: "Classic Iced Coffee",      price: "₱49", img: icedCoffee1, tag: "Bestseller" },
  { name: "Iced Caramel Latte",       price: "₱49", img: icedCoffee2, tag: "Popular" },
  { name: "Iced Mocha Blend",         price: "₱49", img: icedCoffee3, tag: null },
  { name: "Iced Vanilla Cold Brew",   price: "₱49", img: icedCoffee4, tag: "New" },
  { name: "Brown Sugar Iced Latte",   price: "₱49", img: icedCoffee5, tag: null },
  { name: "Iced Matcha Espresso",     price: "₱49", img: icedCoffee6, tag: "New" },
  { name: "Salted Caramel Cold Brew", price: "₱49", img: icedCoffee7, tag: null },
  { name: "Iced Hazelnut Latte",      price: "₱49", img: icedCoffee8, tag: "Popular" },
  { name: "Coconut Iced Coffee",      price: "₱49", img: icedCoffee9, tag: null },
];

export const nonCoffeeItems = [
  { name: "Matcha Latte",        price: "₱49", img: nonCoffee1,  tag: "Popular" },
  { name: "Strawberry Milk",     price: "₱49", img: nonCoffee2,  tag: null },
  { name: "Taro Milk Tea",       price: "₱49", img: nonCoffee3,  tag: "New" },
  { name: "Mango Smoothie",      price: "₱49", img: nonCoffee4,  tag: null },
  { name: "Chocolate Frappe",    price: "₱49", img: nonCoffee5,  tag: "Bestseller" },
  { name: "Caramel Milk Tea",    price: "₱49", img: nonCoffee6,  tag: null },
  { name: "Peach Iced Tea",      price: "₱49", img: nonCoffee7,  tag: null },
  { name: "Blueberry Smoothie",  price: "₱49", img: nonCoffee8,  tag: "New" },
  { name: "Lychee Milk Tea",     price: "₱49", img: nonCoffee9,  tag: null },
  { name: "Brown Sugar Milk",    price: "₱49", img: nonCoffee10, tag: "Popular" },
  { name: "Wintermelon Tea",     price: "₱49", img: nonCoffee11, tag: null },
  { name: "Passion Fruit Tea",   price: "₱49", img: nonCoffee12, tag: null },
];

// Soda
export const sodaItems = [
  { name: "Blueberry Soda",   price: "₱49", img: sodaBlueberry,  tag: "Popular" },
  { name: "Green Apple Soda", price: "₱49", img: sodaGreenApple, tag: null },
  { name: "Mango Soda",       price: "₱49", img: sodaMango,      tag: "Bestseller" },
  { name: "Strawberry Soda",  price: "₱49", img: sodaStrawberry, tag: "New" },
];

export const dessertItems = [
  { name: "Chocolate Chip Cookie", price: "₱55", img: cookie1, tag: "Bestseller" },
  { name: "Oatmeal Raisin Cookie", price: "₱45", img: cookie2, tag: null },
  { name: "Double Choco Cookie",   price: "₱60", img: cookie3, tag: "Popular" },
  { name: "Peanut Butter Cookie",  price: "₱50", img: cookie4, tag: null },
  { name: "Sugar Cookie",          price: "₱45", img: cookie5, tag: "New" },
  { name: "Snickerdoodle Cookie",  price: "₱65", img: cookie6, tag: null },
];

export const reviews = [
  {
    name: "Maria Santos",
    role: "Regular Customer",
    rating: 5,
    text: "Daily Dose has become my go-to every morning. The iced caramel latte is absolutely perfect — smooth, not too sweet, and always consistent. The staff are so warm and welcoming. Highly recommend!",
  },
  {
    name: "Carlo Reyes",
    role: "Coffee Enthusiast",
    rating: 5,
    text: "I've tried a lot of coffee carts around Butuan and nothing comes close. The cold brew here is rich and bold without being bitter. You can tell they really care about quality. Will keep coming back!",
  },
  {
    name: "Ana Dela Cruz",
    role: "Local Foodie",
    rating: 4,
    text: "Love the vibe and the drinks! The non-coffee options are a great touch — my matcha latte was creamy and well-balanced. Perfect spot whether you need a quick pick-me-up or just want to relax.",
  },
];

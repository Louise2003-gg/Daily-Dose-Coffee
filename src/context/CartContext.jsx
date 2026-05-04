import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const key = `${item.name}-${item.size}-${item.milk ?? ""}`;
      const existing = prev.find((i) => i.cartKey === key);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, cartKey: key, qty: 1 }];
    });
  };

  const removeFromCart = (cartKey) => {
    setCartItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  };

  const updateQty = (cartKey, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.cartKey === cartKey ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const totalPrice = cartItems.reduce((sum, i) => {
    const num = parseInt(i.price.replace(/[^0-9]/g, ""), 10) || 0;
    return sum + num * i.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

// Generate a readable order ID
const generateOrderId = () => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `DD-${num}`;
};

export function CartProvider({ children }) {
  const [cartItems,   setCartItems]   = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

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

  // Called when order is placed — saves a snapshot to history
  const placeOrder = ({ address, paymentMethod }) => {
    const subtotal    = cartItems.reduce((sum, i) => {
      const num = parseInt(i.price.replace(/[^0-9]/g, ""), 10) || 0;
      return sum + num * i.qty;
    }, 0);
    const deliveryFee = 50;
    const now         = new Date();

    const order = {
      id:            generateOrderId(),
      date:          now.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }),
      time:          now.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }),
      status:        "confirmed",
      items:         cartItems.map((i) => ({
        name:  i.name,
        size:  i.size,
        milk:  i.milk,
        price: parseInt(i.price.replace(/[^0-9]/g, ""), 10) || 0,
        qty:   i.qty,
        img:   i.img,
      })),
      address:       `${address.street}, ${address.city}`,
      customerName:  address.name,
      phone:         address.phone,
      paymentMethod,
      subtotal,
      deliveryFee,
      total:         subtotal + deliveryFee,
    };

    setOrderHistory((prev) => [order, ...prev]);
    return order.id;
  };

  const clearCart = () => setCartItems([]);

  // Cancel an order — sets status to "cancelled"
  const cancelOrder = (orderId) => {
    setOrderHistory((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status: "cancelled" } : o)
    );
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const totalPrice = cartItems.reduce((sum, i) => {
    const num = parseInt(i.price.replace(/[^0-9]/g, ""), 10) || 0;
    return sum + num * i.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems, addToCart, removeFromCart, updateQty, clearCart,
        totalItems, totalPrice,
        orderHistory, placeOrder, cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

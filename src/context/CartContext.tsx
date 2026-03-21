/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (itemName: string) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

// same price list as original cart.js
const prices: Record<string, number> = {
  "Classic Baguette": 3.0,
  "Sourdough Bread": 4.0,
  "Multigrain Bread": 3.5,
  Focaccia: 5.0,
  "Flaky Croissants": 2.5,
  "Chocolate Danish": 3.0,
  "Almond Croissant": 3.5,
  "Pain au Chocolat": 2.75,
  "Fruit Tart": 4.5,
  Ciabatta: 2.25,
};

function getItemPrice(itemName: string): number {
  const price = prices[itemName];
  if (!price) console.warn(`Price for "${itemName}" not found.`);
  return price ?? 0;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((itemName: string) => {
    if (!itemName) return;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.name === itemName);
      if (idx !== -1) {
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { name: itemName, price: getItemPrice(itemName), quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemName: string) => {
    setCart((prev) => prev.filter((i) => i.name !== itemName));
  }, []);

  const updateQuantity = useCallback((itemName: string, quantity: number) => {
    const qty = parseInt(String(quantity), 10);
    if (isNaN(qty) || qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, quantity: qty } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
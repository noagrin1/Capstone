"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CartItem, MenuItem, Restaurant } from "../types";
import { clampInt } from "../utils/money";

// PROTOTYPE FEATURE: Cart state (add/remove/update quantities)
type CartState = {
  restaurant: Pick<Restaurant, "id" | "name" | "deliveryFee"> | null;
  items: CartItem[];
};

type CartContextValue = CartState & {
  addItem: (restaurant: Restaurant, item: MenuItem) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  removeItem: (menuItemId: string) => void;
  clear: () => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [restaurant, setRestaurant] = useState<CartState["restaurant"]>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee = restaurant?.deliveryFee ?? 0;
    const total = subtotal + deliveryFee;
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return {
      restaurant,
      items,
      addItem: (r, item) => {
        setRestaurant((prevRestaurant) => {
          const nextRestaurant = {
            id: r.id,
            name: r.name,
            deliveryFee: r.deliveryFee,
          };

          setItems((prevItems) => {
            // If switching restaurants, start a fresh cart (common delivery-app behavior).
            const switching = prevRestaurant && prevRestaurant.id !== r.id;
            if (switching) {
              return [
                {
                  id: item.id,
                  restaurantId: r.id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                },
              ];
            }

            const existing = prevItems.find((p) => p.id === item.id);
            if (!existing) {
              return [
                ...prevItems,
                {
                  id: item.id,
                  restaurantId: r.id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                },
              ];
            }
            return prevItems.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
            );
          });

          return prevRestaurant?.id === r.id ? prevRestaurant : nextRestaurant;
        });
      },
      setQuantity: (menuItemId, quantity) => {
        const q = clampInt(quantity, 1, 99);
        setItems((prev) =>
          prev.map((p) => (p.id === menuItemId ? { ...p, quantity: q } : p)),
        );
      },
      removeItem: (menuItemId) => {
        setItems((prev) => {
          const next = prev.filter((p) => p.id !== menuItemId);
          if (next.length === 0) setRestaurant(null);
          return next;
        });
      },
      clear: () => {
        setItems([]);
        setRestaurant(null);
      },
      subtotal,
      deliveryFee,
      total,
      totalItems,
    };
  }, [items, restaurant]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within provider");
  return ctx;
}


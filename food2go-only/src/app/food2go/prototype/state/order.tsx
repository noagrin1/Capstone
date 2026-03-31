"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Order, OrderStatus, PaymentMethod, Restaurant } from "../types";

type OrderContextValue = {
  activeOrder: Order | null;
  history: Order[];
  placeOrder: (params: {
    restaurant: Pick<Restaurant, "id" | "name" | "deliveryFee">;
    items: Order["items"];
    address: string;
    paymentMethod: PaymentMethod;
  }) => Order;
  updateStatus: (orderId: string, status: OrderStatus) => void;
  submitFeedback: (orderId: string, params: { rating: number; comment: string }) => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);
const newId = () => `o_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [history, setHistory] = useState<Order[]>([]);

  const value = useMemo<OrderContextValue>(
    () => ({
      activeOrder,
      history,
      placeOrder: ({ restaurant, items, address, paymentMethod }) => {
        const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const deliveryFee = restaurant.deliveryFee;
        const total = subtotal + deliveryFee;
        const now = new Date().toISOString();
        const order: Order = {
          id: newId(),
          createdAtIso: now,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          items,
          deliveryFee,
          subtotal,
          total,
          address,
          paymentMethod,
          status: "received",
          statusUpdatedAtIso: now,
        };
        setActiveOrder(order);
        setHistory((prev) => [order, ...prev]);
        return order;
      },
      updateStatus: (orderId, status) => {
        const now = new Date().toISOString();
        setActiveOrder((prev) => (prev && prev.id === orderId ? { ...prev, status, statusUpdatedAtIso: now } : prev));
        setHistory((prev) => prev.map((o) => (o.id === orderId ? { ...o, status, statusUpdatedAtIso: now } : o)));
      },
      submitFeedback: (orderId, { rating, comment }) => {
        const now = new Date().toISOString();
        setHistory((prev) => prev.map((o) => (o.id === orderId ? { ...o, feedback: { rating, comment, submittedAtIso: now } } : o)));
      },
    }),
    [activeOrder, history],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within provider");
  return ctx;
}

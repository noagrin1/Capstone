"use client";

import { CartProvider } from "./cart";
import { OrderProvider } from "./order";
import { PrototypeAuthProvider } from "./prototypeAuth";

export function Food2GoProviders({ children }: { children: React.ReactNode }) {
  return (
    <PrototypeAuthProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </PrototypeAuthProvider>
  );
}

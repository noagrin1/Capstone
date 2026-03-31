"use client";

import { CartProvider } from "./cart";
import { OrderProvider } from "./order";
import { PrototypeAuthProvider } from "./prototypeAuth";

// PROTOTYPE FEATURE: Simple state providers (cart + order + fake auth)
export function Food2GoProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrototypeAuthProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </PrototypeAuthProvider>
  );
}


"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../prototype/state/cart";
import { useOrders } from "../prototype/state/order";
import type { PaymentMethod } from "../prototype/types";
import { AppShell } from "../prototype/ui/AppShell";
import { Button } from "../prototype/ui/Button";
import { Card } from "../prototype/ui/Card";
import { Input } from "../prototype/ui/Input";
import { Select } from "../prototype/ui/Select";
import { formatMoney } from "../prototype/utils/money";

export default function CheckoutPage() {
  const cart = useCart();
  const orders = useOrders();
  const router = useRouter();
  const [address, setAddress] = useState("123 Campus Dr, Apt 4B");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [isPlacing, setIsPlacing] = useState(false);

  useEffect(() => {
    if (cart.items.length === 0 || !cart.restaurant) router.replace("/food2go/cart");
  }, [cart.items.length, cart.restaurant, router]);

  const summary = useMemo(
    () => ({
      restaurantName: cart.restaurant?.name ?? "",
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      total: cart.total,
    }),
    [cart.deliveryFee, cart.restaurant?.name, cart.subtotal, cart.total],
  );

  const canSubmit = cart.items.length > 0 && !!cart.restaurant && address.trim().length >= 8 && !isPlacing;

  return (
    <AppShell title="Checkout" subtitle={summary.restaurantName} activeTab="cart">
      <div className="space-y-3">
        <Card>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-slate-600">Subtotal</span><span className="font-semibold text-slate-900">{formatMoney(summary.subtotal)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-600">Delivery fee</span><span className="font-semibold text-slate-900">{formatMoney(summary.deliveryFee)}</span></div>
            <div className="h-px bg-slate-200" />
            <div className="flex items-center justify-between"><span className="text-slate-800 font-semibold">Total</span><span className="text-slate-900 font-semibold">{formatMoney(summary.total)}</span></div>
          </div>
        </Card>
        <Card>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit || !cart.restaurant) return;
              setIsPlacing(true);
              const order = orders.placeOrder({
                restaurant: cart.restaurant,
                items: cart.items,
                address: address.trim(),
                paymentMethod,
              });
              cart.clear();
              router.push(`/food2go/tracking?orderId=${encodeURIComponent(order.id)}`);
            }}
          >
            <Input label="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <Select
              label="Payment method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              options={[
                { value: "Card", label: "Card (mock)" },
                { value: "Apple Pay", label: "Apple Pay (mock)" },
                { value: "Google Pay", label: "Google Pay (mock)" },
                { value: "Cash", label: "Cash" },
              ]}
            />
            <Button type="submit" disabled={!canSubmit}>
              {isPlacing ? "Placing order..." : "Place order"}
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}

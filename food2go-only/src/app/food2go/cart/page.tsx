"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useCart } from "../prototype/state/cart";
import { AppShell } from "../prototype/ui/AppShell";
import { Button } from "../prototype/ui/Button";
import { Card } from "../prototype/ui/Card";
import { Input } from "../prototype/ui/Input";
import { formatMoney } from "../prototype/utils/money";

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();
  const canCheckout = cart.items.length > 0 && !!cart.restaurant;
  const lines = useMemo(
    () => cart.items.map((i) => ({ ...i, lineTotal: i.price * i.quantity })),
    [cart.items],
  );

  return (
    <AppShell title="Cart" subtitle={cart.restaurant?.name ?? "Your items"} activeTab="cart">
      <div className="space-y-3">
        {cart.items.length === 0 ? (
          <Card>
            <p className="text-sm text-slate-600">Your cart is empty.</p>
            <div className="mt-3">
              <Link className="text-sm font-semibold text-emerald-700" href="/food2go">
                Browse restaurants &rarr;
              </Link>
            </div>
          </Card>
        ) : (
          <>
            <div className="space-y-3">
              {lines.map((i) => (
                <Card key={i.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{i.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{formatMoney(i.price)} each</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Line total: {formatMoney(i.lineTotal)}
                      </p>
                    </div>
                    <div className="w-32 shrink-0 space-y-2">
                      <Input
                        label="Qty"
                        type="number"
                        value={String(i.quantity)}
                        onChange={(e) => cart.setQuantity(i.id, Number(e.target.value || "1"))}
                      />
                      <button
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                        onClick={() => cart.removeItem(i.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Card>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatMoney(cart.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Delivery fee</span>
                  <span className="font-semibold text-slate-900">{formatMoney(cart.deliveryFee)}</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between">
                  <span className="text-slate-800 font-semibold">Total</span>
                  <span className="text-slate-900 font-semibold">{formatMoney(cart.total)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button disabled={!canCheckout} onClick={() => router.push("/food2go/checkout")}>
                  Proceed to checkout
                </Button>
                <Button variant="secondary" onClick={() => cart.clear()}>
                  Clear cart
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </AppShell>
  );
}

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useOrders } from "../prototype/state/order";
import type { OrderStatus } from "../prototype/types";
import { AppShell } from "../prototype/ui/AppShell";
import { Button } from "../prototype/ui/Button";
import { Card } from "../prototype/ui/Card";
import { Stepper } from "../prototype/ui/Stepper";
import { formatMoney } from "../prototype/utils/money";

// PROTOTYPE FEATURE: Order Tracking (visual stages + simulated progress)
export function TrackingClient() {
  const orders = useOrders();
  const sp = useSearchParams();
  const router = useRouter();
  const orderId = sp.get("orderId") ?? orders.activeOrder?.id ?? null;

  const order = useMemo(() => {
    if (!orderId) return orders.activeOrder;
    return (
      (orders.activeOrder && orders.activeOrder.id === orderId
        ? orders.activeOrder
        : null) ?? orders.history.find((o) => o.id === orderId) ?? null
    );
  }, [orderId, orders.activeOrder, orders.history]);

  useEffect(() => {
    if (!order) return;
    if (order.status === "delivered") return;

    const next = (status: OrderStatus) => {
      orders.updateStatus(order.id, status);
    };

    // Simple, predictable timing for demos (not based on real GPS/time).
    const timeouts: number[] = [];
    if (order.status === "received") {
      timeouts.push(window.setTimeout(() => next("preparing"), 2500));
      timeouts.push(window.setTimeout(() => next("on_the_way"), 6500));
      timeouts.push(window.setTimeout(() => next("delivered"), 11000));
    } else if (order.status === "preparing") {
      timeouts.push(window.setTimeout(() => next("on_the_way"), 4000));
      timeouts.push(window.setTimeout(() => next("delivered"), 8500));
    } else if (order.status === "on_the_way") {
      timeouts.push(window.setTimeout(() => next("delivered"), 4500));
    }

    return () => {
      for (const t of timeouts) window.clearTimeout(t);
    };
  }, [order, orders]);

  if (!order) {
    return (
      <AppShell title="Order tracking" subtitle="No active order" activeTab="orders">
        <Card>
          <p className="text-sm text-slate-600">
            No order found. Place an order to see tracking.
          </p>
          <div className="mt-3">
            <Link
              className="text-sm font-semibold text-emerald-700"
              href="/food2go"
            >
              Browse restaurants →
            </Link>
          </div>
        </Card>
      </AppShell>
    );
  }

  const canLeaveFeedback = order.status === "delivered" && !order.feedback;

  return (
    <AppShell
      title="Order tracking"
      subtitle={`${order.restaurantName} • Total ${formatMoney(order.total)}`}
      activeTab="orders"
    >
      <div className="space-y-3">
        <Card>
          <Stepper status={order.status} />
        </Card>

        <Card>
          <p className="text-sm font-semibold text-slate-900">Delivery address</p>
          <p className="mt-1 text-sm text-slate-600">{order.address}</p>
          <div className="mt-3 text-sm">
            <p className="font-semibold text-slate-900">Items</p>
            <ul className="mt-2 space-y-1 text-slate-700">
              {order.items.map((i) => (
                <li key={i.id} className="flex items-center justify-between">
                  <span className="truncate">
                    {i.quantity}× {i.name}
                  </span>
                  <span className="font-semibold">
                    {formatMoney(i.price * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {canLeaveFeedback ? (
          <Button
            onClick={() =>
              router.push(
                `/food2go/feedback?orderId=${encodeURIComponent(order.id)}`,
              )
            }
          >
            Leave feedback
          </Button>
        ) : order.feedback ? (
          <Card>
            <p className="text-sm font-semibold text-slate-900">
              Thanks for your feedback!
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Rating: {order.feedback.rating}/5
            </p>
          </Card>
        ) : null}
      </div>
    </AppShell>
  );
}


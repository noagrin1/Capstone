"use client";

import Link from "next/link";
import { useOrders } from "../prototype/state/order";
import { AppShell } from "../prototype/ui/AppShell";
import { Badge } from "../prototype/ui/Badge";
import { Card } from "../prototype/ui/Card";
import { formatMoney } from "../prototype/utils/money";

export default function OrdersPage() {
  const { activeOrder, history } = useOrders();

  return (
    <AppShell title="Orders" subtitle="History & updates" activeTab="orders">
      <div className="space-y-3">
        {activeOrder ? (
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">Active order</p>
                <p className="mt-1 text-sm text-slate-600 truncate">
                  {activeOrder.restaurantName} - {formatMoney(activeOrder.total)}
                </p>
              </div>
              <Link className="text-sm font-semibold text-emerald-700" href={`/food2go/tracking?orderId=${encodeURIComponent(activeOrder.id)}`}>
                Track &rarr;
              </Link>
            </div>
          </Card>
        ) : null}
        {history.length === 0 ? (
          <Card>
            <p className="text-sm text-slate-600">No orders yet. Place an order to see it here.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((o) => (
              <Card key={o.id} interactive>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900 truncate">{o.restaurantName}</p>
                      <Badge>{statusLabel(o.status)}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{formatMoney(o.total)}</p>
                  </div>
                  <Link className="text-sm font-semibold text-emerald-700" href={`/food2go/tracking?orderId=${encodeURIComponent(o.id)}`}>
                    Track
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function statusLabel(status: string) {
  if (status === "on_the_way") return "On the way";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

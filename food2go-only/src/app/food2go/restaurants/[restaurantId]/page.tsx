"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { getMenuForRestaurant, getRestaurantById } from "../../prototype/mockData";
import { useCart } from "../../prototype/state/cart";
import { AppShell } from "../../prototype/ui/AppShell";
import { Badge } from "../../prototype/ui/Badge";
import { Button } from "../../prototype/ui/Button";
import { Card } from "../../prototype/ui/Card";
import { formatMoney } from "../../prototype/utils/money";

export default function RestaurantDetailsPage() {
  const params = useParams<{ restaurantId: string }>();
  const restaurantId = params.restaurantId;
  const restaurant = getRestaurantById(restaurantId);
  const menu = useMemo(() => getMenuForRestaurant(restaurantId), [restaurantId]);
  const cart = useCart();

  const grouped = useMemo(() => {
    const map = new Map<string, typeof menu>();
    for (const item of menu) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return Array.from(map.entries());
  }, [menu]);

  if (!restaurant) {
    return (
      <AppShell title="Restaurant" subtitle="Not found" activeTab="home">
        <Card><p className="text-sm text-slate-600">Restaurant not found.</p></Card>
      </AppShell>
    );
  }

  const cartRestaurantMismatch = cart.restaurant && cart.restaurant.id !== restaurant.id;

  return (
    <AppShell
      title={restaurant.name}
      subtitle={`${restaurant.cuisine} - ${restaurant.etaMinutes} min`}
      activeTab="home"
    >
      <div className="space-y-3">
        <Link href="/food2go" className="text-sm font-semibold text-emerald-700">
          &larr; Back to restaurants
        </Link>
        <Card>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900 truncate">Menu</h2>
                <Badge>${"$".repeat(restaurant.priceLevel)}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">Delivery fee: {formatMoney(restaurant.deliveryFee)}</p>
            </div>
          </div>
          {cartRestaurantMismatch ? (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Cart has items from another restaurant.
            </div>
          ) : null}
        </Card>
        <div className="space-y-4">
          {grouped.map(([category, items]) => (
            <section key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-800">{category}</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <Card key={item.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">{formatMoney(item.price)}</p>
                      </div>
                      <div className="w-28 shrink-0">
                        <Button onClick={() => cart.addItem(restaurant, item)}>Add</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

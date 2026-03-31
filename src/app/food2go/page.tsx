"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { restaurants } from "./prototype/mockData";
import { AppShell } from "./prototype/ui/AppShell";
import { Badge } from "./prototype/ui/Badge";
import { Card } from "./prototype/ui/Card";
import { Input } from "./prototype/ui/Input";
import { Select } from "./prototype/ui/Select";

// PROTOTYPE FEATURE: Home / Browse Restaurants (search + simple filters)
export default function Food2GoHomePage() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState<string>("all");
  const [maxEta, setMaxEta] = useState<string>("all");

  const cuisineOptions = useMemo(() => {
    const unique = Array.from(new Set(restaurants.map((r) => r.cuisine))).sort();
    return ["all", ...unique];
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const eta = maxEta === "all" ? null : Number(maxEta);

    return restaurants.filter((r) => {
      const matchesQuery =
        q.length === 0 ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q);
      const matchesCuisine = cuisine === "all" || r.cuisine === cuisine;
      const matchesEta = eta === null || r.etaMinutes <= eta;
      return matchesQuery && matchesCuisine && matchesEta;
    });
  }, [query, cuisine, maxEta]);

  return (
    <AppShell
      title="Food2Go"
      subtitle="Browse restaurants near you"
      activeTab="home"
    >
      <div className="space-y-3">
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-emerald-800">
            Food2Go • Class Prototype
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Prototype by Noa Grinderfer
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Demo the full flow: browse → menu → cart → checkout → tracking → feedback
          </p>
        </div>

        <Input
          label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by restaurant or cuisine…"
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            options={cuisineOptions.map((c) => ({
              value: c,
              label: c === "all" ? "All" : c,
            }))}
          />
          <Select
            label="Delivery time"
            value={maxEta}
            onChange={(e) => setMaxEta(e.target.value)}
            options={[
              { value: "all", label: "Any" },
              { value: "20", label: "≤ 20 min" },
              { value: "30", label: "≤ 30 min" },
              { value: "45", label: "≤ 45 min" },
            ]}
          />
        </div>

        <div className="space-y-3 pt-1">
          {visible.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-600">
                No restaurants match your search. Try clearing filters.
              </p>
            </Card>
          ) : (
            visible.map((r) => (
              <Link
                key={r.id}
                href={`/food2go/restaurants/${r.id}`}
                className="block"
              >
                <Card interactive>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-slate-900 truncate">
                          {r.name}
                        </h2>
                        <Badge>{r.cuisine}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        ⭐ {r.rating.toFixed(1)} • {r.etaMinutes}–{r.etaMinutes + 10}{" "}
                        min • ${r.deliveryFee.toFixed(2)} delivery
                      </p>
                    </div>
                    <span className="text-slate-400 text-sm">View</span>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}


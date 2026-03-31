"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useOrders } from "../prototype/state/order";
import { AppShell } from "../prototype/ui/AppShell";
import { Button } from "../prototype/ui/Button";
import { Card } from "../prototype/ui/Card";
import { Input } from "../prototype/ui/Input";

// PROTOTYPE FEATURE: Customer Feedback (rating + comment)
export function FeedbackClient() {
  const orders = useOrders();
  const sp = useSearchParams();
  const router = useRouter();
  const orderId = sp.get("orderId") ?? orders.activeOrder?.id ?? null;

  const order = useMemo(() => {
    if (!orderId) return null;
    return orders.history.find((o) => o.id === orderId) ?? null;
  }, [orderId, orders.history]);

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("Great food and quick delivery!");
  const [submitted, setSubmitted] = useState(false);

  if (!order) {
    return (
      <AppShell title="Feedback" subtitle="No delivered order found" activeTab="orders">
        <Card>
          <p className="text-sm text-slate-600">
            Finish an order first to leave feedback.
          </p>
          <div className="mt-3">
            <Link
              className="text-sm font-semibold text-emerald-700"
              href="/food2go/orders"
            >
              Go to order history →
            </Link>
          </div>
        </Card>
      </AppShell>
    );
  }

  const canSubmit =
    order.status === "delivered" &&
    !order.feedback &&
    Number(rating) >= 1 &&
    Number(rating) <= 5 &&
    comment.trim().length >= 2;

  if (submitted) {
    return (
      <AppShell title="Feedback" subtitle="Thank you!" activeTab="orders">
        <Card>
          <p className="text-sm font-semibold text-slate-900">
            Thanks for helping Food2Go improve.
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Your feedback was saved (mock).
          </p>
          <div className="mt-4">
            <Button onClick={() => router.push("/food2go/orders")}>
              Back to orders
            </Button>
          </div>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Feedback"
      subtitle={`${order.restaurantName} • Order ${order.id.slice(0, 6).toUpperCase()}`}
      activeTab="orders"
    >
      <div className="space-y-3">
        <Card>
          {order.status !== "delivered" ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Feedback is available after delivery.
            </div>
          ) : order.feedback ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              Feedback already submitted. Rating: {order.feedback.rating}/5
            </div>
          ) : null}

          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;
              orders.submitFeedback(order.id, {
                rating: Number(rating),
                comment: comment.trim(),
              });
              setSubmitted(true);
            }}
          >
            <Input
              label="Rating (1–5)"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-slate-700">
                Comment
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-28 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500"
                placeholder="How was your order?"
              />
            </label>

            <Button type="submit" disabled={!canSubmit}>
              Submit feedback
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}


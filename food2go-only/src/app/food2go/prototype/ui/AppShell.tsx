"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../state/cart";
import { useOrders } from "../state/order";

type Tab = "home" | "cart" | "orders" | "account";

export function AppShell({
  title,
  subtitle,
  activeTab,
  children,
}: {
  title: string;
  subtitle?: string;
  activeTab: Tab;
  children: React.ReactNode;
}) {
  const { totalItems } = useCart();
  const { activeOrder } = useOrders();
  const pathname = usePathname();
  const showBanner =
    activeOrder &&
    pathname?.startsWith("/food2go") &&
    !pathname?.startsWith("/food2go/tracking") &&
    !pathname?.startsWith("/food2go/feedback");

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto w-full max-w-md pb-24">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <h1 className="text-lg font-semibold text-slate-900 truncate">{title}</h1>
                {subtitle ? <p className="text-sm text-slate-600 truncate">{subtitle}</p> : null}
                <p className="text-xs text-slate-500">Prototype by Noa Grinderfer</p>
              </div>
              <Link href="/food2go/cart" className="relative rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Cart
                {totalItems > 0 ? (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {totalItems}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>
          {showBanner ? (
            <div className="px-4 pb-3">
              <Link href="/food2go/tracking" className="block rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                <span className="font-semibold">Order update:</span> {statusLabel(activeOrder.status)} - Tap to track
              </Link>
            </div>
          ) : null}
        </header>
        <main className="px-4 py-4">{children}</main>
      </div>
      <BottomNav activeTab={activeTab} />
    </div>
  );
}

function BottomNav({ activeTab }: { activeTab: Tab }) {
  const Item = ({ tab, href, label }: { tab: Tab; href: string; label: string }) => {
    const isActive = tab === activeTab;
    return (
      <Link href={href} className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-medium ${isActive ? "text-emerald-700" : "text-slate-500"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-600" : "bg-transparent"}`} />
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-md">
        <Item tab="home" href="/food2go" label="Home" />
        <Item tab="cart" href="/food2go/cart" label="Cart" />
        <Item tab="orders" href="/food2go/orders" label="Orders" />
        <Item tab="account" href="/food2go/account" label="Account" />
      </div>
    </nav>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case "received":
      return "Order received";
    case "preparing":
      return "Preparing";
    case "on_the_way":
      return "On the way";
    case "delivered":
      return "Delivered";
    default:
      return status;
  }
}

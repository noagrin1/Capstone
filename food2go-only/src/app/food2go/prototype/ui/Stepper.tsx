import type { OrderStatus } from "../types";

const stages: { key: OrderStatus; label: string }[] = [
  { key: "received", label: "Order received" },
  { key: "preparing", label: "Preparing" },
  { key: "on_the_way", label: "On the way" },
  { key: "delivered", label: "Delivered" },
];

export function Stepper({ status }: { status: OrderStatus }) {
  const activeIndex = stages.findIndex((s) => s.key === status);
  return (
    <ol className="space-y-3">
      {stages.map((s, idx) => {
        const done = idx < activeIndex;
        const active = idx === activeIndex;
        return (
          <li key={s.key} className="flex items-start gap-3">
            <span className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${done ? "bg-emerald-600 text-white" : active ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-100 text-slate-500"}`}>
              {done ? "✓" : idx + 1}
            </span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${done ? "text-slate-900" : active ? "text-emerald-800" : "text-slate-500"}`}>{s.label}</p>
              {active ? <p className="mt-0.5 text-xs text-slate-600">Updating automatically (prototype simulation)</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

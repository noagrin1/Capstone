import { Suspense } from "react";
import { TrackingClient } from "./trackingClient";

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-slate-50" />}>
      <TrackingClient />
    </Suspense>
  );
}

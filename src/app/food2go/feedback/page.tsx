import { Suspense } from "react";
import { FeedbackClient } from "./feedbackClient";

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-slate-50" />}>
      <FeedbackClient />
    </Suspense>
  );
}


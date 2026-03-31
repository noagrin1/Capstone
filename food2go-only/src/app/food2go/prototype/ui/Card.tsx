export function Card({
  children,
  interactive,
}: {
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${interactive ? "hover:shadow-md hover:border-slate-300" : ""}`}>
      {children}
    </div>
  );
}

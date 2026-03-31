export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const base = "inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition";
  const styles =
    variant === "primary"
      ? "bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-slate-300"
      : variant === "danger"
        ? "bg-rose-600 text-white hover:bg-rose-700 disabled:bg-slate-300"
        : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 disabled:text-slate-400";

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

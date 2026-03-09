import type { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm hover:from-teal-700 hover:to-emerald-600",
  outline:
    "border border-teal-600 bg-transparent text-teal-700 hover:bg-teal-50 hover:text-teal-800",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  );
}

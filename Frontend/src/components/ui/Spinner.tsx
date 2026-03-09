import type { HTMLAttributes } from "react";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  label?: string;
}

const sizeClassMap: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-7 w-7 border-[3px]",
};

export default function Spinner({
  size = "md",
  label,
  className = "",
  ...props
}: SpinnerProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-teal-700 ${className}`}
      role="status"
      aria-live="polite"
      {...props}
    >
      <span
        className={`inline-block animate-spin rounded-full border-solid border-teal-600 border-t-transparent ${sizeClassMap[size]}`}
        aria-hidden="true"
      />
      {label ? <span className="text-sm font-medium">{label}</span> : null}
    </div>
  );
}


import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Tarjeta({ children, className = "" }: Props) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

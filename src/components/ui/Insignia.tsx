import type { ReactNode } from "react";

type Color = "azul" | "verde" | "rojo" | "gris" | "ambar";

const colores: Record<Color, string> = {
  azul: "bg-marca-50 text-marca-700 ring-marca-200",
  verde: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rojo: "bg-red-50 text-red-700 ring-red-200",
  gris: "bg-slate-100 text-slate-600 ring-slate-200",
  ambar: "bg-amber-50 text-amber-700 ring-amber-200",
};

interface Props {
  color?: Color;
  children: ReactNode;
}

export function Insignia({ color = "gris", children }: Props) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colores[color]}`}>
      {children}
    </span>
  );
}

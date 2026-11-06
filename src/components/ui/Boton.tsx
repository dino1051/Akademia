import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "peligro" | "fantasma";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  icono?: ReactNode;
  anchoCompleto?: boolean;
}

const estilos: Record<Variante, string> = {
  primario: "bg-marca-600 text-white hover:bg-marca-700 shadow-sm",
  secundario: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
  peligro: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
  fantasma: "text-slate-600 hover:bg-slate-100",
};

export function Boton({
  variante = "primario",
  icono,
  anchoCompleto = false,
  className = "",
  children,
  ...resto
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${estilos[variante]} ${anchoCompleto ? "w-full" : ""} ${className}`}
      {...resto}
    >
      {icono}
      {children}
    </button>
  );
}

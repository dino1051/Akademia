import type { ReactNode } from "react";
import { Tarjeta } from "./Tarjeta";

interface Props {
  titulo: string;
  valor: string;
  detalle: string;
  icono: ReactNode;
}

export function TarjetaEstadistica({ titulo, valor, detalle, icono }: Props) {
  return (
    <Tarjeta className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{titulo}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{valor}</p>
        </div>
        <div className="rounded-lg bg-marca-50 p-2.5 text-marca-600">{icono}</div>
      </div>
      <p className="mt-3 text-xs text-slate-500">{detalle}</p>
    </Tarjeta>
  );
}

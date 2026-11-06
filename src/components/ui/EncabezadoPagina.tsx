import type { ReactNode } from "react";

interface Props {
  titulo: string;
  descripcion?: string;
  acciones?: ReactNode;
}

export function EncabezadoPagina({ titulo, descripcion, acciones }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{titulo}</h1>
        {descripcion && <p className="mt-1 text-sm text-slate-500">{descripcion}</p>}
      </div>
      {acciones && <div className="flex gap-2">{acciones}</div>}
    </div>
  );
}

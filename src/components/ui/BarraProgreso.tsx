interface Props {
  valor: number; // 0 a 100
}

export function BarraProgreso({ valor }: Props) {
  const color = valor >= 100 ? "bg-red-500" : valor >= 80 ? "bg-amber-500" : "bg-marca-500";

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(valor, 100)}%` }} />
    </div>
  );
}

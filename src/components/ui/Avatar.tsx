interface Props {
  nombre: string;
  fotoUrl?: string | null;
  tamano?: "sm" | "md" | "lg";
}

const tamanos = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-24 w-24 text-2xl",
};

export function Avatar({ nombre, fotoUrl, tamano = "md" }: Props) {
  // "Ana Quispe" -> "AQ"
  const iniciales = nombre
    .split(" ")
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("");

  if (fotoUrl) {
    return <img src={fotoUrl} alt={nombre} className={`${tamanos[tamano]} rounded-full object-cover`} />;
  }

  return (
    <div className={`${tamanos[tamano]} flex shrink-0 items-center justify-center rounded-full bg-marca-100 font-semibold text-marca-700`}>
      {iniciales}
    </div>
  );
}

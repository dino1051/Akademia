import type { EstadoInscripcion } from "../../types/inscripcion";
import { Insignia } from "./Insignia";

const config = {
  ACTIVA: { color: "verde", texto: "Activa" },
  RETIRADA: { color: "rojo", texto: "Retirada" },
  FINALIZADA: { color: "azul", texto: "Finalizada" },
} as const;

export function EstadoInscripcionInsignia({ estado }: { estado: EstadoInscripcion }) {
  return <Insignia color={config[estado].color}>{config[estado].texto}</Insignia>;
}

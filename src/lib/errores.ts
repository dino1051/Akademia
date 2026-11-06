import axios from "axios";

interface DetalleError {
  campo: string;
  mensaje: string;
}

interface RespuestaError {
  message?: string;
  details?: DetalleError[];
}

export function mensajeError(error: unknown, porDefecto: string): string {
  if (axios.isAxiosError<RespuestaError>(error)) {
    if (!error.response) {
      return "No hay conexión con el servidor.";
    }

    const datos = error.response.data;

    if (datos?.details?.length) {
      return datos.details.map((detalle) => detalle.mensaje).join("\n");
    }

    return datos?.message ?? porDefecto;
  }

  return porDefecto;
}

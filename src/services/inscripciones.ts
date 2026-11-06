import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Inscripcion, EstadoInscripcion } from "../types/inscripcion";

export interface CrearInscripcionDTO {
  cursoId: number;
  estudianteId: number;
}

export const inscripcionesService = {
  getTodas: async (): Promise<Inscripcion[]> => {
    const respuesta =
      await api.get<RespuestaApi<Inscripcion[]>>("/inscripciones");

    return respuesta.data.data;
  },

  getPorId: async (id: number): Promise<Inscripcion> => {
    const respuesta = await api.get<RespuestaApi<Inscripcion>>(
      `/inscripciones/${id}`,
    );

    return respuesta.data.data;
  },

  crear: async (datos: CrearInscripcionDTO): Promise<Inscripcion> => {
    const respuesta = await api.post<RespuestaApi<Inscripcion>>(
      "/inscripciones",
      datos,
    );

    return respuesta.data.data;
  },

  actualizarEstado: async (
    id: number,
    estado: EstadoInscripcion,
  ): Promise<Inscripcion> => {
    const respuesta = await api.patch<RespuestaApi<Inscripcion>>(
      `/inscripciones/${id}/estado`,
      { estado },
    );

    return respuesta.data.data;
  },
};

import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Inscripcion } from "../types/inscripcion";

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
};

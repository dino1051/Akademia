import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Curso } from "../types/curso";

export const cursosService = {
  getTodos: async (): Promise<Curso[]> => {
    const respuesta = await api.get<RespuestaApi<Curso[]>>("/cursos");
    return respuesta.data.data;
  },
};

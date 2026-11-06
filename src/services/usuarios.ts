import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Usuario, Rol } from "../types/usuario";

export const usuariosService = {
  getTodos: async (): Promise<Usuario[]> => {
    const respuesta = await api.get<RespuestaApi<Usuario[]>>("/usuarios");

    return respuesta.data.data;
  },

  getPorRol: async (rol: Rol): Promise<Usuario[]> => {
    const respuesta = await api.get<RespuestaApi<Usuario[]>>("/usuarios", {
      params: { rol },
    });

    return respuesta.data.data;
  },
};

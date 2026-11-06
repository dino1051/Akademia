import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Usuario } from "../types/usuario";

export interface LoginDatos {
  username: string;
  password: string;
}

export interface RegistroDatos {
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email?: string;
}

export interface Sesion {
  token: string;
  tipo: string;
  usuario: Usuario;
}

export const authService = {
  login: async (datos: LoginDatos): Promise<Sesion> => {
    const respuesta = await api.post<RespuestaApi<Sesion>>(
      "/auth/login",
      datos,
    );
    return respuesta.data.data;
  },
  // apartado para el registro, basicamente lo mismo con cambios de los datos a enviar y la ruta
  registrar: async (datos: RegistroDatos): Promise<Sesion> => {
    const respuesta = await api.post<RespuestaApi<Sesion>>(
      "/auth/register",
      datos,
    );
    return respuesta.data.data;
  },
};

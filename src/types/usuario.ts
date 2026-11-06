// Roles que maneja la API
export type Rol = "ADMIN" | "DOCENTE" | "ESTUDIANTE";

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  activo: boolean;
  fotoUrl: string | null;
}

import { useAuthStore } from "../../store/useAuthStore";
import type { Rol } from "../../types/usuario";

import { Navigate, Outlet } from "react-router-dom";

interface Props {
  roles?: Rol[];
}

export function RutaProtegida({ roles }: Props) {
  const token = useAuthStore((s) => s.token);
  const usuario = useAuthStore((s) => s.usuario);

  // sin sesion => redirigir al login
  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  // con sesion pero no con el rol que debe cumplir => redirigir al inicio
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/inicio" replace />;
  }
  // en caso de que cumpla con todo, es ok!
  return <Outlet />;
}

import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

interface OpcionMenu {
  nombre: string;
  ruta: string;
  icono: string;
}

const opcionesMenu: OpcionMenu[] = [
  {
    nombre: "Dashboard",
    ruta: "/dashboard",
    icono: "dashboard",
  },
  {
    nombre: "Mis cursos",
    ruta: "/mis-cursos",
    icono: "menu_book",
  },
  {
    nombre: "Aula virtual",
    ruta: "/aula-virtual",
    icono: "school",
  },
  {
    nombre: "Calificaciones",
    ruta: "/calificaciones",
    icono: "grade",
  },
  {
    nombre: "Calendario",
    ruta: "/calendario",
    icono: "calendar_month",
  },
  {
    nombre: "Certificados",
    ruta: "/certificados",
    icono: "workspace_premium",
  },
  {
    nombre: "Configuración",
    ruta: "/configuracion",
    icono: "settings",
  },
];

export default function BarraLateral() {
  const navigate = useNavigate();

  const usuario = useAuthStore((state) => state.usuario);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <NavLink to="/dashboard" className="text-2xl font-bold text-marca-700">
          Akademia
        </NavLink>
      </div>

      {/* Usuario */}
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-3">
          {usuario?.fotoUrl ? (
            <img
              src={usuario.fotoUrl}
              alt={`${usuario.nombre} ${usuario.apellido}`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marca-100 font-semibold text-marca-700">
              {usuario?.nombre?.charAt(0).toUpperCase() ?? "E"}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {usuario ? `${usuario.nombre} ${usuario.apellido}` : "Estudiante"}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {usuario?.rol?.toLowerCase() ?? "estudiante"}
            </p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menú principal
        </p>

        <div className="space-y-1">
          {opcionesMenu.map((opcion) => (
            <NavLink
              key={opcion.ruta}
              to={opcion.ruta}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-marca-50 text-marca-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span className="material-symbols-outlined text-[21px]">
                {opcion.icono}
              </span>

              <span>{opcion.nombre}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Parte inferior */}
      <div className="border-t border-slate-200 p-4">
        <button
          type="button"
          onClick={handleCerrarSesion}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <span className="material-symbols-outlined text-[21px]">logout</span>

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

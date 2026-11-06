import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import BarraLateral from "../components/layout/BarraLateral";
import BarraSuperior from "../components/layout/BarraSuperior";

import { useApi } from "../hooks/useApi";
import { usuariosService } from "../services/usuarios";
import { useAuthStore } from "../store/useAuthStore";

import type { Rol } from "../types/usuario";

export default function EstudiantesPage() {
  const usuario = useAuthStore((state) => state.usuario);

  const {
    data: usuarios,
    cargando,
    error,
    recargar,
  } = useApi(usuariosService.getTodos, []);

  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("TODOS");

  const usuariosFiltrados = useMemo(() => {
    if (!usuarios) return [];

    const texto = busqueda.toLowerCase().trim();

    return usuarios.filter((u) => {
      const nombreCompleto = `${u.nombre} ${u.apellido}`.toLowerCase();

      const coincideBusqueda =
        nombreCompleto.includes(texto) ||
        u.username.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto);

      const coincideRol = filtroRol === "TODOS" || u.rol === filtroRol;

      return coincideBusqueda && coincideRol;
    });
  }, [usuarios, busqueda, filtroRol]);

  // Protección por rol
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.rol !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  const totalUsuarios = usuarios?.length ?? 0;
  const totalEstudiantes =
    usuarios?.filter((u) => u.rol === "ESTUDIANTE").length ?? 0;
  const totalDocentes =
    usuarios?.filter((u) => u.rol === "DOCENTE").length ?? 0;
  const totalAdmins = usuarios?.filter((u) => u.rol === "ADMIN").length ?? 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <BarraLateral />

      <div className="lg:pl-64">
        <BarraSuperior
          nombre={`${usuario.nombre} ${usuario.apellido}`}
          rol={usuario.rol}
          foto={usuario.fotoUrl}
        />

        <main className="p-6 lg:p-8">
          {/* Encabezado */}
          <section className="mb-8">
            <p className="text-sm font-medium text-marca-600">Administración</p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">Usuarios</h1>

            <p className="mt-2 text-slate-500">
              Consulta y administra los usuarios registrados en la plataforma.
            </p>
          </section>

          {/* Resumen */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ResumenCard
              titulo="Total de usuarios"
              cantidad={totalUsuarios}
              icono="👥"
            />

            <ResumenCard
              titulo="Estudiantes"
              cantidad={totalEstudiantes}
              icono="🎓"
            />

            <ResumenCard
              titulo="Docentes"
              cantidad={totalDocentes}
              icono="👨‍🏫"
            />

            <ResumenCard
              titulo="Administradores"
              cantidad={totalAdmins}
              icono="🛡️"
            />
          </section>

          {/* Tabla */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Usuarios registrados
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {usuariosFiltrados.length} resultados encontrados
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="search"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre, usuario o correo..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100 sm:w-72"
                  />

                  <select
                    value={filtroRol}
                    onChange={(e) => setFiltroRol(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-marca-500"
                  >
                    <option value="TODOS">Todos los roles</option>
                    <option value="ADMIN">Administradores</option>
                    <option value="DOCENTE">Docentes</option>
                    <option value="ESTUDIANTE">Estudiantes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cargando */}
            {cargando && (
              <div className="space-y-4 p-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-14 animate-pulse rounded-lg bg-slate-100"
                  />
                ))}
              </div>
            )}

            {/* Error */}
            {!cargando && error && (
              <div className="p-8 text-center">
                <p className="font-semibold text-red-700">
                  No fue posible cargar los usuarios.
                </p>

                <p className="mt-1 text-sm text-red-500">{error}</p>

                <button
                  type="button"
                  onClick={recargar}
                  className="mt-4 rounded-lg bg-marca-600 px-4 py-2 text-sm font-semibold text-white hover:bg-marca-700"
                >
                  Intentar nuevamente
                </button>
              </div>
            )}

            {/* Sin resultados */}
            {!cargando && !error && usuariosFiltrados.length === 0 && (
              <div className="p-10 text-center">
                <div className="text-4xl">🔎</div>

                <h3 className="mt-3 font-semibold text-slate-800">
                  No encontramos usuarios
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Intenta cambiar la búsqueda o el filtro seleccionado.
                </p>
              </div>
            )}

            {/* Resultados */}
            {!cargando && !error && usuariosFiltrados.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Usuario</th>
                      <th className="px-6 py-4">Correo</th>
                      <th className="px-6 py-4">Rol</th>
                      <th className="px-6 py-4">Estado</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {usuariosFiltrados.map((u) => (
                      <tr key={u.id} className="transition hover:bg-slate-50">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            {u.fotoUrl ? (
                              <img
                                src={u.fotoUrl}
                                alt={`${u.nombre} ${u.apellido}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-marca-100 font-bold text-marca-700">
                                {u.nombre.charAt(0).toUpperCase()}
                              </div>
                            )}

                            <div>
                              <p className="font-semibold text-slate-800">
                                {u.nombre} {u.apellido}
                              </p>

                              <p className="text-xs text-slate-500">
                                @{u.username}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {u.email}
                        </td>

                        <td className="px-6 py-4">
                          <RolBadge rol={u.rol} />
                        </td>

                        <td className="px-6 py-4">
                          <EstadoUsuario activo={u.activo} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

interface ResumenCardProps {
  titulo: string;
  cantidad: number;
  icono: string;
}

function ResumenCard({ titulo, cantidad, icono }: ResumenCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{titulo}</p>

        <span className="text-2xl">{icono}</span>
      </div>

      <p className="mt-3 text-3xl font-bold text-slate-900">{cantidad}</p>
    </article>
  );
}

function RolBadge({ rol }: { rol: Rol }) {
  const estilos: Record<Rol, string> = {
    ADMIN: "bg-purple-100 text-purple-700",
    DOCENTE: "bg-blue-100 text-blue-700",
    ESTUDIANTE: "bg-marca-100 text-marca-700",
  };

  const nombres: Record<Rol, string> = {
    ADMIN: "Administrador",
    DOCENTE: "Docente",
    ESTUDIANTE: "Estudiante",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${estilos[rol]}`}
    >
      {nombres[rol]}
    </span>
  );
}

function EstadoUsuario({ activo }: { activo: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        activo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      {activo ? "Activo" : "Inactivo"}
    </span>
  );
}

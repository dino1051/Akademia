import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import BarraLateral from "../components/layout/BarraLateral";
import BarraSuperior from "../components/layout/BarraSuperior";
import { useCursos } from "../hooks/useCursos";
import { useAuthStore } from "../store/useAuthStore";

export default function CursosPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const { cursos, cargando, error, cargarCursos } = useCursos();

  const [busqueda, setBusqueda] = useState("");

  const cursosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) return cursos;

    return cursos.filter((curso) => {
      const nombre = curso.nombre.toLowerCase();
      const codigo = curso.codigo.toLowerCase();
      const docente =
        `${curso.docente.nombre} ${curso.docente.apellido}`.toLowerCase();

      return (
        nombre.includes(termino) ||
        codigo.includes(termino) ||
        docente.includes(termino)
      );
    });
  }, [cursos, busqueda]);

  return (
    <div className="min-h-screen bg-slate-50">
      <BarraLateral />

      <div className="lg:pl-64">
        <BarraSuperior
          nombre={
            usuario ? `${usuario.nombre} ${usuario.apellido}` : "Estudiante"
          }
          rol={usuario?.rol}
          foto={usuario?.fotoUrl}
        />

        <main className="p-6 lg:p-8">
          {/* Encabezado */}
          <section className="mb-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold text-marca-600">
                  Explora y aprende
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Catálogo de cursos
                </h1>

                <p className="mt-2 text-slate-500">
                  Descubre los cursos disponibles y encuentra tu próximo
                  aprendizaje.
                </p>
              </div>

              <Link
                to="/mis-cursos"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-marca-200 bg-white px-4 py-2.5 text-sm font-semibold text-marca-700 transition hover:bg-marca-50"
              >
                <span className="material-symbols-outlined text-lg">
                  menu_book
                </span>
                Mis cursos
              </Link>
            </div>
          </section>

          {/* Buscador y contador */}
          <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                  search
                </span>

                <input
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por curso, código o docente..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                />
              </div>

              <p className="text-sm text-slate-500">
                {cursosFiltrados.length}{" "}
                {cursosFiltrados.length === 1
                  ? "curso encontrado"
                  : "cursos encontrados"}
              </p>
            </div>
          </section>

          {/* Cargando */}
          {cargando && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-xl border border-slate-200 bg-white"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {!cargando && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-2xl text-red-600">
                  error
                </span>

                <div>
                  <h2 className="font-semibold text-red-800">
                    No pudimos cargar los cursos
                  </h2>

                  <p className="mt-1 text-sm text-red-600">{error}</p>

                  <button
                    type="button"
                    onClick={() => void cargarCursos()}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Intentar nuevamente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Catálogo */}
          {!cargando && !error && (
            <>
              {cursosFiltrados.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-marca-50">
                    <span className="material-symbols-outlined text-3xl text-marca-600">
                      search_off
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    {cursos.length === 0
                      ? "Todavía no hay cursos disponibles"
                      : "No encontramos resultados"}
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    {cursos.length === 0
                      ? "Cuando se publiquen cursos en la plataforma, aparecerán aquí."
                      : "Prueba con otro nombre, código o docente."}
                  </p>

                  {busqueda && (
                    <button
                      type="button"
                      onClick={() => setBusqueda("")}
                      className="mt-5 text-sm font-semibold text-marca-700 hover:text-marca-900"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {cursosFiltrados.map((curso) => {
                    const porcentajeOcupacion =
                      curso.cupo > 0
                        ? Math.min((curso.inscritos / curso.cupo) * 100, 100)
                        : 0;

                    const tieneCupos = curso.disponibles > 0;

                    return (
                      <article
                        key={curso.id}
                        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                      >
                        {/* Cabecera de la tarjeta */}
                        <div className="bg-gradient-to-br from-marca-700 to-marca-900 p-5 text-white">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-rose-200">
                                {curso.codigo}
                              </p>

                              <h2 className="mt-2 text-xl font-bold">
                                {curso.nombre}
                              </h2>
                            </div>

                            <span className="material-symbols-outlined text-3xl text-white/70">
                              menu_book
                            </span>
                          </div>

                          <div className="mt-5 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                            {curso.creditos} créditos
                          </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-5">
                          <p className="min-h-12 text-sm leading-relaxed text-slate-500">
                            {curso.descripcion || "Sin descripción disponible."}
                          </p>

                          {/* Docente */}
                          <div className="mt-5 flex items-center gap-3">
                            {curso.docente.fotoUrl ? (
                              <img
                                src={curso.docente.fotoUrl}
                                alt={`${curso.docente.nombre} ${curso.docente.apellido}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-marca-100 font-semibold text-marca-700">
                                {curso.docente.nombre.charAt(0).toUpperCase()}
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="text-xs text-slate-400">Docente</p>

                              <p className="truncate text-sm font-semibold text-slate-700">
                                {curso.docente.nombre} {curso.docente.apellido}
                              </p>
                            </div>
                          </div>

                          {/* Cupo */}
                          <div className="mt-5 border-t border-slate-100 pt-4">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-medium text-slate-500">
                                Ocupación del curso
                              </span>

                              <span
                                className={`text-xs font-semibold ${
                                  tieneCupos ? "text-green-700" : "text-red-600"
                                }`}
                              >
                                {tieneCupos
                                  ? `${curso.disponibles} lugares disponibles`
                                  : "Sin cupos disponibles"}
                              </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-marca-600 transition-all"
                                style={{
                                  width: `${porcentajeOcupacion}%`,
                                }}
                              />
                            </div>

                            <div className="mt-2 flex justify-between text-xs text-slate-400">
                              <span>{curso.inscritos} inscritos</span>
                              <span>{curso.cupo} lugares en total</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

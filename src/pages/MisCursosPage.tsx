import { Link } from "react-router-dom";
import BarraLateral from "../components/layout/BarraLateral";
import BarraSuperior from "../components/layout/BarraSuperior";
import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";
import { useAuthStore } from "../store/useAuthStore";

export default function MisCursosPage() {
  const usuario = useAuthStore((state) => state.usuario);

  const {
    data: inscripciones,
    cargando,
    error,
    recargar,
  } = useApi(inscripcionesService.getTodas, []);

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
            <p className="text-sm font-medium text-marca-600">Mi aprendizaje</p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Mis cursos
            </h1>

            <p className="mt-2 text-slate-500">
              Consulta tus cursos inscritos y revisa tu progreso académico.
            </p>
          </section>

          {/* Estado de carga */}
          {cargando && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-xl border border-slate-200 bg-white"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {!cargando && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h2 className="font-semibold text-red-800">
                No pudimos cargar tus cursos
              </h2>

              <p className="mt-1 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={recargar}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Intentar nuevamente
              </button>
            </div>
          )}

          {/* Sin cursos */}
          {!cargando &&
            !error &&
            (!inscripciones || inscripciones.length === 0) && (
              <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-marca-50 text-3xl">
                  📚
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  Todavía no tienes cursos
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Cuando te inscribas en un curso, aparecerá aquí.
                </p>

                <Link
                  to="/cursos"
                  className="mt-5 inline-flex rounded-lg bg-marca-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-marca-700"
                >
                  Explorar cursos
                </Link>
              </div>
            )}

          {/* Cursos */}
          {!cargando && !error && inscripciones && inscripciones.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {inscripciones.map((inscripcion) => (
                <article
                  key={inscripcion.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Cabecera */}
                  <div className="bg-marca-100 px-5 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-marca-700">
                          {inscripcion.curso.codigo}
                        </p>

                        <h2 className="mt-1 text-lg font-bold text-marca-900">
                          {inscripcion.curso.nombre}
                        </h2>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-marca-700">
                        {inscripcion.curso.creditos} créditos
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Estado</span>

                      <EstadoBadge estado={inscripcion.estado} />
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Promedio</span>

                        <span className="text-2xl font-bold text-slate-900">
                          {inscripcion.promedio.toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-marca-600"
                          style={{
                            width: `${Math.min(
                              Math.max(inscripcion.promedio, 0),
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-xs text-slate-400">Inscrito desde</p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {new Date(inscripcion.fecha).toLocaleDateString(
                          "es-MX",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    <Link
                      to={`/mis-cursos/${inscripcion.id}`}
                      className="mt-5 block rounded-lg bg-marca-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-marca-700"
                    >
                      Ver curso
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface EstadoBadgeProps {
  estado: "ACTIVA" | "CANCELADA" | "FINALIZADA";
}

function EstadoBadge({ estado }: EstadoBadgeProps) {
  const estilos = {
    ACTIVA: "bg-green-100 text-green-700",
    CANCELADA: "bg-red-100 text-red-700",
    FINALIZADA: "bg-slate-100 text-slate-700",
  };

  const textos = {
    ACTIVA: "Activa",
    CANCELADA: "Cancelada",
    FINALIZADA: "Finalizada",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${estilos[estado]}`}
    >
      {textos[estado]}
    </span>
  );
}

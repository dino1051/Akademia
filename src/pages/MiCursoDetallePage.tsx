import { Link, useParams } from "react-router-dom";
import { useCallback } from "react";

import BarraLateral from "../components/layout/BarraLateral";
import BarraSuperior from "../components/layout/BarraSuperior";
import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";
import { useAuthStore } from "../store/useAuthStore";

export default function MisCursoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const usuario = useAuthStore((state) => state.usuario);

  const idInscripcion = Number(id);

  const pedirInscripcion = useCallback(() => {
    if (!Number.isInteger(idInscripcion) || idInscripcion <= 0) {
      return Promise.reject(new Error("El ID de inscripción no es válido."));
    }

    return inscripcionesService.getPorId(idInscripcion);
  }, [idInscripcion]);

  const {
    data: inscripcion,
    cargando,
    error,
    recargar,
  } = useApi(pedirInscripcion, [idInscripcion]);

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
          <Link
            to="/mis-cursos"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-marca-700"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Volver a mis cursos
          </Link>

          {cargando && (
            <div className="mt-6 space-y-5">
              <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-64 animate-pulse rounded-xl bg-white" />
            </div>
          )}

          {!cargando && error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
              <h2 className="font-semibold text-red-800">
                No pudimos cargar la información del curso
              </h2>
              <p className="mt-1 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={recargar}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Intentar nuevamente
              </button>
            </div>
          )}

          {!cargando && !error && inscripcion && (
            <>
              <section className="mt-6 rounded-2xl bg-marca-900 p-6 text-white shadow-sm md:p-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-rose-200">
                      {inscripcion.curso.codigo}
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                      {inscripcion.curso.nombre}
                    </h1>

                    <p className="mt-3 text-sm text-rose-100">
                      {inscripcion.curso.creditos} créditos académicos
                    </p>
                  </div>

                  <EstadoBadge estado={inscripcion.estado} />
                </div>

                <div className="mt-8 grid gap-4 border-t border-white/20 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-rose-200">Promedio general</p>
                    <p className="mt-1 text-3xl font-bold">
                      {Number(inscripcion.promedio).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-rose-200">Calificaciones</p>
                    <p className="mt-1 text-3xl font-bold">
                      {inscripcion.calificaciones.length}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-rose-200">
                      Fecha de inscripción
                    </p>
                    <p className="mt-2 text-base font-semibold">
                      {new Date(inscripcion.fecha).toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Calificaciones
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Consulta tus evaluaciones y resultados en este curso.
                  </p>
                </div>

                {inscripcion.calificaciones.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300">
                      assignment
                    </span>
                    <h3 className="mt-3 font-semibold text-slate-800">
                      Todavía no hay calificaciones
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Cuando se registren tus evaluaciones, aparecerán aquí.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                          <tr>
                            <th className="px-6 py-4 font-semibold">
                              Evaluación
                            </th>
                            <th className="px-6 py-4 font-semibold">Fecha</th>
                            <th className="px-6 py-4 text-right font-semibold">
                              Calificación
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {inscripcion.calificaciones.map((calificacion) => (
                            <tr
                              key={calificacion.id}
                              className="transition hover:bg-slate-50"
                            >
                              <td className="px-6 py-4">
                                <p className="font-medium text-slate-800">
                                  {calificacion.descripcion}
                                </p>
                              </td>

                              <td className="px-6 py-4 text-sm text-slate-500">
                                {new Date(
                                  calificacion.fecha,
                                ).toLocaleDateString("es-MX", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </td>

                              <td className="px-6 py-4 text-right">
                                <span
                                  className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-bold ${
                                    calificacion.nota >= 70
                                      ? "bg-green-50 text-green-700"
                                      : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  {Number(calificacion.nota).toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            </>
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
    ACTIVA: "bg-green-100 text-green-800",
    CANCELADA: "bg-red-100 text-red-800",
    FINALIZADA: "bg-slate-100 text-slate-700",
  };

  const textos = {
    ACTIVA: "Inscripción activa",
    CANCELADA: "Inscripción cancelada",
    FINALIZADA: "Curso finalizado",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-bold ${estilos[estado]}`}
    >
      {textos[estado]}
    </span>
  );
}

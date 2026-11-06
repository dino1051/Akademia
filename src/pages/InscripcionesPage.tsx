import { useState } from "react";
import { Navigate } from "react-router-dom";

import BarraLateral from "../components/layout/BarraLateral";
import BarraSuperior from "../components/layout/BarraSuperior";

import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { usuariosService } from "../services/usuarios";
import { inscripcionesService } from "../services/inscripciones";

import { useAuthStore } from "../store/useAuthStore";
import { mensajeError } from "../lib/errores";

import type { EstadoInscripcion } from "../types/inscripcion";

export default function InscripcionesPage() {
  const usuario = useAuthStore((state) => state.usuario);

  const {
    data: inscripciones,
    cargando: cargandoInscripciones,
    error: errorInscripciones,
    recargar,
  } = useApi(inscripcionesService.getTodas, []);

  const { data: cursos, cargando: cargandoCursos } = useApi(
    cursosService.getTodos,
    [],
  );

  const { data: estudiantes, cargando: cargandoEstudiantes } = useApi(
    () => usuariosService.getPorRol("ESTUDIANTE"),
    [],
  );

  const [cursoId, setCursoId] = useState("");
  const [estudianteId, setEstudianteId] = useState("");

  const [creando, setCreando] = useState(false);
  const [actualizandoId, setActualizandoId] = useState<number | null>(null);

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);

  // Protección por rol
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.rol !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  const cargandoFormulario = cargandoCursos || cargandoEstudiantes;

  const crearInscripcion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cursoId || !estudianteId) {
      setErrorAccion("Selecciona un curso y un estudiante.");
      return;
    }

    setCreando(true);
    setMensaje(null);
    setErrorAccion(null);

    try {
      await inscripcionesService.crear({
        cursoId: Number(cursoId),
        estudianteId: Number(estudianteId),
      });

      setMensaje("La inscripción se creó correctamente.");
      setCursoId("");
      setEstudianteId("");

      recargar();
    } catch (error) {
      setErrorAccion(
        mensajeError(error, "No fue posible crear la inscripción."),
      );
    } finally {
      setCreando(false);
    }
  };

  const cambiarEstado = async (id: number, estado: EstadoInscripcion) => {
    setActualizandoId(id);
    setMensaje(null);
    setErrorAccion(null);

    try {
      await inscripcionesService.actualizarEstado(id, estado);

      setMensaje("El estado de la inscripción se actualizó correctamente.");

      recargar();
    } catch (error) {
      setErrorAccion(
        mensajeError(error, "No fue posible actualizar el estado."),
      );
    } finally {
      setActualizandoId(null);
    }
  };

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
            <p className="text-sm font-medium text-marca-600">
              Administración académica
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Inscripciones
            </h1>

            <p className="mt-2 text-slate-500">
              Registra estudiantes en cursos y administra sus inscripciones.
            </p>
          </section>

          {/* Mensajes */}
          {mensaje && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {mensaje}
            </div>
          )}

          {errorAccion && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorAccion}
            </div>
          )}

          {/* Formulario */}
          <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Nueva inscripción
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Selecciona el estudiante y el curso que deseas asignarle.
              </p>
            </div>

            {cargandoFormulario ? (
              <p className="text-sm text-slate-500">
                Cargando estudiantes y cursos...
              </p>
            ) : (
              <form
                onSubmit={crearInscripcion}
                className="grid gap-5 md:grid-cols-2"
              >
                {/* Estudiante */}
                <div>
                  <label
                    htmlFor="estudiante"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Estudiante
                  </label>

                  <select
                    id="estudiante"
                    value={estudianteId}
                    onChange={(e) => setEstudianteId(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  >
                    <option value="">Selecciona un estudiante</option>

                    {estudiantes?.map((estudiante) => (
                      <option key={estudiante.id} value={estudiante.id}>
                        {estudiante.nombre} {estudiante.apellido} (
                        {estudiante.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Curso */}
                <div>
                  <label
                    htmlFor="curso"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Curso
                  </label>

                  <select
                    id="curso"
                    value={cursoId}
                    onChange={(e) => setCursoId(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  >
                    <option value="">Selecciona un curso</option>

                    {cursos?.map((curso) => (
                      <option
                        key={curso.id}
                        value={curso.id}
                        disabled={curso.disponibles <= 0}
                      >
                        {curso.codigo} - {curso.nombre} ({curso.disponibles}{" "}
                        lugares disponibles)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={creando || cargandoFormulario}
                    className="rounded-lg bg-marca-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-marca-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {creando ? "Registrando..." : "Crear inscripción"}
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Tabla de inscripciones */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Todas las inscripciones
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Consulta y modifica el estado de los registros.
              </p>
            </div>

            {cargandoInscripciones ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Cargando inscripciones...
              </div>
            ) : errorInscripciones ? (
              <div className="p-6">
                <p className="text-sm text-red-600">{errorInscripciones}</p>

                <button
                  type="button"
                  onClick={recargar}
                  className="mt-3 text-sm font-semibold text-marca-600 hover:text-marca-700"
                >
                  Intentar nuevamente
                </button>
              </div>
            ) : !inscripciones || inscripciones.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Todavía no existen inscripciones registradas.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Estudiante</th>
                      <th className="px-6 py-4">Curso</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Promedio</th>
                      <th className="px-6 py-4">Estado</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {inscripciones.map((inscripcion) => (
                      <tr
                        key={inscripcion.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">
                            {inscripcion.estudiante.nombre}{" "}
                            {inscripcion.estudiante.apellido}
                          </p>

                          <p className="text-xs text-slate-500">
                            @{inscripcion.estudiante.username}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">
                            {inscripcion.curso.nombre}
                          </p>

                          <p className="text-xs text-slate-500">
                            {inscripcion.curso.codigo}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {new Date(inscripcion.fecha).toLocaleDateString(
                            "es-MX",
                          )}
                        </td>

                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {inscripcion.promedio !== null
                            ? inscripcion.promedio.toFixed(2)
                            : "Sin notas"}
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={inscripcion.estado}
                            disabled={actualizandoId === inscripcion.id}
                            onChange={(e) =>
                              cambiarEstado(
                                inscripcion.id,
                                e.target.value as EstadoInscripcion,
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-marca-500 disabled:opacity-50"
                          >
                            <option value="ACTIVA">Activa</option>
                            <option value="RETIRADA">Retirada</option>
                            <option value="FINALIZADA">Finalizada</option>
                          </select>

                          {actualizandoId === inscripcion.id && (
                            <p className="mt-1 text-xs text-slate-400">
                              Actualizando...
                            </p>
                          )}
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

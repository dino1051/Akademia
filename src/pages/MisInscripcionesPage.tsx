import { Eye, Plus, XCircle } from "lucide-react";
import { Boton } from "../components/ui/Boton";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { EstadoInscripcionInsignia } from "../components/ui/EstadoInscripcionInsignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { misInscripciones } from "../data/mock";

const pestanas = ["Todas", "Activas", "Retiradas", "Finalizadas"];

export function MisInscripcionesPage() {
  return (
    <>
      <EncabezadoPagina
        titulo="Mis inscripciones"
        descripcion="Cursos en los que te inscribiste y su estado."
        acciones={<Boton icono={<Plus size={16} />}>Nueva inscripción</Boton>}
      />

      {/* Pestañas (solo visual) */}
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-slate-200">
        {pestanas.map((pestana, i) => (
          <button
            key={pestana}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap ${
              i === 0
                ? "border-marca-600 text-marca-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {pestana}
          </button>
        ))}
      </div>

      <Tarjeta className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Curso</th>
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 font-semibold">Promedio</th>
                <th className="px-5 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {misInscripciones.map((inscripcion) => (
                <tr key={inscripcion.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">
                      {inscripcion.curso}
                    </p>
                    <p className="text-xs text-slate-500">
                      {inscripcion.docente}
                    </p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                    {inscripcion.fecha}
                  </td>
                  <td className="px-5 py-4">
                    <EstadoInscripcionInsignia estado={inscripcion.estado} />
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {inscripcion.promedio ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Boton
                        variante="fantasma"
                        className="px-2.5 py-1.5"
                        icono={<Eye size={16} />}
                      >
                        Notas
                      </Boton>
                      {inscripcion.estado === "ACTIVA" && (
                        <Boton
                          variante="peligro"
                          className="px-2.5 py-1.5"
                          icono={<XCircle size={16} />}
                        >
                          Retirarme
                        </Boton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>

      {/* Ventana de confirmación (modal) de ejemplo, dibujada debajo para verla */}
      <h2 className="mt-10 mb-3 text-sm font-semibold text-slate-500 uppercase">
        Ejemplo: confirmar retiro
      </h2>
      <div className="flex justify-center rounded-xl bg-slate-900/60 p-8">
        <Tarjeta className="w-full max-w-sm p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <XCircle size={24} />
          </div>
          <h3 className="mt-4 font-semibold text-slate-900">
            ¿Retirarte del curso?
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Dejarás de estar inscrito en <strong>React con TypeScript</strong>.
            Esta acción cambia tu inscripción a RETIRADA.
          </p>
          <div className="mt-6 flex gap-2">
            <Boton variante="secundario" className="flex-1">
              Cancelar
            </Boton>
            <Boton className="flex-1 bg-red-600 hover:bg-red-700">
              Sí, retirarme
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </>
  );
}

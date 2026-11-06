import { ArrowLeft, Award, TrendingUp } from "lucide-react";
import { PlantillaApp } from "../components/layout/PlantillaApp";
import { EstadoInscripcionInsignia } from "../components/ui/EstadoInscripcionInsignia";
import { Insignia } from "../components/ui/Insignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { calificaciones } from "../data/mock";

export function CalificacionesPage() {
  return (
    <>
      <a href="#" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft size={16} /> Volver a mis inscripciones
      </a>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Inscripción #102</p>
          <h1 className="text-2xl font-bold text-slate-900">React con TypeScript</h1>
        </div>
        <EstadoInscripcionInsignia estado="ACTIVA" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Promedio */}
        <Tarjeta className="flex flex-col items-center justify-center p-8 text-center">
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-marca-100">
            <div className="absolute inset-[-10px] rounded-full border-[10px] border-marca-500 border-b-transparent border-l-transparent" />
            <div>
              <p className="text-4xl font-bold text-slate-900">78</p>
              <p className="text-xs text-slate-500">de 100</p>
            </div>
          </div>
          <p className="mt-5 flex items-center gap-1.5 font-semibold text-slate-900">
            <Award size={18} className="text-marca-600" /> Promedio del curso
          </p>
          <p className="mt-1 text-sm text-slate-500">Aprobado con 51 puntos o más</p>
        </Tarjeta>

        {/* Lista de notas */}
        <Tarjeta className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="font-semibold text-slate-900">Calificaciones</h2>
            <span className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp size={14} /> 4 evaluaciones
            </span>
          </div>
          <ul className="divide-y divide-slate-100">
            {calificaciones.map((calificacion) => (
              <li key={calificacion.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{calificacion.descripcion}</p>
                  <p className="text-xs text-slate-500">{calificacion.fecha}</p>
                </div>
                <div className="hidden w-40 sm:block">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${calificacion.nota >= 51 ? "bg-emerald-500" : "bg-red-500"}`}
                      style={{ width: `${calificacion.nota}%` }}
                    />
                  </div>
                </div>
                <Insignia color={calificacion.nota >= 80 ? "verde" : calificacion.nota >= 51 ? "azul" : "rojo"}>
                  {calificacion.nota} pts
                </Insignia>
              </li>
            ))}
          </ul>
        </Tarjeta>
      </div>
    </>
  );
}

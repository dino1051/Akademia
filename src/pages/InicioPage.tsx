import {
  Award,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Clock,
} from "lucide-react";
import { PlantillaApp } from "../components/layout/PlantillaApp";
import { Boton } from "../components/ui/Boton";
import { EstadoInscripcionInsignia } from "../components/ui/EstadoInscripcionInsignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { TarjetaEstadistica } from "../components/ui/TarjetaEstadistica";
import { cursos, misInscripciones } from "../data/mock";

export function InicioPage() {
  return (
    <>
      {/* Bienvenida */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-marca-700 to-marca-500 p-6 text-white sm:p-8">
        <p className="text-sm text-marca-100">Semestre 2026 - II</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">¡Hola, Ana!</h1>
        <p className="mt-2 max-w-xl text-marca-100">
          Tienes 2 cursos activos. Revisa tus calificaciones y no olvides las
          fechas de inscripción.
        </p>
        <Boton variante="secundario" className="mt-5 border-0">
          Explorar cursos
        </Boton>
      </div>

      {/* Números */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaEstadistica
          titulo="Cursos activos"
          valor="2"
          detalle="De 4 inscripciones en total"
          icono={<BookOpen size={20} />}
        />
        <TarjetaEstadistica
          titulo="Promedio general"
          valor="85"
          detalle="Sobre 100 puntos"
          icono={<Award size={20} />}
        />
        <TarjetaEstadistica
          titulo="Créditos"
          valor="7"
          detalle="Créditos en curso"
          icono={<ClipboardList size={20} />}
        />
        <TarjetaEstadistica
          titulo="Próxima clase"
          valor="18:00"
          detalle="Lunes · HTML y CSS"
          icono={<Clock size={20} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Inscripciones recientes */}
        <Tarjeta className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Mis inscripciones</h2>
            <a
              href="#"
              className="text-sm font-medium text-marca-600 hover:text-marca-700"
            >
              Ver todas
            </a>
          </div>
          <ul className="divide-y divide-slate-100">
            {misInscripciones.map((inscripcion) => (
              <li
                key={inscripcion.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-marca-50 p-2 text-marca-600">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {inscripcion.curso}
                    </p>
                    <p className="text-xs text-slate-500">
                      {inscripcion.docente}
                    </p>
                  </div>
                </div>
                <EstadoInscripcionInsignia estado={inscripcion.estado} />
              </li>
            ))}
          </ul>
        </Tarjeta>

        {/* Cursos con cupos */}
        <Tarjeta>
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Cursos con cupos</h2>
          </div>
          <ul className="space-y-1 p-3">
            {cursos.slice(3, 6).map((curso) => (
              <li key={curso.id} className="rounded-lg p-3 hover:bg-slate-50">
                <p className="text-sm font-medium text-slate-900">
                  {curso.nombre}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays size={13} /> {curso.horario}
                </p>
              </li>
            ))}
          </ul>
        </Tarjeta>
      </div>
    </>
  );
}

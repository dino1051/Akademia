import {
  ArrowLeft,
  BookOpen,
  Clock,
  GraduationCap,
  User,
  Users,
} from "lucide-react";

import { Avatar } from "../components/ui/Avatar";
import { BarraProgreso } from "../components/ui/BarraProgreso";
import { Boton } from "../components/ui/Boton";
import { Insignia } from "../components/ui/Insignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { cursos, estudiantes } from "../data/mock";

const curso = cursos[2]; // "React con TypeScript" como ejemplo

const temas = [
  "Componentes y props",
  "useState y eventos",
  "useEffect y consumo de APIs",
  "Rutas con React Router",
  "Autenticación con token",
  "Proyecto final",
];

export function CursoDetallePage() {
  return (
    <>
      <a
        href="#"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={16} /> Volver a cursos
      </a>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información principal */}
        <div className="space-y-6 lg:col-span-2">
          <Tarjeta className="overflow-hidden">
            <div className="bg-gradient-to-r from-marca-700 to-marca-500 p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">
                  {curso.categoria}
                </span>
                <span className="font-mono text-xs text-marca-100">
                  {curso.codigo}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                {curso.nombre}
              </h1>
              <p className="mt-2 max-w-2xl text-marca-100">
                {curso.descripcion}
              </p>
            </div>
            <div className="grid grid-cols-2 divide-slate-100 sm:grid-cols-4 sm:divide-x">
              {[
                { icono: User, etiqueta: "Docente", valor: curso.docente },
                { icono: Clock, etiqueta: "Horario", valor: curso.horario },
                {
                  icono: GraduationCap,
                  etiqueta: "Créditos",
                  valor: `${curso.creditos} créditos`,
                },
                {
                  icono: Users,
                  etiqueta: "Cupos",
                  valor: `${curso.inscritos} de ${curso.cupo}`,
                },
              ].map(({ icono: Icono, etiqueta, valor }) => (
                <div key={etiqueta} className="p-4">
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Icono size={14} /> {etiqueta}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {valor}
                  </p>
                </div>
              ))}
            </div>
          </Tarjeta>

          <Tarjeta className="p-6">
            <h2 className="font-semibold text-slate-900">
              Contenido del curso
            </h2>
            <ol className="mt-4 space-y-3">
              {temas.map((tema, i) => (
                <li key={tema} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-marca-50 text-xs font-semibold text-marca-700">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700">{tema}</span>
                </li>
              ))}
            </ol>
          </Tarjeta>

          {/* Vista que verá el ADMIN o el DOCENTE del curso */}
          <Tarjeta>
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="font-semibold text-slate-900">
                Estudiantes inscritos
              </h2>
              <Insignia color="ambar">Solo admin / docente</Insignia>
            </div>
            <ul className="divide-y divide-slate-100">
              {estudiantes.slice(0, 4).map((estudiante) => (
                <li
                  key={estudiante.id}
                  className="flex items-center gap-3 px-6 py-3"
                >
                  <Avatar nombre={estudiante.nombre} tamano="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {estudiante.nombre}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {estudiante.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Tarjeta>
        </div>

        {/* Panel de inscripción */}
        <div>
          <Tarjeta className="p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-marca-50 p-2.5 text-marca-600">
                <BookOpen size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Inscripciones abiertas</p>
                <p className="font-semibold text-slate-900">
                  Hasta el 30/11/2026
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Cupos ocupados</span>
                <span className="font-semibold text-slate-800">
                  {curso.inscritos}/{curso.cupo}
                </span>
              </div>
              <BarraProgreso valor={(curso.inscritos / curso.cupo) * 100} />
              <p className="text-xs text-slate-500">
                Quedan {curso.cupo - curso.inscritos} cupos disponibles.
              </p>
            </div>

            <Boton anchoCompleto className="mt-6">
              Inscribirme en este curso
            </Boton>
            <p className="mt-3 text-center text-xs text-slate-400">
              Puedes retirarte en cualquier momento.
            </p>
          </Tarjeta>
        </div>
      </div>
    </>
  );
}

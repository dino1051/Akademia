import { Search } from "lucide-react";
import { TarjetaCurso } from "../components/cursos/TarjetaCurso";
import { useCursos } from "../hooks/useCursos";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
//import { cursos } from "../data/mock";

const categorias = [
  "Todos",
  "Desarrollo Web",
  "Frontend",
  "Backend",
  "Idiomas",
  "Desarrollo personal",
];

export function CursosPage() {
  const { cursos, cargando, error, cargarCursos } = useCursos();
  const reintentarCarga = async () => {
    try {
      await cargarCursos();
    } catch {
      console.log("Error, no fue posible cargar los datos");
    }
  };
  return (
    <>
      <EncabezadoPagina
        titulo="Cursos disponibles"
        descripcion="Elige un curso e inscríbete mientras haya cupos."
      />

      {cargando ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          Cargando citas...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-white p-12 text-center">
          <p className="font-semibold text-red-600">
            No fue posible cargar las citas.
          </p>

          <button
            type="button"
            onClick={reintentarCarga}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Reintentar
          </button>
        </div>
      ) : cursos.length == 0 ? (
        <h1 className="font-semibold text-slate-700">
          No se encontraron citas
        </h1>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative lg:w-80">
              <Search
                size={18}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Buscar por nombre o código..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3 pl-10 text-sm focus:border-marca-500 focus:ring-4 focus:ring-marca-100 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria, i) => (
                <button
                  key={categoria}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
                    i === 0
                      ? "bg-marca-600 text-white"
                      : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cursos.map((curso) => (
              <TarjetaCurso
                key={curso.id}
                curso={curso}
                inscrito={curso.id === 1 || curso.id === 3}
              />
            ))}
          </div>
        </>
      )}
      {/* Buscador y filtros (solo visual) */}
    </>
  );
}

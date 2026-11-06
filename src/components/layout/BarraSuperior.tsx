import { Link } from "react-router-dom";

interface BarraSuperiorProps {
  nombre?: string;
  rol?: string;
  foto?: string | null;
}

export default function BarraSuperior({
  nombre = "Estudiante",
  rol = "Estudiante",
  foto,
}: BarraSuperiorProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-72 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            🔔
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            💬
          </button>

          <Link
            to="/perfil"
            className="flex items-center gap-3 rounded-lg p-1 hover:bg-slate-100"
          >
            {foto ? (
              <img
                src={foto}
                alt={nombre}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-marca-100 font-semibold text-marca-700">
                {nombre.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">{nombre}</p>

              <p className="text-xs text-slate-500">{rol}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

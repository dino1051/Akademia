import { Link } from "react-router-dom";
import BarraLateral from "../components/layout/BarraLateral";
import BarraSuperior from "../components/layout/BarraSuperior";
import { useCursos } from "../hooks/useCursos";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardPage() {
  const { cursos, cargando, error } = useCursos();

  const usuario = useAuthStore((state) => state.usuario);

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
          {/* Bienvenida */}
          <section className="mb-8">
            <p className="text-sm font-medium text-marca-600">
              Panel de estudiante
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              ¡Hola, {usuario?.nombre ?? "estudiante"}! 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Continúa aprendiendo y alcanza tus objetivos.
            </p>
          </section>

          {/* Métricas */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Cursos disponibles</p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {cargando ? "..." : cursos.length}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Cursos con créditos</p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {cargando
                  ? "..."
                  : cursos.reduce((total, curso) => total + curso.creditos, 0)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Lugares disponibles</p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {cargando
                  ? "..."
                  : cursos.reduce(
                      (total, curso) => total + curso.disponibles,
                      0,
                    )}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Cursos con docente</p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {cargando
                  ? "..."
                  : cursos.filter((curso) => curso.docente).length}
              </p>
            </div>
          </section>

          {/* Cursos */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Cursos</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Explora los cursos disponibles.
                </p>
              </div>

              <Link
                to="/mis-cursos"
                className="text-sm font-semibold text-marca-600 hover:text-marca-700"
              >
                Ver todos
              </Link>
            </div>

            {cargando && (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-500">Cargando cursos...</p>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="font-medium text-red-700">{error}</p>
              </div>
            )}

            {!cargando && !error && cursos.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-500">No hay cursos disponibles.</p>
              </div>
            )}

            {!cargando && !error && cursos.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {cursos.map((curso) => (
                  <article
                    key={curso.id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-32 items-center justify-between bg-marca-100 px-6">
                      <div>
                        <p className="text-sm font-semibold text-marca-700">
                          {curso.codigo}
                        </p>

                        <p className="mt-1 text-3xl font-bold text-marca-900">
                          {curso.creditos}
                        </p>

                        <p className="text-xs text-marca-700">créditos</p>
                      </div>

                      <span className="text-4xl">📚</span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900">
                        {curso.nombre}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {curso.descripcion}
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-slate-500">
                        <p>
                          👨‍🏫{" "}
                          <span className="font-medium text-slate-700">
                            {curso.docente.nombre} {curso.docente.apellido}
                          </span>
                        </p>

                        <p>
                          👥 {curso.inscritos} / {curso.cupo} inscritos
                        </p>

                        <p>🪑 {curso.disponibles} lugares disponibles</p>
                      </div>

                      <div className="mt-5">
                        <Link
                          to={`/cursos/${curso.id}`}
                          className="inline-flex rounded-lg bg-marca-600 px-4 py-2 text-sm font-semibold text-white hover:bg-marca-700"
                        >
                          Ver curso
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

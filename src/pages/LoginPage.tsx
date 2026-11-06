import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setCargando(true);

    try {
      const respuesta = await authService.login({
        username,
        password,
      });

      console.log("Respuesta login:", respuesta);

      iniciarSesion(respuesta.token, respuesta.usuario);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setError("Usuario o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Panel izquierdo */}
        <div className="hidden bg-gradient-to-br from-marca-700 via-marca-600 to-marca-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Akademia</h1>

            <p className="mt-2 max-w-md text-lg text-white/80">
              Tu próximo aprendizaje comienza aquí.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Aprende.
              <br />
              Crece.
              <br />
              Transforma.
            </h2>

            <p className="mt-6 max-w-md text-white/80">
              Accede a tus cursos, revisa tu progreso y continúa desarrollando
              nuevas habilidades.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold">+45K</p>
                <p className="text-sm text-white/70">Estudiantes</p>
              </div>

              <div>
                <p className="text-3xl font-bold">+120</p>
                <p className="text-sm text-white/70">Cursos</p>
              </div>

              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-white/70">Acceso</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/60">Excelencia Educativa</p>
        </div>

        {/* Panel derecho */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Bienvenido de nuevo
              </h2>

              <p className="mt-2 text-slate-500">
                Ingresa a tu cuenta para continuar aprendiendo.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Usuario
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  placeholder="Tu usuario"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={mostrarPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                    placeholder="Tu contraseña"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarPassword((actual) => !actual)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-800"
                  >
                    {mostrarPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-marca-600 focus:ring-marca-500"
                  />
                  Recordarme
                </label>

                <Link
                  to="/recuperar-password"
                  className="text-sm font-medium text-marca-600 hover:text-marca-700"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded-lg bg-marca-600 px-4 py-3 font-semibold text-white transition hover:bg-marca-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="font-semibold text-marca-600 hover:text-marca-700"
              >
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

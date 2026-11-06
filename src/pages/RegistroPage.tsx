import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";
import { mensajeError } from "../lib/errores";

export default function RegisterPage() {
  const navigate = useNavigate();

  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);

  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Se ejecutó handleSubmit");
    setError(null);

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await authService.registrar({
        username,
        password,
        nombre,
        apellido,
        email: email || undefined,
      });

      console.log("Respuesta registro:", respuesta);

      iniciarSesion(respuesta.token, respuesta.usuario);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error al registrarse:", error);

      setError(mensajeError(error, "No fue posible crear la cuenta."));
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

            <p className="mt-2 text-white/80">
              Tu próximo aprendizaje comienza aquí.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Comienza tu
              <br />
              camino de
              <br />
              aprendizaje.
            </h2>

            <p className="mt-6 max-w-md text-white/80">
              Crea tu cuenta y comienza a explorar todos los cursos disponibles
              en Akademia.
            </p>
          </div>

          <p className="text-sm text-white/60">Excelencia Educativa</p>
        </div>

        {/* Formulario */}
        <div className="flex items-center justify-center overflow-y-auto p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Crear cuenta
              </h2>

              <p className="mt-2 text-slate-500">
                Regístrate para comenzar tu experiencia de aprendizaje.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <p className="mb-1 font-semibold">
                  No se pudo completar el registro
                </p>

                <p className="whitespace-pre-line">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Nombre
                </label>

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Apellido
                </label>

                <input
                  id="apellido"
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  placeholder="Tu apellido"
                />
              </div>

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
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  placeholder="Elige un usuario"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  placeholder="Crea una contraseña"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmarPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirmar contraseña
                </label>

                <input
                  id="confirmarPassword"
                  type="password"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  placeholder="Repite tu contraseña"
                />
              </div>

              <label className="flex items-start gap-2 pt-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-slate-300 text-marca-600 focus:ring-marca-500"
                />

                <span>Acepto los términos y condiciones de uso.</span>
              </label>

              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded-lg bg-marca-600 px-4 py-3 font-semibold text-white transition hover:bg-marca-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cargando ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-marca-600 hover:text-marca-700"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

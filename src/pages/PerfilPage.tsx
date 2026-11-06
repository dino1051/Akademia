import { Camera, Lock, Mail, Trash2, User } from "lucide-react";
import { PlantillaApp } from "../components/layout/PlantillaApp";
import { Avatar } from "../components/ui/Avatar";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { Insignia } from "../components/ui/Insignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { usuarioActual } from "../data/mock";

export function PerfilPage() {
  return (
    <>
      <EncabezadoPagina
        titulo="Mi perfil"
        descripcion="Tus datos personales y seguridad de la cuenta."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Foto */}
        <Tarjeta className="p-6 text-center">
          <div className="relative mx-auto w-fit">
            <Avatar
              nombre={usuarioActual.nombre}
              fotoUrl={usuarioActual.fotoUrl}
              tamano="lg"
            />
            <button
              className="absolute right-0 bottom-0 rounded-full border-2 border-white bg-marca-600 p-1.5 text-white"
              aria-label="Cambiar foto"
            >
              <Camera size={14} />
            </button>
          </div>
          <h2 className="mt-4 font-semibold text-slate-900">
            {usuarioActual.nombre}
          </h2>
          <p className="text-sm text-slate-500">{usuarioActual.email}</p>
          <div className="mt-3">
            <Insignia color="azul">{usuarioActual.rol}</Insignia>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Boton variante="secundario" icono={<Camera size={16} />}>
              Subir nueva foto
            </Boton>
            <Boton variante="peligro" icono={<Trash2 size={16} />}>
              Eliminar foto
            </Boton>
          </div>
        </Tarjeta>

        <div className="space-y-6 lg:col-span-2">
          {/* Datos */}
          <Tarjeta className="p-6">
            <h2 className="font-semibold text-slate-900">Datos personales</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <CampoTexto
                id="nombre"
                etiqueta="Nombre"
                defaultValue={usuarioActual.nombre}
                icono={<User size={18} />}
                disabled
              />
              <CampoTexto
                id="correo"
                etiqueta="Correo"
                defaultValue={usuarioActual.email}
                icono={<Mail size={18} />}
                disabled
              />
            </div>
          </Tarjeta>

          {/* Cambiar contraseña */}
          <Tarjeta className="p-6">
            <h2 className="font-semibold text-slate-900">Cambiar contraseña</h2>
            <form className="mt-5 space-y-5">
              <CampoTexto
                id="actual"
                etiqueta="Contraseña actual"
                type="password"
                placeholder="••••••••"
                icono={<Lock size={18} />}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <CampoTexto
                  id="nueva"
                  etiqueta="Nueva contraseña"
                  type="password"
                  placeholder="••••••••"
                  icono={<Lock size={18} />}
                />
                <CampoTexto
                  id="repetir"
                  etiqueta="Repite la nueva"
                  type="password"
                  placeholder="••••••••"
                  icono={<Lock size={18} />}
                />
              </div>
              <div className="flex justify-end">
                <Boton type="submit">Guardar contraseña</Boton>
              </div>
            </form>
          </Tarjeta>
        </div>
      </div>
    </>
  );
}

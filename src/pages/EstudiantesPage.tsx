import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import { PlantillaApp } from "../components/layout/PlantillaApp";
import { Avatar } from "../components/ui/Avatar";
import { Boton } from "../components/ui/Boton";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { Insignia } from "../components/ui/Insignia";
import { Tarjeta } from "../components/ui/Tarjeta";
import { estudiantes } from "../data/mock";

export function EstudiantesPage() {
  return (
    <>
      <EncabezadoPagina
        titulo="Estudiantes"
        descripcion="Gestión de estudiantes registrados (solo ADMIN)."
        acciones={
          <Boton icono={<UserPlus size={16} />}>Nuevo estudiante</Boton>
        }
      />

      <Tarjeta className="overflow-hidden">
        {/* Barra de filtros */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Buscar por nombre o correo..."
              className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-10 text-sm focus:border-marca-500 focus:outline-none"
            />
          </div>
          <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
            <option>Todos los estados</option>
            <option>Activos</option>
            <option>Inactivos</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Estudiante</th>
                <th className="px-5 py-3 font-semibold">Rol</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {estudiantes.map((estudiante) => (
                <tr key={estudiante.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar nombre={estudiante.nombre} tamano="sm" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {estudiante.nombre}
                        </p>
                        <p className="text-xs text-slate-500">
                          {estudiante.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Insignia color="azul">{estudiante.rol}</Insignia>
                  </td>
                  <td className="px-5 py-3">
                    <Insignia color={estudiante.activo ? "verde" : "gris"}>
                      {estudiante.activo ? "Activo" : "Inactivo"}
                    </Insignia>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        aria-label="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación (solo visual) */}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-sm text-slate-500">
          <span>Mostrando 1 - 7 de 7</span>
          <div className="flex gap-1">
            <button
              className="rounded-lg border border-slate-300 p-1.5 hover:bg-slate-50"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="rounded-lg border border-slate-300 p-1.5 hover:bg-slate-50"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Tarjeta>
    </>
  );
}

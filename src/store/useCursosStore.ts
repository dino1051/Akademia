import { create } from "zustand";
import { cursosService } from "../services/cursos";
import type { Curso } from "../types/curso";

interface CursosState {
  cursos: Curso[];
  cargando: boolean;
  error: string | null;

  cargarCursos: () => Promise<void>;
}

export const useCursosStore = create<CursosState>()((set) => ({
  cursos: [],
  cargando: false,
  error: null,

  cargarCursos: async () => {
    set({ cargando: true, error: null });

    try {
      const cursos = await cursosService.getTodos();
      set({ cursos });
    } catch (error) {
      set({ error: "No fue posible cargar los cursos." });
    } finally {
      set({ cargando: false });
    }
  },
}));

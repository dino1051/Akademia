import { useEffect, useCallback } from "react";
import { useCursosStore } from "../store/useCursosStore";

export function useCursos() {
  const cursos = useCursosStore((s) => s.cursos);
  const cargando = useCursosStore((s) => s.cargando);
  const error = useCursosStore((s) => s.error);

  const cargarCursos = useCursosStore((s) => s.cargarCursos);

  useEffect(() => {
    void cargarCursos();
  }, [cargarCursos]);

  return { cursos, cargando, error, cargarCursos };
}

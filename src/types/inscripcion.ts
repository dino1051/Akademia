export type EstadoInscripcion = "ACTIVA" | "RETIRADA" | "FINALIZADA";

export interface EstudianteInscripcion {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  fotoUrl: string | null;
}

export interface CursoInscripcion {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
}

export interface Calificacion {
  id: number;
  inscripcionId: number;
  descripcion: string;
  nota: number;
  fecha: string;
}

export interface Inscripcion {
  id: number;
  estado: EstadoInscripcion;
  fecha: string;
  estudiante: EstudianteInscripcion;
  curso: CursoInscripcion;
  calificaciones: Calificacion[];
  promedio: number | null;
}

export interface CrearInscripcionDTO {
  cursoId: number;
  estudianteId: number;
}

export interface ActualizarEstadoInscripcionDTO {
  estado: EstadoInscripcion;
}

// DATOS DE EJEMPLO (solo para dibujar las pantallas).
// Cuando conectemos la API, estos datos se reemplazan por los del backend.
import type { Curso } from "../types/curso";
import type { Calificacion, Inscripcion } from "../types/inscripcion";
import type { Usuario } from "../types/usuario";

export const usuarioActual: Usuario = {
  id: 7,
  nombre: "Ana Quispe",
  email: "ana.quispe@funval.org",
  rol: "ESTUDIANTE",
  activo: true,
  fotoUrl: null,
};

export const cursos: Curso[] = [
  {
    id: 1,
    codigo: "WEB-101",
    nombre: "Fundamentos de HTML y CSS",
    descripcion: "Estructura de páginas, estilos, Flexbox y Grid para crear sitios responsivos.",
    docente: "Carlos Mendoza",
    creditos: 3,
    cupo: 30,
    inscritos: 24,
    horario: "Lun y Mié · 18:00 - 20:00",
    categoria: "Desarrollo Web",
  },
  {
    id: 2,
    codigo: "JS-201",
    nombre: "JavaScript desde cero",
    descripcion: "Variables, funciones, arreglos, objetos, DOM y programación asíncrona.",
    docente: "Lucía Fernández",
    creditos: 4,
    cupo: 25,
    inscritos: 25,
    horario: "Mar y Jue · 18:00 - 20:00",
    categoria: "Desarrollo Web",
  },
  {
    id: 3,
    codigo: "REACT-301",
    nombre: "React con TypeScript",
    descripcion: "Componentes, hooks, rutas y consumo de APIs REST con axios.",
    docente: "Carlos Mendoza",
    creditos: 4,
    cupo: 30,
    inscritos: 18,
    horario: "Lun y Mié · 20:00 - 22:00",
    categoria: "Frontend",
  },
  {
    id: 4,
    codigo: "BD-110",
    nombre: "Bases de datos SQL",
    descripcion: "Modelado relacional, consultas SELECT, JOIN y buenas prácticas.",
    docente: "Jorge Rivas",
    creditos: 3,
    cupo: 20,
    inscritos: 12,
    horario: "Vie · 17:00 - 21:00",
    categoria: "Backend",
  },
  {
    id: 5,
    codigo: "ING-100",
    nombre: "Inglés técnico",
    descripcion: "Vocabulario y lectura de documentación técnica en inglés.",
    docente: "María Torres",
    creditos: 2,
    cupo: 35,
    inscritos: 9,
    horario: "Sáb · 09:00 - 12:00",
    categoria: "Idiomas",
  },
  {
    id: 6,
    codigo: "SOFT-120",
    nombre: "Habilidades blandas",
    descripcion: "Comunicación efectiva, trabajo en equipo y preparación para entrevistas.",
    docente: "Patricia Gómez",
    creditos: 2,
    cupo: 40,
    inscritos: 31,
    horario: "Sáb · 14:00 - 16:00",
    categoria: "Desarrollo personal",
  },
];

export const misInscripciones: Inscripcion[] = [
  { id: 101, cursoId: 1, curso: "Fundamentos de HTML y CSS", docente: "Carlos Mendoza", fecha: "12/08/2026", estado: "ACTIVA", promedio: 86 },
  { id: 102, cursoId: 3, curso: "React con TypeScript", docente: "Carlos Mendoza", fecha: "14/08/2026", estado: "ACTIVA", promedio: 78 },
  { id: 103, cursoId: 5, curso: "Inglés técnico", docente: "María Torres", fecha: "15/08/2026", estado: "RETIRADA", promedio: null },
  { id: 104, cursoId: 2, curso: "JavaScript desde cero", docente: "Lucía Fernández", fecha: "02/03/2026", estado: "FINALIZADA", promedio: 91 },
];

export const calificaciones: Calificacion[] = [
  { id: 1, descripcion: "Práctica 1 · Componentes", nota: 90, fecha: "20/08/2026" },
  { id: 2, descripcion: "Práctica 2 · Hooks", nota: 72, fecha: "03/09/2026" },
  { id: 3, descripcion: "Examen parcial", nota: 68, fecha: "17/09/2026" },
  { id: 4, descripcion: "Proyecto · Mini tienda", nota: 85, fecha: "01/10/2026" },
];

export const estudiantes: Usuario[] = [
  { id: 7, nombre: "Ana Quispe", email: "ana.quispe@funval.org", rol: "ESTUDIANTE", activo: true, fotoUrl: null },
  { id: 8, nombre: "Bruno Salazar", email: "bruno.salazar@funval.org", rol: "ESTUDIANTE", activo: true, fotoUrl: null },
  { id: 9, nombre: "Camila Rojas", email: "camila.rojas@funval.org", rol: "ESTUDIANTE", activo: false, fotoUrl: null },
  { id: 10, nombre: "Diego Vargas", email: "diego.vargas@funval.org", rol: "ESTUDIANTE", activo: true, fotoUrl: null },
  { id: 11, nombre: "Elena Choque", email: "elena.choque@funval.org", rol: "ESTUDIANTE", activo: true, fotoUrl: null },
  { id: 12, nombre: "Fernando Lima", email: "fernando.lima@funval.org", rol: "ESTUDIANTE", activo: true, fotoUrl: null },
  { id: 13, nombre: "Gabriela Paz", email: "gabriela.paz@funval.org", rol: "ESTUDIANTE", activo: false, fotoUrl: null },
];

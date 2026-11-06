import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistroPage";
import DashboardPage from "./pages/DashboardPage";
import MisCursosPage from "./pages/MisCursosPage";
import { RutaProtegida } from "./components/layout/RutaProtegida";
import MisCursoDetallePage from "./pages/MiCursoDetallePage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/registro" element={<RegisterPage />} />

      {/* Rutas protegidas */}
      <Route element={<RutaProtegida />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/mis-cursos" element={<MisCursosPage />} />
        <Route path="/mis-cursos/:id" element={<MisCursoDetallePage />} />
        {/* Las siguientes las iremos creando */}
        {/* 
        <Route path="/aula-virtual" element={<AulaVirtualPage />} />
        <Route path="/calificaciones" element={<CalificacionesPage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/certificados" element={<CertificadosPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
        */}
      </Route>

      {/* Ruta inexistente */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

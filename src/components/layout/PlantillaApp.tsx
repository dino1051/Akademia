import type { ReactNode } from "react";
import { BarraLateral } from "./BarraLateral";
import { BarraSuperior } from "./BarraSuperior";
import { Outlet } from "react-router-dom";

export function PlantillaApp() {
  return (
    <div className="flex min-h-screen">
      <BarraLateral />
      <div className="flex min-w-0 flex-1 flex-col">
        <BarraSuperior />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}

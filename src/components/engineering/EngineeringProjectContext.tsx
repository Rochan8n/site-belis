"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { applications } from "./engineeringContent";

type ApplicationId = typeof applications[number]["id"];
type Sector = typeof applications[number]["sector"] | "Outro projeto";
type ProjectContext = {
  application: ApplicationId | null;
  sector: Sector;
  selectApplication: (id: ApplicationId) => void;
  selectSector: (sector: string) => void;
};

const EngineeringProjectContext = createContext<ProjectContext | null>(null);

export function EngineeringProjectProvider({ children }: { children: ReactNode }) {
  const [sector, setSector] = useState<Sector>(applications[0].sector);
  const application = applications.find((item) => item.sector === sector)?.id ?? null;

  function selectApplication(id: ApplicationId) {
    setSector(applications.find((item) => item.id === id)!.sector);
  }

  function selectSector(sector: string) {
    if (sector === "Outro projeto") {
      setSector(sector);
      return;
    }
    const application = applications.find((item) => item.sector === sector);
    if (application) setSector(application.sector);
  }

  return <EngineeringProjectContext.Provider value={{ application, sector, selectApplication, selectSector }}>{children}</EngineeringProjectContext.Provider>;
}

export function useEngineeringProject() {
  const context = useContext(EngineeringProjectContext);
  if (!context) throw new Error("Engineering project controls require EngineeringProjectProvider");
  return context;
}

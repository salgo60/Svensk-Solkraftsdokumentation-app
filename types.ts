
export interface ProjectData {
  projectName: string;
  location: string;
  capacityMWp: string;
  annualProductionMWh: string;
  technology: {
    panelType: string;
    inverterType: string;
    mountingSystem: string;
  };
  bess: {
    exists: boolean;
    capacityMW: string;
    energyMWh: string;
  };
  gridConnection: {
    voltageLevel: string;
    connectionPoint: string;
    operator: string;
  };
  environmental: {
    landType: string;
    environmentalImpact: string;
    proximityProtected: string;
  };
}

export interface DocumentationResult {
  permitDescription: string;
  gridTechnicalDescription: string;
  municipalitySummary: string;
  deficiencyChecklist: string;
}

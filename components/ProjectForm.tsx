
import React, { useState } from 'react';
import { ProjectData } from '../types';

interface ProjectFormProps {
  onSubmit: (data: ProjectData) => void;
  isLoading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProjectData>({
    projectName: '',
    location: '',
    capacityMWp: '',
    annualProductionMWh: '',
    technology: {
      panelType: 'Bifacial Monocrystalline',
      inverterType: 'Strängväxelriktare',
      mountingSystem: 'Markmonterat stativ',
    },
    bess: {
      exists: false,
      capacityMW: '',
      energyMWh: '',
    },
    gridConnection: {
      voltageLevel: '',
      connectionPoint: '',
      operator: '',
    },
    environmental: {
      landType: '',
      environmentalImpact: '',
      proximityProtected: '',
    },
  });

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    if (keys.length === 1) {
      setFormData(prev => ({ ...prev, [keys[0]]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...(prev as any)[keys[0]],
          [keys[1]]: value
        }
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm";
  const labelClasses = "block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-tight";
  const sectionClasses = "bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={sectionClasses}>
        <h2 className="text-lg font-bold mb-4 flex items-center text-slate-800 border-b pb-2">
          <i className="fa-solid fa-map-location-dot mr-2 text-blue-500"></i>
          Basinformation & Plats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Projektnamn</label>
            <input 
              required
              type="text" 
              className={inputClasses} 
              placeholder="t.ex. Solpark Björnen"
              value={formData.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Plats / Kommun</label>
            <input 
              required
              type="text" 
              className={inputClasses} 
              placeholder="t.ex. Ljungby kommun"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Installerad Effekt (MWp)</label>
            <input 
              required
              type="number" 
              className={inputClasses} 
              placeholder="t.ex. 45"
              value={formData.capacityMWp}
              onChange={(e) => handleChange('capacityMWp', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Uppskattad Årsproduktion (MWh)</label>
            <input 
              required
              type="number" 
              className={inputClasses} 
              placeholder="t.ex. 48000"
              value={formData.annualProductionMWh}
              onChange={(e) => handleChange('annualProductionMWh', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className="text-lg font-bold mb-4 flex items-center text-slate-800 border-b pb-2">
          <i className="fa-solid fa-microchip mr-2 text-blue-500"></i>
          Teknik & Batterilagring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className={labelClasses}>Paneltyp</label>
            <select 
              className={inputClasses}
              value={formData.technology.panelType}
              onChange={(e) => handleChange('technology.panelType', e.target.value)}
            >
              <option>Bifacial Monocrystalline</option>
              <option>Standard Monocrystalline</option>
              <option>Thin Film</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Växelriktare</label>
            <select 
              className={inputClasses}
              value={formData.technology.inverterType}
              onChange={(e) => handleChange('technology.inverterType', e.target.value)}
            >
              <option>Strängväxelriktare</option>
              <option>Centralväxelriktare</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Montagesystem</label>
            <select 
              className={inputClasses}
              value={formData.technology.mountingSystem}
              onChange={(e) => handleChange('technology.mountingSystem', e.target.value)}
            >
              <option>Markmonterat stativ</option>
              <option>Solföljare (Tracker)</option>
              <option>Öst-Västlig konfiguration</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <label className="flex items-center space-x-3 cursor-pointer mb-4">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
              checked={formData.bess.exists}
              onChange={(e) => handleChange('bess.exists', e.target.checked)}
            />
            <span className="font-bold text-slate-800 text-sm">Inkludera Batterilagring (BESS)</span>
          </label>
          {formData.bess.exists && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Kapacitet (MW)</label>
                <input 
                  type="number" 
                  className={inputClasses} 
                  placeholder="t.ex. 10"
                  value={formData.bess.capacityMW}
                  onChange={(e) => handleChange('bess.capacityMW', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>Energi (MWh)</label>
                <input 
                  type="number" 
                  className={inputClasses} 
                  placeholder="t.ex. 20"
                  value={formData.bess.energyMWh}
                  onChange={(e) => handleChange('bess.energyMWh', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className="text-lg font-bold mb-4 flex items-center text-slate-800 border-b pb-2">
          <i className="fa-solid fa-plug mr-2 text-blue-500"></i>
          Nätanslutning & Miljö
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClasses}>Nätägare</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="t.ex. E.ON, Vattenfall"
              value={formData.gridConnection.operator}
              onChange={(e) => handleChange('gridConnection.operator', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Spänningsnivå (kV)</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="t.ex. 20 kV, 130 kV"
              value={formData.gridConnection.voltageLevel}
              onChange={(e) => handleChange('gridConnection.voltageLevel', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={labelClasses}>Marktyp / Tidigare Användning</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="t.ex. Nedlagd åkermark, industriområde"
              value={formData.environmental.landType}
              onChange={(e) => handleChange('environmental.landType', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Närhet till skyddad natur / Natura 2000</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="Beskriv avstånd eller frånvaro av skyddad natur"
              value={formData.environmental.proximityProtected}
              onChange={(e) => handleChange('environmental.proximityProtected', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 flex justify-center">
        <button 
          type="submit" 
          disabled={isLoading}
          className={`
            px-8 py-4 rounded-full font-bold text-white shadow-xl transition-all
            ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'}
            flex items-center space-x-2
          `}
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              <span>Genererar underlag...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-file-contract"></i>
              <span>Generera Projektdokumentation</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;

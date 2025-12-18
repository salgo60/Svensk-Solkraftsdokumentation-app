
import React, { useState } from 'react';
import { DocumentationResult } from '../types';

interface DocumentViewerProps {
  results: DocumentationResult;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<keyof DocumentationResult>('permitDescription');

  const tabs: { id: keyof DocumentationResult; label: string; icon: string }[] = [
    { id: 'permitDescription', label: 'Tillståndsansökan', icon: 'fa-landmark' },
    { id: 'gridTechnicalDescription', label: 'Nätteknisk', icon: 'fa-bolt' },
    { id: 'municipalitySummary', label: 'Kommunal', icon: 'fa-city' },
    { id: 'deficiencyChecklist', label: 'Checklista', icon: 'fa-list-check' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Dokument kopierat till urklipp!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in duration-500">
      <div className="flex flex-wrap border-b border-slate-200 bg-slate-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center space-x-2 transition-all
              ${activeTab === tab.id ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}
            `}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-8 md:p-12 min-h-[500px] relative">
        <div className="absolute top-8 right-8 flex space-x-2">
            <button 
                onClick={() => handleCopy(results[activeTab])}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors text-sm flex items-center"
                title="Kopiera text"
            >
                <i className="fa-solid fa-copy mr-2"></i>
                Kopiera
            </button>
            <button 
                onClick={() => window.print()}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors text-sm flex items-center"
                title="Skriv ut"
            >
                <i className="fa-solid fa-print mr-2"></i>
                Skriv ut
            </button>
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-6">
            Genererat Underlag: {tabs.find(t => t.id === activeTab)?.label}
          </div>
          <div className="whitespace-pre-wrap leading-relaxed text-slate-800 font-serif text-lg">
            {results[activeTab]}
          </div>
        </div>
      </div>

      <div className="bg-blue-600 p-4 text-white text-center text-sm font-medium flex items-center justify-center space-x-2">
        <i className="fa-solid fa-wand-magic-sparkles"></i>
        <span>Genererat med hjälp av Gemini-3-Pro Technical Writing Engine</span>
      </div>
    </div>
  );
};

export default DocumentViewer;

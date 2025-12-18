
import React, { useState } from 'react';
import { ProjectData, DocumentationResult } from './types';
import { generateSolarDocumentation } from './geminiService';
import ProjectForm from './components/ProjectForm';
import DocumentViewer from './components/DocumentViewer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DocumentationResult | null>(null);

  const handleGenerate = async (data: ProjectData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateSolarDocumentation(data);
      setResults(result);
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod vid generering av dokumentation.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 p-2 rounded-lg">
              <i className="fa-solid fa-solar-panel text-slate-900 text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Svensk Solkraftsdokumentation</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Technical Writing Engine</p>
            </div>
          </div>
          {results && (
            <button 
              onClick={handleReset}
              className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition-colors"
            >
              <i className="fa-solid fa-plus mr-2"></i> Nytt Projekt
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {!results ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold mb-3 flex items-center text-slate-800">
                  <i className="fa-solid fa-circle-info mr-2 text-blue-500"></i>
                  Instruktioner
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fyll i projektdata i formuläret till höger. Vår AI-motor agerar som en erfaren solkraftsingenjör för att ta fram professionella underlag enligt svensk standard.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-500">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check mt-0.5 mr-2 text-green-500"></i>
                    Anpassat för Länsstyrelsens anmälan
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check mt-0.5 mr-2 text-green-500"></i>
                    Tekniska termer (t.ex. växelriktare, regionnät)
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check mt-0.5 mr-2 text-green-500"></i>
                    Stöd för batterilagring (BESS)
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-blue-900 font-bold text-sm uppercase mb-2">Tips för bättre resultat</h3>
                <p className="text-blue-700 text-xs italic">
                  Ju mer detaljerad information om nätanslutning och marktyp du anger, desto mer träffsäker blir den tekniska beskrivningen.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ProjectForm onSubmit={handleGenerate} isLoading={loading} />
            </div>
          </div>
        ) : (
          <DocumentViewer results={results} />
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <i className="fa-solid fa-triangle-exclamation mr-3 text-red-500"></i>
            <span>{error}</span>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} Svensk Solkraftsdokumentation Engine. Framtagen för proffs i energibranschen.
        </div>
      </footer>
    </div>
  );
};

export default App;

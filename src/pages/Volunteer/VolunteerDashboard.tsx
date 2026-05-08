import React from 'react';
import { useVolunteerLogic } from './useVolunteerLogic';

export const VolunteerDashboard: React.FC = () => {
  const { reports } = useVolunteerLogic();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-gray-800 font-sans">
      
      {/* 1. HEADER SUPERIOR FIJO */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <div className="font-bold text-lg tracking-tighter text-[#7C5C9E]">🐾 snapdog</div>
          <div className="flex gap-4">
            <span>🔍</span>
            <span>🔔</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">M</div>
          </div>
        </div>
      </header>

      {/* 2. CONTENIDO SCROLLEABLE */}
      <main className="flex-1 overflow-y-auto pt-16 pb-20 px-4">
        
        {/* Historias placeholder */}
        <div className="mt-4 mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <div className="min-w-[70px] h-24 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-dashed border-[#7C5C9E] text-xs font-bold text-[#7C5C9E]">
              + Reportar
            </div>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="flex flex-col gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold">{report.dogName}</h3>
              <p className="text-sm text-gray-500">{report.description}</p>
            </div>
          ))}
        </div>
        
      </main>

      {/* 3. NAVEGACIÓN INFERIOR FIJA */}
      <nav className="fixed bottom-0 w-full z-50 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center pb-safe">
        <div className="flex flex-col items-center text-[#7C5C9E]">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-medium">Inicio</span>
        </div>
      </nav>

    </div>
  );
};
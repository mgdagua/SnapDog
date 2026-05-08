import React from 'react';

export const MapModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[40px] w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-2xl font-black text-gray-800">🗺️ Mapa Interactivo — Popayán</h2>
          <button onClick={onClose} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold">✕</button>
        </div>
        <div className="p-8">
          <div className="w-full h-[400px] bg-[#E9E4F0] rounded-[32px] relative flex items-center justify-center overflow-hidden">
            {/* Simulación de mapa con puntos */}
            <div className="absolute w-32 h-32 bg-red-500/20 rounded-full animate-pulse"></div>
            <span className="relative z-10 bg-white px-4 py-2 rounded-full shadow-md font-bold text-xs">📍 Popayán — 12 reportes activos</span>
          </div>
          <div className="mt-6 p-5 bg-[#F8F9FA] rounded-2xl border border-gray-100 flex items-center gap-4">
             <span className="text-2xl">📍</span>
             <p className="text-sm text-gray-600 font-medium">
               <span className="font-bold text-gray-800">Zona más activa:</span> Centro Histórico con 5 reportes abiertos.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
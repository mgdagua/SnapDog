import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Fondo oscuro desenfocado */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Contenedor del Modal */}
      <div className="relative bg-white rounded-t-3xl w-full h-[85vh] flex flex-col shadow-2xl animate-slide-up">
        
        {/* Cabecera del modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            📸 Reportar Animal
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Formulario scrolleable */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Zona de Cámara (Placeholder) */}
          <div className="w-full h-32 bg-[#F3E8FF] border-2 border-dashed border-[#7C5C9E] rounded-2xl flex flex-col items-center justify-center text-[#7C5C9E] font-medium active:bg-[#E9E4F0] transition-colors mb-6">
            <span className="text-3xl mb-1">📷</span>
            <span>Tomar o subir foto del animal</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Nombre o Descripción</label>
              <input type="text" placeholder="Ej: Perro macho, color café..." className="w-full bg-[#F8F9FA] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#7C5C9E] outline-none" />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Ubicación</label>
              <div className="w-full bg-[#F8F9FA] rounded-xl p-4 text-sm flex items-center gap-2 text-gray-500">
                <span className="text-red-400">📍</span> Centro Histórico, Carrera 6...
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Descripción de la situación</label>
              <textarea placeholder="Describe el estado del animal..." rows={3} className="w-full bg-[#F8F9FA] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#7C5C9E] outline-none resize-none"></textarea>
            </div>

            <div>
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Nivel de Urgencia</label>
               <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-[#FFE4E6] text-[#E11D48] border border-[#FDA4AF] rounded-xl text-sm font-bold active:scale-95 transition-transform">🚨 Crítico</button>
                  <button className="flex-1 py-3 bg-white text-yellow-600 border border-gray-200 rounded-xl text-sm font-bold active:bg-gray-50">⚠️ Moderado</button>
                  <button className="flex-1 py-3 bg-white text-green-600 border border-gray-200 rounded-xl text-sm font-bold active:bg-gray-50">✅ Estable</button>
               </div>
            </div>
          </div>
        </div>

        {/* Botón de envío pegado abajo */}
        <div className="p-5 border-t border-gray-100 bg-white pb-safe">
          <button className="w-full bg-[#7C5C9E] text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 active:scale-[0.98] transition-transform flex justify-center items-center gap-2">
            Enviar Reporte 🐾 <span className="opacity-75 text-xs bg-black/20 px-2 py-1 rounded-md ml-1">+50 pts</span>
          </button>
        </div>

      </div>
    </div>
  );
};
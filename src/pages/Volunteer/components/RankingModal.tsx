import React from 'react';

export const RankingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-800">🏆 Mi Progreso</h2>
          <button onClick={onClose} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold">✕</button>
        </div>
        <div className="p-8 space-y-8">
          {/* Card de Nivel */}
          <div className="bg-[#7C5C9E] rounded-[32px] p-8 text-white text-center relative overflow-hidden">
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-2">Nivel 7 — Guardián Canino</p>
            <h3 className="text-6xl font-black italic mb-4">2,840</h3>
            <p className="text-sm font-bold opacity-90 mb-6">puntos SnapDog</p>
            <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[68%] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
            </div>
            <p className="text-[10px] font-bold mt-3 opacity-70">68% para Nivel 8 — Héroe Animal</p>
          </div>

          {/* Grid de Insignias */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 px-2">Insignias obtenidas</h4>
            <div className="grid grid-cols-4 gap-3 text-center">
              {['Primer reporte', 'Primer rescate', '100 puntos', 'Biometría'].map((tag, i) => (
                <div key={i} className="bg-[#F3E8FF] p-4 rounded-2xl border border-purple-100">
                  <div className="text-2xl mb-1">🏅</div>
                  <p className="text-[9px] font-black uppercase text-[#7C5C9E] leading-tight">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
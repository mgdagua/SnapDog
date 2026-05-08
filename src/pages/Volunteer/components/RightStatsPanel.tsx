import React from 'react';

export const RightStatsPanel: React.FC = () => {
  return (
    <aside className="w-[320px] hidden lg:flex flex-col gap-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Estadísticas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F8F9FA] p-4 rounded-2xl text-center">
            <p className="text-2xl font-black text-[#7C5C9E]">247</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Animales</p>
          </div>
          <div className="bg-[#F8F9FA] p-4 rounded-2xl text-center">
            <p className="text-2xl font-black text-[#7C5C9E]">89</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Rescatados</p>
          </div>
        </div>
      </div>
      <div className="bg-[#7C5C9E] p-6 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-bold opacity-80 mb-1">ALERTA IA</p>
          <p className="text-sm font-medium leading-snug">Posible brote de parvovirosis en Zona Norte.</p>
        </div>
        <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">🧠</div>
      </div>
    </aside>
  );
};
import React from 'react';

interface SidebarProps {
  onNavigate: (panel: 'NONE' | 'REPORT' | 'MAP' | 'RANKING') => void;
  activePanel: 'NONE' | 'REPORT' | 'MAP' | 'RANKING';
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activePanel }) => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 flex-col justify-between hidden md:flex z-50">
      <div>
        <div className="p-6 mb-4">
          <h1 className="font-black text-2xl tracking-tighter text-[#7C5C9E]">snapdog</h1>
        </div>
        
        <nav className="px-4 space-y-2">
          <button 
            onClick={() => onNavigate('NONE')}
            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 font-bold transition-all ${
              activePanel === 'NONE' ? 'bg-[#F3E8FF] text-[#7C5C9E]' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">🏠</span> Inicio
          </button>
          
          <button 
            onClick={() => onNavigate('MAP')}
            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 font-bold transition-all ${
              activePanel === 'MAP' ? 'bg-[#F3E8FF] text-[#7C5C9E]' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">🗺️</span> Mapa
          </button>

          <button 
            onClick={() => onNavigate('RANKING')}
            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 font-bold transition-all ${
              activePanel === 'RANKING' ? 'bg-[#F3E8FF] text-[#7C5C9E]' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">🏆</span> Ranking
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-[#E9E4F0] flex items-center justify-center font-bold text-[#7C5C9E]">M</div>
          <div>
            <p className="text-sm font-bold text-gray-800 leading-none">María López</p>
            <p className="text-[10px] text-yellow-600 font-bold mt-1 uppercase tracking-tighter">⭐ 2,840 pts</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
import { Plus, Megaphone, Newspaper, Calendar, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  {
    id: 'announcement',
    name: 'Anuncio',
    icon: Megaphone,
    color: 'bg-primary',
    isNew: true,
  },
  {
    id: 'news',
    name: 'Novedades',
    icon: Newspaper,
    hasUpdate: true,
    borderColor: 'bg-gradient-to-br from-primary to-accent',
  },
  {
    id: 'events',
    name: 'Eventos',
    icon: Calendar,
    hasUpdate: true,
    borderColor: 'bg-gradient-to-br from-primary to-accent',
  },
  {
    id: 'ranking',
    name: 'Posición ranking',
    icon: Trophy,
    rank: '#3',
    borderColor: 'bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse',
  },
]

export function StoriesBar() {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-1">
          {items.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center gap-2 shrink-0"
            >
              <div
                className={cn(
                  'relative p-[3px] rounded-full transition-transform active:scale-95',
                  item.borderColor || 'bg-muted'
                )}
              >
                <div className="h-16 w-16 rounded-full border-2 border-card bg-muted flex items-center justify-center overflow-hidden relative">
                  {item.id === 'announcement' ? (
                    <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                  ) : (
                    <div className="bg-background w-full h-full flex items-center justify-center">
                      <item.icon className={cn("h-7 w-7", item.id === 'ranking' ? "text-yellow-600" : "text-foreground/70")} />
                      {item.rank && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                          <span className="font-black text-xs mt-4 text-foreground">{item.rank}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {item.isNew && (
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <Plus className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
                
                {item.hasUpdate && !item.isNew && (
                  <div className="absolute top-0 right-0 h-4 w-4 bg-destructive rounded-full border-2 border-card shadow-sm" />
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-tight text-foreground/80 w-16 truncate text-center leading-tight">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

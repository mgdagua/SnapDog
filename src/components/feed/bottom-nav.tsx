import { IonFooter, IonToolbar } from '@ionic/react'
import { Home, Map, Trophy, User } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Inicio', url: '/home' },
  { icon: Map, label: 'Mapa', url: '/map' },
  { icon: Trophy, label: 'Ranking', url: '/ranking' },
  { icon: User, label: 'Perfil', url: '/profile' },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <IonFooter className="ion-no-border">
      <IonToolbar className="--background: transparent;">
        <nav className="bg-card/80 backdrop-blur-lg border-t border-border">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <Link
                    key={item.label}
                    to={item.url}
                    className={cn(
                      'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 no-underline',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <item.icon className={cn('h-5 w-5', isActive && 'scale-110')} />
                    <span className="text-[10px] font-bold">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </IonToolbar>
    </IonFooter>
  )
}

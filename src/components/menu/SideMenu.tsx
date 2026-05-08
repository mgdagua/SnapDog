import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonFooter,
} from '@ionic/react'
import {
  homeOutline,
  cameraOutline,
  medicalOutline,
  settingsOutline,
  scanOutline,
  clipboardOutline,
} from 'ionicons/icons'
import { useLocation } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { currentUser } from '../../lib/mock-data'

const menuItems = [
  { title: 'Inicio', url: '/home', icon: homeOutline, roles: ['volunteer', 'veterinarian'] },
  { title: 'Reportar', url: '/report', icon: cameraOutline, roles: ['volunteer'] },
]

const toolItems = [
  { title: 'Escáner Biométrico', url: '/biometrics', icon: scanOutline, roles: ['volunteer', 'veterinarian'] },
  { title: 'Pacientes Activos', url: '/active-patients', icon: clipboardOutline, roles: ['veterinarian'] },
]

export function SideMenu() {
  const location = useLocation()
  const userRole = localStorage.getItem('userRole') || 'volunteer'
  const userName = localStorage.getItem('userName') || currentUser.name
  const userAvatar = localStorage.getItem('userAvatar') || currentUser.avatar
  
  const isVeterinarian = userRole === 'veterinarian'
  const isLoginPage = location.pathname === '/'

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole))
  const filteredToolItems = toolItems.filter(item => item.roles.includes(userRole))

  return (
    <IonMenu contentId="main-content" type="overlay" disabled={isLoginPage}>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--card);">
          <div className="px-6 py-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-extrabold text-2xl">S</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-foreground">SnapDog</span>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 inline-flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isVeterinarian ? 'bg-blue-500' : 'bg-primary'} animate-pulse`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Modo {isVeterinarian ? 'Veterinario' : 'Voluntario'}
              </span>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-horizontal">
        <div className="mb-8">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4 mb-4 opacity-50">Menú Principal</p>
          <IonList className="bg-transparent space-y-1" lines="none">
            {filteredMenuItems.map((item) => (
              <IonMenuToggle key={item.title} autoHide={false}>
                <IonItem
                  routerLink={item.url}
                  routerDirection="none"
                  className={`${location.pathname === item.url ? 'active-menu-item' : ''} rounded-2xl transition-all duration-300 mx-2`}
                  detail={false}
                >
                  <IonIcon slot="start" icon={item.icon} className="text-xl" />
                  <IonLabel className="font-bold text-sm tracking-tight">{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </div>

        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4 mb-4 opacity-50">Herramientas Pro</p>
          <IonList className="bg-transparent space-y-1" lines="none">
            {filteredToolItems.map((item) => (
              <IonMenuToggle key={item.title} autoHide={false}>
                <IonItem
                  routerLink={item.url}
                  routerDirection="none"
                  className={`${location.pathname === item.url ? 'active-menu-item' : ''} rounded-2xl transition-all duration-300 mx-2`}
                  detail={false}
                >
                  <IonIcon slot="start" icon={item.icon} className="text-xl" />
                  <IonLabel className="font-bold text-sm tracking-tight">{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div className="p-4">
          <div className="bg-card border border-border/40 rounded-[2rem] p-4 flex items-center gap-3 shadow-sm">
            <Avatar className="h-10 w-10 ring-2 ring-primary/10">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm text-foreground truncate">{userName}</p>
              <p className="text-[10px] text-primary font-black uppercase tracking-tighter">
                {isVeterinarian ? 'Misión: Sanidad Animal' : `⭐ ${currentUser.points.toLocaleString()} puntos`}
              </p>
            </div>
            <IonMenuToggle>
              <IonItem routerLink="/" routerDirection="back" lines="none" className="--background: transparent; --padding-start: 0;">
                <IonIcon icon={settingsOutline} className="text-muted-foreground text-xl" />
              </IonItem>
            </IonMenuToggle>
          </div>
        </div>
      </IonFooter>
    </IonMenu>
  )
}



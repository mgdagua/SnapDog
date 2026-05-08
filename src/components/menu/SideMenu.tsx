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
  mapOutline,
  trophyOutline,
  cameraOutline,
  flaskOutline,
  analyticsOutline,
  medicalOutline,
  personOutline,
  settingsOutline,
  scanOutline,
  clipboardOutline,
  globeOutline,
} from 'ionicons/icons'
import { useLocation } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { currentUser } from '../../lib/mock-data'

const menuItems = [
  { title: 'Inicio', url: '/home', icon: homeOutline },
  { title: 'Reportar', url: '/report', icon: cameraOutline },
]

const toolItems = [
  { title: 'Escáner Biométrico', url: '/biometrics', icon: scanOutline },
  { title: 'Pacientes Activos', url: '/active-patients', icon: clipboardOutline },
  { title: 'Historial Clínico Global', url: '/clinical-records', icon: medicalOutline },
  { title: 'Red Interoperable', url: '/network', icon: globeOutline },
]

export function SideMenu() {
  const location = useLocation<{ role: string }>()
  const isVeterinarian = location.state?.role === 'veterinarian'

  return (
    <IonMenu contentId="main-content" type="overlay">
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                ⚡ {isVeterinarian ? 'Veterinario' : 'Voluntario'}
              </span>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-horizontal">
        <div className="mb-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-2">Principal</p>
          <IonList className="bg-transparent" lines="none">
            {menuItems.map((item) => (
              <IonMenuToggle key={item.title} autoHide={false}>
                <IonItem
                  routerLink={item.url}
                  routerDirection="none"
                  className={`${location.pathname === item.url ? 'active-menu-item' : ''} mb-1 rounded-xl overflow-hidden`}
                  detail={false}
                >
                  <IonIcon slot="start" icon={item.icon} className="text-xl" />
                  <IonLabel className="font-semibold text-sm">{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </div>

        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-2">Herramientas</p>
          <IonList className="bg-transparent" lines="none">
            {toolItems.map((item) => (
              <IonMenuToggle key={item.title} autoHide={false}>
                <IonItem
                  routerLink={item.url}
                  routerDirection="none"
                  className={`${location.pathname === item.url ? 'active-menu-item' : ''} mb-1 rounded-xl overflow-hidden`}
                  detail={false}
                >
                  <IonIcon slot="start" icon={item.icon} className="text-xl" />
                  <IonLabel className="font-semibold text-sm">{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div className="p-4">
          <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-foreground truncate">{currentUser.name}</p>
              <p className="text-xs text-primary font-medium">⭐ {currentUser.points.toLocaleString()} pts</p>
            </div>
            <IonIcon icon={settingsOutline} className="text-muted-foreground text-xl" />
          </div>
        </div>
      </IonFooter>
    </IonMenu>
  )
}

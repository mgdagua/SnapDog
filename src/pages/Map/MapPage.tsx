import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon } from '@ionic/react'
import { mapOutline, alertTriangleOutline, analyticsOutline } from 'ionicons/icons'
import { Card } from '@/components/ui/card'
import { BottomNav } from '@/components/feed/bottom-nav'

export default function MapPage() {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--background);">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="font-extrabold tracking-tight">Mapa Interactivo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="max-w-2xl mx-auto h-full flex flex-col pb-20">
          {/* Mock Map Container */}
          <div className="flex-1 bg-muted/30 rounded-3xl border-2 border-dashed border-primary/20 relative overflow-hidden mb-6 min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <IonIcon icon={mapOutline} className="text-[200px]" />
            </div>
            
            {/* Pulsating Dots representing reports */}
            <div className="absolute top-[20%] left-[35%] w-4 h-4 bg-destructive rounded-full shadow-[0_0_0_8px_rgba(239,68,68,0.2)] animate-pulse" />
            <div className="absolute top-[50%] left-[55%] w-3 h-3 bg-warning rounded-full animate-pulse delay-75" />
            <div className="absolute top-[60%] left-[30%] w-3 h-3 bg-primary rounded-full animate-pulse delay-150" />
            <div className="absolute top-[35%] left-[65%] w-3 h-3 bg-success rounded-full animate-pulse delay-300" />
            
            {/* Map Label Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg border border-border flex items-center gap-2">
              <span className="w-2 h-2 bg-destructive rounded-full animate-ping" />
              <span className="text-xs font-bold text-foreground">📍 Popayán — 12 reportes activos</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 bg-card p-3 rounded-2xl border border-border/40">
              <span className="w-3 h-3 bg-destructive rounded-full" />
              <span className="text-xs font-bold">Crítico</span>
            </div>
            <div className="flex items-center gap-2 bg-card p-3 rounded-2xl border border-border/40">
              <span className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs font-bold">Moderado</span>
            </div>
          </div>

          <Card className="p-4 bg-primary/5 border-primary/20 border-dashed rounded-3xl">
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 p-2 rounded-xl">
                <IonIcon icon={analyticsOutline} className="text-xl text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground mb-1">Análisis de la Zona</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Zona más activa:</strong> Centro Histórico con 5 reportes abiertos. La IA detecta un patrón de abandono en la Zona Norte.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

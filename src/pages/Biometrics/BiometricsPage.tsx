import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon } from '@ionic/react'
import { flaskOutline, scanOutline, shieldCheckmarkOutline } from 'ionicons/icons'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function BiometricsPage() {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--background);">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="font-extrabold tracking-tight">Biometría IA</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-full aspect-square max-w-[300px] bg-muted/30 rounded-[40px] border-4 border-dashed border-primary/30 relative overflow-hidden mb-8 flex items-center justify-center">
            <div className="text-[120px] relative z-10 animate-bounce">🐕</div>
            
            {/* Scanning Line */}
            <div className="absolute inset-x-0 h-1 bg-primary/50 shadow-[0_0_15px_var(--primary)] z-20 animate-scan" />
            
            {/* Corners */}
            <div className="absolute top-6 left-6 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
            <div className="absolute top-6 right-6 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
            <div className="absolute bottom-6 left-6 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-2xl" />
          </div>

          <div className="text-center mb-8">
            <h3 className="text-lg font-black text-primary animate-pulse mb-2">⚡ Analizando Huella Nasal...</h3>
            <p className="text-sm text-muted-foreground">Utilizando modelos de visión computacional para identificación única.</p>
          </div>

          <Card className="w-full p-5 bg-card border-border/60 shadow-lg rounded-[32px] mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-success/10 p-3 rounded-2xl">
                <IonIcon icon={shieldCheckmarkOutline} className="text-2xl text-success" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Identidad Verificada</p>
                <p className="font-black text-foreground">Max</p>
                <p className="text-xs font-mono text-primary font-bold">UID: 941.002.847-X</p>
              </div>
              <div className="ml-auto bg-success text-white px-3 py-1 rounded-full text-[10px] font-black">
                97.4% MATCH
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-muted/40 p-3 rounded-xl">
                <p className="text-muted-foreground mb-1">Entidad Registro</p>
                <p className="font-bold truncate">Clínica San Roque</p>
              </div>
              <div className="bg-muted/40 p-3 rounded-xl">
                <p className="text-muted-foreground mb-1">Último Tratamiento</p>
                <p className="font-bold">Desparasitación</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Interoperabilidad Global</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-ping" />
                <p className="text-xs font-medium text-foreground">3 registros encontrados en red (Popayán/Norte)</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" className="rounded-2xl h-14 font-bold border-2">Ver Historia</Button>
            <Button className="rounded-2xl h-14 font-bold shadow-lg shadow-primary/30">Registrar Vitals</Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonList, IonItem, IonLabel, IonNote } from '@ionic/react'
import { medicalOutline, chevronForwardOutline, timeOutline, alertCircleOutline } from 'ionicons/icons'
import { BottomNav } from '@/components/feed/bottom-nav'
import { Badge } from '@/components/ui/badge'

const clinicalRecords = [
  { id: '941.002.847-X', name: 'Max', entity: 'Clínica San Roque', status: 'En tratamiento', lastUpdate: '2h ago', level: 'high' },
  { id: '852.114.332-Y', name: 'Luna', entity: 'Fundación Huellitas', status: 'Recuperado', lastUpdate: '1d ago', level: 'low' },
  { id: '741.005.112-Z', name: 'Rex', entity: 'Veterinaria Central', status: 'Deterioro Detectado', lastUpdate: '15m ago', level: 'critical' },
]

export default function ClinicalRecordsPage() {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--background);">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="font-extrabold tracking-tight">Expedientes Digitales</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="max-w-2xl mx-auto pb-24">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 mb-6">
            <h3 className="text-lg font-black text-foreground mb-2 flex items-center gap-2">
              <IonIcon icon={medicalOutline} className="text-primary" />
              Trazabilidad Global
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sistema de interoperabilidad basado en huella nasal. Identifica pacientes sin dueño y accede a su historial clínico compartido entre entidades.
            </p>
          </div>

          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-4">Pacientes en Red</p>
          
          <IonList className="bg-transparent" lines="none">
            {clinicalRecords.map((record) => (
              <IonItem 
                key={record.id}
                className="mb-3 rounded-2xl overflow-hidden shadow-sm border border-border/40"
                routerLink={`/clinical-detail/${record.id}`}
                detail={false}
              >
                <div className="flex items-center gap-4 py-3 w-full">
                  <div className="bg-muted h-12 w-12 rounded-xl flex items-center justify-center text-2xl">
                    {record.name === 'Luna' ? '🐈' : '🐕'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-foreground">{record.name}</span>
                      <span className="text-[10px] font-mono font-bold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                        {record.id}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                      <IonIcon icon={timeOutline} className="text-[10px]" />
                      {record.entity} · {record.lastUpdate}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={record.level === 'critical' ? 'destructive' : 'secondary'} className="text-[9px] font-black uppercase">
                      {record.status}
                    </Badge>
                    <IonIcon icon={chevronForwardOutline} className="text-muted-foreground" />
                  </div>
                </div>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

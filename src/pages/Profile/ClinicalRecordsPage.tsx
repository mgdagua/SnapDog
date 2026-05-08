import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonList, IonItem, IonTextarea, IonInput } from '@ionic/react'
import { medicalOutline, addOutline, documentAttachOutline, clipboardOutline, trashOutline, saveOutline, closeOutline } from 'ionicons/icons'
import { BottomNav } from '@/components/feed/bottom-nav'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Medication {
  name: string
  dosage: string
  frequency: string
}

const initialRecords = [
  { id: 'SD-123456', name: 'Max', entity: 'Clínica San Roque', status: 'En tratamiento', lastUpdate: '2h ago', level: 'high', diagnosis: 'Desnutrición severa', notes: 'Paciente rescatado en Parque Caldas.' },
  { id: '852.114.332-Y', name: 'Luna', entity: 'Fundación Huellitas', status: 'Recuperado', lastUpdate: '1d ago', level: 'low', diagnosis: 'Fractura en pata', notes: 'Cirugía exitosa.' },
]

export default function ClinicalRecordsPage() {
  const location = useLocation<{ animalId?: string }>()
  const [showModal, setShowModal] = useState(false)
  const [animalId, setAnimalId] = useState<string | null>(null)
  const [diagnosis, setDiagnosis] = useState('')
  const [notes, setNotes] = useState('')
  const [medications, setMedications] = useState<Medication[]>([{ name: '', dosage: '', frequency: '' }])
  const [attachments, setAttachments] = useState<string[]>([])

  useEffect(() => {
    if (location.state?.animalId) {
      setAnimalId(location.state.animalId)
      setShowModal(true)
    }
  }, [location.state])

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '' }])
  }

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updated = [...medications]
    updated[index][field] = value
    setMedications(updated)
  }

  const handleFileUpload = () => {
    // Simular subida de documentos
    setAttachments([...attachments, `Examen_Sangre_${Date.now()}.pdf`])
  }

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
              Trazabilidad Médica
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Gestión centralizada de tratamientos para animales enfermos. Cada registro fortalece la historia clínica interoperable de la red SnapDog.
            </p>
          </div>

          <div className="flex justify-between items-center px-2 mb-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Historial Reciente</p>
            <Button onClick={() => setShowModal(true)} variant="ghost" size="sm" className="text-primary font-bold gap-1">
              <IonIcon icon={addOutline} /> Nuevo Registro
            </Button>
          </div>
          
          <IonList className="bg-transparent" lines="none">
            {initialRecords.map((record) => (
              <IonItem 
                key={record.id}
                className="mb-4 rounded-[32px] overflow-hidden shadow-sm border border-border/40"
                detail={false}
              >
                <div className="w-full py-4 px-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-muted h-12 w-12 rounded-2xl flex items-center justify-center text-2xl">
                      🐕
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-foreground">{record.name}</span>
                        <span className="text-[10px] font-mono font-bold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                          {record.id}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">
                        Último: {record.entity}
                      </p>
                    </div>
                    <Badge variant={record.level === 'critical' ? 'destructive' : 'secondary'} className="text-[9px] font-black uppercase">
                      {record.status}
                    </Badge>
                  </div>
                  
                  <div className="bg-muted/30 rounded-2xl p-4 border border-border/20">
                    <div className="flex items-start gap-2 mb-2">
                      <IonIcon icon={clipboardOutline} className="text-primary mt-0.5" />
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Diagnóstico</p>
                        <p className="text-xs font-bold text-foreground">{record.diagnosis}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground italic line-clamp-2">
                      "{record.notes}"
                    </p>
                  </div>
                </div>
              </IonItem>
            ))}
          </IonList>
        </div>

        {/* Modal Historia Clínica */}
        {showModal && (
          <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
            
            <Card className="relative w-full max-w-lg bg-card rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full duration-500 max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-border/40 flex items-center justify-between bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-xl">
                    <IonIcon icon={medicalOutline} className="text-xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground">Nueva Entrada Clínica</h3>
                    <p className="text-[10px] font-mono font-bold text-primary">{animalId || 'PACIENTE NUEVO'}</p>
                  </div>
                </div>
                <Button onClick={() => setShowModal(false)} variant="ghost" size="icon" className="rounded-full">
                  <IonIcon icon={closeOutline} className="text-xl" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {/* Seccion Diagnostico */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Diagnóstico Médico</label>
                  <div className="bg-muted/40 rounded-2xl border-2 border-border/40 px-4 py-2">
                    <IonInput 
                      placeholder="Ej: Gastritis hemorrágica" 
                      value={diagnosis}
                      onIonInput={e => setDiagnosis(e.detail.value!)}
                      className="font-bold text-sm"
                    />
                  </div>
                </div>

                {/* Seccion Tratamiento / Medicamentos */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center ml-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tratamiento Suministrado</label>
                    <Button onClick={addMedication} variant="ghost" size="sm" className="h-6 text-[10px] font-black text-primary p-0 gap-1">
                      <IonIcon icon={addOutline} /> AÑADIR MEDICINA
                    </Button>
                  </div>
                  
                  {medications.map((med, index) => (
                    <div key={index} className="bg-primary/5 rounded-2xl p-4 border border-primary/10 relative">
                      <div className="grid grid-cols-1 gap-3">
                        <IonInput 
                          placeholder="Nombre Medicamento (ej: Meloxicam)" 
                          value={med.name}
                          onIonInput={e => updateMedication(index, 'name', e.detail.value!)}
                          className="font-bold text-xs h-8 border-b border-primary/20"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <IonInput 
                            placeholder="Dosis (ej: 0.5ml)" 
                            value={med.dosage}
                            onIonInput={e => updateMedication(index, 'dosage', e.detail.value!)}
                            className="text-xs h-8"
                          />
                          <IonInput 
                            placeholder="Frecuencia (ej: c/12h)" 
                            value={med.frequency}
                            onIonInput={e => updateMedication(index, 'frequency', e.detail.value!)}
                            className="text-xs h-8"
                          />
                        </div>
                      </div>
                      {medications.length > 1 && (
                        <button onClick={() => removeMedication(index)} className="absolute top-2 right-2 text-destructive/40 hover:text-destructive transition-colors">
                          <IonIcon icon={trashOutline} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Seccion Documentos */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Papeles y Resultados (PDF/JPG)</label>
                  <div 
                    onClick={handleFileUpload}
                    className="border-2 border-dashed border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <IonIcon icon={documentAttachOutline} className="text-3xl text-primary" />
                    <p className="text-xs font-bold text-primary">Adjuntar documentos del tratamiento</p>
                    <p className="text-[9px] text-muted-foreground uppercase font-black">Máximo 10MB por archivo</p>
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attachments.map((file, i) => (
                        <div key={i} className="bg-muted px-3 py-1 rounded-full flex items-center gap-2 border border-border">
                          <span className="text-[10px] font-bold truncate max-w-[120px]">{file}</span>
                          <IonIcon icon={closeOutline} className="text-destructive cursor-pointer" onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Seccion Notas */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Observaciones Clínicas</label>
                  <div className="bg-muted/40 rounded-2xl border-2 border-border/40 px-4 py-2">
                    <IonTextarea 
                      placeholder="Describa el estado general del paciente..." 
                      rows={3}
                      value={notes}
                      onIonInput={e => setNotes(e.detail.value!)}
                      className="text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border/40 bg-muted/20">
                <Button onClick={() => setShowModal(false)} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 flex gap-2">
                  <IonIcon icon={saveOutline} className="text-lg" />
                  Guardar Historial Médico
                </Button>
              </div>
            </Card>
          </div>
        )}
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonList, IonItem, IonTextarea, IonInput, IonSearchbar, IonBackButton, IonModal } from '@ionic/react'
import { medicalOutline, addOutline, documentAttachOutline, clipboardOutline, trashOutline, saveOutline, closeOutline, searchOutline, pawOutline, timeOutline, alertCircleOutline, pulseOutline, bandageOutline, folderOpenOutline, chatbubbleEllipsesOutline, chevronBackOutline, createOutline, lockClosedOutline, checkmarkCircleOutline, starOutline, trendingUpOutline } from 'ionicons/icons'
import { BottomNav } from '@/components/feed/bottom-nav'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { currentUser, mockPatients } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Medication {
  name: string
  dosage: string
  frequency: string
}

export default function ClinicalRecordsPage() {
  const location = useLocation<{ animalId?: string, animalName?: string }>()
  const isHistoryView = location.pathname === '/history'
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false) 
  const [searchText, setSearchText] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showTreatedBonus, setShowTreatedBonus] = useState(false)
  
  // Estado local para simular la lista de pacientes (activos vs tratados)
  const [activePatients, setActivePatients] = useState<any[]>([])
  const [treatedHistory, setTreatedHistory] = useState<any[]>([])
  
  // Estados de la Historia Clínica (Formulario)
  const [animalId, setAnimalId] = useState<string | null>(null)
  const [animalName, setAnimalName] = useState<string | null>(null)
  const [diagnosis, setDiagnosis] = useState('')
  const [notes, setNotes] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [medications, setMedications] = useState<Medication[]>([{ name: '', dosage: '', frequency: '' }])
  const [attachments, setAttachments] = useState<string[]>([])
  const [weight, setWeight] = useState('')
  const [temperature, setTemperature] = useState('')
  const [heartRate, setHeartRate] = useState('')

  // Inicializar pacientes
  useEffect(() => {
    const initialPatients = mockPatients.filter(p => p.entity === currentUser.veterinaryCenter)
    // Para la demo, tomamos algunos como tratados y otros como activos
    setActivePatients(initialPatients.slice(0, 2))
    setTreatedHistory(initialPatients.slice(2))
  }, [])

  // Filtrar por búsqueda y vista
  const currentList = isHistoryView ? treatedHistory : activePatients
  const filteredPatients = useMemo(() => {
    if (!searchText) return currentList
    return currentList.filter(p => 
      p.name.toLowerCase().includes(searchText.toLowerCase()) || 
      p.id.toLowerCase().includes(searchText.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [currentList, searchText])

  useEffect(() => {
    if (location.state?.animalId) {
      const patient = currentList.find(p => p.id === location.state.animalId)
      if (patient) {
        openPatientDetails(patient, false)
      } else {
        const globalPatient = mockPatients.find(p => p.id === location.state.animalId)
        if (globalPatient) {
           openPatientDetails(globalPatient, false)
        } else if (!isHistoryView) {
          setAnimalId(location.state.animalId)
          setAnimalName(location.state.animalName || 'Paciente')
          setIsEditing(true)
          setShowModal(true)
        }
      }
    }
  }, [location.state, currentList, isHistoryView])

  const openPatientDetails = (patient: any, editMode = false) => {
    setSelectedPatient(patient)
    setAnimalId(patient.id)
    setAnimalName(patient.name)
    setIsEditing(editMode)
    
    setDiagnosis(patient.diagnosis || '')
    setNotes(patient.notes || '')
    setRecommendations(patient.recommendations || '')
    setWeight(patient.weight || '')
    setTemperature(patient.temperature || '')
    setHeartRate(patient.heartRate || '')
    setMedications(patient.medications || [{ name: '', dosage: '', frequency: '' }])
    
    setShowModal(true)
  }

  const handleMarkAsTreated = () => {
    if (selectedPatient) {
      // Mover de activos a historial
      setActivePatients(prev => prev.filter(p => p.id !== selectedPatient.id))
      setTreatedHistory(prev => [selectedPatient, ...prev])
      // Mostrar Bonus
      setShowTreatedBonus(true)
      setShowModal(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPatient(null)
    setIsEditing(false)
    setAnimalId(null)
    setAnimalName(null)
    setDiagnosis('')
    setNotes('')
    setRecommendations('')
    setWeight('')
    setTemperature('')
    setHeartRate('')
    setMedications([{ name: '', dosage: '', frequency: '' }])
    setAttachments([])
  }

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

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="px-4 pt-4 bg-background">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IonButtons slot="start" className="m-0">
                  <IonBackButton defaultHref="/home" icon={chevronBackOutline} className="text-foreground" />
                  <IonMenuButton className="text-foreground" />
                </IonButtons>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-foreground">
                    {isHistoryView ? 'Historial de Rescates' : 'Mis Pacientes'}
                  </h1>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    {currentUser.veterinaryCenter}
                  </p>
                </div>
              </div>
              <div className={cn("p-2 rounded-2xl", isHistoryView ? "bg-emerald-500/10" : "bg-primary/10")}>
                <IonIcon icon={isHistoryView ? folderOpenOutline : pawOutline} className={cn("text-xl", isHistoryView ? "text-emerald-600" : "text-primary")} />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <IonIcon icon={searchOutline} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                type="text"
                placeholder={isHistoryView ? "Buscar en el historial..." : "Buscar en pacientes activos..."}
                className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/20 focus:bg-background h-12 pl-12 pr-4 rounded-2xl text-sm font-bold transition-all outline-none"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="max-w-2xl mx-auto pb-24">
          <div className="flex justify-between items-center px-2 mb-6 mt-2">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {filteredPatients.length} {isHistoryView ? 'Casos Exitosos' : 'Pacientes Activos'}
              </p>
            </div>
            {!isHistoryView && (
              <Button onClick={() => { setAnimalId(null); setAnimalName('Nuevo Paciente'); setIsEditing(true); setShowModal(true); }} variant="ghost" size="sm" className="text-primary font-black gap-1 uppercase text-[10px] tracking-wider">
                <IonIcon icon={addOutline} className="text-base" /> Nuevo Paciente
              </Button>
            )}
          </div>
          
          <div className="grid gap-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((record) => (
                <Card 
                  key={record.id}
                  className="border-none bg-card hover:bg-muted/10 transition-all group rounded-[32px] p-1 shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative cursor-pointer" onClick={() => openPatientDetails(record, false)}>
                        <div className="bg-muted h-16 w-16 rounded-[24px] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                          <img src={record.image} alt={record.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full border border-border">
                          <div className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            isHistoryView ? "bg-emerald-500" : (record.level === 'high' ? 'bg-destructive' : record.level === 'medium' ? 'bg-orange-500' : 'bg-emerald-500')
                          )} />
                        </div>
                      </div>
                      
                      <div className="flex-1 cursor-pointer" onClick={() => openPatientDetails(record, false)}>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg text-foreground leading-none">{record.name}</span>
                          <Badge variant="outline" className="text-[8px] font-mono border-muted-foreground/20 text-muted-foreground py-0">
                            {record.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <IonIcon icon={isHistoryView ? checkmarkCircleOutline : timeOutline} className={cn("text-[10px]", isHistoryView ? "text-emerald-500" : "text-muted-foreground")} />
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            {isHistoryView ? 'Tratado con Éxito' : `Actualizado hace ${record.lastUpdate}`}
                          </p>
                        </div>
                      </div>
                      
                      {!isHistoryView && (
                        <Button onClick={(e) => { e.stopPropagation(); openPatientDetails(record, true); }} variant="secondary" size="icon" className="h-10 w-10 rounded-2xl shadow-lg shadow-primary/10">
                          <IonIcon icon={addOutline} className="text-xl text-primary" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="bg-muted/40 rounded-2xl p-4 border border-border/10 group-hover:bg-background transition-colors cursor-pointer" onClick={() => openPatientDetails(record, false)}>
                      <div className="flex items-start gap-2 mb-2">
                        <div className={cn("p-1.5 rounded-lg mt-0.5", isHistoryView ? "bg-emerald-500/10" : "bg-primary/10")}>
                          <IonIcon icon={clipboardOutline} className={cn(isHistoryView ? "text-emerald-600" : "text-primary", "text-xs")} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.15em]">Diagnóstico Resolutivo</p>
                          <p className="text-xs font-black text-foreground">{record.diagnosis}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <IonIcon icon={folderOpenOutline} className="text-6xl mb-4" />
                <p className="font-black uppercase tracking-widest text-xs">No hay registros</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Historia Clínica */}
        {showModal && (
          <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" onClick={closeModal} />
            
            <Card className="relative w-full max-w-lg bg-card rounded-t-[40px] sm:rounded-[40px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden animate-in slide-in-from-bottom-full duration-500 max-h-[95vh] flex flex-col border-none">
              <div className="p-6 pb-4 flex items-center justify-between border-b border-border/20">
                <div className="flex items-center gap-4">
                  <Button onClick={closeModal} variant="ghost" size="icon" className="rounded-full h-10 w-10 -ml-2">
                    <IonIcon icon={chevronBackOutline} className="text-2xl" />
                  </Button>
                  <div>
                    <h3 className="font-black text-xl text-foreground leading-none">
                      {animalName ? animalName : 'Nuevo Paciente'}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[9px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest">
                        Expediente: {animalId || 'TEMPORAL'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isHistoryView && selectedPatient && (
                    <Button 
                      onClick={handleMarkAsTreated}
                      className="h-10 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest flex gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <IonIcon icon={checkmarkCircleOutline} className="text-lg" />
                      TRATADO
                    </Button>
                  )}
                  <div className={cn("p-3 rounded-2xl", isHistoryView ? "bg-emerald-500/10" : "bg-primary/10")}>
                    <IonIcon icon={isHistoryView ? checkmarkCircleOutline : medicalOutline} className={cn("text-xl", isHistoryView ? "text-emerald-600" : "text-primary")} />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-hide pb-32">
                
                {/* SECCIÓN 1: ESTADO FISIOLÓGICO */}
                <div className={`space-y-4 ${!isEditing ? 'opacity-80 pointer-events-none' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-500/10 p-2 rounded-xl text-red-500">
                        <IonIcon icon={pulseOutline} className="text-lg" />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-foreground">1. Estado Fisiológico</h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-muted/30 rounded-2xl p-3 border border-border/40">
                      <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Peso (kg)</p>
                      <IonInput value={weight} readOnly={!isEditing} onIonInput={e => setWeight(e.detail.value!)} className="font-black text-sm" />
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-3 border border-border/40">
                      <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Temp (°C)</p>
                      <IonInput value={temperature} readOnly={!isEditing} onIonInput={e => setTemperature(e.detail.value!)} className="font-black text-sm" />
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-3 border border-border/40">
                      <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">F.C (bpm)</p>
                      <IonInput value={heartRate} readOnly={!isEditing} onIonInput={e => setHeartRate(e.detail.value!)} className="font-black text-sm" />
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-[24px] border border-border/40 p-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase mt-2 ml-4">Diagnóstico Médico</p>
                    <IonInput placeholder="Diagnóstico..." value={diagnosis} readOnly={!isEditing} onIonInput={e => setDiagnosis(e.detail.value!)} className="font-black text-sm px-4" />
                  </div>
                </div>

                {/* SECCIÓN 2: TRATAMIENTO */}
                <div className={`space-y-4 ${!isEditing ? 'opacity-80 pointer-events-none' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500">
                        <IonIcon icon={bandageOutline} className="text-lg" />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-foreground">2. Tratamiento</h4>
                    </div>
                    {isEditing && (
                      <Button onClick={addMedication} variant="secondary" size="sm" className="h-7 text-[9px] font-black text-primary rounded-full px-3 gap-1">
                        <IonIcon icon={addOutline} /> AÑADIR
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {medications.map((med, index) => (
                      <div key={index} className="bg-muted/20 rounded-[24px] p-4 border border-border/10 relative">
                        <div className="grid grid-cols-1 gap-3">
                          <IonInput value={med.name} readOnly={!isEditing} onIonInput={e => updateMedication(index, 'name', e.detail.value!)} className="font-black text-xs h-9 bg-background/50 rounded-xl px-3" />
                          <div className="grid grid-cols-2 gap-3">
                            <IonInput value={med.dosage} readOnly={!isEditing} onIonInput={e => updateMedication(index, 'dosage', e.detail.value!)} className="text-[11px] font-bold h-9 bg-background/50 rounded-xl px-3" />
                            <IonInput value={med.frequency} readOnly={!isEditing} onIonInput={e => updateMedication(index, 'frequency', e.detail.value!)} className="text-[11px] font-bold h-9 bg-background/50 rounded-xl px-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECCIÓN 3: GUÍA DE REENCUENTRO */}
                <div className={`space-y-4 ${!isEditing ? 'opacity-80 pointer-events-none' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-xl text-orange-500">
                      <IonIcon icon={chatbubbleEllipsesOutline} className="text-lg" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-foreground">3. Guía de Reencuentro</h4>
                  </div>
                  <div className="bg-orange-500/5 rounded-[24px] border border-orange-500/20 p-2">
                    <IonTextarea value={recommendations} readOnly={!isEditing} onIonInput={e => setRecommendations(e.detail.value!)} className="text-xs font-bold px-3 text-orange-900" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-card border-t border-border/20 flex gap-3">
                {!isEditing ? (
                  <>
                    <Button onClick={closeModal} variant="outline" className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                      Cerrar Ficha
                    </Button>
                    <Button onClick={() => setIsEditing(true)} className="flex-[2] h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 flex gap-3 text-[10px]">
                      <IonIcon icon={createOutline} className="text-lg" />
                      Nueva Evolución Médica
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                      Cancelar
                    </Button>
                    <Button onClick={closeModal} className="flex-[2] h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 flex gap-3 text-[10px]">
                      <IonIcon icon={saveOutline} className="text-lg" />
                      Guardar en Historial
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Modal Bonus Tratado */}
        <IonModal isOpen={showTreatedBonus} onDidDismiss={() => setShowTreatedBonus(false)} className="bonus-modal">
          <div className="flex flex-col items-center justify-center h-full bg-background/95 backdrop-blur-2xl p-10 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full animate-pulse" />
              <div className="bg-emerald-500 p-8 rounded-[40px] shadow-[0_20px_50px_rgba(16,185,129,0.4)] relative animate-bounce">
                <IonIcon icon={checkmarkCircleOutline} className="text-6xl text-white" />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 p-3 rounded-full shadow-lg">
                <IonIcon icon={starOutline} className="text-2xl text-yellow-900" />
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-foreground tracking-tighter mb-4">¡PACIENTE TRATADO!</h2>
            <div className="bg-emerald-500 px-8 py-3 rounded-3xl shadow-2xl shadow-emerald-500/30 mb-10 transform -rotate-2">
              <span className="text-white font-black text-3xl tracking-widest">+250 PUNTOS</span>
            </div>
            
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-12 leading-relaxed">
              Has completado el ciclo médico del paciente.<br/>
              El registro ha sido movido al historial de éxitos.
            </p>
            
            <Button onClick={() => setShowTreatedBonus(false)} className="w-full h-16 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em]">
              Continuar
            </Button>
          </div>
        </IonModal>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

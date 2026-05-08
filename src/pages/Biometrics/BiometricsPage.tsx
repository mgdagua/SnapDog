import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonInput } from '@ionic/react'
import { shieldCheckmarkOutline, cameraOutline, closeOutline, searchOutline, alertCircleOutline, addCircleOutline, clipboardOutline } from 'ionicons/icons'
import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/feed/bottom-nav'
import { useHistory } from 'react-router-dom'

export default function BiometricsPage() {
  const [flow, setFlow] = useState<'selection' | 'scanning' | 'registering' | 'result'>('selection')
  const [searchCode, setSearchCode] = useState('')
  const [scanResult, setScanResult] = useState<'found' | 'not_found' | null>(null)
  const [newAnimal, setNewAnimal] = useState({ breed: '', age: '', weight: '' })
  const [generatedId, setGeneratedId] = useState('')
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const history = useHistory()

  const startCamera = async () => {
    try {
      setFlow('scanning')
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        simulateScan()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios.")
      setFlow('selection')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const simulateScan = () => {
    setTimeout(() => {
      stopCamera()
      // Simulate "Not Found" for the demo flow as requested
      setScanResult('not_found')
      setFlow('result')
    }, 3500)
  }

  const handleRegister = () => {
    const uid = `SD-${Math.floor(Math.random() * 900000 + 100000)}`
    setGeneratedId(uid)
    setFlow('result')
    setScanResult('found') // Now it's "found" because we just registered it
  }

  const handleSearch = () => {
    if (searchCode === 'SD-123456') {
      setGeneratedId('SD-123456')
      setScanResult('found')
      setFlow('result')
    } else {
      setScanResult('not_found')
      setFlow('result')
    }
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--background);">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="font-extrabold tracking-tight">Identificación</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="max-w-2xl mx-auto flex flex-col items-center pb-24">
          
          {flow === 'selection' && (
            <div className="w-full space-y-6 animate-in fade-in duration-500">
              <div className="text-center mb-8">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IonIcon icon={cameraOutline} className="text-4xl text-primary" />
                </div>
                <h3 className="text-2xl font-black text-foreground">Identificación Biométrica</h3>
                <p className="text-sm text-muted-foreground mt-2 px-6">
                  Identifica al paciente mediante escaneo nasal o ingresa su código único de seguimiento.
                </p>
              </div>

              <Card className="p-6 rounded-[32px] border-2 border-primary/20 bg-primary/5">
                <Button 
                  onClick={startCamera} 
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-base shadow-lg shadow-primary/20 flex gap-3 mb-6"
                >
                  <IonIcon icon={cameraOutline} className="text-xl" />
                  Tomar Foto (Escaneo)
                </Button>

                <div className="relative flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">O buscar por código</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 bg-background rounded-2xl border-2 border-border/60 px-4 flex items-center gap-3">
                    <IonIcon icon={searchOutline} className="text-muted-foreground" />
                    <IonInput 
                      placeholder="Ej: SD-123456" 
                      value={searchCode}
                      onIonInput={e => setSearchCode(e.detail.value!)}
                      className="font-mono font-bold text-sm"
                    />
                  </div>
                  <Button onClick={handleSearch} variant="secondary" className="rounded-2xl h-14 w-14 p-0">
                    <IonIcon icon={searchOutline} className="text-xl" />
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {flow === 'scanning' && (
            <div className="w-full flex flex-col items-center animate-in zoom-in duration-300">
              <div className="w-full aspect-square max-w-[320px] bg-black rounded-[40px] border-4 border-primary relative overflow-hidden mb-8 shadow-2xl">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_15px_var(--primary)] z-20 animate-scan" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/40 rounded-full animate-ping pointer-events-none" />
              </div>
              <h3 className="text-lg font-black text-primary animate-pulse mb-2">⚡ Analizando patrón único...</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manten el pulso firme</p>
              <Button onClick={() => { stopCamera(); setFlow('selection'); }} variant="ghost" className="mt-8 text-muted-foreground font-bold">
                <IonIcon icon={closeOutline} className="mr-2" /> Cancelar
              </Button>
            </div>
          )}

          {flow === 'registering' && (
            <div className="w-full animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <IonIcon icon={addCircleOutline} className="text-2xl text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">Registro de Nuevo Paciente</h3>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Animal de la calle</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Raza / Tipo</label>
                  <div className="bg-muted/40 rounded-2xl border-2 border-border/40 px-4 py-1">
                    <IonInput 
                      placeholder="Ej: Mestizo / Criollo" 
                      value={newAnimal.breed}
                      onIonInput={e => setNewAnimal({...newAnimal, breed: e.detail.value!})}
                      className="font-bold text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Edad Estimada</label>
                    <div className="bg-muted/40 rounded-2xl border-2 border-border/40 px-4 py-1">
                      <IonInput 
                        placeholder="Ej: 2 años" 
                        value={newAnimal.age}
                        onIonInput={e => setNewAnimal({...newAnimal, age: e.detail.value!})}
                        className="font-bold text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Peso (kg)</label>
                    <div className="bg-muted/40 rounded-2xl border-2 border-border/40 px-4 py-1">
                      <IonInput 
                        type="number"
                        placeholder="Ej: 15" 
                        value={newAnimal.weight}
                        onIonInput={e => setNewAnimal({...newAnimal, weight: e.detail.value!})}
                        className="font-bold text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleRegister} className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-base shadow-xl shadow-primary/30">
                Crear Registro y Generar Código
              </Button>
            </div>
          )}

          {flow === 'result' && scanResult === 'not_found' && (
            <Card className="w-full p-8 border-2 border-dashed border-destructive/30 bg-destructive/5 rounded-[40px] text-center animate-in zoom-in duration-500">
              <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <IonIcon icon={alertCircleOutline} className="text-3xl text-destructive" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-2">No se encontraron registros</h3>
              <p className="text-sm text-muted-foreground mb-8">
                El patrón biométrico o código ingresado no coincide con ningún animal en la red SnapDog.
              </p>
              <div className="space-y-3">
                <Button onClick={() => setFlow('registering')} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest">
                  Registrar como Nuevo
                </Button>
                <Button onClick={() => setFlow('selection')} variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest">
                  Reintentar Escaneo
                </Button>
              </div>
            </Card>
          )}

          {flow === 'result' && scanResult === 'found' && (
            <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <Card className="p-6 rounded-[40px] border-2 border-success/20 bg-success/5 text-center">
                <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IonIcon icon={shieldCheckmarkOutline} className="text-3xl text-success" />
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Paciente Identificado</p>
                <h3 className="text-3xl font-black text-foreground mt-1">{generatedId || 'SD-123456'}</h3>
                <div className="flex justify-center gap-2 mt-4">
                  <span className="bg-background px-3 py-1 rounded-full border border-border text-[10px] font-bold text-foreground uppercase tracking-tighter">
                    {newAnimal.breed || 'Criollo'}
                  </span>
                  <span className="bg-background px-3 py-1 rounded-full border border-border text-[10px] font-bold text-foreground uppercase tracking-tighter">
                    {newAnimal.age || 'Edad desconocida'}
                  </span>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={() => history.push('/clinical-records', { animalId: generatedId || 'SD-123456' })}
                  className="h-16 rounded-2xl font-black uppercase tracking-widest flex gap-3 shadow-xl shadow-primary/30"
                >
                  <IonIcon icon={clipboardOutline} className="text-xl" />
                  Abrir Historia Clínica
                </Button>
                <Button variant="outline" onClick={() => setFlow('selection')} className="h-14 rounded-2xl font-black uppercase tracking-widest border-2">
                  Finalizar
                </Button>
              </div>
            </div>
          )}
        </div>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

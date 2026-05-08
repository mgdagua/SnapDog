import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonInput, IonModal } from '@ionic/react'
import { shieldCheckmarkOutline, cameraOutline, closeOutline, searchOutline, alertCircleOutline, addCircleOutline, clipboardOutline, timeOutline, addOutline, chevronBackOutline, trendingUpOutline, medalOutline, starOutline } from 'ionicons/icons'
import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BottomNav } from '@/components/feed/bottom-nav'
import { useHistory } from 'react-router-dom'

export default function BiometricsPage() {
  const [flow, setFlow] = useState<'selection' | 'scanning' | 'registering' | 'result'>('selection')
  const [searchCode, setSearchCode] = useState('')
  const [scanResult, setScanResult] = useState<'found' | 'not_found' | null>(null)
  const [newAnimal, setNewAnimal] = useState({ name: '', breed: '', age: '', weight: '' })
  const [generatedId, setGeneratedId] = useState('')
  const [showBonus, setShowBonus] = useState(false)
  
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
      // En la simulación siempre sale exitoso si buscamos o escaneamos
      setScanResult('found')
      setFlow('result')
      setShowBonus(true) // Mostramos el bonus de puntos
    }, 3500)
  }

  const generateUniqueId = () => {
    const timestamp = Date.now().toString().slice(-4)
    const random = Math.floor(Math.random() * 9000 + 1000)
    return `SD-${timestamp}-${random}`
  }

  const handleRegister = () => {
    const uid = generateUniqueId()
    setGeneratedId(uid)
    setFlow('result')
    setScanResult('found')
    setShowBonus(true)
  }

  const resetFlow = () => {
    setNewAnimal({ name: '', breed: '', age: '', weight: '' })
    setSearchCode('')
    setGeneratedId('')
    setScanResult(null)
    setFlow('selection')
  }

  const handleSearch = () => {
    // Simulación exitosa para cualquier código o vacío para pruebas
    setGeneratedId(searchCode || 'SD-123456')
    setNewAnimal({ 
      name: searchCode === 'SD-123456' ? 'Max' : 'Nuevo Paciente', 
      breed: 'Labrador Mestizo', 
      age: '3 años', 
      weight: '12.5' 
    })
    setScanResult('found')
    setFlow('result')
    setShowBonus(true)
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
                  Escanea la nariz del animal para vincular su custodia con la historia clínica.
                </p>
              </div>

              <Card className="p-6 rounded-[32px] border-2 border-primary/20 bg-primary/5">
                <Button 
                  onClick={startCamera} 
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-base shadow-lg shadow-primary/20 flex gap-3 mb-6"
                >
                  <IonIcon icon={cameraOutline} className="text-xl" />
                  Escanear Patrón Nasal
                </Button>

                <div className="relative flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">O ingresar código</span>
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
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Simulación de Reconocimiento</p>
              <Button onClick={() => { stopCamera(); setFlow('selection'); }} variant="ghost" className="mt-8 text-muted-foreground font-bold">
                <IonIcon icon={closeOutline} className="mr-2" /> Cancelar
              </Button>
            </div>
          )}

          {flow === 'result' && scanResult === 'found' && (
            <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <Card className="p-6 rounded-[40px] border-none bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <IonIcon icon={shieldCheckmarkOutline} className="text-8xl" />
                </div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-20 w-20 rounded-[28px] border-2 border-white shadow-xl overflow-hidden bg-muted">
                    <img 
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop" 
                      className="w-full h-full object-cover" 
                      alt="Paciente" 
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Escaneo Exitoso</p>
                    <h3 className="text-2xl font-black text-foreground leading-tight">{newAnimal.name || 'Max'}</h3>
                    <p className="text-xs font-mono font-bold text-muted-foreground">{generatedId || 'SD-123456'}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 relative z-10">
                  <Badge variant="secondary" className="bg-white/50 text-[9px] font-black uppercase">{newAnimal.breed || 'Labrador Mestizo'}</Badge>
                  <Badge variant="secondary" className="bg-white/50 text-[9px] font-black uppercase">{newAnimal.age || '3 años'}</Badge>
                </div>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <IonIcon icon={clipboardOutline} className="text-primary" />
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Historia Clínica</h4>
                </div>

                <div className="space-y-3">
                  <div className="bg-card border border-border/40 rounded-[24px] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <IonIcon icon={timeOutline} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-foreground">Ingreso por Custodia</p>
                        <p className="text-[9px] font-bold text-muted-foreground">Hoy • Formalización de Rescate</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500 text-[8px]">VINCULADO</Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  onClick={() => history.push('/clinical-records', { 
                    animalId: generatedId || 'SD-123456',
                    animalName: newAnimal.name || 'Max' 
                  })}
                  className="w-full h-16 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 flex gap-3 text-sm"
                >
                  <IonIcon icon={addOutline} className="text-xl" />
                  Crear Ficha en Clínica
                </Button>
                
                <Button variant="ghost" onClick={resetFlow} className="w-full h-12 text-muted-foreground font-black uppercase tracking-widest text-[10px]">
                  Finalizar Proceso
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Bonus de Puntos */}
        <IonModal isOpen={showBonus} onDidDismiss={() => setShowBonus(false)} className="bonus-modal">
          <div className="flex flex-col items-center justify-center h-full bg-background/95 backdrop-blur-2xl p-10 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full animate-pulse" />
              <div className="bg-yellow-400 p-8 rounded-[40px] shadow-[0_20px_50px_rgba(250,204,21,0.4)] relative animate-bounce">
                <IonIcon icon={starOutline} className="text-6xl text-yellow-900" />
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-foreground tracking-tighter mb-4">¡PUNTOS EXTRA!</h2>
            <div className="bg-primary px-8 py-3 rounded-3xl shadow-2xl shadow-primary/30 mb-10 transform -rotate-2">
              <span className="text-primary-foreground font-black text-3xl tracking-widest">+100 PUNTOS</span>
            </div>
            
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-12 leading-relaxed">
              Has formalizado la identidad del paciente.<br/>
              Tu ranking ha subido un escalón.
            </p>
            
            <Button onClick={() => setShowBonus(false)} className="w-full h-16 rounded-3xl font-black uppercase tracking-[0.2em]">
              Continuar
            </Button>
          </div>
        </IonModal>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

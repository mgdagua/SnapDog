import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonInput, IonModal, IonTextarea, useIonViewWillEnter } from '@ionic/react'
import { shieldCheckmarkOutline, cameraOutline, closeOutline, searchOutline, alertCircleOutline, addCircleOutline, clipboardOutline, timeOutline, addOutline, chevronBackOutline, trendingUpOutline, medalOutline, starOutline, locationOutline, medicalOutline, informationCircleOutline, heartOutline, checkmarkCircleOutline } from 'ionicons/icons'
import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BottomNav } from '@/components/feed/bottom-nav'
import { useHistory } from 'react-router-dom'
import { currentUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function BiometricsPage() {
  const [flow, setFlow] = useState<'selection' | 'scanning' | 'registering' | 'result'>('selection')
  const [searchCode, setSearchCode] = useState('')
  const [scanResult, setScanResult] = useState<'found' | 'not_found' | null>(null)
  const [newAnimal, setNewAnimal] = useState({ name: '', breed: '', age: '', weight: '' })
  const [animalPhoto, setAnimalPhoto] = useState<string | null>(null)
  const [generatedId, setGeneratedId] = useState('')
  const [showBonus, setShowBonus] = useState(false)
  const [isNewAnimal, setIsNewAnimal] = useState(false)
  
  // Estados para Registro
  const [isNearVeterinary, setIsNearVeterinary] = useState(false)
  const [isCheckingLocation, setIsCheckingLocation] = useState(false)
  const [clinicalPhoto, setClinicalPhoto] = useState<string | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isClinicalStatus, setIsClinicalStatus] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const history = useHistory()
  const userRole = localStorage.getItem('userRole') || 'volunteer'
  const isVolunteer = userRole === 'volunteer'

  // Resetear estado al entrar (Requerimiento de no guardar historial de interacción)
  useIonViewWillEnter(() => {
    resetFlow()
  })

  const checkLocation = () => {
    setIsCheckingLocation(true)
    setLocationError(null)
    
    if (!navigator.geolocation) {
      setLocationError("Geolocalización no soportada")
      setIsCheckingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          setIsNearVeterinary(true)
          setIsCheckingLocation(false)
        }, 1500)
      },
      (error) => {
        setLocationError("Error al obtener ubicación")
        setIsCheckingLocation(false)
      }
    )
  }

  const startCamera = async (mode: 'scanning' | 'clinical' = 'scanning') => {
    try {
      if (mode === 'scanning') setFlow('scanning')
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        if (mode === 'scanning') simulateScan()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("No se pudo acceder a la cámara.")
      if (mode === 'scanning') setFlow('selection')
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
      // Simulamos que el escaneo facial siempre encuentra a Max para propósitos de la demo
      setGeneratedId('SD-123456')
      setNewAnimal({ 
        name: 'Max', 
        breed: 'Labrador Mestizo', 
        age: '3 años', 
        weight: '12.5' 
      })
      setIsNewAnimal(false)
      setScanResult('found')
      setFlow('result')
      setShowBonus(true)
      setIsClinicalStatus(true)
    }, 3500)
  }

  const handleRegister = () => {
    if (!isNearVeterinary) {
      alert("Debes estar en una ubicación de veterinaria para registrar un nuevo paciente.")
      return
    }
    const uid = `SD-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 9000 + 1000)}`
    setGeneratedId(uid)
    setIsNewAnimal(true)
    setFlow('result')
    setScanResult('found')
    setShowBonus(true)
    setIsClinicalStatus(true)
  }

  const resetFlow = () => {
    setNewAnimal({ name: '', breed: '', age: '', weight: '' })
    setAnimalPhoto(null)
    setSearchCode('')
    setGeneratedId('')
    setScanResult(null)
    setFlow('selection')
    setClinicalPhoto(null)
    setIsNearVeterinary(false)
    setIsClinicalStatus(false)
    setIsNewAnimal(false)
  }

  const handleSearch = () => {
    // REQUERIMIENTO: Solo SD-123456 es correcto para voluntarios
    if (isVolunteer && searchCode.toLowerCase() !== 'sd-123456') {
      setScanResult('not_found')
      return
    }

    setGeneratedId('SD-123456')
    setNewAnimal({ 
      name: 'Max', 
      breed: 'Labrador Mestizo', 
      age: '3 años', 
      weight: '12.5' 
    })
    setIsNewAnimal(false)
    setScanResult('found')
    setFlow('result')
    setShowBonus(true)
    setIsClinicalStatus(true)
  }

  const takeClinicalPhoto = () => {
    setClinicalPhoto("https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop")
    alert("Foto clínica adjuntada con éxito.")
  }

  const handlePickPhoto = () => {
    // Simulación de selección de foto
    setAnimalPhoto("https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop")
    alert("Foto del animal seleccionada con éxito.")
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
                  onClick={() => startCamera('scanning')} 
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
                      onIonInput={e => { setSearchCode(e.detail.value!); setScanResult(null); }}
                      className="font-mono font-bold text-sm"
                    />
                  </div>
                  <Button onClick={handleSearch} variant="secondary" className="rounded-2xl h-14 w-14 p-0">
                    <IonIcon icon={searchOutline} className="text-xl" />
                  </Button>
                </div>

                {/* Mensaje de Error y Botón de Registro Condicional */}
                {isVolunteer && scanResult === 'not_found' && (
                  <div className="mt-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex flex-col items-center text-center gap-3">
                      <div className="flex items-center gap-2 text-destructive">
                        <IonIcon icon={alertCircleOutline} className="text-xl" />
                        <p className="text-xs font-black uppercase tracking-tight">ID Incorrecto / No encontrado</p>
                      </div>
                      <p className="text-[11px] font-bold text-destructive/80 leading-tight">
                        Este código no coincide con ningún registro activo. Por favor, registre el animal para iniciar su historial.
                      </p>
                      <Button 
                        onClick={() => setFlow('registering')} 
                        className="w-full h-12 rounded-xl bg-destructive text-destructive-foreground font-black uppercase text-[10px] tracking-widest mt-1"
                      >
                        Registrar Nuevo Animal
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {flow === 'registering' && (
            <div className="w-full space-y-6 animate-in slide-in-from-right duration-500">
              <div className="flex items-center gap-4 mb-6">
                <Button onClick={() => setFlow('selection')} variant="ghost" size="icon" className="rounded-full">
                  <IonIcon icon={chevronBackOutline} className="text-2xl" />
                </Button>
                <h3 className="text-xl font-black text-foreground">Registro de Identidad</h3>
              </div>

              <Card className="p-6 rounded-[32px] space-y-6 border-none shadow-sm bg-card">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Validación de Ubicación</p>
                    <Button 
                      onClick={checkLocation} 
                      disabled={isCheckingLocation}
                      variant={isNearVeterinary ? "secondary" : "outline"}
                      className={cn(
                        "w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 flex gap-3",
                        isNearVeterinary && "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                      )}
                    >
                      <IonIcon icon={isNearVeterinary ? shieldCheckmarkOutline : locationOutline} className="text-xl" />
                      {isCheckingLocation ? "Verificando..." : isNearVeterinary ? "Ubicación Validada (Veterinaria)" : "Verificar Ubicación en Veterinaria"}
                    </Button>
                    {locationError && <p className="text-[10px] text-red-500 font-bold mt-2 ml-1 italic">{locationError}</p>}
                  </div>

                  {isNearVeterinary && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4">
                      <div className="flex flex-col items-center gap-4 mb-6">
                        <div 
                          onClick={handlePickPhoto}
                          className="w-32 h-32 rounded-[32px] bg-muted border-2 border-dashed border-primary/30 flex flex-col items-center justify-center overflow-hidden cursor-pointer group hover:bg-primary/5 transition-colors"
                        >
                          {animalPhoto ? (
                            <img src={animalPhoto} className="w-full h-full object-cover" alt="Animal" />
                          ) : (
                            <>
                              <IonIcon icon={cameraOutline} className="text-3xl text-primary/40 group-hover:scale-110 transition-transform" />
                              <span className="text-[8px] font-black uppercase text-primary/40 mt-1">Añadir Foto</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="bg-primary/5 rounded-[24px] p-4 border border-primary/10">
                        <div className="flex items-start gap-3">
                          <IonIcon icon={informationCircleOutline} className="text-primary text-xl mt-0.5" />
                          <p className="text-[11px] font-medium text-foreground leading-tight">
                            Para cambiar el estado del animal a <span className="font-black text-primary uppercase">entorno clínico</span>, te recomendamos adjuntar una foto en la veterinaria. {isVolunteer && "(Opcional para voluntarios)"}
                          </p>
                        </div>
                        <Button 
                          onClick={takeClinicalPhoto}
                          className={cn(
                            "w-full mt-4 h-12 rounded-xl bg-background border-2 border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest flex gap-2",
                            clinicalPhoto && "border-emerald-500/50 text-emerald-600 bg-emerald-50"
                          )}
                        >
                          <IonIcon icon={clinicalPhoto ? checkmarkCircleOutline : cameraOutline} className="text-lg" />
                          {clinicalPhoto ? "Foto Clínica Adjuntada" : "Tomar Foto en Entorno Clínico"}
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 ml-1">Datos del Animal</p>
                        <IonInput 
                          placeholder="Nombre (si lo tiene)" 
                          className="bg-muted/50 rounded-2xl h-14 px-6 font-bold"
                          onIonInput={e => setNewAnimal({...newAnimal, name: e.detail.value!})}
                        />
                        <IonInput 
                          placeholder="Raza / Cruce" 
                          className="bg-muted/50 rounded-2xl h-14 px-6 font-bold"
                          onIonInput={e => setNewAnimal({...newAnimal, breed: e.detail.value!})}
                        />
                      </div>

                      <Button 
                        onClick={handleRegister}
                        className="w-full h-16 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 mt-6"
                      >
                        Formalizar Registro
                      </Button>
                    </div>
                  )}
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
                      src={isNewAnimal ? (animalPhoto || "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&h=200&fit=crop") : "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop"} 
                      className="w-full h-full object-cover" 
                      alt="Paciente" 
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{isNewAnimal ? 'Registro Exitoso' : 'Escaneo Exitoso'}</p>
                    <h3 className="text-2xl font-black text-foreground leading-tight">{newAnimal.name || 'Sin Nombre'}</h3>
                    <p className="text-xs font-mono font-bold text-muted-foreground">{generatedId || 'SD-123456'}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 relative z-10">
                  <Badge variant="secondary" className="bg-white/50 text-[9px] font-black uppercase">{newAnimal.breed || 'Raza no especificada'}</Badge>
                  <Badge variant="secondary" className="bg-white/50 text-[9px] font-black uppercase">{newAnimal.age || 'Edad no especificada'}</Badge>
                </div>
              </Card>

              {/* SECCIÓN CONDICIONAL SEGÚN ROL Y TIPO DE REGISTRO */}
              {isVolunteer ? (
                /* Si es un animal NUEVO, no mostramos la Hoja de Cuidados */
                !isNewAnimal ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-2 px-2">
                      <IonIcon icon={medicalOutline} className="text-primary" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Hoja de Cuidados (Veterinaria)</h4>
                    </div>
                    
                    <Card className="p-6 rounded-[32px] border-none shadow-sm bg-background border border-border/40 space-y-6">
                      {/* Enfermedad / Diagnóstico */}
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Diagnóstico Previo</p>
                        <div className="flex items-center gap-2 text-destructive">
                          <IonIcon icon={alertCircleOutline} />
                          <span className="text-xs font-black uppercase tracking-tight">Desnutrición Severa / Parásitos</span>
                        </div>
                      </div>

                      {/* Recomendaciones */}
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Pautas de Cuidado</p>
                        <p className="text-xs font-bold text-foreground/80 leading-relaxed italic">
                          "Proporcionar dieta hipercalórica 3 veces al día. Asegurar acceso a agua fresca. Mantener en reposo y evitar sol directo."
                        </p>
                      </div>

                      {/* Medicación */}
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Medicación</p>
                        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                          <div className="flex items-center gap-2 mb-1">
                            <IonIcon icon={heartOutline} className="text-primary text-xs" />
                            <p className="text-[11px] font-black text-primary">Vitamina B12 + Desparasitante</p>
                          </div>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">1 dosis cada 24 horas vía oral</p>
                        </div>
                      </div>
                    </Card>

                    <div className="bg-primary/5 rounded-[24px] p-4 border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <IonIcon icon={shieldCheckmarkOutline} className="text-primary" />
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Aviso de Seguridad</p>
                      </div>
                      <p className="text-[10px] font-medium text-muted-foreground leading-tight italic">
                        Como voluntario, tu misión es seguir estas indicaciones. No suministres medicamentos no listados ni modifiques la dieta sin previa autorización veterinaria.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="bg-emerald-500/5 rounded-[32px] p-6 border border-emerald-500/10 flex flex-col items-center text-center gap-3">
                      <div className="bg-emerald-500/20 p-4 rounded-full">
                        <IonIcon icon={checkmarkCircleOutline} className="text-4xl text-emerald-600" />
                      </div>
                      <h4 className="text-lg font-black text-foreground">Animal Registrado</h4>
                      <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                        Has iniciado el historial médico de <span className="text-primary font-black uppercase">{newAnimal.name || 'este paciente'}</span>. Ahora la red veterinaria de SnapDog podrá realizar el seguimiento clínico.
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <IonIcon icon={clipboardOutline} className="text-primary" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Estado del Paciente</h4>
                    </div>
                    {isClinicalStatus && (
                      <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        <IonIcon icon={medicalOutline} className="mr-1" /> Entorno Clínico
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="bg-card border border-border/40 rounded-[24px] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                          <IonIcon icon={timeOutline} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-foreground">Custodia Activa</p>
                          <p className="text-[9px] font-bold text-muted-foreground">Formalizado por {currentUser.name}</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500 text-[8px]">VINCULADO</Badge>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 space-y-3">
                {!isVolunteer ? (
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
                ) : (
                  /* El botón de reportar solo sale si NO se encontraron recomendaciones previas (ej: animal nuevo) */
                  /* Pero según la instrucción, cuando lo ENCUENTRA debe primar la recomendación */
                  flow === 'registering' ? (
                    <Button 
                      variant="outline"
                      className="w-full h-16 rounded-[24px] font-black uppercase tracking-[0.2em] border-2 border-primary text-primary flex gap-3 text-sm"
                    >
                      <IonIcon icon={heartOutline} className="text-xl" />
                      Reportar Estado de Salud
                    </Button>
                  ) : null
                )}
                
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

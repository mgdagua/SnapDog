import { IonContent, IonPage, IonIcon } from '@ionic/react'
import { 
  cameraOutline, 
  locationOutline, 
  chevronBackOutline, 
  checkmarkCircleOutline, 
  locateOutline, 
  folderOutline 
} from 'ionicons/icons'
import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { cn } from '../../lib/utils'
import { mockPosts } from '../../lib/mock-data'

const TAGS_OPTIONS = [
  "Golpeado", "Asustado", "Hambriento", "Herido", 
  "Cachorro", "Agresivo", "Enfermo", "Desorientado"
]

export default function ReportPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [isLoadingGps, setIsLoadingGps] = useState(false)
  const history = useHistory()
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 1A. Lógica de la Cámara Nativa (Celular)
  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Prompt 
      })
      if (image.dataUrl) setPhoto(image.dataUrl)
    } catch (error) {
      console.error("Error al tomar foto:", error)
    }
  }

  // 1B. Lógica para subir desde PC (Simulador web)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 2. Lógica del GPS
  const getCurrentLocation = async () => {
    setIsLoadingGps(true)
    setTimeout(() => {
      setLocation("Cerca de Parque Caldas, Popayán")
      setIsLoadingGps(false)
    }, 1500)
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // 3. Publicación Blindada (Alineada con tus Badges)
  const handlePublish = () => {
    if (!photo) {
      alert("¡La foto es obligatoria para el reporte!")
      return
    }

    const newPost = {
      id: Date.now().toString(),
      author: {
        id: 'user_1',
        name: "Brian Esteban", 
        avatar: "https://i.pravatar.cc/150?u=brian",
        role: "volunteer"
      },
      createdAt: new Date(), 
      status: 'needs_rescue', // 🛡️ Alineado con StatusBadge
      urgencyLevel: selectedTags.includes('Herido') || selectedTags.includes('Golpeado') ? 'critical' : 'low', // 🛡️ Alineado con UrgencyBadge
      imageUrl: photo, 
      location: location || "Ubicación desconocida",
      neighborhood: "Centro Histórico", 
      description: description || "Reporte generado desde la calle. " + selectedTags.join(", "),
      tags: selectedTags,
      likes: 0,
      comments: 0,
      shares: 0, 
      isLiked: false, 
      recommendations: ["Por favor, si alguien puede acercarse a verificar el estado.", "Mantener distancia si el animal está asustado."]
    }

    try {
      mockPosts.unshift(newPost as any) 
      console.log("Post agregado con éxito:", newPost) 
      history.push('/home') 
    } catch (e) {
      console.error("Error al publicar:", e)
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="max-w-2xl mx-auto flex flex-col min-h-full pb-12">
          
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => history.goBack()} className="rounded-full h-10 w-10 bg-muted/50">
              <IonIcon icon={chevronBackOutline} className="text-xl" />
            </Button>
            <h1 className="text-xl font-black uppercase tracking-tight text-foreground">Nuevo Reporte</h1>
          </div>

          <div className="space-y-8 flex-1">
            
            {/* Área de Evidencia (Dual: Cámara / PC) */}
            <div className="space-y-3 text-center">
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <div className="aspect-video w-full rounded-[2.5rem] bg-muted/30 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center overflow-hidden relative transition-all duration-300">
                {photo ? (
                  <div className="relative w-full h-full group">
                    <img src={photo} alt="Evidencia" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" className="rounded-full font-bold" onClick={() => setPhoto(null)}>Cambiar Foto</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-8 z-10">
                    <div onClick={takePhoto} className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        <IonIcon icon={cameraOutline} className="text-3xl" />
                      </div>
                      <span className="font-black text-[10px] uppercase tracking-tighter">Cámara</span>
                    </div>
                    <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-16 h-16 rounded-3xl bg-muted text-muted-foreground flex items-center justify-center shadow-lg border border-border group-hover:scale-110 transition-transform">
                        <IonIcon icon={folderOutline} className="text-3xl" />
                      </div>
                      <span className="font-black text-[10px] uppercase tracking-tighter">Desde PC</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* GPS Area */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Ubicación del Hallazgo</label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <IonIcon icon={locationOutline} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl z-10" />
                  <Input 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Carrera 4 con Calle 5, Popayán" 
                    className="h-14 pl-14 rounded-2xl bg-muted/40 border-0 focus-visible:ring-2 ring-primary/30 text-sm"
                  />
                </div>
                <Button 
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isLoadingGps}
                  className={cn("h-14 w-14 rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-all", isLoadingGps && "animate-pulse")}
                >
                  <IonIcon icon={locateOutline} className="text-2xl" />
                </Button>
              </div>
            </div>

            {/* Tags Area */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Estado Visual del Animal</label>
              <div className="flex flex-wrap gap-2">
                {TAGS_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2",
                      selectedTags.includes(tag) 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" 
                        : "bg-muted/40 border-transparent text-muted-foreground hover:bg-muted/60"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Area */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-2">Descripción Detallada</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[120px] p-6 rounded-[2.5rem] bg-muted/40 border-0 focus:ring-2 ring-primary/30 outline-none text-sm resize-none"
                placeholder="¿Alguna seña particular? (Collar, manchas, comportamiento)..."
              />
            </div>
          </div>

          <Button 
            onClick={handlePublish}
            disabled={!photo} 
            className={cn(
              "w-full h-16 mt-8 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] transition-all flex gap-3 shadow-2xl",
              photo ? "bg-primary text-white shadow-primary/40 active:scale-95" : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Publicar Hallazgo (+50 PTS)
            <IonIcon icon={checkmarkCircleOutline} className="text-xl" />
          </Button>

        </div>
      </IonContent>
    </IonPage>
  )
}
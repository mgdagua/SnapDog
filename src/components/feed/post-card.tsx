import { useState, useRef } from 'react'
import { PawPrint, MessageCircle, Share2, MapPin, Clock, MoreHorizontal, Bookmark, Shield, Camera, X, CheckCircle2, TrendingUp, Scan, Star } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { UrgencyBadge } from './urgency-badge'
import { StatusBadge } from './status-badge'
import type { AnimalPost } from '../../lib/types'
import { IonActionSheet, IonModal, IonIcon } from '@ionic/react'
import { cameraOutline, bodyOutline, clipboardOutline } from 'ionicons/icons'
import { useHistory } from 'react-router-dom'
import { currentUser } from '../../lib/mock-data'

interface PostCardProps {
  post: AnimalPost
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Hace un momento'
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`
  return `Hace ${Math.floor(diffInSeconds / 86400)} d`
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [showPoints, setShowPoints] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  
  // Estados para animación Ranking
  const [animatedPoints, setAnimatedPoints] = useState(currentUser.points)
  const [progressWidth, setProgressWidth] = useState(40)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const history = useHistory()
  const userRole = localStorage.getItem('userRole') || 'volunteer'

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  // Inicializar cámara cuando el modal esté listo
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (err) {
      console.error("Error acceso cámara:", err)
      alert("No se pudo acceder a la cámara frontal")
      setShowCamera(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const takePhoto = () => {
    // Simulación de captura exitosa
    stopCamera()
    setShowCamera(false)
    setShowPoints(true)
    animateRanking()
  }

  const animateRanking = () => {
    let start = currentUser.points
    const end = start + 50
    const duration = 1500
    const stepTime = Math.max(10, Math.floor(duration / 50))
    
    const timer = setInterval(() => {
      start += 1
      setAnimatedPoints(start)
      if (start >= end) {
        clearInterval(timer)
        setProgressWidth(60)
      }
    }, stepTime)
  }

  const handleFinishCustody = () => {
    setIsRemoved(true)
    setShowPoints(false)
  }

  if (isRemoved) return null

  return (
    <>
      <Card
        className={cn(
          'overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-sm',
          post.urgencyLevel === 'critical' && 'ring-2 ring-destructive/50'
        )}
      >
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-foreground">{post.author.name}</span>
                {post.author.role === 'veterinarian' && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">
                    <Shield className="h-2.5 w-2.5" />
                    Veterinario
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowActionSheet(true)}>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="relative aspect-[4/3] w-full">
          <img src={post.imageUrl} alt="Animal" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute top-3 right-3"><StatusBadge status={post.status} /></div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{post.location}</span>
          </div>
          <p className="text-sm text-foreground/90 mb-3 leading-relaxed">{post.description}</p>
          
          {post.recommendations && post.recommendations.length > 0 && (
            <div className="mb-4 space-y-2 bg-primary/5 p-3 rounded-2xl border border-primary/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Recomendaciones</p>
              {post.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2">
                  <PawPrint className="h-3 w-3 text-primary mt-0.5" />
                  <p className="text-[11px] font-bold text-foreground/80 leading-tight">{rec}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={handleLike} className={cn('gap-2', isLiked && 'text-primary')}>
                <PawPrint className={cn('h-5 w-5', isLiked && 'fill-current')} />
                <span className="text-[10px] font-black uppercase tracking-tight">Apoyar</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <MessageCircle className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-tight">{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <Share2 className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-tight">{post.shares}</span>
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsBookmarked(!isBookmarked)} className={cn('h-9 w-9', isBookmarked && 'text-primary')}>
              <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header="Opciones"
        buttons={[
          {
            text: 'Tomar en Custodia',
            icon: bodyOutline,
            handler: () => setShowCamera(true)
          },
          { text: 'Guardar', icon: clipboardOutline, handler: () => setIsBookmarked(true) },
          { text: 'Cancelar', role: 'cancel' }
        ]}
      />

      {/* Cámara de Custodia Corregida */}
      <IonModal 
        isOpen={showCamera} 
        onDidDismiss={() => { stopCamera(); setShowCamera(false); }}
        onIonModalDidPresent={startCamera}
      >
        <div className="flex flex-col h-full bg-black">
          <div className="p-6 pt-12 flex justify-between items-center bg-black/50 text-white z-10">
            <h3 className="font-black text-lg uppercase tracking-tighter italic">Validación de Custodia</h3>
            <button onClick={() => setShowCamera(false)}><X /></button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
            <div className="absolute inset-0 border-[40px] border-black/60 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] aspect-square border-2 border-dashed border-primary/50 rounded-full flex flex-col items-center justify-center text-center p-6 bg-primary/5 backdrop-blur-[1px]">
              <Camera className="text-primary h-10 w-10 mb-4 animate-pulse" />
              <p className="text-white font-black text-[10px] uppercase tracking-[0.2em] leading-tight">
                Ambos rostros visibles
              </p>
            </div>
          </div>

          <div className="p-12 bg-black flex justify-center">
            <button 
              onClick={takePhoto}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-xl" />
            </button>
          </div>
        </div>
      </IonModal>

      {/* Modal Ranking Animado */}
      <IonModal isOpen={showPoints} onDidDismiss={handleFinishCustody}>
        <div className="flex flex-col items-center justify-center h-full bg-background/95 backdrop-blur-2xl p-8 text-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${progressWidth}%` }} />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="bg-primary p-6 rounded-[32px] relative shadow-2xl">
              <TrendingUp className="text-primary-foreground h-12 w-12" />
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 p-2 rounded-full shadow-lg animate-bounce">
              <Star className="text-yellow-900 h-6 w-6 fill-current" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-foreground tracking-tighter mb-1 uppercase italic">¡Rescate Iniciado!</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-10">Puntos sumados a tu perfil</p>

          <div className="mb-14">
            <span className="text-7xl font-black text-foreground tracking-tighter">
              {animatedPoints.toLocaleString()}
            </span>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="bg-emerald-500/10 px-4 py-1 rounded-full flex items-center gap-2 border border-emerald-500/20">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600 font-black text-sm uppercase">+50 PUNTOS</span>
              </div>
            </div>
          </div>

          <Card className="p-6 border-none bg-muted/40 rounded-[32px] mb-8 w-full">
            <p className="text-sm text-foreground/80 font-bold mb-6 text-left leading-relaxed">
              Completa la <span className="text-primary font-black underline">identificación biométrica</span> para sumar <span className="text-primary">+100 PUNTOS EXTRAS</span> ahora.
            </p>
            <Button 
              onClick={() => { setShowPoints(false); setIsRemoved(true); history.push('/biometrics'); }}
              className="w-full h-15 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/40"
            >
              Ir a Biometría
            </Button>
          </Card>

          <button onClick={handleFinishCustody} className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
            Cerrar
          </button>
        </div>
      </IonModal>
    </>
  )
}

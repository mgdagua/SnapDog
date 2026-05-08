import { IonContent, IonPage, IonIcon } from '@ionic/react'
import { personOutline, medicalOutline, arrowForwardOutline, logoGoogle, logoApple } from 'ionicons/icons'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import logoImg from '../../assets/Logo.jpeg'
import { cn } from '../../lib/utils'

export default function LoginPage() {
  const [role, setRole] = useState<'volunteer' | 'veterinarian'>('volunteer')
  const history = useHistory()

  const handleLogin = (e: React.FormEvent) => {
    // Evitamos que el formulario recargue la página prematuramente
    e.preventDefault()
    
    // Guardamos el rol en memoria
    localStorage.setItem('userRole', role) 
    
    // Navegamos con el Router de Ionic
    history.push('/home')
    
    // TRUCO DEFINITIVO: Forzamos la recarga de toda la ventana 100ms después
    // Esto asegura que el App.tsx y el SideMenu lean el localStorage nuevo
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <IonPage>
      <IonContent fullscreen className="--background: var(--background);">
        <div className="min-h-screen flex flex-col px-8 pt-16 pb-10 max-w-md mx-auto bg-background text-foreground">
          
          {/* Premium Logo Frame */}
          <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-8 duration-1000">
            <div className="w-full max-w-[300px] h-36 p-1 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 border border-primary/10 shadow-2xl shadow-primary/5 flex items-center justify-center mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={logoImg} 
                alt="SnapDog" 
                className="w-full h-full object-contain relative z-10 p-4" 
              />
            </div>
            <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em] text-center opacity-90">
              Trazabilidad Animal Inteligente
            </p>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-base font-black text-foreground uppercase tracking-widest mb-1">Tipo de Perfil</h2>
            <p className="text-xs text-muted-foreground font-medium">Selecciona tu rol en la red para ingresar</p>
          </div>

          {/* Selector de Rol */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <button
              onClick={() => setRole('volunteer')}
              type="button" // IMPORTANTE para que no active el submit
              className={cn(
                "group flex flex-col items-center justify-center p-6 rounded-[2.5rem] border-2 transition-all duration-500",
                role === 'volunteer' 
                  ? "bg-primary border-primary shadow-2xl shadow-primary/30 scale-105 z-10" 
                  : "bg-card border-border/40 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500",
                role === 'volunteer' ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              )}>
                <IonIcon icon={personOutline} className="text-2xl" />
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                role === 'volunteer' ? "text-white" : "text-muted-foreground"
              )}>Voluntario</span>
            </button>

            <button
              onClick={() => setRole('veterinarian')}
              type="button" // IMPORTANTE para que no active el submit
              className={cn(
                "group flex flex-col items-center justify-center p-6 rounded-[2.5rem] border-2 transition-all duration-500",
                role === 'veterinarian' 
                  ? "bg-primary border-primary shadow-2xl shadow-primary/30 scale-105 z-10" 
                  : "bg-card border-border/40 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500",
                role === 'veterinarian' ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              )}>
                <IonIcon icon={medicalOutline} className="text-2xl" />
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                role === 'veterinarian' ? "text-white" : "text-muted-foreground"
              )}>Veterinario</span>
            </button>
          </div>

          {/* Formulario de Login */}
          <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="space-y-3">
              <div className="px-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Credenciales de Acceso</Label>
              </div>
              <Input 
                type="text" 
                placeholder="Email o Teléfono" 
                className="rounded-2xl h-14 bg-muted/40 border-0 focus-visible:ring-2 ring-primary/30 text-base px-6"
                required
              />
              <Input 
                type="password" 
                placeholder="Contraseña" 
                className="rounded-2xl h-14 bg-muted/40 border-0 focus-visible:ring-2 ring-primary/30 text-base px-6"
                required
              />
            </div>

            <Button type="submit" className="w-full h-15 rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/40 transition-all active:scale-95 flex gap-3 hover:brightness-110 bg-primary">
              Iniciar Sesión
              <IonIcon icon={arrowForwardOutline} className="text-xl" />
            </Button>
          </form>

          {/* Social and Footer */}
          <div className="mt-14 flex flex-col items-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6">O ingresa con</p>
            <div className="flex gap-6 mb-12">
              <button type="button" className="w-14 h-14 rounded-2xl bg-card border border-border/40 flex items-center justify-center shadow-sm hover:bg-muted transition-all active:scale-90">
                <IonIcon icon={logoGoogle} className="text-xl" />
              </button>
              <button type="button" className="w-14 h-14 rounded-2xl bg-card border border-border/40 flex items-center justify-center shadow-sm hover:bg-muted transition-all active:scale-90">
                <IonIcon icon={logoApple} className="text-xl" />
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              ¿Eres nuevo en SnapDog? <br />
              <span className="text-primary font-black hover:underline underline-offset-4 cursor-pointer mt-1 inline-block">Crea una cuenta ahora</span>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
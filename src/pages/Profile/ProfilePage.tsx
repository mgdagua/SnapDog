import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react'
import { settingsOutline, gridOutline, ribbonOutline, informationCircleOutline, heartOutline, shareOutline, editOutline } from 'ionicons/icons'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BottomNav } from '@/components/feed/bottom-nav'
import { currentUser, mockPosts } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--background);">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="font-extrabold tracking-tight">Mi Perfil</IonTitle>
          <IonButtons slot="end">
            <Button variant="ghost" size="icon">
              <IonIcon icon={settingsOutline} className="text-xl" />
            </Button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="max-w-2xl mx-auto pb-24">
          {/* Profile Header (Instagram style) */}
          <div className="px-6 pt-4 pb-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20 p-1 bg-background">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="rounded-full" />
                  <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full border-4 border-background">
                  <IonIcon icon={ribbonOutline} className="text-sm" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col gap-1 mb-3">
                  <h2 className="text-2xl font-black text-foreground leading-none">{currentUser.name}</h2>
                  <p className="text-sm text-muted-foreground font-medium">@mariag_voluntaria</p>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="font-black text-lg leading-none">42</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-black text-lg leading-none">12</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Rescates</p>
                  </div>
                  <div className="text-center">
                    <p className="font-black text-lg leading-none">2.8k</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Puntos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-foreground leading-relaxed">
                Voluntaria apasionada por el bienestar animal en Popayán. 🐾 <br />
                Coordinadora de rescates en el Centro Histórico.
              </p>
              <p className="text-xs text-primary font-bold mt-1">snapdog.app/mariag</p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 rounded-xl font-bold h-10 shadow-lg shadow-primary/20">Editar Perfil</Button>
              <Button variant="outline" className="flex-1 rounded-xl font-bold h-10 border-2">Compartir</Button>
            </div>
          </div>

          {/* Tabs (Facebook/Instagram style) */}
          <div className="border-t border-border/40">
            <IonSegment 
              value={activeTab} 
              onIonChange={e => setActiveTab(e.detail.value as string)}
              className="bg-transparent"
            >
              <IonSegmentButton value="posts">
                <IonIcon icon={gridOutline} className="text-lg" />
              </IonSegmentButton>
              <IonSegmentButton value="badges">
                <IonIcon icon={ribbonOutline} className="text-lg" />
              </IonSegmentButton>
              <IonSegmentButton value="info">
                <IonIcon icon={informationCircleOutline} className="text-lg" />
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Tab Content */}
          <div className="px-1 pt-1">
            {activeTab === 'posts' && (
              <div className="grid grid-cols-3 gap-1">
                {mockPosts.map((post) => (
                  <div key={post.id} className="aspect-square relative group overflow-hidden bg-muted rounded-sm">
                    <img 
                      src={post.imageUrl} 
                      alt="Post" 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                    />
                    {post.urgencyLevel === 'critical' && (
                      <div className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full shadow-[0_0_8px_var(--destructive)]" />
                    )}
                  </div>
                ))}
                {/* Simulated more posts */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted/30 rounded-sm flex items-center justify-center">
                    <IonIcon icon={heartOutline} className="text-2xl text-muted-foreground/20" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="p-4 grid grid-cols-2 gap-4">
                {['Primer Rescate', 'Colaborador Estrella', 'Héroe Comunitario', 'Analista IA'].map((badge, i) => (
                  <Card key={i} className="p-4 flex flex-col items-center gap-2 border-border/40 bg-card rounded-2xl shadow-sm">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl">
                      {['🚑', '⭐', '🦸', '🔬'][i]}
                    </div>
                    <p className="text-xs font-black text-center">{badge}</p>
                    <div className="bg-success/10 text-success text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Completado</div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'info' && (
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Información de Voluntario</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <IonIcon icon={heartOutline} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Animales Ayudados</p>
                        <p className="text-sm font-bold">12 perros · 5 gatos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <IonIcon icon={shareOutline} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Impacto Comunitario</p>
                        <p className="text-sm font-bold">85 reportes compartidos</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl h-12">
                  <p className="font-bold">Cerrar Sesión</p>
                </Button>
              </div>
            )}
          </div>
        </div>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

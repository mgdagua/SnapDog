import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon } from '@ionic/react'
import { trophyOutline, medalOutline, starOutline } from 'ionicons/icons'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BottomNav } from '@/components/feed/bottom-nav'

const rankingData = [
  { id: 1, name: 'Carlos Muñoz', pts: 4820, avatar: '🦸', rank: '🥇', color: 'bg-yellow-100 text-yellow-700' },
  { id: 2, name: 'Sofía Ruiz', pts: 3540, avatar: '👩‍⚕️', rank: '🥈', color: 'bg-slate-100 text-slate-700' },
  { id: 3, name: 'María López', pts: 2840, avatar: '🧑', rank: '🥉', color: 'bg-orange-100 text-orange-700' },
  { id: 4, name: 'Andrés Felipe', pts: 2150, avatar: '👨', rank: '4', color: 'bg-muted text-muted-foreground' },
  { id: 5, name: 'Laura Pérez', pts: 1980, avatar: '👩', rank: '5', color: 'bg-muted text-muted-foreground' },
]

export default function RankingPage() {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--background);">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="font-extrabold tracking-tight">Top Voluntarios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="max-w-2xl mx-auto pb-20">
          <Card className="bg-gradient-to-br from-primary to-primary-foreground/20 p-6 mb-6 text-white border-0 shadow-xl shadow-primary/20 rounded-3xl overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Mi Progreso</p>
              <h2 className="text-3xl font-black mb-4">Nivel 7 — Guardián</h2>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black">2,840</span>
                <span className="text-sm font-bold opacity-80 mb-1">puntos</span>
              </div>
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-white h-full w-[68%]" />
              </div>
              <p className="text-[10px] font-bold opacity-70">68% para Nivel 8 — Héroe Animal</p>
            </div>
            <IonIcon icon={trophyOutline} className="absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12" />
          </Card>

          <div className="flex flex-col gap-3">
            {rankingData.map((user) => (
              <div key={user.id} className="bg-card p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-border/40 transition-transform active:scale-95">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${user.color}`}>
                  {user.rank}
                </div>
                <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                  <AvatarFallback className="text-xl">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <IonIcon icon={starOutline} className="text-primary" />
                    {user.pts.toLocaleString()} pts
                  </p>
                </div>
                {user.id <= 3 && (
                  <IonIcon icon={medalOutline} className={`text-2xl ${user.id === 1 ? 'text-yellow-500' : user.id === 2 ? 'text-slate-400' : 'text-orange-400'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

import { IonHeader, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { currentUser } from '@/lib/mock-data'

export function Header() {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className="--background: transparent; --padding-top: 0; --padding-bottom: 0;">
        <header className="bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IonButtons slot="start">
                <IonMenuButton className="text-foreground" />
              </IonButtons>
              <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center ml-2">
                <span className="text-primary-foreground font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">SnapDog</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Search className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
      </IonToolbar>
    </IonHeader>
  )
}

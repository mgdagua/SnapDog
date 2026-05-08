import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { useState } from 'react' // Importante añadir esto
import { mockPosts } from '../../lib/mock-data' 
import { PostCard } from '../../components/feed/post-card'
import { Header } from '../../components/feed/header'
import { BottomNav } from '../../components/feed/bottom-nav'
import { StoriesBar } from '../../components/feed/stories-bar'
import { QuickStats } from '../../components/feed/quick-stats'
import { ReportButton } from '../../components/feed/report-button'

export default function VolunteerDashboard() {
  // Guardamos los posts en un estado local
  const [posts, setPosts] = useState(mockPosts)

  // ESTA ES LA MAGIA: Se ejecuta cada vez que la vista entra a la pantalla
  useIonViewWillEnter(() => {
    setPosts([...mockPosts])
  })

  return (
    <IonPage>
      <Header />
      <IonContent id="main-content" fullscreen className="ion-padding-bottom">
        <div className="min-h-screen bg-background text-foreground">
          <StoriesBar />
          <QuickStats />

          <main className="max-w-2xl mx-auto px-4 py-4 pb-24">
            <div className="flex flex-col gap-4">
              {/* Cambiamos mockPosts por nuestro estado "posts" */}
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </main>
        </div>
      </IonContent>
      
      <ReportButton />
      <BottomNav />
    </IonPage>
  )
}
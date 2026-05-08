import { IonContent, IonPage } from '@ionic/react'
import { mockPosts } from '@/lib/mock-data'
import { PostCard } from '@/components/feed/post-card'
import { Header } from '@/components/feed/header'
import { BottomNav } from '@/components/feed/bottom-nav'
import { StoriesBar } from '@/components/feed/stories-bar'
import { QuickStats } from '@/components/feed/quick-stats'
import { ReportButton } from '@/components/feed/report-button'

export default function VetDashboard() {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className="ion-padding-bottom">
        <div className="min-h-screen bg-background text-foreground">
          <StoriesBar />
          <QuickStats />

          {/* Feed Content */}
          <main className="max-w-2xl mx-auto px-4 py-4 pb-24">
            <div className="flex flex-col gap-4">
              {mockPosts.map((post) => (
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

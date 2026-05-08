import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const stories = [
  {
    id: 'new',
    name: 'Tu historia',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    isNew: true,
    hasStory: false,
  },
  {
    id: '1',
    name: 'Rescate Hoy',
    avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop',
    hasStory: true,
    isUrgent: true,
  },
  {
    id: '2',
    name: 'Max Adoptado',
    avatar: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop',
    hasStory: true,
  },
  {
    id: '3',
    name: 'Luna Recupera',
    avatar: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=100&h=100&fit=crop',
    hasStory: true,
  },
  {
    id: '4',
    name: 'Colonia Gatos',
    avatar: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&h=100&fit=crop',
    hasStory: true,
  },
]

export function StoriesBar() {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
          {stories.map((story) => (
            <button
              key={story.id}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div
                className={cn(
                  'relative p-0.5 rounded-full',
                  story.hasStory && !story.isUrgent && 'bg-gradient-to-br from-primary to-accent',
                  story.isUrgent && 'bg-gradient-to-br from-destructive to-warning animate-pulse'
                )}
              >
                <Avatar className={cn('h-16 w-16 border-2 border-card', story.isNew && 'border-dashed border-muted-foreground/30')}>
                  <AvatarImage src={story.avatar} alt={story.name} />
                  <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {story.isNew && (
                  <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <Plus className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className="text-[11px] font-medium text-foreground/80 w-16 truncate text-center">
                {story.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

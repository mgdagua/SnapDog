import { useState } from 'react'
// ¡Cambiamos Footprints por PawPrint!
import { PawPrint, MessageCircle, Share2, MapPin, Clock, MoreHorizontal, Bookmark, Shield } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { UrgencyBadge } from './urgency-badge'
import { StatusBadge } from './status-badge'
import type { AnimalPost } from '../../lib/types'

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

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-sm',
        post.urgencyLevel === 'critical' && 'ring-2 ring-destructive/50'
      )}
    >
      {/* Author Header */}
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
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] w-full">
        <img
          src={post.imageUrl}
          alt={post.animalName || 'Animal reportado'}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Urgency overlay */}
        <div className="absolute top-3 left-3">
          <UrgencyBadge level={post.urgencyLevel} />
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge status={post.status} />
        </div>
      </div>

      <CardContent className="p-4">
        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{post.location}</span>
          <span className="text-xs text-muted-foreground">- {post.neighborhood}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/90 mb-3 leading-relaxed">{post.description}</p>

        {/* Recommendations */}
        {post.recommendations && post.recommendations.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-accent/50 border border-border">
            <h4 className="text-xs font-semibold text-foreground mb-2">Recomendaciones:</h4>
            <ul className="space-y-1">
              {post.recommendations.map((rec, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interaction Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span>{likesCount} apoyos</span>
          <span>{post.comments} comentarios</span>
          <span>{post.shares} compartidos</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                'gap-2 transition-all duration-200',
                isLiked && 'text-primary hover:text-primary'
              )}
            >
              {/* Aquí usamos la huella de perro de verdad */}
              <PawPrint className={cn('h-5 w-5', isLiked && 'fill-current')} />
              <span className="text-sm font-medium">Apoyar</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">Comentar</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-5 w-5" />
              <span className="text-sm">Compartir</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(isBookmarked && 'text-primary')}
          >
            <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
import { cn } from '@/lib/utils'
import type { AnimalStatus } from '@/lib/types'
import { Heart, Stethoscope, TrendingUp, CheckCircle2, Home } from 'lucide-react'

interface StatusBadgeProps {
  status: AnimalStatus
  className?: string
}

const statusConfig = {
  needs_rescue: {
    label: 'Necesita Rescate',
    icon: Heart,
    className: 'bg-destructive/10 text-destructive',
  },
  in_treatment: {
    label: 'En Tratamiento',
    icon: Stethoscope,
    className: 'bg-warning/10 text-warning-foreground',
  },
  recovering: {
    label: 'En Recuperacion',
    icon: TrendingUp,
    className: 'bg-primary/10 text-primary',
  },
  healthy: {
    label: 'Saludable',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success',
  },
  adopted: {
    label: 'Adoptado',
    icon: Home,
    className: 'bg-success/10 text-success',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </span>
  )
}

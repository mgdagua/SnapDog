import { cn } from '../../lib/utils'
import type { AnimalStatus } from '../../lib/types'
import { Heart, Stethoscope, TrendingUp, CheckCircle2, Home, Eye } from 'lucide-react'

interface StatusBadgeProps {
  status: AnimalStatus | string // Permitimos string para evitar errores si llega algo nuevo
  className?: string
}

const statusConfig: Record<string, any> = {
  needs_rescue: {
    label: 'Necesita Rescate',
    icon: Heart,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  in_treatment: {
    label: 'En Tratamiento',
    icon: Stethoscope,
    className: 'bg-warning/10 text-warning-foreground border-warning/20',
  },
  recovering: {
    label: 'En Recuperación',
    icon: TrendingUp,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  healthy: {
    label: 'Saludable',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success border-success/20',
  },
  adopted: {
    label: 'Adoptado',
    icon: Home,
    className: 'bg-success/10 text-success border-success/20',
  },
  // Añadimos el estado que viene del ReportPage
  spotted: {
    label: 'Solo Avistado',
    icon: Eye,
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  // 🛡️ Si el estado no existe en el config, usamos 'needs_rescue' como respaldo
  const config = statusConfig[status] || statusConfig['needs_rescue']
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </span>
  )
}
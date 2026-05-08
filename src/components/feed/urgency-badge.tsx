import { cn } from '../../lib/utils' // Ajusta la ruta si usas alias @
import type { UrgencyLevel } from '../../lib/types'
import { AlertTriangle, AlertCircle, Clock, CheckCircle } from 'lucide-react'

interface UrgencyBadgeProps {
  level: UrgencyLevel | string // Permitimos string genérico por si falla el tipado
  showLabel?: boolean
  className?: string
}

const urgencyConfig: Record<string, any> = {
  critical: {
    label: 'Crítico',
    icon: AlertTriangle,
    className: 'bg-destructive/15 text-destructive border-destructive/30 animate-pulse',
  },
  high: {
    label: 'Alta',
    icon: AlertCircle,
    className: 'bg-warning/15 text-warning-foreground border-warning/30',
  },
  medium: {
    label: 'Media',
    icon: Clock,
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  low: {
    label: 'Baja',
    icon: CheckCircle,
    className: 'bg-success/15 text-success border-success/30',
  },
}

export function UrgencyBadge({ level, showLabel = true, className }: UrgencyBadgeProps) {
  // 🛡️ MAGIA AQUÍ: Si el nivel no existe en el objeto, usamos 'low' por defecto
  const config = urgencyConfig[level] || urgencyConfig['low']
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
      {showLabel && <span>{config.label}</span>}
    </span>
  )
}
import { Heart, MapPin, Users, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

const stats = [
  { icon: Heart, label: 'Rescatados', value: '127', color: 'text-destructive' },
  { icon: MapPin, label: 'Reportes', value: '45', color: 'text-warning-foreground' },
  { icon: Users, label: 'Voluntarios', value: '89', color: 'text-primary' },
  { icon: TrendingUp, label: 'Esta Semana', value: '+12', color: 'text-success' },
]

export function QuickStats() {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="flex flex-col items-center justify-center p-3 bg-muted/50 border-0 shadow-none"
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mb-1`} />
              <span className="text-lg font-bold text-foreground">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

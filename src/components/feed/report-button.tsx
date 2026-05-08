import { Plus, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ReportButton() {
  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 hover:scale-105"
      >
        <div className="relative">
          <Camera className="h-6 w-6" />
          <Plus className="absolute -top-1 -right-1 h-3 w-3" />
        </div>
        <span className="sr-only">Reportar Animal</span>
      </Button>
    </div>
  )
}

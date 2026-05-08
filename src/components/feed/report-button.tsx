import { Plus, Camera } from 'lucide-react'
import { Button } from '../../components/ui/button' // Cambié @ por ruta relativa por seguridad
import { useHistory } from 'react-router-dom'

export function ReportButton() {
  const history = useHistory()

  return (
    <div className="fixed bottom-24 right-6 z-50"> 
      {/* Subí un poco el bottom de 20 a 24 para que no tape el BottomNav */}
      <Button
        size="lg"
        onClick={() => history.push('/report')}
        className="h-16 w-16 rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-300 bg-primary hover:bg-primary/90 hover:scale-110 active:scale-95"
      >
        <div className="relative">
          <Camera className="h-7 w-7 text-white" />
          <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
            <Plus className="h-3 w-3 text-primary stroke-[3px]" />
          </div>
        </div>
        <span className="sr-only">Reportar Animal</span>
      </Button>
    </div>
  )
}
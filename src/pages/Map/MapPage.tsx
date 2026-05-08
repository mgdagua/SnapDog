import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon } from '@ionic/react'
import { analyticsOutline, alertCircleOutline, trendingUpOutline, barChartOutline, sparklesOutline, locateOutline, pulseOutline, shieldCheckmarkOutline } from 'ionicons/icons'
import { Card } from '@/components/ui/card'
import { BottomNav } from '@/components/feed/bottom-nav'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'
import L from 'leaflet'
import { mockPosts } from '@/lib/mock-data'
import { AnimalPost } from '@/lib/types'

// Import Leaflet CSS to ensure map displays correctly
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon in Leaflet + Vite
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

const getMarkerIcon = (urgency: string) => {
  const color = urgency === 'critical' ? '#ef4444' : urgency === 'high' ? '#f59e0b' : '#8E67B5'
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-6 h-6 bg-[${color}] opacity-30 rounded-full animate-ping"></div>
        <div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.2); position: relative; z-index: 10;"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

// Data focused on Outbreak Detection (Diseases)
const outbreakData = [
  { disease: 'Parvovirus', cases: 18, color: '#ef4444' },
  { disease: 'Moquillo', cases: 12, color: '#f59e0b' },
  { disease: 'Sarna', cases: 25, color: '#8E67B5' },
  { disease: 'Leishmaniasis', cases: 6, color: '#3b82f6' },
]

// Data for Rescue Progress (Rescued vs Helped)
const rescueProgressData = [
  { name: 'Rescatados', value: 34, fill: '#8E67B5' },
  { name: 'Ayudados (Sitio)', value: 42, fill: '#10b981' },
]

export default function MapPage() {
  const activeCases = mockPosts.filter(
    (post) => ['needs_rescue', 'in_treatment', 'recovering'].includes(post.status) && post.coordinates
  )

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="--background: var(--background);">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="font-extrabold tracking-tight">Vigilancia Sanitaria</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="max-w-2xl mx-auto flex flex-col pb-32 gap-6">
          
          {/* Section 1: Map (Framed) */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary/10 p-2 rounded-xl">
                <IonIcon icon={locateOutline} className="text-primary" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Focos de Infección Detectados</h2>
            </div>
            <div className="rounded-3xl border-2 border-primary/20 relative overflow-hidden h-[350px] shadow-inner z-0">
              <MapContainer
                center={[2.4419, -76.6063]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {activeCases.map((post: AnimalPost) => (
                  <Marker
                    key={post.id}
                    position={[post.coordinates!.lat, post.coordinates!.lng]}
                    icon={getMarkerIcon(post.urgencyLevel)}
                  >
                    <Popup className="custom-popup">
                      <div className="p-1">
                        <img src={post.imageUrl} className="w-full h-20 object-cover rounded-lg mb-2" />
                        <h3 className="font-bold text-xs">{post.location}</h3>
                        <p className="text-[10px] text-muted-foreground">Posible Brote: {post.animalType === 'dog' ? 'Parvovirus' : 'Sarna'}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur px-4 py-1.5 rounded-full shadow-lg border border-border flex items-center gap-2 z-[400]">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-[10px] font-bold">Popayán - Vigilancia Activa</span>
              </div>
            </div>
          </section>

          {/* Section 2: Outbreak and Progress Statistics */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 rounded-3xl border-none shadow-sm bg-card">
              <div className="flex items-center gap-2 mb-4">
                <IonIcon icon={pulseOutline} className="text-red-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Enfermedades por Sector</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={outbreakData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="disease" type="category" fontSize={10} axisLine={false} tickLine={false} width={80} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="cases" radius={[0, 4, 4, 0]}>
                      {outbreakData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4 rounded-3xl border-none shadow-sm bg-card">
              <div className="flex items-center gap-2 mb-4">
                <IonIcon icon={shieldCheckmarkOutline} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estado de Rescates</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={rescueProgressData}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {rescueProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </section>

          {/* Section 3: AI Intelligence Section - Focus on Outbreaks */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary/10 p-2 rounded-xl">
                <IonIcon icon={sparklesOutline} className="text-primary" />
              </div>
              <h2 className="text-lg font-black tracking-tight">Análisis Epidemiológico SnapIA</h2>
            </div>
            <Card className="p-5 bg-gradient-to-br from-primary/10 via-background to-secondary/50 border-primary/20 rounded-[2rem] shadow-inner relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
                    <IonIcon icon={sparklesOutline} className="text-white text-xl" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-bold leading-tight">
                      Hola, he identificado patrones de riesgo sanitario:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-red-500/10 border-l-4 border-red-500 p-3 rounded-r-xl">
                        <p className="text-xs text-red-700 font-bold mb-1 uppercase tracking-tighter flex items-center gap-2">
                          <IonIcon icon={alertCircleOutline} /> Alerta de Brote Detectada
                        </p>
                        <p className="text-[11px] text-red-600/80 leading-relaxed">
                          Se observa una concentración inusual de casos de <strong>Sarna</strong> en la Comuna 2. El 60% de los reportes coinciden en un radio de 500m. Posible foco de contagio ambiental detectado.
                        </p>
                      </div>
                      
                      <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-r-xl">
                        <p className="text-xs text-primary font-bold mb-1 uppercase tracking-tighter flex items-center gap-2">
                          <IonIcon icon={trendingUpOutline} /> Predicción Semanal
                        </p>
                        <p className="text-[11px] text-primary/80 leading-relaxed">
                          Dada la tasa actual, se prevé un aumento del 15% en casos de <strong>Moquillo</strong> si no se incrementan las intervenciones de "Ayuda en Sitio" para estabilizar a la población callejera.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white/50 flex flex-col items-center text-center">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Impacto de Ayuda</p>
                    <p className="text-lg font-black text-primary">42</p>
                    <p className="text-[8px] text-muted-foreground">Animales estabilizados</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white/50 flex flex-col items-center text-center">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Capacidad Refugio</p>
                    <p className="text-lg font-black text-orange-500">34</p>
                    <p className="text-[8px] text-muted-foreground">Animales en resguardo</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-primary text-white rounded-2xl text-xs font-black tracking-widest uppercase shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                  Generar Reporte Epidemiológico
                </button>
              </div>
            </Card>
          </section>

        </div>
      </IonContent>
      <BottomNav />
    </IonPage>
  )
}

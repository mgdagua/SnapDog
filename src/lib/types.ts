export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low'

export type AnimalStatus = 'needs_rescue' | 'in_treatment' | 'recovering' | 'healthy' | 'adopted'

export type AnimalType = 'dog' | 'cat' | 'other'

export interface AnimalPost {
  id: string
  imageUrl: string
  description: string
  location: string
  neighborhood: string
  createdAt: Date
  urgencyLevel: UrgencyLevel
  status: AnimalStatus
  animalType: AnimalType
  animalName?: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  author: {
    name: string
    avatar: string
    role: 'volunteer' | 'veterinarian'
  }
  recommendations?: string[]
}

export interface User {
  id: string
  name: string
  avatar: string
  role: 'volunteer' | 'veterinarian'
  points: number
  level: number
  badges: string[]
}

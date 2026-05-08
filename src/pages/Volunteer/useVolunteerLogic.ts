import { useState } from 'react';

export interface Report {
  id: string;
  reporterName: string;
  reporterRole: string;
  timeAgo: string;
  status: 'CRÍTICO' | 'MODERADO' | 'ESTABLE';
  dogName: string;
  location: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
}

export const useVolunteerLogic = () => {
  const [activeReports] = useState<Report[]>([
    {
      id: 'SD-101',
      reporterName: 'Carlos Muñoz',
      reporterRole: 'Veterinario',
      timeAgo: 'Hace 8 min',
      status: 'CRÍTICO',
      dogName: 'Max — Sin identificar',
      location: 'Carrera 6 con Calle 4, Popayán',
      description: 'Perro macho, aproximadamente 3 años. Herida en pata trasera derecha, parece lleva varios días sin comer. Necesita atención veterinaria urgente.',
      tags: ['Herida', 'Desnutrición', 'Sin ID', 'Centro'],
      likes: 24,
      comments: 8,
    }
  ]);

  return { reports: activeReports };
};
import { RankingSection } from '@/components'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Ranking de Aprendizaje | gX Learning',
  description: 'Compite con otros estudiantes y mejora tu posición en el ranking de gX Learning.',
}

export default function RankingPage() {
  return (
    <RankingSection fullView={true}  />
  )
}


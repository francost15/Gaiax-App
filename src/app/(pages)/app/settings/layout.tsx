import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Configuración | gX Learning',
  description: 'Personaliza tu experiencia de aprendizaje en gX Learning.',
}

export default function LayoutSettings({
  children,
}: {
  children: React.ReactNode
}) {
  

  return (
    <div className="text-gray-900 bg-gray-50 dark:bg-neutral-800 dark:text-gray-100">
        <main  className="min-h-screen" >
          {children}
        </main>
    </div>
  )
}


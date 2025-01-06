import { FAQ, QuickActions, SearchFAQ } from "@/components";


export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="py-16 sm:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Centro de Ayuda
            </h1>
            <p className="mt-4 text-xl text-gray-600 sm:text-2xl">
              ¿Cómo podemos ayudarte hoy?
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <SearchFAQ />
          </div>

          <div className="mt-24">
            <QuickActions />
          </div>

          <div className="mt-24">
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  )
}


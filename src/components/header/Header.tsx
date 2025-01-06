import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback,Logo,Input,Button } from "@/components"


export const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white border-b">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-semibold text-gray-900">gX</span>
          </div>
          <div className="flex items-center justify-center flex-1">
            <div className="relative w-full max-w-lg">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input 
                type="search"
                placeholder="Buscar lecciones, habilidades..."
                className="w-full pl-10 bg-gray-50"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-gray-500" />
            </Button>
            <Avatar>
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}


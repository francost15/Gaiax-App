import { Button } from "../ui/button"

export const NavbarDemo = () => {
  return (
    <nav className="fixed z-50 w-full border-b bg-white/80 backdrop-blur-sm">
    <div className="px-6 py-4 mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <div className="flex items-center transition-all duration-300 ease-in-out hover:scale-105">
          <span className="text-2xl font-bold">
            <span className="text-primaryper">g</span>
            <span className="text-gray-800">X</span>
          </span>
        </div>
        <div className="flex justify-end flex-1 gap-x-2">
          <Button 
          title="Agenda una demo"
          className='text-white bg-primaryper hover:bg-primary-hover rounded-xl '>Agenda una demo</Button>
        </div>
      </div>
    </div>
  </nav>
  )
}

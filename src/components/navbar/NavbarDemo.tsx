import { Button } from "../ui/button"

export const NavbarDemo = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
    <div className="mx-auto max-w-7xl px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <div className="flex items-center transition-all duration-300 ease-in-out hover:scale-105">
          <span className="text-2xl font-bold">
            <span className="text-primaryper">g</span>
            <span className="text-gray-800">X</span>
          </span>
        </div>
        <div className="flex-1 flex justify-end gap-x-2">
          <Button className='bg-primaryper hover:bg-primary-hover text-white rounded-xl '>Agenda una demo</Button>
        </div>
      </div>
    </div>
  </nav>
  )
}

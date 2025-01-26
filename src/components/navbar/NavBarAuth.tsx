export const NavbarAuth = () => {
  return (
    <nav className="fixed w-full bg-white dark:bg-neutral-900 ">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex justify-start">
          <div className="flex transition-all duration-300 ease-in-out hover:scale-105">
            <span className="text-2xl font-bold">
              <span className="text-primaryper">g</span>
              <span className="text-gray-800 dark:text-white">X</span>
            </span>
          </div>
        </div>
      </div>
      {/* poner una raya azul */}
      {/* <div className="bg-blue-600 h-1"></div> */}
    </nav>
  );
};

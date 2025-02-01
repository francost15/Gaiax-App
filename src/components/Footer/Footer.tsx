export const Footer = () => {
  return (
    <footer className=" dark:text-neutral-600 text-gray-400 flex sm:mt-2 mt-4 py-4">
      <div className="container mx-auto text-center">
        <p className="text-xs hidden sm:block">
          &copy; {new Date().getFullYear()} GaiaX. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

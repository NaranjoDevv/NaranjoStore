import Link from "next/link";
import Image from "next/image"; // Importa el componente Image de next/image
import React from "react";
import Menu from "./Menu";

const Header = () => {
  return (
    <header>
      <nav className="mt-12 px-12">
        <div className="navbar justify-between text-black">
          <Link href="/" className="btn btn-ghost text-lg">
            <Image
              src="/images/logo.png" // Ruta al logo en la carpeta public/images
              alt="NaranjoStore Logo"
              width={250} // Ajusta el ancho según sea necesario
              height={250} // Ajusta la altura según sea necesario
              className="object-center justify-center"
            />
          </Link>

          <Menu/>

         
        </div>
      </nav>
    </header>
  );
};

export default Header;

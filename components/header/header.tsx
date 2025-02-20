import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header >
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            Ecommerce Naranjo
          </Link>

          <ul className="flex">
            <li>
              <Link className="btn btn-ghost rounded-btn" href="/cart">
                Carrito
              </Link>
              <Link className="btn btn-ghost rounded-btn" href="/cart">
                Identificate
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

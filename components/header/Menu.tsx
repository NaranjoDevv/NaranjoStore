"use client";

import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <ul className="flex items-stretch space-x-8">
        <li>
          <Link className="text-xl font-bold tracking-widest uppercase hover:tracking-[0.2em] transition-all duration-300" href="/cart">
            Cart
            {mounted && items.length != 0 && (
              <span className="ml-2 inline-flex items-center justify-center bg-black text-white text-sm font-bold w-6 h-6 rounded-full">
                {items.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
        </li>
        <li>
          <button className="text-xl font-bold tracking-widest uppercase hover:tracking-[0.2em] transition-all duration-300">
            Sign In
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

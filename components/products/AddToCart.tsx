"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase , decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div className="inline-flex items-center border-2 border-black">
      <button 
        className="px-6 py-3 hover:bg-black hover:text-white transition-colors text-2xl font-bold" 
        type="button" 
        onClick={() => decrease(existItem)}
      >
        −
      </button>
      <span className="px-8 py-3 font-bold text-2xl border-l-2 border-r-2 border-black min-w-[4rem] text-center">
        {existItem.qty}
      </span>
      <button 
        className="px-6 py-3 hover:bg-black hover:text-white transition-colors text-2xl font-bold" 
        type="button" 
        onClick={() => increase(existItem)}
      >
        +
      </button>
    </div>
  ) : (
    <button
      className="w-full bg-black text-white py-4 text-xl font-bold tracking-wider hover:bg-white hover:text-black border-2 border-black transition-all duration-300 uppercase"
      type="button"
      onClick={addToCartHandler}
    >
      Add to Cart
    </button>
  );
}

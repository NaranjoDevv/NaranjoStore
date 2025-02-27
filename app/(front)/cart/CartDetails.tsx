"use client"

import useCartService from "@/lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDetails() {
    const router = useRouter();
    const { items, itemsPrice, decrease, increase, remove } = useCartService();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <></>;

    return (
        <>
            <h1 className="py-4 text-2xl font-bold">SHOPPING CART</h1>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-black py-10">
                    <h2 className="text-6xl font-semibold mb-4">Tu Carrito Está Vacío</h2>
                    <p className="text-2xl mb-6">Parece que aún no has añadido nada a tu carrito.</p>
                    <Link href="/" className="text-xl font-medium text-purple-600 hover:cursor-pointer hover:underline">
                            Explora y encuentra algo que te guste
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="table-auto w-full text-black">
                            <thead>
                                <tr>
                                    <th className="text-left">Item</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-left">Precio</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.slug} className="border-b">
                                        <td className="flex items-center py-2">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={120}
                                                height={120}
                                            />
                                            <div className="ml-4">
                                                <p className="font-bold text-2xl">{item.name}</p>
                                                <p className="text-2xl">Size: {item.size}</p>
                                                <p className="text-2xl">Color: {item.color}</p>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn hover:bg-white hover:text-black "
                                                type="button"
                                                onClick={() => decrease(item)}
                                            >
                                                -
                                            </button>
                                            <span className="px-2">{item.qty}</span>
                                            <button
                                                className="btn hover:bg-white hover:text-black"
                                                type="button"
                                                onClick={() => increase(item)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td className="text-left">
                                            <b>${item.price}</b>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn text-red-500 hover:bg-white hover:text-black"
                                                type="button"
                                                onClick={() => remove(item)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t md:border-t-0 md:border-l text-black">
                        <div className="flex justify-between mb-4">
                            <span className="font-bold">Subtotal

                                ({items.reduce((a,c) => a + c.qty , 0)} Items)

                            </span>
                            <span><b className="text-2xl">
                                ${itemsPrice}</b></span> 
                        </div>
                        <button 
                            className="btn w-full bg-black text-white py-2 hover:bg-white hover:text-black"
                            onClick={() => router.push('/shipping')}
                        >
                            CHECKOUT
                        </button>
                        <p className="text-center mt-2 text-sm">
                            or 4 interest-free payments of ${itemsPrice / 4} with Afterpay
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
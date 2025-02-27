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
            <h1 className="py-4 text-6xl font-extrabold tracking-tighter uppercase">CART</h1>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-black py-20">
                    <h2 className="text-8xl font-black mb-8 tracking-tight uppercase">EMPTY CART</h2>
                    <p className="text-2xl mb-10 font-light tracking-wider">Your journey begins here</p>
                    <Link href="/" className="text-xl font-medium hover:cursor-pointer border-b-2 border-black pb-1 transition-all hover:tracking-widest">
                            EXPLORE
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-10">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="table-auto w-full text-black">
                            <thead>
                                <tr className="border-b-2 border-black">
                                    <th className="text-left text-lg font-black uppercase tracking-wider py-4">Product</th>
                                    <th className="text-center text-lg font-black uppercase tracking-wider">Quantity</th>
                                    <th className="text-left text-lg font-black uppercase tracking-wider">Price</th>
                                    <th className="text-center text-lg font-black uppercase tracking-wider">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.slug} className="border-b border-gray-200">
                                        <td className="flex items-center py-6">
                                            <div className="bg-gray-100 p-4">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={120}
                                                    height={120}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="ml-8">
                                                <p className="font-bold text-2xl uppercase tracking-tight">{item.name}</p>
                                                <p className="text-lg tracking-wide mt-2">Size: {item.size}</p>
                                                <p className="text-lg tracking-wide">Color: {item.color}</p>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="inline-flex items-center border-2 border-black">
                                                <button
                                                    className="px-4 py-2 hover:bg-black hover:text-white transition-colors text-xl font-bold"
                                                    type="button"
                                                    onClick={() => decrease(item)}
                                                >
                                                    −
                                                </button>
                                                <span className="px-6 py-2 font-medium text-xl border-l-2 border-r-2 border-black">{item.qty}</span>
                                                <button
                                                    className="px-4 py-2 hover:bg-black hover:text-white transition-colors text-xl font-bold"
                                                    type="button"
                                                    onClick={() => increase(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-left">
                                            <span className="text-2xl font-bold">${item.price}</span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="text-2xl font-bold hover:text-red-600 transition-colors"
                                                type="button"
                                                onClick={() => remove(item)}
                                            >
                                                ×
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 border-2 border-black text-black h-fit">
                        <div className="flex flex-col mb-8">
                            <span className="text-lg font-bold uppercase tracking-wider mb-2">Summary</span>
                            <div className="flex justify-between items-center border-b border-gray-200 py-4">
                                <span className="text-lg">Items ({items.reduce((a,c) => a + c.qty , 0)})</span>
                                <span className="text-2xl font-bold">${itemsPrice}</span>
                            </div>
                        </div>
                        <button 
                            className="w-full bg-black text-white py-4 text-lg font-bold tracking-wider hover:bg-white hover:text-black border-2 border-black transition-colors uppercase"
                            onClick={() => router.push('/shipping')}
                        >
                            Checkout
                        </button>
                        <p className="text-center mt-4 text-sm tracking-wide">
                            or 4 payments of ${(itemsPrice / 4).toFixed(2)} with <span className="font-bold">AFTERPAY</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
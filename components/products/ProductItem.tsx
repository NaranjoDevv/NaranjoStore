"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/models/ProductModel";
import { round2 } from "@/lib/utils";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="mb-8 transition-transform transform hover:scale-105 relative group cursor-pointer">
      <div className="bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          layout="responsive"
          width={452}
          height={452}
          className="object-cover w-full h-auto filter hover:contrast-125"
        />
      </div>
      <Link 
        className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-start text-white px-8"
        href={`/product/${product.slug}`}
      >
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">{product.name}</h1>
        <p className="text-xl font-light tracking-widest">COP: {round2(product.price)}</p>
      </Link>
    </div>
  );
}
import { Product } from "@/lib/models/ProductModel";
import { round2 } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="layout bg-transparent text-black mb-4 transition-transform transform hover:scale-105 relative group cursor-pointer">
      <div>
        <Image
          src={product.image}
          alt={product.name}
          layout="responsive"
          width={452}
          height={452}
          className="object-cover w-full h-auto"
        />
      </div>
      <Link className="absolute inset-0 bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-start text-black px-4" href={`/product/${product.slug}`}>
        <b>
          <h1 className="text-2xl font-extrabold">{product.name}</h1>
        </b>
        <p className="text-sm ml-2">COP: {round2(product.price)}</p>
      </Link>
    </div>
  );
}
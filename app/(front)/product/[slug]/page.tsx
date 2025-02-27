import AddToCart from "@/components/products/AddToCart";
import data from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductDetails({ params }: { params: { slug: string } }) {
  const product = data.products.find((x) => x.slug === params.slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <>
      <div className="my-2">
        <Link href="/">Back to products</Link>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        {/* Product Information on the Left */}
        <div className="space-y-4 text-black  mt-32">
          <h1 className="font-bold text-7xl">{product.name}</h1>
          <p className="text-xl">${product.price}</p>
          <p>{product.description}</p>
          <p>Brand: {product.brand}</p>
          <p>Rating: {product.rating} from {product.numReviews} reviews</p>
          <div className="flex space-x-4">
            <span>Size:</span>
           <h3>Su puta madre en calzones
            
           </h3>
          </div>
          <div className="flex space-x-4">
            <span>Color:</span>
            <h2>Juanes Carechimba</h2>
          </div>
          <div className="mt-4">
            {product.countInStock > 0 ? (
              <AddToCart item={{ ...product, qty: 1, color: "", size: "" }} />
            ) : (
              <span className="text-red-500">SOLD OUT</span>
            )}
          </div>
        </div>

        {/* Product Image on the Right */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="object-center"
          />
        </div>
      </div>
    </>
  );
}
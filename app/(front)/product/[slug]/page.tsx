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

      <div className="grid md:grid-cols-4 md:gap-3 ">
        <div className="md:col-span-2 ">
          <Image
            src={product.image}
            alt={product.name}
            width={420}
            height={420}
            sizes="80vw"
            style={{
              width: "80%",
              height: "auto",
            }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-4 text-black">
            <li className="text-xl">{product.name}</li>
            <li>
              {product.rating} De {product.numReviews} Comentarios
            </li>
            <li>{product.brand}</li>
            <li className="divider"></li>
            <li>Description:{product.description}</li>
          </ul>
        </div>
        <div className="card bg-base-300 shadow-xl mt-3 md:mt-0 mb-3">
          <div className="card-body">
            <div className="mb-2 flex justify-between">
              <div>Precio</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>status</div>
              <div>{product.countInStock > 0 ? "EN STOCK" : "SIN STOCK"}</div>
            </div>

            {product.countInStock !== 0 && (
              <div className="card-actions justify-center">
                <AddToCart item={{ ...product, qty: 0, color: "", size: "" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

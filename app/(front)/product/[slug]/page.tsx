"use client";
import AddToCart from "@/components/products/AddToCart";
import data from "@/lib/data";
import useCartService from "@/lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetails({ params }: { params: { slug: string } }) {
  const product = data.products.find((x) => x.slug === params.slug);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { increase } = useCartService();

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    const item = {
      ...product,
      qty: 1,
      color: selectedColor,
      size: selectedSize,
    };

    increase(item);
  };

  return (
    <>
      <div className="my-8">
        <Link href="/" className="text-xl font-medium tracking-wider hover:tracking-widest transition-all duration-300">BACK</Link>
      </div>

      <div className="grid md:grid-cols-2 md:gap-16">
        <div className="flex justify-center bg-gray-100 p-8">
          <Image
            src={product.image}
            alt={product.name}
            width={480}
            height={480}
            className="object-cover"
          />
        </div>

        <div className="space-y-8 text-black py-8">
          <h1 className="font-black text-7xl tracking-tighter uppercase">{product.name}</h1>
          <p className="text-3xl font-light tracking-widest">${product.price}</p>
          
          <div className="space-y-4 text-lg tracking-wide">
            <p className="font-light">{product.description}</p>
            <p className="uppercase">Brand: <span className="font-bold">{product.brand}</span></p>
            <p className="uppercase">Rating: <span className="font-bold">{product.rating}</span> from {product.numReviews} reviews</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg uppercase tracking-wider">Size</label>
              <select 
                className="w-full border-2 border-black p-3 text-lg uppercase tracking-wider bg-black text-white"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-lg uppercase tracking-wider">Color</label>
              <select 
                className="w-full border-2 border-black p-3 text-lg uppercase tracking-wider bg-black text-white"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Gray">Gray</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            {product.countInStock > 0 ? (
              <AddToCart item={{ ...product, qty: 1, color: "", size: "" }} />
            ) : (
              <span className="text-2xl font-bold tracking-wider text-red-600">SOLD OUT</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
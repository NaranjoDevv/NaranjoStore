import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";

export const metadata = {
  title: "Maniak",
  description: "Cart Page",
}

  function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-60 md:grid-cols-2 lg:grid-cols-2 mt-4 h-full">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}

export default Home;
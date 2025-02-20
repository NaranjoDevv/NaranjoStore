import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/components/products/AddToCart';
import { Product } from '@/lib/models/ProductModel';
import data from '@/lib/data';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: product?.name || 'Product Not Found',
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  // Replace this with your actual data fetching logic
  // Example:
  // const product = await db.get(`SELECT * FROM products WHERE slug = ?`, [slug]);
  // return product;
  
  // For now, using your data object
  const product = data.products.find((x) => x.slug === slug);
  return product || null;
}

export default async function ProductDetails({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <>
      <div className="my-2">
        <Link href="/">Back to products</Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={420}
            height={420}
            sizes="80vw"
            style={{
              width: '80%',
              height: 'auto',
            }}
          />
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
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'EN STOCK' : 'SIN STOCK'}</div>
            </div>

            {product.countInStock !== 0 && (
              <div className="card-actions justify-center">
                <AddToCart
                  item={{ ...product, qty: 0, color: '', size: '' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
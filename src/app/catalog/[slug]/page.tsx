"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Skeleton from "@/components/Skeleton";

const CatalogProducts = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/catalogs/${slug}/products`);
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return <Skeleton />;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center gap-8 lg:flex-row">
        {products.map((product: any) => (
          <Link
            href={"/" + product.slug}
            className="w-full sm:w-[45%] lg:w-[30%] flex flex-col gap-4 group"
            key={product._id}
          >
            <div className="relative w-full h-80 overflow-hidden rounded-md shadow-lg">
              <Image
                src={product.images[0] || "/product.png"}
                alt={product.title}
                fill
                sizes="25vw"
                className="object-cover rounded-md group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-lg">{product.title}</span>
              <div className="flex items-center gap-2">
                {product.price.discountedPrice ? (
                  <>
                    <span className="line-through text-gray-500">
                      RUB {product.price.price}
                    </span>
                    <span className="font-semibold text-lg text-gray-700">
                      RUB {product.price.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-lg text-gray-700">
                    RUB {product.price.price}
                  </span>
                )}
              </div>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )}
            <button className="mt-4 self-start rounded-lg bg-black text-white py-2 px-4 text-sm hover:bg-gray-800 transition-colors">
              Вызвать замерщика
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatalogProducts;

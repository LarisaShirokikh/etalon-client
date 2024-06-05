"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import Skeleton from "@/components/Skeleton";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/BreadCrumbs";

const CatalogProducts = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/catalogs/${slug}/products`);
        setProducts(response.data);
        //console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  if (loading) {
    return <Skeleton />;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="mt-12 px-1 sm:px-5">
      <Breadcrumbs />
      <div className="grid grid-cols-2 mt-12 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <Link
            href={"/" + product.slug}
            className="flex flex-col gap-2 group p-2 bg-white rounded-md"
            key={product._id}
          >
            <div className="relative w-full h-48 overflow-hidden rounded-md">
              <Image
                src={product.images[0] || "/product.png"}
                alt={product.title}
                layout="fill"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain w-full h-full group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <span className="mt-2 font-light text-m tracking-wide text-center">
                {product.title}
              </span>
              <div className="flex items-center gap-2 ">
                {product.price.discountedPrice ? (
                  <>
                    <span className="line-through text-gray-500">
                      {product.price.price} рублей
                    </span>
                    <span className="font-semibold text-lg text-gray-700">
                      {product.price.discountedPrice} рублей
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-lg text-gray-700">
                    {product.price.price} рублей
                  </span>
                )}
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
              <div className="flex-grow"></div>
              <Button text="Вызвать замерщика" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatalogProducts;

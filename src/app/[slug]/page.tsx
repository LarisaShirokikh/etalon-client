"use client";

import ProductImages from "@/components/ProductImages";
import { IProduct } from "@/interface/Product";
import axios from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const SinglePage = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products`, {
          params: { slug: params.slug },
        });
        if (response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  useEffect(() => {
    if (product) {
      console.log("Fetched product:", product);
    }
  }, [product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max p-4 lg:p-0">
        <ProductImages items={product.images} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-3xl font-medium">{product.title}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.price && (
          <>
            {product.price.price === product.price.discountedPrice ? (
              <h2 className="font-medium text-2xl">
                {product.price.discountedPrice} рублей
              </h2>
            ) : (
              <div className="flex items-center gap-4">
                <h3 className="text-xl text-gray-500 line-through">
                  {product.price.price} рублей
                </h3>
                <h2 className="font-medium text-2xl">
                  {product.price.discountedPrice} рублей
                </h2>
              </div>
            )}
            <div className="h-[2px] bg-gray-100" />
          </>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Конструкция:</strong> {product.design}
          </div>
          <div>
            <strong>Количество контуров:</strong> {product.contours}
          </div>
          <div>
            <strong>Утеплитель:</strong> {product.insulation}
          </div>
          <div>
            <strong>Толщина:</strong> {product.thickness}
          </div>
          <div>
            <strong>Основной замок:</strong> {product.mainLock}
          </div>
          <div>
            <strong>Дополнительный замок:</strong> {product.additionalLock}
          </div>
          <div>
            <strong>Внешняя отделка:</strong> {product.exterior}
          </div>
          <div>
            <strong>Внутренняя отделка:</strong> {product.interior}
          </div>
          <div>
            <strong>Петли:</strong> {product.loops}
          </div>
          <div>
            <strong>Защита:</strong> {product.protection}
          </div>
        </div>
        <div className="h-[2px] bg-gray-100" />
        {/* Additional Info Sections */}
        {/* {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))} */}
        <div className="h-[2px] bg-gray-100" />
        {/* Reviews */}
        {/* <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  );
};

export default SinglePage;

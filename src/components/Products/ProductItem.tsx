import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import Skeleton from "../Skeleton";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductItemProps {
  productId?: string;
  categoryId?: string;
  catalogId?: string;
  slug?: string;
  searchParams?: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  categoryId,
  catalogId,
  slug,
  searchParams,
}) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products`, {
          params: {
            categoryId,
            productId,
            catalogId,
            slug,
            searchParams,
          },
        });

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, categoryId, catalogId, slug, searchParams]);

  // Мемоизация настроек слайдера для предотвращения ненужных ререндеров
  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
      swipe: true,
      appendDots: (dots: React.ReactNode) => (
        <div style={{ bottom: "-10px" }}>
          <ul className="space-x-0">{dots}</ul>
        </div>
      ),
    }),
    []
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Skeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="relative rounded-md overflow-hidden flex flex-col justify-center items-center">
      <Link href={`/${product.slug}`}>
        <div className="relative w-48 h-54">
          <Slider {...sliderSettings}>
            {Array.isArray(product.images) && product.images.length > 0 ? (
              product.images.map((image: string, index: number) => (
                <div key={index} className="flex justify-center items-center">
                  <div className="relative w-48 h-48">
                    <Image
                      src={image || "/product.png"}
                      alt={`${product.title} image ${index + 1}`}
                      fill
                      objectFit="contain"
                      className="rounded-md"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-48 h-48">
                <Image
                  src="/product.png"
                  alt="Placeholder"
                  fill
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
            )}
          </Slider>
        </div>
      </Link>
      <div className="p-4 w-full">
        <Link href={`/${product.slug}`}>
          <h3 className="text-xs text-gray-800 overflow-hidden line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2 flex">
          {product.price?.discountedPrice ? (
            <>
              <span className="text-green-800 font-bold text-s">
                {product.price.discountedPrice} ₽.
              </span>
              <span className="block text-gray-500 text-xs line-through">
                {product.price.price} ₽
              </span>
            </>
          ) : (
            <span className="text-gray-700 text-s">
              {product.price?.price} ₽.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

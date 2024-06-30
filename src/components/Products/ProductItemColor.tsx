"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import Link from "next/link";
import { Heart } from "lucide-react";
import Slider from "react-slick";

interface ProductItemProps {
  productId?: string;
  color?: string;
  categoryId?: string;
  catalogId?: string;
  slug?: string;
  searchParams?: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  color,
  categoryId,
  catalogId,
  slug,
  searchParams,
}) => {
  const [product, setProduct] = useState<any>(null);
  const [bgColor, setBgColor] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);

  const colors = [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-cyan-100",
    "bg-purple-100",
    "bg-rose-100",
    "bg-violet-100",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchProduct = async () => {
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
        setBgColor(getRandomColor());
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, categoryId, catalogId, slug, searchParams]);

  if (!product) {
    return <Skeleton />;
  }

  const settings = {
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
  };

  return (
    <div
      className={`relative p-2 ${bgColor} rounded-lg flex flex-col justify-center items-center`}
      style={{ maxWidth: "250px" }} // Ensure the card width does not change
    >
      <div
        className="p-2 bg-white w-full flex justify-center items-center rounded-lg"
        style={{ height: "200px" }}
      >
        <Link href={`/${product.slug}`}>
          <div className="relative w-48 h-54">
            <Slider {...settings}>
              {product.images.map((image: string, index: number) => (
                <div key={index} className=" flex justify-center items-center">
                  <div className="relative w-48 h-48 ">
                    <Image
                      src={image || "/product.png"}
                      alt={`${product.title} image ${index + 1}`}
                      layout="fill"
                      object-fit="contain"
                      className="rounded-md"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Link>
      </div>

      <div className="p-4 w-full">
        <Link href={`/${product.slug}`}>
          <h3 className="text-xs text-gray-800 overflow-hidden line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="mt-1 flex ">
          {product.price.discountedPrice ? (
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
              {product.price.price} ₽.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

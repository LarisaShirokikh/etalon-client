import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import Link from "next/link";
import { Heart } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductItemProps {
  productId?: string;
  color?: string;
  categoryId?: string;
  catalogId?: string;
  slug?: string;
  searchParams?: any;
  name?: string; // Добавлено поле для имени пользователя или иного идентификатора
}

const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  categoryId,
  catalogId,
  slug,
  searchParams,
  name, // Получаем имя пользователя или иной идентификатор
}) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        console.error("No slug provided");
        return;
      }

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, categoryId, catalogId, slug, searchParams]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        // Выполняем запрос на проверку статуса избранного товара
        const response = await axios.get(`/api/favorites/check`, {
          params: {
            productId,
            name, // Передаем имя пользователя или иной идентификатор
          },
        });

        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    // Проверяем статус избранного только если есть имя пользователя или иной идентификатор
    if (name) {
      checkFavoriteStatus();
    }
  }, [productId, name]);

  const toggleFavorite = async () => {
    try {
      // Проверяем, что имя пользователя или иной идентификатор существует
      if (!name) {
        console.error("User is not authenticated");
        return;
      }

      // Отправляем запрос на добавление или удаление избранного товара
      if (isFavorite) {
        await axios.post(`/api/favorites/remove`, {
          productId,
          name,
        });
        setIsFavorite(false);
      } else {
        await axios.post(`/api/favorites/add`, {
          productId,
          name,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

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

  if (loading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-md overflow-hidden bg-white flex flex-col justify-center items-center">
      <Link href={`/${product.slug}`}>
        <div className="relative w-48 h-54">
          <Slider {...settings}>
            {product.images.map((image: string, index: number) => (
              <div key={index} className=" flex justify-center items-center">
                <div className="relative w-48 h-48">
                  <Image
                    src={image || "/product.png"}
                    alt={`${product.title} image ${index + 1}`}
                    fill
                    object-scale-down
                    className="rounded-md"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Link>
      <div className="p-4 w-full">
        <Link href={`/${product.slug}`}>
          <h3 className="text-xs text-gray-800 overflow-hidden line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="mt-1 flex">
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
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-gray-600"
        aria-label="Add to favorites"
      >
        {isFavorite ? <Heart fill="red" size={20} /> : <Heart size={20} />}
      </button>
    </div>
  );
};

export default ProductItem;

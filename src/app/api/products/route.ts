import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10"); // Ограничение по умолчанию
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const productId = searchParams.get("productId");
  const category = searchParams.get("category");
  const priceRange = searchParams.get("priceRange");
  const sortOrder = searchParams.get("sortOrder");

  await mongooseConnect();

  // Если указан productId, возвращаем конкретный продукт
  if (productId) {
    const product = await Product.findById(productId).exec();
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  }

  let dbQuery = Product.find();

  // Логика обработки slugs
  if (slug) {
    switch (slug) {
      case "new":
        dbQuery = dbQuery.sort({ createdAt: -1 });
        break;
      case "s-zerkalom":
        dbQuery = dbQuery.where("title").regex(/с зеркалом/i);
        break;
      case "dveri-byudzhet":
        dbQuery = dbQuery.where("price.discountedPrice").lte(30000);
        break;
      case "hity-prodazh":
      case "akciya":
      case "belye-dveri":
      case "dlya-kvartiry":
        const foundCategory = await Category.findOne({ slug }).exec();
        if (foundCategory) {
          dbQuery = dbQuery.where("category").equals(foundCategory._id);
        } else {
          return NextResponse.json(
            { error: `Category for slug ${slug} not found` },
            { status: 404 }
          );
        }
        break;
      case "3-kontura":
        dbQuery = dbQuery.where("contours").regex(/3 контура/i);
        break;
      default:
        // Если slug не попадает ни под один из перечисленных, проверяем каталог или продукт
        const catalog = await Catalog.findOne({ slug }).exec();
        if (catalog) {
          dbQuery = dbQuery.where("catalog").equals(catalog._id);
        } else {
          const product = await Product.findOne({ slug }).exec();
          if (product) {
            return NextResponse.json(product);
          }
          return NextResponse.json(
            { error: "Catalog not found" },
            { status: 404 }
          );
        }
        break;
    }
  }

  // Фильтрация по catalogId, category, и priceRange
  if (catalogId) {
    dbQuery = dbQuery.where("catalog").equals(catalogId);
  }

  if (category) {
    dbQuery = dbQuery.where("category").equals(category);
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split(",").map(Number);
    dbQuery = dbQuery
      .where("price.discountedPrice")
      .gte(minPrice)
      .lte(maxPrice);
  }

  // Сортировка
  if (sortOrder) {
    const sortOptions: { [key: string]: any } = {
      "price-asc": { "price.discountedPrice": 1 },
      "price-desc": { "price.discountedPrice": -1 },
      rating: { rating: -1 },
    };
    dbQuery = dbQuery.sort(sortOptions[sortOrder] || { _id: -1 });
  } else {
    dbQuery = dbQuery.sort({ _id: -1 });
  }

  // Пагинация
  dbQuery = dbQuery.limit(limit).skip(skip);

  // Получение данных и подсчет общего количества продуктов
  const [products, totalCount] = await Promise.all([
    dbQuery.exec(),
    Product.countDocuments(dbQuery.getQuery()).exec(),
  ]);

  return NextResponse.json({ products, totalCount });
}

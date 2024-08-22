import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "12");
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const productId = searchParams.get("productId");
  const category = searchParams.get("category");
  const priceRange = searchParams.get("priceRange");
  const sortOrder = searchParams.get("sortOrder");
  const randomize = searchParams.get("randomize") === "true"; // Опция для рандомизации

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

  let matchConditions: any = {};

  // Логика обработки slugs и фильтров
  if (slug) {
    switch (slug) {
      case "new":
        matchConditions = { ...matchConditions, createdAt: { $exists: true } };
        break;
      case "s-zerkalom":
        matchConditions = { ...matchConditions, title: /с зеркалом/i };
        break;
      case "dveri-byudzhet":
        matchConditions = {
          ...matchConditions,
          "price.discountedPrice": { $lte: 30000 },
        };
        break;
      case "hity-prodazh":
      case "akciya":
      case "belye-dveri":
      case "dlya-kvartiry":
        const foundCategory = await Category.findOne({ slug }).exec();
        if (foundCategory) {
          matchConditions = { ...matchConditions, category: foundCategory._id };
        } else {
          return NextResponse.json(
            { error: `Category for slug ${slug} not found` },
            { status: 404 }
          );
        }
        break;
      case "3-kontura":
        matchConditions = { ...matchConditions, contours: /3 контура/i };
        break;
      default:
        // Если slug не попадает ни под один из перечисленных, проверяем каталог или продукт
        const catalog = await Catalog.findOne({ slug }).exec();
        if (catalog) {
          matchConditions = { ...matchConditions, catalog: catalog._id };
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
    matchConditions = { ...matchConditions, catalog: catalogId };
  }

  if (category) {
    matchConditions = { ...matchConditions, category };
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split(",").map(Number);
    matchConditions = {
      ...matchConditions,
      "price.discountedPrice": { $gte: minPrice, $lte: maxPrice },
    };
  }

  let products;
  let totalCount;

  if (randomize) {
    // Используем $sample для случайного выбора продуктов
    products = await Product.aggregate([
      { $match: matchConditions },
      { $sample: { size: limit } },
    ]);

    // Подсчитываем общее количество подходящих продуктов
    totalCount = await Product.countDocuments(matchConditions);
  } else {
    let dbQuery = Product.find(matchConditions);

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

    // Лимит и получение продуктов
    dbQuery = dbQuery.limit(limit);

    products = await dbQuery.exec();
    totalCount = await Product.countDocuments(matchConditions);
  }

  return NextResponse.json({ products, totalCount });
}

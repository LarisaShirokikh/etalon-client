import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const categoryId = searchParams.get("categoryId");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = parseInt(searchParams.get("skip") || "0");

  await mongooseConnect();

  let response;

  // Если предоставлен catalogId, возвращаем конкретный каталог
  if (catalogId) {
    response = await Catalog.findById(catalogId).exec();
    if (response) {
      return NextResponse.json(response);
    }
  }

  // Если предоставлен slug, ищем соответствующий каталог или категорию
  if (slug) {
    const [category, catalog] = await Promise.all([
      Category.findOne({ slug }).exec(),
      Catalog.findOne({ slug }).exec(),
    ]);

    if (catalog) {
      return NextResponse.json(catalog);
    }

    if (category) {
      const catalogs = await Catalog.find({ parents: category._id })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip)
        .exec();

      const totalCount = await Catalog.countDocuments({
        parents: category._id,
      }).exec();

      return NextResponse.json({ catalogs, totalCount });
    }
  }

  // Основной запрос на получение каталогов с возможной фильтрацией по categoryId
  const query = categoryId ? { parents: categoryId } : {};
  const catalogs = await Catalog.find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .skip(skip)
    .exec();

  const totalCount = await Catalog.countDocuments(query).exec();
  return NextResponse.json({ catalogs, totalCount });
}

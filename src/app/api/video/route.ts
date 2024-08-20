import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Video } from "@/models/ProductVideo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const catalogIdVideo = searchParams.get("catalogIdVideo");
  const catalogId = searchParams.get("catalogId");
  const productId = searchParams.get("productId");
  const limit = parseInt(searchParams.get("limit") || "10"); // Устанавливаем лимит на количество возвращаемых элементов
  const skip = parseInt(searchParams.get("skip") || "0");

  await mongooseConnect();

  // Если предоставлен productId, ищем видео по этому идентификатору
  if (productId) {
    const product = await Video.findById(productId).exec();
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  }

  // Если предоставлен slug, ищем видео или каталог по этому slug
  if (slug) {
    // Проверяем, является ли slug видео
    const product = await Video.findOne({ slug }).exec();
    if (product) {
      return NextResponse.json(product);
    }

    // Если видео не найдено, ищем каталог по slug
    const catalog = await Catalog.findOne({ slug }).exec();
    if (catalog) {
      let dbQuery = Video.find().where("catalog").equals(catalog._id);

      // Если предоставлен catalogIdVideo, фильтруем по нему
      if (catalogIdVideo) {
        dbQuery = dbQuery.where("catalog").equals(catalogIdVideo);
      }

      const products = await dbQuery
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip)
        .exec();

      const totalCount = await Video.countDocuments(dbQuery.getQuery()).exec();
      return NextResponse.json({ products, totalCount });
    } else {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
  }

  // Если предоставлен catalogId, фильтруем видео по каталогу
  if (catalogId) {
    const dbQuery = Video.find()
      .where("catalog")
      .equals(catalogId)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
    const products = await dbQuery.exec();

    const totalCount = await Video.countDocuments(dbQuery.getQuery()).exec();
    return NextResponse.json({ products, totalCount });
  }

  // Возвращаем все видео, если нет фильтрации
  const dbQuery = Video.find().sort({ _id: -1 }).limit(limit).skip(skip);
  const products = await dbQuery.exec();

  const totalCount = await Video.countDocuments().exec();

  return NextResponse.json({ products, totalCount });
}

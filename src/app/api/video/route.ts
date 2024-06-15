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
  // const limit = parseInt(searchParams.get("limit"));
  const skip = parseInt(searchParams.get("skip") || "0");

  await mongooseConnect();

  // Если предоставлен productId, ищем продукт по этому идентификатору
  if (productId) {
    const product = await Video.findById(productId).exec();
    if (product) {
      return NextResponse.json(product);
    }
  }

  if (slug) {
    // Проверяем, является ли slug продуктом
    const product = await Video.findOne({ slug }).exec();
    if (product) {
      return NextResponse.json(product);
    }

    // Если продукт не найден, ищем каталог по slug
    const catalog = await Catalog.findOne({ slug }).exec();

    if (catalog) {
      let dbQuery = Video.find().where("catalog").equals(catalog._id);

      // Если предоставлен catalogId, добавляем его в запрос
      if (catalogIdVideo) {
        dbQuery = dbQuery.where("catalog").equals(catalogId);
      }

      const products = await dbQuery
        .sort({ _id: -1 })
        // .limit(limit)
        .skip(skip)
        .exec();

      const totalCount = await Video.countDocuments()
        .where("catalog")
        .equals(catalog._id)
        .exec();
      return NextResponse.json({ products, totalCount });
    }
  }

  // Если catalogId предоставлен, фильтруем продукты по нему
  if (catalogId) {
    const dbQuery = Video.find()
      .where("catalog")
      .equals(catalogId)
      .sort({ _id: -1 })
      // .limit(limit)
      .skip(skip);
    const products = await dbQuery.exec();

    const totalCount = await Video.countDocuments()
      .where("catalog")
      .equals(catalogId)
      .exec();
    return NextResponse.json({ products, totalCount });
  }

  // Возвращаем все продукты без фильтрации по каталогу
  const dbQuery = Video.find().sort({ _id: -1 }).skip(skip);
  const products = await dbQuery.exec();

  const totalCount = await Video.countDocuments().exec();

  return NextResponse.json({ products, totalCount });
}
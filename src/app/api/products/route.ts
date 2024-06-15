import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "24");
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const productId = searchParams.get("productId");
  const page = parseInt(searchParams.get("skip") || "0");

  await mongooseConnect();

  // Если предоставлен productId, ищем продукт по этому идентификатору
  if (productId) {
    const product = await Product.findById(productId).exec();
    if (product) {
      return NextResponse.json(product);
    }
  }

  if (slug) {
    // Проверяем, является ли slug продуктом
    const product = await Product.findOne({ slug }).exec();
    if (product) {
      return NextResponse.json(product);
    }

    // Если продукт не найден, ищем каталог по slug
    const catalog = await Catalog.findOne({ slug }).exec();

    if (catalog) {
      let dbQuery = Product.find().where("catalog").equals(catalog._id);

      // Если предоставлен catalogId, добавляем его в запрос
      if (catalogId) {
        dbQuery = dbQuery.where("catalog").equals(catalogId);
      }

      const products = await dbQuery
        .sort({ _id: -1 })
        .limit(limit)
        .skip(page)
        .exec();

      const totalCount = await Product.countDocuments()
        .where("catalog")
        .equals(catalog._id)
        .exec();
      return NextResponse.json({ products, totalCount });
    }
  }

  // Если catalogId предоставлен, фильтруем продукты по нему
  if (catalogId) {
    const dbQuery = Product.find()
      .where("catalog")
      .equals(catalogId)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(page);
    const products = await dbQuery.exec();

    const totalCount = await Product.countDocuments()
      .where("catalog")
      .equals(catalogId)
      .exec();
    return NextResponse.json({ products, totalCount });
  }

  // Возвращаем все продукты без фильтрации по каталогу
  const dbQuery = Product.find().sort({ _id: -1 }).skip(page);
  const products = await dbQuery.exec();

  const totalCount = await Product.countDocuments().exec();

  return NextResponse.json({ products, totalCount });
}

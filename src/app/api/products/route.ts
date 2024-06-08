import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = parseInt(searchParams.get("skip") || "0");

  await mongooseConnect();

  if (slug) {
    // Проверяем, является ли slug продуктом
    const product = await Product.findOne({ slug }).exec();
    if (product) {
      return NextResponse.json(product);
    }

    // Если продукт не найден, ищем каталог по slug
    const catalog = await Catalog.findOne({ slug }).exec();

    if (catalog) {
      const dbQuery = Product.find()
        .where("catalog")
        .equals(catalog._id)
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip);
      const products = await dbQuery.exec();

      const totalCount = await Product.countDocuments()
        .where("catalog")
        .equals(catalog._id)
        .exec();
      return NextResponse.json({ products, totalCount });
    }

  }
  const dbQuery = Product.find().sort({ _id: -1 }).limit(limit).skip(skip);
  const products = await dbQuery.exec();

  const totalCount = await Product.countDocuments().exec();
  
  return NextResponse.json({ products, totalCount });

}

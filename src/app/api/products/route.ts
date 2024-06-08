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
  let catalog;

  if (slug) {
    catalog = await Catalog.findOne({ slug }).exec();
  }

  const dbQuery = Product.find();

  if (catalog) {
    // Если найдена категория, фильтруем каталоги по ее categoryId
    dbQuery.where("catalog").equals(catalog._id);
  }

  dbQuery.sort({ _id: -1 });
  dbQuery.limit(limit).skip(skip);

  const products = await dbQuery.exec();
  const totalCount = await Product.countDocuments().exec();

  return NextResponse.json({ products, totalCount });
}

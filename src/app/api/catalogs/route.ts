import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const categoryId = searchParams.get("categoryId");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = parseInt(searchParams.get("skip") || "0");

  await mongooseConnect();

  // Находим категорию по slug
  let category;
  if (slug) {
    category = await Category.findOne({ slug }).exec();
  }

  const dbQuery = Catalog.find();

  if (categoryId) {
    dbQuery.where("parents").equals(categoryId);
  }

  if (category) {
    // Если найдена категория, фильтруем каталоги по ее categoryId
    dbQuery.where("parents").equals(category._id);
  }

  dbQuery.sort({ _id: -1 });
  dbQuery.limit(limit).skip(skip);

  const catalogs = await dbQuery.exec();
  const totalCount = await Catalog.countDocuments().exec();
  return NextResponse.json({ catalogs, totalCount });
}

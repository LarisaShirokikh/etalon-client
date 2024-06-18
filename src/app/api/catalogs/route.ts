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

  console.log("catalogs api", slug);

  if (catalogId) {
    const catalog = await Catalog.findById(catalogId).exec();
    if (catalog) {
      return NextResponse.json(catalog);
    }
  }

  let category;
  let catalog;
  if (slug) {
    category = await Category.findOne({ slug }).exec();
    // if (category) {
    //   return NextResponse.json(category);
    // }
    catalog = await Catalog.findOne({ slug }).exec();
    if(catalog) {
      return NextResponse.json(catalog);
    }
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

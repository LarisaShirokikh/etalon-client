import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/")[3];
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");
  await mongooseConnect();

  console.log('slug', slug)
  const category = await Category.findOne({ slug: slug });

  if (!category) {
    return new NextResponse(`Category not found for slug: ${slug}`, {
      status: 404,
    });
  }

  const catalogs = await Catalog.find({ parents: category._id })
    .sort({ _id: -1 })
    .limit(limit)
    .skip(page * limit)
    .exec();

  const totalCount = await Catalog.countDocuments().exec();

  return NextResponse.json({ catalogs, totalCount });
}

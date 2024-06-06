import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  console.log("API request params:", { catalogId, limit, page });

  const dbQuery = Product.find();

  if (slug) {
    console.log("API slug:", { slug });
    dbQuery.where("slug").equals(slug);
  }


dbQuery.sort({ _id: -1 });
  dbQuery.limit(limit).skip(page * limit);

  const products = await dbQuery.exec();
  const totalCount = await Product.countDocuments().exec();
  console.log("Products found:", products.length);

  return NextResponse.json({ products, totalCount });
}

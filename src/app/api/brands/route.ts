import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Brand } from "@/models/Brand";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const brandId = searchParams.get("brandId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  console.log("API request params:", { brandId, limit, page });

  const dbQuery = Brand.find();
  dbQuery.limit(limit).skip(page * limit);

  const brands = await dbQuery.exec();
  console.log("brands found:", brands.length);

  return NextResponse.json(brands);
}
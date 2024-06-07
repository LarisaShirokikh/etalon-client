import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Brand } from "@/models/Brand";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const brandId = searchParams.get("brandId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  const dbQuery = Brand.find();
  dbQuery.limit(limit).skip(page * limit);

  const brands = await dbQuery.exec();

  return NextResponse.json(brands);
}
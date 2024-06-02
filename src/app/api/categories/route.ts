import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  console.log("API request params:", { categoryId, limit, page });

  const dbQuery = Category.find();
  dbQuery.limit(limit).skip(page * limit);

  const categories = await dbQuery.exec();
  console.log("Category found:", categories.length);

  return NextResponse.json(categories);
}
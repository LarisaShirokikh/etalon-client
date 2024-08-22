import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  const dbQuery = Category.find()
    .limit(limit)
    .skip(page * limit);

  const categories = await dbQuery.exec();

  return NextResponse.json({ categories });
}

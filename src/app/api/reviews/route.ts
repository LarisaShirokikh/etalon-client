import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reviewId = searchParams.get("reviewId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  //console.log("API request params:", { catalogId, limit, page });

  const dbQuery = Review.find();
  dbQuery.limit(limit).skip(page * limit);

  const catalogs = await dbQuery.exec();

  return NextResponse.json(catalogs);
}

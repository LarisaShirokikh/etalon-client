import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const catalogId = searchParams.get("catalogId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  console.log("API request params:", { catalogId, limit, page });

  const dbQuery = Catalog.find();
  dbQuery.limit(limit).skip(page * limit);

  const catalogs = await dbQuery.exec();
  console.log("Catalog found:", catalogs.length);

  return NextResponse.json(catalogs);
}

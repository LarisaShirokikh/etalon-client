import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { ObjectId } from "mongodb";
import { Product } from "@/models/Product";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { pathname } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const catalogId = searchParams.get("catalogId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  // console.log("API request params:", { categoryId, limit, page });

  const dbQuery = Catalog.find(
    categoryId ? { parents: new ObjectId(categoryId) } : {}
  );
  dbQuery.limit(limit).skip(page * limit);

  const catalogs = await dbQuery.exec();
  // console.log("Catalog found:", catalogs.length);

  return NextResponse.json(catalogs);
}


import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const limit = parseInt(searchParams.get("limit") || "4");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  console.log("API request params:", { catalogId, limit, page });

  const dbQuery = Product.find();

  if (slug) {
    console.log("API slug:", { slug });
    dbQuery.where("slug").equals(slug);
  }

  // if (searchParams.has("name")) {
  //   dbQuery
  //     .where("name")
  //     .regex(new RegExp(searchParams.get("name") as string, "i"));
  // }

  // if (catalogId) {

  //   dbQuery.where("catalog").equals(catalogId);
  // }

  // if (searchParams.has("type")) {
  //   dbQuery
  //     .where("productType")
  //     .in((searchParams.get("type") as string).split(","));
  // } else {
  //   dbQuery.where("productType").in(["physical", "digital"]);
  // }

  // if (searchParams.has("min")) {
  //   dbQuery.where("priceData.price").gte(Number(searchParams.get("min")));
  // }

  // if (searchParams.has("max")) {
  //   dbQuery.where("priceData.price").lte(Number(searchParams.get("max")));
  // }

  // if (searchParams.has("sort")) {
  //   const [sortType, sortBy] = (searchParams.get("sort") as string).split(" ");
  //   dbQuery.sort({ [sortBy]: sortType === "asc" ? 1 : -1 });
  // }

  dbQuery.limit(limit).skip(page * limit);

  const products = await dbQuery.exec();
  console.log("Products found:", products.length);

  return NextResponse.json(products);
}

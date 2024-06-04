// api/brands/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Catalog } from "@/models/Catalog";
import { ObjectId } from "mongodb";
import { Brand } from "@/models/Brand";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/")[3];
  const catalogId = searchParams.get("catalogId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  console.log("API request params:", { slug, limit, page });
  try {
    // Проверяем, есть ли каталог с указанным идентификатором
    const brand = await Brand.findOne({ slug: slug });
    console.log("Brand found:", brand);

    if (!brand) {
      console.log("brand not found for slug:", slug);
      return new NextResponse(`brand not found for slug: ${slug}`, {
        status: 404,
      });
    }

    const brandId = brand._id;
    console.log("brand brandId:", brandId);
    // Находим все каталоги, связанные с каталогом
    const catalogs = await Catalog.find(brand._id ? { brand: brand._id } : {})
      .sort({ _id: -1 })
      .limit(limit)
      .skip(page * limit)
      .exec();

    console.log("Products found for catalog:", catalogs.length);

    return NextResponse.json(catalogs);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
}

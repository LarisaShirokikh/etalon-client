// api/catalogs/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Catalog } from "@/models/Catalog";
import { ObjectId } from "mongodb";

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
    const catalog = await Catalog.findOne({ slug: slug });
    //console.log("Catalog found catalog catalog:", catalog);

    if (!catalog) {
      console.log("Catalog not found for slug:", slug);
      return new NextResponse(`Catalog not found for slug: ${slug}`, {
        status: 404,
      });
    }

    const catalogId = catalog._id;
    //console.log("Catalog catalogId:", catalogId);
    // Находим все продукты, связанные с каталогом
    const products = await Product.find(
      catalog._id ? { catalog: catalog._id } : {}
    )
      .limit(limit)
      .skip(page * limit)
      .exec();

    //console.log("Products found for catalog:", products.length);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
}

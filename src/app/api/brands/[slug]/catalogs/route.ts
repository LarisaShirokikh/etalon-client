// api/brands/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Brand } from "@/models/Brand";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/")[3];
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();
  try {
    const brand = await Brand.findOne({ slug: slug });

    if (!brand) {
      return new NextResponse(`brand not found for slug: ${slug}`, {
        status: 404,
      });
    }

    const brandId = brand._id;
    const catalogs = await Catalog.find(brand._id ? { brand: brand._id } : {})
      .sort({ _id: -1 })
      .limit(limit)
      .skip(page * limit)
      .exec();

    

    return NextResponse.json(catalogs);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
}

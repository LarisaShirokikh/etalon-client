import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Catalog } from "@/models/Catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/")[3];
  const limit = parseInt(searchParams.get("limit") || "20");
  const page = parseInt(searchParams.get("page") || "0");

  await mongooseConnect();

  try {
    // Поиск каталога по slug
    const catalog = await Catalog.findOne({ slug }).exec();
    if (!catalog) {
      return new NextResponse(`Catalog not found for slug: ${slug}`, {
        status: 404,
      });
    }

    // Получение продуктов по catalogId с фильтрацией и пагинацией
    const products = await Product.find({ catalog: catalog._id })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(page * limit)
      .exec();

    // Подсчёт общего количества продуктов в этом каталоге
    const totalCount = await Product.countDocuments({
      catalog: catalog._id,
    }).exec();

    return NextResponse.json({ products, totalCount });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  await mongooseConnect();

  let products = [];
  let catalogs = [];
  let categories = [];
  if (name) {
    // Поиск в продуктах
    products = await Product.find({
      title: { $regex: name, $options: "i" },
    }).exec();

    // Если нет результатов, ищем в категориях

    categories = await Category.find({
      name: { $regex: name, $options: "i" },
    }).exec();

    catalogs = await Catalog.find({
      name: { $regex: name, $options: "i" },
    }).exec();
  }

  return NextResponse.json({ products, categories, catalogs });
}

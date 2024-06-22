import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "24");
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const productId = searchParams.get("productId");
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  await mongooseConnect();

  if (productId) {
    const product = await Product.findById(productId).exec();
    if (product) {
      return NextResponse.json(product);
    }
  }

  if (slug) {
    const product = await Product.findOne({ slug }).exec();
    if (product) {
      return NextResponse.json(product);
    }

    const catalog = await Catalog.findOne({ slug }).exec();

    if (catalog) {
      let dbQuery = Product.find().where("catalog").equals(catalog._id);

      if (catalogId) {
        dbQuery = dbQuery.where("catalog").equals(catalogId);
      }

      dbQuery = dbQuery.sort({ _id: -1 }).limit(limit).skip(skip);

      const products = await dbQuery.exec();
      const totalCount = await Product.countDocuments()
        .where("catalog")
        .equals(catalog._id)
        .exec();
      return NextResponse.json({ products, totalCount });
    }
  }

  if (catalogId) {
    const dbQuery = Product.find()
      .where("catalog")
      .equals(catalogId)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
    const products = await dbQuery.exec();
    const totalCount = await Product.countDocuments()
      .where("catalog")
      .equals(catalogId)
      .exec();
    return NextResponse.json({ products, totalCount });
  }

  let dbQuery = Product.find().sort({ _id: -1 }).limit(limit).skip(skip);
  const products = await dbQuery.exec();
  const totalCount = await Product.countDocuments().exec();

  return NextResponse.json({ products, totalCount });
}

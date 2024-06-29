import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { Category } from "@/models/Category";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "24");
  const slug = searchParams.get("slug");
  const catalogId = searchParams.get("catalogId");
  const productId = searchParams.get("productId");
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;
  const category = searchParams.get("category");
  const priceRange = searchParams.get("priceRange");
  const sortOrder = searchParams.get("sortOrder");

  await mongooseConnect();

  if (productId) {
    const product = await Product.findById(productId).exec();
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  }

  let dbQuery = Product.find();

  switch (slug) {
    case "s-zerkalom":
      dbQuery = dbQuery.where("title").regex(/с зеркалом/i);
      break;
    case "dveri-byudzhet":
      dbQuery = dbQuery.where("price.discountedPrice").lte(40000);
      break;
    case "hity-prodazh":
    case "akciya":
    case "belye-dveri":
    case "dlya-kvartiry":
      const category = await Category.findOne({ slug }).exec();
      if (category) {
        dbQuery = dbQuery.where("category").in([category._id]);
      } else {
        return NextResponse.json(
          { error: `Category for slug ${slug} not found` },
          { status: 404 }
        );
      }
      break;
    case "3-kontura":
      dbQuery = dbQuery.where("contours").regex(/3 контура/i);
      break;
    default:
      if (slug) {
        const catalog = await Catalog.findOne({ slug }).exec();
        if (catalog) {
          dbQuery = dbQuery.where("catalog").equals(catalog._id);
        } else {
          const product = await Product.findOne({ slug }).exec();
          if (product) {
            return NextResponse.json(product);
          }
          return NextResponse.json(
            { error: "Catalog not found" },
            { status: 404 }
          );
        }
      }
      break;
  }

  if (catalogId) {
    dbQuery = dbQuery.where("catalog").equals(catalogId);
  }

  if (category) {
    dbQuery = dbQuery.where("category").equals(category);
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split(",").map(Number);
    dbQuery = dbQuery
      .where("price.discountedPrice")
      .gte(minPrice)
      .lte(maxPrice);
  }

  // Count total documents after filtering
  const totalCount = await Product.countDocuments(dbQuery.getQuery()).exec();

  // Apply sorting and pagination
  if (sortOrder) {
    if (sortOrder === "price-asc") {
      dbQuery = dbQuery.sort({ "price.discountedPrice": 1 });
    } else if (sortOrder === "price-desc") {
      dbQuery = dbQuery.sort({ "price.discountedPrice": -1 });
    } else if (sortOrder === "rating") {
      dbQuery = dbQuery.sort({ rating: -1 });
    }
  } else {
    dbQuery = dbQuery.sort({ _id: -1 });
  }

  dbQuery = dbQuery.limit(limit).skip(skip);
  const products = await dbQuery.exec();

  return NextResponse.json({ products, totalCount });
}

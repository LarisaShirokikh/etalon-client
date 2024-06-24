import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Catalog } from "@/models/Catalog";
import { UserFavorites } from "@/models/UserFavorites";

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
  const userName = searchParams.get("name");

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

  if (slug) {
    const product = await Product.findOne({ slug }).exec();
    if (product) {
      return NextResponse.json(product);
    }

    const catalog = await Catalog.findOne({ slug }).exec();
    if (catalog) {
      dbQuery = dbQuery.where("catalog").equals(catalog._id);
    } else {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
  }

  if (catalogId) {
    dbQuery = dbQuery.where("catalog").equals(catalogId);
  }

  if (category) {
    dbQuery = dbQuery.where("category").equals(category);
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split(",").map(Number);
    dbQuery = dbQuery.where("price.discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (userName) {
    // Fetch the user favorites by userName and use the productIds to filter products
    const userFavorites = await UserFavorites.findOne({ userName }).exec();
    if (userFavorites) {
      dbQuery = dbQuery.where("_id").in(userFavorites.productIds);
    } else {
      return NextResponse.json(
        { error: "User favorites not found" },
        { status: 404 }
      );
    }
  }

  if (sortOrder) {
    if (sortOrder === "price-asc") {
      dbQuery = dbQuery.sort({ "price.discountedPrice": 1 });
    } else if (sortOrder === "price-desc") {
      dbQuery = dbQuery.sort({ "price.discountedPrice": -1 });
    } else if (sortOrder === "rating") {
      dbQuery = dbQuery.sort({ "price.discountedPrice": -1 });
    }
  } else {
    dbQuery = dbQuery.sort({ _id: -1 });
  }

  dbQuery = dbQuery.limit(limit).skip(skip);
  const products = await dbQuery.exec();

  // Count documents based on the same query parameters
  const totalCount = await Product.countDocuments(dbQuery.getQuery()).exec();

  return NextResponse.json({ products, totalCount });
}

import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export async function GET(request: NextRequest) {
  await mongooseConnect();

  try {
    const totalCount = await Product.countDocuments().exec();
    return NextResponse.json({ totalCount });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product count" },
      { status: 500 }
    );
  }
}

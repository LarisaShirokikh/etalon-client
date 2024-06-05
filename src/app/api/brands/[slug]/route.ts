import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Brand } from "@/models/Brand";

export async function GET(request: NextRequest) {
  await mongooseConnect();

  const { pathname } = new URL(request.url);
  const slug = pathname.split("/").pop();
  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }

  try {
    const brand = await Brand.findOne({ slug });
    if (!brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

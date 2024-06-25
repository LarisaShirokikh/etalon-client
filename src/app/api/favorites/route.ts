import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { UserFavorites } from "@/models/UserFavorites";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const name = searchParams.get("name");

  if (!productId || !name) {
    return NextResponse.json(
      { error: "Missing productId or name" },
      { status: 400 }
    );
  }

  await mongooseConnect();

  try {
    const favorite = await UserFavorites.findOne({ productId, name });
    return NextResponse.json({ isFavorite: !!favorite });
  } catch (error) {
    return NextResponse.json( { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { productId, name, action } = await request.json();

  if (!productId || !name || !action) {
    return NextResponse.json(
      { error: "Missing productId, name, or action" },
      { status: 400 }
    );
  }

  await mongooseConnect();

  try {
    if (action === "add") {
      const favorite = await UserFavorites.findOne({ productId, name });

      if (favorite) {
        return NextResponse.json({ message: "Already in favorites" });
      }

      const newFavorite = new UserFavorites({ productId, name });
      await newFavorite.save();

      return NextResponse.json({ message: "Added to favorites" });
    } else if (action === "remove") {
      const favorite = await UserFavorites.findOneAndDelete({
        productId,
        name,
      });

      if (!favorite) {
        return NextResponse.json({ message: "Not found in favorites" });
      }

      return NextResponse.json({ message: "Removed from favorites" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json( { status: 500 });
  }
}

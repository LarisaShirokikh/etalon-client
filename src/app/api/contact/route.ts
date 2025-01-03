// api/contact.ts
import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order"; 

export async function POST(request: NextRequest) {
  const { name, phone, address, contactMethod, isAgreed, items } =
    await request.json();

  try {
    await mongooseConnect();
    const newOrder = new Order({
      name,
      phone,
      address,
      contactMethod,
      isAgreed,
      items,
    });


    await newOrder.save();
    return NextResponse.json({
      success: true,
      message: "Данные успешно получены и сохранены.",
    });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { success: false, message: "Произошла ошибка при сохранении данных." },
      { status: 500 }
    );
  }
}

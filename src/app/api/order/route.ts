// api/order.ts
import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export async function POST(request: NextRequest) {
  const {
    name,
    phone,
    address,
    contactMethod,
    isAgreed,
    items,
    needMeasurement,
  } = await request.json();

  try {
    await mongooseConnect(); // Connect to MongoDB
    const newOrder = new Order({
      name,
      phone,
      address,
      contactMethod,
      isAgreed,
      items,
      needMeasurement,
    });

    await newOrder.save(); // Save the new order document
    return NextResponse.json({
      success: true,
      message: "Данные успешно получены и сохранены.",
    });
  } catch (error) {
    console.error("Ошибка при сохранении заказа:", error);
    return NextResponse.json(
      { success: false, message: "Произошла ошибка при сохранении данных." },
      { status: 500 }
    );
  }
}

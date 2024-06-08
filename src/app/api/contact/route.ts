// api/contact.ts
import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { ContactForm } from "@/models/ContactForm"; // Подставьте соответствующую модель

export async function POST(request: NextRequest) {
  const { name, phone, address, contactMethod, isAgreed } =
    await request.json();

  try {
    await mongooseConnect();
    // Создайте новый объект Contact и сохраните его в базу данных
    const newContact = new ContactForm({
      name,
      phone,
      address,
      contactMethod,
      isAgreed,
    });

    console.log("newContact", newContact);

    await newContact.save();
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

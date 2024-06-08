// models/ContactForm.ts

import mongoose, { model, Schema, models } from "mongoose";

// Определяем интерфейс для модели данных контактной формы
interface IContactForm extends Document {
  name: string;
  phone: string;
  address: string;
  contactMethod: string;
  isAgreed: boolean;
}

// Определяем схему модели
const ContactFormSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  contactMethod: { type: String, required: true },
  isAgreed: { type: Boolean, required: true },
});
export const ContactForm =
  models?.ContactForm || model("ContactForm", ContactFormSchema);
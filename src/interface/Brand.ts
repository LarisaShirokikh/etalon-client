import { Document, Model, Schema } from "mongoose";

// Определяем интерфейс для категории
interface IBrand extends Document {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
}

// Определяем интерфейс для модели категории
interface BrandModel extends Model<IBrand> {}

// Экспортируем интерфейсы
export type { IBrand, BrandModel };

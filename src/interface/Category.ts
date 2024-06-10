import { Document, Model, Schema } from "mongoose";

// Определяем интерфейс для свойств категории
interface CategoryProperties {
  // Описываем свойства, если это возможно
}

// Определяем интерфейс для категории
interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  url?: string;
  images?: string[];
  properties?: CategoryProperties[];
  
}

// Определяем интерфейс для модели категории
interface CategoryModel extends Model<ICategory> {}

// Экспортируем интерфейсы
export type { ICategory, CategoryModel };

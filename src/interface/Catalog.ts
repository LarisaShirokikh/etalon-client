import { Document, Model, Types } from "mongoose";

// Интерфейс для каталога
interface ICatalog extends Document {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  images?: string[];
  parents?: Types.ObjectId[];
  properties?: object[];
  slug: string;
}

// Интерфейс для модели каталога
interface CatalogModel extends Model<ICatalog> {}
export type { ICatalog, CatalogModel };

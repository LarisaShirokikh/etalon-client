import { Document, Model, Types } from "mongoose";

// Интерфейс для свойств цены
interface PriceProperties {
  price: number;
  discountedPrice: number;
}

// Интерфейс для продукта
interface IProduct extends Document {
  _id: string;
  title: string;
  description?: string;
  price: PriceProperties;
  images: string[];
  catalog: Types.ObjectId;
  design?: string;
  contours?: string;
  insulation?: string;
  thickness?: string;
  mainLock?: string;
  additionalLock?: string;
  exterior?: string;
  interior?: string;
  loops?: string;
  protection?: string;
  slug: string
}

// Интерфейс для модели продукта
interface ProductModel extends Model<IProduct> {}
export type { IProduct, ProductModel };

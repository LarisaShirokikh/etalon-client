import { Document, Model, Types } from "mongoose";

// Интерфейс для свойств цены
interface PriceProperties {
  price: number;
  discountedPrice: number;
}

// Общий интерфейс для продукта
interface IProduct extends Document {
  _id: string;
  
  title: string;
  description?: string;
  price: PriceProperties;
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
  slug: string;
  images?: string[]; // Поле images добавлено, чтобы включить его из интерфейса IProduct
  video?: string[]; // Поле video добавлено, чтобы включить его из интерфейса IProductVideo
}

// Интерфейс для модели продукта
interface ProductModel extends Model<IProduct> {}

export type { IProduct, ProductModel };

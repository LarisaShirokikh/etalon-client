import { model, models, Schema } from "mongoose";

const BrandSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  images: [{ type: String }]
});

export const Brand = models?.Brand || model("Brand", BrandSchema);

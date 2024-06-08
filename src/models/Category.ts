import  { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  images: [{ type: String }],
  properties: [{ type: Object }],
});

export const Category = models?.Category || model("Category", CategorySchema);

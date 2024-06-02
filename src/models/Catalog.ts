import mongoose, { model, models, Schema } from "mongoose";

const CatalogSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number },
  images: [{ type: String }],
  parents: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
  properties: [{ type: Object }],
});

export const Catalog = models?.Catalog || model("Catalog", CatalogSchema);


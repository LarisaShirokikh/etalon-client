import mongoose, { model, Schema, models } from "mongoose";

const PriceSchema = new Schema({
  price: { type: Number },
  discountedPrice: { type: Number, required: true },
});

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: PriceSchema, required: true }, // Price as a nested schema
    images: [{ type: String }],
    catalog: { type: mongoose.Types.ObjectId, ref: "Catalog" },
    design: { type: String },
    contours: { type: String },
    insulation: { type: String },
    thickness: { type: String },
    mainLock: { type: String },
    additionalLock: { type: String },
    exterior: { type: String },
    interior: { type: String },
    loops: { type: String },
    protection: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);

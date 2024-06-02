import mongoose, { Schema, model, models } from "mongoose";

const MediaSchema = new Schema({
  url: { type: String, required: true },
});

const CustomerSchema = new Schema({
  display_name: { type: String, required: true },
  avatar_url: { type: String, required: true },
});

const ReviewSchema = new Schema(
  {
    customer: { type: CustomerSchema, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    heading: { type: String },
    body: { type: String },
    media: [MediaSchema],
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

export const Review = models.Review || model("Review", ReviewSchema);

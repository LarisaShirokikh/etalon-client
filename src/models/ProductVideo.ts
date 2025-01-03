import mongoose, { model, Schema, models } from "mongoose";

const PriceSchema = new Schema({
  price: { type: Number },
  discountedPrice: { type: Number, required: true },
});

const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: String,
    description: String,
    price: { type: PriceSchema, required: true }, 
    video: [{ type: String }],
    catalog: { type: mongoose.Schema.Types.ObjectId, ref: "Catalog" },
    parents: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
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
    quantity: { type: Number }
  },
  {
    timestamps: true,
  }
);

export const Video = models?.Video || model("Video", VideoSchema);

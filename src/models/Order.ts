

import mongoose, { model, Schema, models } from "mongoose";

// Define interface for order data
interface IOrder extends Document {
  name: string;
  phone: string;
  address: string;
  contactMethod: string;
  isAgreed: boolean;
  items: string[]; // Assuming item IDs here
  needMeasurement: boolean;
}

// Define schema for order
const OrderSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  contactMethod: { type: String, required: true },
  isAgreed: { type: Boolean, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Replace 'Product' with your actual product schema
  needMeasurement: { type: Boolean, default: false },
});

// Create or retrieve existing Order model
export const Order = models?.Order || model<IOrder>("Order", OrderSchema);
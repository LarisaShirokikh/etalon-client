// models/UserFavorites.js

import mongoose, { Schema, model, models } from "mongoose";

const UserFavoritesSchema = new Schema({
  userName: { type: String, required: true, unique: true }, // Ensure userName is unique
  productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }], // Reference to Product model
});

// Export the UserFavorites model, or create it if it doesn't already exist
export const UserFavorites =
  models.UserFavorites || model("UserFavorites", UserFavoritesSchema);

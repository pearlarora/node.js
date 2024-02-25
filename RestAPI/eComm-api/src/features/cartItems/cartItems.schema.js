import mongoose from "mongoose";

export const cartItemsSchema = new mongoose.Schema({
  // ProductId is a reference to the id in the products collection
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  quantity: Number,
});

import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  inStock: Number,
  // Establishing one-to-many relationship with the review schema
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  // Establishing one-to-many relationship with the category schema to make it a many-to-many relationship
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

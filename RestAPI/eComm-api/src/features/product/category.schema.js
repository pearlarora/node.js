import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
  name: String,
  // Establishing one-to-many relationship with the products schema to make it a many-to-many relationship
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

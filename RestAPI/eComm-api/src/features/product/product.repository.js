import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { getDB } from "../../config/mongodb.js";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "./product.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (error) {
      console.log(error);
    }
  }

  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    const db = getDB();
    const collection = db.collection(this.collection);
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) filterExpression.price = { $gte: parseFloat(minPrice) };
      if (maxPrice)
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      if (category) filterExpression.category = category;
      return await collection.find(filterExpression).toArray();
    } catch (error) {
      console.log(error);
    }
  }

  async rate(userId, productId, rating) {
    try {
      // Using MongoDB
      // const db = getDB();
      // const collection = db.collection(this.collection);

      // // 1. Removes existing rating (if any)
      // await collection.updateOne(
      //   { _id: new ObjectId(productId) },
      //   { $pull: { ratings: { userId: new ObjectId(userId) } } }
      // );

      // // 2. Add new rating
      // await collection.updateOne(
      //   { _id: new ObjectId(productId) },
      //   { $push: { ratings: { userId: new ObjectId(userId), rating } } }
      // );

      // Using Mongoose : Establishing one-to-many relationship - one product can have multiple reviews/ratings
      // 1. Check if the product exists
      const productToUpdate = await ProductModel.findById(productId);
      if (!productToUpdate) {
        throw new Error("Product not found");
      }

      // 2. Find existing rating by the user
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productId),
        user: new ObjectId(userId),
      });
      if (userReview) {
        userReview.rating = rating;
        console.log(userReview);
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productId),
          user: new ObjectId(userId),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async averagePricePerCategory() {
    const db = getDB();
    try {
      return await db
        .collection(this.collection)
        .aggregate([
          { $group: { _id: "$category", averagePrice: { $avg: "$price" } } },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
    }
  }

  async averageRatingPerProduct() {
    const db = getDB();
    try {
      return await db
        .collection(this.collection)
        .aggregate([
          { $unwind: "$ratings" },
          {
            $group: {
              _id: "$name",
              averageRating: { $avg: "$ratings.rating" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
    }
  }
}

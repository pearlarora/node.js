import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

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
      const db = getDB();
      const collection = db.collection(this.collection);

      // 1. Removes existing rating (if any)
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        { $pull: { ratings: { userId: new ObjectId(userId) } } }
      );

      // 2. Add new rating
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        { $push: { ratings: { userId: new ObjectId(userId), rating } } }
      );
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

import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async get(userId) {
    const db = getDB();
    return await db
      .collection(this.collection)
      .find({ userId: new ObjectId(userId) })
      .project({ quantity: 1 })
      .toArray();
  }

  async add(productId, userId, quantity) {
    const db = getDB();
    const collection = db.collection(this.collection);
    const id = await this.getNextCounter(db);
    try {
      // Find the document - either insert or update
      await collection.updateOne(
        {
          productId: new ObjectId(productId),
          userId: new ObjectId(userId),
        },
        { $setOnInsert: { _id: id }, $inc: { quantity: quantity } },
        { upsert: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async delete(cartItemId, userId) {
    const db = getDB();
    try {
      const result = await db.collection(this.collection).deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
    }
  }

  async getNextCounter(db) {
    const resultDocument = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    return resultDocument.value.value;
  }
}

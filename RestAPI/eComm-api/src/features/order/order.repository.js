import { getDB } from "../../config/mongodb.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    // 1. Get cart items and calculate total amount
    // 2. Create an order record
    // 3. Reduce the stock
    // 4. Clear the cart items
  }

  async getTotalAmount(userId) {
    const db = getDB();
    await db.collection("cartItems").aggregate([
      // 1. Get the cart items for the user
      { $match: { userId: new ObjectId(userId) } },

      //2.
    ]);
  }
}

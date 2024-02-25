import { getDB } from "../../config/mongodb.js";

export default class UserRepository {
  constructor() {
    this.collection = "users";
  }
  async signUp(newUser) {
    // Using database - must be encosed in try/catch as these are asynchronous operations
    try {
      // 1. Get the data from the database
      const db = getDB();

      // 2. Get the collection you want to work with
      const collection = db.collection(this.collection);

      // 3. Insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email) {
    try {
      const db = getDB();
      const collection = db.collection("users");

      // 3. Get the document from the database
      return await collection.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  }
}

import { MongoClient } from "mongodb";

// Letting the client know which database we want to connect to - address of the database
// const url = process.env.DB_URL; // Throws error when using environment variables

let client;
export const connectToMongodb = () => {
  MongoClient.connect(process.env.DB_URL) // This returns a promise therefore we will use .then
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Connected to MongoDB");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => console.log(err));
};

export const getDB = () => {
  return client.db();
};

// Steps to modify _id
// 1. Creating a counter collection - it keeps track of the last _id inserted
// 2. While adding new items, increment the counter and use the counter value as the _id to the document
const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    // Single Field Index
    await db.collection("products").createIndex({ price: 1 });
    // Compound Index
    await db.collection("products").createIndex({ name: 1, category: -1 });
    // Text Index
    await db.collection("products").createIndex({ description: "text" });
  } catch (error) {
    console.log(error);
  }
};

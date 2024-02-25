import { getDB } from "../../config/mongodb.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id; // Using _id to match the mongodb convention
  }

  static getAll() {
    return users;
  }

  // static async signUp(name, email, password, type) {
  //   // Using database - must be encosed in try/catch as these are asynchronous operations
  //   // This approach is violating the single responsibility principle - we should have a separate module for database access
  //   try {
  //     // 1. Get the data from the database
  //     const db = getDB();

  //     // 2. Get the collection you want to work with
  //     const collection = db.collection("users");

  //     const newUser = new UserModel(name, email, password, type);

  //     // 3. Insert the document
  //     await collection.insertOne(newUser);

  //     // Will not be used as database is being used
  //     // newUser.id = users.length + 1;
  //     // users.push(newUser);

  //     return newUser;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // static signIn(email, password) {
  //   const user = users.find(
  //     (user) => user.email == email && user.password == password
  //   );
  //   return user;
  // }
}

let users = [
  {
    id: 1,
    name: "Seller Name",
    email: "seller@example.com",
    password: "Password1",
    type: "seller",
  },
  {
    id: 2,
    name: "Customer Name",
    email: "customer@example.com",
    password: "Password2",
    type: "customer",
  },
  {
    id: 3,
    name: "Test Name",
    email: "string",
    password: "string",
    type: "test",
  },
];

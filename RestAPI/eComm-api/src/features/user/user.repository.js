import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

// Create model from schema
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  
}
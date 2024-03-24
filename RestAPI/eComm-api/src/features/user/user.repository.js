import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

// Create model from schema
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async signUp(user) {
    try {
      // Create instance of Model
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(userId, hashedPassword) {
    try {
      let user = await UserModel.findById(userId);
      console.log(user);
      user.password = hashedPassword;
      console.log(user);
      user.save();
    } catch (error) {
      console.log(error);
    }
  }
}

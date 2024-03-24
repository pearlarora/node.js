import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "Name can't be greater than 25 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\../, "Please enter a valid email"],
  },
  password: {
    type: String,
    // This is to validate the password just before saving it to the database where we will be getting the hashed password therefore this validation is not correct, can be tested if the hashing is removed
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[@$%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
    //   },
    //   message:
    //     "Password must be between 8 to 12 characters and have a special character",
    // },
  },
  type: {
    type: String,
    enum: ["Customer", "Seller"],
  },
});

import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async resetPassword(req, res) {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const userId = req.userId;
    try {
      await this.userRepository.resetPassword(userId, hashedPassword);
      return res.status(200).send("Password is updated successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    try {
      // Creating a hashed password usign bcrypt.hash
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    // const user = UserModel.signIn(email, password);
    try {
      const user = await this.userRepository.findByEmail(email);
      console.log("here10:", user);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // Compare the password with the hashed password
        const result = await bcrypt.compare(password, user.password);
        console.log("here11:", result);
        if (!result) {
          return res.status(400).send("Incorrect Credentials");
        } else {
          // Using JWT token
          // 1. Create a JWT token
          console.log("here12:", user._id.toString());
          const token = jwt.sign(
            { userId: user._id.toString(), email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          ); // User's autorization details and user id can be stored; no passwords

          // 2. Send the token
          return res.status(200).send(token);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

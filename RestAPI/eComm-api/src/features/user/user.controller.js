import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signUp(name, email, password, type);
    res.status(201).send(user);
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (!user) {
      return res.status(400).send("Incorrect Credentials");
    } else {
      // Using JWT token
      // 1. Create a JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "OJMaHa8AbJFmXZ7q5vyTbUUVBllTOZHT",
        { expiresIn: "1h" }
      ); // User's autorization details and user id can be stored; no passwords

      // 2. Send the token
      return res.status(200).send(token);
    }
  }
}

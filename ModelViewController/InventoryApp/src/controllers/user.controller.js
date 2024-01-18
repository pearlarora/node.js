import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register.ejs");
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.addUser(name, email, password);
    res.render("login.ejs", { error: null });
  }

  getLogin(req, res) {
    res.render("login.ejs", { error: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.checkUser(email, password);
    if (!user) {
      res.render("login.ejs", { error: "Invalid Credentials" });
    }
    req.session.userEmail = email;
    let products = ProductModel.get();
    return res.render("products.ejs", {
      products,
      userEmail: req.session.userEmail,
    });
  }

  logout(req, res) {
    // On logout, we are going to destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
    res.clearCookie("lastVisit");
  }
}

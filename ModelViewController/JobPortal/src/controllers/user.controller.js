// Handle user registration, loging and logout

import UserModel from "../models/user.model.js";
import JobModel from "../models/job.model.js";

export default class UserController {
  getLandingPage(req, res) {
    res.render("landing-page.ejs");
  }

  getRegisterRecruiter(req, res) {
    res.render("register.ejs");
  }

  postRegisterRecruiter(req, res) {
    const { name, email, password } = req.body;
    UserModel.addUser(name, email, password);
    res.render("login.ejs", { error: null });
  }

  getLoginRecruiter(req, res) {
    res.render("login.ejs", { error: null });
  }

  postLoginRecruiter(req, res) {
    const { email, password } = req.body;
    const userRegistered = UserModel.checkUser(email, password);

    if (!userRegistered) {
      return res.render("login.ejs", { error: "Invalid Credentials" });
    }
    req.session.userEmail = email;
    let jobs = JobModel.getAllJobs();
    res.render("job-listings.ejs", { jobs, userEmail: req.session.userEmail });
  }

  postLogoutRecruiter(req, res) {
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

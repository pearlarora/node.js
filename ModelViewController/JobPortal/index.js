// Routes for user registration, login, logout, job operations including creating, updating and deleting job postings, fetch necessary views

// Implement session based user authentication and management system for recruiters

import express from "express";
import path from "path";
import session from "express-session";
import ejsLayouts from "express-ejs-layouts";
import UserController from "./src/controllers/user.controller.js";
import JobController from "./src/controllers/job.controller.js";
import { uploadFile } from "./src/middlewares/resume-upload.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import { setLastVisit } from "./src/middlewares/last-visit.middleware.js";
import cookieParser from "cookie-parser";

const server = express();
const userController = new UserController();
const jobController = new JobController();

// Exposing the public folder statically to the client
server.use(express.static("public"));
server.use(cookieParser());

// Configuring session middleware
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.resolve("src", "views"));
server.use(express.urlencoded({ extended: true }));

// Configure the express ejs layout middleware
server.use(ejsLayouts);

// API Structure
// Auth Routes
server.get("/register", userController.getRegisterRecruiter);
server.post("/register", userController.postRegisterRecruiter);
server.get("/", setLastVisit, userController.getLandingPage);
server.get("/login", userController.getLoginRecruiter);
server.post("/login", userController.postLoginRecruiter);
server.get("/logout", userController.postLogoutRecruiter);

// Job Routes
// 1. /jobs
server.get("/jobs", jobController.getJobListings);
server.post(
  "/jobs",
  auth,
  uploadFile.single("resume_path"),
  jobController.postNewJobListing
);
server.get("/jobs/:id", jobController.getJobListingById);
// server.put("/jobs/:id", jobController.updateJobListingById);
server.delete("/jobs/:id", auth, jobController.deleteJobListingById);

// 2. /jobs/:id/applicants
server.get(
  "/jobs/:id/applicants",
  auth,
  jobController.getAllApplicantsForJobId
);
// server.post("/jobs/:id/applicants", jobController.addNewApplicant);
server.get(
  "/jobs/:id/applicants/:applicantId",
  auth,
  jobController.getApplicantById
);
server.put(
  "/jobs/:id/applicants/:applicantId",
  auth,
  jobController.updateApplicantById
);
server.delete(
  "/jobs/:id/applicants/:applicantId",
  auth,
  jobController.deleteApplicantById
);

// 3. /jobs/:id/update
server.get("/jobs/:id/update", auth, jobController.getUpdateJobFormById);
server.post("/jobs/:id/update", auth, jobController.postUpdateJobFormById);

// 4. /jobs/:id/delete
server.get("/jobs/:id/delete", auth, jobController.getDeleteJobFormById);

// 5. /jobs/:id/apply
server.get("/jobs/:id/apply", jobController.getApplyJobFormById);
server.post("/jobs/:id/apply", jobController.postApplyJobFormById);

// 6. /404
server.get("/404", jobController.get404ErrorPage);

server.post("/search", jobController.search);

server.listen(3200);

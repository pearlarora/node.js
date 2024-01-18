import express from "express";
import path from "path";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import ejsLayouts from "express-ejs-layouts";
import expressValidator from "./src/middlewares/express-validator.middleware.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/last-visit.middleware.js";

const server = express();

// Exposing public folder statically to the client
server.use(express.static("public"));

// Specifying the use of cookieParser middleware
server.use(cookieParser());
// server.use(setLastVisit);

// Configuring session middleware - it takes a session object
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Parse form data using urlencoded encoding format - this is a middleware provided by express
// This middeware will parse the data and retrun it to the body in the decoded format
server.use(express.urlencoded({ extended: true }));

// Setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.resolve("src", "views")); // Path to the folder where the html/ejs files are located

// Configure using ejs layouts middleware
server.use(ejsLayouts);

// To call the getProducts method from ProductController, create an instance of the class
const productController = new ProductController();
const userController = new UserController();

// Handling default request - middleware
server.get("/", setLastVisit, auth, productController.getProducts);

// Handling request - get add new product form
server.get("/add-product", auth, productController.getAddForm);

// Handling request - submit add new product form
// Note the order of implementing middlewares
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  expressValidator,
  productController.addNewProduct
);
// server.post("/", validateRequest, productController.addNewProduct);  // Remove .msg from the validation from .ejs file

// Handling request - get the update product form
server.get("/update-product/:id", auth, productController.getUpdateProductView);
// Using this 'id' parameter we can access the controller through this id

// Handling request - updating the product data
server.post("/update-product", auth, productController.postUpdateProduct);

// Handling request - delete the product
server.post("/delete-product/:id", auth, productController.deleteProduct);

// Handling request - get register user form
server.get("/register", userController.getRegister);

// Handling request - post register user form
server.post("/register", userController.postRegister);

// Handling request - get logout request
server.get("/logout", userController.logout);

// Handling request - get login user form
server.get("/login", userController.getLogin);

// Handling request - post login user form
server.post("/login", userController.postLogin);

server.use(express.static("src/views"));

server.listen(3100);

import express from "express";
import bodyParser from "body-parser";

// Importing router for ProductController
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
// import basicAuthMiddleware from "./src/middlwares/basicAuth.middleware.js";
import jwtAuth from "./src/middlwares/jwt.middleware.js";

const server = express();

// Using the bodyParser middleware
server.use(bodyParser.json());

// For all requests related to product - redirect to the product routes
// server.use("/api/product", basicAuthMiddleware, productRouter);
server.use("/api/product", jwtAuth, productRouter);
server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs!");
});

server.listen(3100, () => {
  console.log("Listening on port 3100");
});

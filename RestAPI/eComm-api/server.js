// Loads all the environment variables in the application - should be on the top so that all modules have access to it
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";

// Importing router for ProductController
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
// import basicAuthMiddleware from "./src/middlwares/basicAuth.middleware.js";
import jwtAuth from "./src/middlwares/jwt.middleware.js";
import cartItemRouter from "./src/features/cartItems/cartItems.routes.js";
import swagger from "swagger-ui-express";
// import apiDocs from "./swagger2.json" assert { type: "json" };
import apiDocs from "./swagger3.json" assert { type: "json" };
import loggerMiddleware from "./src/middlwares/logger.middleware.js";
import { connectToMongodb } from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

const server = express();

// Using the bodyParser middleware
server.use(bodyParser.json());

// Use swagger for API documentation
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use(loggerMiddleware);

// For all requests related to product - redirect to the product routes
// server.use("/api/product", basicAuthMiddleware, productRouter);
server.use("/api/order", jwtAuth, orderRouter);
server.use("/api/product", jwtAuth, productRouter);
server.use("/api/user", userRouter);
server.use("/api/cartItems", jwtAuth, cartItemRouter);

server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs!");
});

// Middleware to handle 404 requests
server.use((req, res) => {
  res.status(404).send("API not found");
});

server.listen(3100, () => {
  console.log("Listening on port 3100");
  // We need to connect to the database as soon as our server starts to listen
  // connectToMongodb();
  connectUsingMongoose();
});

// Manage routes/paths to ProductController
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlwares/fileupload.middleware.js";

// Initialize express router
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to the controller methods
// When a request reaches this point the path pattern will be - localhost/api/product
productRouter.get("/", productController.getAllProducts);

productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);

// Filter products using query parameters
productRouter.get("/filter", productController.filterProducts);

productRouter.get("/:id", productController.getOneProduct);

export default productRouter;

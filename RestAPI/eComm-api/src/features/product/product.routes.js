// Manage routes/paths to ProductController
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlwares/fileupload.middleware.js";

// Initialize express router
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to the controller methods
// When a request reaches this point the path pattern will be - localhost/api/product
productRouter.get("/", (req, res) =>
  productController.getAllProducts(req, res)
);

productRouter.post("/", upload.single("imageUrl"), (req, res) =>
  productController.addProduct(req, res)
);

// Filter products using query parameters
productRouter.get("/filter", (req, res) =>
  productController.filterProducts(req, res)
);

productRouter.post("/rate", (req, res, next) =>
  productController.rateProduct(req, res, next)
);

productRouter.get("/averagePrice", (req, res) =>
  productController.averagePrice(req, res)
);

productRouter.get("/averageRating", (req, res) =>
  productController.averageRating(req, res)
);

productRouter.get("/:id", (req, res) =>
  productController.getOneProduct(req, res)
);

export default productRouter;

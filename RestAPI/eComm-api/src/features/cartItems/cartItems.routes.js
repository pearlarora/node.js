import express from "express";
import CartItemController from "./cartItems.controller.js";

const cartItemRouter = express.Router();
const cartItemController = new CartItemController();

cartItemRouter.get("/", (req, res) =>
  cartItemController.getCartItems(req, res)
);
cartItemRouter.post("/", (req, res) => cartItemController.addItem(req, res));
cartItemRouter.delete("/:id", (req, res) =>
  cartItemController.deleteItem(req, res)
);

export default cartItemRouter;

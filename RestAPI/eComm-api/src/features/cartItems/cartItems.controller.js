import { ObjectId } from "mongodb";
import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export default class CartItemController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }

  async getCartItems(req, res) {
    const userId = req.userId;
    // const cartItems = CartItemModel.get(userId);
    try {
      const cartItems = await this.cartItemsRepository.get(userId);
      res.status(200).send(cartItems);
    } catch (error) {
      console.log(error);
    }
  }

  async addItem(req, res) {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    const userId = req.userId;
    // const error = CartItemModel.add(productId, userId, quantity);
    // if (error) {
    //   res.status(404).send(error);
    // } else {
    //   res.status(201).send("Item added to cart");
    // }
    try {
      await this.cartItemsRepository.add(productId, userId, quantity);
      res.status(201).send("Item added to cart");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(req, res) {
    const cartItemId = req.params.id;
    const userId = req.userId;
    // const error = CartItemModel.delete(cartItemId, userId);
    // if (error) {
    //   res.status(404).send(error);
    // } else {
    //   res.status(200).send("Item deleted from the cart");
    // }
    try {
      const isDeleted = await this.cartItemsRepository.delete(
        cartItemId,
        userId
      );
      if (isDeleted) {
        res.status(200).send("Item deleted from the cart");
      } else {
        res.status(404).send("Item not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

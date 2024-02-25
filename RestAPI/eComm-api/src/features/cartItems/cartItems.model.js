import UserModel from "../user/user.model.js";
import ProductModel from "../product/product.model.js";

export default class CartItemModel {
  constructor(id, productId, userId, quantity) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.quantity = Number(quantity);
  }

  static get(userId) {
    return cartItems.filter((c) => c.userId == userId);
  }

  static add(productId, userId, quantity) {
    // Validate user and product
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) return "User not found";
    const product = ProductModel.getAll().find((p) => p.id == productId);
    if (!product) return "Product not found";

    // Update product quantity if the product has already been added
    const itemIndex = cartItems.findIndex((i) => i.productId == productId);
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity += quantity;
    } else {
      const cartItem = new CartItemModel(
        cartItems.length + 1,
        productId,
        userId,
        quantity
      );
      cartItems.push(cartItem);
    }
  }

  static delete(cartItemId, userId) {
    const index = cartItems.findIndex(
      (i) => i.id == cartItemId && i.userId == userId
    );
    if (index >= 0) {
      cartItems.splice(index, 1);
    } else {
      return "Item not found";
    }
  }
}

var cartItems = [new CartItemModel(1, 2, 2, 1), new CartItemModel(2, 1, 2, 2)];

import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(name, description, price, imageUrl, category, sizes, id) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
    this._id = id;
  }

  static getAll() {
    return products;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static get(id) {
    const product = products.find((p) => p.id == id);
    return product;
  }

  // It is not compulsory that the user will apply all these filters therefore we use query parameters
  static filter(minPrice, maxPrice, category) {
    const result = products.filter(
      (product) =>
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
    );
    return result;
  }

  static rateProduct(userId, productId, rating) {
    // 1. Validate user and product
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) return "User not found";

    const product = products.find((p) => p.id == productId);
    if (!product) return "Product not found";

    // 2. Check if there is any rating array, if not define a rating array
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userId, rating });
    } else {
      // Check if user already has a rating - make an update
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userId == userId
      );
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = { userId, rating };
      } else {
        // If no ratings exist, then add new rating
        product.ratings.push({ userId, rating });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description 1",
    100,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81BE7eeKzAL._SL1500_.jpg",
    "Category 1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description 2",
    200,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61bfj+-wArL._SL1400_.jpg",
    "Category 2",
    ["M", "XL", "S"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description 3",
    300,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91bYsX41DVL._SL1500_.jpg",
    "Category 3",
    ["S", "L"]
  ),
  new ProductModel(
    4,
    "Product 4",
    "Description 4",
    400,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71JeBwdtGAL._SL1360_.jpg",
    "Category 4"
  ),
  new ProductModel(
    5,
    "Product 5",
    "Description 5",
    500,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71+cWkMATuL._SL1500_.jpg",
    "Category 5"
  ),
  new ProductModel(
    6,
    "Product 6",
    "Description 6",
    600,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71sBtM3Yi5L._SL1360_.jpg",
    "Category 6"
  ),
];

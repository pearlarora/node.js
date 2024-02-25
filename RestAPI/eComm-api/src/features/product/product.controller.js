import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      // const products = ProductModel.getAll();
      const products = await this.productRepository.getAll();
      // Here lies the difference between MVC and RestAPI
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(req, res) {
    const { name, description, price, category, sizes } = req.body;
    try {
      const newProduct = {
        name,
        description,
        price: parseFloat(price),
        imageUrl: req.file ? req.file.filename : "",
        category,
        sizes: sizes.split(","), // The sizes are in a string with a comma in between - no spaces
      };
      // const createdRecord = ProductModel.add(newProduct);
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord); // Can use 200 status code as well
    } catch (error) {
      console.log(error);
    }
  }

  async getOneProduct(req, res) {
    const id = req.params.id;
    try {
      // const product = ProductModel.get(id);
      const product = await this.productRepository.get(id);
      if (!product) return res.status(404).send("Product not found");
      else return res.status(200).send(product);
    } catch (error) {
      console.log(error);
    }
  }

  async filterProducts(req, res) {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const category = req.query.category;
    try {
      const result = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }

  async rateProduct(req, res) {
    const userId = req.userId;
    const productId = req.body.productId;
    const rating = req.body.rating;
    try {
      await this.productRepository.rate(userId, productId, rating);
      return res.status(200).send("Rating has been added");
    } catch (error) {
      console.log(error);
    }
  }

  async averagePrice(req, res) {
    try {
      const result = await this.productRepository.averagePricePerCategory();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }

  async averageRating(req, res) {
    try {
      const result = await this.productRepository.averageRatingPerProduct();
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }
}

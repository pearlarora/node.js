import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    // Here lies the difference between MVC and RestAPI
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, description, price, category, sizes } = req.body;
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      imageUrl: req.file.filename,
      category,
      sizes: sizes.split(","), // The sizes are in a string with a comma in between - no spaces
    };
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord); // Can use 200 status code as well
  }

  getOneProduct(req, res) {
    const id = parseInt(req.params.id);
    const product = ProductModel.get(id);

    if (!product) return res.status(404).send("Product not found");
    else return res.status(200).send(product);
  }

  filterProducts(req, res) {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const category = req.query.category;
    console.log(req.query);
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }

  rateProduct(req, res) {}
}

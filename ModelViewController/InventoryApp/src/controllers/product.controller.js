// import path from "path";
import ProductModel from "../models/product.model.js";

// Two ways to create a controller

// 1. ES6 Module Syntax
export default class ProductController {
  getProducts(req, res) {
    // Calling the get method from the model class
    let products = ProductModel.get();

    // Controller will return the ejs file from the view and pass the products object for dynamic data to be viewed by ejs
    res.render("products.ejs", {
      products: products,
      userEmail: req.user.email,
    });

    // It is a middleware, will have access to the request and the response; we will return the html file from views
    // console.log(path.resolve());  // Gives the path to the working directory - InventoryApp
    // res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
  }

  // Adding controller method to get the add new product form
  getAddForm(req, res) {
    return res.render("new-product.ejs", { errors: null });
  }

  // Receiving data when add new product form is submitted
  addNewProduct(req, res) {
    // Access data submitted in the form
    console.log(req.body);
    // Gives undefined because the data from the form is sent in encoded format which server is not able to understand
    // To correct this we need to parse the form data

    // Validating the form data
    // Shifted to validation.middleware.js to adhere to the single responsibility principle and avoid tight coupling

    // Adding data from the form to the products list
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename; // The file upload middleware adds this req.file property
    ProductModel.add(name, desc, price, imageUrl);

    let products = ProductModel.get();
    return res.render("products.ejs", {
      products,
      userEmail: req.session.userEmail,
    });
  }

  // Method to retrieve the update product form with pre-populated data
  getUpdateProductView(req, res) {
    // 1. If product exists - return view
    const id = req.params.id; // Accessing the id from the URL parameters
    const productFound = ProductModel.getById(id);
    if (productFound) {
      return res.render("update-product.ejs", {
        product: productFound,
        errors: null,
      }); // Sending the product data to pre-populate the form
    }

    // 2. Else return error
    else {
      return res.status(401).send("Product not found");
    }
  }

  // Updating the product data
  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    // let products = ProductModel.get();
    // return res.render("products.ejs", { products });
    res.redirect("/");
  }

  // Method to delete a product
  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      ProductModel.delete(id);
    } else {
      return res.status(401).send("Product not found");
    }
    let products = ProductModel.get();
    return res.render("products.ejs", {
      products,
      userEmail: req.session.userEmail,
    });
  }
}

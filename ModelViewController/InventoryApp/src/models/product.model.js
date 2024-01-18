export default class ProductModel {
  constructor(_id, _name, _description, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  // Static methods can be called by directly using the class name, no need to create a new instance
  // This method will return the products array
  static get() {
    return products;
  }

  // Method to add a new product to the existing product list
  static add(name, desc, price, imageUrl) {
    let newProduct = new ProductModel(
      products.length + 1,
      name,
      desc,
      price,
      imageUrl
    );
    products.push(newProduct);
  }

  // Method to check if a product exists using the id attribute
  static getById(id) {
    return products.find((product) => product.id == id);
    // Find and return the product where the id of the product equals the id received as parameter
  }

  static update(productObj) {
    const index = products.findIndex((product) => product.id == productObj.id);
    if (index !== -1) {
      products[index].name = productObj.name;
      products[index].description = productObj.desc;
      products[index].price = parseFloat(productObj.price);
      products[index].imageUrl = productObj.imageUrl;
    }
  }

  static delete(id) {
    const index = products.findIndex((product) => product.id == id);
    products.splice(index, 1);
  }
}

// An array of products - It will be calling the constructor of the ProductModel
var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description 1",
    100,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81BE7eeKzAL._SL1500_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description 2",
    200,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61bfj+-wArL._SL1400_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description 3",
    300,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91bYsX41DVL._SL1500_.jpg"
  ),
  new ProductModel(
    4,
    "Product 4",
    "Description 4",
    400,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71JeBwdtGAL._SL1360_.jpg"
  ),
  new ProductModel(
    5,
    "Product 5",
    "Description 5",
    500,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71+cWkMATuL._SL1500_.jpg"
  ),
  new ProductModel(
    6,
    "Product 6",
    "Description 6",
    600,
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71sBtM3Yi5L._SL1360_.jpg"
  ),
];

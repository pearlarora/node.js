const validateRequest = (req, res, next) => {
  let errors = [];
  const { name, price, imageUrl } = req.body;
  if (!name || name.trim() == "") {
    errors.push("Name is required");
  }
  if (!price || parseFloat(price) < 1) {
    errors.push("Price must be a positive value");
  }
  try {
    const validUrl = new URL(imageUrl);
    // Built in JS method to validate url - URL() - if it is unable tp parse the url it will throw an error
  } catch (error) {
    errors.push("URL is invalid");
  }

  if (errors.length > 0) {
    return res.render("new-product.ejs", { errors });
  }
  next();
};

export default validateRequest;

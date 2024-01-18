// Importing body object form express-validator to create specific rules for validation on the date received in request body
import { body, validationResult } from "express-validator";

// Validating data entered by the user using the express-validator middleware
const expressValidator = async (req, res, next) => {
  // 1. Setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price should be a positive"),
    body("imageUrl").custom((value, { req }) => {
      // Custom validator
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
    // body("imageUrl").isURL().withMessage("Invalid image URL"),
  ];

  // 2. Run the rules - Async operation
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Check if there are any errors after running the rules
  let validationErrors = validationResult(req);

  // 4. If there are any errors then return the error messages
  if (!validationErrors.isEmpty()) {
    console.log("here", validationErrors);
    return res.render("new-product.ejs", {
      errors: validationErrors.array(),
    });
  }
  next();
};

export default expressValidator;

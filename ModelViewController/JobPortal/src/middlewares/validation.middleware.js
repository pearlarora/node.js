// Importing body object form express-validator to create specific rules for validation on the date received in request body
import { body, validationResult } from "express-validator";

// Validating data entered by the user using the express-validator middleware
const expressValidator = async (req, res, next) => {
  // 1. Setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("contact").notEmpty().withMessage("Contact is required"),
    body("resume_path").custom((value, { req }) => {
      // Custom validator
      if (!req.file) {
        throw new Error("Resume file is required");
      }
      return true;
    }),
  ];

  // 2. Run the rules - Async operation
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Check if there are any errors after running the rules
  let validationErrors = validationResult(req);

  // 4. If there are any errors then return the error messages
  if (!validationErrors.isEmpty()) {
    return res.render("apply-job.ejs", {
      errors: validationErrors.array(),
    });
  }
  next();
};

export default expressValidator;

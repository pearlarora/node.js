import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // 1. Read the token - We expecr the client to send the token in the authorization header
  const token = req.headers["authorization"];

  // 2. If !token then return error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // 3. If token is present then check if it is valid or not - using jsonwebtoken library
  try {
    const payload = jwt.verify(token, "OJMaHa8AbJFmXZ7q5vyTbUUVBllTOZHT");
    // This is the same key that was used to generate the token
    console.log(payload);
  } catch (err) {
    // 4. If token is not valid then return error

    // Reasons for error: Token is invalid, expired, or has been modified
    return res.status(401).send("Unauthorized");
  }

  // 5. If token is valid then call next middleware
  next();
};

export default jwtAuth;

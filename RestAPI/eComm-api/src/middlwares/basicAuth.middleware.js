// Implementing the Basic Authentication as a middleware
import UserModel from "../features/user/user.model.js";

const basicAuthMiddleware = (req, res, next) => {
  // 1. Check if the authorization header is empty
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).send("No authorization details available");

  // 2. Extract the credentials from the authorization header - sent in base64 encoding
  // [Basic dghkjshiesjlfmm54632xnmndks(this is the encoded credential which we will be decoding)]
  const base64Credentials = authHeader.replace("Basic ", "");

  // 3. Decode the credentials - will give the actual email and password the user provided - [email:password]
  // A buffer will be created when the decoding is done
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString(
    "utf8"
  );

  // 4. Retrieve the credentials
  const credentials = decodedCredentials.split(":"); // This will return an array of email and password

  // 5. Check if the credentials are correct
  const user = UserModel.getAll().find(
    (user) => user.email == credentials[0] && user.password == credentials[1]
  );
  if (user) next();
  else return res.status(401).send("Incorrect Credentials");
};

export default basicAuthMiddleware;

import fs from "fs";

// Using promises method of the fs module
const fsPromise = fs.promises;

// Function to log the data in a text file
async function log(logData) {
  try {
    logData = "\n" + new Date().toString() + "; Log Data: " + logData;
    await fsPromise.appendFile("log.txt", logData);
  } catch (error) {
    console.log(error);
  }
}

// Creating a middleware method that could be called multiple times for our requests
// Multiple methods could be created for each logging requirement like logging errors
const loggerMiddleware = async (req, res, next) => {
  // Logging the request body upon receiving a request - use it before making any requests in server.js
  const logData = `${req.url} - ${JSON.stringify(req.body)}`;
  await log(logData);
  next();
};

export default loggerMiddleware;

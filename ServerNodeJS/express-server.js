// Creating server using express framework of node.js
// 1. Import express
const express = require("express");

// 2. Create a server
const server = express();

// 3. Handle Requests - Using Middleware
server.get(
  "/",
  // 1st Middleware
  (req, res, next) => {
    // The parameter 'next' is used to call the next middleware in the pipeline
    console.log("1st middleware hit");
    // res.send("This is from 1st middleware");  // Same as res.end() - no further execution happens
    next();
  },

  // 2nd Middleware
  (req, res, next) => {
    console.log("2nd middleware hit");
    // res.send("This is from 2nd middleware");
    next();
  }
);

// 3rd Middleware
server.get("/", (req, res) => {
  console.log("3rd middleware hit");
  res.send("This is from 3rd middleware");
});

// 4. Listen on specified port
server.listen(3100, () => {
  console.log("Express server listening on port 3100");
});

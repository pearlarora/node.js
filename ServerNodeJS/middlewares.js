const express = require("express");

const server = express();

// Defining middleware functions - Route Level Middleware
function firstMiddleware(req, res, next) {
  console.log("First middleware");
  next();
}
function secondMiddleware(req, res, next) {
  console.log("Second middleware");
  next();
}

// Application Level Middleware - Path(Path Level) and Method(Route Level)(get/post...) independent - runs on every request
function globalMiddleware(req, res, next) {
  console.log("Application level middleware");
  next();
}
server.use(globalMiddleware);

// Passing middleware in request handler - can be passed as an array of middlewares - Path Level Middleware
server.get("/", [firstMiddleware, secondMiddleware], (req, res) => {
  res.send("Third middleware");
});
// Or can be passed as parameters
// server.get("/", firstMiddleware, secondMiddleware, (req, res) => {
//   res.send("Third middleware");
// });

server.listen(3100);

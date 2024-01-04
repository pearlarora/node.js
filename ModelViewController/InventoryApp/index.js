const express = require("express");

const server = express();

// Handling default request - middleware
server.get("/", (req, res) => {
  res.send("Welcome to inventory app");
});

server.listen(3100);

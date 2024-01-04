// Creating an http server using Node.js

// 1. Import the http library/module
const http = require("http");

// 2. Create a server
const server = http.createServer((req, res) => {
  // Request received
  console.log(req.url);
  res.write("Hello\n");
  if (req.url === "/product") {
    return res.end("Product");
  }
  if (req.url === "/user") {
    return res.end("User");
  }

  // Send the response
  res.write("Welcome to Node.js Server!\n");
  res.end("Auto restart done by Nodemon!");
  // .end function ends the request response cycle and sends the response to the client
});

// 3. Specify a port number to listen to the client's requests
server.listen(3100, () => {
  console.log("Server is listening on port 3100");
});

// Create a server for events - Async operation
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    // Here, output will the undefined because the whole data has not been received yet, therefore we use events

    // Expecting data from the client
    let body = ""; // To append the data chunks received
    req.on("data", (chunk) => {
      // Here, "data" is the event and "chunk" is the data chunk received
      body += chunk.toString();
    });
    req.on("end", () => {
      // Here, "end" is the event when all the data has been received
      console.log(body);
      res.end("Data is received");
    });
  } else {
    console.log("The request method is not POST");
    res.end("The request method is not POST");
  }
});

server.listen(3100);
console.log("Server is listening on port 3100");

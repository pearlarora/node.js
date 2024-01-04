const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == "/first") {
    return res.end("First");
  }
  res.end("Default");
});

server.listen(3100, () => {
  console.log("Server is listening on port 3100");
});

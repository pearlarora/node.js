import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

const app = express();

// 1. Create a server with http
const server = http.createServer(app);

// 2. Create socket server - it uses the http server to start the communication between the client and the server and then socket keeps it going
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 3. Use socket events
io.on("connection", (socket) => {
  console.log("Connection is established");
  socket.on("join", (data) => {
    socket.username = data;
  });
  socket.on("new-message", (message) => {
    // broadcast this message and username to all the clients
    let userMessage = {
      username: socket.username,
      message: message,
    };
    socket.broadcast.emit("broadcast-message", userMessage);
  });
  socket.on("disconnect", () => {
    console.log("Connection is disconnected");
  });
});

server.listen(3000);

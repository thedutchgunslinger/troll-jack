const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin.html");
});

app.use(express.static("public"));


server.listen(3030, () => {
  console.log("listening on *:3030");
});


io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("Ready", (msg) => {
    console.log("Ready: " + msg);
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("connected", (msg) => {
    console.log("connected: " + msg)
    io.emit("connected", msg);
  });
  socket.on("ready", (msg) => {
    console.log("ready: " + msg);
    io.emit("ready", msg);
  });
  socket.on("allowed", (msg) => {
    console.log("allowed: " + msg);
    io.emit("allowed", msg);
  });
    socket.on("play", (msg) => {
      console.log("play: " + msg);
      io.emit("play", msg);
    });
      socket.on("pause", (msg) => {
        console.log("pause: " + msg);
        io.emit("pause", msg);
      });
});
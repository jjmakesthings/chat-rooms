const express = require("express");
const http = require("http");
const socket = require("socket.io");

//app setup
const app = express();
const httpServer = http.createServer(app);

httpServer.listen(3000, function () {
  console.log("listening on port 3000");
});

//static files
app.use(express.static("src"));

//socket setup
const io = socket(httpServer);

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);
  //take in data from any individual socket and emit to all connected sockets
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  //listen for typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

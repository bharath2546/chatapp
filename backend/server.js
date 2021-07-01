const express = require("express");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
    console.log("active to be connected");

    socket.on("chat", (payload) => {
        io.emit("chat", payload);
    });
})

server.listen(5000, () => {
    console.log("server is running at : ", 5000);
})
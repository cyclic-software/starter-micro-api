import { Server } from "socket.io";

const io = new Server({
  /* options */
});

console.log("Server Initialized...");

io.on("connection", (socket) => {
  socket.emit("hi", "hi client");
  console.log("connection");
});

io.listen(11000);

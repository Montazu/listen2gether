import { Server } from "socket.io";

const io = new Server(8000, {
  cors: {
    origin: "http://192.168.1.50:3000",
  },
});

// io.of("/create").on("connection", async (socket) => {
//   socket.emit("hello", "world");
//   console.log("działa");

//   //   .adapter.on("create-room", (room) => {
//   //     console.log(`room ${room} was created`);
//   //   });
//   //   io.of("/").adapter.on("join-room", (room, id) => {
//   //     console.log(`socket ${id} has joined room ${room}`);
//   //     socket.to(room).emit("hello", "world");
//   //   });
// });

io.of("/rooms").on("connection", (socket) => {
  //   io.of("/create").adapter.on("create-room", (room) => {
  // socket.join(room);
  //   console.log("success", room);
  //   });
  //   socket.emit("hello", "world");
  socket.on("room:create", (e) => {
    console.log(e, "boczek");
  });
});

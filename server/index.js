import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: ["http://localhost:3000/", "http://192.168.1.50:3000/"],
});

app.use(cors());

app.get("/:group/:roomId", (req, res) => {
  const { group, roomId } = req.params;
  const room = io.of(`/${roomId}`);
  console.log(group);
  room.on("connection", (socket) => {
    const roomH = `h_${roomId}`;
    const roomU = `u_${roomId}`;
    const roomA = `a_${roomId}`;

    switch (group) {
      case "h":
        socket.join(roomH);
        break;
      case "u":
        socket.join(roomU);
        break;
      case "a":
        socket.join(roomA);
        break;
    }

    socket.on("sendAll", (arg) => {
      console.log([roomH, roomU, roomA]);
      room.in([roomH, roomU, roomA]).emit("message", arg);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} rozłączył się pokoju ${roomId}`);
    });
  });
});

httpServer.listen(8000);

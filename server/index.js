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
  const room = io.of(`/${group}/${roomId}`);
  room.on("connection", (socket) => {
    socket.join(roomId);
    // room.to(roomId).emit("message", `Dołączyłeś do pokoju ${roomId}`);
    socket.on("hello", (arg) => {
      console.log(arg);
    });
  });

  // room.emit("message", `Dołączyłeś do pokoju ${roomId}`);
});

httpServer.listen(8000);

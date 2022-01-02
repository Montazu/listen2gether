import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Host() {
  const socketRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://192.168.1.50:8000/u/${id}`);
    if (socketRef.current == null) {
      socketRef.current = io(`http://192.168.1.50:8000/u/${id}`);
    }
  }, [id]);

  // socket.on("message", (a) => {
  //   console.log(a);
  // });

  const { current: socket } = socketRef;

  const handleSendMessage = () => {
    socket.emit("hello", { message: newMessage });
  };

  return (
    <div>
      <h1>User</h1>
      <input type='text' onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={() => handleSendMessage()}>Wyślij</button>
    </div>
  );
}

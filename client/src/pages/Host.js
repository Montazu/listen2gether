import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import React from "react";

export default function Host() {
  const socketRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://192.168.1.50:8000/h/${id}`);
    if (socketRef.current == null) {
      socketRef.current = io(`http://192.168.1.50:8000/${id}`);
    }

    const { current: socket } = socketRef;

    socket.on("message", (arg) => {
      console.log(arg);
    });
  }, [id]);

  const { current: socket } = socketRef;

  const handleSendMessage = () => {
    socket.emit("sendAll", { message: newMessage });
  };

  return (
    <div>
      <h1>Host</h1>
      <input type='text' onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={() => handleSendMessage()}>Wyślij</button>
    </div>
  );
}

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Host() {
  const { id } = useParams();
  const socket = io(`http://192.168.1.50:8000/h/${id}`);

  useEffect(() => {
    fetch(`http://192.168.1.50:8000/h/${id}`);
    socket.on("message", (a) => {
      console.log(a);
    });
  });

  return (
    <div>
      <h1>Host</h1>
    </div>
  );
}

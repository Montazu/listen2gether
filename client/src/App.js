import { io } from "socket.io-client";
import { useEffect } from "react";

export default function App() {
  const socket = io("http://192.168.1.50:8000/rooms");

  useEffect(() => {
    socket.on("hello", function () {
      console.log("hello received");
    });
  });

  return (
    <div>
      <h1>Słuchaj muzyki razem</h1>
      <button>Utwórz pokój</button>
      <br />
      <input type='text' />
      <button>Dołącz do pokoju</button>
    </div>
  );
}

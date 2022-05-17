import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
const ChatContainer = () => {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [room, setRoom] = useState();
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data, "data");
      setMessageRecieved(data.message);
    });
    return () => {};
  }, [socket]);
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  return (
    <div>
      <input placeholder="Room id" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>join room</button>
      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message here"
      />
      <button onClick={sendMessage}>Send</button>
      <h2>{messageRecieved}</h2>
    </div>
  );
};

export default ChatContainer;

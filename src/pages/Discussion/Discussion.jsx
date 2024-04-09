import { useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
import "./Discussion.scss";
import { UserContext } from "../../context/userContext";

const socket = io.connect("http://localhost:3500/");

const Discussion = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { userInfo } = useContext(UserContext);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const handleSubmit = () => {
    socket.emit("send_message", {
      name: userInfo.username,
      message: messageRef.current.value,
    });
    messageRef.current.value = "";
    console.log("hello");
  };

  return (
    <div className="app__discussion">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Enter the Code, Join A Chat</h3>

          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userInfo.username} room={room} />
      )}
    </div>
  );
};

export default Discussion;

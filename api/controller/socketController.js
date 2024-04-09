const handleConnection = (socket) => {
  console.log(`${socket.id} is connected`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("user disconnected");
  });
};

export default { handleConnection };

import "dotenv/config.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "node:http";
import { Server } from "socket.io";

import connectDB from "./config/dbConn.js";
import corsOptions from "./config/corsOptions.js";
import {
  register,
  auth,
  profile,
  logout,
  post,
  uploads,
} from "./routes/index.js";
import socketController from "./controller/socketController.js";

connectDB(process.env.DB_URI);
const PORT = process.env.PORT || 3500;
const app = express();

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));

app.use("/uploads", uploads);

//socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
//routes
app.get("/", (req, res) => res.send("hello"));
app.use("/register", register);
app.use("/login", auth);
app.use("/logout", logout);
app.use("/profiles", profile);
app.use("/post", post);

mongoose.connection.once("open", () => {
  console.log("connect to mongodb");

  server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
});

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authMiddleware from "./middlewares/auth";

import * as userController from "./controllers/users";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/users", userController.register);
app.post("/api/users/login", userController.login);
app.post("/api/user", authMiddleware, userController.currentUser);

io.on("connection", () => {
  console.log("connect");
});

mongoose.connect("mongodb://localhost:27017/eltrello").then(() => {
  console.log("connected to mongodb");

  httpServer.listen(4001, () => {
    console.log("API is listening on port 4001");
  });
});

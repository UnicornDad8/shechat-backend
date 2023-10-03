const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConfig = require("./config/dbConfig");
const app = express();
const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");
const chatsRoute = require("./routes/chatsRoute");
const messagesRoute = require("./routes/messagesRoute");
app.use(express.json());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// check the socket connection from client
io.on("connection", (socket) => {
  socket.on("join-room", (userId) => {
    socket.join(userId);
    console.log("user joined ", userId);
  });

  socket.on("send-message", ({ text, sender, receipent }) => {
    // send message to receipent (John)
    io.to(receipent).emit("receive-message", { text, sender });
  });
});

app.use("/api/users", usersRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);

server.listen(port, () => console.log(`server running on port ${port}`));

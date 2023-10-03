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
  console.log("socket id: ", socket.id);
});

app.use("/api/users", usersRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);

server.listen(port, () => console.log(`server running on port ${port}`));

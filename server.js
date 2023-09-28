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

app.use("/api/users", usersRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);

app.listen(port, () => console.log(`server running on port ${port}`));

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("user connected");
  io.emit("chat message", "somebody joined the chat room!");

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("chat message", "somebody left the chat room :(");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});

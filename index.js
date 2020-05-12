const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("user connected");
  io.emit("chat message", {
    alias: "a new user",
    msg: "Hello, I've joined the chat room",
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("chat message", {
      alias: "a current user",
      msg: "Toodlepip, I'm off",
    });
  });

  socket.on("chat message", (msgObj) => {
    io.emit("chat message", msgObj);
  });

  socket.on("user name change", (newName) => {
    io.emit("user name change", newName);
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let usersOnline = 0;

io.on("connection", (socket) => {
  usersOnline++;

  io.emit("chat message", {
    alias: "a new user",
    msg: `Hello, I've joined the chat room, there are now ${usersOnline} users online`,
  });

  socket.on("disconnect", () => {
    usersOnline--;
    console.log("user disconnected");
    io.emit("chat message", {
      alias: "a current user",
      msg: `Toodlepip, I'm off - now ${usersOnline} users online`,
    });
  });

  socket.on("chat message", (msgObj) => {
    console.log("a message has been sent");
    io.emit("chat message", msgObj);
  });

  socket.on("user name change", (newName) => {
    io.emit("user name change", newName);
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});

module.exports = app;

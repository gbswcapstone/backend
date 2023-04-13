const app = require("./index");
const http = require("http");
const PORT = process.env.PORT || 8001;
const server = http.createServer(app);

const SocketIO = require("socket.io");

const io = SocketIO(server);

io.on("connection", (socket) => {
  socket.on("ttsSend", (msg) => {
    io.emit("ttsSend", msg);
  });
});

server.listen(PORT, () => {
  console.log("server on!");
});

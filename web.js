const app = require("./index");
const http = require("http");
const PORT = process.env.PORT || 8001;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("server on!");
});

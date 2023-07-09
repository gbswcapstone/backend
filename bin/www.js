const app = require("../index");
require("dotenv").config();

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log("server on!");
});

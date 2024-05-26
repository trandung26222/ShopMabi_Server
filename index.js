const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  var a = 10;
  res.send("Hello World2313!");
});

app.get("/home", (req, res) => {
  res.send("home page!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

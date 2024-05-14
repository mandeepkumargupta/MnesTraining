const con = require("./config/mysql");
const router = require("./router");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", router);

con.connect(function (error) {
  if (error) throw error;
  console.log("connected");
});

app.listen(4000, () => {
  console.log("listening to port 4000");
});

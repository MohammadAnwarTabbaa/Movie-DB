const express = require("express");
const app = express();
const port = 3000;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

app.get("/", (req, res) => {
  res.send("ok");
});
app.get("/test", (req, res) => {
  res.status(200).send({ status: 200, message: "ok" });
});
app.get("/time", (req, res) => {
  res.status(200).send({ status: 200, message: time });
});
app.get("/hello/:id", (req, res) => {
  res.status(200).send({ status: 200, message: "hello " + req.params.id });
});
app.get("/search", (req, res) => {
  const search = req.query.s;
  if (search) {
    res.status(200).send({ status: 200, message: "ok", data: search });
  } else {
    res.status(500).send({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();
const moviesRoute = require("./routes/movies");
app.use(express.json());

app.use("/movies", moviesRoute);

app.post("/anwar", (req, res) => {
  res.send("ok");
});

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
app.get("/hello/", (req, res) => {
  res.status(200).send({ status: 200, message: "Hello! " });
});
app.post("/search", (req, res) => {
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

mongoose
  .connect(
    "mongodb+srv://ahmad:ahmad123@movies.fuxrz.mongodb.net/movies?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) =>
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));

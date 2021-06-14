const express = require("express");
const app = express();
const port = 3000;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();
const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

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
app.get("/movies/get", (req, res) => {
  res.status(200).send({ status: 200, data: movies });
});

app.get("/movies/get/by-date", (req, res) => {
  movies.sort(function (a, b) {
    return a.year - b.year;
  });

  res.status(200).send({ status: 200, data: movies });
});

app.get("/movies/get/by-rating", (req, res) => {
  movies.sort(function (a, b) {
    return a.rating - b.rating;
  });

  res.status(200).send({ status: 200, data: movies });
});

app.get("/movies/get/by-title", (req, res) => {
  movies.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  res.status(200).send({ status: 200, data: movies });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

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
app.get("/hello/", (req, res) => {
  res.status(200).send({ status: 200, message: "Hello! " });
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

//i used all this code beause i think that i want to get the movie by name but it is works
app.get("/movies/get/id/:id", (req, res) => {
  var i;
  let arr = [];
  id = req.params.id;
  for (i = 0; i < movies.length; i++) {
    if (id == i + 1) {
      arr = movies[i];
    }
  }
  if (arr.length == 0) {
    res.status(404).send({
      status: 404,
      error: true,
      message: "the movie " + id + " does not exist",
    });
    arr = [];
  } else {
    res.status(200).send({ status: 200, data: arr });
    arr = [];
  }
});

app.get("/movies/add", (req, res) => {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.rating;
  const rate = "4";
  if (title && year && year.length == 4 && Number.isInteger(parseInt(year))) {
    if (!rating) {
      movies.push({ title: title, year: Number.parseInt(year), rating: 4 });
    } else {
      movies.push({
        title: title,
        year: Number.parseInt(year),
        rating: Number.parseFloat(rating),
      });
    }
    res.status(200).send({ status: 200, data: movies });
  } else
    res.status(403).send({
      status: 403,
      error: true,
      message: "You cannot create a movie without providing a title and a year",
    });
});
app.get("/movies/delete/:id", (req, res) => {
  id = req.params.id;
  if (id == 1) {
    movies.shift();
    res.status(200).send({ status: 200, data: movies });
  } else if (id <= movies.length && id > 1) {
    movies.splice(id - 1, id - 1);
    res.status(200).send({ status: 200, data: movies });
  } else {
    res.status(404).send({
      status: 404,
      error: true,
      message: "the movie " + id + " does not exist",
    });
  }
});
app.get("/movies/delete/", (req, res) => {
  res.status(404).send({ status: 404, message: "you should put an id" });
});

app.get("/movies/update/:id", (req, res) => {
  id = req.params.id;
  arr = [];
  if (
    Number.isInteger(parseInt(req.query.year)) &&
    req.query.year.length == 4
  ) {
    if (req.query.title) {
      arr.push({ title: req.query.title });
    }
    if (req.query.rating) {
      arr.push({ rating: Number.parseFloat(req.query.rating) });
    }
    if (req.query.year) {
      arr.push({ year: Number.parseInt(req.query.year) });
    }
    for (var i = 0; i < arr.length; i++) {
      movies[id - 1][Object.keys(arr[i])] = arr[i][Object.keys(arr[i])];
      // console.log(Object.keys(arr[i]));
      // console.log(arr[i]);
    }
    res.status(200).send({ status: 200, data: movies });
  }
  //to check if year is 4 digit and it is a number
  else {
    res.status(404).send({ message: "error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/get", async (req, res) => {
  try {
    const data = await Post.find();
    res.status(200).json(data);
  } catch (err) {
    res.json(err);
  }
});

router.get("/get/by-date", async (req, res) => {
  const data = await Post.find();
  const ddata = data.sort(function (a, b) {
    return a.year - b.year;
  });

  res.status(200).json({ status: 200, data: ddata });
});
router.get("/get/by-title", async (req, res) => {
  try {
    const result = await Post.find();
    const finalResult = result.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }

      return 0;
    });

    res.status(200).json({ status: 200, data: finalResult });
  } catch (err) {
    res.json(err);
  }
});

router.post("/add", (req, res) => {
  const post = new Post({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
  });
  if (
    req.body.title &&
    req.body.year &&
    req.body.year.toString().length == 4 &&
    Number.isInteger(parseInt(req.body.year))
  ) {
    post
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  } else
    res.status(403).json({
      status: 403,
      error: true,
      message: "You cannot create a movie without providing a title and a year",
    });
});

router.get("/get/id", async (req, res) => {
  const id = req.body.id;
  try {
    const result = await Post.findById(id);
    if (result) {
      res.status(200).json({ result });
    }
  } catch (err) {
    res.status(404).json({
      status: 404,
      error: true,
      message: "the movie " + id + " does not exist",
    });
  }
});

router.delete("/delete", async (req, res) => {
  id = req.body.id;
  const item = await Post.findById(id);
  if (item) {
    try {
      await Post.remove({ _id: id });
      const result = await Post.find();
      res.status(200).json({ status: 200, data: result });
    } catch (err) {
      res.json(err);
    }
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: "the movie " + id + " does not exist",
    });
  }
});

router.put("/update/:id", async (req, res) => {
  id = req.params.id;

  // arr = [];
  if (
    Number.isInteger(parseInt(req.body.year)) &&
    req.body.year.toString().length == 4
  ) {
    try {
      if (req.body.title) {
        await Post.updateOne({ _id: id }, { $set: { title: req.body.title } });
      }
      if (req.body.rating) {
        await Post.updateOne(
          { _id: id },
          { $set: { rating: req.body.rating } }
        );
      }
      if (req.body.year) {
        await Post.updateOne({ _id: id }, { $set: { year: req.body.year } });
      }
      // I I TRIED TO SOLVE IT IN THIS WAY BUT I DON'T KNOW WHY IT IS NOT WORKS !

      // for (var i = 0; i < arr.length; i++) {
      //   let kye = Object.keys(arr[i])[0];
      //   console.log(kye);
      //   console.log(arr[i][Object.keys(arr[i])]);
      //   // await Post.updateOne(
      //   { _id: id },
      //   { $set: { kye: arr[i][Object.keys(arr[i])] } }
      // );
      // movies[id - 1][Object.keys(arr[i])] = arr[i][Object.keys(arr[i])];
      // console.log(Object.keys(arr[i]));
      // console.log(arr[i]);
      // }
      res.status(200).send({ status: 200, data: await Post.find() });
    } catch (err) {
      console.log(err);
    }
  }

  //to check if year is 4 digit and it is a number
  else {
    res.status(404).send({ message: "error" });
  }
});
module.exports = router;

const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 4,
    required: true,
  },
});
module.exports = mongoose.model("movies", PostSchema);

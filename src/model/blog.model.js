const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    id: String,
    heading: String,
    image: String,
    firstPara: String,
    secondPara: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

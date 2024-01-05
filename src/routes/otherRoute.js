const express = require("express");
const router = express.Router();
const blog = require("../../mongodb");
const { v4: uuid } = require("uuid");

router.post("/create", async (req, res) => {
  const { heading, image, firstPara, secondPara, author } = req.body;
  const id = uuid();
  try {
    const a = await blog.create({
      id,
      heading,
      image,
      firstPara,
      secondPara,
      author,
    });
  } catch (err) {
    console.log(`insertion error : ${err}`);
  }
  res.redirect("/");
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { heading, image, firstPara, secondPara, author } = req.body;

  async function updateValue(key, value) {
    try {
      updateQuery = { $set: { [key]: value } };
      await blog.updateOne({ id: id }, updateQuery);
    } catch (err) {
      console.log(`updataion error: ${err}`);
    }
  }

  updateValue("heading", heading)
    .then(() => {
      updateValue("image", image);
    })
    .then(() => {
      updateValue("firstPara", firstPara);
    })
    .then(() => {
      updateValue("secondPara", secondPara);
    })
    .then(() => {
      updateValue("author", author);
    })
    .then(() => {
      res.redirect("/");
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const blog = require("../../mongodb");
const { v4: uuid } = require("uuid");

router.get("/", async (req, res) => {
  let storage = [];
  try {
    storage = await blog.find();
  } catch (err) {
    console.log(`getting error: ${err}`);
  }
  res.render("home", { storage });
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const storage = await blog.findOne({ id: id });
    res.render("update", { storage });
  } catch (err) {
    console.log(`error occured ${err}`);
  }
  // res.render("update", { id });
});

router.get("/visit/:id", async (req, res) => {
  const id = req.params.id;
  let data;
  try {
    data = await blog.findOne({ id: id });
    res.render("blog", { data });
  } catch (err) {
    console.log(`error occured ${err}`);
  }
});

router.post("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await blog.deleteOne({ id: id });
  } catch (err) {
    console.log(`error occured : ${err}`);
  }
  res.redirect("/");
});

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

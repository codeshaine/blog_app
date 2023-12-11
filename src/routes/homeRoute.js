const express=require("express")
const router=express.Router()
const blog=require('../../mongodb')

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

router.get("/update/:id", (req, res) => {
  const id = req.params.id;
  res.render("update", { id });
});




router.get("/visit/:id", async (req, res) => {
  const id = req.params.id;
  let data;
  try {
    data = await blog.findOne({ id: id });
  } catch (err) {
    console.log(`error occured ${err}`);
  }
  res.render("blog", { data });
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



module.exports=router
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(express.static("script"));


let storage = [];

function obj(reqBody) {
  return {
    heading: reqBody.heading,
    body: reqBody.body,
  };
}

app.get("/", (req, res) => {
  res.render("index", { storage });
});

app.post("/index", (req, res) => {
  let newObj = obj(req.body);
  if (
    storage.length === 0 ||
    JSON.stringify(storage[storage.length - 1]) !== JSON.stringify(newObj)
  ) {
    storage.push(newObj);
  } else {
    console.log("duplicate");
  }

  // console.log(storage)
  res.render("index", { storage });
});

app.delete("/index/:index", (req, res) => {

  console.log(req.params.index)
  // i=req.params.index*1
    let i = parseInt(req.params.index, 10);
  // console.log(i);
  if (i >= 0 && i < storage.length) {
    storage.splice(i, 1);
    // console.log(storage);
      // res.render("partials/data", { storage });
       setTimeout(() => {
         res.render("partials/data", { storage });
       }, 0);
      // res.json({ storage });
    // res.render("index", { storage });
  } else {
    res.sendStatus(404);
  }

  //  res.status(204).send();
  // res.redirect("/")
});

app.listen(3000, () => console.log("http://localhost:3000/"));

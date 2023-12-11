const express = require("express");
const path = require("path");
const {v4:uuid}=require("uuid")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"./src/views"))
// app.use(express.static(path.join("public")));
app.use(express.static(path.join(__dirname, "public")));
let storage = [];
function obj(reqBody) {
  return {
    id:uuid(),
    heading: reqBody.heading,
    body: reqBody.body,
  };
}

app.get("/", (req, res) => {
  res.render("home", { storage });
});
app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/update/:id", (req, res) => {
  const id = req.params.id;
  res.render("update", { id });
});

app.get("/visit/:id", (req, res) => {
  const id=req.params.id
  const index=storage.findIndex(item=>item.id==id)
  const data = storage[index];
  res.render("blog", { data });
});


app.post("/create", (req, res) => {
  let newObj = obj(req.body);
  if (
    storage.length === 0 ||
    JSON.stringify(storage[storage.length - 1]) !== JSON.stringify(newObj)
  ) {
    storage.push(newObj);
  } else {
    console.log("duplicate");
  }
  res.redirect("/");
});

app.post("/update/:id", (req, res) => {
  const id=req.params.id
 const index = storage.findIndex((item) => item.id == id);
  if (isNaN(index) || index < 0 || index >= storage.length) {
    console.log("id not found");
  } else {
    if(!req.body.heading=="") storage[index].heading = req.body.heading;
     if(!req.body.body=="") storage[index].body = req.body.body;

  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id= req.body.id;
  const index=storage.findIndex(item=>item.id==id)
  if (index >= 0 && index < storage.length) {
    storage.splice(index, 1);
    console.log("deleted");
    res.redirect("/");
  }
});



app.listen(3000, () => console.log("http://localhost:3000/"));

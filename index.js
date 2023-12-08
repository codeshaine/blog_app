const express = require("express");
const app = express();


// app.use((req, res, next) => {
//   // Middleware logic to log the incoming request
//   console.log(`Received request at ${new Date()}`);
  
//   // Pass control to the next middleware or route handler
//   next();});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

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
app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/update/:id", (req, res) => {
  let id = req.params.id;
  res.render("update", { id });
});

app.get("/visit/:id", (req, res) => {
  const id = req.params.id * 1;
  const data = storage[id];
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
  const index = parseInt(req.params.id, 10);
  if (isNaN(index) || index < 0 || index >= storage.length) {
    console.log("id not found");
  } else {
    if(!req.body.heading=="") storage[index].heading = req.body.heading;
     if(!req.body.body=="") storage[index].body = req.body.body;
    
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  if (index >= 0 && index < storage.length) {
    storage.splice(index, 1);
    console.log("deleted");
    res.redirect("/");
  }
});



app.listen(3000, () => console.log("http://localhost:3000/"));

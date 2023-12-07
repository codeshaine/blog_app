const express = require("express");
const app = express();

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

app.post("/", (req, res) => {
  let newObj = obj(req.body);
  if (
    storage.length === 0 ||
    JSON.stringify(storage[storage.length - 1]) !== JSON.stringify(newObj)
  ) {
    storage.push(newObj);
  } else {
    console.log("duplicate");
  }
  res.redirect("/")
});


app.post("/delete",(req,res)=>{
  const index=req.body.index;
  if(index>=0 && index<storage.length)
  {
   storage.splice(index,1)
   console.log("deleted");
   res.redirect("/")
  }
})



app.listen(3000, () => console.log("http://localhost:3000/"));

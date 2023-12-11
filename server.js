const express = require("express");
const path = require("path");
const {v4:uuid}=require("uuid")
const app = express();
const blog=require("./mongodb");
const { off } = require("process");


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"./src/views"))
app.use(express.static("public"));




app.get("/", async (req, res) => {
  let storage = []
  try{
    storage=await blog.find()
  }catch(err)
  {
    console.log(`getting error: ${err}`)
  }
  res.render("home", { storage });

});


app.get("/create", (req, res) => {
  res.render("create");
});



app.get("/update/:id", (req, res) => {
  const id = req.params.id;
  res.render("update", { id });
});


app.get("/visit/:id", async (req, res) => {
    const id=req.params.id
    let data
    try{
 data= await blog.findOne({id:id})
    }catch(err){
      console.log(`error occured ${err}`)
    }
    res.render("blog",{data})
});


app.post("/create",async (req, res) => {
const {heading,image,firstPara,secondPara}=req.body
const id=uuid()
try{
 const a= await blog.create({id,heading,image,firstPara,secondPara})
  console.log(a);
}catch(err)
{
  console.log(`insertion error : ${err}`);
}
  res.redirect("/");
});


app.post("/update/:id", (req, res) => {
  const id=req.params.id
const {heading,image,firstPara,secondPara}=req.body

updateValue('heading',heading)
updateValue('image',image)
updateValue('firstPara', firstPara);
updateValue('secondPara', secondPara);

async function  updateValue(key,value){
try{
  updateQuery={$set: { [key]: value }}
  if(value!=="") await blog.updateOne({ id: id }, updateQuery);
}catch(err){
console.log(`updataion error: ${err}`)
}
}
  res.redirect("/");
});


app.post("/delete", async (req, res) => {
  const id= req.body.id;
try{
await blog.deleteOne({id:id})
}catch(err){
  console.log(`error occured : ${err}`)
}
   res.redirect("/");
});



app.listen(3000, () => console.log("http://localhost:3000/"));

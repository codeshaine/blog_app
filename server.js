const express = require("express");
const path = require("path");
const app = express();
const blog=require("./mongodb");


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"./src/views"))
app.use(express.static("public"));


//for the routes
app.use("/",require('./src/routes/homeRoute'))
app.use("/",require('./src/routes/otherRoute'))



app.listen(3000, () => console.log("http://localhost:3000/"));

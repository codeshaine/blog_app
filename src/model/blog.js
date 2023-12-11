const mongoose=require("mongoose")

const blogSchema=   new mongoose.Schema({
    id:String,
    heading:String,
    image:String,
    firstPara:String,
    secondPara:String


})


module.exports = mongoose.model("blog", blogSchema);
